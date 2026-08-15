import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import StartCTA from '@/components/StartCTA'

export const metadata: Metadata = {
  title: 'Start Here',
  description:
    'Links, resources, and free downloads from Dr. William C.K. Yomes: pastor, apologist, and author.',
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

const links = [
  {
    label: 'Catalyst Community Church',
    href: 'https://catalyst302.com',
    external: true,
  },
  {
    label: 'Adelphos Academy',
    href: 'https://adelphosacademy.com',
    external: true,
  },
  {
    label: 'Faith Makes Sense',
    href: 'https://faithmakessense.com',
    external: true,
  },
  {
    label: 'Read the Blog',
    href: '/blog',
    external: false,
  },
  {
    label: 'Books',
    href: '/books',
    external: false,
  },
]

export default function StartPage() {
  return (
    <section className="bg-navy-950 min-h-screen pt-28 pb-20">
      <div className="max-w-lg mx-auto px-6">

        {/* Profile */}
        <div className="text-center mb-10">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold-500 mx-auto mb-4">
            <Image
              src="/images/Bill-CR.png"
              alt="Dr. William C.K. Yomes"
              fill
              className="object-cover object-top"
            />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white mb-1">
            Dr. William C.K. Yomes
          </h1>
          <p className="text-gold-500 text-xs tracking-[0.25em] uppercase">
            Pastor. Apologist. Author.
          </p>
        </div>

        {/* Link Cards */}
        <nav className="flex flex-col gap-3 mb-10">
          {links.map(link =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-6 py-4 bg-navy-800 border border-navy-700 hover:border-gold-500/50 hover:bg-navy-700 text-white hover:text-gold-300 transition-all duration-200 group"
              >
                <span className="font-semibold text-sm tracking-wide">{link.label}</span>
                <span className="text-gold-600 group-hover:text-gold-400 transition-colors text-lg leading-none">→</span>
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center justify-between w-full px-6 py-4 bg-navy-800 border border-navy-700 hover:border-gold-500/50 hover:bg-navy-700 text-white hover:text-gold-300 transition-all duration-200 group"
              >
                <span className="font-semibold text-sm tracking-wide">{link.label}</span>
                <span className="text-gold-600 group-hover:text-gold-400 transition-colors text-lg leading-none">→</span>
              </Link>
            )
          )}
        </nav>

        {/* Free Resource */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-navy-700" />
            <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold">
              Free Resource
            </p>
            <div className="flex-1 h-px bg-navy-700" />
          </div>
          <StartCTA />
        </div>

      </div>
    </section>
  )
}
