import { ImageResponse } from 'next/og'

export const alt = 'SportLive API'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0E1117',
          color: 'white',
        }}
      >
        <div style={{ width: 28, background: '#FC0078' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '72px 80px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                background: 'white',
                transform: 'skewX(-10deg)',
                padding: '16px 28px',
              }}
            >
              <span style={{ color: '#FC0078', fontSize: 64, fontWeight: 800 }}>SPORT</span>
              <span style={{ color: '#141414', fontSize: 64, fontWeight: 800 }}>LIVE</span>
            </div>
            <div
              style={{
                display: 'flex',
                background: '#FC0078',
                transform: 'skewX(-10deg)',
                marginLeft: 18,
                padding: '16px 22px',
              }}
            >
              <span style={{ color: 'white', fontSize: 64, fontWeight: 800 }}>API</span>
            </div>
          </div>
          <div style={{ marginTop: 42, fontSize: 34, fontWeight: 700 }}>
            Live sports lines, TV channels and OBS feeds
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
