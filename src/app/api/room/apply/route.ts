import { NextRequest, NextResponse } from 'next/server'
import { submitApplication } from '@/lib/writing-room-api'

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const name = (data.name ?? '').trim()
  const email = (data.email ?? '').trim()
  const why_join = (data.why_join ?? '').trim()
  const agreed_to_participate = data.agreed_to_participate === true

  if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
  if (why_join.length < 50)
    return NextResponse.json(
      { error: 'Please write at least 50 characters about why you want to join.' },
      { status: 400 },
    )
  if (!agreed_to_participate)
    return NextResponse.json({ error: 'You must agree to participate actively.' }, { status: 400 })

  const result = await submitApplication({ name, email, why_join, agreed_to_participate })
  if (!result) return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
