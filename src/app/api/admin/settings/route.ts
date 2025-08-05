import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdmin } from '@/lib/auth'

// 기본 설정값
const DEFAULT_SETTINGS = {
  siteName: 'ALMAN',
  siteDescription: '세련된 남성 패션을 만나보세요',
  contactEmail: 'admin@alman.com',
  contactPhone: '02-1234-5678',
  maintenanceMode: false,
  allowRegistration: true,
  requireEmailVerification: false,
  maxProductsPerPage: 20,
  maxOrdersPerPage: 20
}

export async function GET(request: NextRequest) {
  try {
    // 관리자 권한 확인
    const adminCheck = await verifyAdmin(request)
    if (!adminCheck.success) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      )
    }

    // 설정 조회 (현재는 기본값 반환, 나중에 데이터베이스에 저장 가능)
    return NextResponse.json({
      success: true,
      settings: DEFAULT_SETTINGS
    })
  } catch (error) {
    console.error('관리자 설정 조회 오류:', error)
    return NextResponse.json(
      { error: '설정 조회에 실패했습니다.' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // 관리자 권한 확인
    const adminCheck = await verifyAdmin(request)
    if (!adminCheck.success) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    // 설정 유효성 검증
    const {
      siteName,
      siteDescription,
      contactEmail,
      contactPhone,
      maintenanceMode,
      allowRegistration,
      requireEmailVerification,
      maxProductsPerPage,
      maxOrdersPerPage
    } = body

    // 필수 필드 검증
    if (!siteName || !contactEmail) {
      return NextResponse.json(
        { error: '필수 설정값이 누락되었습니다.' },
        { status: 400 }
      )
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { error: '유효하지 않은 이메일 형식입니다.' },
        { status: 400 }
      )
    }

    // 페이지당 항목 수 검증
    if (maxProductsPerPage < 1 || maxProductsPerPage > 100) {
      return NextResponse.json(
        { error: '상품 페이지당 항목 수는 1-100 사이여야 합니다.' },
        { status: 400 }
      )
    }

    if (maxOrdersPerPage < 1 || maxOrdersPerPage > 200) {
      return NextResponse.json(
        { error: '주문 페이지당 항목 수는 1-200 사이여야 합니다.' },
        { status: 400 }
      )
    }

    // 설정 저장 (현재는 성공 응답만, 나중에 데이터베이스에 저장 가능)
    const updatedSettings = {
      siteName,
      siteDescription,
      contactEmail,
      contactPhone,
      maintenanceMode: Boolean(maintenanceMode),
      allowRegistration: Boolean(allowRegistration),
      requireEmailVerification: Boolean(requireEmailVerification),
      maxProductsPerPage: parseInt(maxProductsPerPage),
      maxOrdersPerPage: parseInt(maxOrdersPerPage)
    }

    // TODO: 실제 데이터베이스에 설정 저장
    // await prisma.settings.upsert({
    //   where: { id: 1 },
    //   update: updatedSettings,
    //   create: updatedSettings
    // })

    return NextResponse.json({
      success: true,
      message: '설정이 저장되었습니다.',
      settings: updatedSettings
    })
  } catch (error) {
    console.error('관리자 설정 저장 오류:', error)
    return NextResponse.json(
      { error: '설정 저장에 실패했습니다.' },
      { status: 500 }
    )
  }
} 