import { renderBrandImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'From the Blog — Dr. William C.K. Yomes'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

// Generic branding shared by every blog post rather than one dynamic image
// per slug — see project summary for the rationale.
export default function Image() {
  return renderBrandImage({
    eyebrow: 'From the Blog',
    headline: [{ text: 'New from' }, { text: 'the Blog', color: 'gold' }],
    tagline: 'Faith, theology, and apologetics from Dr. William C.K. Yomes.',
    goldLine: 'Read the full article at williamckyomes.com',
    media: { type: 'circle', src: 'public/images/Bill-CR.png' },
  })
}
