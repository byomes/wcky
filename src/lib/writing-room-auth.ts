const PARTNER_COOKIE = 'writing_room_session'
const ADMIN_COOKIE = 'writing_room_admin_session'
const MAX_AGE = 7 * 24 * 60 * 60

function getSecret(): string {
  return process.env.WRITING_ROOM_SESSION_SECRET ?? 'dev-secret-change-me-in-production'
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

export type PartnerSession = { partnerId: number; username: string; name: string }
export type AdminSession = { admin: true }

export async function getPartnerSession(
  cookieValue: string | undefined,
): Promise<PartnerSession | null> {
  if (!cookieValue) return null
  return verifyToken<PartnerSession>(cookieValue)
}

export async function getAdminSession(
  cookieValue: string | undefined,
): Promise<AdminSession | null> {
  if (!cookieValue) return null
  return verifyToken<AdminSession>(cookieValue)
}

export async function makePartnerCookieValue(payload: PartnerSession): Promise<string> {
  return signPayload(payload)
}

export async function makeAdminCookieValue(): Promise<string> {
  return signPayload({ admin: true })
}

export { PARTNER_COOKIE, ADMIN_COOKIE, MAX_AGE }
