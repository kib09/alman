'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Home,
  ArrowLeft
} from 'lucide-react'

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

export default function OrderDetailPage() {
  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && params.id) {
      fetchOrder()
    }
  }, [user, params.id])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data.order)
      } else {
        console.error('주문 조회 실패')
      }
    } catch (error) {
      console.error('주문 조회 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '주문확인':
        return <Package className="h-5 w-5" />
      case '배송중':
        return <Truck className="h-5 w-5" />
      case '배송완료':
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '주문확인':
        return 'text-blue-600'
      case '배송중':
        return 'text-orange-600'
      case '배송완료':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>주문 정보를 불러오는 중...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">주문을 찾을 수 없습니다</h2>
            <p className="text-muted-foreground mb-4">주문 번호를 확인해주세요.</p>
            <button
              onClick={() => router.push('/account/orders')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              주문 목록으로
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const shippingAddress = JSON.parse(order.shippingAddress)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => router.push('/account/orders')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                주문 목록으로
              </button>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold">주문 완료</h1>
            </div>
          </div>

          {/* 주문 완료 메시지 */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-green-800">주문이 성공적으로 확인되었습니다!</h2>
            </div>
            <p className="text-green-700">
              주문 번호: <span className="font-semibold">{order.orderNumber}</span>
            </p>
            <p className="text-green-700 mt-2">
              주문일: {new Date(order.createdAt).toLocaleDateString('ko-KR')}
            </p>
          </div>

          {/* 주문 상태 */}
          <div className="bg-background border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              {getStatusIcon(order.status)}
              주문 상태
            </h2>
            <div className={`flex items-center gap-2 text-lg font-medium ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status}
            </div>
          </div>

          {/* 주문 상품 정보 */}
          <div className="bg-background border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">주문 상품</h2>
                         <div className="space-y-4">
               {order.orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src={JSON.parse(item.product.images)[0]} 
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      수량: {item.quantity}개
                      {item.size && ` | 사이즈: ${item.size}`}
                      {item.color && ` | 컬러: ${item.color}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{(item.price * item.quantity).toLocaleString()}원</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>총 결제 금액</span>
                <span>{order.total.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="bg-background border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5" />
              배송 정보
            </h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium">받는 사람:</span> {order.shippingName}
              </div>
              <div>
                <span className="font-medium">연락처:</span> {order.shippingPhone}
              </div>
              <div>
                <span className="font-medium">주소:</span> {shippingAddress.address} {shippingAddress.detailAddress}
              </div>
            </div>
          </div>

          {/* 다음 단계 안내 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">다음 단계</h2>
            <div className="space-y-3 text-blue-700">
              <p>• 주문 확인 후 배송 준비를 시작합니다.</p>
              <p>• 배송 시작 시 SMS로 알려드립니다.</p>
              <p>• 주문 상태는 계정의 주문 목록에서 확인할 수 있습니다.</p>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => router.push('/account/orders')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                주문 목록 보기
              </button>
              <button
                onClick={() => router.push('/products')}
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                쇼핑 계속하기
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 