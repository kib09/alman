import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

// GET /api/user/recent-orders - 최근 주문 조회
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

    // URL 파라미터 파싱
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '5')

         // 최근 주문 조회
     const recentOrders = await prisma.order.findMany({
       where: { userId },
       include: {
         orderItems: {
           include: {
             product: {
               select: {
                 id: true,
                 name: true,
                 images: true,
                 price: true
               }
             }
           }
         }
       },
       orderBy: {
         createdAt: 'desc'
       },
       take: limit
     })

     // totalAmount 필드를 total로 매핑
     const mappedOrders = recentOrders.map(order => ({
       ...order,
       totalAmount: order.total
     }))

         return NextResponse.json({
       success: true,
       orders: mappedOrders
     })
  } catch (error) {
    console.error('최근 주문 조회 오류:', error)
    return NextResponse.json(
      { error: '최근 주문 조회에 실패했습니다.' },
      { status: 500 }
    )
  }
} 