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
    default: 'Dr. William C.K. Yomes',
    template: '%s | Dr. William C.K. Yomes',
  },
  description:
    'Pastor, author, and Christian apologist. Exploring faith, reason, and the foundations of Christian belief.',
  keywords: ['William Yomes', 'WCKY', 'Christian apologist', 'pastor', 'author', 'theology'],
  openGraph: {
    title: 'Dr. William C.K. Yomes',
    description: 'Pastor, author, and Christian apologist.',
    type: 'website',
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
