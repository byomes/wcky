import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'

const CALENDAR_ID = 'bill.yomes@gmail.com'

function fmt(iso: string, opts: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', ...opts }).format(new Date(iso))
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, start, end, type, duration, suggestedLocation } = body

  if (!name || !email || !start || !end || !type) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const isVirtual = type === 'virtual'

  // ── Google Calendar event ──
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  )
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
  const calendar = google.calendar({ version: 'v3', auth })

  const descLines = [
    'Booked via wcky.com',
    `Guest: ${name} (${email})`,
    ...(!isVirtual && suggestedLocation ? [`Suggested Location: ${suggestedLocation}`] : []),
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventBody: Record<string, any> = {
    summary: isVirtual ? `Virtual Appointment — ${name}` : `In-Person Appointment — ${name}`,
    description: descLines.join('\n'),
    start: { dateTime: start, timeZone: 'America/New_York' },
    end: { dateTime: end, timeZone: 'America/New_York' },
    attendees: [{ email }],
    ...(isVirtual && {
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    }),
  }

  const event = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    requestBody: eventBody,
    conferenceDataVersion: isVirtual ? 1 : 0,
    sendUpdates: 'none',
  })

  const meetLink = event.data.conferenceData?.entryPoints?.[0]?.uri ?? null

  // ── Format date/time for notifications ──
  const dateStr = fmt(start, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const startTime = fmt(start, { hour: 'numeric', minute: '2-digit', hour12: true })
  const endTime   = fmt(end,   { hour: 'numeric', minute: '2-digit', hour12: true })
  const timeRange = `${startTime} – ${endTime} Eastern`

  // ── Confirmation email ──
  const smtpPort = parseInt(process.env.WATSON_SMTP_PORT ?? '587', 10)
  const transporter = nodemailer.createTransport({
    host: process.env.WATSON_SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.WATSON_SMTP_USER,
      pass: process.env.WATSON_SMTP_PASS,
    },
  })

  const emailLines = isVirtual
    ? [
        `Hi ${name},`,
        ``,
        `Your virtual appointment with Pastor Bill is confirmed.`,
        ``,
        `Date: ${dateStr}`,
        `Time: ${timeRange}`,
        ``,
        `Google Meet Link:`,
        meetLink ?? '(link unavailable — please reply to this email)',
        ``,
        `See you then!`,
        ``,
        `— Dr. William C.K. Yomes`,
      ]
    : [
        `Hi ${name},`,
        ``,
        `Your appointment request with Pastor Bill has been received.`,
        ``,
        `Date: ${dateStr}`,
        `Time: ${timeRange}`,
        ``,
        `Pastor Bill will be in touch to confirm the location details.`,
        ``,
        `— Dr. William C.K. Yomes`,
      ]

  await transporter.sendMail({
    from: process.env.WATSON_SMTP_FROM,
    to: email,
    subject: isVirtual
      ? `Your Virtual Appointment with Pastor Bill — ${dateStr}`
      : `Your Appointment with Pastor Bill — ${dateStr}`,
    text: emailLines.join('\n'),
  })

  // ── Telegram notification ──
  const tgToken  = process.env.TELEGRAM_BOT_TOKEN
  const tgChatId = process.env.TELEGRAM_CHAT_ID

  if (tgToken && tgChatId) {
    const typeLabel = isVirtual ? 'Virtual' : 'In-Person'
    const tgLines = [
      `📅 New ${typeLabel} appointment booked`,
      `${name} (${email})`,
      `${dateStr} at ${startTime}`,
      ...(!isVirtual && suggestedLocation ? [`Suggested location: ${suggestedLocation}`] : []),
    ]
    await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: tgChatId, text: tgLines.join('\n') }),
    })
  }

  return NextResponse.json({ success: true, meetLink, isVirtual })
}
