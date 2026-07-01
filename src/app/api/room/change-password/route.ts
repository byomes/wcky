import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getPartnerSession, PARTNER_COOKIE } from '@/lib/writing-room-auth'

const WATSON_BASE = process.env.WATSON_API_URL
const WATSON_KEY = process.env.WATSON_API_KEY

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const currentPassword = data.currentPassword ?? ''
  const newPassword = data.newPassword ?? ''
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Current and new password are required.' }, { status: 400 })
  }

  try {
    const res = await fetch(`${WATSON_BASE}/api/writing-room/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Watson-Key': WATSON_KEY ?? '' },
      body: JSON.stringify({
        partner_id: session.partnerId,
        current_password: currentPassword,
        new_password: newPassword,
      }),
    })
    if (res.status === 401) {
      return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 })
    }
    if (!res.ok) {
      return NextResponse.json({ error: 'Server error.' }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
