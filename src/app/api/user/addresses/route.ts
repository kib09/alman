import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// GET: 사용자의 배송지 목록 조회
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: '유효하지 않은 토큰입니다.' }, { status: 401 })
    }

    const addresses = await prisma.address.findMany({
      where: {
        userId: decoded.userId
      },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ addresses })
  } catch (error) {
    console.error('배송지 조회 오류:', error)
    return NextResponse.json({ error: '배송지 조회에 실패했습니다.' }, { status: 500 })
  }
}

// POST: 새 배송지 추가
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: '유효하지 않은 토큰입니다.' }, { status: 401 })
    }

    const body = await request.json()
    const { name, recipient, phone, address, detailAddress, zipCode, type, isDefault } = body

    // 필수 필드 검증
    if (!name || !recipient || !phone || !address || !zipCode) {
      return NextResponse.json({ error: '필수 필드를 입력해주세요.' }, { status: 400 })
    }

    // 기본 배송지로 설정하는 경우, 기존 기본 배송지를 해제
    if (isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: decoded.userId,
          isDefault: true
        },
        data: {
          isDefault: false
        }
      })
    }

    const newAddress = await prisma.address.create({
      data: {
        userId: decoded.userId,
        name,
        recipient,
        phone,
        address,
        detailAddress,
        zipCode,
        type: type || 'home',
        isDefault: isDefault || false
      }
    })

    return NextResponse.json({ address: newAddress }, { status: 201 })
  } catch (error) {
    console.error('배송지 추가 오류:', error)
    return NextResponse.json({ error: '배송지 추가에 실패했습니다.' }, { status: 500 })
  }
} 