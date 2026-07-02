import { ImageResponse } from 'next/og'
import fs from 'node:fs/promises'
import path from 'node:path'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const FONTS_DIR = path.join(process.cwd(), 'src/app/thewrongjesus/fonts')

type HeadlineLine = { text: string; color?: 'white' | 'gold' }

type Media =
  | { type: 'circle'; src: string }
  | { type: 'portrait'; src: string }
  | { type: 'square'; src: string }

export type BrandImageConfig = {
  eyebrow: string
  headline: HeadlineLine[]
  tagline: string
  goldLine: string
  media: Media
}

const MEDIA_BOX: Record<Media['type'], { width: number; height: number }> = {
  circle: { width: 380, height: 380 },
  portrait: { width: 306, height: 490 },
  square: { width: 340, height: 340 },
}

async function loadFonts() {
  const [interRegular, interSemiBold, playfairBold, playfairExtraBold] = await Promise.all([
    fs.readFile(path.join(FONTS_DIR, 'Inter-Regular.ttf')),
    fs.readFile(path.join(FONTS_DIR, 'Inter-SemiBold.ttf')),
    fs.readFile(path.join(FONTS_DIR, 'PlayfairDisplay-Bold.ttf')),
    fs.readFile(path.join(FONTS_DIR, 'PlayfairDisplay-ExtraBold.ttf')),
  ])
  return [
    { name: 'Inter', data: interRegular, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: interSemiBold, weight: 600 as const, style: 'normal' as const },
    { name: 'Playfair Display', data: playfairBold, weight: 700 as const, style: 'normal' as const },
    { name: 'Playfair Display', data: playfairExtraBold, weight: 800 as const, style: 'normal' as const },
  ]
}

export async function renderBrandImage(config: BrandImageConfig) {
  const [fonts, mediaFile] = await Promise.all([
    loadFonts(),
    fs.readFile(path.join(process.cwd(), config.media.src)),
  ])

  const mediaSrc = `data:image/png;base64,${mediaFile.toString('base64')}`
  const box = MEDIA_BOX[config.media.type]

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
            width: box.width,
            height: box.height,
            borderRadius: config.media.type === 'circle' ? '50%' : 0,
            overflow: 'hidden',
            boxShadow:
              config.media.type === 'portrait'
                ? '0 40px 80px rgba(0, 0, 0, 0.55)'
                : '0 30px 70px rgba(0, 0, 0, 0.55)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaSrc}
            width={box.width}
            height={box.height}
            style={{ width: box.width, height: box.height, objectFit: 'cover' }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 64,
            width: 616,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              fontFamily: 'Inter',
              fontWeight: 600,
              letterSpacing: 5,
              textTransform: 'uppercase',
              color: '#daa33b',
            }}
          >
            {config.eyebrow}
          </div>

          {config.headline.map((line, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                marginTop: i === 0 ? 20 : 0,
                fontSize: 62,
                lineHeight: 1.1,
                fontFamily: 'Playfair Display',
                fontWeight: 800,
                color: line.color === 'gold' ? '#e8b84e' : '#fefdfb',
              }}
            >
              {line.text}
            </div>
          ))}

          <div
            style={{
              display: 'flex',
              marginTop: 22,
              width: 616,
              fontSize: 26,
              lineHeight: 1.4,
              fontFamily: 'Inter',
              fontWeight: 400,
              color: '#cbd5e1',
            }}
          >
            {config.tagline}
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 32,
              width: 60,
              height: 3,
              backgroundColor: '#daa33b',
            }}
          />

          <div
            style={{
              display: 'flex',
              marginTop: 24,
              width: 616,
              fontSize: 28,
              lineHeight: 1.3,
              fontFamily: 'Playfair Display',
              fontWeight: 700,
              color: '#e8b84e',
            }}
          >
            {config.goldLine}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  )
}
