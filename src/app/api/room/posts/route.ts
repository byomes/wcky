import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getPartnerSession, PARTNER_COOKIE } from '@/lib/writing-room-auth'
import { getPosts } from '@/lib/writing-room-api'

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const section = (req.nextUrl.searchParams.get('section') ?? 'board') as
    | 'board'
    | 'beta'
    | 'prayer'

  const posts = await getPosts(section)
  return NextResponse.json(posts)
}
