'use client'

import { useState } from 'react'

const MAX_LEN = 600

export default function ArcFeedbackBox() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  async function handleSubmit() {
    const trimmed = text.trim()
    if (!trimmed) return
    setStatus('saving')
    try {
      const res = await fetch('/api/arc/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetType: 'testimonial',
          targetSlug: 'general',
          comment: trimmed,
        }),
      })
      if (!res.ok) {
        setStatus('error')
        return
      }
      setText('')
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-navy-950 border-t border-navy-800">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
          Your Feedback
        </p>
        <h3 className="font-serif text-2xl font-bold text-white mb-2">
          Got a reaction, a quote, a thought?
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Anything you share here may be used (with your permission at launch)
          as a reader quote for the book. Please feel free to leave as many
          comments as you like.
        </p>

        <textarea
          rows={4}
          maxLength={MAX_LEN}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What stood out to you so far…"
          className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-600 px-3 py-2 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors resize-none"
        />

        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-slate-500 font-mono">
            {text.length}/{MAX_LEN}
          </span>
          <div className="flex items-center gap-3">
            {status === 'saved' && (
              <span className="text-xs text-emerald-400">Thanks — feel free to leave more!</span>
            )}
            {status === 'error' && (
              <span className="text-xs text-red-400">Couldn&apos;t send — try again.</span>
            )}
            <button
              onClick={handleSubmit}
              disabled={!text.trim() || status === 'saving'}
              className="bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-navy-950 font-semibold px-4 py-2 text-sm tracking-[0.1em] uppercase transition-colors"
            >
              {status === 'saving' ? 'Sending…' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
