import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, phone, zipCode, address, detailAddress } = body

    // 필수 필드 검증
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
      return NextResponse.json(
        { error: '비밀번호는 최소 6자 이상이어야 합니다.' },
        { status: 400 }
      )
    }
    
    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: '이미 가입된 이메일입니다.' },
        { status: 400 }
      )
    }
    
    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 12)
    
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

    // 회원가입 시 입력한 주소가 있는 경우 기본 배송지로 생성
    if (address && zipCode) {
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
      } catch (addressError) {
        // 배송지 생성 실패해도 회원가입은 성공으로 처리
      }
    }

    return NextResponse.json({
      message: '회원가입이 완료되었습니다.',
      user,
    })
  } catch (error) {
    return NextResponse.json(
      { error: '회원가입에 실패했습니다.' },
      { status: 500 }
    )
  }
} 