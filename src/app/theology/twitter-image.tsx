import { renderBrandImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'Theology & Apologetics — Books by Dr. William C.K. Yomes'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderBrandImage({
    eyebrow: 'Theology & Apologetics',
    headline: [{ text: 'Theology &' }, { text: 'Apologetics', color: 'gold' }],
    tagline:
      'Books written for the church, because theology belongs to everyone, not just the academy.',
    goldLine: 'Explore the full library.',
    media: { type: 'circle', src: 'public/images/Bill-CR.png' },
  })
}
