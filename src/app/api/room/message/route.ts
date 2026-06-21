import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getPartnerSession, PARTNER_COOKIE } from '@/lib/writing-room-auth'
import { submitMessage } from '@/lib/writing-room-api'

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const message = (data.message ?? '').trim()
  if (message.length < 20)
    return NextResponse.json({ error: 'Message must be at least 20 characters.' }, { status: 400 })

  const result = await submitMessage({
    partnerId: session.partnerId,
    name: session.name,
    email: data.email ?? '',
    message,
  })
  if (!result) return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
