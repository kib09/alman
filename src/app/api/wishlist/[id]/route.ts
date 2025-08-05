import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // 위시리스트 아이템이 존재하고 해당 사용자의 것인지 확인
    const wishlistItem = await prisma.wishlistItem.findFirst({
      where: {
        id: id,
        userId: decoded.userId,
      },
    })

    if (!wishlistItem) {
      return NextResponse.json(
        { error: '위시리스트 아이템을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 위시리스트에서 삭제
    await prisma.wishlistItem.delete({
      where: {
        id: id,
      },
    })

    return NextResponse.json({
      success: true,
      message: '위시리스트에서 삭제되었습니다.',
    })
  } catch (error) {
    console.error('위시리스트 삭제 오류:', error)
    return NextResponse.json(
      { error: '위시리스트 삭제에 실패했습니다.' },
      { status: 500 }
    )
  }
} 