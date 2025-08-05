'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton';
import { useAuth } from '@/contexts/AuthContext';

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew: boolean;
  isSale: boolean;
  rating: number;
  reviewCount: number;
}

// 카테고리 이름 매핑
const categoryNames = {
  suits: '정장',
  casual: '캐주얼',
  shoes: '신발',
  accessories: '액세서리',
  sportswear: '스포츠웨어',
};

const sortOptions = [
  { label: '최신순', value: 'newest' },
  { label: '가격 낮은순', value: 'price-low' },
  { label: '가격 높은순', value: 'price-high' },
  { label: '인기순', value: 'popular' },
];

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = use(params)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [wishlistedProductIds, setWishlistedProductIds] = useState<string[]>([]);
  const { user } = useAuth();

  // 카테고리별 상품 데이터 가져오기
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const categoryName = categoryNames[category as keyof typeof categoryNames];
        if (categoryName) {
          const params = new URLSearchParams({
            category: categoryName,
            page: currentPage.toString(),
            limit: '12',
            sortBy: sortBy,
          });
          
          const response = await fetch(`/api/products?${params}`);
          if (response.ok) {
            const data = await response.json();
            setProducts(data.products);
            setTotalPages(data.pagination.totalPages);
            
            // 로그인된 사용자의 경우 위시리스트 상태 확인
            if (user && data.products.length > 0) {
              await checkWishlistStatus(data.products.map((p: Product) => p.id));
            }
          }
        }
      } catch (error) {
        console.error('카테고리 상품 로딩 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category, currentPage, sortBy, user]);

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

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handlePageGroupChange = (direction: 'prev' | 'next') => {
    const currentGroup = Math.ceil(currentPage / 10);
    let newPage: number;
    
    if (direction === 'prev') {
      newPage = (currentGroup - 1) * 10;
    } else {
      newPage = currentGroup * 10 + 1;
    }
    
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  // 현재 페이지 그룹 계산
  const currentGroup = Math.ceil(currentPage / 10);
  const startPage = (currentGroup - 1) * 10 + 1;
  const endPage = Math.min(currentGroup * 10, totalPages);
  const showPrevGroup = currentGroup > 1;
  const showNextGroup = endPage < totalPages;

  const categoryName = categoryNames[category as keyof typeof categoryNames] || '카테고리';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>

          </div>

          {/* 필터 및 정렬 */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* 모바일 필터 버튼 */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer"
            >
              <Filter className="h-4 w-4" />
              필터
            </button>

            {/* 정렬 및 뷰 모드 */}
            <div className="flex items-center gap-4 ml-auto">
              {/* 정렬 */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none px-4 py-2 border rounded-lg bg-background pr-8 cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
              </div>

              {/* 뷰 모드 */}
              <div className="flex border rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 cursor-pointer ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 cursor-pointer ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 상품 목록 */}
          {loading ? (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {Array.from({ length: 12 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-2">상품이 없습니다</h2>
              <p className="text-muted-foreground">
                해당 카테고리에 상품이 준비 중입니다
              </p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  {...product} 
                  isWishlisted={wishlistedProductIds.includes(product.id)}
                />
              ))}
            </div>
          )}

          {/* 페이지네이션 */}
          {products.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageGroupChange('prev')} 
                  disabled={!showPrevGroup}
                  className="px-3 py-2 border rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  이전
                </button>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border rounded-lg hover:bg-secondary cursor-pointer ${currentPage === page ? 'bg-primary text-primary-foreground' : ''}`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => handlePageGroupChange('next')} 
                  disabled={!showNextGroup}
                  className="px-3 py-2 border rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  다음
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 