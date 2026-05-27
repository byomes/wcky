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

const CHAPTERS = [
  { id: 'introduction', title: 'Introduction: The Most Dangerous Kind of Wrong' },
  { id: 'chapter-01', title: 'Chapter 1: The Parade We All Join' },
  { id: 'chapter-02', title: 'Chapter 2: The Jesus We Needed' },
  { id: 'chapter-03', title: 'Chapter 3: The Sincerity Trap' },
  { id: 'chapter-04', title: "Chapter 4: When Jesus Doesn't Do What You Hired Him For" },
  { id: 'chapter-05', title: 'Chapter 5: The Jesus Who Tears Things Down' },
  { id: 'chapter-06', title: "Chapter 6: Going Somewhere You Didn't Sign Up For" },
  { id: 'chapter-07', title: 'Chapter 7: Choosing Barabbas' },
  { id: 'chapter-08', title: 'Chapter 8: Loud Voices' },
  { id: 'chapter-09', title: 'Chapter 9: The Quieter Sin' },
  { id: 'chapter-10', title: 'Chapter 10: Jesus Has Never Been Ambiguous About Who He Is' },
  { id: 'chapter-11', title: 'Chapter 11: The Disciples as Servants Who Simply Kept Walking' },
  { id: 'chapter-12', title: 'Chapter 12: You Cannot Surrender What You Have Not Named' },
  { id: 'conclusion', title: 'Conclusion: Not a Resolution, an Orientation' },
]

async function loadChapters(): Promise<Chapter[]> {
  const chaptersDir = path.join(process.cwd(), 'src/app/twj/read/chapters')
  const chapters: Chapter[] = []

  for (const { id, title } of CHAPTERS) {
    const filepath = path.join(chaptersDir, `${id}.md`)
    if (!fs.existsSync(filepath)) continue

    const source = fs.readFileSync(filepath, 'utf-8')
    const processed = await remark().use(remarkHtml, { sanitize: false }).process(source)
    const html = processed.toString()

    chapters.push({ id, title, html })
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
