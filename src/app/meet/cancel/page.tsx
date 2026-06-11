'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

type State = 'loading' | 'success' | 'error'

function CancelContent() {
  const params = useSearchParams()
  const id = params.get('id')
  const [state, setState] = useState<State>('loading')

  useEffect(() => {
    if (!id) { setState('error'); return }
    fetch(`https://watson.tail0243ff.ts.net/api/cancel-appointment?id=${encodeURIComponent(id)}`)
      .then(r => { setState(r.ok ? 'success' : 'error') })
      .catch(() => setState('error'))
  }, [id])

  return (
    <div className="min-h-screen bg-navy-950 pt-24 pb-20">
      <div className="max-w-md mx-auto px-6">

        <div className="text-center mb-10">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">Appointment</p>
          <h1 className="font-serif text-3xl font-bold text-white leading-snug">
            Cancel Appointment
          </h1>
        </div>

        {state === 'loading' && (
          <div className="text-center py-16 text-slate-400 text-sm">
            Cancelling your appointment…
          </div>
        )}

        {state === 'success' && (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-gold-500/10 border border-gold-700/30">
              <svg className="w-7 h-7 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-white mb-3">Appointment Cancelled</h2>
            <p className="text-slate-400 leading-relaxed text-sm max-w-xs mx-auto mb-8">
              Your appointment has been cancelled. To book a new appointment, click below.
            </p>
            <Link
              href="/meet"
              className="inline-block px-8 py-3 bg-navy-800 border border-gold-700/40 text-gold-400 text-sm font-bold tracking-wide uppercase hover:border-gold-500/60 hover:bg-gold-500/10 hover:text-gold-300 transition-all duration-200"
            >
              Book a New Appointment
            </Link>
          </div>
        )}

        {state === 'error' && (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-navy-800 border border-navy-700">
              <svg className="w-7 h-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-white mb-3">Link No Longer Valid</h2>
            <p className="text-slate-400 leading-relaxed text-sm max-w-xs mx-auto mb-8">
              This cancellation link is no longer valid. If you need help, email{' '}
              <a href="mailto:pastorbill@catalyst302.com" className="text-gold-500 hover:text-gold-400 transition-colors">
                pastorbill@catalyst302.com
              </a>
              .
            </p>
            <Link
              href="/meet"
              className="inline-block px-8 py-3 bg-navy-800 border border-gold-700/40 text-gold-400 text-sm font-bold tracking-wide uppercase hover:border-gold-500/60 hover:bg-gold-500/10 hover:text-gold-300 transition-all duration-200"
            >
              Book an Appointment
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default function CancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-navy-950 pt-24 pb-20">
        <div className="max-w-md mx-auto px-6 text-center py-16 text-slate-400 text-sm">
          Cancelling your appointment…
        </div>
      </div>
    }>
      <CancelContent />
    </Suspense>
  )
}
