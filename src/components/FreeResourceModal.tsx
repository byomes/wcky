'use client'

import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function FreeResourceModal({ isOpen, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative bg-white max-w-md w-full p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold"
        >
          ✕
        </button>
        {submitted ? (
          <div className="text-center py-8">
            <p className="font-serif text-2xl font-bold text-navy-950 mb-3">Check your email!</p>
            <p className="text-slate-500">Your free resource is on its way.</p>
          </div>
        ) : (
          <>
            <p className="text-gold-600 text-xs tracking-[0.3em] uppercase font-semibold mb-2">Free Resource</p>
            <h3 className="font-serif text-2xl font-bold text-navy-950 mb-2">Study the Bible Like a Pastor</h3>
            <p className="text-slate-500 text-sm mb-6">Enter your name and email and we&apos;ll send it right to you.</p>
            <form
              action="https://app.kit.com/forms/9400485/subscriptions"
              method="post"
              onSubmit={async (e) => {
                e.preventDefault()
                const form = e.currentTarget
                await fetch(form.action, {
                  method: 'POST',
                  body: new FormData(form),
                  mode: 'no-cors',
                })
                setSubmitted(true)
              }}
            >
              <input type="hidden" name="data[sv_form]" value="9400485" />
              <input type="hidden" name="data[uid]" value="074d4e9a43" />
              <input
                type="text"
                name="fields[first_name]"
                placeholder="First Name"
                className="w-full border border-slate-200 px-4 py-3 text-sm mb-3 focus:outline-none focus:border-gold-500 text-slate-800"
              />
              <input
                type="email"
                name="email_address"
                placeholder="Email Address"
                required
                className="w-full border border-slate-200 px-4 py-3 text-sm mb-4 focus:outline-none focus:border-gold-500 text-slate-800"
              />
              <button
                type="submit"
                className="w-full bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase py-4 hover:bg-gold-400 transition-colors"
              >
                Send It To Me
              </button>
              <p className="text-slate-400 text-xs text-center mt-3">We respect your privacy. Unsubscribe anytime.</p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
