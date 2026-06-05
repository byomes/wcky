'use client'

import { useState } from 'react'

type Slot = { start: string; end: string; label: string }
type Day = { date: string; label: string; slots: Slot[] }
type AppType = 'virtual' | 'inperson'
type Step = 1 | 2 | 3

const FALLBACK_EMAIL = 'pastorbill@catalyst302.com'

export default function MeetPage() {
  const [step, setStep] = useState<Step>(1)
  const [appType, setAppType] = useState<AppType>('virtual')
  const [days, setDays] = useState<Day[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [form, setForm] = useState({ name: '', email: '', reason: '' })
  const [submitting, setSubmitting] = useState(false)
  const [confirmationId, setConfirmationId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function selectType(t: AppType) {
    setAppType(t)
    setStep(2)
    setLoadingSlots(true)
    setDays([])
    setError(null)
    setSelectedSlot(null)
    try {
      const res = await fetch(`/api/meet-availability?type=${t}`)
      const data = await res.json()
      setDays(data.days ?? [])
    } catch {
      setDays([])
    } finally {
      setLoadingSlots(false)
    }
  }

  function selectSlot(slot: Slot) {
    setSelectedSlot(slot)
    setError(null)
    setStep(3)
  }

  async function submitBooking() {
    if (!selectedSlot || !form.name || !form.email || !form.reason) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/meet-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          reason: form.reason,
          slot: selectedSlot,
          type: appType,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? `Something went wrong — please email ${FALLBACK_EMAIL}`)
      } else {
        setConfirmationId(data.confirmationId)
      }
    } catch {
      setError(`Booking failed — please email ${FALLBACK_EMAIL}`)
    } finally {
      setSubmitting(false)
    }
  }

  const typeLabel = appType === 'virtual' ? 'Virtual' : 'In-Person'

  return (
    <>
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Schedule a Meeting
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
            Meet with
            <br />
            <span className="text-gold-400">Pastor Bill</span>
          </h1>
        </div>
      </section>

      <section className="bg-navy-900 py-16 lg:py-24 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">

          {/* Step 1 — Choose type */}
          {step === 1 && (
            <div>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Select the type of appointment you&apos;d like to schedule.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => selectType('virtual')}
                  className="border border-navy-700 hover:border-gold-500/60 bg-navy-800 hover:bg-navy-700 p-8 text-left transition-all duration-200 group"
                >
                  <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                    Virtual
                  </p>
                  <p className="font-serif text-2xl font-bold text-white group-hover:text-gold-300 transition-colors">
                    Virtual Appointment
                  </p>
                  <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                    Meet via video or phone call.
                  </p>
                </button>
                <button
                  onClick={() => selectType('inperson')}
                  className="border border-navy-700 hover:border-gold-500/60 bg-navy-800 hover:bg-navy-700 p-8 text-left transition-all duration-200 group"
                >
                  <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                    In-Person
                  </p>
                  <p className="font-serif text-2xl font-bold text-white group-hover:text-gold-300 transition-colors">
                    In-Person Appointment
                  </p>
                  <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                    Meet at Catalyst Community Church.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Slot picker */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="text-gold-500 text-sm tracking-wide uppercase font-semibold mb-8 hover:text-gold-400 transition-colors"
              >
                ← Back
              </button>
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                {typeLabel} Appointment
              </p>
              <h2 className="font-serif text-3xl font-bold text-white mb-8">
                Choose a Time
              </h2>

              {loadingSlots && (
                <div className="space-y-8">
                  {[1, 2].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="h-3 bg-navy-700 rounded w-48 mb-4" />
                      <div className="flex flex-wrap gap-3">
                        {[1, 2, 3].map(j => (
                          <div key={j} className="h-10 bg-navy-700 rounded w-36" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loadingSlots && days.length === 0 && (
                <p className="text-slate-400 leading-relaxed">
                  Scheduling is unavailable right now — please email{' '}
                  <a
                    href={`mailto:${FALLBACK_EMAIL}`}
                    className="text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    {FALLBACK_EMAIL}
                  </a>
                </p>
              )}

              {!loadingSlots && days.length > 0 && (
                <div className="space-y-8">
                  {days.map(day => (
                    <div key={day.date}>
                      <p className="text-slate-300 font-semibold text-sm tracking-wide mb-3 border-b border-navy-700 pb-2">
                        {day.label}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {day.slots.map(slot => (
                          <button
                            key={slot.start}
                            onClick={() => selectSlot(slot)}
                            className="px-4 py-2 text-sm font-semibold border bg-navy-800 border-navy-700 text-slate-200 hover:border-gold-500/60 hover:text-white transition-all duration-200"
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3 — Form / Confirmation */}
          {step === 3 && (
            <div>
              {confirmationId ? (
                <div className="border border-gold-600/30 p-8">
                  <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                    Confirmed
                  </p>
                  <h2 className="font-serif text-3xl font-bold text-white mb-4">
                    You&apos;re scheduled.
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    A confirmation has been sent to{' '}
                    <span className="text-slate-200">{form.email}</span>. If you need
                    to cancel or reschedule, reply to that email or contact{' '}
                    <a
                      href={`mailto:${FALLBACK_EMAIL}`}
                      className="text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      {FALLBACK_EMAIL}
                    </a>
                    .
                  </p>
                  <p className="text-slate-500 text-sm">
                    Reference:{' '}
                    <span className="font-mono text-slate-300">{confirmationId}</span>
                  </p>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => { setStep(2); setError(null); }}
                    className="text-gold-500 text-sm tracking-wide uppercase font-semibold mb-8 hover:text-gold-400 transition-colors"
                  >
                    ← Back
                  </button>
                  <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                    {typeLabel} Appointment
                  </p>
                  <h2 className="font-serif text-3xl font-bold text-white mb-2">
                    Your Details
                  </h2>
                  {selectedSlot && (
                    <p className="text-gold-400 text-sm font-semibold mb-8">
                      {selectedSlot.label}
                    </p>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gold-600 tracking-widest uppercase font-semibold mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gold-600 tracking-widest uppercase font-semibold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gold-600 tracking-widest uppercase font-semibold mb-2">
                        Reason for Meeting
                      </label>
                      <textarea
                        value={form.reason}
                        onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                        placeholder="Briefly describe what you'd like to discuss..."
                        rows={4}
                        className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm leading-relaxed">{error}</p>
                    )}

                    <button
                      onClick={submitBooking}
                      disabled={submitting || !form.name || !form.email || !form.reason}
                      className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-navy-950 font-semibold py-4 px-8 text-sm tracking-[0.15em] uppercase transition-colors"
                    >
                      {submitting ? 'Booking...' : 'Book Appointment'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </>
  )
}
