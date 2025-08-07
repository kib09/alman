import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'ALMAN - 남성 패션 쇼핑몰'
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              marginBottom: '20px',
              letterSpacing: '4px',
            }}
          >
            ALMAN
          </div>
          <div
            style={{
              fontSize: '24px',
              marginBottom: '30px',
              opacity: 0.9,
            }}
          >
            남성 패션 쇼핑몰
          </div>
          <div
            style={{
              fontSize: '18px',
              opacity: 0.8,
              maxWidth: '600px',
              lineHeight: 1.5,
            }}
          >
            세련된 남성 패션을 만나보세요. 정장부터 캐주얼까지, 당신만의 스타일을 완성하세요.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

