import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

// POST /api/orders - 주문 생성
export async function POST(request: NextRequest) {
  try {
    console.log('주문 생성 시작')
    
    const user = await verifyAuth(request)
    if (!user) {
      console.log('사용자 인증 실패')
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    console.log('사용자 ID:', user.id)

    const body = await request.json()
    const { items, shippingAddress, paymentMethod, totalAmount } = body

    console.log('주문 데이터:', { items, shippingAddress, paymentMethod, totalAmount })
    console.log('주문 데이터 타입:', {
      itemsType: typeof items,
      itemsLength: items?.length,
      shippingAddressType: typeof shippingAddress,
      totalAmountType: typeof totalAmount
    })

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: '주문할 상품이 없습니다.' },
        { status: 400 }
      )
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: '배송 주소를 입력해주세요.' },
        { status: 400 }
      )
    }

    if (!paymentMethod) {
      return NextResponse.json(
        { error: '결제 방법을 선택해주세요.' },
        { status: 400 }
      )
    }

    console.log('주문 생성 중...')
    
    // 주문 번호 생성 (현재 시간 기반)
    const orderNumber = `ORD${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    
    // 데이터 검증 및 변환
    const orderData = {
      userId: user.id,
      orderNumber,
      status: '주문확인',
      total: parseInt(totalAmount),
      shippingAddress: JSON.stringify(shippingAddress),
      shippingPhone: shippingAddress.phone || '',
      shippingName: shippingAddress.name || '',
      orderItems: {
        create: items.map((item: any) => ({
          productId: item.productId,
          quantity: parseInt(item.quantity),
          price: parseInt(item.price),
          size: item.size || null,
          color: item.color || null
        }))
      }
    }
    
    console.log('생성할 주문 데이터:', orderData)
    
    // 주문 생성
    const order = await prisma.order.create({
      data: orderData,
      include: {
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

    console.log('주문 생성 완료:', order.id)

    // 장바구니에서 주문된 상품들 삭제
    if (body.clearCart) {
      console.log('장바구니 비우기 중...')
      await prisma.cartItem.deleteMany({
        where: {
          userId: user.id,
          productId: {
            in: items.map((item: any) => item.productId)
          }
        }
      })
      console.log('장바구니 비우기 완료')
    }

    console.log('주문 생성 성공')
    return NextResponse.json({
      success: true,
      order
    })
  } catch (error) {
    console.error('주문 생성 오류:', error)
    console.error('오류 상세:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return NextResponse.json(
      { 
        error: '주문 생성에 실패했습니다.',
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    )
  }
}

// GET /api/orders - 사용자 주문 목록 조회
export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
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
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      orders
    })
  } catch (error) {
    console.error('주문 목록 조회 오류:', error)
    return NextResponse.json(
      { error: '주문 목록 조회에 실패했습니다.' },
      { status: 500 }
    )
  }
} 