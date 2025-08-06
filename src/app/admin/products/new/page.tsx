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

// 배열 필드 타입 가드
type ArrayFields = 'images' | 'sizes' | 'colors' | 'details'

const isArrayField = (field: keyof ProductForm): field is ArrayFields => {
  return ['images', 'sizes', 'colors', 'details'].includes(field as string)
}

export default function NewProductPage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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
      await fetchCategories()
      setLoading(false)
    }
    initPage()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      } else {
        console.error('카테고리 API 응답 오류:', response.status)
        showToast('카테고리를 불러오는데 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('카테고리 조회 오류:', error)
      showToast('카테고리를 불러오는데 실패했습니다.', 'error')
    }
  }

  const handleInputChange = (field: keyof ProductForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: keyof ProductForm, index: number, value: string) => {
    if (!isArrayField(field)) return
    
    setForm(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field: keyof ProductForm) => {
    if (!isArrayField(field)) return
    
    setForm(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }))
  }

  const removeArrayItem = (field: keyof ProductForm, index: number) => {
    if (!isArrayField(field)) return
    
    setForm(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.name || !form.description || !form.price || !form.categoryId) {
      showToast('필수 항목을 모두 입력해주세요.', 'error')
      return
    }

    if (categories.length === 0) {
      showToast('카테고리를 먼저 생성해주세요.', 'error')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
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
        showToast('상품이 성공적으로 추가되었습니다.', 'success')
        router.push('/admin/products')
      } else {
        const error = await response.json()
        showToast(error.error || '상품 추가에 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('상품 추가 오류:', error)
      showToast('상품 추가에 실패했습니다.', 'error')
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
            <p>로딩 중...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 헤더 */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              뒤로가기
            </button>
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">새 상품 추가</h1>
            </div>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            {/* 기본 정보 */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">기본 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    상품명 *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="상품명을 입력하세요"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    카테고리 *
                  </label>
                                     <select
                     value={form.categoryId}
                     onChange={(e) => handleInputChange('categoryId', e.target.value)}
                     className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                     required
                     disabled={loading}
                   >
                     <option value="">
                       {loading ? '카테고리 로딩 중...' : '카테고리를 선택하세요'}
                     </option>
                     {categories && categories.length > 0 ? (
                       categories.map((category) => (
                         <option key={category.id} value={category.id}>
                           {category.name}
                         </option>
                       ))
                     ) : !loading ? (
                       <option value="" disabled>카테고리가 없습니다</option>
                     ) : null}
                   </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    가격 *
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => handleInputChange('price', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    원가
                  </label>
                  <input
                    type="number"
                    value={form.originalPrice || ''}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
                  상품 설명 *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="상품에 대한 자세한 설명을 입력하세요"
                  required
                />
              </div>
            </div>

            {/* 이미지 */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">이미지</h2>
              {form.images.map((image, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleArrayChange('images', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="이미지 URL을 입력하세요"
                  />
                  {form.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('images', index)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('images')}
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Plus className="h-4 w-4" />
                이미지 추가
              </button>
            </div>

            {/* 옵션 */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">옵션</h2>
              
              {/* 사이즈 */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">사이즈</label>
                {form.sizes.map((size, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => handleArrayChange('sizes', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                      placeholder="사이즈 (예: S, M, L, XL)"
                    />
                    {form.sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('sizes', index)}
                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-md"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('sizes')}
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Plus className="h-4 w-4" />
                  사이즈 추가
                </button>
              </div>

              {/* 색상 */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">색상</label>
                {form.colors.map((color, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleArrayChange('colors', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                      placeholder="색상 (예: 빨강, 파랑, 검정)"
                    />
                    {form.colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('colors', index)}
                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-md"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('colors')}
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Plus className="h-4 w-4" />
                  색상 추가
                </button>
              </div>

              {/* 상세 정보 */}
              <div>
                <label className="block text-sm font-medium mb-2">상세 정보</label>
                {form.details.map((detail, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => handleArrayChange('details', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                      placeholder="상세 정보 (예: 소재, 제조국)"
                    />
                    {form.details.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('details', index)}
                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-md"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('details')}
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Plus className="h-4 w-4" />
                  상세 정보 추가
                </button>
              </div>
            </div>

            {/* 상태 설정 */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">상태 설정</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.isNew}
                    onChange={(e) => handleInputChange('isNew', e.target.checked)}
                    className="rounded"
                  />
                  <span>신상품</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.isSale}
                    onChange={(e) => handleInputChange('isSale', e.target.checked)}
                    className="rounded"
                  />
                  <span>할인 상품</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.inStock}
                    onChange={(e) => handleInputChange('inStock', e.target.checked)}
                    className="rounded"
                  />
                  <span>재고 있음</span>
                </label>
              </div>
            </div>

            {/* 저장 버튼 */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-input rounded-md hover:bg-muted transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? '저장 중...' : '상품 추가'}
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 