'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  Package, 
  ArrowLeft,
  Save,
  X,
  Plus
} from 'lucide-react'

interface Category {
  id: string
  name: string
}

interface ProductForm {
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  categoryId: string
  sizes: string[]
  colors: string[]
  details: string[]
  isNew: boolean
  isSale: boolean
  inStock: boolean
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: ProductDetailPageProps) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [productId, setProductId] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    images: [''],
    categoryId: '',
    sizes: [''],
    colors: [''],
    details: [''],
    isNew: false,
    isSale: false,
    inStock: true
  })

  useEffect(() => {
    const initPage = async () => {
      const { id } = await params
      setProductId(id)
      await fetchCategories()
      await fetchProduct(id)
    }
    initPage()
  }, [params])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('카테고리 조회 오류:', error)
    }
  }

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`)
      if (response.ok) {
        const product = await response.json()
        
        // 안전한 배열 처리 함수
        const safeArray = (data: any) => {
          if (Array.isArray(data)) {
            return data.length > 0 ? data : ['']
          }
          return ['']
        }
        
        setForm({
          name: product.name || '',
          description: product.description || '',
          price: product.price || 0,
          originalPrice: product.originalPrice || 0,
          images: safeArray(product.images),
          categoryId: product.categoryId || '',
          sizes: safeArray(product.sizes),
          colors: safeArray(product.colors),
          details: safeArray(product.details),
          isNew: product.isNew || false,
          isSale: product.isSale || false,
          inStock: product.inStock !== undefined ? product.inStock : true
        })
      } else {
        showToast('상품을 찾을 수 없습니다.', 'error')
        router.push('/admin/products')
      }
    } catch (error) {
      console.error('상품 조회 오류:', error)
      showToast('상품 조회에 실패했습니다.', 'error')
      router.push('/admin/products')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof ProductForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: keyof ProductForm, index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: (prev[field] as string[] || []).map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field: keyof ProductForm) => {
    setForm(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[] || []), '']
    }))
  }

  const removeArrayItem = (field: keyof ProductForm, index: number) => {
    setForm(prev => ({
      ...prev,
      [field]: (prev[field] as string[] || []).filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.name || !form.description || !form.price || !form.categoryId) {
      showToast('필수 항목을 모두 입력해주세요.', 'error')
      return
    }

    if (form.images.length === 0 || form.images[0] === '') {
      showToast('최소 하나의 이미지를 입력해주세요.', 'error')
      return
    }

    setSaving(true)

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          images: form.images.filter(img => img.trim() !== ''),
          sizes: form.sizes.filter(size => size.trim() !== ''),
          colors: form.colors.filter(color => color.trim() !== ''),
          details: form.details.filter(detail => detail.trim() !== '')
        }),
      })

      if (response.ok) {
        showToast('상품이 성공적으로 수정되었습니다.', 'success')
        router.push('/admin/products')
      } else {
        const error = await response.json()
        showToast(error.error || '상품 수정에 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('상품 수정 오류:', error)
      showToast('상품 수정에 실패했습니다.', 'error')
    } finally {
      setSaving(false)
    }
  }

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
        <div className="container mx-auto px-4 max-w-4xl">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => router.push('/admin/products')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                상품 관리로 돌아가기
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">상품 수정</h1>
            </div>
          </div>

          {/* 상품 수정 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 기본 정보 */}
            <div className="bg-background border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">상품명 *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="상품명을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">카테고리 *</label>
                                     <select
                     value={form.categoryId}
                     onChange={(e) => handleInputChange('categoryId', e.target.value)}
                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                   >
                     <option value="">카테고리 선택</option>
                     {categories?.map((category) => (
                       <option key={category.id} value={category.id}>
                         {category.name}
                       </option>
                     )) || []}
                   </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">가격 *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => handleInputChange('price', Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">원가</label>
                  <input
                    type="number"
                    value={form.originalPrice || ''}
                    onChange={(e) => handleInputChange('originalPrice', Number(e.target.value) || undefined)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">상품 설명 *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="상품에 대한 자세한 설명을 입력하세요"
                />
              </div>
            </div>

            {/* 이미지 */}
            <div className="bg-background border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">이미지</h2>
              
              {form.images.map((image, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleArrayChange('images', index, e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="이미지 URL을 입력하세요"
                  />
                  {form.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('images', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('images')}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Plus className="h-4 w-4" />
                이미지 추가
              </button>
            </div>

            {/* 옵션 */}
            <div className="bg-background border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">옵션</h2>
              
              {/* 사이즈 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">사이즈</label>
                {form.sizes.map((size, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => handleArrayChange('sizes', index, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="사이즈 (예: S, M, L)"
                    />
                    {form.sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('sizes', index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('sizes')}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  사이즈 추가
                </button>
              </div>

              {/* 컬러 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">컬러</label>
                {form.colors.map((color, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleArrayChange('colors', index, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="컬러 (예: 빨강, 파랑)"
                    />
                    {form.colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('colors', index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('colors')}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  컬러 추가
                </button>
              </div>

              {/* 상품 상세 */}
              <div>
                <label className="block text-sm font-medium mb-2">상품 상세</label>
                {form.details.map((detail, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => handleArrayChange('details', index, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="상품 상세 정보"
                    />
                    {form.details.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('details', index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('details')}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  상세 정보 추가
                </button>
              </div>
            </div>

            {/* 상태 설정 */}
            <div className="bg-background border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">상태 설정</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={form.isNew}
                    onChange={(e) => handleInputChange('isNew', e.target.checked)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="isNew" className="text-sm font-medium">
                    신상품으로 표시
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isSale"
                    checked={form.isSale}
                    onChange={(e) => handleInputChange('isSale', e.target.checked)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="isSale" className="text-sm font-medium">
                    할인 상품으로 표시
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={form.inStock}
                    onChange={(e) => handleInputChange('inStock', e.target.checked)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="inStock" className="text-sm font-medium">
                    재고 있음
                  </label>
                </div>
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.push('/admin/products')}
                className="px-6 py-3 border rounded-lg hover:bg-muted transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {saving ? '저장 중...' : '상품 수정'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
} 