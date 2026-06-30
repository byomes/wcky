'use client'

import { useState, useRef, useCallback } from 'react'

interface Commitment {
  id: number
  commitment_number: number
  commitment_text: string
  is_checked: number
  evidence_text: string | null
  submitted_at: string | null
  flagged_as_suspicious: number
  approved_by_admin: number
}

interface DashboardData {
  reader: { id: number; first_name: string; last_name: string; email: string }
  commitments: Commitment[]
  progress: { checked: number; total: number }
}

const EVIDENCE_REQUIRED = new Set([4, 5, 6])

type RowStatus = 'idle' | 'saving' | 'saved' | 'error'

export default function ArcDashboard({ initialData }: { initialData: DashboardData }) {
  const [evidence, setEvidence] = useState<Record<number, string>>(() => {
    const m: Record<number, string> = {}
    for (const c of initialData.commitments) {
      m[c.commitment_number] = c.evidence_text ?? ''
    }
    return m
  })
  const [checked, setChecked] = useState<Record<number, boolean>>(() => {
    const m: Record<number, boolean> = {}
    for (const c of initialData.commitments) {
      m[c.commitment_number] = !!c.is_checked
    }
    return m
  })
  const [rowStatus, setRowStatus] = useState<Record<number, RowStatus>>({})

  // Debounce timers keyed by commitment_number
  const debounceRefs = useRef<Record<number, ReturnType<typeof setTimeout>>>({})

  const checkedCount = Object.values(checked).filter(Boolean).length

  const saveOne = useCallback(async (num: number, isChecked: boolean, evidenceVal: string) => {
    setRowStatus((prev) => ({ ...prev, [num]: 'saving' }))
    try {
      const res = await fetch('/api/arc/commitments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          updates: [{
            commitment_number: num,
            is_checked: isChecked,
            evidence_text: evidenceVal.trim() || null,
          }],
        }),
      })
      setRowStatus((prev) => ({ ...prev, [num]: res.ok ? 'saved' : 'error' }))
      if (res.ok) {
        setTimeout(() => setRowStatus((prev) => ({ ...prev, [num]: 'idle' })), 2000)
      }
    } catch {
      setRowStatus((prev) => ({ ...prev, [num]: 'error' }))
    }
  }, [])

  function scheduleEvidenceSave(num: number, isChecked: boolean, val: string) {
    clearTimeout(debounceRefs.current[num])
    debounceRefs.current[num] = setTimeout(() => {
      saveOne(num, isChecked, val)
    }, 800)
  }

  function handleCheck(num: number, val: boolean) {
    if (num === 2) return
    if (EVIDENCE_REQUIRED.has(num) && val && !evidence[num]?.trim()) return
    setChecked((prev) => ({ ...prev, [num]: val }))
    // Cancel any pending evidence debounce before firing the checkbox save
    clearTimeout(debounceRefs.current[num])
    saveOne(num, val, evidence[num] ?? '')
  }

  function handleEvidence(num: number, val: string) {
    setEvidence((prev) => ({ ...prev, [num]: val }))
    // Un-check if evidence is cleared
    if (!val.trim() && checked[num]) {
      setChecked((prev) => ({ ...prev, [num]: false }))
    }
    // Debounce-save evidence text; use current checked state (val may have just un-checked it)
    const currentlyChecked = val.trim() ? (checked[num] ?? false) : false
    scheduleEvidenceSave(num, currentlyChecked, val)
  }

  function rowIndicator(num: number) {
    const s = rowStatus[num] ?? 'idle'
    if (s === 'saving') return <span className="text-xs text-slate-500 ml-2">saving…</span>
    if (s === 'saved')  return <span className="text-xs text-emerald-400 ml-2">✓ saved</span>
    if (s === 'error')  return <span className="text-xs text-red-400 ml-2">save failed</span>
    return null
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-slate-500 mb-2 font-mono">
          <span>{checkedCount} of 6 completed</span>
          <span>{Math.round((checkedCount / 6) * 100)}%</span>
        </div>
        <div className="h-1 bg-navy-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold-500 transition-all duration-500"
            style={{ width: `${(checkedCount / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Commitment list */}
      <ol className="space-y-6">
        {initialData.commitments.map((c) => {
          const needsEvidence = EVIDENCE_REQUIRED.has(c.commitment_number)
          const isAutoChecked = c.commitment_number === 2
          const evidenceValue = evidence[c.commitment_number] ?? ''
          const isChecked     = checked[c.commitment_number] ?? false
          const canCheck      = isAutoChecked || !needsEvidence || !!evidenceValue.trim()

          return (
            <li key={c.id} className="bg-navy-900 border border-navy-700 p-5">
              <div className="flex gap-4 items-start">
                <span className="shrink-0 w-7 h-7 flex items-center justify-center border border-gold-600/40 text-gold-500 text-xs font-bold font-serif mt-0.5">
                  {c.commitment_number}
                </span>
                <div className="flex-1">
                  <div className="flex gap-3 items-start">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isAutoChecked || !canCheck}
                      onChange={(e) => handleCheck(c.commitment_number, e.target.checked)}
                      className="mt-1 shrink-0 w-4 h-4 accent-gold-500 cursor-pointer disabled:cursor-default disabled:opacity-50"
                    />
                    <div className="flex-1">
                      <label
                        className={`text-sm leading-relaxed cursor-pointer ${isChecked ? 'text-slate-300 line-through opacity-60' : 'text-slate-300'}`}
                        onClick={() => handleCheck(c.commitment_number, !isChecked)}
                      >
                        {c.commitment_text}
                      </label>
                      {rowIndicator(c.commitment_number)}
                    </div>
                  </div>

                  {needsEvidence && (
                    <div className="mt-3 ml-7">
                      <label className="block text-xs text-slate-500 mb-1 uppercase tracking-widest">
                        How did you fulfill this? (required)
                      </label>
                      <textarea
                        rows={3}
                        value={evidenceValue}
                        onChange={(e) => handleEvidence(c.commitment_number, e.target.value)}
                        placeholder="Describe how you completed this commitment…"
                        className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-600 px-3 py-2 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors resize-none"
                      />
                    </div>
                  )}

                  {c.approved_by_admin === 1 && (
                    <p className="mt-1 ml-7 text-xs text-emerald-500">✓ Verified</p>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
