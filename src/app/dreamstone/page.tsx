import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Dreamstone Chronicles',
  description:
    'The Dreamstone Chronicles — a children\'s fantasy series by William CK Yomes. Written for the family.',
}

export default function DreastonePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-950 pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 40% at 70% 60%, rgba(212,168,83,0.2), transparent)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Children&apos;s Fantasy Series
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-white leading-tight mb-4">
            The Dreamstone
            <br />
            <span className="text-gold-400">Chronicles</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed mb-6">
            A children&apos;s fantasy series. Written for the family.
          </p>
          <span className="inline-flex items-center gap-2 text-xs text-gold-500 border border-gold-700/40 px-4 py-2 tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
            Series in Progress
          </span>
        </div>
      </section>

      {/* About the Series */}
      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              About the Series
            </p>
            <p className="text-slate-300 text-xl leading-relaxed mb-5">
              The Dreamstone Chronicles is a fantasy fiction series born out of
              bedtime stories and the belief that great stories point to a
              greater Story.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Written for children, enjoyed by the whole family.
            </p>
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="bg-navy-950 py-16 lg:py-24 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-10">
            The Books
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder book card */}
            <div className="border border-navy-700 p-6 flex flex-col">
              <div className="aspect-[2/3] bg-navy-800 border border-navy-700/60 mb-5 flex items-center justify-center">
                <p className="text-slate-600 text-xs text-center px-3">
                  Cover
                  <br />
                  placeholder
                </p>
              </div>
              <span className="inline-block text-xs text-gold-600 border border-gold-700/30 px-2 py-0.5 tracking-wide uppercase mb-3 self-start">
                Coming Soon
              </span>
              <h3 className="font-serif text-lg font-bold text-white leading-snug">
                Title Placeholder
              </h3>
              <p className="text-slate-500 text-sm mt-1">Book 1</p>
            </div>

            {/* Future slots */}
            {[2, 3, 4].map(n => (
              <div
                key={n}
                className="border border-navy-800/60 border-dashed p-6 flex flex-col items-center justify-center aspect-[2/3] max-h-80"
              >
                <p className="text-navy-600 text-xs tracking-widest uppercase font-semibold">
                  Book {n}
                </p>
                <p className="text-navy-700 text-xs mt-1">Coming</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notify CTA */}
      <section className="bg-navy-900 py-16 lg:py-20 border-t border-navy-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-slate-400 leading-relaxed mb-6 text-lg">
            Want to know when the first book is available?
          </p>
          <Link
            href="/start"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
          >
            Get Updates
          </Link>
        </div>
      </section>
    </>
  )
}
