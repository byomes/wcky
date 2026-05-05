import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/posts'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const labels = [
    ...(post.frontmatter.categories ?? []),
    ...(post.frontmatter.category ? [post.frontmatter.category] : []),
    ...(post.frontmatter.tags ?? []),
  ]

  return (
    <>
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold-600 text-sm tracking-wide hover:text-gold-400 transition-colors mb-8"
          >
            ← Back to Blog
          </Link>

          {labels.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {labels.map(label => (
                <span
                  key={label}
                  className="text-xs text-gold-600 border border-gold-700/30 px-3 py-1"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {post.frontmatter.title}
          </h1>

          <div className="flex items-center gap-4 text-slate-500 text-sm">
            <span>
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {post.frontmatter.author && (
              <>
                <span>·</span>
                <span>{post.frontmatter.author}</span>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <article
            className="
              prose prose-invert prose-lg max-w-none
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-white
              prose-p:text-slate-400 prose-p:leading-relaxed
              prose-a:text-gold-400 prose-a:no-underline hover:prose-a:text-gold-300 prose-a:transition-colors
              prose-strong:text-white prose-strong:font-semibold
              prose-blockquote:border-l-2 prose-blockquote:border-gold-500 prose-blockquote:text-slate-400 prose-blockquote:not-italic prose-blockquote:pl-6
              prose-ul:text-slate-400 prose-ol:text-slate-400
              prose-li:marker:text-gold-600
              prose-hr:border-navy-700
              prose-code:text-gold-400 prose-code:bg-navy-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      <section className="bg-navy-950 py-12 border-t border-navy-800">
        <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-wide uppercase hover:text-gold-300 transition-colors"
          >
            ← All Posts
          </Link>
          <Link
            href="/connect"
            className="inline-flex items-center gap-2 text-slate-500 text-sm hover:text-gold-400 transition-colors"
          >
            Questions or feedback? Get in touch →
          </Link>
        </div>
      </section>
    </>
  )
}
