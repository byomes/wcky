import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { makeAdminCookieValue, ADMIN_COOKIE, MAX_AGE } from '@/lib/writing-room-auth'

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { username, password } = data
  const adminUser = process.env.WRITING_ROOM_ADMIN_USER
  const adminPassHash = process.env.WRITING_ROOM_ADMIN_PASS

  if (!adminUser || !adminPassHash)
    return NextResponse.json({ error: 'Admin not configured.' }, { status: 500 })

  if (username !== adminUser)
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })

  const valid = await bcrypt.compare(password, adminPassHash)
  if (!valid) return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })

  const cookieValue = await makeAdminCookieValue()
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, cookieValue, {
    httpOnly: true,
    maxAge: MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  return response
}
