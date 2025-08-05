import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// PUT: 배송지 수정
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

    const body = await request.json()
    const { name, recipient, phone, address, detailAddress, zipCode, type, isDefault } = body

    // 배송지가 해당 사용자의 것인지 확인
    const existingAddress = await prisma.address.findFirst({
      where: {
        id: params.id,
        userId: decoded.userId
      }
    })

    if (!existingAddress) {
      return NextResponse.json({ error: '배송지를 찾을 수 없습니다.' }, { status: 404 })
    }

    // 기본 배송지로 설정하는 경우, 기존 기본 배송지를 해제
    if (isDefault && !existingAddress.isDefault) {
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

    const updatedAddress = await prisma.address.update({
      where: {
        id: params.id
      },
      data: {
        name,
        recipient,
        phone,
        address,
        detailAddress,
        zipCode,
        type,
        isDefault
      }
    })

    return NextResponse.json({ address: updatedAddress })
  } catch (error) {
    console.error('배송지 수정 오류:', error)
    return NextResponse.json({ error: '배송지 수정에 실패했습니다.' }, { status: 500 })
  }
}

// DELETE: 배송지 삭제
export async function DELETE(
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
        id: params.id,
        userId: decoded.userId
      }
    })

    if (!existingAddress) {
      return NextResponse.json({ error: '배송지를 찾을 수 없습니다.' }, { status: 404 })
    }

    await prisma.address.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: '배송지가 삭제되었습니다.' })
  } catch (error) {
    console.error('배송지 삭제 오류:', error)
    return NextResponse.json({ error: '배송지 삭제에 실패했습니다.' }, { status: 500 })
  }
} 