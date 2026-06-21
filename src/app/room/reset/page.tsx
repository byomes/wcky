'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ResetContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sent' | 'invalid' | 'done'>('idle')
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return
    fetch(`/api/room/reset?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => setTokenValid(data.valid))
      .catch(() => setTokenValid(false))
  }, [token])

  async function handleRequestReset(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/room/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus('sent')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleConfirmReset(e: FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/room/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      })
      if (res.ok) {
        setStatus('done')
      } else {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Token-based reset flow
  if (token) {
    if (tokenValid === null) {
      return <p className="text-slate-400 text-sm">Checking link…</p>
    }
    if (!tokenValid) {
      return (
        <p className="text-red-400 text-sm">
          This link has expired or is invalid.{' '}
          <a href="/room/reset" className="text-gold-500 hover:text-gold-400">
            Request a new one
          </a>
          .
        </p>
      )
    }
    if (status === 'done') {
      return (
        <div>
          <p className="text-white mb-4">Your password has been updated.</p>
          <a href="/room/login" className="text-gold-500 hover:text-gold-400 text-sm">
            Sign in →
          </a>
        </div>
      )
    }
    return (
      <form onSubmit={handleConfirmReset} className="space-y-4">
        {error && (
          <div className="px-4 py-3 border border-red-800 bg-red-950/40 text-red-400 text-sm">
            {error}
          </div>
        )}
        <div>
          <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
            New Password
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-navy-800 border border-navy-700 text-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-navy-800 border border-navy-700 text-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-4 text-sm tracking-[0.15em] uppercase transition-colors"
        >
          {loading ? 'Updating…' : 'Update Password'}
        </button>
      </form>
    )
  }

  // Request reset flow
  if (status === 'sent') {
    return (
      <p className="text-slate-300 text-sm">
        If that email is in our system, you&apos;ll receive a reset link shortly.
      </p>
    )
  }

  return (
    <form onSubmit={handleRequestReset} className="space-y-4">
      {error && (
        <div className="px-4 py-3 border border-red-800 bg-red-950/40 text-red-400 text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors"
          placeholder="your@email.com"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-4 text-sm tracking-[0.15em] uppercase transition-colors"
      >
        {loading ? 'Sending…' : 'Send Reset Link'}
      </button>
    </form>
  )
}

export default function ResetPage() {
  return (
    <>
      <section className="bg-navy-950 pt-20 pb-10 sm:pt-32 sm:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Writing Room
          </p>
          <h1 className="font-serif text-4xl font-bold text-white mb-4">
            Reset Password
          </h1>
        </div>
      </section>
      <section className="bg-navy-900 py-12 sm:py-16 border-t border-navy-800">
        <div className="max-w-md mx-auto px-6 lg:px-8">
          <Suspense fallback={<p className="text-slate-400 text-sm">Loading…</p>}>
            <ResetContent />
          </Suspense>
        </div>
      </section>
    </>
  )
}
