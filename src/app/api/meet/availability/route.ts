import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const CALENDAR_ID = 'bill.yomes@gmail.com'

// Booking windows in Eastern time: day 0=Sun … 6=Sat
const BOOKING_WINDOWS = [
  { day: 3, start: { h: 10, m: 0 }, end: { h: 13, m: 0 } },  // Wed 10am–1pm
  { day: 4, start: { h: 10, m: 0 }, end: { h: 13, m: 0 } },  // Thu 10am–1pm
  { day: 4, start: { h: 19, m: 0 }, end: { h: 20, m: 30 } }, // Thu 7–8:30pm
  { day: 6, start: { h: 8,  m: 0 }, end: { h: 9,  m: 30 } }, // Sat 8–9:30am
]

function getEasternOffset(date: Date): number {
  // Returns ET UTC offset (e.g. -4 EDT, -5 EST) by checking noon UTC on that day
  const noon = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 12, 0, 0))
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(noon)
  const etHour = parseInt(parts.find(p => p.type === 'hour')?.value ?? '12', 10) % 24
  return etHour - 12 // noon ET hour minus 12 UTC hour = offset (e.g. 8-12=-4)
}

function easternToUTC(year: number, month: number, day: number, hour: number, minute: number): Date {
  const ref = new Date(Date.UTC(year, month, day, 12, 0, 0))
  const offset = getEasternOffset(ref)
  // UTC = ET_hour - offset  →  10am EDT: 10-(-4)=14:00 UTC
  return new Date(Date.UTC(year, month, day, hour - offset, minute, 0))
}

function getEasternDateParts(date: Date) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short',
  })
  const parts = fmt.formatToParts(date)
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? ''
  const dowMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return {
    year: parseInt(get('year'), 10),
    month: parseInt(get('month'), 10) - 1,
    day: parseInt(get('day'), 10),
    dow: dowMap[get('weekday')] ?? -1,
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const duration = parseInt(searchParams.get('duration') ?? '30', 10)

  if (![15, 30, 60].includes(duration)) {
    return NextResponse.json({ error: 'Invalid duration' }, { status: 400 })
  }

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  )
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

  const calendar = google.calendar({ version: 'v3', auth })

  const now = new Date()
  const windowEnd = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)

  const freeBusyResp = await calendar.freebusy.query({
    requestBody: {
      timeMin: now.toISOString(),
      timeMax: windowEnd.toISOString(),
      items: [{ id: CALENDAR_ID }],
    },
  })

  const busyTimes = (freeBusyResp.data.calendars?.[CALENDAR_ID]?.busy ?? []).map(b => ({
    start: new Date(b.start!).getTime(),
    end: new Date(b.end!).getTime(),
  }))

  const slots: { start: string; end: string }[] = []

  for (let i = 0; i < 60; i++) {
    const cursor = new Date(now.getTime() + i * 24 * 60 * 60 * 1000)
    const { year, month, day, dow } = getEasternDateParts(cursor)
    const windows = BOOKING_WINDOWS.filter(w => w.day === dow)

    for (const win of windows) {
      const winStartMin = win.start.h * 60 + win.start.m
      const winEndMin = win.end.h * 60 + win.end.m
      let slotMin = winStartMin

      while (slotMin + duration <= winEndMin) {
        const slotStart = easternToUTC(year, month, day, Math.floor(slotMin / 60), slotMin % 60)
        const endMin = slotMin + duration
        const slotEnd = easternToUTC(year, month, day, Math.floor(endMin / 60), endMin % 60)

        if (slotStart.getTime() > now.getTime()) {
          const busy = busyTimes.some(b => slotStart.getTime() < b.end && slotEnd.getTime() > b.start)
          if (!busy) {
            slots.push({ start: slotStart.toISOString(), end: slotEnd.toISOString() })
          }
        }

        slotMin += duration
      }
    }
  }

  return NextResponse.json({ slots })
}
