import 'dotenv/config'
import fetch from 'node-fetch'
import { 
  cleanSuitProducts, 
  cleanCasualProducts, 
  cleanShoeProducts, 
  cleanAccessoryProducts, 
  cleanSportswearProducts
} from '../prisma/seed-data-clean'

// Unsplash API 설정 (무료 계정으로 사용 가능)
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY'
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos'

// 상품별 검색 키워드 매핑
const productSearchKeywords: { [key: string]: string } = {
  // 정장
  '클래식 네이비 정장': 'navy suit business',
  '차콜 그레이 정장': 'charcoal gray suit',
  '블랙 포멀 정장': 'black formal suit',
  '더블 브레스티드 정장': 'double breasted suit',
  '슬림 핏 그레이 정장': 'slim fit gray suit',
  '프리미엄 울 정장': 'premium wool suit',
  '린넨 정장': 'linen suit summer',
  '벨벳 정장': 'velvet suit luxury',

  // 캐주얼
  '베이직 티셔츠': 'basic t-shirt cotton',
  '캐주얼 데님 자켓': 'denim jacket casual',
  '오버사이즈 후드티': 'oversized hoodie',
  '스웨트셔츠': 'sweatshirt casual',
  '카고 팬츠': 'cargo pants',
  '데님 팬츠': 'denim jeans',
  '플리스 자켓': 'fleece jacket',
  '옥스포드 셔츠': 'oxford shirt',
  '치노 팬츠': 'chino pants',
  '폴로 셔츠': 'polo shirt',

  // 신발
  '클래식 옥스포드': 'oxford shoes classic',
  '데르비 슈즈': 'derby shoes',
  '로퍼': 'loafers shoes',
  '스니커즈': 'sneakers casual',
  '부츠': 'boots leather',
  '모카신': 'moccasin shoes',
  '슬립온': 'slip on shoes',
  '캔버스 스니커즈': 'canvas sneakers',

  // 액세서리
  '프리미엄 가죽 벨트': 'leather belt premium',
  '실크 넥타이': 'silk tie',
  '가죽 지갑': 'leather wallet',
  '스카프': 'scarf silk',
  '가죽 백팩': 'leather backpack',
  '넥타이 핀': 'tie pin',
  '가죽 키홀더': 'leather keychain',
  '넥타이 클립': 'tie clip',

  // 스포츠웨어
  '프리미엄 트레이닝 팬츠': 'training pants premium',
  '스포츠 티셔츠': 'sports t-shirt',
  '스포츠 자켓': 'sports jacket',
  '스포츠 쇼츠': 'sports shorts',
  '스포츠 후드티': 'sports hoodie',
  '스포츠 레깅스': 'sports leggings',
  '스포츠 집업': 'sports zip up',
  '스포츠 탱크탑': 'sports tank top'
}

// Unsplash에서 이미지 검색
async function searchImage(query: string): Promise<string | null> {
  try {
    const url = `${UNSPLASH_API_URL}?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1&orientation=portrait`
    const response = await fetch(url)
    const data = await response.json() as any

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular
    }
    return null
  } catch (error) {
    console.error(`이미지 검색 실패 (${query}):`, error)
    return null
  }
}

// 상품별 이미지 업데이트
async function updateProductImages() {
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
    const searchKeyword = productSearchKeywords[product.name]
    
    if (searchKeyword) {
      console.log(`${product.name} 이미지 검색 중...`)
      const newImageUrl = await searchImage(searchKeyword)
      
      if (newImageUrl) {
        product.images = [newImageUrl]
        console.log(`✅ ${product.name}: 이미지 업데이트 완료`)
      } else {
        console.log(`❌ ${product.name}: 이미지 검색 실패`)
      }
    } else {
      console.log(`⚠️ ${product.name}: 검색 키워드 없음`)
    }

    updatedProducts.push(product)
    
    // API 호출 제한을 위한 딜레이
    await new Promise(resolve => setTimeout(resolve, 100))
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
// 자동 업데이트된 상품 데이터
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
  if (UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
    console.log('❌ Unsplash API 키를 설정해주세요!')
    console.log('1. https://unsplash.com/developers 에서 무료 계정 생성')
    console.log('2. Application 생성 후 Access Key 복사')
    console.log('3. 스크립트의 UNSPLASH_ACCESS_KEY 변수에 키 입력')
    return
  }

  try {
    const updatedProducts = await updateProductImages()
    await saveUpdatedData(updatedProducts)
    console.log('🎉 모든 상품 이미지 업데이트 완료!')
  } catch (error) {
    console.error('❌ 업데이트 중 오류 발생:', error)
  }
}

// 스크립트 실행
if (require.main === module) {
  main()
}

export { updateProductImages, saveUpdatedData } 