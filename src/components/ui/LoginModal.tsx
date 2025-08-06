'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, AlertCircle } from 'lucide-react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  redirect?: string
}

export default function LoginModal({
  isOpen,
  onClose,
  onConfirm,
  title = '로그인이 필요합니다',
  message = '이 기능을 사용하려면 로그인이 필요합니다. 로그인하시겠습니까?',
  redirect
}: LoginModalProps) {
  if (!isOpen) return null

  const loginUrl = redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 모달 */}
      <div className="relative bg-background border border-border rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 내용 */}
        <p className="text-muted-foreground mb-6">{message}</p>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
          >
            취소
          </button>
          <Link
            href={loginUrl}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-center"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  )
} 