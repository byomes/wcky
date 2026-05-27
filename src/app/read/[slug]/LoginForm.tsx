'use client'

import { useState, FormEvent } from 'react'

interface Props {
  slug: string
  bookTitle: string
  error?: string
}

export default function LoginForm({ slug, bookTitle, error: initialError }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(initialError ?? '')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/read/${slug}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        window.location.reload()
      } else {
        const data = await res.json()
        setError(data.error ?? 'Invalid credentials')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            {bookTitle}
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Manuscript Access
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed">
            This is a private pre-publication manuscript. Sign in with your reader credentials to continue.
          </p>
        </div>
      </section>

      <section className="bg-navy-900 py-16 lg:py-24 border-t border-navy-800">
        <div className="max-w-md mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Reader Login
          </p>
          <h2 className="font-serif text-3xl font-bold text-white mb-8">
            Sign In
          </h2>

          {error && (
            <div className="mb-6 px-4 py-3 border border-red-800 bg-red-950/40 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
                placeholder="your-username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-4 px-8 text-sm tracking-[0.15em] uppercase transition-colors"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-slate-500 text-sm text-center">
            Don&apos;t have access? Contact{' '}
            <a
              href="mailto:me@williamckyomes.com"
              className="text-gold-600 hover:text-gold-500 transition-colors"
            >
              me@williamckyomes.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
