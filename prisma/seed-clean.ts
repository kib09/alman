import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { 
  cleanSuitProducts, 
  cleanCasualProducts, 
  cleanShoeProducts, 
  cleanAccessoryProducts, 
  cleanSportswearProducts,
  cleanUsers,
  cleanReviewData,
  cleanOrderData
} from './seed-data-updated'

const prisma = new PrismaClient()

async function main() {
  console.log('데이터베이스 초기화 시작...')

  // 기존 데이터 삭제
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.review.deleteMany()
  await prisma.wishlistItem.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  console.log('기존 데이터 삭제 완료')

  // 사용자 생성
  console.log('사용자 생성 중...')
  const users = []
  for (const userData of cleanUsers) {
    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        password: hashedPassword,
        isAdmin: userData.isAdmin
      }
    })
    users.push(user)
  }
  console.log(`${users.length}명의 사용자 생성 완료`)

  // 카테고리 생성
  console.log('카테고리 생성 중...')
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: '정장' },
      update: {},
      create: {
        name: '정장',
        description: '비즈니스와 공식적인 자리에 어울리는 정장',
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=500&fit=crop'
      }
    }),
    prisma.category.upsert({
      where: { name: '캐주얼' },
      update: {},
      create: {
        name: '캐주얼',
        description: '일상생활에 편안하게 입을 수 있는 캐주얼 의류',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop'
      }
    }),
    prisma.category.upsert({
      where: { name: '신발' },
      update: {},
      create: {
        name: '신발',
        description: '정장부터 캐주얼까지 다양한 스타일의 신발',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop'
      }
    }),
    prisma.category.upsert({
      where: { name: '액세서리' },
      update: {},
      create: {
        name: '액세서리',
        description: '스타일을 완성하는 다양한 액세서리',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=500&fit=crop'
      }
    }),
    prisma.category.upsert({
      where: { name: '스포츠웨어' },
      update: {},
      create: {
        name: '스포츠웨어',
        description: '운동과 활동적인 라이프스타일에 어울리는 의류',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop'
      }
    })
  ])
  console.log('카테고리 생성 완료')

  // 상품 생성
  console.log('상품 생성 중...')
  const allProducts = [
    ...cleanSuitProducts.map(p => ({ ...p, categoryName: '정장' })),
    ...cleanCasualProducts.map(p => ({ ...p, categoryName: '캐주얼' })),
    ...cleanShoeProducts.map(p => ({ ...p, categoryName: '신발' })),
    ...cleanAccessoryProducts.map(p => ({ ...p, categoryName: '액세서리' })),
    ...cleanSportswearProducts.map(p => ({ ...p, categoryName: '스포츠웨어' }))
  ]

  const products = []
  for (const productData of allProducts) {
    const category = categories.find(c => c.name === productData.categoryName)
    if (!category) {
      throw new Error(`카테고리를 찾을 수 없습니다: ${productData.categoryName}`)
    }

    const product = await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        originalPrice: productData.originalPrice,
        images: JSON.stringify(productData.images),
        sizes: JSON.stringify(productData.sizes),
        colors: JSON.stringify(productData.colors),
        categoryId: category.id,
        isNew: productData.isNew,
        isSale: productData.isSale,
        rating: productData.rating,
        reviewCount: productData.reviewCount,
        inStock: true,
        details: JSON.stringify([
          '최고 품질의 소재 사용',
          '정교한 디자인과 완벽한 핏',
          '지속 가능한 패션',
          '편안한 착용감',
          '세련된 스타일'
        ])
      }
    })
    products.push(product)
  }
  console.log(`${products.length}개의 상품 생성 완료`)

  // 리뷰 생성
  console.log('리뷰 생성 중...')
  const reviews = []
  for (const product of products) {
    // 각 상품당 2-4개의 리뷰 생성 (사용자당 하나씩)
    const reviewCount = Math.min(Math.floor(Math.random() * 3) + 2, users.length)
    const selectedUsers = users.slice(0, reviewCount)
    
    for (const user of selectedUsers) {
      const reviewData = cleanReviewData[Math.floor(Math.random() * cleanReviewData.length)]
      
      try {
        const review = await prisma.review.create({
          data: {
            rating: reviewData.rating,
            comment: reviewData.comment,
            productId: product.id,
            userId: user.id
          }
        })
        reviews.push(review)
      } catch (error) {
        // 이미 리뷰가 있는 경우 무시
        console.log(`리뷰 생성 실패 (이미 존재): ${product.name} - ${user.name}`)
      }
    }
  }
  console.log(`${reviews.length}개의 리뷰 생성 완료`)

  // 주문 생성
  console.log('주문 생성 중...')
  const orders = []
  for (const orderData of cleanOrderData) {
    const user = users[Math.floor(Math.random() * users.length)]
    const order = await prisma.order.create({
      data: {
        orderNumber: orderData.orderNumber,
        status: orderData.status,
        total: orderData.total,
        shippingAddress: orderData.shippingAddress,
        shippingPhone: orderData.shippingPhone,
        shippingName: orderData.shippingName,
        userId: user.id
      }
    })
    orders.push(order)
  }
  console.log(`${orders.length}개의 주문 생성 완료`)

  // 주문 아이템 생성
  console.log('주문 아이템 생성 중...')
  const orderItems = []
  for (const order of orders) {
    // 각 주문당 1-3개의 상품 추가
    const itemCount = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < itemCount; i++) {
      const product = products[Math.floor(Math.random() * products.length)]
      const quantity = Math.floor(Math.random() * 2) + 1
      
      const orderItem = await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          quantity: quantity,
          price: product.price
        }
      })
      orderItems.push(orderItem)
    }
  }
  console.log(`${orderItems.length}개의 주문 아이템 생성 완료`)

  // 위시리스트 아이템 생성
  console.log('위시리스트 아이템 생성 중...')
  const wishlistItems = []
  for (const user of users) {
    // 각 사용자당 2-5개의 위시리스트 아이템 생성 (중복 방지)
    const itemCount = Math.min(Math.floor(Math.random() * 4) + 2, products.length)
    const selectedProducts = products.slice(0, itemCount) // 중복 방지를 위해 고유한 상품 선택
    
    for (const product of selectedProducts) {
      try {
        const wishlistItem = await prisma.wishlistItem.create({
          data: {
            userId: user.id,
            productId: product.id
          }
        })
        wishlistItems.push(wishlistItem)
      } catch (error) {
        // 이미 존재하는 경우 무시
        console.log(`위시리스트 아이템 생성 실패 (이미 존재): ${user.name} - ${product.name}`)
      }
    }
  }
  console.log(`${wishlistItems.length}개의 위시리스트 아이템 생성 완료`)

  // 장바구니 아이템 생성
  console.log('장바구니 아이템 생성 중...')
  const cartItems = []
  for (const user of users) {
    // 각 사용자당 1-3개의 장바구니 아이템 생성
    const itemCount = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < itemCount; i++) {
      const product = products[Math.floor(Math.random() * products.length)]
      const quantity = Math.floor(Math.random() * 2) + 1
      
      const cartItem = await prisma.cartItem.create({
        data: {
          userId: user.id,
          productId: product.id,
          quantity: quantity
        }
      })
      cartItems.push(cartItem)
    }
  }
  console.log(`${cartItems.length}개의 장바구니 아이템 생성 완료`)

  console.log('데이터베이스 초기화 완료!')
  console.log(`총 ${users.length}명의 사용자`)
  console.log(`총 ${products.length}개의 상품`)
  console.log(`총 ${reviews.length}개의 리뷰`)
  console.log(`총 ${orders.length}개의 주문`)
  console.log(`총 ${orderItems.length}개의 주문 아이템`)
  console.log(`총 ${wishlistItems.length}개의 위시리스트 아이템`)
  console.log(`총 ${cartItems.length}개의 장바구니 아이템`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 