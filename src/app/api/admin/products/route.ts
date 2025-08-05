import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdmin } from '@/lib/auth'

// GET /api/admin/products - 관리자 상품 목록 조회
export async function GET(request: NextRequest) {
  try {
    console.log('관리자 상품 목록 조회 시작')
    
    // 관리자 권한 확인
    const adminCheck = await verifyAdmin(request)
    console.log('관리자 권한 확인 결과:', adminCheck)
    
    if (!adminCheck) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      )
    }

    // URL 파라미터 파싱
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    // 필터 조건 구성
    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = {
        name: category
      }
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } }
      ]
    }

    // 상품 조회
    console.log('상품 조회 조건:', where)
    
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.product.count({ where })
    ])

    console.log('상품 조회 결과:', { productsCount: products.length, total })

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('관리자 상품 조회 오류:', error)
    return NextResponse.json(
      { error: '상품 조회에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// POST /api/admin/products - 새 상품 추가
export async function POST(request: NextRequest) {
  try {
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

    // 상품 생성
    const product = await prisma.product.create({
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
        inStock: Boolean(inStock),
        rating: 0,
        reviewCount: 0
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
    console.error('상품 추가 오류:', error)
    return NextResponse.json(
      { error: '상품 추가에 실패했습니다.' },
      { status: 500 }
    )
  }
} 