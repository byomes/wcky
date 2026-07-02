'use client'

import { useEffect, useState } from 'react'
import { TWJ_LAUNCH_DATE } from '@/lib/launch-dates'

const LAUNCH_DATE = new Date(TWJ_LAUNCH_DATE)

function getDaysRemaining(): number {
  const now = new Date()
  const diff = LAUNCH_DATE.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default function CountdownTimer() {
  const [days, setDays] = useState<number | null>(null)

  useEffect(() => {
    setDays(getDaysRemaining())
  }, [])

  if (days === null) return null

  return (
    <div className="flex items-baseline gap-3">
      <span className="font-serif text-5xl font-bold text-gold-400 leading-none tabular-nums">
        {days}
      </span>
      <span className="text-slate-400 text-sm uppercase tracking-widest font-semibold">
        {days === 1 ? 'day' : 'days'} to launch
      </span>
    </div>
  )
}
