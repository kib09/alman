import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdmin } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // 관리자 권한 확인
    const adminCheck = await verifyAdmin(request)
    if (!adminCheck) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      )
    }
    const body = await request.json()
    const { status } = body

    // 상태 값 검증
    const validStatuses = ['주문확인', '배송중', '배송완료']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: '유효하지 않은 주문 상태입니다.' },
        { status: 400 }
      )
    }

    // 주문 존재 확인
    const existingOrder = await prisma.order.findUnique({
      where: { id }
    })

    if (!existingOrder) {
      return NextResponse.json(
        { error: '주문을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 주문 상태 업데이트
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                images: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: '주문 상태가 업데이트되었습니다.',
      order: updatedOrder
    })
  } catch (error) {
    console.error('주문 상태 업데이트 오류:', error)
    return NextResponse.json(
      { error: '주문 상태 업데이트에 실패했습니다.' },
      { status: 500 }
    )
  }
} 