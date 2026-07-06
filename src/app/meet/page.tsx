import type { Metadata } from 'next'
import MeetClient from './MeetClient'

export const metadata: Metadata = {
  title: 'Book an Appointment',
  openGraph: {
    title: 'Book an Appointment with Dr. Bill Yomes',
    images: [
      {
        url: 'https://williamckyomes.com/images/TWJ_Launch_2.PNG',
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://williamckyomes.com/images/TWJ_Launch_2.PNG',
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
  },
}

export default function MeetPage() {
  return <MeetClient />
}
