'use client'

import { useState } from 'react'

export default function ArcInterestForm() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    setSubmitting(true)
    try {
      const res = await fetch('/api/arc/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
      } else {
        setSuccess(true)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-navy-800 border border-gold-700/30 p-8 text-center">
        <p className="text-gold-400 text-lg font-serif font-bold mb-2">You&apos;re on the list.</p>
        <p className="text-slate-400 text-sm leading-relaxed">
          We&apos;ll reach out when the next ARC team opens.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <div data-element="fields" data-stacked="true" className="seva-fields formkit-fields space-y-4">
        <div className="formkit-field">
          <input
            className="formkit-input w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
            aria-label="First Name"
            placeholder="First Name"
            type="text"
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
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

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="formkit-submit w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-navy-950 font-semibold py-4 px-8 text-sm tracking-[0.15em] uppercase transition-colors"
          >
            {submitting ? 'Submitting…' : 'Notify Me'}
          </button>
        </div>
      </div>
    </form>
  )
}
