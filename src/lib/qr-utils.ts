import QRCode from 'qrcode';

export const generateProductQRCode = async (slug: string) => {
  // Thay domain bằng domain thực tế của bạn khi deploy
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/products/${slug}`;
  
  try {
    const qrImage = await QRCode.toDataURL(url, {
      width: 200,
      margin: 2,
      color: {
        dark: '#059669', // Màu xanh lá cây phù hợp với tone "Green Store"
        light: '#FFFFFF',
      },
    });
    return qrImage;
  } catch (err) {
    console.error(err);
    return null;
  }
};