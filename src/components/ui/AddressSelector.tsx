'use client'

import { useState, useEffect } from 'react'
import { X, MapPin, Home, Building, Star } from 'lucide-react'

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

interface AddressSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (address: Address) => void
}

export default function AddressSelector({ isOpen, onClose, onSelect }: AddressSelectorProps) {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchAddresses()
    }
  }, [isOpen])

  const fetchAddresses = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/user/addresses')
      if (response.ok) {
        const data = await response.json()
        setAddresses(data.addresses || [])
      }
    } catch (error) {
      console.error('배송지 조회 오류:', error)
    } finally {
      setLoading(false)
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

  const handleSelect = (address: Address) => {
    onSelect(address)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">배송지 선택</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>배송지를 불러오는 중...</p>
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">저장된 배송지가 없습니다.</p>
            <p className="text-sm text-muted-foreground mt-2">
              계정 설정에서 배송지를 추가해주세요.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((address) => (
              <button
                key={address.id}
                onClick={() => handleSelect(address)}
                className="w-full text-left p-4 border rounded-lg hover:border-primary hover:bg-muted transition-colors"
              >
                <div className="flex items-start gap-3">
                  {getAddressIcon(address.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{address.name}</h4>
                      {address.isDefault && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                          <Star className="h-3 w-3" />
                          기본
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>수령인: {address.recipient}</p>
                      <p>연락처: {address.phone}</p>
                      <p>주소: [{address.zipCode}] {address.address} {address.detailAddress}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-muted-foreground rounded-lg hover:bg-muted transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  )
} 