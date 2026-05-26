import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import path from 'path'
import fs from 'fs'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import LoginForm from './LoginForm'
import ManuscriptReader from './ManuscriptReader'

export const metadata: Metadata = {
  title: 'Manuscript Reader — The Wrong Jesus',
  robots: 'noindex, nofollow',
}

interface Chapter {
  id: string
  title: string
  html: string
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

async function loadChapters(): Promise<Chapter[]> {
  const chaptersDir = path.join(process.cwd(), 'src/app/twj/read/chapters')
  const filenames = ['chapter-01.md', 'chapter-02.md', 'chapter-03.md']

  const chapters: Chapter[] = []

  for (const filename of filenames) {
    const filepath = path.join(chaptersDir, filename)
    if (!fs.existsSync(filepath)) continue

    const source = fs.readFileSync(filepath, 'utf-8')
    const processed = await remark().use(remarkHtml, { sanitize: false }).process(source)
    const html = processed.toString()

    const titleMatch = source.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1] : filename.replace('.md', '')

    chapters.push({ id: filename.replace('.md', ''), title, html })
  }

  return chapters
}

export default async function TwjReadPage() {
  const cookieStore = cookies()
  const session = cookieStore.get('twj_session')

  if (!session?.value) {
    return (
      <main className="min-h-screen bg-navy-950">
        <LoginForm />
      </main>
    )
  }

  const raw = await kvGet(`twj:reader:${session.value}`)

  if (!raw) {
    return (
      <main className="min-h-screen bg-navy-950">
        <LoginForm error="Your session has expired. Please sign in again." />
      </main>
    )
  }

  const user = JSON.parse(raw) as { name: string; email: string }
  const chapters = await loadChapters()

  return (
    <main className="min-h-screen bg-navy-950">
      <ManuscriptReader chapters={chapters} userName={user.name} />
    </main>
  )
}
