'use client'

import { useState, useEffect, FormEvent, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function VerifyInner() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('token') ?? ''

  const [state, setState] = useState<'loading' | 'invalid' | 'form' | 'submitting' | 'done'>('loading')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) { setState('invalid'); return }
    fetch(`/api/room/verify?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          setName(data.name ?? '')
          setState('form')
        } else {
          setState('invalid')
        }
      })
      .catch(() => setState('invalid'))
  }, [token])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }

    setState('submitting')
    setError('')
    try {
      const res = await fetch('/api/room/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setState('done')
        setTimeout(() => router.push('/room/login?verified=1'), 1500)
      } else {
        setError(data.error ?? 'Something went wrong.')
        setState('form')
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setState('form')
    }
  }

  if (state === 'loading') {
    return (
      <div className="text-slate-400 text-sm">Verifying your link…</div>
    )
  }

  if (state === 'invalid') {
    return (
      <div className="border border-navy-700 bg-navy-800/50 px-6 py-8">
        <p className="text-white font-serif text-xl mb-3">Link expired or invalid.</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          This verification link has expired or has already been used. Contact Dr. Bill if you need a new one.
        </p>
      </div>
    )
  }

  if (state === 'done') {
    return (
      <div className="border border-navy-700 bg-navy-800/50 px-6 py-8">
        <p className="text-white font-serif text-xl mb-3">Password set.</p>
        <p className="text-slate-300 text-sm">Welcome to the Writing Room. Redirecting to sign in…</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {name && (
        <p className="text-slate-300 text-sm">
          Hi {name}. Set your password to complete your Writing Room access.
        </p>
      )}

      {error && (
        <div className="px-4 py-3 border border-red-800 bg-red-950/40 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
          Password
        </label>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
          placeholder="At least 8 characters"
        />
      </div>

      <div>
        <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          required
          minLength={8}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
          className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
          placeholder="Repeat your password"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-4 px-8 text-sm tracking-[0.15em] uppercase transition-colors"
        >
          {state === 'submitting' ? 'Setting password…' : 'Set My Password & Enter the Writing Room'}
        </button>
      </div>
    </form>
  )
}

export default function VerifyPage() {
  return (
    <>
      <section className="bg-navy-950 pt-20 pb-10 sm:pt-32 sm:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Writing Room
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Verify Your Email
          </h1>
        </div>
      </section>

      <section className="bg-navy-900 py-12 sm:py-16 border-t border-navy-800">
        <div className="max-w-lg mx-auto px-6 lg:px-8">
          <Suspense fallback={<div className="text-slate-400 text-sm">Verifying your link…</div>}>
            <VerifyInner />
          </Suspense>
        </div>
      </section>
    </>
  )
}
