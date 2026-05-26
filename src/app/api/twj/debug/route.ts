import { NextResponse } from 'next/server'

async function kvRequest(command: unknown[]): Promise<unknown> {
  const url = process.env.VERCEL_KV_REST_API_URL
  const token = process.env.VERCEL_KV_REST_API_TOKEN
  if (!url || !token) return { error: 'KV env vars missing' }
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
  })
  return res.json()
}

export async function GET() {
  try {
    const writeResult = await kvRequest(['SET', 'twj:debug:test', JSON.stringify({ hello: 'world' })])
    const readResult = await kvRequest(['GET', 'twj:debug:test'])

    const indexResult = await kvRequest(['LRANGE', 'twj:readers:index', 0, -1])
    const index = (indexResult as { result?: string[] }).result ?? []

    let firstReaderRaw: unknown = null
    if (index.length > 0) {
      firstReaderRaw = await kvRequest(['GET', `twj:reader:${index[0]}`])
    }

    return NextResponse.json({
      kvEnvVarsPresent: !!(process.env.VERCEL_KV_REST_API_URL && process.env.VERCEL_KV_REST_API_TOKEN),
      testWrite: writeResult,
      testRead: readResult,
      indexResult,
      firstReaderRaw,
    })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
