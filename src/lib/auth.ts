import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { prisma } from './prisma'

// 환경변수에서 시크릿 키 가져오기 (기본값 제거)
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}

export interface TokenPayload {
  userId: string
  email: string
  name: string
  iat: number  // 발급 시간
  exp: number  // 만료 시간
}

// 토큰 블랙리스트 (실제로는 Redis나 데이터베이스 사용 권장)
const tokenBlacklist = new Set<string>()

export function generateToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured')
  }
  
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: '7d',
    issuer: 'alman-shop',
    audience: 'alman-users'
  })
}

export function verifyToken(token: string): TokenPayload | null {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not configured')
    return null
  }

  try {
    // 블랙리스트 확인
    if (tokenBlacklist.has(token)) {
      console.error('Token is blacklisted')
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'alman-shop',
      audience: 'alman-users'
    }) as TokenPayload

    // 만료 시간 추가 검증
    const currentTime = Math.floor(Date.now() / 1000)
    if (decoded.exp && decoded.exp < currentTime) {
      console.error('Token has expired')
      return null
    }

    return decoded
  } catch (error) {
    console.error('토큰 검증 실패:', error)
    return null
  }
}

// 토큰을 블랙리스트에 추가 (로그아웃 시 사용)
export function blacklistToken(token: string): void {
  tokenBlacklist.add(token)
  
  // 메모리 관리를 위해 24시간 후 자동 제거
  setTimeout(() => {
    tokenBlacklist.delete(token)
  }, 24 * 60 * 60 * 1000)
}

// 요청에서 사용자 인증 확인
export async function verifyAuth(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return null
    }

    const payload = verifyToken(token)
    if (!payload) {
      return null
    }

    // 사용자 정보 조회 (추가 보안 검증)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        createdAt: true, // 추가 검증을 위해 생성 시간도 포함
      },
    })

    if (!user) {
      console.error('User not found in database')
      return null
    }

    // 이메일 일치성 검증
    if (user.email !== payload.email) {
      console.error('Email mismatch in token')
      return null
    }

    return user
  } catch (error) {
    console.error('인증 확인 오류:', error)
    return null
  }
}

// 토큰에서 사용자 ID 추출 (간단한 검증용)
export function extractUserIdFromToken(token: string): string | null {
  try {
    const payload = jwt.decode(token) as TokenPayload
    return payload?.userId || null
  } catch (error) {
    console.error('토큰 디코딩 실패:', error)
    return null
  }
} 

// 관리자 권한 확인
export async function verifyAdmin(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return null
    }
    
    if (!user.isAdmin) {
      return null
    }
    
    return user
  } catch (error) {
    console.error('관리자 권한 확인 오류:', error)
    return null
  }
} 