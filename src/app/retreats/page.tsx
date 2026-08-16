import type { Metadata } from 'next'
import RetreatsContent from './RetreatsContent'

export const metadata: Metadata = {
  title: 'Pastor Retreat Getaways — Within 8 Hours of Newark, DE',
  robots: { index: false, follow: false },
}

export default function RetreatsPage() {
  return <RetreatsContent />
}
