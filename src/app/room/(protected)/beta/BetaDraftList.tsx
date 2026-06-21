'use client'

import { useState } from 'react'
import type { BetaDraft } from './page'

const REACTIONS = ['👍', '💡', '❓', '❤️']

interface BetaDraftListProps {
  drafts: BetaDraft[]
  partnerId: number
}

export default function BetaDraftList({ drafts, partnerId }: BetaDraftListProps) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [reaction, setReaction] = useState<Record<string, string>>({})
  const [comment, setComment] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({})

  async function handleFeedback(slug: string) {
    const r = reaction[slug]
    const c = comment[slug]?.trim()
    if (!r && !c) return

    setSubmitting((prev) => ({ ...prev, [slug]: true }))
    try {
      await fetch('/api/room/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetType: 'draft',
          targetSlug: slug,
          reaction: r,
          comment: c || undefined,
        }),
      })
      setSubmitted((prev) => ({ ...prev, [slug]: true }))
    } finally {
      setSubmitting((prev) => ({ ...prev, [slug]: false }))
    }
  }

  return (
    <div className="space-y-6">
      {drafts.map((draft) => (
        <div key={draft.slug} className="bg-navy-900 border border-navy-800">
          <button
            onClick={() => setExpanded(expanded === draft.slug ? null : draft.slug)}
            className="w-full text-left p-5"
          >
            <h2 className="text-white font-semibold mb-1">{draft.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{draft.excerpt}…</p>
            <span className="mt-3 inline-block text-gold-500 text-xs tracking-widest uppercase">
              {expanded === draft.slug ? 'Close ↑' : 'Read ↓'}
            </span>
          </button>

          {expanded === draft.slug && (
            <>
              <div
                className="border-t border-navy-800 px-5 py-6 prose prose-sm prose-invert max-w-none"
                style={{ userSelect: 'none' }}
                onContextMenu={(e) => e.preventDefault()}
                dangerouslySetInnerHTML={{ __html: draft.html }}
              />

              {/* Feedback */}
              <div className="border-t border-navy-800 px-5 py-5">
                {submitted[draft.slug] ? (
                  <p className="text-slate-300 text-sm">Thanks for your feedback.</p>
                ) : (
                  <>
                    <p className="text-slate-400 text-xs tracking-widest uppercase mb-3">
                      Your reaction
                    </p>
                    <div className="flex gap-2 mb-4">
                      {REACTIONS.map((r) => (
                        <button
                          key={r}
                          onClick={() =>
                            setReaction((prev) => ({ ...prev, [draft.slug]: prev[draft.slug] === r ? '' : r }))
                          }
                          className={`text-2xl p-2 border transition-colors ${
                            reaction[draft.slug] === r
                              ? 'border-gold-500 bg-navy-800'
                              : 'border-navy-700 hover:border-navy-600'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                    <textarea
                      rows={3}
                      value={comment[draft.slug] ?? ''}
                      onChange={(e) =>
                        setComment((prev) => ({ ...prev, [draft.slug]: e.target.value }))
                      }
                      placeholder="Optional comment…"
                      className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-2 text-sm focus:outline-none focus:border-gold-600 transition-colors resize-none mb-3"
                    />
                    <button
                      onClick={() => handleFeedback(draft.slug)}
                      disabled={submitting[draft.slug] || (!reaction[draft.slug] && !comment[draft.slug]?.trim())}
                      className="bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-2 px-5 text-xs tracking-[0.15em] uppercase transition-colors"
                    >
                      {submitting[draft.slug] ? 'Sending…' : 'Submit Feedback'}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
