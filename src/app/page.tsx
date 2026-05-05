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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-navy-950">
        {/* Background photo — offset right so Bill's face is visible */}
        <Image
          src="/images/bill-hero.png"
          alt=""
          fill
          priority
          className="object-cover object-right"
        />
        {/* Dark navy overlay — stronger on the left for text legibility */}
        <div className="absolute inset-0 bg-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-transparent" />

        {/* Text — left-aligned */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <p className="text-white/70 text-xs tracking-[0.35em] uppercase font-semibold mb-6">
              Pastor. Apologist. Author.
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6">
              Dr. William
              <br />
              C.K. Yomes
            </h1>
            <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10">
              Theology, apologetics, and resources for Christians who take their
              faith seriously.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/theology"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
              >
                Theology Books
              </Link>
              <Link
                href="/dreamstone"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/40 text-white text-sm font-bold tracking-wide uppercase hover:border-white/70 hover:bg-white/10 transition-colors duration-200"
              >
                Dreamstone Chronicles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-navy-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4] bg-navy-800 border border-navy-700 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-slate-600">
                <div className="w-24 h-24 rounded-full bg-navy-700 border border-navy-600" />
                <p className="text-sm">Photo placeholder</p>
              </div>
            </div>

            <div>
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                About
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Where Theology Puts Its Jeans On
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                William CK Yomes is a husband, father, pastor, apologist,
                daydreamer, guitar player, and lifelong ice cream superfan. He
                has spent more than twenty years in local church ministry,
                earned a doctorate in Theology and Apologetics, and believes
                the local church is where theology puts its jeans on.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                He serves as Senior Pastor of Catalyst Community Church in
                Wilmington, Delaware, founded Adelphos Academy to put
                theological education within reach of everyday believers, and
                leads Faith Makes Sense — a ministry devoted to showing that
                Christian faith is intellectually defensible.
              </p>
              <p className="text-slate-400 leading-relaxed">
                He writes everyday theology for the church and children&apos;s
                fiction for his family.
              </p>
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
              <p className="text-slate-400 leading-relaxed">
                A new book from William CK Yomes. Sign up below to be notified
                when it&apos;s available.
              </p>
            </div>

            {/* Book cover placeholder */}
            <div className="aspect-[2/3] max-w-sm mx-auto lg:mx-0 bg-navy-800 border border-navy-700 flex items-center justify-center">
              <p className="text-slate-600 text-xs text-center px-6">
                Book cover
                <br />
                placeholder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="bg-navy-950 py-24 lg:py-32 border-t border-navy-800">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Stay Connected
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            New Books. New Articles. New Thinking.
          </h2>
          <p className="text-slate-400 text-lg mb-10">Keep Me in the Loop</p>

          {/* Replace action URL with your Mailchimp/ConvertKit/Formspree endpoint */}
          <form
            action="#"
            method="POST"
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              className="flex-1 bg-navy-800 border border-navy-600 text-white px-5 py-4 text-sm focus:outline-none focus:border-gold-600 transition-colors placeholder-slate-600"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200 whitespace-nowrap"
            >
              Sign Me Up
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
