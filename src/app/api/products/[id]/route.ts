import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { use } from 'react'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/products/[id] - 특정 상품 조회
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    console.log('API: Looking for product with ID:', id) // 디버깅 로그 추가
    console.log('API: ID type:', typeof id) // ID 타입 확인
    console.log('API: ID length:', id.length) // ID 길이 확인
    
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    console.log('API: Found product:', product ? 'Yes' : 'No') // 디버깅 로그 추가

    if (!product) {
      return NextResponse.json(
        { error: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 응답 데이터 변환 - JSON 파싱 안전하게 처리
    const safeJsonParse = (data: any) => {
      if (typeof data === 'string') {
        try {
          return JSON.parse(data)
        } catch {
          // JSON 파싱 실패 시 배열로 변환
          return data ? [data] : []
        }
      }
      return data || []
    }

    const transformedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      images: safeJsonParse(product.images),
      category: product.category.name,
      categoryId: product.categoryId,
      description: product.description,
      details: safeJsonParse(product.details),
      sizes: safeJsonParse(product.sizes),
      colors: safeJsonParse(product.colors),
      isNew: product.isNew,
      isSale: product.isSale,
      rating: product.rating,
      reviewCount: product.reviewCount,
      inStock: product.inStock,
      reviews: product.reviews.map((review: any) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        user: review.user.name,
      })),
    }

    return NextResponse.json(transformedProduct)
  } catch (error) {
    console.error('상품 조회 오류:', error)
    console.error('에러 타입:', typeof error)
    console.error('에러 메시지:', error instanceof Error ? error.message : 'Unknown error')
    console.error('에러 스택:', error instanceof Error ? error.stack : 'No stack trace')
    
    return NextResponse.json(
      { 
        error: '상품을 불러오는데 실패했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - 상품 수정
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      name,
      description,
      price,
      originalPrice,
      categoryId,
      images,
      sizes,
      colors,
      details,
      isNew,
      isSale,
      inStock,
    } = body

    // 상품 존재 확인
    const existingProduct = await prisma.product.findUnique({
      where: { id: id },
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 상품 수정
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        price: price ? parseInt(price) : existingProduct.price,
        originalPrice: originalPrice ? parseInt(originalPrice) : existingProduct.originalPrice,
        categoryId: categoryId || existingProduct.categoryId,
        images: images ? JSON.stringify(images) : existingProduct.images,
        sizes: sizes ? JSON.stringify(sizes) : existingProduct.sizes,
        colors: colors ? JSON.stringify(colors) : existingProduct.colors,
        details: details ? JSON.stringify(details) : existingProduct.details,
        isNew: isNew !== undefined ? isNew : existingProduct.isNew,
        isSale: isSale !== undefined ? isSale : existingProduct.isSale,
        inStock: inStock !== undefined ? inStock : existingProduct.inStock,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json({
      message: '상품이 성공적으로 수정되었습니다.',
      product: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        originalPrice: updatedProduct.originalPrice,
        category: updatedProduct.category.name,
        isNew: updatedProduct.isNew,
        isSale: updatedProduct.isSale,
      },
    })
  } catch (error) {
    console.error('상품 수정 오류:', error)
    return NextResponse.json(
      { error: '상품 수정에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - 상품 삭제
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    // 상품 존재 확인
    const existingProduct = await prisma.product.findUnique({
      where: { id: id },
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 상품 삭제
    await prisma.product.delete({
      where: { id: id },
    })

    return NextResponse.json({
      message: '상품이 성공적으로 삭제되었습니다.',
    })
  } catch (error) {
    console.error('상품 삭제 오류:', error)
    return NextResponse.json(
      { error: '상품 삭제에 실패했습니다.' },
      { status: 500 }
    )
  }
} 