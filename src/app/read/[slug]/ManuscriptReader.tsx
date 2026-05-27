'use client'

import { useState, KeyboardEvent } from 'react'

interface Chapter {
  id: string
  title: string
  html: string
}

interface Props {
  slug: string
  bookTitle: string
  chapters: Chapter[]
  userName: string
}

export default function ManuscriptReader({ slug, bookTitle, chapters, userName }: Props) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? '')
  const [feedbackText, setFeedbackText] = useState<Record<string, string>>({})
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<Record<string, boolean>>({})
  const [feedbackLoading, setFeedbackLoading] = useState<Record<string, boolean>>({})
  const [feedbackError, setFeedbackError] = useState<Record<string, string>>({})

  const activeChapter = chapters.find((c) => c.id === activeId)

  async function handleLogout() {
    await fetch(`/api/read/${slug}/logout`, { method: 'POST' })
    window.location.reload()
  }

  async function handleFeedback(chapterId: string) {
    const text = feedbackText[chapterId]?.trim()
    if (!text) return
    setFeedbackLoading((prev) => ({ ...prev, [chapterId]: true }))
    setFeedbackError((prev) => ({ ...prev, [chapterId]: '' }))
    try {
      const res = await fetch(`/api/read/${slug}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapter: chapterId, text }),
      })
      if (res.ok) {
        setFeedbackSubmitted((prev) => ({ ...prev, [chapterId]: true }))
      } else {
        setFeedbackError((prev) => ({ ...prev, [chapterId]: 'Failed to submit. Please try again.' }))
      }
    } catch {
      setFeedbackError((prev) => ({ ...prev, [chapterId]: 'Something went wrong.' }))
    } finally {
      setFeedbackLoading((prev) => ({ ...prev, [chapterId]: false }))
    }
  }

  function blockCopy(e: KeyboardEvent<HTMLDivElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-navy-950 pt-16 lg:pt-20">
      {/* Top bar */}
      <div className="bg-navy-900 border-b border-navy-800 sticky top-16 lg:top-20 z-40">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold shrink-0 hidden sm:block">
              {bookTitle}
            </span>
            {chapters.length > 0 && (
              <>
                <span className="text-navy-600 hidden sm:block">·</span>
                <select
                  value={activeId}
                  onChange={(e) => setActiveId(e.target.value)}
                  className="bg-navy-800 border border-navy-700 text-slate-200 text-xs px-3 py-1.5 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors min-w-0 max-w-[220px] sm:max-w-xs"
                >
                  {chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                      {chapter.title}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-slate-500 text-xs hidden sm:block">
              Reading as <span className="text-slate-300">{userName}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-slate-500 hover:text-gold-500 text-xs tracking-widest uppercase transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <main className="min-w-0">
          {chapters.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">Coming Soon</p>
              <p className="text-slate-400 text-lg">
                Manuscript content for <span className="text-white">{bookTitle}</span> is not yet available.
              </p>
              <p className="text-slate-500 text-sm mt-2">Check back soon.</p>
            </div>
          ) : activeChapter ? (
            <>
              <div
                className="select-none outline-none"
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                onContextMenu={(e) => e.preventDefault()}
                onKeyDown={blockCopy}
                tabIndex={0}
              >
                <div
                  className="prose prose-invert prose-headings:font-serif prose-headings:text-white prose-h1:text-4xl prose-h2:text-2xl prose-h2:text-gold-400 prose-p:text-slate-300 prose-p:leading-relaxed prose-strong:text-white prose-em:text-slate-300 prose-hr:border-navy-700 max-w-none"
                  dangerouslySetInnerHTML={{ __html: activeChapter.html }}
                />
              </div>

              <div className="mt-10 px-4 py-3 border border-navy-700 bg-navy-900">
                <p className="text-slate-500 text-xs tracking-wide">
                  This is a confidential pre-publication manuscript. Please do not share, reproduce, or distribute any portion of this text.
                </p>
              </div>

              <div className="mt-12 pt-10 border-t border-navy-800">
                <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                  Reader Feedback
                </p>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  Share Your Thoughts
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  What resonated with you in this chapter? What questions came up? Your feedback shapes the final manuscript.
                </p>

                {feedbackSubmitted[activeChapter.id] ? (
                  <div className="px-4 py-4 border border-navy-700 bg-navy-900">
                    <p className="text-gold-400 text-sm font-semibold mb-1">Feedback received</p>
                    <p className="text-slate-400 text-sm">
                      Thank you, {userName}. Your notes on this chapter have been saved.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <textarea
                      value={feedbackText[activeChapter.id] ?? ''}
                      onChange={(e) =>
                        setFeedbackText((prev) => ({ ...prev, [activeChapter.id]: e.target.value }))
                      }
                      rows={5}
                      placeholder="Your thoughts, questions, or reactions…"
                      className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors resize-y"
                    />

                    {feedbackError[activeChapter.id] && (
                      <p className="text-red-400 text-sm">{feedbackError[activeChapter.id]}</p>
                    )}

                    <button
                      onClick={() => handleFeedback(activeChapter.id)}
                      disabled={feedbackLoading[activeChapter.id] || !feedbackText[activeChapter.id]?.trim()}
                      className="bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-3 px-8 text-sm tracking-[0.15em] uppercase transition-colors"
                    >
                      {feedbackLoading[activeChapter.id] ? 'Submitting…' : 'Submit Feedback'}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  )
}
