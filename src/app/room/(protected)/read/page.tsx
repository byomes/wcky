import path from 'path'
import fs from 'fs'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import ArcReader from './ArcReader'

export const metadata = {
  title: 'The Wrong Jesus — Writing Room',
  robots: 'noindex, nofollow',
}

const SECTIONS = [
  {
    id: 'introduction',
    label: 'Introduction',
    title: 'Introduction: The Most Dangerous Kind of Wrong',
    file: 'introduction.md',
  },
  {
    id: 'chapter-1',
    label: 'Chapter 1',
    title: 'Chapter 1: The Parade We All Join',
    file: 'chapter-01.md',
  },
]

async function loadSections() {
  const chaptersDir = path.join(process.cwd(), 'src/app/twj/read/chapters')
  const results = []

  for (const s of SECTIONS) {
    const filepath = path.join(chaptersDir, s.file)
    if (!fs.existsSync(filepath)) continue
    const source = fs.readFileSync(filepath, 'utf-8')
    const processed = await remark().use(remarkHtml, { sanitize: false }).process(source)
    results.push({ ...s, html: processed.toString() })
  }

  return results
}

export default async function ReadPage() {
  const sections = await loadSections()

  return (
    <div className="bg-navy-950 min-h-screen">
      {/* Book header */}
      <div className="pt-12 pb-6 text-center border-b border-navy-800">
        <p className="text-gold-500 text-[0.7rem] tracking-[0.3em] uppercase font-semibold mb-3">
          Advance Reader Manuscript
        </p>
        <h1
          className="font-serif font-bold text-white tracking-[-0.01em] mb-1.5"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
        >
          The Wrong Jesus
        </h1>
        <p className="text-slate-500 text-sm">Dr. William C.K. Yomes</p>
      </div>

      {/* Sticky anchor nav */}
      <div className="sticky top-0 z-30 bg-navy-950 border-b border-navy-800 px-6 py-2 flex justify-center gap-1 flex-wrap">
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="text-slate-400 hover:text-gold-500 text-[0.72rem] tracking-[0.1em] uppercase no-underline px-2 py-1 transition-colors"
          >
            {s.label}
            {i < sections.length - 1 && (
              <span className="ml-2 text-navy-700">·</span>
            )}
          </a>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-[680px] mx-auto px-6 pt-12 pb-32">
        <ArcReader sections={sections} />
      </div>
    </div>
  )
}
