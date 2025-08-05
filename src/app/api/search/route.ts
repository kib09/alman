import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/search - 상품 검색
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    const minPrice = searchParams.get('minPrice') || ''
    const maxPrice = searchParams.get('maxPrice') || ''
    const sortBy = searchParams.get('sortBy') || 'relevance'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    // 검색 조건 구성
    const where: any = {
      AND: []
    }

    // 검색어가 있는 경우
    if (query.trim()) {
      where.AND.push({
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { category: { name: { contains: query } } }
        ]
      })
    }

    // 카테고리 필터
    if (category) {
      where.AND.push({
        category: { name: category }
      })
    }

    // 가격 필터
    if (minPrice) {
      where.AND.push({
        price: { gte: parseInt(minPrice) }
      })
    }
    if (maxPrice) {
      where.AND.push({
        price: { lte: parseInt(maxPrice) }
      })
    }

    // 정렬 조건
    let orderBy: any = {}
    switch (sortBy) {
      case 'price_asc':
        orderBy.price = 'asc'
        break
      case 'price_desc':
        orderBy.price = 'desc'
        break
      case 'newest':
        orderBy.createdAt = 'desc'
        break
      case 'rating':
        orderBy.rating = 'desc'
        break
      case 'relevance':
      default:
        // 검색어가 있는 경우 관련성 순으로 정렬
        if (query.trim()) {
          orderBy = [
            { rating: 'desc' },
            { createdAt: 'desc' }
          ]
        } else {
          orderBy.createdAt = 'desc'
        }
        break
    }

    // 상품 조회
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: where.AND.length > 0 ? where : undefined,
        include: {
          category: true,
          reviews: {
            select: {
              rating: true
            }
          }
        },
        orderBy,
        skip,
        take: limit
      }),
      prisma.product.count({
        where: where.AND.length > 0 ? where : undefined
      })
    ])

    // 응답 데이터 변환
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      images: JSON.parse(product.images),
      category: product.category.name,
      sizes: JSON.parse(product.sizes),
      colors: JSON.parse(product.colors),
      details: JSON.parse(product.details),
      isNew: product.isNew,
      isSale: product.isSale,
      inStock: product.inStock,
      rating: product.rating,
      reviewCount: product.reviewCount,
      createdAt: product.createdAt
    }))

    // 검색 결과 통계
    const stats = {
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: page < Math.ceil(totalCount / limit),
      hasPrevPage: page > 1
    }

    return NextResponse.json({
      products: transformedProducts,
      stats,
      query,
      filters: {
        category,
        minPrice,
        maxPrice,
        sortBy
      }
    })

  } catch (error) {
    console.error('검색 오류:', error)
    return NextResponse.json(
      { error: '검색 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 