import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Dr. William C.K. Yomes | Pastor. Apologist. Author.',
    template: '%s | Dr. William C.K. Yomes',
  },
  description:
    'Dr. William C.K. Yomes — pastor, apologist, and author. Theology, apologetics, and resources for Christians who take their faith seriously.',
  keywords: ['William Yomes', 'WCKY', 'Christian apologist', 'pastor', 'author', 'theology', 'Faith Makes Sense', 'Adelphos Academy'],
  openGraph: {
    title: 'Dr. William C.K. Yomes | Pastor. Apologist. Author.',
    description: 'Dr. William C.K. Yomes — pastor, apologist, and author. Theology, apologetics, and resources for Christians who take their faith seriously.',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Dr. William C.K. Yomes — Pastor. Apologist. Author.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-default.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
<Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
