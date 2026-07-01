const WATSON_BASE = (process.env.WATSON_API_URL ?? '').replace(/\/$/, '')
const WATSON_KEY  = process.env.WATSON_API_KEY ?? ''

function headers() {
  return {
    'Content-Type': 'application/json',
    'X-Watson-Key': WATSON_KEY,
  }
}

export interface TwjReaderSession {
  username: string
  name: string
  email: string
}

export async function loginReader(
  username: string,
  password: string,
): Promise<TwjReaderSession | null> {
  try {
    const res = await fetch(`${WATSON_BASE}/api/publishing/twj/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ username, password }),
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json() as Promise<TwjReaderSession>
  } catch {
    return null
  }
}

export async function getReaderSession(username: string): Promise<TwjReaderSession | null> {
  try {
    const res = await fetch(`${WATSON_BASE}/api/publishing/twj/reader/${encodeURIComponent(username)}`, {
      headers: headers(),
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json() as Promise<TwjReaderSession>
  } catch {
    return null
  }
}

export async function submitReaderFeedback(
  username: string,
  chapter: string,
  text: string,
): Promise<{ ok: boolean } | null> {
  try {
    const res = await fetch(`${WATSON_BASE}/api/publishing/twj/feedback/submit`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ username, chapter, text }),
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json() as Promise<{ ok: boolean }>
  } catch {
    return null
  }
}
