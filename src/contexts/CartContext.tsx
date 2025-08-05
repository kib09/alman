'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface CartContextType {
  cartCount: number
  updateCartCount: () => Promise<void>
  addToCart: (productId: string, quantity?: number, size?: string, color?: string) => Promise<boolean>
  clearCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const { user } = useAuth()

  // 장바구니 개수 업데이트
  const updateCartCount = async () => {
    if (!user) {
      setCartCount(0)
      return
    }

    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        setCartCount(data.totalItems || 0)
      } else {
        setCartCount(0)
      }
    } catch (error) {
      console.error('장바구니 개수 조회 오류:', error)
      setCartCount(0)
    }
  }

  // 장바구니에 상품 추가
  const addToCart = async (productId: string, quantity: number = 1, size?: string, color?: string): Promise<boolean> => {
    if (!user) {
      return false
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          productId,
          quantity,
          size,
          color
        }),
      })

      if (response.ok) {
        // 장바구니 개수 업데이트
        await updateCartCount()
        return true
      }
      return false
    } catch (error) {
      console.error('장바구니 추가 오류:', error)
      return false
    }
  }

  // 장바구니 비우기
  const clearCart = async (): Promise<void> => {
    if (!user) {
      return
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
      })

      if (response.ok) {
        // 장바구니 개수 업데이트
        await updateCartCount()
      }
    } catch (error) {
      console.error('장바구니 비우기 오류:', error)
    }
  }

  // 사용자 로그인 상태 변경 시 장바구니 개수 업데이트
  useEffect(() => {
    updateCartCount()
  }, [user])

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 