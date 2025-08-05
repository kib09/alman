import { 
  cleanSuitProducts, 
  cleanCasualProducts, 
  cleanShoeProducts, 
  cleanAccessoryProducts, 
  cleanSportswearProducts
} from '../prisma/seed-data-clean'

// 상품별 더미 이미지 매핑 (실제 상품에 맞는 이미지들)
const productImages: { [key: string]: string } = {
  // 정장
  '클래식 네이비 정장': 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop',
  '차콜 그레이 정장': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
  '블랙 포멀 정장': 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop',
  '더블 브레스티드 정장': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop',
  '슬림 핏 그레이 정장': 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop',
  '프리미엄 울 정장': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
  '린넨 정장': 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop',
  '벨벳 정장': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop',

  // 캐주얼
  '베이직 티셔츠': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
  '캐주얼 데님 자켓': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
  '오버사이즈 후드티': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
  '스웨트셔츠': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
  '카고 팬츠': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
  '데님 팬츠': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop',
  '플리스 자켓': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
  '옥스포드 셔츠': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
  '치노 팬츠': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
  '폴로 셔츠': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',

  // 신발
  '클래식 옥스포드': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  '데르비 슈즈': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  '로퍼': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  '스니커즈': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  '부츠': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  '모카신': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  '슬립온': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  '캔버스 스니커즈': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',

  // 액세서리
  '프리미엄 가죽 벨트': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  '실크 넥타이': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  '가죽 지갑': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  '스카프': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  '가죽 백팩': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  '넥타이 핀': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  '가죽 키홀더': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  '넥타이 클립': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',

  // 스포츠웨어
  '프리미엄 트레이닝 팬츠': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
  '스포츠 티셔츠': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
  '스포츠 자켓': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
  '스포츠 쇼츠': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
  '스포츠 후드티': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
  '스포츠 레깅스': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
  '스포츠 집업': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
  '스포츠 탱크탑': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop'
}

// 더 다양한 이미지 URL들 (실제 상품에 맞는 이미지들)
const diverseImages = [
  // 정장 이미지들
  'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop',

  // 캐주얼 이미지들
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',

  // 신발 이미지들
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',

  // 액세서리 이미지들
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop',

  // 스포츠웨어 이미지들
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop'
]

// 상품별 이미지 업데이트
function updateProductImages() {
  console.log('상품 이미지 업데이트 시작...')

  const allProducts = [
    ...cleanSuitProducts,
    ...cleanCasualProducts,
    ...cleanShoeProducts,
    ...cleanAccessoryProducts,
    ...cleanSportswearProducts
  ]

  const updatedProducts = []

  for (const product of allProducts) {
    // 매핑된 이미지가 있으면 사용, 없으면 랜덤 선택
    let newImageUrl = productImages[product.name]
    
    if (!newImageUrl) {
      // 랜덤하게 이미지 선택
      const randomIndex = Math.floor(Math.random() * diverseImages.length)
      newImageUrl = diverseImages[randomIndex]
    }

    product.images = [newImageUrl]
    console.log(`✅ ${product.name}: 이미지 업데이트 완료`)
    updatedProducts.push(product)
  }

  return updatedProducts
}

// 업데이트된 데이터를 파일로 저장
async function saveUpdatedData(products: any[]) {
  const fs = require('fs')
  const path = require('path')

  // 카테고리별로 분류
  const suitProducts = products.filter(p => 
    cleanSuitProducts.some(sp => sp.name === p.name)
  )
  const casualProducts = products.filter(p => 
    cleanCasualProducts.some(cp => cp.name === p.name)
  )
  const shoeProducts = products.filter(p => 
    cleanShoeProducts.some(shp => shp.name === p.name)
  )
  const accessoryProducts = products.filter(p => 
    cleanAccessoryProducts.some(ap => ap.name === p.name)
  )
  const sportswearProducts = products.filter(p => 
    cleanSportswearProducts.some(sp => sp.name === p.name)
  )

  const updatedData = `
// 자동 업데이트된 상품 데이터 (다양한 이미지 적용)
export const cleanSuitProducts = ${JSON.stringify(suitProducts, null, 2)}

export const cleanCasualProducts = ${JSON.stringify(casualProducts, null, 2)}

export const cleanShoeProducts = ${JSON.stringify(shoeProducts, null, 2)}

export const cleanAccessoryProducts = ${JSON.stringify(accessoryProducts, null, 2)}

export const cleanSportswearProducts = ${JSON.stringify(sportswearProducts, null, 2)}

// 기존 사용자, 리뷰, 주문 데이터는 그대로 유지
export const cleanUsers = [
  {
    email: 'admin@example.com',
    name: '관리자',
    phone: '010-0000-0000',
    password: 'admin123',
    isAdmin: true
  },
  {
    email: 'user1@example.com',
    name: '김철수',
    phone: '010-1111-1111',
    password: 'password123',
    isAdmin: false
  },
  {
    email: 'user2@example.com',
    name: '이영희',
    phone: '010-2222-2222',
    password: 'password123',
    isAdmin: false
  },
  {
    email: 'user3@example.com',
    name: '박민수',
    phone: '010-3333-3333',
    password: 'password123',
    isAdmin: false
  },
  {
    email: 'user4@example.com',
    name: '정수진',
    phone: '010-4444-4444',
    password: 'password123',
    isAdmin: false
  },
  {
    email: 'user5@example.com',
    name: '최동현',
    phone: '010-5555-5555',
    password: 'password123',
    isAdmin: false
  }
]

export const cleanReviewData = [
  {
    rating: 5,
    comment: '정말 훌륭한 품질입니다! 사이즈도 딱 맞고 착용감이 좋아요.'
  },
  {
    rating: 4,
    comment: '전반적으로 만족스럽습니다. 가격 대비 좋은 제품이에요.'
  },
  {
    rating: 5,
    comment: '배송이 빠르고 제품 상태가 완벽합니다. 추천합니다!'
  },
  {
    rating: 4,
    comment: '예상보다 좋은 제품입니다. 다음에도 구매할 예정이에요.'
  },
  {
    rating: 5,
    comment: '친구들에게도 추천했어요. 정말 만족합니다!'
  },
  {
    rating: 4,
    comment: '디자인이 예쁘고 착용감도 좋습니다.'
  },
  {
    rating: 5,
    comment: '가격 대비 훌륭한 제품입니다. 강력 추천!'
  },
  {
    rating: 4,
    comment: '사이즈가 정사이즈로 나와서 좋았어요.'
  },
  {
    rating: 5,
    comment: '품질이 정말 좋습니다. 다음에도 구매할 예정이에요.'
  },
  {
    rating: 4,
    comment: '배송도 빠르고 제품도 만족스럽습니다.'
  }
]

export const cleanOrderData = [
  {
    orderNumber: 'ORD-2024-001',
    status: '배송완료',
    total: 450000,
    shippingAddress: '서울시 강남구 테헤란로 123',
    shippingPhone: '010-1234-5678',
    shippingName: '김철수'
  },
  {
    orderNumber: 'ORD-2024-002',
    status: '배송중',
    total: 280000,
    shippingAddress: '서울시 서초구 서초대로 456',
    shippingPhone: '010-2345-6789',
    shippingName: '이영희'
  },
  {
    orderNumber: 'ORD-2024-003',
    status: '주문확인',
    total: 180000,
    shippingAddress: '서울시 마포구 와우산로 789',
    shippingPhone: '010-3456-7890',
    shippingName: '박민수'
  },
  {
    orderNumber: 'ORD-2024-004',
    status: '배송완료',
    total: 320000,
    shippingAddress: '서울시 종로구 종로 321',
    shippingPhone: '010-4567-8901',
    shippingName: '정수진'
  },
  {
    orderNumber: 'ORD-2024-005',
    status: '배송중',
    total: 550000,
    shippingAddress: '서울시 송파구 올림픽로 654',
    shippingPhone: '010-5678-9012',
    shippingName: '최동현'
  }
]
`

  const outputPath = path.join(__dirname, '../prisma/seed-data-updated.ts')
  fs.writeFileSync(outputPath, updatedData)
  console.log(`✅ 업데이트된 데이터가 ${outputPath}에 저장되었습니다.`)
}

// 메인 실행 함수
async function main() {
  try {
    const updatedProducts = updateProductImages()
    await saveUpdatedData(updatedProducts)
    console.log('🎉 모든 상품 이미지 업데이트 완료!')
    console.log('📝 이제 prisma/seed-data-updated.ts 파일을 확인하고 필요시 수정 후 사용하세요.')
  } catch (error) {
    console.error('❌ 업데이트 중 오류 발생:', error)
  }
}

// 스크립트 실행
if (require.main === module) {
  main()
}

export { updateProductImages, saveUpdatedData } 