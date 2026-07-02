import { renderBrandImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'Books by Dr. William C.K. Yomes'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderBrandImage({
    eyebrow: 'Books',
    headline: [{ text: 'Books by' }, { text: 'Dr. Yomes', color: 'gold' }],
    tagline: 'Christian apologetics, theology, and preaching.',
    goldLine: 'Explore the full library.',
    media: { type: 'circle', src: 'public/images/Bill-CR.png' },
  })
}
