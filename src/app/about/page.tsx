import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Dr. William C.K. Yomes — pastor, author, and Christian apologist.',
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            About
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
            Pastor, Author,
            <br />
            <span className="text-gold-400">and Apologist</span>
          </h1>
        </div>
      </section>

      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] bg-navy-800 border border-navy-700 flex items-center justify-center mb-8">
                <div className="text-center text-slate-600">
                  <div className="w-20 h-20 rounded-full bg-navy-700 border border-navy-600 mx-auto mb-3" />
                  <p className="text-sm">Photo placeholder</p>
                </div>
              </div>

              <div className="space-y-0">
                {[
                  { label: 'Role', value: 'Senior Pastor' },
                  { label: 'Church', value: 'Placeholder Church' },
                  { label: 'Location', value: 'City, State' },
                  { label: 'Degree', value: 'Ph.D., Theology' },
                  { label: 'Books', value: '3 Published' },
                ].map(fact => (
                  <div
                    key={fact.label}
                    className="flex gap-4 py-3 border-b border-navy-800 text-sm"
                  >
                    <span className="text-gold-600 font-semibold w-24 shrink-0">
                      {fact.label}
                    </span>
                    <span className="text-slate-400">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl font-bold text-white mb-6">
                A Life Devoted to Truth
              </h2>
              <div className="space-y-5 text-slate-400 leading-relaxed mb-10">
                <p>
                  Dr. William C.K. Yomes has served as a pastor, teacher, and
                  defender of the Christian faith for over [X] years. His
                  ministry is marked by a deep commitment to biblical preaching,
                  rigorous scholarship, and a pastor&apos;s heart for the flock
                  of God.
                </p>
                <p>
                  Placeholder biography text. Dr. Yomes received his academic
                  training from [institutions] and holds advanced degrees in
                  [fields]. His dissertation explored [topic], and his academic
                  work has been published in [journals and venues].
                </p>
                <p>
                  Beyond the academy, Dr. Yomes is passionate about equipping
                  ordinary believers to engage with the intellectual challenges
                  to their faith. His books and speaking ministry aim to show
                  that Christian faith is not only personally transformative but
                  also historically grounded and intellectually credible.
                </p>
              </div>

              <h2 className="font-serif text-3xl font-bold text-white mb-5">
                Academic Credentials
              </h2>
              <ul className="text-slate-400 space-y-2 mb-10 text-sm">
                <li>Ph.D., [Field], [Institution], [Year]</li>
                <li>Th.M., [Field], [Institution], [Year]</li>
                <li>M.Div., [Institution], [Year]</li>
                <li>B.A., [Field], [Institution], [Year]</li>
              </ul>

              <h2 className="font-serif text-3xl font-bold text-white mb-5">
                Ministry &amp; Affiliations
              </h2>
              <p className="text-slate-400 leading-relaxed mb-10">
                Placeholder text about ministry affiliations, denominations,
                organizations, boards, or other relevant associations that
                Dr. Yomes is involved with.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/books"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
                >
                  View Books
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border border-gold-500/50 text-gold-400 text-sm font-bold tracking-wide uppercase hover:border-gold-400 hover:text-gold-300 transition-colors duration-200"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
