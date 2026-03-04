import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Câu hỏi Thường gặp - Green Store",
  description:
    "Giải đáp các câu hỏi phổ biến về đặt hàng, giao hàng, thanh toán, đổi trả và chính sách tại Green Store.",
}

const faqCategories = [
  {
    title: "🛒 Đặt hàng & Thanh toán",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=60",
    faqs: [
      {
        q: "Làm thế nào để đặt hàng trên website?",
        a: "Chọn sản phẩm → Thêm vào giỏ hàng → Nhập địa chỉ → Chọn phương thức thanh toán → Xác nhận đơn hàng."
      },
      {
        q: "Tôi có cần tạo tài khoản để mua hàng không?",
        a: "Không bắt buộc. Tuy nhiên, tạo tài khoản giúp theo dõi đơn hàng và nhận ưu đãi tốt hơn."
      },
      {
        q: "Green Store hỗ trợ những phương thức thanh toán nào?",
        a: "COD, chuyển khoản ngân hàng, ví điện tử và thanh toán online qua cổng bảo mật."
      },
      {
        q: "Thanh toán online có an toàn không?",
        a: "Chúng tôi sử dụng hệ thống mã hóa SSL và cổng thanh toán đạt chuẩn bảo mật quốc tế."
      },
      {
        q: "Tôi có thể hủy đơn hàng sau khi đặt không?",
        a: "Bạn có thể hủy trước khi đơn hàng được bàn giao cho đơn vị vận chuyển."
      }
    ]
  },
  {
    title: "🚚 Giao hàng & Theo dõi đơn",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=60",
    faqs: [
      {
        q: "Thời gian giao hàng mất bao lâu?",
        a: "Nội thành: 1–3 ngày. Tỉnh khác: 2–5 ngày tùy khu vực."
      },
      {
        q: "Tôi có thể theo dõi đơn hàng ở đâu?",
        a: "Đăng nhập → Vào mục Đơn hàng → Xem trạng thái hoặc dùng mã tracking gửi qua email."
      },
      {
        q: "Có giao hàng trong ngày không?",
        a: "Một số khu vực nội thành có hỗ trợ giao nhanh 4–6 giờ."
      },
      {
        q: "Nếu tôi không nhận được hàng thì sao?",
        a: "Vui lòng liên hệ CSKH trong vòng 24h để được hỗ trợ kiểm tra."
      }
    ]
  },
  {
    title: "🔄 Đổi trả & Hoàn tiền",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=60",
    faqs: [
      {
        q: "Chính sách đổi trả như thế nào?",
        a: "Đổi trả trong 7 ngày nếu sản phẩm lỗi hoặc hư hỏng do vận chuyển."
      },
      {
        q: "Thời gian hoàn tiền mất bao lâu?",
        a: "Từ 3–7 ngày làm việc tùy phương thức thanh toán."
      },
      {
        q: "Tôi cần cung cấp gì khi đổi trả?",
        a: "Mã đơn hàng và hình ảnh sản phẩm lỗi."
      }
    ]
  },
  {
    title: "🥬 Sản phẩm & Bảo quản",
    image:
      "https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?auto=format&fit=crop&w=1200&q=60",
    faqs: [
      {
        q: "Sản phẩm có nguồn gốc rõ ràng không?",
        a: "Tất cả sản phẩm đều có thông tin nhà cung cấp và tiêu chuẩn kiểm định."
      },
      {
        q: "Rau củ nên bảo quản như thế nào?",
        a: "Giữ ở ngăn mát 4–8°C và dùng trong 3–5 ngày."
      },
      {
        q: "Sản phẩm có chứng nhận hữu cơ không?",
        a: "Một số sản phẩm có chứng nhận VietGAP, GlobalGAP hoặc hữu cơ."
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="relative">
        <div
          className="h-64 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1400&q=60')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative flex items-center justify-center h-full text-white text-center">
            <div>
              <h1 className="text-4xl font-extrabold">CÂU HỎI THƯỜNG GẶP</h1>
              <p className="mt-3 opacity-90">
                Giải đáp nhanh các thắc mắc phổ biến khi mua hàng tại Green Store
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-16">

          {faqCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl shadow p-8">

              {/* CATEGORY HEADER */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 relative rounded-xl overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {category.title}
                </h2>
              </div>

              {/* QUESTIONS */}
              <div className="space-y-4">
                {category.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:shadow-md"
                  >
                    <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-800">
                      {faq.q}
                      <span className="transition-transform duration-300 group-open:rotate-45 text-lime-600 text-xl">
                        +
                      </span>
                    </summary>

                    <div className="mt-4 text-gray-600 leading-relaxed animate-fadeIn">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqCategories.flatMap(category =>
        category.faqs.map(faq => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a
          }
        }))
      )
    })
  }}
/>