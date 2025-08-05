'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import { useCart } from '@/contexts/CartContext'
import { Search, Heart, ShoppingBag, User, Menu, X, LogOut } from 'lucide-react'
import SearchInput from '@/components/ui/SearchInput'

export default function Header() {
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { user, logout } = useAuth()
  const { showToast } = useToast()
  const { cartCount } = useCart()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    setShowMobileMenu(false)
    showToast('로그아웃되었습니다.', 'success')
  }

  // 로그인이 필요한 기능에 대한 핸들러
  const handleAuthRequired = (feature: string) => {
    if (!user) {
      showToast(`${feature}을 이용하려면 로그인이 필요합니다.`, 'info', 3000)
      return false
    }
    return true
  }

  // 위시리스트 클릭 핸들러
  const handleWishlistClick = (e: React.MouseEvent) => {
    if (!handleAuthRequired('위시리스트')) {
      e.preventDefault()
    }
  }

  // 장바구니 클릭 핸들러
  const handleCartClick = (e: React.MouseEvent) => {
    if (!handleAuthRequired('장바구니')) {
      e.preventDefault()
    }
  }



  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center cursor-pointer">
            <span className="text-2xl font-bold text-primary">ALMAN</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/category/suits" className="text-foreground hover:text-primary transition-colors cursor-pointer">
              정장
            </Link>
            <Link href="/category/casual" className="text-foreground hover:text-primary transition-colors cursor-pointer">
              캐주얼
            </Link>
            <Link href="/category/shoes" className="text-foreground hover:text-primary transition-colors cursor-pointer">
              신발
            </Link>
            <Link href="/category/accessories" className="text-foreground hover:text-primary transition-colors cursor-pointer">
              액세서리
            </Link>
            <Link href="/category/sportswear" className="text-foreground hover:text-primary transition-colors cursor-pointer">
              스포츠웨어
            </Link>
          </nav>

          {/* 검색, 위시리스트, 장바구니, 사용자 메뉴 */}
          <div className="flex items-center space-x-4">
            {/* 검색 */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* 위시리스트 */}
            <Link 
              href="/wishlist" 
              className="p-2 text-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={handleWishlistClick}
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* 장바구니 */}
            <Link 
              href="/cart" 
              className="p-2 text-foreground hover:text-primary transition-colors relative cursor-pointer"
              onClick={handleCartClick}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* 사용자 메뉴 */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <User className="h-5 w-5" />
                </button>
                
                {/* 드롭다운 메뉴 */}
                {showMobileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                      {user.name}님
                    </div>
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      마이페이지
                    </Link>
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        관리자 대시보드
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <User className="h-5 w-5" />
              </Link>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* 검색바 */}
        {showSearch && (
          <div className="py-4 border-t border-border">
            <SearchInput
              placeholder="상품을 검색하세요..."
              onSearch={(query) => {
                router.push(`/search?q=${encodeURIComponent(query)}`)
                setShowSearch(false)
              }}
            />
          </div>
        )}

        {/* 모바일 메뉴 */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="space-y-2">
              <Link
                href="/category/suits"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md cursor-pointer"
                onClick={() => setShowMobileMenu(false)}
              >
                정장
              </Link>
              <Link
                href="/category/casual"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md cursor-pointer"
                onClick={() => setShowMobileMenu(false)}
              >
                캐주얼
              </Link>
              <Link
                href="/category/shoes"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md cursor-pointer"
                onClick={() => setShowMobileMenu(false)}
              >
                신발
              </Link>
              <Link
                href="/category/accessories"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md cursor-pointer"
                onClick={() => setShowMobileMenu(false)}
              >
                액세서리
              </Link>
              <Link
                href="/category/sportswear"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md cursor-pointer"
                onClick={() => setShowMobileMenu(false)}
              >
                스포츠웨어
              </Link>
              
              {/* 모바일에서도 위시리스트와 장바구니에 로그인 체크 적용 */}
              <Link
                href="/wishlist"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md cursor-pointer"
                onClick={(e) => {
                  if (!handleAuthRequired('위시리스트')) {
                    e.preventDefault()
                  }
                  setShowMobileMenu(false)
                }}
              >
                위시리스트
              </Link>
              <Link
                href="/cart"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md cursor-pointer"
                onClick={(e) => {
                  if (!handleAuthRequired('장바구니')) {
                    e.preventDefault()
                  }
                  setShowMobileMenu(false)
                }}
              >
                장바구니 {cartCount > 0 && `(${cartCount})`}
              </Link>
              
              {!user && (
                <Link
                  href="/login"
                  className="block px-4 py-2 text-foreground hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => setShowMobileMenu(false)}
                >
                  로그인
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 