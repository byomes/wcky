import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Companion Guides',
  description:
    'Free companion guides for books by Dr. William C.K. Yomes, sent straight to your inbox.',
}

export default function GuidesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Free Resources
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Companion Guides
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            Free study guides to go deeper with the books, sent straight to your inbox.
          </p>
        </div>
      </section>

      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-0">

            {/* He Is Risen — live */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 py-16">
              <div className="lg:col-span-1">
                <Image
                  src="/images/HeIsRisen-Cover.jpg"
                  alt="He Is Risen book cover"
                  width={344}
                  height={516}
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-3">
                <span className="inline-block text-xs text-white bg-gold-600 px-3 py-1 tracking-wide font-semibold uppercase mb-4">
                  Free Study Guide
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  He Is Risen
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  Go deeper into the historical evidence for the resurrection that predates
                  the Gospels themselves with a free companion study guide, built for
                  personal study or small groups.
                </p>
                <Link
                  href="/guide/he-is-risen"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
                >
                  Get the Free Guide
                </Link>
              </div>
            </div>

            <div className="border-t border-navy-800" />

            {/* The Wrong Jesus — coming soon */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 py-16">
              <div className="lg:col-span-1">
                <Image
                  src="/images/wrong-jesus-cover-iso.png"
                  alt="The Wrong Jesus book cover"
                  width={344}
                  height={516}
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-3">
                <span className="inline-block text-xs text-gold-500 border border-gold-600/50 px-3 py-1 tracking-wide font-semibold uppercase mb-4">
                  Coming Soon
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  The Wrong Jesus
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg">
                  Many people are devoted — just not to the Jesus of Scripture. A free
                  companion guide to help you tell the difference is in the works. Check
                  back soon.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
