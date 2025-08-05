import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

// GET /api/wishlist/check - 위시리스트 상태 확인
export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const productIds = searchParams.get('productIds')

    if (!productIds) {
      return NextResponse.json(
        { error: '상품 ID가 필요합니다.' },
        { status: 400 }
      )
    }

    const productIdArray = productIds.split(',')

    // 위시리스트에 있는 상품들 조회
    const wishlistItems = await prisma.wishlistItem.findMany({
      where: {
        userId: user.id,
        productId: {
          in: productIdArray
        }
      },
      select: {
        productId: true
      }
    })

    // 위시리스트에 있는 상품 ID 목록
    const wishlistedProductIds = wishlistItems.map(item => item.productId)

    return NextResponse.json({
      wishlistedProductIds
    })

  } catch (error) {
    console.error('위시리스트 상태 확인 오류:', error)
    return NextResponse.json(
      { error: '위시리스트 상태 확인 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 