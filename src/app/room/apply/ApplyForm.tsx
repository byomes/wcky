'use client'

import { useState, FormEvent } from 'react'

export default function ApplyForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    why_join: '',
    faith_description: '',
    agreed_to_participate: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/room/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(data.error ?? 'Something went wrong.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="border border-navy-700 bg-navy-800/50 px-6 py-8">
        <p className="text-white font-serif text-xl mb-3">Application received.</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Dr. Bill reviews every request personally. You&apos;ll hear from him if you&apos;re approved.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="px-4 py-3 border border-red-800 bg-red-950/40 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
          Full Name
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
          Email
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
          Why do you want to join?
        </label>
        <textarea
          required
          minLength={50}
          rows={5}
          value={form.why_join}
          onChange={(e) => update('why_join', e.target.value)}
          className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors resize-none"
          placeholder="Tell Dr. Bill why this community matters to you…"
        />
        <p className="mt-1 text-slate-500 text-xs">{form.why_join.length}/50 characters minimum</p>
      </div>

      <div>
        <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
          Please describe your Christian faith.
        </label>
        <textarea
          required
          minLength={20}
          rows={5}
          value={form.faith_description}
          onChange={(e) => update('faith_description', e.target.value)}
          className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors resize-none"
          placeholder="Share a bit about your faith…"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={form.agreed_to_participate}
          onChange={(e) => update('agreed_to_participate', e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded-none border-navy-600 bg-navy-800 accent-gold-500"
        />
        <span className="text-slate-300 text-sm leading-snug">
          I agree to participate actively in community efforts, not just consume content.
        </span>
      </label>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-4 px-8 text-sm tracking-[0.15em] uppercase transition-colors"
        >
          {loading ? 'Submitting…' : 'Apply to Join'}
        </button>
      </div>

      <p className="text-slate-500 text-xs text-center">
        Already have access?{' '}
        <a href="/room" className="text-gold-600 hover:text-gold-500 transition-colors">
          Sign in here
        </a>
      </p>
    </form>
  )
}
