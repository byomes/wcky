import { NextRequest, NextResponse } from 'next/server'
import { submitArcFeedback } from '@/lib/arc-api'

export async function POST(req: NextRequest) {
  const token = req.cookies.get('arc_session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  if (!data.targetSlug || !data.targetType)
    return NextResponse.json({ error: 'targetSlug and targetType are required.' }, { status: 400 })

  const result = await submitArcFeedback(
    {
      targetType: data.targetType,
      targetSlug: data.targetSlug,
      reaction:   data.reaction,
      comment:    data.comment,
    },
    token,
  )
  if (!result) return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
