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
                <h2 className="text-xl font-bold mb-4">LIÊN HỆ VỚI CHÚNG TÔI</h2>
                <p className="text-sm text-gray-600 mb-6">Bạn có câu hỏi? Gửi cho chúng tôi thông tin và chúng tôi sẽ liên hệ lại sớm nhất có thể.</p>

                <ContactForm />
              </div>
            </div>

            <aside>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="font-semibold mb-3">LIÊN HỆ</h3>
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
                  <h4 className="font-semibold">GIỜ LÀM VIỆC</h4>
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
      <section className="">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded overflow-hidden shadow">
            {/* Using Google Maps embed iframe - no API key required for embed URLs */}
            <iframe
              title="company-location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193571.43848350414!2d-74.11808661929162!3d40.70582532031509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250b3d3e26b1b%3A0x631b6f0a7c8f6b2b!2sNew%20York%2C%20USA!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
              className="w-full h-72 md:h-96 border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
