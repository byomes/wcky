import { renderBrandImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'The Dreamstone Chronicles by William C.K. Yomes'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderBrandImage({
    eyebrow: 'The Dreamstone Chronicles',
    headline: [{ text: 'The Dreamstone' }, { text: 'Chronicles', color: 'gold' }],
    tagline: "A children's fantasy series. Written for the family.",
    goldLine: 'Book One: The Blackstone Curse',
    media: { type: 'square', src: 'public/images/DS1-cover.png' },
  })
}
