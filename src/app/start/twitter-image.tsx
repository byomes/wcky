import { renderBrandImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'Start Here — Dr. William C.K. Yomes'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderBrandImage({
    eyebrow: 'Start Here',
    headline: [{ text: 'Dr. William' }, { text: 'C.K. Yomes', color: 'gold' }],
    tagline: 'Pastor. Apologist. Author.',
    goldLine: 'Links, resources, and free downloads.',
    media: { type: 'circle', src: 'public/images/Bill-CR.png' },
  })
}
