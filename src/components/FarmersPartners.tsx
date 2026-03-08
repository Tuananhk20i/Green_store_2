/*'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

interface Partner {
  id: number
  name: string
  location: string
  image: string
  description?: string
  social?: {
    facebook?: string
    phone?: string
  }
}

const partners: Partner[] = [
  {
    id: 1,
    name: 'Nông trại Đà Lạt',
    location: 'Đà Lạt, Lâm Đồng',
    image: 'https://images.pexels.com/photos/5231143/pexels-photo-5231143.jpeg',
    description: 'Chuyên cung cấp rau củ cao cấp',
    social: { phone: '0901234567' }
  },
  {
    id: 2,
    name: 'HTX Đồng Tháp',
    location: 'Đồng Tháp',
    image: 'https://images.pexels.com/photos/29677343/pexels-photo-29677343.jpeg',
    description: 'Gạo thơm chất lượng xuất khẩu',
    social: { phone: '0901234568' }
  },
  {
    id: 3,
    name: 'Vườn trái cây Cần Thơ',
    location: 'Cần Thơ',
    image: 'https://images.pexels.com/photos/7299990/pexels-photo-7299990.jpeg',
    description: 'Hoa quả nhiệt đới tươi ngon',
    social: { phone: '0901234569' }
  },
  {
    id: 4,
    name: 'Trang trại Hà Nội',
    location: 'Hà Nội',
    image: 'https://images.pexels.com/photos/4918098/pexels-photo-4918098.jpeg',
    description: 'Rau an toàn VietGAP',
    social: { phone: '0901234570' }
  },
  {
    id: 5,
    name: 'HTX Nghệ An',
    location: 'Nghệ An',
    image: 'https://images.pexels.com/photos/3304057/pexels-photo-3304057.jpeg',
    description: 'Đặc sản vùng núi phía Bắc',
    social: { phone: '0901234571' }
  },
  {
    id: 6,
    name: 'Vùng biển Nha Trang',
    location: 'Nha Trang, Khánh Hòa',
    image: 'https://images.pexels.com/photos/1316074/pexels-photo-1316074.jpeg',
    description: 'Hải sản tươi sống mỗi ngày',
    social: { phone: '0901234572' }
  }
]

export default function FarmersPartners() {
  return (
    <section className="mb-16 bg-gradient-to-br from-[#f4f8f0] to-white rounded-3xl py-12 px-6 shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-3">
          Đối tác & Nhà vườn
        </h2>
        <p className="text-gray-600 text-lg">
          Hợp tác cùng các nhà vườn và HTX uy tín trên khắp cả nước
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24
            }
          }}
          className="farmers-partners-swiper"
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {/* Image /}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {/* Location Badge /}
                  <div className="absolute top-4 left-4 bg-gradient-primary text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    📍 {partner.location}
                  </div>

                  {/* Hover Overlay /}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    {partner.description && (
                      <p className="text-white text-sm mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {partner.description}
                      </p>
                    )}
                    
                    {partner.social && (
                      <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {partner.social.phone && (
                          <a
                            href={`tel:${partner.social.phone}`}
                            className="bg-white/90 hover:bg-white text-[#6a9739] p-2 rounded-full transition-colors"
                            aria-label="Gọi điện"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </a>
                        )}
                        {partner.social.facebook && (
                          <a
                            href={partner.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/90 hover:bg-white text-[#6a9739] p-2 rounded-full transition-colors"
                            aria-label="Facebook"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Info /}
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#6a9739] transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {partner.location}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .farmers-partners-swiper .swiper-button-next,
        .farmers-partners-swiper .swiper-button-prev {
          color: #6a9739;
          background: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .farmers-partners-swiper .swiper-button-next:after,
        .farmers-partners-swiper .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }
        .farmers-partners-swiper .swiper-button-next:hover,
        .farmers-partners-swiper .swiper-button-prev:hover {
          background: #6a9739;
          color: white;
        }
      `}</style>
    </section>
  )
}*/
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight, MapPin, Phone, Facebook } from 'lucide-react'

import 'swiper/css'

interface Partner {
  id: number
  name: string
  location: string
  image: string
  description?: string
  social?: {
    facebook?: string
    phone?: string
  }
}

const partners: Partner[] = [
  {
    id: 1,
    name: 'Nông trại Đà Lạt',
    location: 'Đà Lạt, Lâm Đồng',
    image: 'https://images.pexels.com/photos/5231143/pexels-photo-5231143.jpeg',
    description: 'Chuyên cung cấp rau củ cao cấp đạt chuẩn VietGAP',
    social: { phone: '0901234567' }
  },
  {
    id: 2,
    name: 'HTX Đồng Tháp',
    location: 'Đồng Tháp',
    image: 'https://images.pexels.com/photos/29677343/pexels-photo-29677343.jpeg',
    description: 'Gạo thơm chất lượng xuất khẩu, không thuốc trừ sâu',
    social: { phone: '0901234568' }
  },
  {
    id: 3,
    name: 'Vườn trái cây Cần Thơ',
    location: 'Cần Thơ',
    image: 'https://images.pexels.com/photos/7299990/pexels-photo-7299990.jpeg',
    description: 'Hoa quả nhiệt đới tươi ngon hái tận vườn',
    social: { phone: '0901234569' }
  },
  {
    id: 4,
    name: 'Trang trại Hà Nội',
    location: 'Hà Nội',
    image: 'https://images.pexels.com/photos/4918098/pexels-photo-4918098.jpeg',
    description: 'Rau an toàn VietGAP cung ứng nội thành',
    social: { phone: '0901234570' }
  },
  {
    id: 5,
    name: 'HTX Nghệ An',
    location: 'Nghệ An',
    image: 'https://images.pexels.com/photos/3304057/pexels-photo-3304057.jpeg',
    description: 'Đặc sản vùng núi phía Bắc hương vị tự nhiên',
    social: { phone: '0901234571' }
  },
  {
    id: 6,
    name: 'Vùng biển Nha Trang',
    location: 'Nha Trang, Khánh Hòa',
    image: 'https://images.pexels.com/photos/1316074/pexels-photo-1316074.jpeg',
    description: 'Hải sản tươi sống đánh bắt trong ngày',
    social: { phone: '0901234572' }
  }
]

export default function FarmersPartners() {
  return (
    <section className="mb-24 relative py-16 px-4 overflow-hidden group/section">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-green-50/30 -z-10 rounded-[3rem]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-3 block">Nguồn gốc tin cậy</span>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
          Đối tác <span className="text-gradient-primary">& Nhà vườn</span>
        </h2>
        <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative px-4 md:px-12">
        
        {/* Nút Điều Hướng Custom (Prev) */}
        <button className="swiper-prev-btn absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl text-gray-800 hover:bg-green-600 hover:text-white transition-all duration-300 border border-gray-100 opacity-0 group-hover/section:opacity-100 -translate-x-4 group-hover/section:translate-x-0 disabled:opacity-20">
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Nút Điều Hướng Custom (Next) */}
        <button className="swiper-next-btn absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl text-gray-800 hover:bg-green-600 hover:text-white transition-all duration-300 border border-gray-100 opacity-0 group-hover/section:opacity-100 translate-x-4 group-hover/section:translate-x-0 disabled:opacity-20">
          <ChevronRight className="w-6 h-6" />
        </button>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={{
            prevEl: '.swiper-prev-btn',
            nextEl: '.swiper-next-btn',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          className="pb-12"
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl transition-all duration-500 border border-gray-50"
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Glassmorphism Location Badge */}
                  <div className="absolute top-4 left-4 backdrop-blur-md bg-white/70 text-gray-900 px-4 py-1.5 rounded-2xl text-[11px] font-bold flex items-center gap-1.5 shadow-sm border border-white/50">
                    <MapPin className="w-3.5 h-3.5 text-green-600" />
                    {partner.location}
                  </div>

                  {/* Hover Overlay Nội dung */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                    <p className="text-white/90 text-sm mb-4 leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {partner.description}
                    </p>
                    <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {partner.social?.phone && (
                        <a href={`tel:${partner.social.phone}`} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-700 hover:bg-green-500 hover:text-white transition-colors shadow-lg">
                          <Phone className="w-5 h-5" />
                        </a>
                      )}
                      {partner.social?.facebook && (
                        <a href={partner.social.facebook} target="_blank" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-700 hover:bg-green-500 hover:text-white transition-colors shadow-lg">
                          <Facebook className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6 text-center">
                  <h3 className="font-extrabold text-xl text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {partner.name}
                  </h3>
                  <div className="w-8 h-1 bg-green-100 mx-auto rounded-full group-hover:w-16 group-hover:bg-green-500 transition-all duration-500" />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
