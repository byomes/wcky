import type { Metadata } from 'next'
import TWJPressKitClient from './TWJPressKitClient'

export const metadata: Metadata = {
  openGraph: {
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

export default function TwjPressPage() {
  return <TWJPressKitClient />
}
