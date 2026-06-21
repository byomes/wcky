'use client'

import { KeyboardEvent } from 'react'

interface Section {
  id: string
  label: string
  title: string
  html: string
}

interface ArcReaderProps {
  sections: Section[]
}

export default function ArcReader({ sections }: ArcReaderProps) {
  function blockCopy(e: KeyboardEvent<HTMLDivElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') e.preventDefault()
  }

  return (
    <div
      style={{ userSelect: 'none', WebkitUserSelect: 'none' } as React.CSSProperties}
      onContextMenu={(e) => e.preventDefault()}
      onKeyDown={blockCopy}
      tabIndex={0}
      className="outline-none"
    >
      {sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          style={{ marginBottom: i < sections.length - 1 ? '4rem' : 0 }}
        >
          <div
            className="prose prose-invert max-w-none"
            style={{
              color: '#e8e8e3',
              fontSize: '1.125rem',
              lineHeight: '1.8',
            }}
            dangerouslySetInnerHTML={{ __html: section.html }}
          />
          {i < sections.length - 1 && (
            <hr style={{ margin: '4rem 0', borderColor: 'rgba(255,255,255,0.08)' }} />
          )}
        </section>
      ))}

      <div style={{
        marginTop: '3rem',
        padding: '0.75rem 1rem',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <p style={{ color: '#555', fontSize: '0.75rem', letterSpacing: '0.03em', margin: 0 }}>
          This is a confidential pre-publication manuscript shared with Writing Room partners only. Do not share, reproduce, or distribute.
        </p>
      </div>
    </div>
  )
}
