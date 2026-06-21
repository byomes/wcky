'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
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
      const res = await fetch('/api/room/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        router.push('/room/admin')
      } else {
        const data = await res.json()
        setError(data.error ?? 'Invalid credentials.')
      }
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="bg-navy-950 pt-20 pb-10 sm:pt-32 sm:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Writing Room
          </p>
          <h1 className="font-serif text-3xl font-bold text-white mb-4">Admin</h1>
        </div>
      </section>
      <section className="bg-navy-900 py-12 border-t border-navy-800">
        <div className="max-w-sm mx-auto px-6">
          {error && (
            <div className="mb-4 px-4 py-3 border border-red-800 bg-red-950/40 text-red-400 text-sm">
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-navy-800 border border-navy-700 text-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-navy-800 border border-navy-700 text-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-4 text-sm tracking-[0.15em] uppercase transition-colors"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
