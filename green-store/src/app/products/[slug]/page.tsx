'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { formatPrice, calculateDiscountPercentage } from '@/lib/price-utils'
import toast from 'react-hot-toast'
import { useCart } from '@/lib/cart-context'
import QRCode from 'qrcode'

interface Product {
  id: number
  name: string
  slug: string
  brand: string | null
  description: string | null
  price: number
  salePrice: number | null
  isSale: boolean
  stock: number
  imageUrl: string | null
  gallery?: string[]
  category: {
    id: number
    name: string
  } | null
}

export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [relatedLoading, setRelatedLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [activeImage, setActiveImage] = useState<string | null>(null)

  // Hàm tạo QR truy xuất nguồn gốc
  const generateQR = async (currentProduct: Product) => {
    try {
      const ipAddress = '192.168.1.8'; // Cập nhật theo IP của bạn
      let targetPath = '/origin';
      const originExternalLink = "https://nongsandungha.com/";
      const categoryName = currentProduct.category?.name.toLowerCase() || '';

      if (categoryName.includes('rau') || categoryName.includes('củ')) {
        targetPath += '/farm-vegetable';
      } else if (categoryName.includes('thịt')) {
        targetPath += '/farm-livestock';
      }

      const url = `http://${ipAddress}:3000${targetPath}?productId=${currentProduct.id}&name=${encodeURIComponent(currentProduct.name)}&external=${encodeURIComponent(originExternalLink)}`;
      
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 150,
        margin: 2,
        color: { dark: '#166534', light: '#ffffff' }
      });
      setQrCodeUrl(qrDataUrl);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (params.slug) {
      fetchProduct()
    }
  }, [params.slug])

  // Cập nhật ảnh lớn khi sản phẩm tải xong
  useEffect(() => {
    if (product) setActiveImage(product.imageUrl)
  }, [product])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.slug}`)
      const data = await response.json()
      
      if (data.success) {
        setProduct(data.data)
        generateQR(data.data)
        fetchRelatedProducts(data.data.id)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async (excludeId: number) => {
    setRelatedLoading(true)
    try {
      const response = await fetch(`/api/products/related?excludeId=${excludeId}&limit=10`)
      const data = await response.json()
      
      if (data.success) {
        setRelatedProducts(data.data)
      }
    } catch (error) {
      console.error('Error fetching related products:', error)
    } finally {
      setRelatedLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return
    setAddingToCart(true)
    try {
      const success = await addToCart(product.id, quantity)
      if (success) toast.success('Đã thêm vào giỏ hàng!')
      else toast.error('Có lỗi xảy ra')
    } catch (error) {
      toast.error('Có lỗi xảy ra')
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) return <div className="p-10 text-center animate-pulse">Đang tải sản phẩm...</div>
  if (!product) return <div className="p-10 text-center">Sản phẩm không tồn tại</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="w-full h-[400px] bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden mb-4 border">
            <img
              src={activeImage || product.imageUrl || '/placeholder.png'}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
            <button
              onClick={() => setActiveImage(product.imageUrl)}
              className={`w-20 h-20 flex-shrink-0 border-2 rounded-md overflow-hidden ${
                activeImage === product.imageUrl ? 'border-[#6a9739]' : 'border-gray-200'
              }`}
            >
              <img src={product.imageUrl || ''} className="w-full h-full object-cover" />
            </button>
            {product.gallery?.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 flex-shrink-0 border-2 rounded-md overflow-hidden ${
                  activeImage === img ? 'border-[#6a9739]' : 'border-gray-200'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-4">
            {product.category && (
              <span className="inline-block bg-[#e6f0d9] text-[#527a2d] text-sm px-3 py-1 rounded-full mb-2">
                {product.category.name}
              </span>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4">
              {product.isSale && product.salePrice ? (
                <>
                  <p className="text-3xl font-bold text-red-600">{formatPrice(product.salePrice)}</p>
                  <p className="text-xl text-gray-500 line-through">{formatPrice(product.price)}</p>
                </>
              ) : (
                <p className="text-3xl font-bold text-[#6a9739]">{formatPrice(product.price)}</p>
              )}
            </div>
          </div>

          {/* QR CODE TRUY XUẤT */}
          <div className="mb-6 p-4 border rounded-lg bg-gray-50 flex items-center gap-4 shadow-sm">
            {qrCodeUrl && (
              <div className="flex-shrink-0 bg-white p-1 border rounded">
                <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24" />
              </div>
            )}
            <div>
              <h4 className="text-sm font-bold text-[#527a2d] uppercase">Truy xuất nguồn gốc</h4>
              <p className="text-xs text-gray-500 mt-1">Quét mã để xem thông tin trang trại sản xuất.</p>
            </div>
          </div>

          {/* MÔ TẢ */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mô tả sản phẩm</h3>
            <p className={`text-gray-600 whitespace-pre-line ${!showFullDescription ? 'line-clamp-4' : ''}`}>
              {product.description}
            </p>
            <button onClick={() => setShowFullDescription(!showFullDescription)} className="text-[#6a9739] font-bold text-sm mt-2">
              {showFullDescription ? 'Thu gọn ▲' : 'Xem thêm ▼'}
            </button>
          </div>

          {/* MUA HÀNG */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 border-r">-</button>
              <span className="px-4 font-bold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 border-l">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || product.stock === 0}
              className="flex-1 bg-[#6a9739] text-white py-3 rounded-lg font-bold hover:bg-[#527a2d] transition disabled:opacity-50"
            >
              {product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
            </button>
          </div>
        </div>
      </div>

      {/* SẢN PHẨM LIÊN QUAN */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-2">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/products/${item.slug}`} className="group">
                <div className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className="h-40 bg-gray-100">
                    <img src={item.imageUrl || ''} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold line-clamp-1">{item.name}</h3>
                    <p className="text-green-700 font-bold mt-1">{formatPrice(item.salePrice || item.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}