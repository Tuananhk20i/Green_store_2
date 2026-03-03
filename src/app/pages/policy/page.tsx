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
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Chính sách chung</h2>

    <p className="text-gray-700 mb-4">
      Green Store cam kết mang đến cho khách hàng những sản phẩm chất lượng cao,
      nguồn gốc rõ ràng và dịch vụ chăm sóc tận tâm. Các chính sách dưới đây
      được xây dựng nhằm đảm bảo quyền lợi của khách hàng cũng như duy trì
      tiêu chuẩn hoạt động minh bạch, chuyên nghiệp và bền vững.
    </p>

    {/* GIAO HÀNG */}
    <div className="flex gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-md transition mb-8">
  <div className="text-4xl">🚚</div>
  <div>
    <h3 className="font-semibold text-gray-800 text-lg mb-2">
      1. Chính sách giao hàng
    </h3>

    <p className="text-gray-700 mb-3">
      Green Store hỗ trợ giao hàng trên toàn quốc thông qua các đối tác vận chuyển uy tín.
      Thời gian giao hàng dự kiến từ <strong>1 – 5 ngày làm việc</strong> tùy theo khu vực.
    </p>

    <ul className="list-disc pl-6 text-gray-700 space-y-2">
      <li>Đơn hàng nội thành: 1 – 2 ngày làm việc.</li>
      <li>Đơn hàng liên tỉnh: 2 – 5 ngày làm việc.</li>
      <li>Phí vận chuyển tính theo khu vực.</li>
    </ul>

    <p className="text-gray-700">
      Trong trường hợp phát sinh chậm trễ do thời tiết, thiên tai hoặc sự cố ngoài ý muốn,
      Green Store sẽ chủ động thông báo đến khách hàng trong thời gian sớm nhất.
    </p>
  </div>
</div>

    {/* DOI TRA */}
    <div className="flex gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-md transition mb-8">
  <div className="text-4xl">🔄</div>
  <div>
    <p className="text-gray-700 mb-3">
      Chúng tôi hỗ trợ đổi trả sản phẩm trong vòng <strong>07 ngày</strong> kể từ ngày nhận hàng
      nếu đáp ứng đủ các điều kiện sau:
    </p>

    <p className="text-gray-700 mb-3">
      Hỗ trợ đổi trả trong vòng <strong>07 ngày</strong>...
    </p>

    <ul className="list-disc pl-6 text-gray-700 space-y-2">
      <li>Sản phẩm bị lỗi do nhà sản xuất.</li>
      <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển.</li>
      <li>Sản phẩm giao không đúng mẫu mã, số lượng theo đơn đặt hàng.</li>
      <li>Sản phẩm còn nguyên bao bì, tem nhãn và chưa qua sử dụng.</li>
    </ul>

    <p className="text-gray-700">
      Các trường hợp không áp dụng đổi trả bao gồm: sản phẩm đã qua sử dụng,
      hư hỏng do bảo quản không đúng cách hoặc hết thời hạn đổi trả theo quy định.
    </p>

  </div>
</div>

    {/* BAO MAT */}
    <div className="flex gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-md transition mb-8">
  <div className="text-4xl">🔐</div>
  <div>
    <h3 className="font-semibold text-gray-800 text-lg mb-2">
      3. Chính sách bảo mật thông tin
    </h3>

    <p className="text-gray-700 mb-3">
      Green Store cam kết bảo mật tuyệt đối mọi thông tin cá nhân của khách hàng.
      Thông tin thu thập chỉ được sử dụng cho các mục đích:
    </p>

    <ul className="list-disc pl-6 text-gray-700 space-y-2">
      <li>Xử lý đơn hàng.</li>
      <li>Chăm sóc khách hàng.</li>
      <li>Gửi khuyến mãi khi được đồng ý.</li>
    </ul>
    <p className="text-gray-700">
      Chúng tôi không chia sẻ, mua bán hoặc trao đổi thông tin khách hàng cho bên thứ ba
      khi chưa có sự đồng ý, trừ trường hợp theo yêu cầu của cơ quan pháp luật.
    </p>
  </div>
</div>

    {/* THANH TOAN */}
    <div className="flex gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-md transition mb-8">
  <div className="text-4xl">💳</div>
  <div>
    <h3 className="font-semibold text-gray-800 text-lg mb-2">
      4. Chính sách thanh toán
    </h3>

    <p className="text-gray-700 mb-3">
      Green Store hỗ trợ các hình thức thanh toán linh hoạt:
    </p>

    <ul className="list-disc pl-6 text-gray-700 space-y-2">
      <li>Thanh toán khi nhận hàng (COD).</li>
      <li>Chuyển khoản ngân hàng.</li>
      <li>Ví điện tử.</li>
    </ul>
    <p className="text-gray-700">
      Mọi giao dịch đều được xác nhận minh bạch và có chứng từ rõ ràng.
    </p>
  </div>
</div>
    {/* DIEU KHOAN */}
    <div className="flex gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-md transition">
  <div className="text-4xl">📜</div>
  <div>
    <h3 className="font-semibold text-gray-800 text-lg mb-2">
      5. Điều khoản sử dụng
    </h3>

    <p className="text-gray-700">
      Khi truy cập và mua sắm tại Green Store, khách hàng đồng ý tuân thủ
      các điều khoản và điều kiện được công bố trên website. Chúng tôi
      có quyền cập nhật hoặc điều chỉnh chính sách bất cứ lúc nào để
      phù hợp với quy định pháp luật và tình hình hoạt động thực tế.
    </p>
    <p className="text-gray-700 mt-4">
      Nếu có bất kỳ thắc mắc nào liên quan đến chính sách, vui lòng liên hệ
      bộ phận chăm sóc khách hàng để được hỗ trợ kịp thời.
    </p>
  </div>
</div>
  </div>
</div>
      </section>
    </main>
  )
}
