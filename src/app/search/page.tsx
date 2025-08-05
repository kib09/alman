'use client'

import { useState, useEffect } from 'react'
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

export default function SearchPage() {
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
        
        // 로그인된 사용자의 경우 위시리스트 상태 확인
        if (user && data.products.length > 0) {
          await checkWishlistStatus(data.products.map((p: Product) => p.id))
        }
      } else {
        console.error('검색 실패')
      }
    } catch (error) {
      console.error('검색 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchQuery(query)
      updateURLAndSearch()
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
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    router.push(`/search?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    performSearch(searchQuery, filters.category, filters.minPrice, filters.maxPrice, filters.sortBy, page)
  }

  const checkWishlistStatus = async (productIds: string[]) => {
    if (!user || productIds.length === 0) return;

    try {
      const response = await fetch(`/api/wishlist/check?productIds=${productIds.join(',')}`);
      if (response.ok) {
        const data = await response.json();
        setWishlistedProductIds(data.wishlistedProductIds);
      }
    } catch (error) {
      console.error('위시리스트 상태 확인 오류:', error);
    }
  };

  const sortOptions = [
    { value: 'relevance', label: '관련성 순' },
    { value: 'newest', label: '최신순' },
    { value: 'price_asc', label: '가격 낮은순' },
    { value: 'price_desc', label: '가격 높은순' },
    { value: 'rating', label: '평점순' }
  ]

  const categories = [
    { value: '', label: '전체 카테고리' },
    { value: '정장', label: '정장' },
    { value: '캐주얼', label: '캐주얼' },
    { value: '신발', label: '신발' },
    { value: '액세서리', label: '액세서리' },
    { value: '스포츠웨어', label: '스포츠웨어' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* 검색 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="text-muted-foreground hover:text-foreground cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">
              검색 결과
              {searchQuery && (
                <span className="text-muted-foreground font-normal ml-2">
                  "{searchQuery}"
                </span>
              )}
            </h1>
          </div>

          {/* 검색바 */}
          <div className="max-w-2xl mb-4">
            <SearchInput
              placeholder="상품을 검색하세요..."
              onSearch={handleSearch}
              showSuggestions={true}
            />
          </div>

          {/* 검색 결과 통계 */}
          {stats && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>총 {stats.total}개의 상품</span>
              <div className="flex items-center gap-4">
                {/* 필터 버튼 */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 py-1 border rounded-md hover:bg-muted cursor-pointer"
                >
                  <Filter className="h-4 w-4" />
                  필터
                </button>

                {/* 정렬 */}
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-3 py-1 border rounded-md bg-background cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* 필터 패널 */}
        {showFilters && (
          <div className="mb-8 p-6 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">필터</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-muted rounded cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 카테고리 */}
              <div>
                <label className="block text-sm font-medium mb-2">카테고리</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 가격 범위 */}
              <div>
                <label className="block text-sm font-medium mb-2">가격 범위</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="최소"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md bg-background"
                  />
                  <span className="flex items-center">~</span>
                  <input
                    type="number"
                    placeholder="최대"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md bg-background"
                  />
                </div>
              </div>

              {/* 필터 적용 버튼 */}
              <div className="flex items-end gap-2">
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  적용
                </button>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border rounded-md hover:bg-muted transition-colors cursor-pointer"
                >
                  초기화
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 검색 결과 */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
                    isWishlisted={wishlistedProductIds.includes(product.id)}
                  />
                ))}
            </div>

            {/* 페이지네이션 */}
            {stats && stats.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(stats.page - 1)}
                  disabled={!stats.hasPrevPage}
                  className="p-2 border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <span className="px-4 py-2 text-sm">
                  {stats.page} / {stats.totalPages}
                </span>
                
                <button
                  onClick={() => handlePageChange(stats.page + 1)}
                  disabled={!stats.hasNextPage}
                  className="p-2 border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-muted-foreground mb-4">
              다른 검색어를 시도해보세요
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
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