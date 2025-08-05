import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    console.log('회원가입 요청 시작')
    
    const body = await request.json()
    const { name, email, password, phone, zipCode, address, detailAddress } = body
    
    console.log('받은 데이터:', { name, email, password: password ? '[HIDDEN]' : 'undefined', phone, zipCode, address, detailAddress })

    // 필수 필드 검증
    if (!name || !email || !password) {
      console.log('필수 필드 누락:', { name: !!name, email: !!email, password: !!password })
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('이메일 형식 오류:', email)
      return NextResponse.json(
        { error: '올바른 이메일 형식을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
      console.log('비밀번호 길이 오류:', password.length)
      return NextResponse.json(
        { error: '비밀번호는 최소 6자 이상이어야 합니다.' },
        { status: 400 }
      )
    }

    console.log('데이터베이스 연결 테스트...')
    
    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log('이메일 중복:', email)
      return NextResponse.json(
        { error: '이미 가입된 이메일입니다.' },
        { status: 400 }
      )
    }

    console.log('비밀번호 해시화 시작...')
    
    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 12)
    
    console.log('비밀번호 해시화 완료')

    console.log('사용자 생성 시작...')
    
    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        zipCode,
        address,
        detailAddress,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    console.log('사용자 생성 완료:', user.id)

    // 회원가입 시 입력한 주소가 있는 경우 기본 배송지로 생성
    if (address && zipCode) {
      console.log('기본 배송지 생성 시작...')
      
      try {
        await prisma.address.create({
          data: {
            userId: user.id,
            name: '기본 배송지',
            recipient: name, // 회원가입 시 입력한 이름을 수령인으로 사용
            phone: phone || '',
            address: address,
            detailAddress: detailAddress || '',
            zipCode: zipCode,
            type: 'home',
            isDefault: true
          }
        })
        
        console.log('기본 배송지 생성 완료')
      } catch (addressError) {
        console.error('기본 배송지 생성 실패:', addressError)
        // 배송지 생성 실패해도 회원가입은 성공으로 처리
      }
    }

    return NextResponse.json({
      message: '회원가입이 완료되었습니다.',
      user,
    })
  } catch (error) {
    console.error('회원가입 오류 상세:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
    })
    
    // Prisma 관련 에러인지 확인
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('Prisma 에러 코드:', (error as any).code)
    }
    
    return NextResponse.json(
      { error: '회원가입에 실패했습니다.' },
      { status: 500 }
    )
  }
} 