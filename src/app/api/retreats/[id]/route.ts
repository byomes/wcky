import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { getFamilySession, SESSION_COOKIE } from '@/lib/retreats-auth'
import { STATUS_VALUES } from '@/lib/retreats-types'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getFamilySession(req.cookies.get(SESSION_COOKIE)?.value)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  if (data.status !== undefined && !STATUS_VALUES.includes(data.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }
  if (data.status === undefined && data.notes === undefined) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
  }

  const sql = getSql()
  const rows = await sql`
    UPDATE retreats
    SET
      status = COALESCE(${data.status ?? null}, status),
      notes = COALESCE(${data.notes ?? null}, notes)
    WHERE id = ${params.id}
    RETURNING *
  `

  if (rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ listing: rows[0] })
}
