'use client'

import { useState, useEffect } from 'react'
import { formatPrice } from '@/lib/price-utils'
import toast from 'react-hot-toast'

interface Product {
  id: number
  name: string
  price: number
  category: string
  imageUrl: string
  stock: number
  isActive: boolean
  status: 'active' | 'inactive' | 'out_of_stock'
  createdAt: string
  gallery?: string[]
  originUrl?: string // Thêm link nguồn gốc
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [categories, setCategories] = useState<Array<{id: number, name: string, slug: string}>>([])

  // Quản lý state form linh hoạt hơn
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    salePrice: '',
    category: '',
    categoryId: '',
    imageUrl: '',
    stock: '',
    brand: '',
    description: '',
    originUrl: '', // Link trang gốc sản phẩm
    gallery: [] as string[] // Mảng chứa các link ảnh phụ
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [statusFilter])

  // Reset form khi đóng/mở modal
  useEffect(() => {
    if (!showAddForm && !showEditForm) {
      setFormData({
        name: '', price: '', salePrice: '', category: '', categoryId: '',
        imageUrl: '', stock: '', brand: '', description: '', originUrl: '', gallery: []
      })
    }
  }, [showAddForm, showEditForm])

  // --- LOGIC QUẢN LÝ GALLERY ---
  const handleAddGalleryField = () => {
    setFormData({ ...formData, gallery: [...formData.gallery, ''] })
  }

  const handleUpdateGalleryLink = (index: number, value: string) => {
    const newGallery = [...formData.gallery]
    newGallery[index] = value
    setFormData({ ...formData, gallery: newGallery })
  }

  const handleRemoveGalleryField = (index: number) => {
    const newGallery = formData.gallery.filter((_, i) => i !== index)
    setFormData({ ...formData, gallery: newGallery })
  }
  // -----------------------------

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/products')
      const result = await response.json()
      if (result.success) {
        const transformedProducts = result.data.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price || 0,
          category: product.category_name || 'Chưa phân loại',
          imageUrl: product.image_url || '/placeholder.png',
          stock: product.stock || 0,
          status: !product.is_active ? 'inactive' : product.stock <= 0 ? 'out_of_stock' : 'active',
          gallery: product.gallery || [],
          originUrl: product.origin_url || ''
        }))
        setAllProducts(transformedProducts)
      }
    } catch (error) {
      toast.error('Lỗi tải danh sách sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    const res = await fetch('/api/categories')
    const data = await res.json()
    if (data.success) setCategories(data.data)
  }

  const handleSubmit = async (mode: 'ADD' | 'EDIT') => {
    try {
      const payload = {
        ...formData,
        id: editingProduct?.id,
        price: parseInt(formData.price) || 0,
        salePrice: parseInt(formData.salePrice) || 0,
        stock: parseInt(formData.stock) || 0,
        // Chỉ lấy các link gallery không trống
        gallery: formData.gallery.filter(url => url.trim() !== '')
      }

      const response = await fetch('/api/admin/products', {
        method: mode === 'ADD' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await response.json()
      if (result.success) {
        toast.success(mode === 'ADD' ? 'Thêm thành công!' : 'Cập nhật thành công!')
        setShowAddForm(false)
        setShowEditForm(false)
        fetchProducts()
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra')
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      salePrice: '0',
      category: product.category,
      categoryId: '', 
      imageUrl: product.imageUrl,
      stock: product.stock.toString(),
      brand: '',
      description: '',
      originUrl: product.originUrl || '',
      gallery: product.gallery || []
    })
    setShowEditForm(true)
  }

  // --- GIAO DIỆN FORM CHUNG ---
  const renderProductForm = (mode: 'ADD' | 'EDIT') => (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">{mode === 'ADD' ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Tên sản phẩm *</label>
          <input 
            className="w-full border rounded-lg px-3 py-2" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Giá gốc (VNĐ)</label>
          <input 
            type="number" className="w-full border rounded-lg px-3 py-2" 
            value={formData.price} 
            onChange={e => setFormData({...formData, price: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tồn kho</label>
          <input 
            type="number" className="w-full border rounded-lg px-3 py-2" 
            value={formData.stock} 
            onChange={e => setFormData({...formData, stock: e.target.value})}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1 text-blue-600 font-bold">Link trang gốc sản phẩm (URL Truy xuất)</label>
          <input 
            placeholder="https://nongsandungha.com/san-pham-abc"
            className="w-full border border-blue-200 rounded-lg px-3 py-2 bg-blue-50" 
            value={formData.originUrl} 
            onChange={e => setFormData({...formData, originUrl: e.target.value})}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Ảnh đại diện chính (URL)</label>
          <input 
            className="w-full border rounded-lg px-3 py-2" 
            value={formData.imageUrl} 
            onChange={e => setFormData({...formData, imageUrl: e.target.value})}
          />
        </div>

        {/* GALLERY SECTION */}
        <div className="md:col-span-2 p-4 bg-gray-50 border rounded-lg">
          <label className="block text-sm font-bold text-gray-700 mb-2">Bộ sưu tập ảnh phụ (Gallery)</label>
          <div className="space-y-2">
            {formData.gallery.map((link, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text" value={link}
                  placeholder="Dán link ảnh phụ..."
                  className="flex-1 border rounded px-3 py-2 text-sm bg-white"
                  onChange={(e) => handleUpdateGalleryLink(index, e.target.value)}
                />
                {link && <img src={link} className="w-10 h-10 object-cover rounded border bg-white" alt="Preview" />}
                <button onClick={() => handleRemoveGalleryField(index)} className="text-red-500 font-bold px-2">✕</button>
              </div>
            ))}
          </div>
          <button 
            type="button" onClick={handleAddGalleryField}
            className="mt-3 text-sm text-[#527a2d] font-bold flex items-center gap-1"
          >
            + Thêm ảnh phụ
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button onClick={() => {setShowAddForm(false); setShowEditForm(false)}} className="px-6 py-2 text-gray-500">Hủy</button>
        <button 
          onClick={() => handleSubmit(mode)} 
          className="px-6 py-2 bg-[#6a9739] text-white rounded-lg font-bold"
        >
          {mode === 'ADD' ? 'Lưu sản phẩm' : 'Cập nhật'}
        </button>
      </div>
    </div>
  )

  // (Phần hiển thị danh sách sản phẩm table giữ nguyên, chỉ thay đổi các nút bấm để gọi handleEditProduct...)
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
        <button onClick={() => setShowAddForm(true)} className="bg-[#6a9739] text-white px-4 py-2 rounded-lg font-bold">Thêm sản phẩm</button>
      </div>

      {/* Table danh sách sản phẩm (Tóm gọn để tập trung vào logic sửa) */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allProducts.map(p => (
              <tr key={p.id}>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={p.imageUrl} className="w-10 h-10 rounded object-cover" />
                  <span className="font-medium">{p.name}</span>
                </td>
                <td className="px-6 py-4">{formatPrice(p.price)}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleEditProduct(p)} className="text-blue-600 mr-4">Sửa</button>
                  <button className="text-red-600">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {(showAddForm || showEditForm) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full my-8">
            {showAddForm ? renderProductForm('ADD') : renderProductForm('EDIT')}
          </div>
        </div>
      )}
    </div>
  )
}