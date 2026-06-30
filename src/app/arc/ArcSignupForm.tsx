'use client'

import { useState } from 'react'

export default function ArcSignupForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!agreed) {
      setError('You must agree to the ARC Partner commitments.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/arc/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email }),
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
        <p className="text-gold-400 text-lg font-serif font-bold mb-2">You&apos;re on the team.</p>
        <p className="text-slate-400 text-sm leading-relaxed">
          Welcome to the ARC. Check your email — we&apos;ve sent you login instructions so you can
          track your commitments as you complete them. Use that same email and password to log in at{' '}
          <a href="/arc/login" className="text-gold-400 underline underline-offset-2">
            your commitment tracker
          </a>
          .
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              aria-label="Last Name"
              placeholder="Last Name"
              type="text"
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
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

        <div className="formkit-field pt-2">
          <div className="flex items-start gap-3">
            <input
              className="formkit-checkbox mt-1 shrink-0 w-4 h-4 accent-gold-500 cursor-pointer"
              id="arc-agree"
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
            />
            <label
              htmlFor="arc-agree"
              className="text-slate-300 text-sm leading-relaxed cursor-pointer"
            >
              I have read the ARC Partner commitments above and I agree to fulfill all six.
              I want to be an ARC team member.
            </label>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="formkit-submit w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-navy-950 font-semibold py-4 px-8 text-sm tracking-[0.15em] uppercase transition-colors"
          >
            {submitting ? 'Submitting…' : 'Join The Team'}
          </button>
        </div>
      </div>
    </form>
  )
}
