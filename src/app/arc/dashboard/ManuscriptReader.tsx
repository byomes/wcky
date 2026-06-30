'use client'

import { KeyboardEvent, useEffect, useRef, useState } from 'react'

interface Section {
  id: string
  label: string
  title: string
  html: string
}

interface ManuscriptReaderProps {
  sections: Section[]
}

export default function ManuscriptReader({ sections }: ManuscriptReaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  function blockCopy(e: KeyboardEvent<HTMLDivElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') e.preventDefault()
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const id = visible.target.id
          const i = sections.findIndex((s) => s.id === id)
          if (i !== -1) setCurrentIndex(i)
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  useEffect(() => {
    if (!menuOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  function goToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div>
      <div
        ref={panelRef}
        className="sticky top-0 z-30 bg-navy-950 border-b border-navy-800"
      >
        <div className="flex items-center justify-between px-6 py-3">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Table of contents"
            aria-expanded={menuOpen}
            className="text-slate-400 hover:text-gold-500 transition-colors p-1"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <p className="text-slate-400 text-[0.72rem] tracking-[0.1em] uppercase">
            Chapter {currentIndex + 1} of {sections.length}
          </p>
        </div>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-full bg-navy-950 border-b border-navy-800 shadow-lg max-h-[70vh] overflow-y-auto">
            {sections.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goToSection(s.id)}
                className={`w-full text-left px-6 py-3 text-sm transition-colors border-b border-navy-800 last:border-b-0 ${
                  i === currentIndex
                    ? 'text-gold-500 bg-navy-900'
                    : 'text-slate-300 hover:text-gold-500 hover:bg-navy-900'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-[680px] mx-auto px-6 pt-12 pb-16">
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
                style={{ fontSize: '1.125rem', lineHeight: '1.8' }}
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
              This is a confidential pre-publication manuscript shared with Advance Reader Corps members only. Do not share, reproduce, or distribute.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
