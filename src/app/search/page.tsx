'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, X, ChevronDown, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/product/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton'
import SearchInput from '@/components/ui/SearchInput'
import { useAuth } from '@/contexts/AuthContext'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  details: string[]
  isNew: boolean
  isSale: boolean
  inStock: boolean
  rating: number
  reviewCount: number
  createdAt: string
}

interface SearchStats {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [stats, setStats] = useState<SearchStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [wishlistedProductIds, setWishlistedProductIds] = useState<string[]>([])
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'relevance'
  })
  const { user } = useAuth()

  // URL 파라미터에서 검색 조건 가져오기
  useEffect(() => {
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    const minPrice = searchParams.get('minPrice') || ''
    const maxPrice = searchParams.get('maxPrice') || ''
    const sortBy = searchParams.get('sortBy') || 'relevance'

    setSearchQuery(query)
    setFilters({ category, minPrice, maxPrice, sortBy })
    
    if (query) {
      performSearch(query, category, minPrice, maxPrice, sortBy)
    }
  }, [searchParams])

  const performSearch = async (
    query: string,
    category: string = '',
    minPrice: string = '',
    maxPrice: string = '',
    sortBy: string = 'relevance',
    page: number = 1
  ) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: '12'
      })

      if (category) params.append('category', category)
      if (minPrice) params.append('minPrice', minPrice)
      if (maxPrice) params.append('maxPrice', maxPrice)
      if (sortBy) params.append('sortBy', sortBy)

      const response = await fetch(`/api/search?${params}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
        setStats(data.stats)
        
        // 위시리스트 상태 확인
        if (data.products.length > 0) {
          const productIds = data.products.map((p: Product) => p.id)
          checkWishlistStatus(productIds)
        }
      }
    } catch (error) {
      console.error('검색 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const updateURLAndSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (filters.category) params.set('category', filters.category)
    if (filters.minPrice) params.set('minPrice', filters.minPrice)
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
    if (filters.sortBy) params.set('sortBy', filters.sortBy)
    
    router.push(`/search?${params.toString()}`)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    updateURLAndSearch()
    setShowFilters(false)
  }

  const clearFilters = () => {
    setFilters({ category: '', minPrice: '', maxPrice: '', sortBy: 'relevance' })
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handlePageChange = (page: number) => {
    performSearch(searchQuery, filters.category, filters.minPrice, filters.maxPrice, filters.sortBy, page)
  }

  const checkWishlistStatus = async (productIds: string[]) => {
    if (!user) return

    try {
      const response = await fetch('/api/wishlist/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIds }),
      })

      if (response.ok) {
        const data = await response.json()
        setWishlistedProductIds(data.wishlistedIds || [])
      }
    } catch (error) {
      console.error('위시리스트 상태 확인 오류:', error)
    }
  }

  const isWishlisted = (productId: string) => {
    return wishlistedProductIds.includes(productId)
  }

  const toggleWishlist = async (productId: string) => {
    if (!user) {
      router.push('/login')
      return
    }

    try {
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: isWishlisted(productId) ? 'DELETE' : 'POST',
      })

      if (response.ok) {
        setWishlistedProductIds(prev => 
          isWishlisted(productId)
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
        )
      }
    } catch (error) {
      console.error('위시리스트 토글 오류:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* 검색 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-5 h-5 mr-1" />
              홈으로
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `"${searchQuery}" 검색 결과` : '상품 검색'}
            </h1>
          </div>
          
          {/* 검색 입력 */}
          <div className="max-w-2xl">
            <SearchInput onSearch={handleSearch} initialValue={searchQuery} />
          </div>
        </div>

        {/* 필터 및 정렬 */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* 필터 버튼 */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              필터
            </button>
            
            {/* 정렬 */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="relevance">관련도순</option>
              <option value="price_asc">가격 낮은순</option>
              <option value="price_desc">가격 높은순</option>
              <option value="newest">최신순</option>
              <option value="rating">평점순</option>
            </select>
          </div>

          {/* 검색 결과 통계 */}
          {stats && (
            <div className="text-gray-600">
              총 {stats.total}개의 상품
            </div>
          )}
        </div>

        {/* 필터 패널 */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 카테고리 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">전체</option>
                  <option value="shirts">셔츠</option>
                  <option value="pants">바지</option>
                  <option value="outerwear">아우터</option>
                  <option value="accessories">액세서리</option>
                </select>
              </div>

              {/* 가격 범위 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  최소 가격
                </label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  최대 가격
                </label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="무제한"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={applyFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                필터 적용
              </button>
              <button
                onClick={clearFilters}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                필터 초기화
              </button>
            </div>
          </div>
        )}

        {/* 검색 결과 */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.images[0]}
                  category={product.category}
                  isNew={product.isNew}
                  isSale={product.isSale}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  isWishlisted={isWishlisted(product.id)}
                />
              ))}
            </div>

            {/* 페이지네이션 */}
            {stats && stats.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(stats.page - 1)}
                  disabled={!stats.hasPrevPage}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {Array.from({ length: stats.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border rounded-lg ${
                      page === stats.page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(stats.page + 1)}
                  disabled={!stats.hasNextPage}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              다른 검색어를 시도해보세요
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              전체 상품 보기
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">검색 페이지를 불러오는 중...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
} 