/**
 * 🧪 개발용 데이터베이스 테스트 API
 * 
 * 이 API는 개발 및 디버깅 목적으로만 사용됩니다.
 * 프로덕션 환경에서는 이 API를 비활성화하거나 제거하는 것을 권장합니다.
 * 
 * 사용법:
 * - GET /api/test-db: 데이터베이스 연결 및 기본 데이터 조회 테스트
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
    await prisma.$connect()
    
    // 상품 수 조회
    const productCount = await prisma.product.count()
    
    // 카테고리 수 조회
    const categoryCount = await prisma.category.count()
    
    // 샘플 상품 조회
    const sampleProduct = await prisma.product.findFirst({
      include: {
        category: true
      }
    })
    
    return NextResponse.json({
      success: true,
      message: '데이터베이스 연결 성공',
      data: {
        productCount,
        categoryCount,
        sampleProduct: sampleProduct ? {
          id: sampleProduct.id,
          name: sampleProduct.name,
          category: sampleProduct.category.name
        } : null
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '데이터베이스 연결 실패',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 