import { renderBrandImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'The Wrong Jesus: Press Kit'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderBrandImage({
    eyebrow: 'Press Kit',
    headline: [{ text: 'The' }, { text: 'Wrong Jesus', color: 'gold' }],
    tagline: 'Am I following Jesus, or am I following what I want Him to be?',
    goldLine: 'Review copies & media inquiries available.',
    media: { type: 'portrait', src: 'public/images/wrong-jesus-cover-iso.png' },
  })
}
