import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import path from 'path'
import fs from 'fs'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import LoginForm from './LoginForm'
import ManuscriptReader from './ManuscriptReader'

interface Chapter {
  id: string
  title: string
  html: string
}

interface BookMeta {
  title: string
  slug: string
  description: string
}

async function kvGet(key: string): Promise<string | null> {
  const url = process.env.VERCEL_KV_REST_API_URL
  const token = process.env.VERCEL_KV_REST_API_TOKEN
  if (!url || !token) return null
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(['GET', key]),
      cache: 'no-store',
    })
    const data = await res.json()
    return data.result ?? null
  } catch {
    return null
  }
}

async function getBookMeta(slug: string): Promise<BookMeta | null> {
  const raw = await kvGet(`book:${slug}:meta`)
  if (!raw) return null
  return typeof raw === 'string' ? JSON.parse(raw) : raw as BookMeta
}

// Chapters live at src/content/books/<slug>/chapters/*.md, sorted alphabetically.
// The first # heading in each file is used as the chapter title.
async function loadChapters(slug: string): Promise<Chapter[]> {
  const chaptersDir = path.join(process.cwd(), 'src/content/books', slug, 'chapters')
  if (!fs.existsSync(chaptersDir)) return []

  const files = fs.readdirSync(chaptersDir)
    .filter((f) => f.endsWith('.md'))
    .sort()

  const chapters: Chapter[] = []
  for (const file of files) {
    const id = file.replace(/\.md$/, '')
    const source = fs.readFileSync(path.join(chaptersDir, file), 'utf-8')
    const titleMatch = source.match(/^#\s+(.+)$/m)
    const title = titleMatch
      ? titleMatch[1]
      : id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    const processed = await remark().use(remarkHtml, { sanitize: false }).process(source)
    chapters.push({ id, title, html: processed.toString() })
  }
  return chapters
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const book = await getBookMeta(slug)
  const title = book?.title ?? 'Manuscript Reader'
  return {
    title: `Manuscript Reader — ${title}`,
    robots: 'noindex, nofollow',
  }
}

export default async function ReadPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cookieStore = cookies()
  const session = cookieStore.get(`read_${slug}_session`)

  const book = await getBookMeta(slug)
  const bookTitle = book?.title ?? 'Manuscript Reader'

  if (!session?.value) {
    return (
      <main className="min-h-screen bg-navy-950">
        <LoginForm slug={slug} bookTitle={bookTitle} />
      </main>
    )
  }

  const raw = await kvGet(`book:${slug}:reader:${session.value}`)
  if (!raw) {
    return (
      <main className="min-h-screen bg-navy-950">
        <LoginForm slug={slug} bookTitle={bookTitle} error="Your session has expired. Please sign in again." />
      </main>
    )
  }

  const user = (typeof raw === 'string' ? JSON.parse(raw) : raw) as { name: string; email: string }
  const chapters = await loadChapters(slug)

  return (
    <main className="min-h-screen bg-navy-950">
      <ManuscriptReader slug={slug} bookTitle={bookTitle} chapters={chapters} userName={user.name} />
    </main>
  )
}
