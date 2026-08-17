import type { Metadata } from 'next'
import RetreatsBoard from './RetreatsBoard'

export const metadata: Metadata = {
  title: 'Retreats',
  description: 'Family retreat lodging, discovered and curated for the Yomes family.',
  robots: { index: false, follow: false },
}

export default function RetreatsPage() {
  return (
    <>
      <section className="bg-navy-950 pt-32 pb-12 border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Family Planning
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Retreats
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Lodging Watson finds, and lodging we find, in one place — search, save
            the ones worth a second look, star the favorites.
          </p>
        </div>
      </section>

      <RetreatsBoard />
    </>
  )
}
