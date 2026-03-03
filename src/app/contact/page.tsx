import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact Us - Green Store',
  description: 'Liên hệ với Green Store - đặt câu hỏi, khiếu nại hoặc hợp tác',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative">
        <div
          className="h-56 sm:h-72 lg:h-96 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332')" }}
        >
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">LIÊN HỆ</h1>
              <p className="mt-2 text-sm sm:text-base opacity-90">CHÀO MỪNG ĐẾN VỚI NHÀ CUNG CẤP SẢN PHẨM HỮU CƠ CHỨNG NHẬN TRỰC TUYẾN</p>
            </div>
          </div>
        </div>

        <div className="bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600 flex items-center justify-between">
            <nav className="flex items-center gap-2">
              <Link href="/" className="hover:text-lime-600">TRANG CHỦ</Link>
              <span className="text-gray-300">&gt;</span>
              <span className="text-lime-600 font-semibold">LIÊN HỆ</span>
            </nav>
            <div className="text-sm text-gray-500">Đặt hàng qua điện thoại: <span className="font-semibold">+84 123 456 789</span></div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded shadow">
                <h2 className="text-xl text-gray-600 font-bold mb-4">LIÊN HỆ VỚI CHÚNG TÔI</h2>
                <p className="text-sm text-gray-600 mb-6">Bạn có câu hỏi? Gửi cho chúng tôi thông tin và chúng tôi sẽ liên hệ lại sớm nhất có thể.</p>

                <ContactForm />
              </div>
            </div>

            <aside>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="font-semibold  text-gray-700 mb-3">LIÊN HỆ</h3>
                <ul className="text-sm space-y-3 text-gray-700">
                  <li>
                    <div className="font-semibold">Địa chỉ</div>
                    <div className="text-gray-500">Số 271, Tòa nhà Hội Chữ thập đỏ, Phường Quang Trung, Thành phố Thái Nguyên, Việt Nam</div>
                  </li>
                  <li>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-500">greentore@gmail.com</div>
                  </li>
                  <li>
                    <div className="font-semibold">Điện thoại</div>
                    <div className="text-gray-500">+84 123 456 789</div>
                  </li>
                </ul>

                <div className="mt-6">
                  <h4 className="font-semibold  text-gray-700 ">GIỜ LÀM VIỆC</h4>
                  <div className="text-sm text-gray-600 mt-2">
                    Thứ Hai - Thứ Sáu: 09.00am đến 07.00pm<br />
                    Thứ Bảy: 10.00am đến 05.00pm<br />
                    Chủ Nhật: Đóng cửa
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Map */}
      <section>
  <div className="max-w-7xl mx-auto px-4">
    <div className="rounded-xl overflow-hidden shadow-lg border">
      <iframe
        title="company-location-thai-nguyen"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107441.6517789967!2d105.72108749490015!3d21.577516976295705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313526e41a2f48ff%3A0x9af085049fb0466f!2zVHAuIFRow6FpIE5ndXnDqm4sIFRow6FpIE5ndXnDqm4sIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1772523494732!5m2!1svi!2s"
        className="w-full h-72 md:h-96 lg:h-[500px] border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      </div>
      </div>
      </section>
    </main>
  )
}
