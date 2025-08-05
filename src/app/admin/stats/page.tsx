'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  ArrowLeft
} from 'lucide-react'

interface StatsData {
  overview: {
    totalUsers: number
    totalProducts: number
    totalOrders: number
    totalRevenue: number
  }
  recentOrders: Array<{
    id: string
    orderNumber: string
    total: number
    status: string
    createdAt: string
    user: {
      name: string
      email: string
    }
  }>
  topProducts: Array<{
    id: string
    name: string
    price: number
    reviewCount: number
    rating: number
  }>
  monthlyRevenue: Array<{
    month: string
    revenue: number
  }>
  categoryStats: Array<{
    category: string
    count: number
  }>
  orderStatusStats: Array<{
    status: string
    count: number
  }>
}

export default function AdminStatsPage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StatsData | null>(null)

  useEffect(() => {
    if (user) {
      fetchStats()
    }
  }, [user])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      } else {
        showToast('통계 데이터를 불러올 수 없습니다.', 'error')
      }
    } catch (error) {
      console.error('통계 조회 오류:', error)
      showToast('통계 조회에 실패했습니다.', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>통계 데이터를 불러오는 중...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <p>통계 데이터를 불러올 수 없습니다.</p>
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
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              매출 통계
            </h1>
            <p className="text-muted-foreground">
              ALMAN 쇼핑몰의 상세한 매출 및 운영 통계
            </p>
          </div>

          {/* 개요 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 사용자</p>
                  <p className="text-2xl font-bold">{stats.overview.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 상품</p>
                  <p className="text-2xl font-bold">{stats.overview.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 주문</p>
                  <p className="text-2xl font-bold">{stats.overview.totalOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 매출</p>
                  <p className="text-2xl font-bold">₩{stats.overview.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* 상세 통계 섹션 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 최근 주문 */}
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                최근 주문
              </h3>
              <div className="space-y-4">
                {stats.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.user.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₩{order.total.toLocaleString()}</p>
                      <p className={`text-sm ${
                        order.status === '배송완료' ? 'text-green-600' :
                        order.status === '배송중' ? 'text-blue-600' :
                        'text-orange-600'
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 인기 상품 */}
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                인기 상품
              </h3>
              <div className="space-y-4">
                {stats.topProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        리뷰 {product.reviewCount}개 • 평점 {product.rating}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₩{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 카테고리별 상품 수 */}
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                카테고리별 상품 수
              </h3>
              <div className="space-y-3">
                {stats.categoryStats.map((category) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <span className="font-medium">{category.category}</span>
                    <span className="text-lg font-bold text-primary">{category.count}개</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 주문 상태별 통계 */}
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                주문 상태별 통계
              </h3>
              <div className="space-y-3">
                {stats.orderStatusStats.map((status) => (
                  <div key={status.status} className="flex items-center justify-between">
                    <span className="font-medium">{status.status}</span>
                    <span className="text-lg font-bold text-primary">{status.count}건</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 월별 매출 차트 */}
          {stats.monthlyRevenue.length > 0 && (
            <div className="mt-8 bg-background border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                월별 매출 추이
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.monthlyRevenue.map((item) => (
                  <div key={item.month} className="text-center p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground">{item.month}</p>
                    <p className="text-lg font-bold text-primary">
                      ₩{item.revenue.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
} 