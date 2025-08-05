'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  ArrowLeft,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  shippingName: string
  shippingPhone: string
  shippingAddress: string
  user: {
    name: string
    email: string
  }
  orderItems: Array<{
    id: string
    quantity: number
    price: number
    product: {
      name: string
      images: string
    }
  }>
}

export default function AdminOrdersPage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders)
      } else {
        showToast('주문 데이터를 불러올 수 없습니다.', 'error')
      }
    } catch (error) {
      console.error('주문 조회 오류:', error)
      showToast('주문 조회에 실패했습니다.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        showToast('주문 상태가 업데이트되었습니다.', 'success')
        fetchOrders() // 목록 새로고침
        setSelectedOrder(null)
      } else {
        showToast('주문 상태 업데이트에 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('주문 상태 업데이트 오류:', error)
      showToast('주문 상태 업데이트에 실패했습니다.', 'error')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '주문확인':
        return <Clock className="h-4 w-4 text-orange-500" />
      case '배송중':
        return <Truck className="h-4 w-4 text-blue-500" />
      case '배송완료':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '주문확인':
        return 'text-orange-600 bg-orange-100'
      case '배송중':
        return 'text-blue-600 bg-blue-100'
      case '배송완료':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-red-600 bg-red-100'
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>주문 데이터를 불러오는 중...</p>
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
              <ShoppingCart className="h-8 w-8 text-primary" />
              주문 관리
            </h1>
            <p className="text-muted-foreground">
              주문 현황을 확인하고 배송 상태를 관리할 수 있습니다.
            </p>
          </div>

          {/* 검색 및 필터 */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="주문번호, 고객명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">전체 상태</option>
              <option value="주문확인">주문확인</option>
              <option value="배송중">배송중</option>
              <option value="배송완료">배송완료</option>
            </select>
          </div>

          {/* 주문 목록 */}
          <div className="bg-background border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      주문번호
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      고객정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      주문금액
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      주문일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-secondary/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">{order.orderNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="font-medium">{order.shippingName}</div>
                          <div className="text-muted-foreground">{order.user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">
                          ₩{order.total.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 주문 상세 모달 */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-background rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">주문 상세 정보</h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {/* 주문 정보 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">주문번호</p>
                      <p className="font-medium">{selectedOrder.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">주문일</p>
                      <p className="font-medium">
                        {new Date(selectedOrder.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">고객명</p>
                      <p className="font-medium">{selectedOrder.shippingName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">연락처</p>
                      <p className="font-medium">{selectedOrder.shippingPhone}</p>
                    </div>
                  </div>

                  {/* 배송지 */}
                  <div>
                    <p className="text-sm text-muted-foreground">배송지</p>
                    <p className="font-medium">{selectedOrder.shippingAddress}</p>
                  </div>

                  {/* 주문 상품 */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">주문 상품</p>
                    <div className="space-y-2">
                      {selectedOrder.orderItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              수량: {item.quantity}개
                            </p>
                          </div>
                          <p className="font-medium">₩{item.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 총 금액 */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold">총 주문금액</p>
                      <p className="text-lg font-bold text-primary">
                        ₩{selectedOrder.total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* 상태 변경 */}
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-2">주문 상태 변경</p>
                    <div className="flex gap-2">
                      {['주문확인', '배송중', '배송완료'].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(selectedOrder.id, status)}
                          disabled={selectedOrder.status === status}
                          className={`px-3 py-1 rounded-md text-sm transition-colors ${
                            selectedOrder.status === status
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary hover:bg-secondary/80'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
} 