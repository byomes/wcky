import type { Metadata } from 'next'
import MeetClient from './MeetClient'

export const metadata: Metadata = {
  title: 'Book an Appointment',
  openGraph: {
    title: 'Book an Appointment with Dr. Bill Yomes',
    images: ['/images/og-meet.png'],
  },
  twitter: {
    images: ['/images/og-meet.png'],
  },
}

export default function MeetPage() {
  return <MeetClient />
}
