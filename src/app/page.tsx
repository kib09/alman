'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton';
import { useAuth } from '@/contexts/AuthContext';

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

const categories = [
  {
    name: '정장',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=500&fit=crop',
    href: '/category/suits',
  },
  {
    name: '캐주얼',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
    href: '/category/casual',
  },
  {
    name: '신발',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
    href: '/category/shoes',
  },
  {
    name: '액세서리',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=500&fit=crop',
    href: '/category/accessories',
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistedProductIds, setWishlistedProductIds] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // 최신 상품 12개 가져오기 (할인 상품이 없을 경우를 대비)
        const response = await fetch('/api/products?limit=12');
        if (response.ok) {
          const data = await response.json();
          setFeaturedProducts(data.products);
  
          
          // 로그인된 사용자의 경우 위시리스트 상태 확인
          if (user && data.products.length > 0) {
            await checkWishlistStatus(data.products.map((p: Product) => p.id));
          }
        }
      } catch (error) {
        console.error('상품 로딩 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [user]);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" tabIndex={-1}>
        {/* 히어로 섹션 */}
        <section className="relative h-[600px] overflow-hidden" role="banner" aria-label="메인 배너">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
            alt="세련된 남성 패션을 보여주는 히어로 이미지"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                세련된 남성 패션 
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                정장부터 캐주얼까지, 당신만의 스타일을 완성하세요
              </p>
              <Link
                href="/category/suits"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                aria-label="정장 카테고리로 이동하여 쇼핑 시작하기"
              >
                쇼핑 시작하기
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* 카테고리 섹션 */}
        <section className="py-16 bg-secondary" aria-labelledby="categories-heading">
          <div className="container mx-auto px-4">
            <h2 id="categories-heading" className="text-3xl font-bold text-center mb-12">카테고리</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative h-80 overflow-hidden rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`${category.name} 카테고리로 이동`}
                >
                  <Image
                    src={category.image}
                    alt={`${category.name} 카테고리 이미지`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 추천 상품 섹션 */}
        <section className="py-16" aria-labelledby="featured-products-heading">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 id="featured-products-heading" className="text-3xl font-bold">🔥 추천 상품</h2>
              <Link
                href="/products"
                className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                aria-label="전체 상품 페이지로 이동"
              >
                전체 상품 보기
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
              {loading ? (
                Array.from({ length: 12 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : featuredProducts.length === 0 ? (
                <p>추천 상품이 없습니다.</p>
              ) : (
                featuredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    {...product} 
                    isWishlisted={wishlistedProductIds.includes(product.id)}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* 브랜드 소개 섹션 */}
        <section className="py-16 bg-secondary" aria-labelledby="brand-heading">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="brand-heading" className="text-3xl font-bold mb-6">ALMAN 브랜드</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  2020년 설립된 ALMAN은 현대 남성의 라이프스타일에 맞는 
                  세련되고 실용적인 패션을 제공합니다. 최고 품질의 소재와 
                  정교한 디자인으로 완성된 제품들로 당신의 스타일을 완성하세요.
                </p>
                <div className="space-y-4" role="list" aria-label="브랜드 특징">
                  <div className="flex items-center gap-3" role="listitem">
                    <Star className="h-5 w-5 text-accent" aria-hidden="true" />
                    <span>최고 품질의 소재 사용</span>
                  </div>
                  <div className="flex items-center gap-3" role="listitem">
                    <Star className="h-5 w-5 text-accent" aria-hidden="true" />
                    <span>정교한 디자인과 완벽한 핏</span>
                  </div>
                  <div className="flex items-center gap-3" role="listitem">
                    <Star className="h-5 w-5 text-accent" aria-hidden="true" />
                    <span>지속 가능한 패션</span>
                  </div>
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                  alt="ALMAN 브랜드를 대표하는 패션 이미지"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 서비스 특징 섹션 */}
        <section className="py-16" aria-labelledby="features-heading">
          <div className="container mx-auto px-4">
            <h2 id="features-heading" className="text-3xl font-bold text-center mb-12">서비스 특징</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list" aria-label="서비스 특징 목록">
              <div className="text-center" role="listitem">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">무료 배송</h3>
                <p className="text-muted-foreground">
                  5만원 이상 구매 시 전국 무료 배송
                </p>
              </div>
              <div className="text-center" role="listitem">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">품질 보증</h3>
                <p className="text-muted-foreground">
                  모든 제품에 대해 1년 품질 보증
                </p>
              </div>
              <div className="text-center" role="listitem">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="h-8 w-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">쉬운 반품</h3>
                <p className="text-muted-foreground">
                  7일 이내 무료 반품/교환 서비스
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
