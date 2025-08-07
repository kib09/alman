import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // 1. 데이터베이스 연결 테스트
    
    // 2. 사용자 수 확인
    const userCount = await prisma.user.count()
    
    // 3. 상품 수 확인
    const productCount = await prisma.product.count()
    
    // 4. 카테고리 수 확인
    const categoryCount = await prisma.category.count()
    
    // 5. 첫 번째 사용자 조회 (있다면)
    let firstUser = null
    if (userCount > 0) {
      firstUser = await prisma.user.findFirst({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      })
    }
    
    // 6. 첫 번째 상품 조회 (있다면)
    let firstProduct = null
    if (productCount > 0) {
      firstProduct = await prisma.product.findFirst({
        select: {
          id: true,
          name: true,
          price: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Prisma 연결 성공!',
      database: {
        users: userCount,
        products: productCount,
        categories: categoryCount,
      },
      sampleData: {
        firstUser,
        firstProduct,
      },
    })
  } catch (error) {
    console.error('Prisma 테스트 오류:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Prisma 연결 실패',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
} 