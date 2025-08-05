'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Package, User, Star, Truck, Calendar, Edit, ChevronRight, CheckCircle, Clock, AlertCircle, Search, Filter } from 'lucide-react'

interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  size?: string
  color?: string
  product: {
    name: string
    images: string
  }
}

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  shippingAddress: string
  shippingPhone: string
  shippingName: string
  createdAt: string
  orderItems: OrderItem[]
}

export default function AccountOrdersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // 로그인 상태 확인
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/account/orders')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, statusFilter])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      } else {
        console.error('주문 내역 조회 실패')
      }
    } catch (error) {
      console.error('주문 내역 조회 오류:', error)
    } finally {
      setLoadingOrders(false)
    }
  }

  const filterOrders = () => {
    let filtered = orders

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderItems.some(item => item.product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // 상태 필터링
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '배송완료':
        return 'text-green-600 bg-green-100'
      case '배송중':
        return 'text-blue-600 bg-blue-100'
      case '주문확인':
        return 'text-yellow-600 bg-yellow-100'
      case '주문접수':
        return 'text-gray-600 bg-gray-100'
      case '주문취소':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '배송완료':
        return <CheckCircle className="h-4 w-4" />
      case '배송중':
        return <Truck className="h-4 w-4" />
      case '주문확인':
        return <Clock className="h-4 w-4" />
      case '주문접수':
        return <AlertCircle className="h-4 w-4" />
      case '주문취소':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">주문 내역</h1>
                <p className="text-muted-foreground">구매한 상품의 주문 상태를 확인하세요</p>
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
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors"
                  >
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span>개요</span>
                  </Link>
                  <Link
                    href="/account/orders"
                    className="flex items-center gap-3 p-3 rounded-lg bg-background text-primary font-medium"
                  >
                    <Package className="h-5 w-5" />
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
              {/* 검색 및 필터 */}
              <div className="bg-secondary p-6 rounded-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="주문번호 또는 상품명으로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-background"
                    >
                      <option value="all">전체 상태</option>
                      <option value="주문접수">주문 접수</option>
                      <option value="주문확인">주문 확인</option>
                      <option value="배송중">배송 중</option>
                      <option value="배송완료">배송 완료</option>
                      <option value="주문취소">주문 취소</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 주문 목록 */}
              {loadingOrders ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>주문 내역을 불러오는 중...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">주문 내역이 없습니다</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || statusFilter !== 'all' 
                      ? '검색 조건에 맞는 주문이 없습니다.' 
                      : '아직 주문한 상품이 없습니다.'}
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    쇼핑하러 가기
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-6 bg-background">
                      {/* 주문 헤더 */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                          <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      {/* 주문 상품들 */}
                      <div className="space-y-3 mb-4">
                        {order.orderItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                            <div className="relative w-16 h-16 flex-shrink-0">
                              <img
                                src={JSON.parse(item.product.images)[0]}
                                alt={item.product.name}
                                className="object-cover rounded-lg w-full h-full"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.price.toLocaleString()}원 × {item.quantity}
                                {item.size && ` • 사이즈: ${item.size}`}
                                {item.color && ` • 색상: ${item.color}`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* 주문 정보 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <label className="text-muted-foreground">배송지</label>
                          <p>{JSON.parse(order.shippingAddress).address} {JSON.parse(order.shippingAddress).detailAddress}</p>
                        </div>
                        <div>
                          <label className="text-muted-foreground">수령인</label>
                          <p>{order.shippingName} ({order.shippingPhone})</p>
                        </div>
                      </div>
                      
                      {/* 주문 푸터 */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-lg font-bold">
                          총 {order.total.toLocaleString()}원
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/account/orders/${order.id}`}
                            className="text-accent hover:text-accent/80 transition-colors"
                          >
                            주문 상세보기
                          </Link>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 