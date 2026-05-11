// src/app/api/submit-draft/route.ts
// Receives { slug, content } from the /draft page.
// Pushes the file to content/blog/<slug>.md in byomes/wcky via GitHub API.
// Token lives in WCKY_GITHUB_TOKEN env var — never exposed to the browser.

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { slug, content } = await req.json();

  if (!slug || !content) {
    return NextResponse.json({ error: 'slug and content are required' }, { status: 400 });
  }

  const token = process.env.WCKY_GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 });
  }

  const repo = 'byomes/wcky';
  const branch = 'main';
  const path = `content/blog/${slug}.md`;
  const encoded = Buffer.from(content).toString('base64');

  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };

  try {
    // Check if file already exists (needed for sha on update)
    let sha: string | null = null;
    const checkRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}`,
      { headers }
    );
    if (checkRes.ok) {
      const existing = await checkRes.json();
      sha = existing.sha;
    }

    // Create or update
    const body: Record<string, string> = {
      message: `draft: add ${slug}`,
      content: encoded,
      branch,
    };
    if (sha) body.sha = sha;

    const pushRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}`,
      { method: 'PUT', headers, body: JSON.stringify(body) }
    );

    if (pushRes.ok) {
      return NextResponse.json({ ok: true, path });
    } else {
      const err = await pushRes.json();
      return NextResponse.json({ error: err.message || 'GitHub error' }, { status: pushRes.status });
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: 'Server error: ' + message }, { status: 500 });
  }
}
