'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Heart, Star, Truck, Shield, RotateCcw, Share2, MessageCircle, Package, Users, Clock } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import LoginModal from '@/components/ui/LoginModal'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/product/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton'
import { ProductDetailSkeleton } from '@/components/ui/ProductDetailSkeleton'
import ConfirmModal from '@/components/ui/ConfirmModal'
import ShareModal from '@/components/ui/ShareModal'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  description: string
  details: string[]
  sizes: string[]
  colors: string[]
  isNew: boolean
  isSale: boolean
  rating: number
  reviewCount: number
  inStock: boolean
  reviews: {
    id: string
    rating: number
    comment?: string
    createdAt: string
    user: string
  }[]
}

interface RelatedProduct {
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

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [relatedLoading, setRelatedLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description')
  const [currentUrl, setCurrentUrl] = useState('')
  const { user } = useAuth()
  const { showToast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data)
          
          // 관련 상품 가져오기 (같은 카테고리)
          const relatedResponse = await fetch(`/api/products?category=${data.category}&limit=4`)
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json()
            setRelatedProducts(relatedData.products.filter((p: any) => p.id !== data.id))
          }
        } else {
          console.error('상품을 찾을 수 없습니다')
        }
      } catch (error) {
        console.error('상품 로딩 오류:', error)
      } finally {
        setLoading(false)
        setRelatedLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // 현재 URL 설정
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
          <p className="text-muted-foreground mb-8">존재하지 않는 상품입니다.</p>
          <Link href="/products" className="text-accent underline">상품 목록으로 돌아가기</Link>
        </main>
        <Footer />
      </div>
    )
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = async () => {
    if (!user) {
      setShowLoginModal(true)
      return
    }
    
    if (!selectedSize && product.sizes.length > 0) {
      showToast('사이즈를 선택해주세요.', 'error')
      return
    }
    if (!selectedColor && product.colors.length > 0) {
      showToast('컬러를 선택해주세요.', 'error')
      return
    }
    
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          size: selectedSize || undefined,
          color: selectedColor || undefined
        }),
      })

      const data = await response.json()

      if (response.ok) {
        showToast('장바구니에 추가되었습니다!', 'success')
      } else {
        showToast(data.error || '장바구니 추가에 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('장바구니 추가 오류:', error)
      showToast('장바구니 추가에 실패했습니다.', 'error')
    }
  }

  const handleBuyNow = () => {
    if (!user) {
      setShowLoginModal(true)
      return
    }
    
    if (!selectedSize && product.sizes.length > 0) {
      showToast('사이즈를 선택해주세요.', 'error')
      return
    }
    if (!selectedColor && product.colors.length > 0) {
      showToast('컬러를 선택해주세요.', 'error')
      return
    }
    
    // 바로 구매 페이지로 이동
    const params = new URLSearchParams({
      productId: product.id,
      quantity: quantity.toString(),
      price: product.price.toString()
    })
    
    if (selectedSize) {
      params.append('size', selectedSize)
    }
    if (selectedColor) {
      params.append('color', selectedColor)
    }
    
    router.push(`/checkout?${params.toString()}`)
  }

  const handleWishlistClick = async () => {
    if (!user) {
      setShowLoginModal(true)
      return
    }

    // 이미 위시리스트에 있는 경우 확인 모달 표시
    if (isWishlisted) {
      setShowConfirmModal(true)
      return
    }

    // 위시리스트에 추가
    await toggleWishlist()
  }

  const toggleWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.action === 'added') {
          setIsWishlisted(true)
          showToast('위시리스트에 추가되었습니다!', 'success')
        } else if (data.action === 'removed') {
          setIsWishlisted(false)
          showToast('위시리스트에서 제거되었습니다.', 'success')
        }
      } else {
        showToast(data.error || '위시리스트 작업에 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('위시리스트 토글 오류:', error)
      showToast('위시리스트 작업에 실패했습니다.', 'error')
    }
  }

  const handleCartClick = () => {
    handleAddToCart()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {loading ? (
        <ProductDetailSkeleton />
      ) : product ? (
        <>
          <main className="container mx-auto px-4 py-8">
            {/* 브레드크럼 */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-foreground cursor-pointer">홈</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-foreground cursor-pointer">상품</Link>
              <span>/</span>
              <Link href={`/category/${product.category}`} className="hover:text-foreground cursor-pointer">{product.category}</Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* 상품 이미지 */}
              <div className="space-y-4">
                {/* 메인 이미지 */}
                <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* 배지들 */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-medium">
                        NEW
                      </span>
                    )}
                    {product.isSale && discountPercentage > 0 && (
                      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* 공유 버튼 */}
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    title="공유하기"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                
                {/* 썸네일 이미지들 */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                          selectedImage === index ? 'border-primary' : 'border-transparent hover:border-muted-foreground'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 상품 정보 */}
              <div className="space-y-6">
                {/* 카테고리 및 이름 */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
                </div>

                {/* 평점 */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount}개 리뷰)
                  </span>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="text-sm text-accent hover:underline cursor-pointer"
                  >
                    리뷰 보기
                  </button>
                </div>

                {/* 가격 */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-foreground">
                    {product.price.toLocaleString()}원
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString()}원
                    </span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="text-lg font-medium text-red-500">
                      {discountPercentage}% 할인
                    </span>
                  )}
                </div>

                {/* 사이즈 선택 */}
                {product.sizes.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-foreground">사이즈</h3>
                      <button className="text-sm text-accent hover:underline cursor-pointer">사이즈 가이드</button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 px-4 border rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                            selectedSize === size
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 컬러 선택 */}
                {product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-3">컬러</h3>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`py-3 px-4 border rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                            selectedColor === color
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 수량 선택 */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">수량</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border rounded-lg hover:bg-muted cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 border rounded-lg hover:bg-muted cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 액션 버튼들 */}
                <div className="flex gap-3">
                  <button 
                    onClick={handleCartClick}
                    className="flex-1 bg-primary text-primary-foreground py-4 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    장바구니에 추가
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    className="flex-1 bg-accent text-accent-foreground py-4 px-6 rounded-lg font-medium hover:bg-accent/90 transition-colors cursor-pointer"
                  >
                    바로 구매
                  </button>
                  <button
                    onClick={handleWishlistClick}
                    className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'border-red-500 bg-red-50 text-red-500'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* 서비스 정보 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="w-4 h-4" />
                    <span>무료 배송</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>안전한 결제</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <RotateCcw className="w-4 h-4" />
                    <span>7일 교환/반품</span>
                  </div>
                </div>

                {/* 추가 정보 */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="w-4 h-4" />
                    <span>재고: {product.inStock ? '있음' : '품절'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{product.reviewCount}명이 구매</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 상품 상세 정보 탭 */}
            <div className="mb-16">
              <div className="border-b">
                <div className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                      activeTab === 'description'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    상품 설명
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                      activeTab === 'details'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    상품 상세
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                      activeTab === 'reviews'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    리뷰 ({product.reviews.length})
                  </button>
                </div>
              </div>

              <div className="py-8">
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {product.description}
                    </p>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-4">상품 특징</h3>
                      <ul className="space-y-3">
                        {product.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-4">사이즈 가이드</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-3">
                          정확한 사이즈를 확인하시려면 사이즈 가이드를 참고해주세요.
                        </p>
                        <Link href="/size-guide" className="text-accent text-sm font-medium hover:underline cursor-pointer">
                          사이즈 가이드 보기 →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    {product.reviews.length > 0 ? (
                      <div className="space-y-6">
                        {product.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-6">
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-muted-foreground'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-medium">{review.user}</span>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            {review.comment && (
                              <p className="text-muted-foreground">{review.comment}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">아직 리뷰가 없습니다.</p>
                        <p className="text-sm text-muted-foreground mt-2">첫 번째 리뷰를 작성해보세요!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 관련 상품 */}
            {relatedProducts.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-8">관련 상품</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <ProductCardSkeleton key={index} />
                    ))
                  ) : (
                    relatedProducts.map((relatedProduct) => (
                      <ProductCard
                        key={relatedProduct.id}
                        id={relatedProduct.id}
                        name={relatedProduct.name}
                        price={relatedProduct.price}
                        originalPrice={relatedProduct.originalPrice}
                        image={relatedProduct.image}
                        category={relatedProduct.category}
                        isNew={relatedProduct.isNew}
                        isSale={relatedProduct.isSale}
                        rating={relatedProduct.rating}
                        reviewCount={relatedProduct.reviewCount}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </main>

          <Footer />

          {/* 로그인 모달 */}
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onConfirm={() => {
              setShowLoginModal(false)
            }}
            title="로그인이 필요합니다"
            message="위시리스트에 상품을 추가하려면 로그인이 필요합니다. 로그인하시겠습니까?"
            redirect={currentUrl}
          />

          {/* 위시리스트 제거 확인 모달 */}
          <ConfirmModal
            isOpen={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={toggleWishlist}
            title="위시리스트 제거"
            message="이 상품을 위시리스트에서 제거하시겠습니까?"
            confirmText="제거"
            cancelText="취소"
          />

          {/* 공유 모달 */}
          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            productName={product?.name || ''}
            productUrl={currentUrl}
            productImage={product?.images[0]}
          />
        </>
      ) : null}
    </div>
  )
} 