import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getPostLabels } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles and reflections by Dr. William C.K. Yomes on faith, theology, and apologetics.',
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

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Writing
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
            Blog
          </h1>
        </div>
      </section>

      <section className="bg-navy-900 py-16 lg:py-24 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-slate-500 text-lg">No posts published yet.</p>
              <p className="text-slate-600 text-sm mt-2">Check back soon.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group block py-10 border-b border-navy-800 hover:border-gold-700/30 transition-colors duration-300 ${
                    index === 0 ? 'border-t border-navy-800' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      {(() => {
                        const labels = getPostLabels(post.frontmatter)
                        return labels.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {labels.map(label => (
                              <span
                                key={label}
                                className="text-xs text-gold-700 border border-gold-800/40 px-2 py-0.5"
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                        ) : null
                      })()}
                      <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors duration-200 leading-snug">
                        {post.frontmatter.title}
                      </h2>
                      <p className="text-slate-400 leading-relaxed">
                        {post.frontmatter.excerpt}
                      </p>
                    </div>
                    <div className="sm:text-right shrink-0 sm:pl-8">
                      <p className="text-slate-500 text-sm whitespace-nowrap">
                        {new Date(post.frontmatter.date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-gold-500 text-xs tracking-wide uppercase font-semibold group-hover:text-gold-400 transition-colors">
                    Read Article →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
