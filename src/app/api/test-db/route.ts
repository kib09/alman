import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('🔍 데이터베이스 연결 테스트 시작')
    console.log('🔗 DATABASE_URL 존재 여부:', !!process.env.DATABASE_URL)
    console.log('🌍 NODE_ENV:', process.env.NODE_ENV)
    
    // 데이터베이스 연결 테스트
    await prisma.$connect()
    console.log('✅ Prisma 연결 성공')
    
    // 상품 수 조회
    const productCount = await prisma.product.count()
    console.log('📦 총 상품 수:', productCount)
    
    // 카테고리 수 조회
    const categoryCount = await prisma.category.count()
    console.log('📂 총 카테고리 수:', categoryCount)
    
    // 샘플 상품 조회
    const sampleProduct = await prisma.product.findFirst({
      include: {
        category: true
      }
    })
    
    console.log('📋 샘플 상품:', sampleProduct ? {
      id: sampleProduct.id,
      name: sampleProduct.name,
      category: sampleProduct.category.name
    } : '상품 없음')
    
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
    console.error('❌ 데이터베이스 연결 테스트 실패:', error)
    console.error('❌ 오류 상세 정보:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    })
    
    return NextResponse.json({
      success: false,
      message: '데이터베이스 연결 실패',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 