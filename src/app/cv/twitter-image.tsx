import { renderBrandImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'Curriculum Vitae: William C.K. Yomes'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderBrandImage({
    eyebrow: 'Curriculum Vitae',
    headline: [{ text: 'William C.K.' }, { text: 'Yomes', color: 'gold' }],
    tagline: 'DMin, MA. Pastor, Apologist, Author.',
    goldLine: 'Academic background & ministry experience.',
    media: { type: 'circle', src: 'public/images/Bill-CR.png' },
  })
}
