import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

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

async function kvSet(key: string, value: string): Promise<void> {
  const url = process.env.VERCEL_KV_REST_API_URL
  const token = process.env.VERCEL_KV_REST_API_TOKEN
  if (!url || !token) return

  await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['SET', key, value]),
  })
}

async function kvRpush(key: string, value: string): Promise<void> {
  const url = process.env.VERCEL_KV_REST_API_URL
  const token = process.env.VERCEL_KV_REST_API_TOKEN
  if (!url || !token) return

  await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['RPUSH', key, value]),
  })
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const session = cookieStore.get('twj_session')

    if (!session?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const username = session.value
    const raw = await kvGet(`twj:reader:${username}`)
    if (!raw) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = JSON.parse(raw) as { name: string; email: string; password: string }
    const { chapter, text } = await req.json()

    if (!chapter || !text?.trim()) {
      return NextResponse.json({ error: 'chapter and text are required' }, { status: 400 })
    }

    const submittedAt = new Date().toISOString()

    await kvSet(
      `twj:feedback:${chapter}:${username}`,
      JSON.stringify({ name: user.name, username, chapter, text, submittedAt })
    )

    await kvRpush(
      'twj:feedback:all',
      JSON.stringify({ username, name: user.name, chapter, text, submittedAt })
    )

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
