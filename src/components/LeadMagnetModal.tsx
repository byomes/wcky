'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function LeadMagnetModal({ isOpen, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative bg-white w-full max-w-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-600 text-xl font-bold leading-none"
        >
          ✕
        </button>

        {/* Cover image */}
        <div className="relative w-full h-48 sm:h-auto sm:w-2/5 shrink-0">
          <Image
            src="/images/lead-magnet2.png"
            alt="Study the Bible Like a Pastor"
            fill
            className="object-cover"
          />
        </div>

        {/* Form */}
        <div className="flex-1 p-8 overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <p className="font-serif text-2xl font-bold text-navy-950 mb-3">Check your email!</p>
              <p className="text-slate-500">Your free resource is on its way.</p>
            </div>
          ) : (
            <>
              <p className="text-gold-600 text-xs tracking-[0.3em] uppercase font-semibold mb-2">Free Resource</p>
              <h3 className="font-serif text-2xl font-bold text-navy-950 mb-2 leading-tight">
                Study the Bible Like a Pastor
              </h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Enter your name and email and we&apos;ll send it right to you.
              </p>
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
                <p className="text-slate-400 text-xs text-center mt-3">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
