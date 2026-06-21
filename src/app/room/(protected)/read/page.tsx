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
    <div style={{ background: '#0f0f0f', minHeight: '100vh' }}>
      {/* Book header */}
      <div style={{
        paddingTop: '3rem',
        paddingBottom: '1.5rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <p style={{
          color: 'var(--gold-500, #c9a84c)',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginBottom: '0.75rem',
        }}>
          Advance Reader Manuscript
        </p>
        <h1 style={{
          fontFamily: 'var(--font-playfair, Georgia, serif)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.01em',
          margin: '0 0 0.4rem',
        }}>
          The Wrong Jesus
        </h1>
        <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>
          Dr. William C.K. Yomes
        </p>
      </div>

      {/* Sticky anchor nav */}
      <style>{`
        .arc-nav-link { color: #888; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; padding: 0.25rem 0.5rem; transition: color 0.15s; }
        .arc-nav-link:hover { color: #c9a84c; }
      `}</style>
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: '#0f0f0f',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0.6rem 1.5rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
      }}>
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="arc-nav-link"
          >
            {s.label}
            {i < sections.length - 1 && (
              <span style={{ marginLeft: '0.5rem', color: '#333' }}>·</span>
            )}
          </a>
        ))}
      </div>

      {/* Content */}
      <div style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: '3rem 1.5rem 8rem',
      }}>
        <ArcReader sections={sections} />
      </div>
    </div>
  )
}
