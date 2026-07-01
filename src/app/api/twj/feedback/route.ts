import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { submitReaderFeedback } from '@/lib/twj-api'

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const session = cookieStore.get('twj_session')

    if (!session?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { chapter, text } = await req.json()
    if (!chapter || !text?.trim()) {
      return NextResponse.json({ error: 'chapter and text are required' }, { status: 400 })
    }

    const result = await submitReaderFeedback(session.value, chapter, text)
    if (!result?.ok) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
