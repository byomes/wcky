import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const slug = (data.slug ?? '').trim()
  if (!slug) return NextResponse.json({ error: 'Slug is required.' }, { status: 400 })

  try {
    const res = await fetch(`${process.env.WATSON_API_URL}/api/lead-magnet/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Watson-Key': process.env.WATSON_API_KEY ?? '',
      },
      body: JSON.stringify({ slug }),
      cache: 'no-store',
    })
    if (!res.ok) return NextResponse.json({ error: 'Server error.' }, { status: res.status })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
