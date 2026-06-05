import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type') ?? 'virtual';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(
      `https://watson.tail0243ff.ts.net/api/availability?type=${type}`,
      { signal: controller.signal }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ days: [] });
  } finally {
    clearTimeout(timeout);
  }
}
