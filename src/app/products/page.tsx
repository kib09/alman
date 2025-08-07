'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/product/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton'
import { Grid, List, Filter, SortAsc, SortDesc } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew: boolean
  isSale: boolean
  rating: number
  reviewCount: number
}

interface Category {
  id: string
  name: string
  productCount: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [wishlistedProductIds, setWishlistedProductIds] = useState<string[]>([])
  const { user } = useAuth()

  // 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('카테고리 로딩 오류:', error)
      }
    }

    fetchCategories()
  }, [])

  // 상품 데이터 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '12',
          sortBy: sortBy,
        })
        
        if (selectedCategory !== '전체') {
          params.append('category', selectedCategory)
        }

        const response = await fetch(`/api/products?${params}`)
        if (response.ok) {
          const data = await response.json()
          setProducts(data.products)
          setTotalPages(data.pagination.totalPages)

          
          // 로그인된 사용자의 경우 위시리스트 상태 확인
          if (user && data.products.length > 0) {
            await checkWishlistStatus(data.products.map((p: Product) => p.id))
          }
        }
      } catch (error) {
        console.error('상품 로딩 오류:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory, currentPage, sortBy, user])

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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const handlePageGroupChange = (direction: 'prev' | 'next') => {
    const currentGroup = Math.ceil(currentPage / 10)
    let newPage: number
    
    if (direction === 'prev') {
      newPage = (currentGroup - 1) * 10
    } else {
      newPage = currentGroup * 10 + 1
    }
    
    setCurrentPage(newPage)
    window.scrollTo(0, 0)
  }

  // 현재 페이지 그룹 계산
  const currentGroup = Math.ceil(currentPage / 10)
  const startPage = (currentGroup - 1) * 10 + 1
  const endPage = Math.min(currentGroup * 10, totalPages)
  const showPrevGroup = currentGroup > 1
  const showNextGroup = endPage < totalPages

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">상품 목록</h1>
          <p className="text-muted-foreground">세련된 남성 패션을 만나보세요</p>
        </div>

        {/* 필터 및 정렬 */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* 카테고리 필터 */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-foreground mb-3">카테고리</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange('전체')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === '전체'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                전체
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category.name} ({category.productCount})
                </button>
              ))}
            </div>
          </div>

          {/* 정렬 및 뷰 모드 */}
          <div className="flex items-center gap-4">
            {/* 정렬 */}
            <div className="flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="newest">최신순</option>
                <option value="price-low">가격 낮은순</option>
                <option value="price-high">가격 높은순</option>
                <option value="popular">인기순</option>
              </select>
            </div>

            {/* 뷰 모드 */}
            <div className="flex items-center gap-1 bg-muted rounded-md p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-background text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-background text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 상품 목록 */}
        {loading ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">해당 카테고리의 상품이 없습니다.</p>
          </div>
        ) : (
          <>
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}>
                              {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.image}
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
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageGroupChange('prev')}
                    disabled={!showPrevGroup}
                    className="px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                  >
                    이전
                  </button>
                  
                  {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentPage === page
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageGroupChange('next')}
                    disabled={!showNextGroup}
                    className="px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                  >
                    다음
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
} 