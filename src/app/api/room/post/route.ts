import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getPartnerSession, PARTNER_COOKIE } from '@/lib/writing-room-auth'
import { submitPost, deletePost } from '@/lib/writing-room-api'

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const content = (data.content ?? '').trim()
  const section = data.section ?? 'board'
  if (!content) return NextResponse.json({ error: 'Content is required.' }, { status: 400 })

  const result = await submitPost({
    partnerId: session.partnerId,
    section,
    content,
    parentId: data.parentId,
  })
  if (!result) return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { postId } = await req.json()
  const result = await deletePost(postId, session.partnerId)
  if (!result) return NextResponse.json({ error: 'Server error' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
