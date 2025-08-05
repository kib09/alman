'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

interface AddressInputProps {
  zipCode: string
  address: string
  detailAddress: string
  onZipCodeChange: (value: string) => void
  onAddressChange: (value: string) => void
  onDetailAddressChange: (value: string) => void
  zipCodeLabel?: string
  addressLabel?: string
  detailAddressLabel?: string
  zipCodePlaceholder?: string
  addressPlaceholder?: string
  detailAddressPlaceholder?: string
  required?: boolean
}

declare global {
  interface Window {
    daum: any
  }
}

export default function AddressInput({
  zipCode,
  address,
  detailAddress,
  onZipCodeChange,
  onAddressChange,
  onDetailAddressChange,
  zipCodeLabel = "우편번호",
  addressLabel = "기본 주소",
  detailAddressLabel = "상세 주소",
  zipCodePlaceholder = "우편번호",
  addressPlaceholder = "기본 주소",
  detailAddressPlaceholder = "상세 주소 (선택사항)",
  required = false
}: AddressInputProps) {
  const [isDaumLoaded, setIsDaumLoaded] = useState(false)

  useEffect(() => {
    // 카카오 주소 API 스크립트 로드
    const script = document.createElement('script')
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    script.onload = () => setIsDaumLoaded(true)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleAddressSearch = () => {
    if (!isDaumLoaded) {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }

    new window.daum.Postcode({
      oncomplete: function(data: any) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 동적으로 HTML을 생성하거나 아래의 코드를 수정하세요.
        
        // 도로명 주소의 노출 규칙에 따라 주소를 표시합니다.
        // 내려오는 데이터에 도로명 주소가 포함되어 있습니다.
        let roadAddress = data.roadAddress // 도로명 주소 변수
        let jibunAddress = data.jibunAddress // 지번 주소 변수
        
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        onZipCodeChange(data.zonecode)
        onAddressChange(roadAddress || jibunAddress)
        
        // 상세주소 필드에 포커스를 이동한다.
        const detailInput = document.querySelector('input[placeholder*="상세"]') as HTMLInputElement
        if (detailInput) {
          detailInput.focus()
        }
      }
    }).open()
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          {zipCodeLabel} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={zipCode}
            onChange={(e) => onZipCodeChange(e.target.value)}
            placeholder={zipCodePlaceholder}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            readOnly
            required={required}
          />
          <button
            type="button"
            onClick={handleAddressSearch}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            주소 검색
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {addressLabel} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder={addressPlaceholder}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          readOnly
          required={required}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {detailAddressLabel}
        </label>
        <input
          type="text"
          value={detailAddress}
          onChange={(e) => onDetailAddressChange(e.target.value)}
          placeholder={detailAddressPlaceholder}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  )
} 