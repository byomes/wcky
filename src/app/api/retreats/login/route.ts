import { NextRequest, NextResponse } from 'next/server'
import { checkPassphrase, makeFamilyCookieValue, SESSION_COOKIE, MAX_AGE } from '@/lib/retreats-auth'

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  const passphrase = data?.passphrase ?? ''

  if (!passphrase || !checkPassphrase(passphrase)) {
    return NextResponse.json({ error: 'Incorrect passphrase.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(SESSION_COOKIE, await makeFamilyCookieValue(), {
    httpOnly: true,
    maxAge: MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  return response
}
