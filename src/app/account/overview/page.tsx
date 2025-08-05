'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { User, Package, Star, Truck, Calendar, Edit, ChevronRight, TrendingUp, ShoppingBag, Heart, Settings } from 'lucide-react'

interface UserStats {
  totalOrders: number
  totalReviews: number
  pendingDeliveries: number
  totalSpent: number
  wishlistItems: number
}

export default function AccountOverviewPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<UserStats>({
    totalOrders: 0,
    totalReviews: 0,
    pendingDeliveries: 0,
    totalSpent: 0,
    wishlistItems: 0
  })

  // 로그인 상태 확인
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/account/overview')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchUserStats()
    }
  }, [user])

  const fetchUserStats = async () => {
    try {
      // 실제 API 호출로 대체 예정
      // const response = await fetch('/api/user/stats')
      // const data = await response.json()
      // setStats(data)
      
      // 임시 데이터
      setStats({
        totalOrders: 12,
        totalReviews: 8,
        pendingDeliveries: 2,
        totalSpent: 1250000,
        wishlistItems: 15
      })
    } catch (error) {
      console.error('사용자 통계 조회 오류:', error)
    }
  }

  // 로딩 중이거나 로그인되지 않은 경우
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

  if (!user) {
    return null // 리다이렉트 중
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">계정 개요</h1>
                <p className="text-muted-foreground">내 계정 정보와 활동 현황을 확인하세요</p>
              </div>
              <Link
                href="/account"
                className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
              >
                ← 계정 메인으로
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 사이드바 메뉴 */}
            <div className="lg:col-span-1">
              <div className="bg-secondary p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">계정 메뉴</h2>
                <nav className="space-y-2">
                  <Link
                    href="/account/overview"
                    className="flex items-center gap-3 p-3 rounded-lg bg-background text-primary font-medium"
                  >
                    <User className="h-5 w-5" />
                    <span>개요</span>
                  </Link>
                  <Link
                    href="/account/orders"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors"
                  >
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <span>주문 내역</span>
                  </Link>
                  <Link
                    href="/account/addresses"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors"
                  >
                    <Truck className="h-5 w-5 text-muted-foreground" />
                    <span>배송지 관리</span>
                  </Link>
                  <Link
                    href="/account/reviews"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors"
                  >
                    <Star className="h-5 w-5 text-muted-foreground" />
                    <span>리뷰 관리</span>
                  </Link>
                  <Link
                    href="/account/settings"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors"
                  >
                    <Edit className="h-5 w-5 text-muted-foreground" />
                    <span>설정</span>
                  </Link>
                </nav>
              </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="lg:col-span-3 space-y-6">
              {/* 사용자 정보 카드 */}
              <div className="bg-secondary p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">사용자 정보</h3>
                  <Link
                    href="/account/settings"
                    className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    수정
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">이름</label>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">이메일</label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">전화번호</label>
                    <p className="font-medium">미등록</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">가입일</label>
                    <p className="font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* 통계 카드들 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-secondary p-6 rounded-lg text-center">
                  <Package className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">총 주문</div>
                </div>
                <div className="bg-secondary p-6 rounded-lg text-center">
                  <Star className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.totalReviews}</div>
                  <div className="text-sm text-muted-foreground">작성한 리뷰</div>
                </div>
                <div className="bg-secondary p-6 rounded-lg text-center">
                  <Truck className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.pendingDeliveries}</div>
                  <div className="text-sm text-muted-foreground">배송중</div>
                </div>
                <div className="bg-secondary p-6 rounded-lg text-center">
                  <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">₩{(stats.totalSpent / 10000).toFixed(0)}만</div>
                  <div className="text-sm text-muted-foreground">총 구매액</div>
                </div>
              </div>

              {/* 최근 활동 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 최근 주문 */}
                <div className="bg-secondary p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">최근 주문</h3>
                    <Link
                      href="/account/orders"
                      className="flex items-center gap-1 text-accent hover:text-accent/80 transition-colors text-sm"
                    >
                      전체보기
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">ORD-001</p>
                        <p className="text-sm text-muted-foreground">2024-01-15</p>
                      </div>
                      <span className="text-sm text-green-600">배송 완료</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">ORD-002</p>
                        <p className="text-sm text-muted-foreground">2024-01-10</p>
                      </div>
                      <span className="text-sm text-blue-600">배송 중</span>
                    </div>
                  </div>
                </div>

                {/* 위시리스트 */}
                <div className="bg-secondary p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">위시리스트</h3>
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-1 text-accent hover:text-accent/80 transition-colors text-sm"
                    >
                      전체보기
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground mb-2">위시리스트에 {stats.wishlistItems}개 상품</p>
                    <Link
                      href="/wishlist"
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      위시리스트 보기
                    </Link>
                  </div>
                </div>
              </div>

              {/* 빠른 액션 */}
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">빠른 액션</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    href="/products"
                    className="flex items-center gap-3 p-4 bg-background rounded-lg hover:bg-muted transition-colors"
                  >
                    <ShoppingBag className="h-6 w-6 text-accent" />
                    <div>
                      <p className="font-medium">쇼핑하기</p>
                      <p className="text-sm text-muted-foreground">새로운 상품 둘러보기</p>
                    </div>
                  </Link>
                  <Link
                    href="/account/orders"
                    className="flex items-center gap-3 p-4 bg-background rounded-lg hover:bg-muted transition-colors"
                  >
                    <Package className="h-6 w-6 text-accent" />
                    <div>
                      <p className="font-medium">주문 확인</p>
                      <p className="text-sm text-muted-foreground">주문 상태 확인하기</p>
                    </div>
                  </Link>
                  <Link
                    href="/account/settings"
                    className="flex items-center gap-3 p-4 bg-background rounded-lg hover:bg-muted transition-colors"
                  >
                    <Settings className="h-6 w-6 text-accent" />
                    <div>
                      <p className="font-medium">설정</p>
                      <p className="text-sm text-muted-foreground">계정 설정 변경</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 