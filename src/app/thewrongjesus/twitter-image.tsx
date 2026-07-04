import { ImageResponse } from 'next/og'
import fs from 'node:fs/promises'
import path from 'node:path'

export const runtime = 'nodejs'
export const alt = 'The Wrong Jesus by Dr. Bill Yomes: Launching September 15, 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const FONTS_DIR = path.join(process.cwd(), 'src/app/thewrongjesus/fonts')

export default async function Image() {
  const [interRegular, interSemiBold, playfairBold, playfairExtraBold, cover] = await Promise.all([
    fs.readFile(path.join(FONTS_DIR, 'Inter-Regular.ttf')),
    fs.readFile(path.join(FONTS_DIR, 'Inter-SemiBold.ttf')),
    fs.readFile(path.join(FONTS_DIR, 'PlayfairDisplay-Bold.ttf')),
    fs.readFile(path.join(FONTS_DIR, 'PlayfairDisplay-ExtraBold.ttf')),
    fs.readFile(path.join(process.cwd(), 'public/images/wrong-jesus-cover-iso.png')),
  ])

  const coverSrc = `data:image/png;base64,${cover.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '70px',
          backgroundColor: '#0f0e0d',
          backgroundImage: 'linear-gradient(135deg, #0f0e0d 0%, #181715 100%)',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexShrink: 0,
            width: 306,
            height: 490,
            boxShadow: '0 40px 80px rgba(0, 0, 0, 0.55)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverSrc}
            width={306}
            height={490}
            style={{ width: 306, height: 490, objectFit: 'cover' }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 64,
            width: 694,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              fontFamily: 'Inter',
              fontWeight: 600,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#daa33b',
            }}
          >
            New Book
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 20,
              fontSize: 76,
              lineHeight: 1.08,
              fontFamily: 'Playfair Display',
              fontWeight: 800,
              color: '#fefdfb',
            }}
          >
            The Wrong Jesus
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 16,
              fontSize: 26,
              fontFamily: 'Inter',
              fontWeight: 400,
              color: '#94a3b8',
            }}
          >
            by Dr. Bill Yomes
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 40,
              width: 60,
              height: 3,
              backgroundColor: '#daa33b',
            }}
          />

          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 32,
              fontFamily: 'Playfair Display',
              fontWeight: 700,
              color: '#e8b84e',
            }}
          >
            Launching September 15, 2026
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 22,
              fontSize: 24,
              fontFamily: 'Inter',
              fontWeight: 400,
              color: '#cbd5e1',
            }}
          >
            Join the Launch Team
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
        { name: 'Playfair Display', data: playfairBold, weight: 700, style: 'normal' },
        { name: 'Playfair Display', data: playfairExtraBold, weight: 800, style: 'normal' },
      ],
    }
  )
}
