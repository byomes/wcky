import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212,168,83,0.15), transparent)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gold-500 text-xs tracking-[0.35em] uppercase font-semibold mb-6">
            Pastor · Author · Apologist
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-8">
            Dr. William
            <br />
            <span className="text-gold-400">C.K. Yomes</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Defending the faith, enriching the mind, and strengthening the church
            through preaching, writing, and apologetics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/books"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
            >
              Explore the Books
            </Link>
            <Link
              href="/speaking"
              className="inline-flex items-center justify-center px-8 py-4 border border-gold-500/50 text-gold-400 text-sm font-bold tracking-wide uppercase hover:border-gold-400 hover:text-gold-300 transition-colors duration-200"
            >
              Book for Speaking
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-gold-600/40 mx-auto" />
        </div>
      </section>

      {/* About Snippet */}
      <section className="bg-navy-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4] bg-navy-800 border border-navy-700 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-slate-600">
                <div className="w-24 h-24 rounded-full bg-navy-700 border border-navy-600" />
                <p className="text-sm">Photo placeholder</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gold-700/8 to-transparent" />
            </div>

            <div>
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                About
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Faith, Reason, and the Life of the Mind
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  Dr. William C.K. Yomes is a pastor, author, and Christian
                  apologist committed to defending the historic Christian faith
                  with intellectual rigor and pastoral warmth.
                </p>
                <p>
                  With decades of ministry experience and advanced theological
                  training, Dr. Yomes bridges the gap between the academy and
                  the local church — making the case for Christianity accessible
                  to both the scholar and the skeptic.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-gold-400 text-sm font-semibold tracking-wide uppercase hover:text-gold-300 transition-colors duration-200"
              >
                Read Full Bio <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="bg-navy-950 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              Published Works
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white">
              Books
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'The Case for the Resurrection',
                subtitle: "Historical Evidence for Christianity's Central Claim",
                year: '2023',
                description:
                  'A rigorous examination of the historical evidence for the resurrection of Jesus Christ, engaging both scholarly and popular audiences.',
              },
              {
                title: 'Faith That Thinks',
                subtitle: 'An Introduction to Christian Apologetics',
                year: '2021',
                description:
                  'An accessible guide to defending the Christian faith, equipping believers to engage thoughtfully with the questions of our age.',
              },
              {
                title: "The Preacher's Creed",
                subtitle: 'Expository Preaching in the 21st Century',
                year: '2019',
                description:
                  'A theology and practice of biblical preaching, calling pastors back to the power of the proclaimed Word of God.',
              },
            ].map(book => (
              <div
                key={book.title}
                className="group border border-navy-700 hover:border-gold-600/40 transition-colors duration-300 p-8 flex flex-col"
              >
                <div className="aspect-[2/3] bg-navy-800 border border-navy-700/60 mb-6 flex items-center justify-center shrink-0">
                  <p className="text-slate-600 text-xs">Cover placeholder</p>
                </div>
                <p className="text-gold-600 text-xs tracking-widest uppercase mb-2">
                  {book.year}
                </p>
                <h3 className="font-serif text-xl font-bold text-white mb-1 group-hover:text-gold-300 transition-colors duration-200 leading-snug">
                  {book.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{book.subtitle}</p>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">
                  {book.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-wide uppercase hover:text-gold-300 transition-colors duration-200"
            >
              View All Books <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-navy-900 py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16">
              <div>
                <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                  Latest Writing
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white">
                  From the Blog
                </h2>
              </div>
              <Link
                href="/blog"
                className="mt-4 sm:mt-0 text-sm text-gold-400 hover:text-gold-300 tracking-wide uppercase font-semibold transition-colors duration-200"
              >
                View All Posts →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block border-t border-navy-700 pt-8 hover:border-gold-700/40 transition-colors duration-300"
                >
                  <p className="text-gold-600 text-xs tracking-widest uppercase mb-3">
                    {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors duration-200 leading-snug">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {post.frontmatter.excerpt}
                  </p>
                  <p className="mt-4 text-gold-500 text-xs tracking-wide uppercase font-semibold group-hover:text-gold-400 transition-colors">
                    Read More →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Speaking CTA */}
      <section className="bg-navy-800 py-24 lg:py-32 border-t border-navy-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Speaking Engagements
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Bring Dr. Yomes to Your Church or Event
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Available for conferences, church services, apologetics seminars, and
            academic events. Dr. Yomes brings scholarly depth and pastoral heart
            to every engagement.
          </p>
          <Link
            href="/speaking"
            className="inline-flex items-center justify-center px-10 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
          >
            Learn About Speaking
          </Link>
        </div>
      </section>
    </>
  )
}
