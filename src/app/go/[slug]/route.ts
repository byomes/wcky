import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const res = await fetch(
    `https://watson.tail0243ff.ts.net/api/links/resolve/${slug}`,
    { cache: 'no-store' }
  )
  if (!res.ok) {
    return new NextResponse('Link not found', { status: 404 })
  }
  const { destination } = await res.json()
  return NextResponse.redirect(destination, 307)
}
