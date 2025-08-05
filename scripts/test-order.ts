import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testOrder() {
  try {
    console.log('주문 생성 테스트 시작...')
    
    // 사용자 조회
    const user = await prisma.user.findFirst()
    if (!user) {
      console.log('사용자가 없습니다.')
      return
    }
    
    console.log('사용자 ID:', user.id)
    
    // 상품 조회
    const product = await prisma.product.findFirst()
    if (!product) {
      console.log('상품이 없습니다.')
      return
    }
    
    console.log('상품 ID:', product.id)
    
    // 주문 생성 테스트
    const orderNumber = `TEST${Date.now()}`
    
    const testOrder = await prisma.order.create({
      data: {
        userId: user.id,
        orderNumber,
        status: '주문확인',
        total: 10000,
        shippingAddress: JSON.stringify({
          name: '테스트',
          phone: '010-0000-0000',
          address: '테스트 주소',
          detailAddress: '테스트 상세주소',
          zipCode: '00000'
        }),
        shippingPhone: '010-0000-0000',
        shippingName: '테스트',
        orderItems: {
          create: [{
            productId: product.id,
            quantity: 1,
            price: 10000,
            size: null,
            color: null
          }]
        }
      }
    })
    
    console.log('테스트 주문 생성 성공:', testOrder.id)
    console.log('주문 번호:', testOrder.orderNumber)
    
  } catch (error) {
    console.error('테스트 주문 생성 오류:', error)
    console.error('오류 상세:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      name: error instanceof Error ? error.name : 'Unknown'
    })
  } finally {
    await prisma.$disconnect()
  }
}

testOrder() 