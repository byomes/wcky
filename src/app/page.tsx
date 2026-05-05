import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: {
    absolute: 'Dr. William C.K. Yomes | Pastor. Apologist. Author.',
  },
  description:
    'Dr. William C.K. Yomes — pastor, apologist, and author. Theology, apologetics, and resources for Christians who take their faith seriously.',
}

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-950 overflow-hidden">
        <div className="relative w-full h-[70vh] lg:h-screen">
          <Image
            src="/images/Bill-HeroRC2.png"
            alt="Dr. William C.K. Yomes"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 flex items-end lg:items-center justify-end bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-navy-950/20 lg:to-navy-950/80">
            <div className="w-full lg:w-1/2 xl:w-2/5 px-8 lg:px-16 xl:px-20 text-right pb-16 lg:pb-0">
              <p className="text-white/70 text-xs tracking-[0.35em] uppercase font-semibold mb-6">Pastor. Apologist. Author.</p>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6">Dr. William<br />C.K. Yomes</h1>
              <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10">For believers and seekers who refuse to check their brains at the door.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Link href="/start" className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200">Get the Free Resource</Link>
                <Link href="/arc" className="inline-flex items-center justify-center px-8 py-4 border border-white/40 text-white text-sm font-bold tracking-wide uppercase hover:border-white/70 hover:bg-white/10 transition-colors duration-200">Join the Launch Team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-navy-950 py-24 lg:py-32">
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

      {/* Coming Soon: The Wrong Jesus */}
      <section className="bg-navy-900 py-24 lg:py-32 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <Image
                src="/images/wrong-jesus-cover-iso.png"
                alt="The Wrong Jesus by Dr. William C.K. Yomes"
                width={400}
                height={600}
                className="w-full h-auto drop-shadow-2xl max-w-[260px] mx-auto lg:mx-0"
              />
            </div>
            <div>
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                Coming Soon
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                The Wrong Jesus
              </h2>
              <p className="text-slate-300 text-xl leading-relaxed mb-6 font-serif italic">
                When the Worship Is Real But the Jesus Is Wrong
              </p>
              <p className="text-slate-400 leading-relaxed mb-10">
                What happens when sincerity isn&apos;t enough? This book confronts
                the most dangerous counterfeit in the church — a Jesus who feels
                right but isn&apos;t. Sign up to be the first to know when it&apos;s
                available.
              </p>
              <Link
                href="/arc"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
              >
                Join the Launch Team →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free Resource */}
      <section className="bg-navy-950 py-24 lg:py-32 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative max-w-sm mx-auto lg:mx-0 order-first lg:order-last">
              <Image
                src="/images/lead-magnet.png"
                alt="Study the Bible Like a Pastor — Free Guide"
                width={400}
                height={520}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
            <div className="order-last lg:order-first">
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                Free Resource
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Study the Bible Like a Pastor
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                A practical guide to reading, understanding, and applying
                Scripture — built for everyday believers who want to go deeper
                than a devotional and actually know what the Bible says.
              </p>
              <Link href="/start" className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200">
                Get the Free Resource →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
