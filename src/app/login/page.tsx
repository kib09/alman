'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

function LoginPageContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // URL 파라미터에서 리다이렉트 경로와 메시지 가져오기
  const redirect = searchParams.get('redirect')
  const urlMessage = searchParams.get('message')

  useEffect(() => {
    if (urlMessage) {
      setMessage(urlMessage)
    }
  }, [urlMessage])

  // 이미 로그인된 경우 리다이렉트
  useEffect(() => {
    if (user) {
      router.push(redirect || '/')
    }
  }, [user, redirect, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, password)

    if (result.success) {
      router.push(redirect || '/')
    } else {
      setError(result.error || '로그인에 실패했습니다.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-foreground">
              로그인
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              또는{' '}
              <Link
                href="/register"
                className="font-medium text-primary hover:text-primary/80"
              >
                회원가입
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  이메일
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-input placeholder-muted-foreground text-foreground bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  비밀번호
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 pl-10 pr-10 border border-input placeholder-muted-foreground text-foreground bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="비밀번호를 입력하세요"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '로그인 중...' : '로그인'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">로그인 페이지를 불러오는 중...</p>
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  )
} 