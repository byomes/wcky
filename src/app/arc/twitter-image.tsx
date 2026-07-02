import { renderBrandImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'Join the ARC Team for The Wrong Jesus'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderBrandImage({
    eyebrow: 'The Wrong Jesus',
    headline: [{ text: 'Join the ARC' }, { text: 'Team', color: 'gold' }],
    tagline: 'Read early. Review honestly. Help get the word out.',
    goldLine: 'Launching September 15, 2026',
    media: { type: 'portrait', src: 'public/images/wrong-jesus-cover-iso.png' },
  })
}
