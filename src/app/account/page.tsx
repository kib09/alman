'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { User, Package, MapPin, Star, Settings, LogOut, ChevronRight, CheckCircle, Truck, Calendar } from 'lucide-react'

export default function AccountPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  // 로그인 상태 확인
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/account')
    }
  }, [user, loading, router])

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

  const menuItems = [
    { id: 'overview', label: '개요', icon: User },
    { id: 'orders', label: '주문 내역', icon: Package },
    { id: 'addresses', label: '배송지 관리', icon: MapPin },
    { id: 'reviews', label: '리뷰 관리', icon: Star },
    { id: 'settings', label: '설정', icon: Settings },
  ]



  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">내 계정</h1>
            <p className="text-muted-foreground">계정 정보와 주문 내역을 관리하세요</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 사이드바 메뉴 */}
            <div className="lg:col-span-1">
              <div className="bg-secondary p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">메뉴</h2>
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/account/${item.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.id === 'overview' && '계정 정보 및 통계'}
                          {item.id === 'orders' && '구매한 상품의 주문 상태 확인'}
                          {item.id === 'addresses' && '기본 배송지 및 배송지 목록 관리'}
                          {item.id === 'reviews' && '작성한 상품 리뷰 관리'}
                          {item.id === 'settings' && '알림, 개인정보 설정'}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </nav>
                
                <div className="border-t mt-6 pt-6">
                  <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors text-red-600 w-full">
                    <LogOut className="h-5 w-5" />
                    <span>로그아웃</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="lg:col-span-3">
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-4">계정 관리</h3>
                <p className="text-muted-foreground mb-6">
                  왼쪽 메뉴에서 원하는 기능을 선택하세요
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <Link
                    href="/account/overview"
                    className="flex items-center gap-3 p-4 bg-secondary rounded-lg hover:bg-muted transition-colors"
                  >
                    <User className="h-6 w-6 text-accent" />
                    <div className="text-left">
                      <p className="font-medium">계정 개요</p>
                      <p className="text-sm text-muted-foreground">내 정보와 통계</p>
                    </div>
                  </Link>
                  <Link
                    href="/account/orders"
                    className="flex items-center gap-3 p-4 bg-secondary rounded-lg hover:bg-muted transition-colors"
                  >
                    <Package className="h-6 w-6 text-accent" />
                    <div className="text-left">
                      <p className="font-medium">주문 내역</p>
                      <p className="text-sm text-muted-foreground">구매한 상품 확인</p>
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
  );
} 