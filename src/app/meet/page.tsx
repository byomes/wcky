import type { Metadata } from 'next'
import MeetClient from './MeetClient'

export const metadata: Metadata = {
  title: 'Book an Appointment',
  openGraph: {
    title: 'Book an Appointment with Dr. Bill Yomes',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function MeetPage() {
  return <MeetClient />
}
