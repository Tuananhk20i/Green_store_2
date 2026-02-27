import Link from 'next/link'

export const metadata = {
  title: 'Pages - Green Store',
  description: 'Trang khác — danh sách các trang tĩnh như FAQ, Testimonials, About',
}

export default function PagesIndex() {
  const pages = [
    {
      title: 'Câu hỏi Thường gặp',
      href: '/pages/faq',
      image: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=800&q=60',
      excerpt: 'Các câu hỏi thường gặp về đặt hàng, vận chuyển, hoàn trả và chính sách.'
    },
    {
      title: 'Testimonials',
      href: '/pages/testimonials',
      image: 'https://plus.unsplash.com/premium_photo-1661811804102-0da6840d7327?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172',
      excerpt: 'Ý kiến khách hàng về chất lượng sản phẩm và dịch vụ của chúng tôi.'
    },
    {
      title: 'Team',
      href: '/pages/team',
      image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=60',
      excerpt: 'Gặp gỡ đội ngũ đằng sau Green Store.'
    },
  ]

  return (
    <main className="min-h-screen">
      <section className="relative">
        <div
          className="h-56 sm:h-72 lg:h-96 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588152850700-c82ecb8ba9b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')" }}
        >
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">PAGES</h1>
              <p className="mt-2 text-sm sm:text-base opacity-90">Các trang tĩnh: FAQ, Testimonials, Team, v.v.</p>
            </div>
          </div>
        </div>

        <div className="bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600 flex items-center justify-between">
            <nav className="flex items-center gap-2">
              <Link href="/" className="hover:text-lime-600">TRANG CHỦ</Link>
              <span className="text-gray-300">&gt;</span>
              <span className="text-lime-600 font-semibold">PAGES</span>
            </nav>
            <div className="text-sm text-gray-500">Chọn một trang để xem nội dung</div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Trang khác</h2>
          <p className="text-gray-600 mb-6">Các trang tĩnh bổ sung: FAQ, Testimonials và Team.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pages.map((p) => (
              <article key={p.href} className="border rounded overflow-hidden shadow-sm bg-white">
                <div className="h-44 bg-gray-100 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-700 mb-4">{p.excerpt}</p>
                  <Link href={p.href} className="inline-block text-lime-600 font-semibold">Xem chi tiết →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
