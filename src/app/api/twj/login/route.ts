import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

async function kvGet(key: string): Promise<string | null> {
  const url = process.env.VERCEL_KV_REST_API_URL
  const token = process.env.VERCEL_KV_REST_API_TOKEN
  if (!url || !token) return null

  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['GET', key]),
    cache: 'no-store',
  })
  const data = await res.json()
  return data.result ?? null
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    const raw = await kvGet(`twj:reader:${username}`)
    if (!raw) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const user = (typeof raw === 'string' ? JSON.parse(raw) : raw) as { name: string; email: string; password: string }
    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const response = NextResponse.json({ ok: true, name: user.name })
    response.cookies.set('twj_session', username, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
