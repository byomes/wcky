'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GuideSignupForm({ slug }: { slug: string }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/lead-magnet/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }
      router.push(`/guide/${slug}/thanks`)
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="formkit-field">
        <input
          className="formkit-input w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
          aria-label="Name"
          placeholder="Your Name"
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="formkit-field">
        <input
          className="formkit-input w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
          aria-label="Email Address"
          placeholder="Email Address"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <p className="text-slate-500 text-xs leading-relaxed">
        We&apos;ll only use this to send your guide and occasional updates. No spam, unsubscribe anytime.
      </p>

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="formkit-submit w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-navy-950 font-semibold py-4 px-8 text-sm tracking-[0.15em] uppercase transition-colors"
        >
          {submitting ? 'Sending…' : 'Send Me the Guide'}
        </button>
      </div>
    </form>
  )
}
