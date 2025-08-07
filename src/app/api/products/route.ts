import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products - 상품 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const isSale = searchParams.get('isSale')
    const sortBy = searchParams.get('sortBy') || 'newest'

    // 필터 조건 설정
    const where: any = {}
    
    if (category && category !== '전체') {
      // 카테고리 이름으로 필터링
      where.category = {
        name: category,
      }
    }
    
    if (isSale === 'true') {
      where.isSale = true
    }

    // 정렬 조건 설정
    let orderBy: any = {}
    switch (sortBy) {
      case 'price-low':
        orderBy = { price: 'asc' }
        break
      case 'price-high':
        orderBy = { price: 'desc' }
        break
      case 'popular':
        orderBy = { reviewCount: 'desc' }
        break
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' }
        break
    }

    // 상품 조회
    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy,
    })

    // 총 상품 수 조회
    const total = await prisma.product.count({ where })

    // 응답 데이터 변환
    const transformedProducts = products.map((product: any) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: JSON.parse(product.images)[0], // 첫 번째 이미지
        category: product.category.name,
        isNew: product.isNew,
        isSale: product.isSale,
        rating: product.rating,
        reviewCount: product.reviewCount,
      }
    })

    const response = {
      products: transformedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }



    return NextResponse.json(response)
  } catch (error) {
    console.error('❌ 상품 목록 조회 오류:', error)
    console.error('❌ 오류 상세 정보:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    })
    
    return NextResponse.json(
      { error: '상품 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// POST /api/products - 새 상품 생성
export async function POST(request: NextRequest) {
  try {
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
    } = body

    // 필수 필드 검증
    if (!name || !description || !price || !categoryId) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // 상품 생성
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        originalPrice: originalPrice ? parseInt(originalPrice) : null,
        categoryId,
        images: JSON.stringify(images),
        sizes: JSON.stringify(sizes),
        colors: JSON.stringify(colors),
        details: JSON.stringify(details),
        isNew: isNew || false,
        isSale: isSale || false,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json({
      message: '상품이 성공적으로 생성되었습니다.',
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category.name,
        isNew: product.isNew,
        isSale: product.isSale,
      },
    })
  } catch (error) {
    console.error('상품 생성 오류:', error)
    return NextResponse.json(
      { error: '상품 생성에 실패했습니다.' },
      { status: 500 }
    )
  }
} 