import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    console.log('테스트 주문 생성 시작')
    
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    // 간단한 테스트 주문 데이터
    const orderNumber = `TEST${Date.now()}`
    
    const testOrder = await prisma.order.create({
      data: {
        userId: user.id,
        orderNumber,
        status: '주문확인',
        total: 10000,
        shippingAddress: JSON.stringify({
          name: '테스트',
          phone: '010-0000-0000',
          address: '테스트 주소',
          detailAddress: '테스트 상세주소',
          zipCode: '00000'
        }),
        shippingPhone: '010-0000-0000',
        shippingName: '테스트',
        orderItems: {
          create: [{
            productId: '507f1f77bcf86cd799439011', // 테스트 상품 ID
            quantity: 1,
            price: 10000,
            size: null,
            color: null
          }]
        }
      }
    })

    console.log('테스트 주문 생성 성공:', testOrder.id)
    
    return NextResponse.json({
      success: true,
      order: testOrder
    })
  } catch (error) {
    console.error('테스트 주문 생성 오류:', error)
    return NextResponse.json(
      { 
        error: '테스트 주문 생성에 실패했습니다.',
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    )
  }
} 