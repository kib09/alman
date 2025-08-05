import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function migrateUserAddresses() {
  try {
    console.log('사용자 주소 마이그레이션을 시작합니다...')
    
    // 주소 정보가 있지만 배송지가 없는 사용자들을 찾기
    const usersWithAddress = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { address: { not: null } },
              { zipCode: { not: null } }
            ]
          },
          {
            addresses: {
              none: {}
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        phone: true,
        address: true,
        detailAddress: true,
        zipCode: true,
        addresses: true
      }
    })
    
    console.log(`주소 정보가 있지만 배송지가 없는 사용자: ${usersWithAddress.length}명`)
    
    for (const user of usersWithAddress) {
      console.log(`사용자 "${user.name}" 처리 중...`)
      
      // 주소 정보가 있는 경우에만 배송지 생성
      if (user.address && user.zipCode) {
        try {
          await prisma.address.create({
            data: {
              userId: user.id,
              name: '기본 배송지',
              recipient: user.name,
              phone: user.phone || '',
              address: user.address,
              detailAddress: user.detailAddress || '',
              zipCode: user.zipCode,
              type: 'home',
              isDefault: true
            }
          })
          
          console.log(`  - 사용자 "${user.name}"의 기본 배송지 생성 완료`)
        } catch (error) {
          console.error(`  - 사용자 "${user.name}"의 배송지 생성 실패:`, error)
        }
      } else {
        console.log(`  - 사용자 "${user.name}"의 주소 정보 불완전 (주소: ${user.address}, 우편번호: ${user.zipCode})`)
      }
    }
    
    console.log('사용자 주소 마이그레이션이 완료되었습니다.')
  } catch (error) {
    console.error('사용자 주소 마이그레이션 중 오류 발생:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// 스크립트 실행
migrateUserAddresses() 