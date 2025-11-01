import Link from 'next/link'

export const metadata = {
  title: 'Chính sách - Green Store',
  description: 'Chính sách cửa hàng, giao hàng, hoàn trả và bảo mật',
}

export default function PolicyPage() {
  return (
    <main className="min-h-screen">
      <section className="relative">
        <div className="h-56 sm:h-72 lg:h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074')" }}>
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">CHÍNH SÁCH</h1>
              <p className="mt-2 text-sm sm:text-base opacity-90">Thông tin chính sách giao hàng, đổi trả và bảo mật</p>
            </div>
          </div>
        </div>

        <div className="bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600 flex items-center justify-between">
            <nav className="flex items-center gap-2">
              <Link href="/" className="hover:text-lime-600">TRANG CHỦ</Link>
              <span className="text-gray-300">&gt;</span>
              <Link href="/pages" className="hover:text-lime-600">PAGES</Link>
              <span className="text-gray-300">&gt;</span>
              <span className="text-lime-600 font-semibold">CHÍNH SÁCH</span>
            </nav>
            <div className="text-sm text-gray-500">Các chính sách của cửa hàng</div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Chính sách chung</h2>
            <p className="text-gray-700 mb-4">Nội dung chính sách sẽ được cập nhật ở đây. Bao gồm chính sách giao hàng, hoàn trả, bảo mật thông tin và điều khoản dịch vụ.</p>

            <h3 className="font-semibold mt-6 mb-2">Chính sách giao hàng</h3>
            <p className="text-gray-600">Thời gian giao hàng, phí vận chuyển và vùng áp dụng.</p>

            <h3 className="font-semibold mt-6 mb-2">Chính sách đổi trả</h3>
            <p className="text-gray-600">Quy định đổi trả sản phẩm trong trường hợp lỗi, hỏng hoặc không đúng mô tả.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
