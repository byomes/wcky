import { NextRequest, NextResponse } from 'next/server'

const KIT_API_KEY = process.env.KIT_API_KEY
const KIT_TWJ_TAG_ID = process.env.KIT_TWJ_TAG_ID
  ? Number(process.env.KIT_TWJ_TAG_ID)
  : null

export async function POST(req: NextRequest) {
  try {
    const { firstName, email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    if (!KIT_API_KEY) {
      console.error('KIT_API_KEY is not set')
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    const body: Record<string, unknown> = { email_address: email.trim() }
    if (firstName && typeof firstName === 'string' && firstName.trim()) {
      body.first_name = firstName.trim()
    }
    if (KIT_TWJ_TAG_ID) {
      body.tags = [KIT_TWJ_TAG_ID]
    }

    const res = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': KIT_API_KEY,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('Kit API error:', err)
      return NextResponse.json(
        { error: err?.errors?.[0] ?? 'Subscription failed.' },
        { status: res.status }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('TWJ signup error:', e)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
