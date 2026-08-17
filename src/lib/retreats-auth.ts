const SESSION_COOKIE = 'retreats_session'
const MAX_AGE = 90 * 24 * 60 * 60

function getSecret(): string {
  return process.env.RETREATS_SESSION_SECRET ?? 'dev-secret-change-me-in-production'
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

async function signPayload(data: object): Promise<string> {
  const payload = JSON.stringify(data)
  const b64 = btoa(payload)
  const key = await importHmacKey(getSecret())
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(b64))
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return `${b64}.${hex}`
}

async function verifyToken<T>(token: string): Promise<T | null> {
  const lastDot = token.lastIndexOf('.')
  if (lastDot === -1) return null

  const b64 = token.slice(0, lastDot)
  const hexSig = token.slice(lastDot + 1)

  const key = await importHmacKey(getSecret())
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(b64))
  const expectedHex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  if (hexSig.length !== expectedHex.length) return null
  let diff = 0
  for (let i = 0; i < hexSig.length; i++) {
    diff |= hexSig.charCodeAt(i) ^ expectedHex.charCodeAt(i)
  }
  if (diff !== 0) return null

  try {
    return JSON.parse(atob(b64)) as T
  } catch {
    return null
  }
}

export type FamilySession = { family: true }

export async function getFamilySession(cookieValue: string | undefined): Promise<FamilySession | null> {
  if (!cookieValue) return null
  return verifyToken<FamilySession>(cookieValue)
}

export async function makeFamilyCookieValue(): Promise<string> {
  return signPayload({ family: true })
}

export function checkPassphrase(candidate: string): boolean {
  const expected = process.env.RETREATS_PASSPHRASE
  if (!expected) return false
  return candidate === expected
}

export function checkIngestKey(candidate: string | null): boolean {
  const expected = process.env.RETREATS_API_KEY
  if (!expected || !candidate) return false
  if (candidate.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < candidate.length; i++) {
    diff |= candidate.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return diff === 0
}

export { SESSION_COOKIE, MAX_AGE }
