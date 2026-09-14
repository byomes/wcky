'use client'

import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function NewsletterModal({ isOpen, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
    }

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Something went wrong.')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative bg-white w-full max-w-md shadow-2xl p-8"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-600 text-xl font-bold leading-none"
        >
          ✕
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <p className="font-serif text-2xl font-bold text-navy-950 mb-3">You&apos;re on the list.</p>
            <p className="text-slate-500">We&apos;ll keep you posted.</p>
          </div>
        ) : (
          <>
            <p className="text-gold-600 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
              Stay Updated
            </p>
            <h3 className="font-serif text-2xl font-bold text-navy-950 mb-2 leading-tight">
              Get updates from William CK Yomes
            </h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              New books, new writing, and news as it happens. No spam, unsubscribe anytime.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="First Name"
                className="w-full border border-slate-200 px-4 py-3 text-sm mb-3 focus:outline-none focus:border-gold-500 text-slate-800"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full border border-slate-200 px-4 py-3 text-sm mb-4 focus:outline-none focus:border-gold-500 text-slate-800"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-500 text-white text-sm font-bold tracking-wide uppercase py-4 hover:bg-gold-400 transition-colors disabled:opacity-60"
              >
                {loading ? 'Sending…' : 'Get Updates'}
              </button>
              {error && <p className="text-red-500 text-xs text-center mt-3">{error}</p>}
              <p className="text-slate-400 text-xs text-center mt-3">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
