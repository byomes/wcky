import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Theology & Apologetics',
  description:
    'Books by Dr. William C.K. Yomes — theology and apologetics written for the church.',
}

export default function TheologyPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Published Works
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Theology &amp; Apologetics
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Books written for the church — because theology belongs to everyone,
            not just the academy.
          </p>
        </div>
      </section>

      {/* Books */}
      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-0">

          {/* Book 1: He Is Risen — Published */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 py-16">
            <div className="lg:col-span-1">
              <div className="aspect-[2/3] bg-navy-800 border border-navy-700 flex items-center justify-center">
                <p className="text-slate-600 text-xs text-center px-4">
                  Cover
                  <br />
                  placeholder
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <span className="inline-block text-xs text-white bg-gold-600 px-3 py-1 tracking-wide font-semibold uppercase mb-4">
                Published
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                He Is Risen
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                A theological and apologetic case for the bodily resurrection
                of Jesus Christ.
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
              >
                Get the Book
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-navy-800" />

          {/* Book 2: The Wrong Jesus — Coming Soon */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 py-16">
            <div className="lg:col-span-1">
              <div className="aspect-[2/3] bg-navy-800 border border-navy-700 flex items-center justify-center relative overflow-hidden">
                <p className="text-slate-600 text-xs text-center px-4">
                  Cover
                  <br />
                  placeholder
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <span className="inline-block text-xs text-gold-500 border border-gold-600/50 px-3 py-1 tracking-wide font-semibold uppercase mb-4">
                Coming Soon
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                The Wrong Jesus
              </h2>
              <p className="text-slate-500 text-xl font-serif italic mb-5">
                When the Worship Is Real But the Jesus Is Wrong
              </p>
              <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                A new book from Dr. William C.K. Yomes. Sign up to be notified
                when it&apos;s available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/arc"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
                >
                  Join the ARC Team
                </Link>
                <Link
                  href="/arc"
                  className="inline-flex items-center justify-center px-8 py-4 border border-gold-500/50 text-gold-400 text-sm font-bold tracking-wide uppercase hover:border-gold-400 hover:text-gold-300 transition-colors duration-200"
                >
                  Notify Me at Launch
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
