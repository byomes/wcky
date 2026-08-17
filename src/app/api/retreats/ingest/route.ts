import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { checkIngestKey } from '@/lib/retreats-auth'
import type { RetreatInput } from '@/lib/retreats-types'

export async function POST(req: NextRequest) {
  if (!checkIngestKey(req.headers.get('X-Retreats-Key'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await req.json().catch(() => null)
  const listings: RetreatInput[] = Array.isArray(data?.listings) ? data.listings : []
  if (listings.length === 0) {
    return NextResponse.json({ error: 'listings must be a non-empty array' }, { status: 400 })
  }

  const sql = getSql()
  let inserted = 0
  let skipped_duplicates = 0

  for (const listing of listings) {
    if (!listing.name) continue

    const rows = await sql`
      INSERT INTO retreats (
        name, location, distance_miles, drive_time, price, capacity, beds, baths,
        amenities, kitchen_status, kitchen_detail, fit_rating, fit_label, notes,
        phone, website, email, source_url, free_or_paid, added_by
      ) VALUES (
        ${listing.name}, ${listing.location ?? null}, ${listing.distance_miles ?? null},
        ${listing.drive_time ?? null}, ${listing.price ?? null}, ${listing.capacity ?? null},
        ${listing.beds ?? null}, ${listing.baths ?? null},
        ${JSON.stringify(listing.amenities ?? [])}::jsonb,
        ${listing.kitchen_status ?? null}, ${listing.kitchen_detail ?? null},
        ${listing.fit_rating ?? null}, ${listing.fit_label ?? null}, ${listing.notes ?? null},
        ${listing.phone ?? null}, ${listing.website ?? null}, ${listing.email ?? null},
        ${listing.source_url ?? null}, ${listing.free_or_paid ?? null}, 'watson'
      )
      ON CONFLICT (source_url) DO NOTHING
      RETURNING id
    `
    if (rows.length > 0) inserted++
    else skipped_duplicates++
  }

  return NextResponse.json({ inserted, skipped_duplicates })
}
