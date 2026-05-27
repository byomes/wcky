import { NextResponse } from 'next/server'

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const response = NextResponse.json({ ok: true })
  response.cookies.set(`read_${slug}_session`, '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })
  return response
}
