import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('🧪 테스트 API 호출됨')
    
    // 데이터베이스 연결 테스트
    const productCount = await prisma.product.count()
    console.log('📊 총 상품 수:', productCount)
    
    // 첫 번째 상품 조회
    const firstProduct = await prisma.product.findFirst({
      include: {
        category: true,
      },
    })
    
    if (firstProduct) {
      console.log('🔍 첫 번째 상품:', {
        id: firstProduct.id,
        name: firstProduct.name,
        category: firstProduct.category.name,
      })
    }
    
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
    console.error('❌ 테스트 API 오류:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
} 