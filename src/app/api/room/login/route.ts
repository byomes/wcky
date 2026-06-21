import { NextRequest, NextResponse } from 'next/server'
import { makePartnerCookieValue, PARTNER_COOKIE, MAX_AGE } from '@/lib/writing-room-auth'

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const username = (data.username ?? '').trim()
  const password = data.password ?? ''

  if (!username || !password)
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 })

  const res = await fetch(
    `${process.env.WATSON_API_URL}/api/writing-room/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Watson-Key': process.env.WATSON_API_KEY ?? '' },
      body: JSON.stringify({ username, password }),
      cache: 'no-store',
    },
  )

  if (res.status === 403) {
    const body = await res.json().catch(() => ({}))
    if (body.error === 'pending_verification') {
      return NextResponse.json(
        { error: 'Please check your email to verify your account before logging in.' },
        { status: 403 },
      )
    }
  }

  if (!res.ok) return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })

  const partner = await res.json().catch(() => null)
  if (!partner) return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })

  const cookieValue = await makePartnerCookieValue({
    partnerId: partner.partnerId,
    username: partner.username,
    name: partner.name,
  })

  const response = NextResponse.json({ ok: true })
  response.cookies.set(PARTNER_COOKIE, cookieValue, {
    httpOnly: true,
    maxAge: MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  return response
}
