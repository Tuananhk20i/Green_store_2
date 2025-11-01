import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Giới thiệu - Green Store',
  description: 'Giới thiệu về Green Store - thực phẩm sạch, an toàn cho sức khỏe',
}

export default function About() {
  return (
    <main className="min-h-screen">
      {/* HERO / BANNER */}
      <section className="relative">
        <div
          className="h-56 sm:h-72 lg:h-96 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1400&q=60')",
          }}
        >
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide">GIỚI THIỆU VỀ CHÚNG TÔI</h1>
              <p className="mt-3 text-sm sm:text-base opacity-90">CHÀO MỪNG ĐẾN VỚI NHÀ CUNG CẤP SẢN PHẨM HỮU CƠ CHỨNG NHẬN TRỰC TUYẾN</p>
            </div>
          </div>
        </div>

        {/* Breadcrumb overlapping hero (above overlay) */}
        <div className="absolute left-0 right-0 -bottom-6 flex justify-center z-30 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-md px-4 py-2 mx-4 shadow-md max-w-7xl w-full">
            <div className="flex items-center justify-between text-sm text-gray-700">
              <nav className="flex items-center gap-2">
                <Link href="/" className="hover:text-lime-600">TRANG CHỦ</Link>
                <span className="text-gray-300">&gt;</span>
                <span className="text-lime-600 font-semibold">GIỚI THIỆU</span>
              </nav>
              <div className="text-sm text-gray-500 hidden sm:block">Chúng tôi cung cấp sản phẩm hữu cơ, xanh, sạch 100%</div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY SECTION - image left, text right (matches image) */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <Image
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=60"
                  alt="story-image"
                  width={900}
                  height={700}
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">GIỚI THIỆU VỀ CHÚNG TÔI</h2>
              <div className="mb-4 text-sm text-lime-600 uppercase tracking-widest">Giới thiệu công ty</div>
              <p className="italic text-gray-600 mb-4">Thực phẩm của chúng ta nên là thuốc của chúng ta. Thuốc hữu cơ của chúng ta nên là thực phẩm của chúng ta cho sức khỏe của bạn.</p>
              <p className="text-gray-700 mb-6">Chúng tôi bắt đầu Green Store để kết nối các trang trại có trách nhiệm và người tiêu dùng có ý thức. Từ việc lựa chọn trang trại đến đóng gói và giao hàng, kiểm soát chất lượng và khả năng truy xuất nguồn gốc là ưu tiên hàng đầu của chúng tôi. Chúng tôi hỗ trợ nông nghiệp bền vững và các phương pháp thương mại công bằng.</p>

              <div className="flex gap-4 mb-6">
                <div className="flex-1 p-4 border rounded text-center">
                  <div className="text-3xl font-bold text-lime-600">745+</div>
                  <div className="text-sm text-gray-600">Nông dân trồng trọt</div>
                </div>
                <div className="flex-1 p-4 border rounded text-center">
                  <div className="text-3xl font-bold text-lime-600">2480+</div>
                  <div className="text-sm text-gray-600">Nông dân chăn nuôi</div>
                </div>
              </div>

              <button className="inline-block bg-gray-800 text-white px-5 py-2 rounded shadow">READ MORE</button>
            </div>
          </div>
        </div>
      </section>

      {/* GREEN FEATURE BANDS - full width green blocks */}
      <section className="bg-lime-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-lime-500/80 border border-lime-500 rounded text-center">
              <div className="mb-3 font-semibold">SẢN PHẨM THỊT SẠCH</div>
              <p className="text-sm opacity-90">Thực phẩm sạch không chỉ là nguồn dinh dưỡng cho cơ thể mà còn là tình yêu và sự tôn trọng đối với sức khỏe của chính mình và hành tinh này.</p>
              <div className="mt-4">
                <Link href="/products" className="inline-block border border-white px-4 py-2 text-sm">SHOP NOW</Link>
              </div>
            </div>

            <div className="p-8 bg-lime-500/80 border border-lime-500 rounded text-center">
              <div className="mb-3 font-semibold">SẢN PHẨM RAU CỦ HỮU CƠ</div>
              <p className="text-sm opacity-90">Thực phẩm sạch là thuốc bổ tự nhiên mạnh mẽ nhất mà bạn có thể cung cấp cho cơ thể mỗi ngày.</p>
              <div className="mt-4">
                <Link href="/products" className="inline-block border border-white px-4 py-2 text-sm">SHOP NOW</Link>
              </div>
            </div>

            <div className="p-8 bg-lime-500/80 border border-lime-500 rounded text-center">
              <div className="mb-3 font-semibold">SẢN PHẨM TRÁI CÂY HỮU CƠ</div>
              <p className="text-sm opacity-90">Chọn thực phẩm sạch không phải là xu hướng, mà là nền tảng của một cuộc sống khỏe mạnh và tràn đầy năng lượng.</p>
              <div className="mt-4">
                <Link href="/products" className="inline-block border border-white px-4 py-2 text-sm">SHOP NOW</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY PROCESS */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">DELIVERY PROCESS</h2>
          <p className="text-sm text-lime-600 mb-8">Simple steps to get your order</p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
            {[
              ['CUSTOMER ORDER','Orders captured by warehouse APL.'],
              ['PACKING','Careful packing to keep products fresh.'],
              ['DELIVERY','Fast and reliable delivery to your doorstep.'],
              ['REPORTING','Order tracking and after-sales support.'],
            ].map(([title, desc], idx) => (
              <div key={idx} className="p-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-lime-100 flex items-center justify-center mb-4">
                  <div className="text-lime-600 font-bold">{idx+1}</div>
                </div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-gray-600 mt-2">{desc}</p>
              </div>
            ))}
          </div>

          <Link href="/products" className="inline-block bg-lime-600 text-white px-6 py-2 rounded">SHOP PRODUCTS</Link>
        </div>
      </section>

      {/* GALLERY - dark background with thumbnails */}
      <section className="py-12 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=1400&q=60')" }}>
        <div className="bg-black/60">
          <div className="max-w-7xl mx-auto px-4 py-12 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">OUR GALLERY</h3>
              <div className="flex items-center gap-3 text-sm opacity-90">
                <span className="px-2 py-1 border border-white/20">VEGETABLES</span>
                <span className="px-2 py-1 border border-white/20">FRUITS & DRINKS</span>
                <span className="px-2 py-1 border border-white/20">FRESH MEAT</span>
                <span className="px-2 py-1 border border-white/20">BEAUTY CARE</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171',
                'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1538826051293-02b4da7acc5f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1180',
                'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
                'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=60',
                'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=60',
              ].map((src, i) => (
                <div key={i} className="overflow-hidden rounded shadow-lg">
                  <img src={src} alt={`gallery-${i}`} className="w-full h-36 object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
