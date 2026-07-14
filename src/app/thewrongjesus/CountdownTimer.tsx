'use client'

import { useEffect, useState } from 'react'
import { TWJ_LAUNCH_DATE } from '@/lib/launch-dates'

function getDaysRemaining(target: Date): number {
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

interface CountdownTimerProps {
  targetDate?: string
  label?: string
  size?: 'lg' | 'sm'
}

export default function CountdownTimer({
  targetDate = TWJ_LAUNCH_DATE,
  label = 'to launch',
  size = 'lg',
}: CountdownTimerProps) {
  const [days, setDays] = useState<number | null>(null)

  useEffect(() => {
    const target = new Date(targetDate)
    setDays(getDaysRemaining(target))
    const interval = setInterval(() => setDays(getDaysRemaining(target)), 60_000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (days === null) return null

  const numberClass = size === 'sm'
    ? 'font-serif text-2xl font-bold text-gold-400 leading-none tabular-nums'
    : 'font-serif text-5xl font-bold text-gold-400 leading-none tabular-nums'
  const labelClass = size === 'sm'
    ? 'text-slate-400 text-xs uppercase tracking-widest font-semibold'
    : 'text-slate-400 text-sm uppercase tracking-widest font-semibold'

  return (
    <div className="flex items-baseline gap-3">
      <span className={numberClass}>{days}</span>
      <span className={labelClass}>
        {days === 1 ? 'day' : 'days'} {label}
      </span>
    </div>
  )
}
