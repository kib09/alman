import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createTestData() {
  try {
    // 사용자 조회 (첫 번째 사용자)
    const user = await prisma.user.findFirst()
    if (!user) {
      console.log('사용자가 없습니다. 먼저 사용자를 생성해주세요.')
      return
    }

    // 카테고리 조회 또는 생성
    let category = await prisma.category.findFirst()
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: '테스트 카테고리',
          description: '테스트용 카테고리'
        }
      })
    }

    // 상품 생성
    const product = await prisma.product.create({
      data: {
        name: '테스트 상품',
        description: '테스트용 상품입니다.',
        price: 50000,
        categoryId: category.id,
        images: JSON.stringify(['https://via.placeholder.com/300x300']),
        sizes: JSON.stringify(['S', 'M', 'L']),
        colors: JSON.stringify(['검정', '흰색']),
        details: JSON.stringify(['면 100%', '한국 제조'])
      }
    })

    // 주문 생성
    const order1 = await prisma.order.create({
      data: {
        userId: user.id,
        orderNumber: 'ORD-001',
        status: '배송완료',
        total: 50000,
        shippingAddress: '서울시 강남구',
        shippingPhone: '010-1234-5678',
        shippingName: '홍길동'
      }
    })

    const order2 = await prisma.order.create({
      data: {
        userId: user.id,
        orderNumber: 'ORD-002',
        status: '배송중',
        total: 75000,
        shippingAddress: '서울시 서초구',
        shippingPhone: '010-1234-5678',
        shippingName: '홍길동'
      }
    })

    // 주문 아이템 생성
    await prisma.orderItem.create({
      data: {
        orderId: order1.id,
        productId: product.id,
        quantity: 1,
        price: 50000,
        size: 'M',
        color: '검정'
      }
    })

    await prisma.orderItem.create({
      data: {
        orderId: order2.id,
        productId: product.id,
        quantity: 1,
        price: 50000,
        size: 'L',
        color: '흰색'
      }
    })

    // 리뷰 생성
    await prisma.review.create({
      data: {
        userId: user.id,
        productId: product.id,
        rating: 5,
        comment: '좋은 상품입니다!'
      }
    })

    // 위시리스트 아이템 생성
    await prisma.wishlistItem.create({
      data: {
        userId: user.id,
        productId: product.id
      }
    })

    console.log('✅ 테스트 데이터 생성 완료')
    console.log(`📋 생성된 데이터:`)
    console.log(`   - 사용자: ${user.name}`)
    console.log(`   - 주문: ${order1.orderNumber}, ${order2.orderNumber}`)
    console.log(`   - 상품: ${product.name}`)

  } catch (error) {
    console.error('테스트 데이터 생성 오류:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestData() 