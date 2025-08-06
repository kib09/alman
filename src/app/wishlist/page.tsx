'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Trash2, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ConfirmModal from '@/components/ui/ConfirmModal'

interface WishlistItem {
  id: string
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    images: string
    category: {
      name: string
    }
    isNew: boolean
    isSale: boolean
  }
  createdAt: string
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [itemToRemove, setItemToRemove] = useState<string | null>(null)
  const { user } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()

  // 로그인 확인
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/wishlist')
      return
    }
    
    fetchWishlist()
  }, [user, router])

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist')
      const data = await response.json()

      if (response.ok) {
        setItems(data.wishlist)
      } else {
        showToast(data.error || '위시리스트를 불러오는데 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('위시리스트 조회 오류:', error)
      showToast('위시리스트를 불러오는데 실패했습니다.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (id: string) => {
    setItemToRemove(id)
    setShowConfirmModal(true)
  }

  const confirmRemoveFromWishlist = async () => {
    if (!itemToRemove) return

    try {
      const response = await fetch(`/api/wishlist/${itemToRemove}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        setItems(items.filter(item => item.id !== itemToRemove))
        showToast('위시리스트에서 삭제되었습니다.', 'success')
      } else {
        showToast(data.error || '삭제에 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('위시리스트 삭제 오류:', error)
      showToast('삭제에 실패했습니다.', 'error')
    } finally {
      setItemToRemove(null)
    }
  }



  if (!user) {
    return null // 리다이렉트 중
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">위시리스트를 불러오는 중...</p>
            </div>
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
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              쇼핑 계속하기
            </Link>
            <h1 className="text-3xl font-bold">위시리스트</h1>
          </div>

          {items.length === 0 ? (
            /* 빈 위시리스트 */
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">위시리스트가 비어있습니다</h2>
              <p className="text-muted-foreground mb-8">
                마음에 드는 상품을 위시리스트에 추가해보세요
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                쇼핑 시작하기
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {items.map((item) => {
                const images = JSON.parse(item.product.images)
                const firstImage = images[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop'
                
                return (
                  <div key={item.id} className="group relative bg-background border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                    {/* 상품 이미지 */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Link href={`/product/${item.product.id}`}>
                        <Image
                          src={firstImage}
                          alt={item.product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      
                      {/* 삭제 버튼 */}
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-700 p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      {/* 배지 */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {item.product.isNew && (
                          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                            NEW
                          </span>
                        )}
                        {item.product.isSale && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                            SALE
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 상품 정보 */}
                    <div className="p-4">
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-sm mb-1 hover:text-accent transition-colors line-clamp-2">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mb-2">{item.product.category.name}</p>
                      
                      {/* 가격 */}
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{item.product.price.toLocaleString()}원</span>
                        {item.product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {item.product.originalPrice.toLocaleString()}원
                          </span>
                        )}
                      </div>
                      
                      {/* 할인율 */}
                      {item.product.originalPrice && (
                        <span className="text-xs text-red-500 font-medium">
                          {Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)}% 할인
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* 위시리스트 제거 확인 모달 */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false)
          setItemToRemove(null)
        }}
        onConfirm={confirmRemoveFromWishlist}
        title="위시리스트 제거"
        message="이 상품을 위시리스트에서 제거하시겠습니까?"
        confirmText="제거"
        cancelText="취소"
      />
    </div>
  )
} 