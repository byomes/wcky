import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Books',
  description:
    'Books by Dr. William C.K. Yomes on Christian apologetics, theology, and preaching.',
}

const books = [
  {
    id: 1,
    title: 'The Case for the Resurrection',
    subtitle: "Historical Evidence for Christianity's Central Claim",
    year: '2023',
    publisher: 'Placeholder Publisher',
    description:
      'A rigorous examination of the historical evidence for the resurrection of Jesus Christ. Drawing on the latest New Testament scholarship and historiographical methodology, Dr. Yomes presents a compelling case that the resurrection is not merely a matter of faith but of historical fact.',
    buyLinks: { amazon: '#', barnesNoble: '#' },
    tags: ['Apologetics', 'History', 'New Testament'],
  },
  {
    id: 2,
    title: 'Faith That Thinks',
    subtitle: 'An Introduction to Christian Apologetics',
    year: '2021',
    publisher: 'Placeholder Publisher',
    description:
      'An accessible guide to defending the Christian faith, equipping believers to engage thoughtfully with the most pressing intellectual challenges of our time. Ideal for small groups, college students, and anyone who wants to know not just what they believe, but why.',
    buyLinks: { amazon: '#', barnesNoble: '#' },
    tags: ['Apologetics', 'Introduction', 'Faith'],
  },
  {
    id: 3,
    title: "The Preacher's Creed",
    subtitle: 'Expository Preaching in the 21st Century',
    year: '2019',
    publisher: 'Placeholder Publisher',
    description:
      'A theology and practice of biblical preaching, calling pastors back to the power and centrality of the proclaimed Word of God. Written from decades of pastoral experience, this book combines deep theological conviction with practical wisdom for the modern pulpit.',
    buyLinks: { amazon: '#', barnesNoble: '#' },
    tags: ['Preaching', 'Pastoral Ministry', 'Theology'],
  },
]

export default function BooksPage() {
  return (
    <>
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Published Works
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
            Books by
            <br />
            <span className="text-gold-400">Dr. Yomes</span>
          </h1>
        </div>
      </section>

      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-0">
            {books.map((book, index) => (
              <div
                key={book.id}
                className={`grid grid-cols-1 lg:grid-cols-4 gap-10 py-16 ${
                  index > 0 ? 'border-t border-navy-800' : ''
                }`}
              >
                <div className="lg:col-span-1">
                  <div className="aspect-[2/3] bg-navy-800 border border-navy-700 flex items-center justify-center">
                    <p className="text-slate-600 text-xs text-center px-4">
                      Book cover
                      <br />
                      placeholder
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {book.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs text-gold-600 border border-gold-700/30 px-3 py-1 tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm mb-2">
                    {book.year} · {book.publisher}
                  </p>
                  <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                    {book.title}
                  </h2>
                  <p className="text-slate-500 text-lg mb-6">{book.subtitle}</p>
                  <p className="text-slate-400 leading-relaxed mb-8">
                    {book.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={book.buyLinks.amazon}
                      className="inline-flex items-center justify-center px-6 py-3 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
                    >
                      Buy on Amazon
                    </a>
                    <a
                      href={book.buyLinks.barnesNoble}
                      className="inline-flex items-center justify-center px-6 py-3 border border-gold-500/50 text-gold-400 text-sm font-bold tracking-wide uppercase hover:border-gold-400 hover:text-gold-300 transition-colors duration-200"
                    >
                      Barnes &amp; Noble
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-16 border-t border-navy-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-lg mb-6">
            Interested in bulk orders for your church or organization?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border border-gold-500/50 text-gold-400 text-sm font-bold tracking-wide uppercase hover:border-gold-400 hover:text-gold-300 transition-colors duration-200"
          >
            Contact for Bulk Orders
          </Link>
        </div>
      </section>
    </>
  )
}
