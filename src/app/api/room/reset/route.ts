import { NextRequest, NextResponse } from 'next/server'
import {
  requestPasswordReset,
  validateResetToken,
  confirmPasswordReset,
} from '@/lib/writing-room-api'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') ?? ''
  const result = await validateResetToken(token)
  return NextResponse.json(result)
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  if (data.token && data.newPassword) {
    const result = await confirmPasswordReset(data.token, data.newPassword)
    if (!result) return NextResponse.json({ error: 'Invalid or expired link.' }, { status: 400 })
    return NextResponse.json({ ok: true })
  }

  if (data.email) {
    await requestPasswordReset(data.email)
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
}
