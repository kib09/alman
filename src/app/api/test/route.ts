/**
 * 🧪 개발용 테스트 API
 * 
 * 이 API는 개발 및 디버깅 목적으로만 사용됩니다.
 * 프로덕션 환경에서는 이 API를 비활성화하거나 제거하는 것을 권장합니다.
 * 
 * 사용법:
 * - GET /api/test: 기본 테스트 (데이터베이스 연결, 상품 조회)
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  // 프로덕션 환경에서는 테스트 API 비활성화
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: '테스트 API는 프로덕션 환경에서 사용할 수 없습니다.' },
      { status: 403 }
    )
  }

  try {
    // 데이터베이스 연결 테스트
    const productCount = await prisma.product.count()
    
    // 첫 번째 상품 조회
    const firstProduct = await prisma.product.findFirst({
      include: {
        category: true,
      },
    })
    
    return NextResponse.json({
      success: true,
      productCount,
      firstProduct: firstProduct ? {
        id: firstProduct.id,
        name: firstProduct.name,
        category: firstProduct.category.name,
      } : null,
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
} 