'use client'

import { useState, useEffect } from 'react'

type AppointmentType = 'virtual' | 'inperson'
type Step = 1 | 2 | 3 | 4 | 5

interface Slot { start: string; end: string }
interface BookResult { meetLink?: string | null; isVirtual?: boolean }

const VIRTUAL_DURATIONS  = [15, 30, 60]
const INPERSON_DURATIONS = [30, 60]

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {
    timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: true,
  })
}
function fmtDateKey(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit',
  })
}
function fmtDateHeader(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    timeZone: 'America/New_York', weekday: 'long', month: 'long', day: 'numeric',
  })
}
function durLabel(d: number) { return d === 60 ? '1 hour' : `${d} minutes` }

export default function MeetPage() {
  const [step,              setStep]              = useState<Step>(1)
  const [type,              setType]              = useState<AppointmentType | null>(null)
  const [duration,          setDuration]          = useState<number | null>(null)
  const [slots,             setSlots]             = useState<Slot[]>([])
  const [loadingSlots,      setLoadingSlots]      = useState(false)
  const [visibleDateCount,  setVisibleDateCount]  = useState(14)
  const [expandedDate,      setExpandedDate]      = useState<string | null>(null)
  const [selectedSlot,      setSelectedSlot]      = useState<Slot | null>(null)
  const [name,              setName]              = useState('')
  const [email,             setEmail]             = useState('')
  const [suggestedLocation, setSuggestedLocation] = useState('')
  const [submitting,        setSubmitting]        = useState(false)
  const [result,            setResult]            = useState<BookResult | null>(null)
  const [error,             setError]             = useState<string | null>(null)

  useEffect(() => {
    if (step !== 3 || !duration) return
    setLoadingSlots(true)
    setError(null)
    setVisibleDateCount(14)
    setExpandedDate(null)
    fetch(`/api/meet/availability?duration=${duration}`)
      .then(r => r.json())
      .then(data => { setSlots(data.slots ?? []); setLoadingSlots(false) })
      .catch(() => { setError('Failed to load availability. Please try again.'); setLoadingSlots(false) })
  }, [step, duration])

  const slotsByDate = slots.reduce<Record<string, Slot[]>>((acc, s) => {
    const k = fmtDateKey(s.start)
    if (!acc[k]) acc[k] = []
    acc[k].push(s)
    return acc
  }, {})
  const dates = Object.keys(slotsByDate)

  async function handleBook() {
    if (!name || !email || !selectedSlot) return
    setSubmitting(true)
    setError(null)
    try {
      const resp = await fetch('/api/meet/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, start: selectedSlot.start, end: selectedSlot.end, type, duration, suggestedLocation: suggestedLocation || undefined }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error ?? 'Booking failed')
      setResult(data)
      setStep(5)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls = 'w-full px-4 py-3 bg-navy-800 border border-navy-700 text-white placeholder-navy-500 focus:outline-none focus:border-gold-700/60 transition-colors duration-200'
  const backBtn  = (onClick: () => void) => (
    <button onClick={onClick} className="mt-5 text-slate-500 hover:text-slate-300 text-sm transition-colors block">
      ← Back
    </button>
  )

  return (
    <div className="min-h-screen bg-navy-950 pt-24 pb-20">
      <div className="max-w-md mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">Need to Talk?</p>
          <h1 className="font-serif text-3xl font-bold text-white leading-snug">
            Book an Appointment<br />with Pastor Bill
          </h1>
        </div>

        {/* Progress */}
        {step < 5 && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {([1, 2, 3, 4] as const).map(s => (
              <div key={s} className={`h-0.5 rounded-full transition-all duration-300 ${
                s === step ? 'bg-gold-500 w-8' : s < step ? 'bg-gold-700 w-4' : 'bg-navy-700 w-4'
              }`} />
            ))}
          </div>
        )}

        {/* ── Step 1: Type ── */}
        {step === 1 && (
          <div className="space-y-3">
            {[
              { value: 'virtual'  as const, label: 'Virtual Appointment',   desc: 'Meet via Google Meet from anywhere' },
              { value: 'inperson' as const, label: 'In-Person Appointment', desc: 'Meet with Pastor Bill face to face'  },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => { setType(opt.value); setStep(2) }}
                className="w-full text-left p-6 bg-navy-800 border border-navy-700 hover:border-gold-700/50 hover:bg-navy-700/60 transition-all duration-200 group"
              >
                <p className="font-serif text-lg font-semibold text-white group-hover:text-gold-300 transition-colors duration-200 mb-1">
                  {opt.label}
                </p>
                <p className="text-slate-500 text-sm">{opt.desc}</p>
              </button>
            ))}
          </div>
        )}

        {/* ── Step 2: Duration ── */}
        {step === 2 && (
          <div>
            <p className="text-slate-400 text-sm mb-5">How long do you need?</p>
            <div className="space-y-3">
              {(type === 'virtual' ? VIRTUAL_DURATIONS : INPERSON_DURATIONS).map(d => (
                <button
                  key={d}
                  onClick={() => { setDuration(d); setStep(3) }}
                  className="w-full text-left p-5 bg-navy-800 border border-navy-700 hover:border-gold-700/50 hover:bg-navy-700/60 transition-all duration-200 group"
                >
                  <span className="font-semibold text-white group-hover:text-gold-300 transition-colors duration-200">
                    {durLabel(d)}
                  </span>
                </button>
              ))}
            </div>
            {backBtn(() => setStep(1))}
          </div>
        )}

        {/* ── Step 3: Date/time ── */}
        {step === 3 && (
          <div>
            <p className="text-slate-400 text-sm mb-6">Select a date and time</p>

            {loadingSlots ? (
              <div className="text-center py-16 text-slate-600 text-sm">Loading availability…</div>
            ) : error ? (
              <div className="text-center py-10 text-red-400 text-sm">{error}</div>
            ) : dates.length === 0 ? (
              <div className="text-center py-16 text-slate-600 text-sm">
                No availability found in the next 60 days. Please check back soon.
              </div>
            ) : (
              <div className="space-y-2">
                {dates.slice(0, visibleDateCount).map(dk => {
                  const isOpen = expandedDate === dk
                  return (
                    <div key={dk} className={`border transition-colors duration-200 ${isOpen ? 'border-gold-700/50' : 'border-navy-700'}`}>
                      <button
                        onClick={() => setExpandedDate(isOpen ? null : dk)}
                        className="w-full flex items-center justify-between px-4 py-4 bg-navy-800 hover:bg-navy-700/60 transition-colors duration-200 group"
                      >
                        <span className={`font-medium text-sm transition-colors duration-200 ${isOpen ? 'text-gold-300' : 'text-white group-hover:text-gold-300'}`}>
                          {fmtDateHeader(slotsByDate[dk][0].start)}
                        </span>
                        <span className={`text-xs transition-all duration-200 ${isOpen ? 'text-gold-500 rotate-180' : 'text-slate-600'}`}>
                          ▾
                        </span>
                      </button>

                      {isOpen && (
                        <div className="border-t border-navy-700 bg-navy-900">
                          {slotsByDate[dk].map(slot => (
                            <button
                              key={slot.start}
                              onClick={() => { setSelectedSlot(slot); setStep(4) }}
                              className="w-full text-left px-4 py-3 text-slate-300 text-sm border-b border-navy-800 last:border-b-0 hover:bg-navy-800/60 hover:text-white transition-all duration-150"
                            >
                              {fmtTime(slot.start)} – {fmtTime(slot.end)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}

                {visibleDateCount < dates.length && (
                  <button
                    onClick={() => setVisibleDateCount(c => c + 14)}
                    className="w-full py-3.5 text-sm text-slate-500 hover:text-slate-300 border border-navy-700 hover:border-navy-600 transition-colors duration-200"
                  >
                    Show more dates →
                  </button>
                )}
              </div>
            )}

            {backBtn(() => { setStep(2); setSelectedSlot(null); setSlots([]) })}
          </div>
        )}

        {/* ── Step 4: Form ── */}
        {step === 4 && selectedSlot && (
          <div>
            {/* Summary pill */}
            <div className="mb-7 p-4 bg-navy-800 border border-navy-700">
              <p className="text-gold-600 text-xs uppercase tracking-widest font-semibold mb-1.5">
                {type === 'virtual' ? 'Virtual' : 'In-Person'} · {duration ? durLabel(duration) : ''}
              </p>
              <p className="text-white font-medium">{fmtDate(selectedSlot.start)}</p>
              <p className="text-slate-400 text-sm">
                {fmtTime(selectedSlot.start)} – {fmtTime(selectedSlot.end)} Eastern
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Full name"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>
              {type === 'inperson' && (
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">
                    Suggested Location{' '}
                    <span className="text-navy-500 normal-case font-normal tracking-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={suggestedLocation}
                    onChange={e => setSuggestedLocation(e.target.value)}
                    placeholder="e.g. church office, coffee shop…"
                    className={inputCls}
                  />
                </div>
              )}
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <button
              onClick={handleBook}
              disabled={!name.trim() || !email.trim() || submitting}
              className="w-full py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? 'Booking…' : 'Confirm Booking'}
            </button>
            {backBtn(() => { setStep(3); setError(null) })}
          </div>
        )}

        {/* ── Step 5: Confirmation ── */}
        {step === 5 && selectedSlot && (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-gold-500/10 border border-gold-700/30">
              <svg className="w-7 h-7 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h2 className="font-serif text-2xl font-bold text-white mb-3">You&apos;re booked!</h2>
            <p className="text-slate-400 leading-relaxed text-sm max-w-xs mx-auto">
              {result?.isVirtual
                ? 'A Google Meet link will be in your confirmation email.'
                : 'Pastor Bill will be in touch to confirm the location details.'}
            </p>

            <div className="mt-8 p-4 bg-navy-800 border border-navy-700 text-left">
              <p className="text-gold-600 text-xs uppercase tracking-widest font-semibold mb-2">
                Appointment Details
              </p>
              <p className="text-white font-medium">{fmtDate(selectedSlot.start)}</p>
              <p className="text-slate-400 text-sm">
                {fmtTime(selectedSlot.start)} – {fmtTime(selectedSlot.end)} Eastern
              </p>
              <p className="text-slate-600 text-xs mt-1">
                {result?.isVirtual ? 'Virtual' : 'In-Person'} · {duration ? durLabel(duration) : ''}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
