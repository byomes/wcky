// src/app/api/submit-draft/route.ts
// Receives { slug, content } from the /draft page.
// Saves to Upstash KV as draft:pending:<slug>
// Watson polls KV every 15 min and moves drafts into watson.db for scheduling.

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { slug, content } = await req.json();

  if (!slug || !content) {
    return NextResponse.json({ error: 'slug and content are required' }, { status: 400 });
  }

  const kvUrl   = process.env.VERCEL_KV_REST_API_URL;
  const kvToken = process.env.VERCEL_KV_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
  }

  const key = `draft:pending:${slug}`;

  try {
    const res = await fetch(`${kvUrl}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kvToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: content }),
    });

    if (res.ok) {
      return NextResponse.json({ ok: true, message: 'Draft queued for scheduling' });
    } else {
      const err = await res.json();
      return NextResponse.json({ error: err.message || 'KV error' }, { status: res.status });
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: 'Server error: ' + message }, { status: 500 });
  }
}
