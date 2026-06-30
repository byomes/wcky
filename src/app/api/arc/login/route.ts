import { NextRequest, NextResponse } from 'next/server'

const WATSON = (process.env.WATSON_API_URL ?? '').replace(/\/$/, '')
const KEY    = process.env.WATSON_API_KEY ?? ''
const COOKIE = 'arc_session'
const MAX_AGE = 30 * 24 * 60 * 60

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const email    = (data.email    ?? '').trim().toLowerCase()
  const password =  data.password ?? ''

  if (!email || !password)
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })

  try {
    const res = await fetch(`${WATSON}/api/arc/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Watson-Key': KEY },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return NextResponse.json(
        { error: (err as Record<string, string>).error ?? 'Invalid email or password.' },
        { status: 401 },
      )
    }

    const body = await res.json()
    const response = NextResponse.json({ ok: true })
    response.cookies.set(COOKIE, body.session_token, {
      httpOnly: true,
      maxAge: MAX_AGE,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
