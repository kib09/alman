# ALMAN - 남성 패션 쇼핑몰

## 프로젝트 개요

ALMAN은 Next.js 15와 Prisma를 기반으로 구축된 현대적인 남성 패션 쇼핑몰 웹 애플리케이션입니다. 이 프로젝트는 실제 상용 서비스 수준의 기능과 사용자 경험을 제공하기 위해 다음과 같은 요소들을 고려하여 설계되었습니다.

###  프로젝트 목적
- **실용적인 쇼핑몰 구현**: 실제 비즈니스에서 사용할 수 있는 완전한 기능의 쇼핑몰
- **최신 기술 스택 활용**: Next.js 15, React 19, TypeScript 등 최신 기술 도입
- **확장 가능한 아키텍처**: 향후 기능 확장과 유지보수를 고려한 구조 설계
- **사용자 중심 UX**: 직관적이고 반응형인 사용자 인터페이스 구현

###  설계 고려사항

#### 기술적 고려사항
- **성능 최적화**: Turbopack, 이미지 최적화, 코드 스플리팅을 통한 빠른 로딩
- **타입 안정성**: TypeScript를 활용한 컴파일 타임 에러 방지
- **데이터베이스 설계**: MongoDB와 Prisma를 활용한 효율적인 데이터 관리
- **보안**: JWT 기반 인증, 비밀번호 해싱, 입력 검증 등 보안 요소 적용

#### 사용자 경험 고려사항
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 디바이스 최적화
- **접근성**: 키보드 네비게이션, 스크린 리더 지원 등 웹 접근성 준수
- **로딩 상태**: 스켈레톤 UI, 로딩 인디케이터를 통한 부드러운 사용자 경험
- **에러 처리**: 사용자 친화적인 에러 메시지와 복구 방법 제공

#### 비즈니스 로직 고려사항
- **상품 관리**: 카테고리별 분류, 재고 관리, 가격 정책 등
- **주문 프로세스**: 장바구니, 결제, 배송 추적 등 완전한 주문 플로우
- **사용자 관리**: 회원가입, 로그인, 개인정보 관리, 주소 관리 등
- **관리자 기능**: 상품 관리, 주문 관리, 사용자 관리, 통계 대시보드 등

###  주요 특징
- **완전한 기능 구현**: 쇼핑몰 운영에 필요한 모든 핵심 기능 포함
- **현대적인 UI/UX**: Tailwind CSS와 Framer Motion을 활용한 세련된 디자인
- **실시간 기능**: 검색 자동완성, 실시간 재고 확인 등
- **확장성**: 모듈화된 구조로 새로운 기능 추가 용이
- **개발자 친화적**: 상세한 문서화, 테스트 API, 유틸리티 스크립트 제공

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.12.0-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

##  주요 기능

###  사용자 기능
- **회원가입/로그인**: JWT 기반 인증 시스템
- **상품 탐색**: 카테고리별 상품 조회 및 상세 정보
- **장바구니**: 상품 추가/삭제 및 수량 관리
- **위시리스트**: 관심 상품 저장 및 관리
- **주문 관리**: 주문 내역 조회 및 상태 확인
- **계정 관리**: 주소 관리, 개인정보 수정

###  쇼핑 기능
- **상품 검색**: 실시간 검색 및 자동완성
- **상품 상세**: 이미지 갤러리, 사이즈/컬러 선택
- **리뷰 시스템**: 상품별 평점 및 리뷰
- **할인 상품**: 세일 상품 표시 및 가격 비교
- **신상품**: 최신 상품 하이라이트

 관리자 기능
- **상품 관리**: 상품 추가/수정/삭제
- **주문 관리**: 주문 상태 변경 및 관리
- **사용자 관리**: 회원 정보 조회 및 관리
- **통계 대시보드**: 매출 및 주문 통계
- **설정 관리**: 사이트 설정 및 관리

###  UI/UX 기능
- **반응형 디자인**: 모바일/태블릿/데스크톱 최적화
- **다크모드 지원**: 사용자 선호도에 따른 테마 변경
- **스켈레톤 로딩**: 부드러운 로딩 경험
- **토스트 알림**: 사용자 피드백 시스템
- **애니메이션**: Framer Motion 기반 인터랙션

##  스크린샷

### 메인 페이지
![메인 페이지](/alman/Alman1.PNG)

### 위시리스트
![위시리스트](/alman/Alman2.PNG)

### 카테고리 페이지
![카테고리 페이지](/alman/Alman3.PNG)

### 장바구니
![장바구니](/alman/Alman4.PNG)

### 주문하기 (결제 페이지)
![주문하기](/alman/Alman5.PNG)

### 주문완료
![주문완료](/alman/Alman6.PNG)

### 마이페이지
![마이페이지](/alman/Alman7.PNG)

### 관리자 대시보드
![관리자 대시보드](/alman/Alman8.PNG)

### 상품관리
![상품관리](/alman/Alman9.PNG)

### 주문관리
![주문관리](/alman/Alman10.PNG)

##  기술 스택

### Frontend
- **Framework**: Next.js 15.4.4 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Headless UI 2.2.6
- **Icons**: Lucide React 0.525.0
- **Animations**: Framer Motion 12.23.9
- **React**: 19.1.0

### Backend
- **Runtime**: Node.js 20
- **API**: Next.js API Routes
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcrypt 6.0.0

### Database
- **Database**: MongoDB 6.18.0
- **ORM**: Prisma 6.12.0
- **Connection**: MongoDB Atlas 

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint 9
- **Type Checking**: TypeScript 5.0
- **Build Tool**: Turbopack (Next.js 15)
- **Script Runner**: tsx 4.20.3

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
│   ├── create-test-data.ts    # 테스트 데이터 생성
│   ├── fix-product-data.ts    # 상품 데이터 수정 스크립트
│   ├── migrate-user-addresses.ts # 사용자 주소 마이그레이션
│   ├── test-login.ts          # 로그인 테스트 스크립트
│   ├── test-order.ts          # 주문 테스트 스크립트
│   ├── update-images-demo.ts  # 데모 이미지 업데이트
│   └── update-product-images.ts # API 기반 이미지 업데이트
├── src/
│   ├── app/                   # Next.js 15 App Router
│   │   ├── account/           # 사용자 계정 페이지
│   │   │   ├── addresses/     # 주소 관리
│   │   │   ├── orders/        # 주문 내역
│   │   │   ├── overview/      # 계정 개요
│   │   │   └── page.tsx       # 계정 메인
│   │   ├── admin/             # 관리자 페이지
│   │   │   ├── orders/        # 주문 관리
│   │   │   ├── page.tsx       # 관리자 대시보드
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
│   │   │   │   │   └── [id]/  # 개별 주문 관리
│   │   │   │   ├── products/  # 상품 관리 API
│   │   │   │   │   └── [id]/  # 개별 상품 관리
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
│   │   │   │   └── [id]/      # 개별 장바구니 아이템
│   │   │   ├── categories/    # 카테고리 API
│   │   │   ├── orders/        # 주문 API
│   │   │   │   └── [id]/      # 개별 주문
│   │   │   ├── products/      # 상품 API
│   │   │   │   └── [id]/      # 개별 상품
│   │   │   ├── search/        # 검색 API
│   │   │   │   └── suggestions/ # 검색 제안 API
│   │   │   ├── test/          # 테스트 API
│   │   │   ├── test-db/       # 데이터베이스 테스트
│   │   │   ├── test-order/    # 주문 테스트
│   │   │   ├── test-prisma/   # Prisma 테스트
│   │   │   ├── test-user/     # 사용자 테스트
│   │   │   ├── user/          # 사용자 API
│   │   │   │   ├── addresses/ # 주소 관리 API
│   │   │   │   │   └── [id]/  # 개별 주소
│   │   │   │   │       └── default/ # 기본 주소 설정
│   │   │   │   └── recent-orders/ # 최근 주문 API
│   │   │   │   └── stats/     # 사용자 통계 API
│   │   │   ├── users/         # 사용자 관리 API
│   │   │   └── wishlist/      # 위시리스트 API
│   │   │       ├── [id]/      # 개별 위시리스트 아이템
│   │   │       ├── check/     # 위시리스트 확인
│   │   │       └── product/   # 상품별 위시리스트
│   │   │           └── [productId]/
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
│   │   ├── favicon.ico        # 파비콘
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
│   │       ├── AddressInput.tsx # 주소 입력 컴포넌트
│   │       ├── AddressSelector.tsx # 주소 선택 컴포넌트
│   │       ├── CategoryCardSkeleton.tsx # 카테고리 스켈레톤
│   │       ├── ConfirmModal.tsx # 확인 모달
│   │       ├── LoginModal.tsx # 로그인 모달
│   │       ├── ProductCardSkeleton.tsx # 상품 카드 스켈레톤
│   │       ├── ProductDetailSkeleton.tsx # 상품 상세 스켈레톤
│   │       ├── SearchInput.tsx # 검색 입력 컴포넌트
│   │       ├── ShareModal.tsx # 공유 모달
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
├── netlify.toml               # Netlify 배포 설정
├── next.config.ts             # Next.js 설정
├── package.json               # 프로젝트 설정
├── postcss.config.mjs         # PostCSS 설정
├── tsconfig.json              # TypeScript 설정
├── vercel.json                # Vercel 배포 설정
└── README.md                  # 프로젝트 문서
```

##  주요 개선사항

### UX/UI 개선
- ✅ 카테고리별 페이지네이션 개선
- ✅ 제품 상세 페이지 인터랙션 향상
- ✅ 반응형 디자인 최적화


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
- **Address**: 사용자 배송 주소 관리

### 주요 기능
- **관계형 데이터**: Prisma를 통한 효율적인 관계 관리
- **인덱싱**: 성능 최적화를 위한 적절한 인덱스 설정
- **제약 조건**: 데이터 무결성을 위한 유니크 제약
- **캐스케이드 삭제**: 관련 데이터 자동 정리

## 🚀 배포

### Vercel 배포 (현재 배포됨)
이 프로젝트는 현재 Vercel에 배포되어 있습니다.


- [Next.js](https://nextjs.org/) - React 프레임워크
- [Prisma](https://prisma.io/) - 데이터베이스 ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [Unsplash](https://unsplash.com/) - 고품질 이미지 제공
- [Lucide](https://lucide.dev/) - 아이콘 라이브러리
- [Vercel](https://vercel.com/) - 배포 플랫폼
- [Framer Motion](https://www.framer.com/motion/) - 애니메이션 라이브러리
- [Headless UI](https://headlessui.com/) - 접근성 UI 컴포넌트
