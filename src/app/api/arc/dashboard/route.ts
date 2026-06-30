import { NextRequest, NextResponse } from 'next/server'

const WATSON = (process.env.WATSON_API_URL ?? '').replace(/\/$/, '')
const KEY    = process.env.WATSON_API_KEY ?? ''

export async function GET(req: NextRequest) {
  const token = req.cookies.get('arc_session')?.value
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  try {
    const res = await fetch(`${WATSON}/api/arc/dashboard`, {
      headers: { 'X-Watson-Key': KEY, 'X-Arc-Session': token },
      cache: 'no-store',
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Watson unreachable' }, { status: 502 })
  }
}
