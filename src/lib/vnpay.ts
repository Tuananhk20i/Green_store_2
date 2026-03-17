import crypto from 'crypto';
import querystring from 'querystring';

interface VNPayParams {
  amount: number;
  orderInfo: string;
  orderType?: string;
  bankCode?: string;
  language?: string;
  orderId: string;
}

export function createPaymentUrl({
  amount,
  orderInfo,
  orderType = 'billpayment',
  bankCode = '',
  language = 'vn',
  orderId,
}: VNPayParams): string {

  // ✅ LẤY ENV BÊN TRONG FUNCTION (QUAN TRỌNG)
  const tmnCode = process.env.VNPAY_TMN_CODE;
  const secretKey = process.env.VNPAY_HASH_SECRET;

  if (!tmnCode || !secretKey) {
    throw new Error('Missing VNPay config');
  }

  const vnpUrl =
    process.env.VNPAY_URL ||
    'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

  const returnUrl =
    process.env.VNPAY_RETURN_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/payment/vnpay/return`
      : 'http://localhost:3000/api/payment/vnpay/return');

  const date = new Date();
  const createDate = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${date
    .getDate()
    .toString()
    .padStart(2, '0')}${date
    .getHours()
    .toString()
    .padStart(2, '0')}${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;

  const currCode = 'VND';

  const vnpParams: Record<string, string | number> = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Locale: language,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr:
      process.env.NODE_ENV === 'production'
        ? process.env.SERVER_IP || '127.0.0.1'
        : '127.0.0.1',
    vnp_CreateDate: createDate,
  };

  if (bankCode) {
    vnpParams.vnp_BankCode = bankCode;
  }

  const sortedParams = sortObject(vnpParams);

  const signData = Object.entries(sortedParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac
    .update(Buffer.from(signData, 'utf-8'))
    .digest('hex');

  sortedParams['vnp_SecureHash'] = signed;

  return `${vnpUrl}?${querystring.stringify(sortedParams)}`;
}

export function verifyReturnUrl(query: Record<string, string>) {

  const secretKey = process.env.VNPAY_HASH_SECRET;

  if (!secretKey) {
    throw new Error('Missing VNPay config');
  }

  const vnpParams = Object.keys(query)
    .filter((key) => key.startsWith('vnp_'))
    .reduce((acc: Record<string, string>, key) => {
      acc[key] = query[key];
      return acc;
    }, {});

  const secureHash = vnpParams['vnp_SecureHash'];

  delete vnpParams['vnp_SecureHash'];
  delete vnpParams['vnp_SecureHashType'];

  const sortedParams = sortObject(vnpParams);
  const signData = querystring.stringify(sortedParams);

  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac
    .update(Buffer.from(signData, 'utf-8'))
    .digest('hex');

  const orderId = vnpParams['vnp_TxnRef'];
  const amount = Number(vnpParams['vnp_Amount']) / 100;

  return {
    isValid: secureHash === signed,
    orderId,
    amount,
  };
}

function sortObject(obj: any) {
  const sorted: any = {};
  const keys = Object.keys(obj).sort();

  for (const key of keys) {
    if (obj[key]) {
      sorted[key] = obj[key];
    }
  }

  return sorted;
}