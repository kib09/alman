import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

// GET /api/cart - 사용자의 장바구니 조회
export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
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

    // 응답 데이터 변환
    const transformedItems = cartItems.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      price: item.product.price,
      originalPrice: item.product.originalPrice,
      image: JSON.parse(item.product.images)[0], // 첫 번째 이미지
      category: item.product.category.name,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    }))

    return NextResponse.json({
      items: transformedItems,
      totalItems: cartItems.length,
    })
  } catch (error) {
    console.error('장바구니 조회 오류:', error)
    return NextResponse.json(
      { error: '장바구니를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

// POST /api/cart - 장바구니에 상품 추가
export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId, quantity = 1, size, color } = body

    // 필수 필드 검증
    if (!productId) {
      return NextResponse.json(
        { error: '상품 ID가 필요합니다.' },
        { status: 400 }
      )
    }

    // 상품 존재 확인
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json(
        { error: '존재하지 않는 상품입니다.' },
        { status: 404 }
      )
    }

    // 이미 장바구니에 있는 상품인지 확인
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: user.id,
        productId,
        size: size || null,
        color: color || null,
      },
    })

    if (existingItem) {
      // 기존 아이템 수량 업데이트
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
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
        message: '장바구니에 추가되었습니다.',
        item: {
          id: updatedItem.id,
          productId: updatedItem.productId,
          name: updatedItem.product.name,
          price: updatedItem.product.price,
          originalPrice: updatedItem.product.originalPrice,
          image: JSON.parse(updatedItem.product.images)[0],
          category: updatedItem.product.category.name,
          size: updatedItem.size,
          color: updatedItem.color,
          quantity: updatedItem.quantity,
        },
      })
    } else {
      // 새 아이템 추가
      const newItem = await prisma.cartItem.create({
        data: {
          userId: user.id,
          productId,
          quantity,
          size: size || null,
          color: color || null,
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
        message: '장바구니에 추가되었습니다.',
        item: {
          id: newItem.id,
          productId: newItem.productId,
          name: newItem.product.name,
          price: newItem.product.price,
          originalPrice: newItem.product.originalPrice,
          image: JSON.parse(newItem.product.images)[0],
          category: newItem.product.category.name,
          size: newItem.size,
          color: newItem.color,
          quantity: newItem.quantity,
        },
      })
    }
  } catch (error) {
    console.error('장바구니 추가 오류:', error)
    return NextResponse.json(
      { error: '장바구니에 추가하는데 실패했습니다.' },
      { status: 500 }
    )
  }
} 