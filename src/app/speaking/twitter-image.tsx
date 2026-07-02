import { renderBrandImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'Book Dr. William C.K. Yomes to Speak'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderBrandImage({
    eyebrow: 'Speaking',
    headline: [{ text: 'Bring Dr. Yomes' }, { text: 'to Your Event', color: 'gold' }],
    tagline: 'Book Dr. William C.K. Yomes for your church, conference, or academic event.',
    goldLine: 'Apologetics, theology, and preaching topics available.',
    media: { type: 'circle', src: 'public/images/Bill-CR.png' },
  })
}
