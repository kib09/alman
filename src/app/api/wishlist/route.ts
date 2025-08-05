import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// 위시리스트 조회
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      )
    }

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: {
        userId: decoded.userId,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      wishlist: wishlistItems,
    })
  } catch (error) {
    console.error('위시리스트 조회 오류:', error)
    return NextResponse.json(
      { error: '위시리스트 조회에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// 위시리스트에 상품 추가
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json(
        { error: '상품 ID가 필요합니다.' },
        { status: 400 }
      )
    }

    // 상품이 존재하는지 확인
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json(
        { error: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 이미 위시리스트에 있는지 확인
    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: decoded.userId,
          productId: productId,
        },
      },
    })

    if (existingItem) {
      return NextResponse.json(
        { error: '이미 위시리스트에 추가된 상품입니다.' },
        { status: 400 }
      )
    }

    // 위시리스트에 추가
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: decoded.userId,
        productId: productId,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: '위시리스트에 추가되었습니다.',
      wishlistItem,
    })
  } catch (error) {
    console.error('위시리스트 추가 오류:', error)
    return NextResponse.json(
      { error: '위시리스트 추가에 실패했습니다.' },
      { status: 500 }
    )
  }
} 