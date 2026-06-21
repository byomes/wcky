'use client'

import Link from 'next/link'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/room/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        router.push('/room/board')
      } else {
        const data = await res.json()
        setError(data.error ?? 'Invalid username or password.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-navy-900 py-12 sm:py-16 border-t border-navy-800">
      <div className="max-w-md mx-auto px-6 lg:px-8">
        {error && (
          <div className="mb-6 px-4 py-3 border border-red-800 bg-red-950/40 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
              Username
            </label>
            <input
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
              placeholder="your-username"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <p className="mt-6 text-center">
          <a href="/room/reset" className="text-slate-500 text-sm hover:text-gold-500 transition-colors">
            Forgot your password?
          </a>
        </p>

        <p className="mt-4 text-center text-sm" style={{ color: 'var(--slate-400, #94a3b8)' }}>
          Not a partner yet?{' '}
          <Link href="/room/apply" className="text-gold-500 hover:text-gold-400 transition-colors">
            Apply to join →
          </Link>
        </p>
      </div>
    </section>
  )
}
