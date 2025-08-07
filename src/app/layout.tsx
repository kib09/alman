import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastProvider } from '@/contexts/ToastContext'
import { CartProvider } from '@/contexts/CartContext'
import SkipLink from '@/components/ui/SkipLink'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'ALMAN - 남성 패션 쇼핑몰',
    template: '%s | ALMAN'
  },
  description: '세련된 남성 패션을 만나보세요. 정장, 캐주얼, 액세서리까지 모든 것을 한 곳에서. 최고 품질의 소재와 정교한 디자인으로 완성된 제품들로 당신의 스타일을 완성하세요.',
  keywords: ['남성패션', '정장', '캐주얼', '신발', '액세서리', '남성의류', '패션쇼핑몰', 'ALMAN'],
  authors: [{ name: 'ALMAN' }],
  creator: 'ALMAN',
  publisher: 'ALMAN',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://alman.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://alman.com',
    title: 'ALMAN - 남성 패션 쇼핑몰',
    description: '세련된 남성 패션을 만나보세요. 정장, 캐주얼, 액세서리까지 모든 것을 한 곳에서.',
    siteName: 'ALMAN',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ALMAN - 남성 패션 쇼핑몰',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALMAN - 남성 패션 쇼핑몰',
    description: '세련된 남성 패션을 만나보세요. 정장, 캐주얼, 액세서리까지 모든 것을 한 곳에서.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // naver: 'your-naver-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ALMAN",
              "url": "https://alman.com",
              "logo": "https://alman.com/logo.png",
              "description": "세련된 남성 패션을 만나보세요. 정장, 캐주얼, 액세서리까지 모든 것을 한 곳에서.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "경기도 성남시 수정구 모란로 1층",
                "addressLocality": "성남시",
                "addressRegion": "경기도",
                "addressCountry": "KR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "000-0000",
                "contactType": "customer service",
                "email": "dslqoehf@gmail.com"
              },
              "sameAs": [
                "https://facebook.com/alman",
                "https://twitter.com/alman",
                "https://instagram.com/alman",
                "https://youtube.com/alman"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <SkipLink />
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
