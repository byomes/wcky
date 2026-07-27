'use client'

import { useEffect, useRef, useState } from 'react'

type Campus = 'wilmington' | 'online'

interface StoredProfile {
  campus: Campus
  firstName: string
  lastName: string
  email: string
  phone: string
}

const STORAGE_KEY = 'catalyst_connect_card_profile'
const CHAR_LIMIT = 3000

const NEXT_STEP_OPTIONS = [
  'I want to start following Jesus',
  'I want to get baptized',
  'I want help growing in my faith',
  'I want to become a Catalyst Partner',
  'I want to join a small group',
  'I want to join a ministry team',
]

const inputClass =
  'w-full bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-colors'
const labelClass = 'block text-sm font-medium text-gray-800 mb-1.5'
const checkboxRowClass = 'flex items-start gap-3'
const checkboxClass = 'mt-0.5 shrink-0 w-4 h-4 accent-black cursor-pointer'
const checkboxLabelClass = 'text-sm text-gray-700 leading-relaxed cursor-pointer'

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length === 0) return ''
  if (digits.length < 4) return `(${digits}`
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function readStoredProfile(): StoredProfile | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      parsed &&
      (parsed.campus === 'wilmington' || parsed.campus === 'online') &&
      typeof parsed.firstName === 'string' &&
      typeof parsed.lastName === 'string' &&
      typeof parsed.email === 'string' &&
      typeof parsed.phone === 'string'
    ) {
      return parsed as StoredProfile
    }
    return null
  } catch {
    return null
  }
}

function CharCounter({ value }: { value: string }) {
  return (
    <div className="text-right text-xs text-gray-400 mt-1">
      {value.length}/{CHAR_LIMIT}
    </div>
  )
}

export default function ConnectCardForm() {
  const [campus, setCampus] = useState<Campus | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [comment, setComment] = useState('')
  const [nextSteps, setNextSteps] = useState<string[]>([])
  const [firstSunday, setFirstSunday] = useState(false)
  const [howHeard, setHowHeard] = useState('')
  const [restrictToLeadership, setRestrictToLeadership] = useState(false)
  const [prayerRequest, setPrayerRequest] = useState('')

  const [hasStoredProfile, setHasStoredProfile] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const successTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const profile = readStoredProfile()
    if (profile) {
      setCampus(profile.campus)
      setFirstName(profile.firstName)
      setLastName(profile.lastName)
      setEmail(profile.email)
      setPhone(profile.phone)
      setHasStoredProfile(true)
    }
    return () => {
      if (successTimeout.current) clearTimeout(successTimeout.current)
    }
  }, [])

  function handleClear() {
    window.localStorage.removeItem(STORAGE_KEY)
    setCampus(null)
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setHasStoredProfile(false)
  }

  function toggleNextStep(option: string) {
    setNextSteps(prev =>
      prev.includes(option) ? prev.filter(s => s !== option) : [...prev, option],
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/connect-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campus,
          firstName,
          lastName,
          email,
          phone: phone || null,
          comment: comment || null,
          nextSteps,
          firstSunday,
          howHeard: howHeard || null,
          restrictToLeadership,
          prayerRequest: prayerRequest || null,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      // Persist only the five-field identity whitelist for next time.
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ campus, firstName, lastName, email, phone }),
      )
      setHasStoredProfile(true)

      // Clear weekly-fresh fields only — identity fields stay filled for a
      // shared kiosk device. Never persist any of these to localStorage.
      setComment('')
      setNextSteps([])
      setFirstSunday(false)
      setHowHeard('')
      setRestrictToLeadership(false)
      setPrayerRequest('')

      setSuccess(true)
      if (successTimeout.current) clearTimeout(successTimeout.current)
      successTimeout.current = setTimeout(() => setSuccess(false), 6000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
        Catalyst Connect Card
      </h1>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-700 text-sm bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          Thanks! Your connect card was submitted.
        </p>
      )}

      {hasStoredProfile && (
        <button
          type="button"
          onClick={handleClear}
          className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-800"
        >
          Not you? Clear
        </button>
      )}

      <fieldset>
        <legend className={labelClass}>Where did you attend with us? *</legend>
        <div className="space-y-2">
          <label className={checkboxRowClass}>
            <input
              type="radio"
              name="campus"
              value="wilmington"
              required
              checked={campus === 'wilmington'}
              onChange={() => setCampus('wilmington')}
              className={checkboxClass}
            />
            <span className={checkboxLabelClass}>Wilmington Campus</span>
          </label>
          <label className={checkboxRowClass}>
            <input
              type="radio"
              name="campus"
              value="online"
              required
              checked={campus === 'online'}
              onChange={() => setCampus('online')}
              className={checkboxClass}
            />
            <span className={checkboxLabelClass}>Online Campus</span>
          </label>
        </div>
      </fieldset>

      {campus && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                type="text"
                required
                autoComplete="given-name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                type="text"
                required
                autoComplete="family-name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(___) ___-____"
              value={phone}
              onChange={e => setPhone(formatPhone(e.target.value))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="comment">Do you have a question/comment?</label>
            <textarea
              id="comment"
              rows={3}
              maxLength={CHAR_LIMIT}
              autoComplete="off"
              value={comment}
              onChange={e => setComment(e.target.value)}
              className={inputClass}
            />
            <CharCounter value={comment} />
          </div>

          <fieldset>
            <legend className={labelClass}>Are you ready to take a Next Step this week?</legend>
            <div className="space-y-2">
              {NEXT_STEP_OPTIONS.map(option => (
                <label key={option} className={checkboxRowClass}>
                  <input
                    type="checkbox"
                    name="nextSteps"
                    checked={nextSteps.includes(option)}
                    onChange={() => toggleNextStep(option)}
                    className={checkboxClass}
                  />
                  <span className={checkboxLabelClass}>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className={checkboxRowClass}>
              <input
                type="checkbox"
                name="firstSunday"
                checked={firstSunday}
                onChange={e => setFirstSunday(e.target.checked)}
                className={checkboxClass}
              />
              <span className={checkboxLabelClass}>
                <span className="block font-medium text-gray-800 mb-0.5">
                  Is this your first Sunday with us?
                </span>
                Yes it is!
              </span>
            </label>

            {firstSunday && (
              <div className="mt-3 ml-7">
                <label className={labelClass} htmlFor="howHeard">
                  Please share who/how you heard about Catalyst:
                </label>
                <textarea
                  id="howHeard"
                  rows={3}
                  maxLength={CHAR_LIMIT}
                  autoComplete="off"
                  value={howHeard}
                  onChange={e => setHowHeard(e.target.value)}
                  className={inputClass}
                />
                <CharCounter value={howHeard} />
              </div>
            )}
          </div>

          <div>
            <label className={checkboxRowClass}>
              <input
                type="checkbox"
                name="restrictToLeadership"
                checked={restrictToLeadership}
                onChange={e => setRestrictToLeadership(e.target.checked)}
                className={checkboxClass}
              />
              <span className={checkboxLabelClass}>
                <span className="block font-medium text-gray-800 mb-0.5">
                  Prayer requests are shared with our church family. Please let us know if you
                  want your request shared with leadership only.
                </span>
                Please restrict my request to leadership only.
              </span>
            </label>
          </div>

          <div>
            <label className={labelClass} htmlFor="prayerRequest">
              How can we pray for you this week?
            </label>
            <textarea
              id="prayerRequest"
              rows={3}
              maxLength={CHAR_LIMIT}
              autoComplete="off"
              value={prayerRequest}
              onChange={e => setPrayerRequest(e.target.value)}
              className={inputClass}
            />
            <CharCounter value={prayerRequest} />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto bg-black hover:bg-gray-900 disabled:opacity-60 text-white font-semibold py-3.5 px-10 rounded-full text-sm tracking-wide transition-colors"
      >
        {submitting ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  )
}
