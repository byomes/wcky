import { NextRequest, NextResponse } from 'next/server'

const WATSON = (process.env.WATSON_API_URL ?? '').replace(/\/$/, '')
const KEY    = process.env.WATSON_API_KEY ?? ''

const GENERIC_MESSAGE = "If that email is on file, we've sent a new password to it."

export async function POST(req: NextRequest) {
  const data  = await req.json().catch(() => null)
  const email = (data?.email ?? '').trim().toLowerCase()

  // Always the same response, whether or not the email matched a reader,
  // whether or not it was even provided, and whether or not the Watson
  // call below succeeds — no enumeration, no leaking transient errors.
  const genericResponse = NextResponse.json({ ok: true, message: GENERIC_MESSAGE })

  if (!email) return genericResponse

  try {
    await fetch(`${WATSON}/api/arc/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Watson-Key': KEY },
      body: JSON.stringify({ email }),
      cache: 'no-store',
    })
  } catch {
    // swallow — response stays identical either way
  }

  return genericResponse
}
