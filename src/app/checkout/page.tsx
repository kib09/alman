'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  ShoppingCart, 
  CreditCard,
  Truck,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import AddressInput from '@/components/ui/AddressInput'
import AddressSelector from '@/components/ui/AddressSelector'

interface ShippingAddress {
  name: string
  phone: string
  address: string
  detailAddress: string
  zipCode: string
}

interface OrderItem {
  productId: string
  quantity: number
  price: number
  size?: string
  color?: string
  name?: string
  image?: string
}

export default function CheckoutPage() {
  const { user } = useAuth()
  const { clearCart } = useCart()
  const { showToast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    phone: '',
    address: '',
    detailAddress: '',
    zipCode: ''
  })

  // URL 파라미터에서 상품 정보 확인 (바로 구매인지 장바구니 구매인지)
  const [orderType, setOrderType] = useState<'cart' | 'direct'>('cart')
  const [directOrderItem, setDirectOrderItem] = useState<OrderItem | null>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddressSelector, setShowAddressSelector] = useState(false)

  useEffect(() => {
    const initializeOrder = async () => {
      // URL 파라미터 확인
      const urlParams = new URLSearchParams(window.location.search)
      const productId = urlParams.get('productId')
      const quantity = urlParams.get('quantity')
      const size = urlParams.get('size')
      const color = urlParams.get('color')
      const price = urlParams.get('price')

      if (productId && quantity && price) {
        setOrderType('direct')
        
        // 상품 정보 가져오기
        try {
          const response = await fetch(`/api/products/${productId}`)
          if (response.ok) {
            const product = await response.json()
            setDirectOrderItem({
              productId,
              quantity: parseInt(quantity),
              price: parseInt(price),
              size: size || undefined,
              color: color || undefined,
              name: product.name,
              image: product.images[0]
            })
          }
        } catch (error) {
          console.error('상품 정보 조회 오류:', error)
        }
      } else {
        setOrderType('cart')
        
        // 장바구니 상품 정보 가져오기
        try {
          const response = await fetch('/api/cart')
          if (response.ok) {
            const data = await response.json()
            setCartItems(data.items || [])
          }
        } catch (error) {
          console.error('장바구니 정보 조회 오류:', error)
        }
      }
      
      // 로딩 완료
      setIsLoading(false)
    }

    initializeOrder()
  }, [])

  // 사용자가 로그인되어 있을 때 기본 배송지 정보 자동 로드
  useEffect(() => {
    if (user) {
      loadUserInfo()
    }
  }, [user])

  // 주문할 상품 목록
  const orderItems = orderType === 'direct' && directOrderItem 
    ? [directOrderItem]
    : (cartItems || []).map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        color: item.color
      }))

  // 총 금액 계산 (배송비 포함)
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100000 ? 0 : 3000 // 10만원 이상 무료배송, 그 외 3천원
  const totalAmount = subtotal + shipping

  // 디버깅을 위한 로그
  

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }))
  }

  const loadUserInfo = async () => {
    try {
      // 기본 배송지 정보 가져오기
      const addressResponse = await fetch('/api/user/addresses')
      if (addressResponse.ok) {
        const addressData = await addressResponse.json()
        const defaultAddress = addressData.addresses?.find((addr: any) => addr.isDefault)
        
        if (defaultAddress) {
          // 기본 배송지 정보를 배송 정보에 설정
          setShippingAddress({
            name: defaultAddress.recipient || '',
            phone: defaultAddress.phone || '',
            address: defaultAddress.address || '',
            detailAddress: defaultAddress.detailAddress || '',
            zipCode: defaultAddress.zipCode || ''
          })
          
          showToast('기본 배송지 정보를 불러왔습니다.', 'success')
          return
        }
      }
      
      // 기본 배송지가 없는 경우 사용자 기본 정보만 가져오기
      const userResponse = await fetch('/api/auth/me')
      if (userResponse.ok) {
        const userData = await userResponse.json()
        const user = userData.user
        
        setShippingAddress(prev => ({
          ...prev,
          name: user.name || '',
          phone: user.phone || ''
        }))
        
        showToast('내 정보를 불러왔습니다.', 'success')
      } else {
        showToast('내 정보를 불러오는데 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('내 정보 불러오기 오류:', error)
      showToast('내 정보를 불러오는데 실패했습니다.', 'error')
    }
  }

  const handleAddressSelect = (address: any) => {
    setShippingAddress({
      name: address.recipient || '',
      phone: address.phone || '',
      address: address.address || '',
      detailAddress: address.detailAddress || '',
      zipCode: address.zipCode || ''
    })
    
    showToast(`${address.name} 배송지를 선택했습니다.`, 'success')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      showToast('로그인이 필요합니다.', 'error')
      router.push('/login')
      return
    }

    // 배송 주소 검증
    if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.address) {
      showToast('배송 정보를 모두 입력해주세요.', 'error')
      return
    }

    if (orderItems.length === 0) {
      showToast('주문할 상품이 없습니다.', 'error')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: orderItems,
          shippingAddress,
          paymentMethod,
          totalAmount,
          clearCart: orderType === 'cart' // 장바구니에서 주문한 경우에만 장바구니 비우기
        }),
      })

      if (response.ok) {
        const result = await response.json()
        showToast('주문이 성공적으로 완료되었습니다.', 'success')
        
        // 장바구니에서 주문한 경우 장바구니 비우기
        if (orderType === 'cart') {
          clearCart()
        }
        
        // 주문 완료 페이지로 이동
        router.push(`/orders/${result.order.id}`)
             } else {
         const error = await response.json()
         console.error('주문 실패 응답:', error)
         console.error('주문 실패 상세:', {
           status: response.status,
           statusText: response.statusText,
           error: error
         })
         showToast(error.error || '주문에 실패했습니다.', 'error')
       }
    } catch (error) {
      console.error('주문 오류:', error)
      showToast('주문에 실패했습니다.', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
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

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">로그인이 필요합니다</h2>
            <p className="text-muted-foreground mb-4">주문을 위해 로그인해주세요.</p>
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              로그인하기
            </button>
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
        <div className="container mx-auto px-4 max-w-4xl">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                뒤로 가기
              </button>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">주문하기</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 주문 상품 정보 */}
            <div className="bg-background border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                주문 상품
              </h2>
              
                             <div className="space-y-4">
                 {orderItems.map((item, index) => (
                   <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                     <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                       {orderType === 'direct' && directOrderItem ? (
                         <img 
                           src={directOrderItem.image} 
                           alt={directOrderItem.name}
                           className="w-full h-full object-cover rounded-lg"
                         />
                       ) : (
                         <img 
                           src={cartItems[index]?.image} 
                           alt={cartItems[index]?.name}
                           className="w-full h-full object-cover rounded-lg"
                         />
                       )}
                     </div>
                     <div className="flex-1">
                       <h3 className="font-medium">
                         {orderType === 'direct' && directOrderItem 
                           ? directOrderItem.name 
                           : cartItems[index]?.name || `상품 ${index + 1}`
                         }
                       </h3>
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
                 <div className="space-y-2">
                   <div className="flex justify-between">
                     <span>상품 금액</span>
                     <span>{subtotal.toLocaleString()}원</span>
                   </div>
                   <div className="flex justify-between">
                     <span>배송비</span>
                     <span>{shipping === 0 ? '무료' : `${shipping.toLocaleString()}원`}</span>
                   </div>
                   <div className="border-t pt-2">
                     <div className="flex justify-between items-center text-lg font-semibold">
                       <span>총 결제 금액</span>
                       <span>{totalAmount.toLocaleString()}원</span>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

                         {/* 배송 정보 */}
             <div className="bg-background border rounded-lg p-6">
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-xl font-semibold flex items-center gap-2">
                   <Truck className="h-5 w-5" />
                   배송 정보
                 </h2>
                                   <button
                    type="button"
                    onClick={() => setShowAddressSelector(true)}
                    className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    다른 배송지 선택
                  </button>
               </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">받는 사람 *</label>
                  <input
                    type="text"
                    value={shippingAddress.name}
                    onChange={(e) => handleAddressChange('name', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="받는 사람 이름"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">연락처 *</label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => handleAddressChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="010-0000-0000"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <AddressInput
                    zipCode={shippingAddress.zipCode}
                    address={shippingAddress.address}
                    detailAddress={shippingAddress.detailAddress}
                    onZipCodeChange={(value) => handleAddressChange('zipCode', value)}
                    onAddressChange={(value) => handleAddressChange('address', value)}
                    onDetailAddressChange={(value) => handleAddressChange('detailAddress', value)}
                    required={true}
                  />
                </div>
              </div>
            </div>

            {/* 결제 방법 */}
            <div className="bg-background border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                결제 방법
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span>신용카드</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span>무통장입금</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="kakao"
                    checked={paymentMethod === 'kakao'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span>카카오페이</span>
                </label>
              </div>
            </div>

            {/* 주문 버튼 */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border rounded-lg hover:bg-muted transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                {loading ? '주문 처리 중...' : `${totalAmount.toLocaleString()}원 주문하기`}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* 배송지 선택 모달 */}
      <AddressSelector
        isOpen={showAddressSelector}
        onClose={() => setShowAddressSelector(false)}
        onSelect={handleAddressSelect}
      />

      <Footer />
    </div>
  )
} 