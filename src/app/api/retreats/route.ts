import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { getFamilySession, SESSION_COOKIE } from '@/lib/retreats-auth'
import { FIT_RATING_VALUES, STATUS_VALUES, type RetreatInput } from '@/lib/retreats-types'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const fitRating = searchParams.get('fit_rating')
  const addedBy = searchParams.get('added_by')
  const maxDistanceParam = searchParams.get('max_distance')
  const maxDistance = maxDistanceParam ? Number(maxDistanceParam) : null

  const sql = getSql()
  const listings = await sql`
    SELECT * FROM retreats
    WHERE (${status}::text IS NULL OR status = ${status})
      AND (${fitRating}::text IS NULL OR fit_rating = ${fitRating})
      AND (${addedBy}::text IS NULL OR added_by = ${addedBy})
      AND (${maxDistance}::numeric IS NULL OR distance_miles <= ${maxDistance})
    ORDER BY date_added DESC
  `

  return NextResponse.json({ listings, count: listings.length })
}

export async function POST(req: NextRequest) {
  const session = await getFamilySession(req.cookies.get(SESSION_COOKIE)?.value)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json().catch(() => null) as RetreatInput | null
  if (!data?.name) return NextResponse.json({ error: 'name is required' }, { status: 400 })

  if (data.fit_rating && !FIT_RATING_VALUES.includes(data.fit_rating)) {
    return NextResponse.json({ error: 'Invalid fit_rating' }, { status: 400 })
  }
  if (data.status && !STATUS_VALUES.includes(data.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const sql = getSql()
  const rows = await sql`
    INSERT INTO retreats (
      name, location, distance_miles, drive_time, price, capacity, beds, baths,
      amenities, kitchen_status, kitchen_detail, fit_rating, fit_label, notes,
      phone, website, email, source_url, free_or_paid, status, added_by
    ) VALUES (
      ${data.name}, ${data.location ?? null}, ${data.distance_miles ?? null},
      ${data.drive_time ?? null}, ${data.price ?? null}, ${data.capacity ?? null},
      ${data.beds ?? null}, ${data.baths ?? null},
      ${JSON.stringify(data.amenities ?? [])}::jsonb,
      ${data.kitchen_status ?? null}, ${data.kitchen_detail ?? null},
      ${data.fit_rating ?? null}, ${data.fit_label ?? null}, ${data.notes ?? null},
      ${data.phone ?? null}, ${data.website ?? null}, ${data.email ?? null},
      ${data.source_url ?? null}, ${data.free_or_paid ?? null},
      ${data.status ?? 'candidate'}, 'manual'
    )
    RETURNING *
  `

  return NextResponse.json({ listing: rows[0] }, { status: 201 })
}
