import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('데이터베이스 연결 테스트 시작...')
    
    // 1. 기본 연결 테스트
    await prisma.$connect()
    console.log('Prisma 연결 성공')
    
    // 2. User 모델 스키마 확인
    const userCount = await prisma.user.count()
    console.log('현재 사용자 수:', userCount)
    
    // 3. User 모델 구조 확인 (샘플 데이터로)
    const testUserData = {
      name: '테스트',
      email: 'test@test.com',
      password: 'test123',
    }
    
    console.log('User 모델 테스트 데이터:', testUserData)
    
    // 4. 실제 생성 테스트 (테스트용)
    const testUser = await prisma.user.create({
      data: {
        name: testUserData.name,
        email: testUserData.email,
        password: testUserData.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })
    
    console.log('테스트 사용자 생성 성공:', testUser)
    
    // 5. 테스트 사용자 삭제
    await prisma.user.delete({
      where: { id: testUser.id },
    })
    
    console.log('테스트 사용자 삭제 완료')

    return NextResponse.json({
      success: true,
      message: '데이터베이스 연결 및 User 모델 테스트 성공!',
      userCount,
      testResult: 'User 모델 생성/삭제 테스트 완료',
    })
  } catch (error) {
    console.error('데이터베이스 테스트 오류:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
    })
    
    // Prisma 관련 에러인지 확인
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('Prisma 에러 코드:', (error as any).code)
    }
    
    return NextResponse.json(
      {
        success: false,
        error: '데이터베이스 테스트 실패',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 