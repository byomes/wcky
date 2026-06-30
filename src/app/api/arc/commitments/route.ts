import { NextRequest, NextResponse } from 'next/server'

const WATSON = (process.env.WATSON_API_URL ?? '').replace(/\/$/, '')
const KEY    = process.env.WATSON_API_KEY ?? ''

export async function POST(req: NextRequest) {
  const token = req.cookies.get('arc_session')?.value
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  try {
    const res = await fetch(`${WATSON}/api/arc/commitments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Watson-Key': KEY,
        'X-Arc-Session': token,
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    })
    const body = await res.json()
    return NextResponse.json(body, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Watson unreachable' }, { status: 502 })
  }
}
