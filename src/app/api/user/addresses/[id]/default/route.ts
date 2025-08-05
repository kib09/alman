import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// PUT: 기본 배송지 설정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: '유효하지 않은 토큰입니다.' }, { status: 401 })
    }

    // 배송지가 해당 사용자의 것인지 확인
    const existingAddress = await prisma.address.findFirst({
      where: {
        id: id,
        userId: decoded.userId
      }
    })

    if (!existingAddress) {
      return NextResponse.json({ error: '배송지를 찾을 수 없습니다.' }, { status: 404 })
    }

    // 이미 기본 배송지인 경우
    if (existingAddress.isDefault) {
      return NextResponse.json({ message: '이미 기본 배송지입니다.' })
    }

    // 기존 기본 배송지를 해제
    await prisma.address.updateMany({
      where: {
        userId: decoded.userId,
        isDefault: true
      },
      data: {
        isDefault: false
      }
    })

    // 새로운 기본 배송지 설정
    const updatedAddress = await prisma.address.update({
      where: {
        id: id
      },
      data: {
        isDefault: true
      }
    })

    return NextResponse.json({ address: updatedAddress })
  } catch (error) {
    console.error('기본 배송지 설정 오류:', error)
    return NextResponse.json({ error: '기본 배송지 설정에 실패했습니다.' }, { status: 500 })
  }
} 