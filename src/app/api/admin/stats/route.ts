import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // 관리자 권한 확인
    const adminCheck = await verifyAdmin(request)
    
    if (!adminCheck) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      )
    }

    // 기본 통계 데이터 조회
    
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
      topProducts
    ] = await Promise.all([
      // 총 사용자 수
      prisma.user.count(),
      
      // 총 상품 수
      prisma.product.count(),
      
      // 총 주문 수
      prisma.order.count(),
      
      // 총 매출액
      prisma.order.aggregate({
        where: { status: '배송완료' },
        _sum: { total: true }
      }),
      
      // 최근 주문 (최근 5개)
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      }),
      
      // 인기 상품 (리뷰 수 기준)
      prisma.product.findMany({
        take: 5,
        orderBy: { reviewCount: 'desc' },
        select: {
          id: true,
          name: true,
          price: true,
          reviewCount: true,
          rating: true
        }
      })
    ])



    // 월별 매출 통계 (최근 6개월) - MongoDB 호환성을 위해 수정
    const completedOrders = await prisma.order.findMany({
      where: {
        status: '배송완료',
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
        }
      },
      select: {
        total: true,
        createdAt: true
      }
    })

    // 월별 매출 계산
    const monthlyRevenueMap = new Map()
    completedOrders.forEach(order => {
      const month = order.createdAt.toISOString().slice(0, 7)
      monthlyRevenueMap.set(month, (monthlyRevenueMap.get(month) || 0) + order.total)
    })

    const monthlyRevenue = Array.from(monthlyRevenueMap.entries()).map(([month, revenue]) => ({
      month,
      revenue
    }))

    // 카테고리별 상품 수 - MongoDB 호환성을 위해 수정
    const allProducts = await prisma.product.findMany({
      include: {
        category: {
          select: { name: true }
        }
      }
    })

    const categoryStatsMap = new Map()
    allProducts.forEach(product => {
      const categoryName = product.category.name
      categoryStatsMap.set(categoryName, (categoryStatsMap.get(categoryName) || 0) + 1)
    })

    const categoryStats = Array.from(categoryStatsMap.entries()).map(([category, count]) => ({
      category,
      count
    }))

    // 주문 상태별 통계 - MongoDB 호환성을 위해 수정
    const allOrders = await prisma.order.findMany({
      select: { status: true }
    })

    const orderStatusStatsMap = new Map()
    allOrders.forEach(order => {
      orderStatusStatsMap.set(order.status, (orderStatusStatsMap.get(order.status) || 0) + 1)
    })

    const orderStatusStats = Array.from(orderStatusStatsMap.entries()).map(([status, count]) => ({
      status,
      count
    }))

    return NextResponse.json({
      success: true,
      stats: {
        overview: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalRevenue: totalRevenue._sum.total || 0
        },
        recentOrders,
        topProducts,
        monthlyRevenue,
        categoryStats,
        orderStatusStats
      }
    })
  } catch (error) {
    console.error('관리자 통계 조회 오류:', error)
    return NextResponse.json(
      { error: '통계 조회에 실패했습니다.' },
      { status: 500 }
    )
  }
} 