import { ImageResponse } from 'next/og'
import fs from 'node:fs/promises'
import path from 'node:path'

export const runtime = 'nodejs'
export const alt = 'About Dr. William C.K. Yomes — Pastor, Apologist, and Author'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const FONTS_DIR = path.join(process.cwd(), 'src/app/thewrongjesus/fonts')

export default async function Image() {
  const [interRegular, interSemiBold, playfairBold, playfairExtraBold, photo] = await Promise.all([
    fs.readFile(path.join(FONTS_DIR, 'Inter-Regular.ttf')),
    fs.readFile(path.join(FONTS_DIR, 'Inter-SemiBold.ttf')),
    fs.readFile(path.join(FONTS_DIR, 'PlayfairDisplay-Bold.ttf')),
    fs.readFile(path.join(FONTS_DIR, 'PlayfairDisplay-ExtraBold.ttf')),
    fs.readFile(path.join(process.cwd(), 'public/images/Bill-CR.png')),
  ])

  const photoSrc = `data:image/png;base64,${photo.toString('base64')}`

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
            width: 380,
            height: 380,
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.55)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            width={380}
            height={380}
            style={{ width: 380, height: 380, objectFit: 'cover' }}
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
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#daa33b',
            }}
          >
            About
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 20,
              fontSize: 60,
              lineHeight: 1.1,
              fontFamily: 'Playfair Display',
              fontWeight: 800,
              color: '#fefdfb',
            }}
          >
            Pastor, Apologist,
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              lineHeight: 1.1,
              fontFamily: 'Playfair Display',
              fontWeight: 800,
              color: '#e8b84e',
            }}
          >
            and Author
          </div>

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
            Senior Pastor of Catalyst Community Church and founding apologist
            of Faith Makes Sense.
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
            Free apologetics &amp; theological education for the global church.
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
