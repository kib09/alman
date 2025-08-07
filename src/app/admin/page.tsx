'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Users, Package, ShoppingCart, TrendingUp, Settings, Shield } from 'lucide-react'

interface AdminStats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    checkAdminStatus()
  }, [user])

  const checkAdminStatus = async () => {
    if (!user) {
      router.push('/login')
      return
    }
    
    try {
      const response = await fetch('/api/admin/verify')
      
      if (response.ok) {
        const data = await response.json()
        setIsAdmin(true)
        await fetchStats()
      } else {
        const errorData = await response.json()
        showToast('관리자 권한이 필요합니다.', 'error')
        router.push('/')
      }
    } catch (error) {
      showToast('관리자 권한 확인에 실패했습니다.', 'error')
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      
      if (response.ok) {
        const data = await response.json()
        
        setStats({
          totalUsers: data.stats.overview.totalUsers,
          totalProducts: data.stats.overview.totalProducts,
          totalOrders: data.stats.overview.totalOrders,
          totalRevenue: data.stats.overview.totalRevenue
        })
      } else {
        const errorData = await response.json()
        console.error('통계 조회 실패:', errorData)
      }
    } catch (error) {
      console.error('통계 조회 오류:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>관리자 권한을 확인하는 중...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              관리자 대시보드
            </h1>
            <p className="text-muted-foreground">
              ALMAN 쇼핑몰 관리 시스템
            </p>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 사용자</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 상품</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 주문</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 매출</p>
                  <p className="text-2xl font-bold">₩{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* 관리 메뉴 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 사용자 관리 */}
            <div className="bg-background border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">사용자 관리</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                등록된 사용자 목록을 확인하고 관리할 수 있습니다.
              </p>
              <button
                onClick={() => router.push('/admin/users')}
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                사용자 목록 보기
              </button>
            </div>

            {/* 상품 관리 */}
            <div className="bg-background border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Package className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">상품 관리</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                상품을 추가, 수정, 삭제하고 할인을 설정할 수 있습니다.
              </p>
              <button
                onClick={() => router.push('/admin/products')}
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                상품 관리하기
              </button>
            </div>

            {/* 주문 관리 */}
            <div className="bg-background border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">주문 관리</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                주문 현황을 확인하고 배송 상태를 관리할 수 있습니다.
              </p>
              <button
                onClick={() => router.push('/admin/orders')}
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                주문 관리하기
              </button>
            </div>

            {/* 통계 */}
            <div className="bg-background border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">매출 통계</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                매출 현황과 판매 통계를 확인할 수 있습니다.
              </p>
              <button
                onClick={() => router.push('/admin/stats')}
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                통계 보기
              </button>
            </div>

            {/* 설정 */}
            <div className="bg-background border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">시스템 설정</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                쇼핑몰 설정과 관리자 계정을 관리할 수 있습니다.
              </p>
              <button
                onClick={() => router.push('/admin/settings')}
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                설정 관리
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 