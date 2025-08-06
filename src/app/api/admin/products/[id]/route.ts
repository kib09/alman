import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdmin } from '@/lib/auth'

// PUT /api/admin/products/[id] - 상품 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // 관리자 권한 확인
    const adminCheck = await verifyAdmin(request)
    if (!adminCheck) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const {
      name,
      description,
      price,
      originalPrice,
      images,
      categoryId,
      sizes,
      colors,
      details,
      isNew,
      isSale,
      inStock
    } = body

    // 필수 필드 검증
    if (!name || !description || !price || !categoryId || !images || images.length === 0) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      )
    }

    // 상품 수정
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        images: JSON.stringify(images),
        categoryId,
        sizes: JSON.stringify(sizes.filter((size: string) => size.trim() !== '')),
        colors: JSON.stringify(colors.filter((color: string) => color.trim() !== '')),
        details: JSON.stringify(details.filter((detail: string) => detail.trim() !== '')),
        isNew: Boolean(isNew),
        isSale: Boolean(isSale),
        inStock: Boolean(inStock)
      },
      include: {
        category: {
          select: { name: true }
        }
      }
    })

    return NextResponse.json({
      success: true,
      product
    })
  } catch (error) {
    console.error('상품 수정 오류:', error)
    return NextResponse.json(
      { error: '상품 수정에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/products/[id] - 상품 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // 관리자 권한 확인
    const adminCheck = await verifyAdmin(request)
    if (!adminCheck) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      )
    }

    // 트랜잭션을 사용하여 관련 데이터를 모두 삭제
    await prisma.$transaction(async (tx) => {
      // 1. 관련된 리뷰 삭제
      await tx.review.deleteMany({
        where: { productId: id }
      })

      // 2. 관련된 장바구니 아이템 삭제
      await tx.cartItem.deleteMany({
        where: { productId: id }
      })

      // 3. 관련된 위시리스트 아이템 삭제
      await tx.wishlistItem.deleteMany({
        where: { productId: id }
      })

      // 4. 관련된 주문 아이템 삭제
      await tx.orderItem.deleteMany({
        where: { productId: id }
      })

      // 5. 마지막으로 상품 삭제
      await tx.product.delete({
        where: { id }
      })
    })

    return NextResponse.json({
      success: true,
      message: '상품이 삭제되었습니다.'
    })
  } catch (error) {
    console.error('상품 삭제 오류:', error)
    return NextResponse.json(
      { 
        error: '상품 삭제에 실패했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/products/[id] - 상품 상태 업데이트
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // 관리자 권한 확인
    const adminCheck = await verifyAdmin(request)
    if (!adminCheck) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const updateData: any = {}

    // 업데이트할 필드만 포함
    if (body.hasOwnProperty('isNew')) updateData.isNew = Boolean(body.isNew)
    if (body.hasOwnProperty('isSale')) updateData.isSale = Boolean(body.isSale)
    if (body.hasOwnProperty('inStock')) updateData.inStock = Boolean(body.inStock)

    // 상품 상태 업데이트
    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: {
          select: { name: true }
        }
      }
    })

    return NextResponse.json({
      success: true,
      product
    })
  } catch (error) {
    console.error('상품 상태 업데이트 오류:', error)
    return NextResponse.json(
      { error: '상품 상태 업데이트에 실패했습니다.' },
      { status: 500 }
    )
  }
} 