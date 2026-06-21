'use client'

import { useState, FormEvent, useEffect } from 'react'

export default function WritePage() {
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (message.trim().length < 20) {
      setError('Please write at least 20 characters.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/room/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() }),
      })
      if (res.ok) {
        setMessage('')
        setSent(true)
        setTimeout(() => setSent(false), 4000)
      } else {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif text-2xl font-bold text-white mb-2">Write to William</h1>
      <p className="text-slate-400 text-sm mb-8">
        Direct line. No filters. William reads everything.
      </p>

      {sent && (
        <div className="mb-6 px-4 py-3 border border-navy-700 bg-navy-800 text-slate-300 text-sm">
          William received your message.
        </div>
      )}

      {error && (
        <div className="mb-4 px-4 py-3 border border-red-800 bg-red-950/40 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
            Message
          </label>
          <textarea
            rows={8}
            required
            minLength={20}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here…"
            className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-4 text-sm tracking-[0.15em] uppercase transition-colors"
        >
          {submitting ? 'Sending…' : 'Send to William'}
        </button>
      </form>
    </div>
  )
}
