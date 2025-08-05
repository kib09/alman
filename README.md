# ALMAN - 남성 패션 쇼핑몰

Next.js 15와 Prisma를 사용한 현대적인 남성 패션 쇼핑몰 웹 애플리케이션입니다.

## 🚀 주요 기능

### 👤 사용자 기능
- **회원가입/로그인**: JWT 기반 인증 시스템
- **상품 탐색**: 카테고리별 상품 조회 및 상세 정보
- **장바구니**: 상품 추가/삭제 및 수량 관리
- **위시리스트**: 관심 상품 저장 및 관리
- **주문 관리**: 주문 내역 조회 및 상태 확인
- **계정 관리**: 주소 관리, 개인정보 수정

### 🛍️ 쇼핑 기능
- **상품 검색**: 실시간 검색 및 자동완성
- **상품 상세**: 이미지 갤러리, 사이즈/컬러 선택
- **리뷰 시스템**: 상품별 평점 및 리뷰
- **할인 상품**: 세일 상품 표시 및 가격 비교
- **신상품**: 최신 상품 하이라이트

### 👨‍💼 관리자 기능
- **상품 관리**: 상품 추가/수정/삭제
- **주문 관리**: 주문 상태 변경 및 관리
- **사용자 관리**: 회원 정보 조회 및 관리
- **통계 대시보드**: 매출 및 주문 통계
- **설정 관리**: 사이트 설정 및 관리

### 🎨 UI/UX 기능
- **반응형 디자인**: 모바일/태블릿/데스크톱 최적화
- **다크모드 지원**: 사용자 선호도에 따른 테마 변경
- **스켈레톤 로딩**: 부드러운 로딩 경험
- **토스트 알림**: 사용자 피드백 시스템
- **애니메이션**: Framer Motion 기반 인터랙션

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Headless UI
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt

### Database
- **Database**: MongoDB
- **ORM**: Prisma 6
- **Connection**: MongoDB Atlas (권장)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Build Tool**: Turbopack

## 📦 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd alman
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 데이터베이스 연결 (MongoDB Atlas 권장)
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/alman?retryWrites=true&w=majority"

# JWT 시크릿 키 (32자 이상의 랜덤 문자열)
JWT_SECRET="your-super-secret-jwt-key-here"

# 선택사항: Unsplash API (이미지 자동화용)
UNSPLASH_ACCESS_KEY="your-unsplash-access-key"
```

### 4. 데이터베이스 설정
```bash
# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma db push

# 샘플 데이터 시드 (권장)
npm run db:seed:clean
```

### 5. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

## 🎨 이미지 자동화 기능

### 상품 이미지 자동 업데이트

프로젝트에는 상품별로 적합한 이미지를 자동으로 할당하는 스크립트가 포함되어 있습니다.

#### 1. 데모 이미지 업데이트 (API 키 불필요)
```bash
npx tsx scripts/update-images-demo.ts
```

#### 2. Unsplash API를 사용한 실시간 이미지 검색 (API 키 필요)
```bash
# 1. https://unsplash.com/developers 에서 무료 계정 생성
# 2. Application 생성 후 Access Key 복사
# 3. .env.local 파일에 UNSPLASH_ACCESS_KEY 추가
# 4. 스크립트 실행
npx tsx scripts/update-product-images.ts
```

### 이미지 업데이트 후 데이터베이스 재시드
```bash
npm run db:seed:clean
```

## 📁 프로젝트 구조

```
alman/
├── prisma/
│   ├── schema.prisma          # 데이터베이스 스키마
│   ├── seed-clean.ts          # 메인 시드 스크립트 (권장)
│   ├── seed-data-clean.ts     # 정리된 상품 데이터
│   ├── seed-data-updated.ts   # 이미지 업데이트된 데이터
│   ├── seed-data.ts           # 원본 상품 데이터
│   └── seed.ts                # 레거시 시드 스크립트
├── scripts/
│   ├── update-images-demo.ts  # 데모 이미지 업데이트
│   ├── update-product-images.ts # API 기반 이미지 업데이트
│   └── test-login.ts          # 로그인 테스트 스크립트
├── src/
│   ├── app/                   # Next.js 15 App Router
│   │   ├── account/           # 사용자 계정 페이지
│   │   │   ├── addresses/     # 주소 관리
│   │   │   ├── orders/        # 주문 내역
│   │   │   └── overview/      # 계정 개요
│   │   ├── admin/             # 관리자 페이지
│   │   │   ├── orders/        # 주문 관리
│   │   │   ├── products/      # 상품 관리
│   │   │   │   ├── [id]/      # 상품 수정
│   │   │   │   │   └── edit/
│   │   │   │   └── new/       # 새 상품 추가
│   │   │   ├── settings/      # 사이트 설정
│   │   │   ├── stats/         # 통계 대시보드
│   │   │   └── users/         # 사용자 관리
│   │   ├── api/               # API 라우트
│   │   │   ├── admin/         # 관리자 API
│   │   │   │   ├── orders/    # 주문 관리 API
│   │   │   │   ├── products/  # 상품 관리 API
│   │   │   │   ├── settings/  # 설정 관리 API
│   │   │   │   ├── stats/     # 통계 API
│   │   │   │   ├── users/     # 사용자 관리 API
│   │   │   │   └── verify/    # 관리자 인증 API
│   │   │   ├── auth/          # 인증 API
│   │   │   │   ├── login/     # 로그인 API
│   │   │   │   ├── logout/    # 로그아웃 API
│   │   │   │   ├── me/        # 사용자 정보 API
│   │   │   │   └── register/  # 회원가입 API
│   │   │   ├── cart/          # 장바구니 API
│   │   │   ├── categories/    # 카테고리 API
│   │   │   ├── orders/        # 주문 API
│   │   │   ├── products/      # 상품 API
│   │   │   ├── search/        # 검색 API
│   │   │   │   └── suggestions/ # 검색 제안 API
│   │   │   ├── test/          # 테스트 API
│   │   │   ├── users/         # 사용자 API
│   │   │   └── wishlist/      # 위시리스트 API
│   │   ├── cart/              # 장바구니 페이지
│   │   ├── category/          # 카테고리 페이지
│   │   │   └── [category]/    # 카테고리별 상품
│   │   ├── checkout/          # 결제 페이지
│   │   ├── contact/           # 문의 페이지
│   │   ├── faq/               # FAQ 페이지
│   │   ├── login/             # 로그인 페이지
│   │   ├── orders/            # 주문 페이지
│   │   │   └── [id]/          # 주문 상세
│   │   ├── product/           # 상품 상세 페이지
│   │   │   └── [id]/
│   │   ├── products/          # 상품 목록 페이지
│   │   ├── register/          # 회원가입 페이지
│   │   ├── search/            # 검색 페이지
│   │   ├── shipping/          # 배송 정보 페이지
│   │   ├── size-guide/        # 사이즈 가이드
│   │   ├── terms/             # 이용약관
│   │   ├── privacy/           # 개인정보처리방침
│   │   ├── return-exchange/   # 반품/교환 정책
│   │   ├── wishlist/          # 위시리스트 페이지
│   │   ├── globals.css        # 전역 스타일
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   └── page.tsx           # 메인 페이지
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   ├── layout/            # 레이아웃 컴포넌트
│   │   │   ├── Footer.tsx     # 푸터 컴포넌트
│   │   │   └── Header.tsx     # 헤더 컴포넌트
│   │   ├── product/           # 상품 관련 컴포넌트
│   │   │   └── ProductCard.tsx # 상품 카드 컴포넌트
│   │   └── ui/                # UI 컴포넌트
│   │       ├── CategoryCardSkeleton.tsx # 카테고리 스켈레톤
│   │       ├── LoginModal.tsx # 로그인 모달
│   │       ├── ProductCardSkeleton.tsx # 상품 카드 스켈레톤
│   │       ├── ProductDetailSkeleton.tsx # 상품 상세 스켈레톤
│   │       ├── SearchInput.tsx # 검색 입력 컴포넌트
│   │       ├── Skeleton.tsx   # 기본 스켈레톤
│   │       └── Toast.tsx      # 토스트 알림
│   ├── contexts/              # React Context
│   │   ├── AuthContext.tsx    # 인증 상태 관리
│   │   ├── CartContext.tsx    # 장바구니 상태 관리
│   │   └── ToastContext.tsx   # 토스트 알림 관리
│   └── lib/                   # 유틸리티 함수
│       ├── auth.ts            # 인증 관련 함수
│       ├── prisma.ts          # Prisma 클라이언트
│       └── utils.ts           # 공통 유틸리티
├── public/                    # 정적 파일
│   ├── file.svg               # 파일 아이콘
│   ├── globe.svg              # 글로브 아이콘
│   ├── next.svg               # Next.js 로고
│   ├── vercel.svg             # Vercel 로고
│   └── window.svg             # 윈도우 아이콘
├── eslint.config.mjs          # ESLint 설정
├── next.config.ts             # Next.js 설정
├── package.json               # 프로젝트 설정
├── postcss.config.mjs         # PostCSS 설정
├── tsconfig.json              # TypeScript 설정
└── README.md                  # 프로젝트 문서
```

## 🎯 주요 개선사항

### UX/UI 개선
- ✅ 메인 페이지 스켈레톤 이미지 제거
- ✅ 모든 버튼에 호버 포인터 효과 추가
- ✅ 카테고리별 페이지네이션 개선
- ✅ 제품 상세 페이지 인터랙션 향상
- ✅ 반응형 디자인 최적화
- ✅ 다크모드 지원

### 데이터 최적화
- ✅ 중복 상품 정보 정리 (베이직 티셔츠 11개 → 1개)
- ✅ 상품별 고유 이미지 자동 할당
- ✅ 데이터베이스 시드 프로세스 개선
- ✅ 카테고리별 상품 분류 최적화

### 이미지 다양화
- ✅ 각 상품에 맞는 고유 이미지 적용
- ✅ 카테고리별 이미지 테마 일관성 유지
- ✅ 자동화된 이미지 업데이트 스크립트
- ✅ Unsplash API 연동

### 성능 최적화
- ✅ Next.js 15 Turbopack 사용
- ✅ 이미지 최적화 (Next.js Image 컴포넌트)
- ✅ 코드 스플리팅 및 지연 로딩
- ✅ API 응답 캐싱

## 🔧 개발 명령어

```bash
# 개발 서버 실행 (Turbopack 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint

# 데이터베이스 시드
npm run db:seed:clean

# Prisma 스튜디오 실행
npx prisma studio
```

## 📊 데이터베이스 스키마

### 주요 모델
- **User**: 사용자 정보 및 인증 (관리자 권한 포함)
- **Product**: 상품 정보 (이미지, 가격, 사이즈, 컬러 등)
- **Category**: 상품 카테고리 분류
- **CartItem**: 장바구니 아이템 (사이즈/컬러 선택)
- **WishlistItem**: 위시리스트 아이템
- **Order**: 주문 정보 (배송지, 연락처 등)
- **OrderItem**: 주문 상품 상세
- **Review**: 상품 리뷰 및 평점

### 주요 기능
- **관계형 데이터**: Prisma를 통한 효율적인 관계 관리
- **인덱싱**: 성능 최적화를 위한 적절한 인덱스 설정
- **제약 조건**: 데이터 무결성을 위한 유니크 제약
- **캐스케이드 삭제**: 관련 데이터 자동 정리

## 🚀 배포

### Vercel 배포 (권장)
1. GitHub에 코드 푸시
2. Vercel에서 프로젝트 연결
3. 환경 변수 설정
4. 자동 배포 완료

### 환경 변수 설정
```env
DATABASE_URL="your-production-mongodb-url"
JWT_SECRET="your-production-jwt-secret"
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - React 프레임워크
- [Prisma](https://prisma.io/) - 데이터베이스 ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [Unsplash](https://unsplash.com/) - 고품질 이미지 제공
- [Lucide](https://lucide.dev/) - 아이콘 라이브러리
