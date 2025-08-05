import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/search/suggestions - 검색 자동완성
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '5')

    if (!query.trim()) {
      return NextResponse.json({ suggestions: [] })
    }

    // 상품명에서 검색
    const productSuggestions = await prisma.product.findMany({
      where: {
        name: {
          contains: query
        }
      },
      select: {
        name: true,
        category: {
          select: {
            name: true
          }
        }
      },
      take: limit,
      orderBy: {
        rating: 'desc'
      }
    })

    // 카테고리에서 검색
    const categorySuggestions = await prisma.category.findMany({
      where: {
        name: {
          contains: query
        }
      },
      select: {
        name: true
      },
      take: Math.max(1, limit - productSuggestions.length)
    })

    // 중복 제거 및 결과 조합
    const suggestions = [
      ...productSuggestions.map(p => ({
        type: 'product',
        text: p.name,
        category: p.category.name
      })),
      ...categorySuggestions.map(c => ({
        type: 'category',
        text: c.name,
        category: null
      }))
    ].slice(0, limit)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('검색 자동완성 오류:', error)
    return NextResponse.json(
      { error: '검색 자동완성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 