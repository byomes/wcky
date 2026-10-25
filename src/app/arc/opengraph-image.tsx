import { renderBrandImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'Advance Reader Corps'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderBrandImage({
    eyebrow: 'Advance Reader Corps',
    headline: [{ text: 'Wanna Join' }, { text: 'The ARC?', color: 'gold' }],
    tagline: 'Read early. Give honest feedback. Help a book find its footing.',
    goldLine: 'Be first to know when the next team opens',
  })
}
