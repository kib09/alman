'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import { useCart } from '@/contexts/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  size?: string
  color?: string
  quantity: number
}

export default function CartPage() {
  const { user, loading } = useAuth()
  const { showToast } = useToast()
  const { updateCartCount } = useCart()
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  // 로그인 상태 확인
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/cart')
    }
  }, [user, loading, router])

  // 장바구니 데이터 로드
  useEffect(() => {
    if (user) {
      fetchCartItems()
    }
  }, [user])

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        setCartItems(data.items)
      } else {
        showToast('장바구니를 불러오는데 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('장바구니 로드 오류:', error)
      showToast('장바구니를 불러오는데 실패했습니다.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setUpdatingItems(prev => new Set(prev).add(id))
    
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })

      if (response.ok) {
        const data = await response.json()
        setCartItems(items =>
          items.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        )
        showToast('수량이 업데이트되었습니다.', 'success')
        // 헤더의 장바구니 개수 업데이트
        await updateCartCount()
      } else {
        const error = await response.json()
        showToast(error.error || '수량 업데이트에 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('수량 업데이트 오류:', error)
      showToast('수량 업데이트에 실패했습니다.', 'error')
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const removeItem = async (id: string) => {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setCartItems(items => items.filter(item => item.id !== id))
        showToast('장바구니에서 제거되었습니다.', 'success')
        // 헤더의 장바구니 개수 업데이트
        await updateCartCount()
      } else {
        const error = await response.json()
        showToast(error.error || '제거에 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('아이템 제거 오류:', error)
      showToast('제거에 실패했습니다.', 'error')
    }
  }

  // 로딩 중이거나 로그인되지 않은 경우
  if (loading || isLoading) {
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = cartItems.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.price
    return sum + (originalPrice - item.price) * item.quantity
  }, 0)
  const shipping = subtotal > 100000 ? 0 : 3000
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">장바구니가 비어있습니다</h2>
            <p className="text-muted-foreground mb-6">
              상품을 추가해보세요
            </p>
            <a
              href="/products"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              쇼핑 계속하기
            </a>
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
            <a
              href="/products" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              쇼핑 계속하기
            </a>
            <h1 className="text-3xl font-bold">장바구니</h1>
          </div>

          {/* 장바구니 상품 목록 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  {/* 상품 이미지 */}
                  <div className="relative w-24 h-32 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* 상품 정보 */}
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <div className="text-sm text-muted-foreground mb-2">
                      <span>카테고리: {item.category}</span>
                      {item.size && (
                        <>
                          <span className="mx-2">•</span>
                          <span>사이즈: {item.size}</span>
                        </>
                      )}
                      {item.color && (
                        <>
                          <span className="mx-2">•</span>
                          <span>색상: {item.color}</span>
                        </>
                      )}
                    </div>
                    
                    {/* 가격 */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-bold">{item.price.toLocaleString()}원</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {item.originalPrice.toLocaleString()}원
                        </span>
                      )}
                    </div>

                    {/* 수량 조절 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={updatingItems.has(item.id)}
                          className="p-1 border rounded hover:bg-secondary disabled:opacity-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {updatingItems.has(item.id) ? '...' : item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={updatingItems.has(item.id)}
                          className="p-1 border rounded hover:bg-secondary disabled:opacity-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {/* 삭제 버튼 */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 주문 요약 */}
            <div className="lg:col-span-1">
              <div className="bg-secondary p-6 rounded-lg sticky top-24">
                <h2 className="text-xl font-bold mb-4">주문 요약</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>상품 금액</span>
                    <span>{subtotal.toLocaleString()}원</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>할인 금액</span>
                      <span>-{discount.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>배송비</span>
                    <span>{shipping === 0 ? '무료' : `${shipping.toLocaleString()}원`}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>총 결제 금액</span>
                      <span>{total.toLocaleString()}원</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  주문하기
                </button>

                {shipping > 0 && (
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    {((100000 - subtotal) / 1).toFixed(0)}원 더 구매하면 무료 배송!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 