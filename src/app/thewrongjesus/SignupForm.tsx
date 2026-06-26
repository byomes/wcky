'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function SignupForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
    }

    try {
      const res = await fetch('/api/thewrongjesus/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Something went wrong.')
      }
      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <p className="font-serif text-xl text-white mb-1">You&apos;re on the list.</p>
        <p className="text-slate-400 text-sm">We&apos;ll be in touch closer to September 15.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        className="flex-1 bg-navy-800 border border-navy-700 text-white placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email address"
        required
        className="flex-1 bg-navy-800 border border-navy-700 text-white placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-500"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200 disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Notify Me'}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-1 sm:col-span-3">{errorMsg}</p>
      )}
    </form>
  )
}
