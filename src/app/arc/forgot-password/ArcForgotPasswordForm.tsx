'use client'

import { useState } from 'react'

export default function ArcForgotPasswordForm() {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/arc/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } finally {
      // Same response either way from the API, so the UI has nothing to
      // branch on beyond "the request went out" — show the generic message
      // regardless of what happened server-side.
      setSent(true)
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <p className="text-slate-300 text-sm">
        If that email is on file, we&apos;ve sent a new password to it. Check your
        inbox (and spam folder) in a few minutes.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-navy-950 font-semibold py-3 px-8 text-sm tracking-[0.15em] uppercase transition-colors"
      >
        {loading ? 'Sending…' : 'Send New Password'}
      </button>
    </form>
  )
}
