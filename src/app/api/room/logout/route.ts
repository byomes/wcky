import { NextResponse } from 'next/server'
import { PARTNER_COOKIE, ADMIN_COOKIE } from '@/lib/writing-room-auth'

export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(PARTNER_COOKIE, '', { httpOnly: true, maxAge: 0, path: '/' })
  response.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, maxAge: 0, path: '/' })
  return response
}
