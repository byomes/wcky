import { NextRequest, NextResponse } from 'next/server'

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'
const SENDER_EMAIL = 'watson@williamckyomes.com'
const SENDER_NAME = 'Watson'

interface ConnectCardPayload {
  campus: 'wilmington' | 'online'
  firstName: string
  lastName: string
  email: string
  phone: string | null
  comment: string | null
  nextSteps: string[]
  firstSunday: boolean
  howHeard: string | null
  restrictToLeadership: boolean
  prayerRequest: string | null
}

function campusLabel(campus: string): string {
  return campus === 'online' ? 'Online' : 'Wilmington'
}

function buildSubject(data: ConnectCardPayload): string {
  const flags: string[] = []
  if (data.firstSunday) flags.push(' 🆕 First Sunday')
  if (data.prayerRequest && data.prayerRequest.trim()) flags.push(' 🙏 Prayer Request')
  return `Connect Card — ${campusLabel(data.campus)} — ${data.firstName} ${data.lastName}${flags.join('')}`
}

function buildBody(data: ConnectCardPayload): string {
  const lines: string[] = []
  lines.push(`Campus: ${campusLabel(data.campus)}`)
  lines.push(`Name: ${data.firstName} ${data.lastName}`)
  lines.push(`Email: ${data.email}`)
  if (data.phone && data.phone.trim()) lines.push(`Phone: ${data.phone}`)

  if (data.comment && data.comment.trim()) {
    lines.push('')
    lines.push(`Comment: ${data.comment}`)
  }

  if (data.nextSteps.length > 0) {
    lines.push('')
    lines.push('Next Steps requested:')
    for (const step of data.nextSteps) lines.push(`- ${step}`)
  }

  if (data.firstSunday) {
    lines.push('')
    lines.push('First Sunday: Yes')
    if (data.howHeard && data.howHeard.trim()) {
      lines.push(`Heard about us via: ${data.howHeard}`)
    }
  }

  if (data.prayerRequest && data.prayerRequest.trim()) {
    lines.push('')
    const label = data.restrictToLeadership
      ? 'Prayer request (restricted to leadership only)'
      : 'Prayer request'
    lines.push(`${label}: ${data.prayerRequest}`)
  }

  return lines.join('\n')
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const campus = (data.campus ?? '').trim()
  const firstName = (data.firstName ?? '').trim()
  const lastName = (data.lastName ?? '').trim()
  const email = (data.email ?? '').trim()

  if (campus !== 'wilmington' && campus !== 'online') {
    return NextResponse.json({ error: 'Please select a campus.' }, { status: 400 })
  }
  if (!firstName) return NextResponse.json({ error: 'First name is required.' }, { status: 400 })
  if (!lastName) return NextResponse.json({ error: 'Last name is required.' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
  }

  const payload: ConnectCardPayload = {
    campus,
    firstName,
    lastName,
    email,
    phone: (data.phone ?? '').trim() || null,
    comment: (data.comment ?? '').trim() || null,
    nextSteps: Array.isArray(data.nextSteps) ? data.nextSteps.filter((s: unknown) => typeof s === 'string') : [],
    firstSunday: Boolean(data.firstSunday),
    howHeard: (data.howHeard ?? '').trim() || null,
    restrictToLeadership: Boolean(data.restrictToLeadership),
    prayerRequest: (data.prayerRequest ?? '').trim() || null,
  }

  const toRecipients = [
    { email: process.env.CONNECT_CARD_TO_BILL, name: 'Bill' },
    { email: process.env.CONNECT_CARD_TO_DONNA, name: 'Donna' },
    { email: process.env.CONNECT_CARD_TO_TYLER, name: 'Tyler' },
  ].filter((r): r is { email: string; name: string } => Boolean(r.email))

  if (toRecipients.length === 0) {
    console.error('[connect-card] No recipient env vars configured (CONNECT_CARD_TO_BILL/DONNA/TYLER) — submission accepted but not emailed.')
  } else {
    try {
      const brevoRes = await fetch(BREVO_API_URL, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': process.env.BREVO_API_KEY_CONNECT_CARD ?? '',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { email: SENDER_EMAIL, name: SENDER_NAME },
          to: toRecipients,
          // Brevo rejects a recipient object with a missing/empty "name" the same
          // as a missing key ("name is missing in to") — every entry here (to and
          // bcc) must always carry a non-empty name.
          ...(process.env.CONNECT_CARD_BCC
            ? { bcc: [{ email: process.env.CONNECT_CARD_BCC, name: 'Watson Intake' }] }
            : {}),
          subject: buildSubject(payload),
          textContent: buildBody(payload),
        }),
        signal: AbortSignal.timeout(15000),
      })

      if (!brevoRes.ok) {
        const errText = await brevoRes.text().catch(() => '')
        console.error(`[connect-card] Brevo API ${brevoRes.status}: ${errText}`)
      }
    } catch (err) {
      console.error('[connect-card] Brevo send failed (non-fatal, submission still accepted):', err)
    }
  }

  return NextResponse.json({ ok: true })
}
