/**
 * 🧪 개발용 테스트 주문 생성 API
 * 
 * 이 API는 개발 및 디버깅 목적으로만 사용됩니다.
 * 프로덕션 환경에서는 이 API를 비활성화하거나 제거하는 것을 권장합니다.
 * 
 * 사용법:
 * - POST /api/test-order: 테스트 주문 생성
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  // 프로덕션 환경에서는 테스트 API 비활성화
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: '테스트 API는 프로덕션 환경에서 사용할 수 없습니다.' },
      { status: 403 }
    )
  }

  try {
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
    
    return NextResponse.json({
      success: true,
      order: testOrder
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    
    return NextResponse.json(
      { 
        error: '테스트 주문 생성에 실패했습니다.',
        details: errorMessage
      },
      { status: 500 }
    )
  }
} 