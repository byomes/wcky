import { NextRequest, NextResponse } from 'next/server';

const FALLBACK = 'Please email pastorbill@catalyst302.com to schedule your appointment.';

function generateConfirmationId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = 'BK-';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const confirmationId = generateConfirmationId();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch('https://watson.tail0243ff.ts.net/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, confirmationId }),
      signal: controller.signal,
    });

    if (!res.ok) {
      return NextResponse.json({ error: FALLBACK }, { status: 503 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: FALLBACK }, { status: 503 });
  } finally {
    clearTimeout(timeout);
  }
}
