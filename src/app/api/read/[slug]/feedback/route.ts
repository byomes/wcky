import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

async function kvRun(command: unknown[]): Promise<unknown> {
  const url = process.env.VERCEL_KV_REST_API_URL
  const token = process.env.VERCEL_KV_REST_API_TOKEN
  if (!url || !token) throw new Error('KV env vars not set')
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
  })
  const data = await res.json()
  return data.result
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const cookieStore = await cookies()
    const session = cookieStore.get(`read_${slug}_session`)
    if (!session?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const username = session.value
    const { chapter, text } = await req.json()
    if (!chapter || !text?.trim()) {
      return NextResponse.json({ error: 'Missing chapter or text' }, { status: 400 })
    }

    const readerRaw = await kvRun(['GET', `book:${slug}:reader:${username}`]) as string | null
    if (!readerRaw) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const reader = (typeof readerRaw === 'string' ? JSON.parse(readerRaw) : readerRaw) as { name: string }

    const item = JSON.stringify({
      username,
      name: reader.name,
      chapter,
      text: text.trim(),
      submittedAt: new Date().toISOString(),
    })

    await kvRun(['SET', `book:${slug}:feedback:${chapter}:${username}`, item])
    await kvRun(['RPUSH', `book:${slug}:feedback:all`, item])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
