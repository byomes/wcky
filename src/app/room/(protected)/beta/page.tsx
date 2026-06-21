import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { cookies } from 'next/headers'
import { getPartnerSession, PARTNER_COOKIE } from '@/lib/writing-room-auth'
import BetaDraftList from './BetaDraftList'

export const metadata: Metadata = {
  title: 'Beta — Writing Room',
  robots: 'noindex, nofollow',
}

export interface BetaDraft {
  slug: string
  title: string
  excerpt: string
  html: string
}

async function loadBetaDrafts(): Promise<BetaDraft[]> {
  const dir = path.join(process.cwd(), 'src/content/books/twj/beta')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  const drafts: BetaDraft[] = []

  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    const processed = await remark().use(remarkHtml, { sanitize: false }).process(content)
    drafts.push({
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? content.slice(0, 150).trim(),
      html: processed.toString(),
    })
  }

  return drafts
}

export default async function BetaPage() {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  const drafts = await loadBetaDrafts()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif text-2xl font-bold text-white mb-2">Beta Drafts</h1>
      <p className="text-slate-400 text-sm mb-8">Your feedback shapes the book.</p>
      {drafts.length === 0 ? (
        <p className="text-slate-400 text-sm">Beta content coming soon.</p>
      ) : (
        <BetaDraftList drafts={drafts} partnerId={session?.partnerId ?? 0} />
      )}
    </div>
  )
}
