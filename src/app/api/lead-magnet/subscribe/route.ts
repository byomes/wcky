import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const slug = (data.slug ?? '').trim()
  const name = (data.name ?? '').trim()
  const email = (data.email ?? '').trim()

  if (!slug) return NextResponse.json({ error: 'Slug is required.' }, { status: 400 })
  if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })

  try {
    const res = await fetch(`${process.env.WATSON_API_URL}/api/lead-magnet/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Watson-Key': process.env.WATSON_API_KEY ?? '',
      },
      body: JSON.stringify({ slug, name, email }),
      cache: 'no-store',
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return NextResponse.json({ error: (err as any).error ?? 'Server error.' }, { status: res.status })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
