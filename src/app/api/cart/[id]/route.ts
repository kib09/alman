import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

// PUT /api/cart/[id] - 장바구니 아이템 수량 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { quantity } = body

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: '유효한 수량을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 장바구니 아이템이 사용자의 것인지 확인
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    })

    if (!cartItem) {
      return NextResponse.json(
        { error: '장바구니 아이템을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 수량 업데이트
    const updatedItem = await prisma.cartItem.update({
      where: { id: params.id },
      data: { quantity },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    })

    return NextResponse.json({
      message: '수량이 업데이트되었습니다.',
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
  } catch (error) {
    console.error('장바구니 수정 오류:', error)
    return NextResponse.json(
      { error: '장바구니 수정에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart/[id] - 장바구니 아이템 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    // 장바구니 아이템이 사용자의 것인지 확인
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    })

    if (!cartItem) {
      return NextResponse.json(
        { error: '장바구니 아이템을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 아이템 삭제
    await prisma.cartItem.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      message: '장바구니에서 제거되었습니다.',
    })
  } catch (error) {
    console.error('장바구니 삭제 오류:', error)
    return NextResponse.json(
      { error: '장바구니에서 제거하는데 실패했습니다.' },
      { status: 500 }
    )
  }
} 