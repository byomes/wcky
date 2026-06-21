import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_ROOM_PATHS = ['/room', '/room/login', '/room/reset', '/room/admin/login']

function getSecret(): string {
  return process.env.WRITING_ROOM_SESSION_SECRET ?? 'dev-secret-change-me-in-production'
}

async function verifyHmac(token: string): Promise<boolean> {
  const lastDot = token.lastIndexOf('.')
  if (lastDot === -1) return false

  const b64 = token.slice(0, lastDot)
  const hexSig = token.slice(lastDot + 1)

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(getSecret()),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    )
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(b64))
    const expectedHex = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    if (hexSig.length !== expectedHex.length) return false
    let diff = 0
    for (let i = 0; i < hexSig.length; i++) {
      diff |= hexSig.charCodeAt(i) ^ expectedHex.charCodeAt(i)
    }
    return diff === 0
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/room')) return NextResponse.next()

  // Allow public room paths exactly or with trailing slash
  const isPublic = PUBLIC_ROOM_PATHS.some(
    (p) => pathname === p || pathname === p + '/',
  )
  if (isPublic) return NextResponse.next()

  // Admin routes
  if (pathname.startsWith('/room/admin')) {
    const adminCookie = request.cookies.get('writing_room_admin_session')
    const valid = adminCookie?.value ? await verifyHmac(adminCookie.value) : false
    if (!valid) {
      return NextResponse.redirect(new URL('/room/admin/login', request.url))
    }
    return NextResponse.next()
  }

  // API routes — auth checked in the route handler itself
  if (pathname.startsWith('/api/room/')) return NextResponse.next()

  // Partner-protected pages
  const sessionCookie = request.cookies.get('writing_room_session')
  const valid = sessionCookie?.value ? await verifyHmac(sessionCookie.value) : false
  if (!valid) {
    return NextResponse.redirect(new URL('/room/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/room/:path*'],
}
