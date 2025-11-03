import crypto from 'crypto';
import querystring from 'querystring';

// Ensure required environment variables are present
const vnpTmnCode = process.env.VNPAY_TMN_CODE;
const vnpHashSecret = process.env.VNPAY_HASH_SECRET;

if (!vnpTmnCode || !vnpHashSecret) {
  throw new Error('Missing required VNPay configuration: TMN_CODE or HASH_SECRET');
}

const VNPAY_CONFIG = {
  TMN_CODE: vnpTmnCode,
  HASH_SECRET: vnpHashSecret,
  URL: process.env.VNPAY_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  RETURN_URL: process.env.VNPAY_RETURN_URL || (process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/api/payment/vnpay/return`
    : 'http://localhost:3000/api/payment/vnpay/return'),
} as const;

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
  const tmnCode = VNPAY_CONFIG.TMN_CODE;
  const secretKey = VNPAY_CONFIG.HASH_SECRET;
  const returnUrl = VNPAY_CONFIG.RETURN_URL;

  const date = new Date();
  const createDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date
    .getDate()
    .toString()
    .padStart(2, '0')}${date.getHours().toString().padStart(2, '0')}${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;

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
    vnp_Amount: amount * 100, // Convert to smallest currency unit
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: process.env.NODE_ENV === 'production' ? process.env.SERVER_IP || '127.0.0.1' : '127.0.0.1',
    vnp_CreateDate: createDate,
  };

  if (bankCode) {
    vnpParams.vnp_BankCode = bankCode;
  }

  // Sort params by key
  const sortedParams = sortObject(vnpParams);
  const signData = Object.entries(sortedParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  sortedParams['vnp_SecureHash'] = signed;

  return `${VNPAY_CONFIG.URL}?${querystring.stringify(sortedParams)}`;
}

export function verifyReturnUrl(query: Record<string, string>): { isValid: boolean; orderId?: string; amount?: number } {
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
  const hmac = crypto.createHmac('sha512', VNPAY_CONFIG.HASH_SECRET);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  const orderId = vnpParams['vnp_TxnRef'];
  const amount = Number(vnpParams['vnp_Amount']) / 100; // Convert back from smallest unit

  return {
    isValid: secureHash === signed,
    orderId,
    amount,
  };
}

function sortObject(obj: any): any {
  const sorted: any = {};
  const keys = Object.keys(obj).sort();
  
  for (const key of keys) {
    if (obj[key]) {
      sorted[key] = obj[key];
    }
  }
  
  return sorted;
}