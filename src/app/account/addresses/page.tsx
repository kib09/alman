'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { MapPin, User, Star, Edit, Trash2, Plus, Home, Building, ChevronRight } from 'lucide-react'
import AddressInput from '@/components/ui/AddressInput'

interface Address {
  id: string
  name: string
  recipient: string
  phone: string
  address: string
  detailAddress: string
  zipCode: string
  isDefault: boolean
  type: 'home' | 'work' | 'other'
}

export default function AccountAddressesPage() {
  const { user, loading } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  // 로그인 상태 확인
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/account/addresses')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchAddresses()
    }
  }, [user])

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/user/addresses')

      if (!response.ok) {
        throw new Error('배송지 조회에 실패했습니다.')
      }

      const data = await response.json()
      setAddresses(data.addresses)
    } catch (error) {
      console.error('배송지 조회 오류:', error)
      showToast('배송지 조회에 실패했습니다.', 'error')
    }
  }

  const handleAddAddress = async (addressData: Omit<Address, 'id'>) => {
    try {
      const response = await fetch('/api/user/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '배송지 추가에 실패했습니다.')
      }

      const data = await response.json()
      setAddresses(prev => [...prev, data.address])
      setShowAddForm(false)
      showToast('배송지가 추가되었습니다.', 'success')
    } catch (error) {
      console.error('배송지 추가 오류:', error)
      showToast(error instanceof Error ? error.message : '배송지 추가에 실패했습니다.', 'error')
    }
  }

  const handleEditAddress = async (id: string, addressData: Partial<Address>) => {
    try {
      const response = await fetch(`/api/user/addresses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '배송지 수정에 실패했습니다.')
      }

      const data = await response.json()
      setAddresses(prev => prev.map(addr => 
        addr.id === id ? data.address : addr
      ))
      setEditingAddress(null)
      showToast('배송지가 수정되었습니다.', 'success')
    } catch (error) {
      console.error('배송지 수정 오류:', error)
      showToast(error instanceof Error ? error.message : '배송지 수정에 실패했습니다.', 'error')
    }
  }

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('정말로 이 배송지를 삭제하시겠습니까?')) {
      return
    }

    try {
      const response = await fetch(`/api/user/addresses/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '배송지 삭제에 실패했습니다.')
      }

      setAddresses(prev => prev.filter(addr => addr.id !== id))
      showToast('배송지가 삭제되었습니다.', 'success')
    } catch (error) {
      console.error('배송지 삭제 오류:', error)
      showToast(error instanceof Error ? error.message : '배송지 삭제에 실패했습니다.', 'error')
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      const response = await fetch(`/api/user/addresses/${id}/default`, {
        method: 'PUT'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '기본 배송지 설정에 실패했습니다.')
      }

      const data = await response.json()
      setAddresses(prev => prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      })))
      showToast('기본 배송지가 변경되었습니다.', 'success')
    } catch (error) {
      console.error('기본 배송지 설정 오류:', error)
      showToast(error instanceof Error ? error.message : '기본 배송지 설정에 실패했습니다.', 'error')
    }
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="h-5 w-5" />
      case 'work':
        return <Building className="h-5 w-5" />
      default:
        return <MapPin className="h-5 w-5" />
    }
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
                <h1 className="text-3xl font-bold">배송지 관리</h1>
                <p className="text-muted-foreground">배송지를 추가하고 관리하세요</p>
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
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors"
                  >
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>주문 내역</span>
                  </Link>
                  <Link
                    href="/account/addresses"
                    className="flex items-center gap-3 p-3 rounded-lg bg-background text-primary font-medium"
                  >
                    <MapPin className="h-5 w-5" />
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
              {/* 배송지 목록 */}
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-6 bg-background">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getAddressIcon(address.type)}
                        <div>
                          <h3 className="font-semibold text-lg">{address.name}</h3>
                          {address.isDefault && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                              <Star className="h-3 w-3" />
                              기본 배송지
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefault(address.id)}
                            className="text-accent hover:text-accent/80 transition-colors"
                          >
                            기본 배송지로 설정
                          </button>
                        )}
                        <button
                          onClick={() => setEditingAddress(address)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">수령인:</span>
                        <span className="ml-2">{address.recipient}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">연락처:</span>
                        <span className="ml-2">{address.phone}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">주소:</span>
                        <span className="ml-2">
                          [{address.zipCode}] {address.address} {address.detailAddress}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 배송지 추가 버튼 */}
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center hover:border-primary transition-colors"
                >
                  <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-lg font-medium">새 배송지 추가</p>
                  <p className="text-sm text-muted-foreground">배송지를 추가하세요</p>
                </button>
              )}

              {/* 배송지 추가/수정 폼 */}
              {(showAddForm || editingAddress) && (
                <AddressForm
                  address={editingAddress}
                  onSubmit={(data) => {
                    if (editingAddress) {
                      handleEditAddress(editingAddress.id, data)
                    } else {
                      handleAddAddress(data)
                    }
                  }}
                  onCancel={() => {
                    setShowAddForm(false)
                    setEditingAddress(null)
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// 배송지 폼 컴포넌트
interface AddressFormProps {
  address?: Address | null
  onSubmit: (data: Omit<Address, 'id'>) => void
  onCancel: () => void
}

function AddressForm({ address, onSubmit, onCancel }: AddressFormProps) {
  const [formData, setFormData] = useState({
    name: address?.name || '',
    recipient: address?.recipient || '',
    phone: address?.phone || '',
    address: address?.address || '',
    detailAddress: address?.detailAddress || '',
    zipCode: address?.zipCode || '',
    type: address?.type || 'home' as const,
    isDefault: address?.isDefault || false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="border rounded-lg p-6 bg-background">
      <h3 className="text-lg font-semibold mb-4">
        {address ? '배송지 수정' : '새 배송지 추가'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">배송지명</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="예: 집, 회사"
              className="w-full px-3 py-2 border rounded-lg bg-background"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">배송지 유형</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full px-3 py-2 border rounded-lg bg-background"
            >
              <option value="home">집</option>
              <option value="work">회사</option>
              <option value="other">기타</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">수령인</label>
            <input
              type="text"
              value={formData.recipient}
              onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
              placeholder="수령인 이름"
              className="w-full px-3 py-2 border rounded-lg bg-background"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">연락처</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="010-1234-5678"
              className="w-full px-3 py-2 border rounded-lg bg-background"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">주소</label>
          <AddressInput
            zipCode={formData.zipCode}
            address={formData.address}
            detailAddress={formData.detailAddress}
            onZipCodeChange={(value) => setFormData(prev => ({ ...prev, zipCode: value }))}
            onAddressChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
            onDetailAddressChange={(value) => setFormData(prev => ({ ...prev, detailAddress: value }))}
            required={true}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isDefault"
            checked={formData.isDefault}
            onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
            className="rounded"
          />
          <label htmlFor="isDefault" className="text-sm">
            기본 배송지로 설정
          </label>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {address ? '수정하기' : '추가하기'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-muted-foreground py-2 px-4 rounded-lg hover:bg-muted transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  )
} 