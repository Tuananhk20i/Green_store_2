import Link from 'next/link'

export const metadata = {
  title: 'Câu hỏi Thường gặp - Green Store',
  description: 'Câu hỏi thường gặp về mua hàng, vận chuyển, hoàn trả và chính sách tại Green Store',
}

const faqs = [
  {
    q: 'Làm thế nào để đặt hàng trên website?',
    a: 'Bạn có thể chọn sản phẩm, thêm vào giỏ hàng và làm theo hướng dẫn tại trang thanh toán để hoàn tất đặt hàng. Hỗ trợ thanh toán khi nhận hàng (COD) và chuyển khoản ngân hàng.'
  },
  {
    q: 'Thời gian giao hàng mất bao lâu?',
    a: 'Thời gian giao hàng thông thường là 2-5 ngày làm việc trong nội thành. Với tỉnh/thành khác có thể lâu hơn. Thời gian cụ thể hiển thị khi chọn địa chỉ giao hàng.'
  },
  {
    q: 'Chính sách đổi trả như thế nào?',
    a: 'Sản phẩm hư hỏng do vận chuyển hoặc lỗi nhà cung cấp có thể đổi/trả trong vòng 7 ngày kể từ ngày nhận hàng. Vui lòng liên hệ bộ phận chăm sóc khách hàng để được hướng dẫn.'
  },
  {
    q: 'Tôi có thể yêu cầu hóa đơn VAT không?',
    a: 'Vâng — chọn yêu cầu hóa đơn khi thanh toán hoặc liên hệ với chúng tôi sau khi đặt hàng để cung cấp thông tin xuất hóa đơn.'
  },
  {
    q: 'Sản phẩm có bảo quản lạnh không?',
    a: 'Một số sản phẩm yêu cầu bảo quản lạnh. Thông tin bảo quản được ghi rõ trên trang chi tiết sản phẩm.'
  },
  {
    q: 'Làm sao để theo dõi đơn hàng của tôi?',
    a: 'Bạn sẽ nhận được mã theo dõi qua email/SMS khi đơn hàng được chuyển cho đơn vị vận chuyển. Ngoài ra, đăng nhập vào tài khoản và vào trang Đơn hàng để xem trạng thái.'
  },
  {
    q: 'Có chương trình khuyến mãi cho khách hàng mới không?',
    a: 'Chúng tôi thường có chương trình khuyến mãi cho khách hàng mới và khách hàng đăng ký newsletter. Theo dõi trang Khuyến mãi hoặc đăng ký nhận tin để cập nhật.'
  },
  {
    q: 'Làm thế nào để liên hệ bộ phận hỗ trợ?',
    a: 'Bạn có thể sử dụng trang Liên hệ để gửi tin nhắn, gọi số hotline hoặc chat trực tiếp nếu có.'
  }
]

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative">
        <div
          className="h-56 sm:h-72 lg:h-96 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1400&q=60')" }}
        >
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">CÂU HỎI THƯỜNG GẶP</h1>
              <p className="mt-2 text-sm sm:text-base opacity-90">Những câu hỏi phổ biến về đặt hàng, giao nhận và chính sách</p>
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
              <span className="text-lime-600 font-semibold">CÂU HỎI THƯỜNG GẶP</span>
            </nav>
            <div className="text-sm text-gray-500">Có {faqs.length} mục hỏi đáp</div>
          </div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white p-8 rounded shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((f, i) => (
                <details key={i} className="group border border-gray-100 rounded-lg p-4" open={i < 2}>
                  <summary className="cursor-pointer list-none font-semibold flex items-center justify-between">
                    <span className="text-gray-800">{f.q}</span>
                    <span className="ml-3 text-gray-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="mt-3 text-gray-600">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
