import { NextRequest, NextResponse } from 'next/server'
import { blacklistToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // 현재 토큰을 블랙리스트에 추가
    const token = request.cookies.get('token')?.value
    if (token) {
      blacklistToken(token)
    }

    const response = NextResponse.json({
      message: '로그아웃이 완료되었습니다.',
    })

    // JWT 토큰 쿠키 삭제
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
    })

    return response
  } catch (error) {
    console.error('로그아웃 오류:', error)
    return NextResponse.json(
      { error: '로그아웃에 실패했습니다.' },
      { status: 500 }
    )
  }
} 