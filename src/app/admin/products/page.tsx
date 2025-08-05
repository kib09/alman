'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  Package, 
  Search, 
  Filter, 
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Tag
} from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string
  category: {
    name: string
  }
  isNew: boolean
  isSale: boolean
  rating: number
  reviewCount: number
  createdAt: string
}

export default function AdminProductsPage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (user) {
      fetchProducts()
    }
  }, [user])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      } else {
        showToast('상품 데이터를 불러올 수 없습니다.', 'error')
      }
    } catch (error) {
      console.error('상품 조회 오류:', error)
      showToast('상품 조회에 실패했습니다.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        showToast('상품이 삭제되었습니다.', 'success')
        fetchProducts() // 목록 새로고침
      } else {
        showToast('상품 삭제에 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('상품 삭제 오류:', error)
      showToast('상품 삭제에 실패했습니다.', 'error')
    }
  }

  const toggleProductStatus = async (productId: string, field: 'isNew' | 'isSale', currentValue: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: !currentValue }),
      })

      if (response.ok) {
        showToast('상품 상태가 업데이트되었습니다.', 'success')
        fetchProducts() // 목록 새로고침
      } else {
        showToast('상품 상태 업데이트에 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('상품 상태 업데이트 오류:', error)
      showToast('상품 상태 업데이트에 실패했습니다.', 'error')
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || product.category.name === categoryFilter
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'new' && product.isNew) ||
      (statusFilter === 'sale' && product.isSale)
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = Array.from(new Set(products.map(p => p.category.name)))

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>상품 데이터를 불러오는 중...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => router.push('/admin')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                대시보드로 돌아가기
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                  <Package className="h-8 w-8 text-primary" />
                  상품 관리
                </h1>
                <p className="text-muted-foreground">
                  상품을 추가, 수정, 삭제하고 할인을 설정할 수 있습니다.
                </p>
              </div>
              <button
                onClick={() => router.push('/admin/products/new')}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                새 상품 추가
              </button>
            </div>
          </div>

          {/* 검색 및 필터 */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="상품명, 설명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">전체 카테고리</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">전체 상태</option>
              <option value="new">신상품</option>
              <option value="sale">할인상품</option>
            </select>
          </div>

          {/* 상품 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-background border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* 상품 이미지 */}
                <div className="relative h-48 bg-secondary">
                  <img
                    src={JSON.parse(product.images)[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    {product.isNew && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">NEW</span>
                    )}
                    {product.isSale && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">SALE</span>
                    )}
                  </div>
                </div>

                {/* 상품 정보 */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{product.category.name}</span>
                  </div>
                  
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-bold text-lg">₩{product.price.toLocaleString()}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₩{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* 관리 버튼 */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="flex-1 bg-secondary text-foreground py-2 px-3 rounded-md hover:bg-secondary/80 transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      보기
                    </button>
                    <button
                      onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                      className="flex-1 bg-primary text-primary-foreground py-2 px-3 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      수정
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      삭제
                    </button>
                  </div>

                  {/* 상태 토글 */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => toggleProductStatus(product.id, 'isNew', product.isNew)}
                      className={`flex-1 py-1 px-2 rounded text-xs transition-colors ${
                        product.isNew
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      신상품
                    </button>
                    <button
                      onClick={() => toggleProductStatus(product.id, 'isSale', product.isSale)}
                      className={`flex-1 py-1 px-2 rounded text-xs transition-colors ${
                        product.isSale
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      할인
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">검색 조건에 맞는 상품이 없습니다.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
} 