'use client'

import { useEffect, useState } from 'react'

const TIME_ZONE = 'America/New_York'

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const zoneFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  timeZoneName: 'short',
})

function part(formatter: Intl.DateTimeFormat, date: Date, type: Intl.DateTimeFormatPartTypes) {
  return formatter.formatToParts(date).find(p => p.type === type)?.value ?? ''
}

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!now) {
    return (
      <div>
        <div className="font-serif text-6xl sm:text-7xl md:text-8xl font-bold text-white tabular-nums leading-none">
          --:--:--
        </div>
        <div className="mt-4 h-4" />
        <div className="mt-8 h-6" />
      </div>
    )
  }

  const hour = part(timeFormatter, now, 'hour')
  const minute = part(timeFormatter, now, 'minute')
  const second = part(timeFormatter, now, 'second')
  const period = part(timeFormatter, now, 'dayPeriod')
  const zoneAbbr = part(zoneFormatter, now, 'timeZoneName')

  return (
    <div>
      <div className="flex items-baseline justify-center gap-3">
        <span className="font-serif text-6xl sm:text-7xl md:text-8xl font-bold text-white tabular-nums leading-none">
          {hour}:{minute}:{second}
        </span>
        <span className="text-gold-400 text-xl sm:text-2xl font-semibold tracking-wide">
          {period}
        </span>
      </div>

      <p className="mt-4 text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold">
        Eastern Time &middot; {zoneAbbr}
      </p>

      <p className="mt-8 text-slate-300 text-lg sm:text-xl">
        {dateFormatter.format(now)}
      </p>
    </div>
  )
}
