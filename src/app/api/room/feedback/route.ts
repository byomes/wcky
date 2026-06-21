import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getPartnerSession, PARTNER_COOKIE } from '@/lib/writing-room-auth'
import { submitBetaFeedback } from '@/lib/writing-room-api'

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  if (!data.targetSlug || !data.targetType)
    return NextResponse.json({ error: 'targetSlug and targetType are required.' }, { status: 400 })

  const result = await submitBetaFeedback({
    partnerId: session.partnerId,
    targetType: data.targetType,
    targetSlug: data.targetSlug,
    reaction: data.reaction,
    comment: data.comment,
  })
  if (!result) return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
