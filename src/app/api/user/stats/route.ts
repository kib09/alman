import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

// GET /api/user/stats - 사용자 통계 조회
export async function GET(request: NextRequest) {
  try {
    // 인증 확인
    const authResult = await verifyAuth(request)
    if (!authResult) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      )
    }

    const userId = authResult.userId

    // 사용자 통계 데이터 조회
    const [
      totalOrders,
      totalReviews,
      pendingDeliveries,
      totalSpent,
      wishlistItems
    ] = await Promise.all([
      // 총 주문 수
      prisma.order.count({
        where: { userId }
      }),
      
      // 총 리뷰 수
      prisma.review.count({
        where: { userId }
      }),
      
             // 배송중인 주문 수
       prisma.order.count({
         where: {
           userId,
           status: {
             in: ['배송중']
           }
         }
       }),
      
             // 총 구매액
       prisma.order.aggregate({
         where: {
           userId,
           status: '배송완료'
         },
         _sum: {
           total: true
         }
       }),
      
      // 위시리스트 아이템 수
      prisma.wishlistItem.count({
        where: { userId }
      })
    ])

    return NextResponse.json({
      success: true,
             stats: {
         totalOrders,
         totalReviews,
         pendingDeliveries,
         totalSpent: totalSpent._sum.total || 0,
         wishlistItems
       }
    })
  } catch (error) {
    console.error('사용자 통계 조회 오류:', error)
    return NextResponse.json(
      { error: '통계 조회에 실패했습니다.', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 