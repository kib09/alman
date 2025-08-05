import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { 
  suitProducts, 
  casualProducts, 
  shoeProducts, 
  accessoryProducts, 
  sportswearProducts,
  additionalSuitProducts,
  additionalCasualProducts,
  additionalShoeProducts,
  additionalAccessoryProducts,
  additionalSportswearProducts,
  additionalUsers,
  reviewData,
  orderData,
  additionalOrderData,
  moreUsers,
  moreSuitProducts,
  moreCasualProducts,
  moreShoeProducts,
  moreAccessoryProducts,
  moreSportswearProducts,
  moreReviewData,
  winterProducts,
  summerProducts,
  specialOccasionProducts,
  evenMoreUsers,
  evenMoreOrderData,
  evenMoreReviewData,
  premiumSuitProducts,
  premiumCasualProducts,
  premiumShoeProducts,
  premiumAccessoryProducts,
  premiumSportswearProducts,
  finalUsers,
  finalOrderData,
  finalReviewData
} from './seed-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 데이터베이스 시드 시작...')

  // 카테고리 생성
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: '정장' },
      update: {},
      create: {
        name: '정장',
        description: '비즈니스와 특별한 자리에 어울리는 정장',
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=500&fit=crop',
      },
    }),
    prisma.category.upsert({
      where: { name: '캐주얼' },
      update: {},
      create: {
        name: '캐주얼',
        description: '일상에서 편안하게 입을 수 있는 캐주얼 의류',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      },
    }),
    prisma.category.upsert({
      where: { name: '신발' },
      update: {},
      create: {
        name: '신발',
        description: '다양한 스타일의 신발',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
      },
    }),
    prisma.category.upsert({
      where: { name: '액세서리' },
      update: {},
      create: {
        name: '액세서리',
        description: '스타일을 완성하는 액세서리',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=500&fit=crop',
      },
    }),
    prisma.category.upsert({
      where: { name: '스포츠웨어' },
      update: {},
      create: {
        name: '스포츠웨어',
        description: '운동과 활동에 최적화된 스포츠웨어',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      },
    }),
    prisma.category.upsert({
      where: { name: '겨울 의류' },
      update: {},
      create: {
        name: '겨울 의류',
        description: '따뜻한 겨울 의류',
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=500&fit=crop',
      },
    }),
    prisma.category.upsert({
      where: { name: '여름 의류' },
      update: {},
      create: {
        name: '여름 의류',
        description: '시원한 여름 의류',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      },
    }),
    prisma.category.upsert({
      where: { name: '특별한 날' },
      update: {},
      create: {
        name: '특별한 날',
        description: '특별한 날을 위한 의류',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop',
      },
    })
  ])

  console.log('✅ 카테고리 생성 완료')

  // 사용자 생성
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: '관리자',
        phone: '010-0000-0000',
        password: await bcrypt.hash('admin123', 10),
        isAdmin: true,
      },
    }),
    ...additionalUsers.map(async (user) => {
      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          name: user.name,
          phone: user.phone,
          password: await bcrypt.hash(user.password, 10),
          isAdmin: user.isAdmin,
        },
      })
    }),
    ...moreUsers.map(async (user) => {
      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          name: user.name,
          phone: user.phone,
          password: await bcrypt.hash(user.password, 10),
          isAdmin: user.isAdmin,
        },
      })
    }),
    ...evenMoreUsers.map(async (user) => {
      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          name: user.name,
          phone: user.phone,
          password: await bcrypt.hash(user.password, 10),
          isAdmin: user.isAdmin,
        },
      })
    }),
    ...finalUsers.map(async (user) => {
      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          name: user.name,
          phone: user.phone,
          password: await bcrypt.hash(user.password, 10),
          isAdmin: user.isAdmin,
        },
      })
    })
  ])

  console.log('✅ 사용자 생성 완료')

  // 상품 생성
  const allProducts = [
    ...suitProducts,
    ...casualProducts,
    ...shoeProducts,
    ...accessoryProducts,
    ...sportswearProducts,
    ...additionalSuitProducts,
    ...additionalCasualProducts,
    ...additionalShoeProducts,
    ...additionalAccessoryProducts,
    ...additionalSportswearProducts,
    ...moreSuitProducts,
    ...moreCasualProducts,
    ...moreShoeProducts,
    ...moreAccessoryProducts,
    ...moreSportswearProducts,
    ...winterProducts,
    ...summerProducts,
    ...specialOccasionProducts,
    ...premiumSuitProducts,
    ...premiumCasualProducts,
    ...premiumShoeProducts,
    ...premiumAccessoryProducts,
    ...premiumSportswearProducts
  ]

  const products = await Promise.all(
    allProducts.map(async (product, index) => {
      const categoryName = getCategoryName(product.name)
      const category = categories.find(c => c.name === categoryName)
      
      if (!category) {
        console.warn(`카테고리를 찾을 수 없습니다: ${categoryName}`)
        return null
      }

      return prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          categoryId: category.id,
          images: JSON.stringify(product.images),
          sizes: JSON.stringify(product.sizes),
          colors: JSON.stringify(product.colors),
          details: JSON.stringify({
            material: '고급 소재',
            care: '드라이클리닝 권장',
            origin: '한국'
          }),
          isNew: product.isNew,
          isSale: product.isSale,
          rating: product.rating,
          reviewCount: product.reviewCount,
        },
      })
    })
  )

  console.log('✅ 상품 생성 완료')

  // 주문 생성
  const allOrderData = [...orderData, ...additionalOrderData, ...evenMoreOrderData, ...finalOrderData]
  const orders = await Promise.all(
    allOrderData.map(async (orderData, index) => {
      const user = users[Math.floor(Math.random() * users.length)]
      
      return prisma.order.upsert({
        where: { orderNumber: orderData.orderNumber },
        update: {},
        create: {
          userId: user.id,
          orderNumber: orderData.orderNumber,
          status: orderData.status,
          total: orderData.total,
          shippingAddress: orderData.shippingAddress,
          shippingPhone: orderData.shippingPhone,
          shippingName: orderData.shippingName,
        },
      })
    })
  )

  console.log('✅ 주문 생성 완료')

  // 주문 아이템 생성
  const orderItems = await Promise.all(
    orders.map(async (order) => {
      const numItems = Math.floor(Math.random() * 3) + 1
      const orderItemPromises = []
      
      for (let i = 0; i < numItems; i++) {
        const product = products[Math.floor(Math.random() * products.length)]
        if (product) {
          orderItemPromises.push(
            prisma.orderItem.create({
              data: {
                orderId: order.id,
                productId: product.id,
                quantity: Math.floor(Math.random() * 2) + 1,
                price: product.price,
                size: product.sizes ? JSON.parse(product.sizes)[0] : null,
                color: product.colors ? JSON.parse(product.colors)[0] : null,
              },
            })
          )
        }
      }
      
      return Promise.all(orderItemPromises)
    })
  )

  console.log('✅ 주문 아이템 생성 완료')

  // 리뷰 생성
  const allReviewData = [...reviewData, ...moreReviewData, ...evenMoreReviewData, ...finalReviewData]
  console.log('📝 리뷰 생성 시작...')
  
  for (const product of products) {
    if (!product) continue
    
    const numReviews = Math.floor(Math.random() * 3) + 1
    
    for (let i = 0; i < numReviews; i++) {
      const user = users[Math.floor(Math.random() * users.length)]
      const reviewData = allReviewData[Math.floor(Math.random() * allReviewData.length)]
      
      try {
        await prisma.review.create({
          data: {
            userId: user.id,
            productId: product.id,
            rating: reviewData.rating,
            comment: reviewData.comment,
          },
        })
      } catch (error) {
        // 이미 리뷰가 있는 경우 무시
        console.log(`리뷰 생성 실패 (이미 존재): ${product.name}`)
      }
    }
  }

  console.log('✅ 리뷰 생성 완료')

  // 장바구니 아이템 생성
  const cartItems = await Promise.all(
    users.slice(0, 10).map(async (user) => {
      const numItems = Math.floor(Math.random() * 3) + 1
      const cartItemPromises = []
      
      for (let i = 0; i < numItems; i++) {
        const product = products[Math.floor(Math.random() * products.length)]
        if (product) {
          cartItemPromises.push(
            prisma.cartItem.upsert({
              where: {
                userId_productId_size_color: {
                  userId: user.id,
                  productId: product.id,
                  size: product.sizes ? JSON.parse(product.sizes)[0] : null,
                  color: product.colors ? JSON.parse(product.colors)[0] : null,
                },
              },
              update: {},
              create: {
                userId: user.id,
                productId: product.id,
                quantity: Math.floor(Math.random() * 2) + 1,
                size: product.sizes ? JSON.parse(product.sizes)[0] : null,
                color: product.colors ? JSON.parse(product.colors)[0] : null,
              },
            })
          )
        }
      }
      
      return Promise.all(cartItemPromises)
    })
  )

  console.log('✅ 장바구니 아이템 생성 완료')

  // 위시리스트 아이템 생성
  const wishlistItems = await Promise.all(
    users.slice(0, 15).map(async (user) => {
      const numItems = Math.floor(Math.random() * 5) + 1
      const wishlistItemPromises = []
      
      for (let i = 0; i < numItems; i++) {
        const product = products[Math.floor(Math.random() * products.length)]
        if (product) {
          wishlistItemPromises.push(
            prisma.wishlistItem.upsert({
              where: {
                userId_productId: {
                  userId: user.id,
                  productId: product.id,
                },
              },
              update: {},
              create: {
                userId: user.id,
                productId: product.id,
              },
            })
          )
        }
      }
      
      return Promise.all(wishlistItemPromises)
    })
  )

  console.log('✅ 위시리스트 아이템 생성 완료')

  console.log('🎉 모든 데이터베이스 시드 완료!')
}

function getCategoryName(productName: string): string {
  if (productName.includes('정장') || productName.includes('웨딩')) {
    return '정장'
  } else if (productName.includes('캐주얼') || productName.includes('데님') || productName.includes('스웨터') || productName.includes('오버코트')) {
    return '캐주얼'
  } else if (productName.includes('신발') || productName.includes('부츠') || productName.includes('스니커즈') || productName.includes('로퍼') || productName.includes('샌들')) {
    return '신발'
  } else if (productName.includes('벨트') || productName.includes('넥타이') || productName.includes('지갑') || productName.includes('스카프') || productName.includes('백팩') || productName.includes('시계') || productName.includes('커프스') || productName.includes('포켓') || productName.includes('선글라스') || productName.includes('모자')) {
    return '액세서리'
  } else if (productName.includes('스포츠') || productName.includes('트레이닝') || productName.includes('러닝')) {
    return '스포츠웨어'
  } else if (productName.includes('울') || productName.includes('패딩') || productName.includes('장갑')) {
    return '겨울 의류'
  } else if (productName.includes('린넨') || productName.includes('코튼') || productName.includes('캡')) {
    return '여름 의류'
  } else if (productName.includes('파티') || productName.includes('실크')) {
    return '특별한 날'
  }
  return '캐주얼' // 기본값
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 