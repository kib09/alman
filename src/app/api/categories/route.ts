import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/categories - 카테고리 목록 조회
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    const transformedCategories = categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      image: category.image,
      productCount: category._count.products,
    }))

    return NextResponse.json(transformedCategories)
  } catch (error) {
    console.error('카테고리 목록 조회 오류:', error)
    return NextResponse.json(
      { error: '카테고리 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

// POST /api/categories - 새 카테고리 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, image } = body

    if (!name) {
      return NextResponse.json(
        { error: '카테고리명은 필수입니다.' },
        { status: 400 }
      )
    }

    // 중복 카테고리명 확인
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    })

    if (existingCategory) {
      return NextResponse.json(
        { error: '이미 존재하는 카테고리명입니다.' },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
        image,
      },
    })

    return NextResponse.json({
      message: '카테고리가 성공적으로 생성되었습니다.',
      category: {
        id: category.id,
        name: category.name,
        description: category.description,
        image: category.image,
      },
    })
  } catch (error) {
    console.error('카테고리 생성 오류:', error)
    return NextResponse.json(
      { error: '카테고리 생성에 실패했습니다.' },
      { status: 500 }
    )
  }
} 