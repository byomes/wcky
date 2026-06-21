import { NextRequest, NextResponse } from 'next/server'
import { validateVerifyToken, confirmVerify } from '@/lib/writing-room-api'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') ?? ''
  if (!token) return NextResponse.json({ valid: false }, { status: 400 })

  const result = await validateVerifyToken(token)
  return NextResponse.json(result)
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const token = (data.token ?? '').trim()
  const password = data.password ?? ''

  if (!token || !password)
    return NextResponse.json({ error: 'Token and password are required.' }, { status: 400 })
  if (password.length < 8)
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })

  const result = await confirmVerify(token, password)
  if (!result) return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
