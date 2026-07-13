import { renderBrandImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const runtime = 'nodejs'
export const alt = 'Book an Appointment with Dr. Bill'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderBrandImage({
    eyebrow: 'Need to Talk?',
    headline: [{ text: 'Book an Appointment' }, { text: 'with Dr. Bill', color: 'gold' }],
    tagline: 'Virtual or in-person meetings with Dr. Bill.',
    goldLine: 'Pick a time that works for you.',
  })
}
