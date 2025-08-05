// 정리된 상품 데이터 - 중복 제거 및 실용적인 상품 구성
export const cleanSuitProducts = [
  {
    name: '클래식 네이비 정장',
    description: '최고 품질의 이탈리아 울 소재로 제작된 클래식 네이비 정장입니다.',
    price: 450000,
    originalPrice: 550000,
    images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['네이비', '차콜', '블랙'],
    isNew: true,
    isSale: true,
    rating: 4.8,
    reviewCount: 127
  },
  {
    name: '차콜 그레이 정장',
    description: '모던하고 세련된 차콜 그레이 정장으로, 어떤 자리에서도 자신감을 가져다줍니다.',
    price: 380000,
    originalPrice: 480000,
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['차콜', '네이비'],
    isNew: false,
    isSale: true,
    rating: 4.6,
    reviewCount: 89
  },
  {
    name: '블랙 포멀 정장',
    description: '공식적인 자리에 어울리는 우아한 블랙 정장입니다.',
    price: 520000,
    originalPrice: 650000,
    images: ['https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['블랙'],
    isNew: true,
    isSale: false,
    rating: 4.9,
    reviewCount: 156
  },
  {
    name: '더블 브레스티드 정장',
    description: '클래식한 더블 브레스티드 디자인의 정장으로 품격있는 스타일을 연출합니다.',
    price: 580000,
    originalPrice: 720000,
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['네이비', '블랙'],
    isNew: true,
    isSale: true,
    rating: 4.8,
    reviewCount: 112
  },
  {
    name: '슬림 핏 그레이 정장',
    description: '트렌디한 슬림 핏으로 제작된 그레이 정장입니다.',
    price: 390000,
    originalPrice: 490000,
    images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L'],
    colors: ['라이트 그레이', '다크 그레이'],
    isNew: true,
    isSale: false,
    rating: 4.7,
    reviewCount: 94
  },
  {
    name: '프리미엄 울 정장',
    description: '최고급 울 소재로 제작된 프리미엄 정장입니다.',
    price: 780000,
    originalPrice: 980000,
    images: ['https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop'],
    sizes: ['M', 'L', 'XL'],
    colors: ['다크 네이비', '차콜'],
    isNew: true,
    isSale: false,
    rating: 5.0,
    reviewCount: 89
  },
  {
    name: '린넨 정장',
    description: '시원하고 가벼운 린넨 소재의 여름용 정장입니다.',
    price: 320000,
    originalPrice: 420000,
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['베이지', '크림'],
    isNew: false,
    isSale: true,
    rating: 4.5,
    reviewCount: 92
  },
  {
    name: '벨벳 정장',
    description: '고급스러운 벨벳 소재로 제작된 특별한 정장입니다.',
    price: 680000,
    originalPrice: 850000,
    images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop'],
    sizes: ['M', 'L', 'XL'],
    colors: ['다크 그린', '버건디'],
    isNew: true,
    isSale: false,
    rating: 4.9,
    reviewCount: 134
  }
]

export const cleanCasualProducts = [
  {
    name: '베이직 티셔츠',
    description: '어디에나 잘 어울리는 베이직한 티셔츠입니다.',
    price: 29000,
    originalPrice: 39000,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['화이트', '블랙', '그레이', '네이비'],
    isNew: false,
    isSale: true,
    rating: 4.4,
    reviewCount: 456
  },
  {
    name: '캐주얼 데님 자켓',
    description: '편안하면서도 스타일리시한 데님 자켓입니다.',
    price: 89000,
    originalPrice: 120000,
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['블루', '라이트 블루', '다크 블루'],
    isNew: false,
    isSale: true,
    rating: 4.5,
    reviewCount: 234
  },
  {
    name: '오버사이즈 후드티',
    description: '트렌디한 오버사이즈 후드티로 편안한 일상을 보내세요.',
    price: 65000,
    originalPrice: 85000,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['블랙', '그레이', '네이비'],
    isNew: true,
    isSale: false,
    rating: 4.7,
    reviewCount: 189
  },
  {
    name: '스웨트셔츠',
    description: '편안하고 따뜻한 스웨트셔츠로 일상의 편안함을 느껴보세요.',
    price: 55000,
    originalPrice: 75000,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['그레이', '네이비', '블랙'],
    isNew: false,
    isSale: true,
    rating: 4.6,
    reviewCount: 312
  },
  {
    name: '카고 팬츠',
    description: '실용적인 포켓이 많은 카고 팬츠입니다.',
    price: 78000,
    originalPrice: 98000,
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['베이지', '올리브', '블랙'],
    isNew: true,
    isSale: false,
    rating: 4.5,
    reviewCount: 178
  },
  {
    name: '데님 팬츠',
    description: '클래식한 데님 팬츠로 캐주얼한 스타일을 완성하세요.',
    price: 85000,
    originalPrice: 110000,
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop'],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['라이트 블루', '다크 블루', '블랙'],
    isNew: false,
    isSale: true,
    rating: 4.7,
    reviewCount: 298
  },
  {
    name: '플리스 자켓',
    description: '가볍고 따뜻한 플리스 자켓으로 겨울을 따뜻하게 보내세요.',
    price: 95000,
    originalPrice: 120000,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['네이비', '그레이', '블랙'],
    isNew: true,
    isSale: false,
    rating: 4.8,
    reviewCount: 145
  },
  {
    name: '옥스포드 셔츠',
    description: '클래식한 옥스포드 셔츠로 깔끔한 캐주얼 룩을 연출하세요.',
    price: 68000,
    originalPrice: 88000,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['화이트', '라이트 블루', '핑크'],
    isNew: false,
    isSale: true,
    rating: 4.6,
    reviewCount: 234
  },
  {
    name: '치노 팬츠',
    description: '클래식한 치노 팬츠로 깔끔한 캐주얼 룩을 완성하세요.',
    price: 75000,
    originalPrice: 95000,
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['베이지', '올리브', '네이비'],
    isNew: false,
    isSale: true,
    rating: 4.6,
    reviewCount: 198
  },
  {
    name: '폴로 셔츠',
    description: '클래식한 폴로 셔츠로 세련된 캐주얼 룩을 연출하세요.',
    price: 58000,
    originalPrice: 78000,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['화이트', '라이트 블루', '핑크'],
    isNew: true,
    isSale: false,
    rating: 4.8,
    reviewCount: 234
  }
]

export const cleanShoeProducts = [
  {
    name: '클래식 옥스포드',
    description: '전통적인 옥스포드 디자인의 정장화입니다.',
    price: 180000,
    originalPrice: 220000,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop'],
    sizes: ['250', '260', '270', '280', '290'],
    colors: ['블랙', '브라운'],
    isNew: false,
    isSale: true,
    rating: 4.8,
    reviewCount: 234
  },
  {
    name: '데르비 슈즈',
    description: '클래식한 데르비 디자인의 정장화입니다.',
    price: 160000,
    originalPrice: 200000,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop'],
    sizes: ['250', '260', '270', '280', '290'],
    colors: ['블랙', '브라운', '체스넛'],
    isNew: true,
    isSale: false,
    rating: 4.7,
    reviewCount: 189
  },
  {
    name: '로퍼',
    description: '편안하고 세련된 로퍼입니다.',
    price: 140000,
    originalPrice: 180000,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop'],
    sizes: ['250', '260', '270', '280', '290'],
    colors: ['블랙', '브라운', '네이비'],
    isNew: false,
    isSale: true,
    rating: 4.6,
    reviewCount: 312
  },
  {
    name: '스니커즈',
    description: '편안하고 스타일리시한 스니커즈입니다.',
    price: 89000,
    originalPrice: 120000,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop'],
    sizes: ['250', '260', '270', '280', '290'],
    colors: ['화이트', '블랙', '그레이'],
    isNew: true,
    isSale: false,
    rating: 4.5,
    reviewCount: 456
  },
  {
    name: '부츠',
    description: '겨울에 어울리는 따뜻한 부츠입니다.',
    price: 220000,
    originalPrice: 280000,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop'],
    sizes: ['250', '260', '270', '280', '290'],
    colors: ['블랙', '브라운', '체스넛'],
    isNew: false,
    isSale: true,
    rating: 4.8,
    reviewCount: 178
  },
  {
    name: '모카신',
    description: '편안하고 캐주얼한 모카신입니다.',
    price: 120000,
    originalPrice: 160000,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop'],
    sizes: ['250', '260', '270', '280', '290'],
    colors: ['브라운', '탠', '블랙'],
    isNew: true,
    isSale: false,
    rating: 4.6,
    reviewCount: 234
  },
  {
    name: '슬립온',
    description: '편안한 슬립온 슈즈입니다.',
    price: 95000,
    originalPrice: 125000,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop'],
    sizes: ['250', '260', '270', '280', '290'],
    colors: ['화이트', '블랙', '네이비'],
    isNew: true,
    isSale: false,
    rating: 4.5,
    reviewCount: 289
  },
  {
    name: '캔버스 스니커즈',
    description: '클래식한 캔버스 스니커즈입니다.',
    price: 65000,
    originalPrice: 85000,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop'],
    sizes: ['250', '260', '270', '280', '290'],
    colors: ['화이트', '블랙', '네이비'],
    isNew: false,
    isSale: true,
    rating: 4.4,
    reviewCount: 367
  }
]

export const cleanAccessoryProducts = [
  {
    name: '프리미엄 가죽 벨트',
    description: '최고급 가죽으로 제작된 프리미엄 벨트입니다.',
    price: 65000,
    originalPrice: 85000,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop'],
    sizes: ['90cm', '95cm', '100cm', '105cm', '110cm'],
    colors: ['브라운', '블랙', '체스넛'],
    isNew: true,
    isSale: false,
    rating: 4.8,
    reviewCount: 234
  },
  {
    name: '실크 넥타이',
    description: '고급 실크 소재로 제작된 세련된 넥타이입니다.',
    price: 60000,
    originalPrice: 80000,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop'],
    sizes: ['표준'],
    colors: ['네이비', '블랙', '버건디', '그레이'],
    isNew: false,
    isSale: true,
    rating: 4.7,
    reviewCount: 189
  },
  {
    name: '가죽 지갑',
    description: '실용적이고 세련된 가죽 지갑입니다.',
    price: 85000,
    originalPrice: 110000,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop'],
    sizes: ['표준'],
    colors: ['브라운', '블랙', '체스넛'],
    isNew: true,
    isSale: false,
    rating: 4.9,
    reviewCount: 312
  },
  {
    name: '스카프',
    description: '고급스러운 실크 스카프입니다.',
    price: 45000,
    originalPrice: 65000,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop'],
    sizes: ['표준'],
    colors: ['네이비', '그레이', '버건디', '크림'],
    isNew: false,
    isSale: true,
    rating: 4.6,
    reviewCount: 178
  },
  {
    name: '가죽 백팩',
    description: '실용적이고 스타일리시한 가죽 백팩입니다.',
    price: 180000,
    originalPrice: 240000,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop'],
    sizes: ['표준'],
    colors: ['브라운', '블랙', '체스넛'],
    isNew: true,
    isSale: false,
    rating: 4.8,
    reviewCount: 145
  },
  {
    name: '넥타이 핀',
    description: '세련된 넥타이 핀입니다.',
    price: 35000,
    originalPrice: 45000,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop'],
    sizes: ['표준'],
    colors: ['실버', '골드', '로즈골드'],
    isNew: false,
    isSale: true,
    rating: 4.5,
    reviewCount: 234
  },
  {
    name: '가죽 키홀더',
    description: '실용적인 가죽 키홀더입니다.',
    price: 25000,
    originalPrice: 35000,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop'],
    sizes: ['표준'],
    colors: ['브라운', '블랙', '체스넛'],
    isNew: true,
    isSale: false,
    rating: 4.7,
    reviewCount: 198
  },
  {
    name: '넥타이 클립',
    description: '넥타이를 고정하는 세련된 클립입니다.',
    price: 28000,
    originalPrice: 38000,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop'],
    sizes: ['표준'],
    colors: ['실버', '골드', '로즈골드'],
    isNew: false,
    isSale: true,
    rating: 4.6,
    reviewCount: 167
  }
]

export const cleanSportswearProducts = [
  {
    name: '프리미엄 트레이닝 팬츠',
    description: '편안하고 기능적인 프리미엄 트레이닝 팬츠입니다.',
    price: 89000,
    originalPrice: 120000,
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['블랙', '그레이', '네이비'],
    isNew: true,
    isSale: false,
    rating: 4.8,
    reviewCount: 234
  },
  {
    name: '스포츠 티셔츠',
    description: '땀을 빠르게 흡수하는 기능성 스포츠 티셔츠입니다.',
    price: 45000,
    originalPrice: 65000,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['화이트', '블랙', '그레이', '네이비'],
    isNew: false,
    isSale: true,
    rating: 4.6,
    reviewCount: 456
  },
  {
    name: '스포츠 자켓',
    description: '가볍고 따뜻한 스포츠 자켓입니다.',
    price: 120000,
    originalPrice: 160000,
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['블랙', '그레이', '네이비'],
    isNew: true,
    isSale: false,
    rating: 4.7,
    reviewCount: 189
  },
  {
    name: '스포츠 쇼츠',
    description: '편안하고 가벼운 스포츠 쇼츠입니다.',
    price: 35000,
    originalPrice: 55000,
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['블랙', '그레이', '네이비'],
    isNew: false,
    isSale: true,
    rating: 4.5,
    reviewCount: 312
  },
  {
    name: '스포츠 후드티',
    description: '편안하고 따뜻한 스포츠 후드티입니다.',
    price: 75000,
    originalPrice: 95000,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['블랙', '그레이', '네이비'],
    isNew: true,
    isSale: false,
    rating: 4.8,
    reviewCount: 234
  },
  {
    name: '스포츠 레깅스',
    description: '편안하고 탄력있는 스포츠 레깅스입니다.',
    price: 65000,
    originalPrice: 85000,
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['블랙', '그레이', '네이비'],
    isNew: false,
    isSale: true,
    rating: 4.7,
    reviewCount: 198
  },
  {
    name: '스포츠 집업',
    description: '편안하고 기능적인 스포츠 집업입니다.',
    price: 95000,
    originalPrice: 125000,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['블랙', '그레이', '네이비'],
    isNew: true,
    isSale: false,
    rating: 4.8,
    reviewCount: 167
  },
  {
    name: '스포츠 탱크탑',
    description: '가볍고 시원한 스포츠 탱크탑입니다.',
    price: 35000,
    originalPrice: 55000,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['화이트', '블랙', '그레이'],
    isNew: false,
    isSale: true,
    rating: 4.6,
    reviewCount: 289
  }
]

// 정리된 사용자 데이터
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

// 정리된 리뷰 데이터
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

// 정리된 주문 데이터
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