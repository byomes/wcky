import { renderBrandImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'Blog: Dr. William C.K. Yomes'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderBrandImage({
    eyebrow: 'Blog',
    headline: [{ text: 'Articles &' }, { text: 'Reflections', color: 'gold' }],
    tagline: 'Faith, theology, and apologetics from Dr. William C.K. Yomes.',
    goldLine: 'New reflections on living out a serious faith.',
    media: { type: 'circle', src: 'public/images/Bill-CR.png' },
  })
}
