'use client'
import { useSearchParams } from 'next/navigation'

export default function OriginPage() {
  const searchParams = useSearchParams();
  const productName = searchParams.get('name');
  const externalLink = searchParams.get('external');

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header xác thực */}
      <div className="bg-green-600 text-white p-6 text-center shadow-md">
        <div className="flex justify-center mb-2">
           <span className="bg-white text-green-600 text-xs font-bold px-2 py-1 rounded-full uppercase">
             Đã xác minh bởi Green Store
           </span>
        </div>
        <h1 className="text-xl font-bold">Hồ Sơ Truy Xuất Nguồn Gốc</h1>
        <p className="text-sm opacity-90">{productName}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-6 space-y-6">
        {/* Thông tin chủ cơ sở */}
        <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 border-b pb-2 mb-3">🌿 Đơn vị sản xuất</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Chủ trang trại</p>
              <p className="font-medium">Nguyễn Phan Tuấn Anh</p>
            </div>
            <div>
              <p className="text-gray-500">Vùng trồng</p>
              <p className="font-medium">Thái Nguyên, VN</p>
            </div>
          </div>
        </section>

        {/* Chèn Link gốc / Tài liệu gốc */}
        <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-3">📄 Tài liệu kiểm định gốc</h2>
          <p className="text-xs text-gray-500 mb-4">
            Dưới đây là link trực tiếp dẫn đến hệ thống quản lý của nhà sản xuất hoặc giấy chứng nhận VietGAP.
          </p>
          
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex flex-col items-center">
            <p className="text-sm text-blue-800 font-medium mb-3 text-center">
              Nhấn vào nút dưới đây để xem chứng nhận gốc từ đơn vị cung cấp
            </p>
            <a 
              href={externalLink || '#'} 
              target="_blank"
              className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-lg"
            >
              MỞ TRANG GỐC NHÀ SẢN XUẤT
            </a>
          </div>
        </section>

        {/* Quy trình sản xuất sạch */}
        <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-3">🔄 Quy trình 5 bước</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-3">
              <span className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center font-bold">1</span>
              <p>Kiểm định nguồn nước và đất trồng định kỳ.</p>
            </div>
            <div className="flex gap-3">
              <span className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center font-bold">2</span>
              <p>Sử dụng hạt giống F1 sạch bệnh.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="mt-10 text-center text-gray-400 text-xs px-10">
        Hệ thống Green Store cam kết tính minh bạch của dữ liệu này. 
        Mọi sai sót vui lòng liên hệ hotline: 1900-xxxx.
      </footer>
    </div>
  )
}