// src/app/api/ingest/route.ts
// Receives a file upload (PDF, Excel, Word), extracts text server-side,
// and saves the result as a .md file to kb/ in the byomes/watson repo via GitHub API.

import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import * as pdfParse from 'pdf-parse';

const GITHUB_TOKEN = process.env.WATSON_GITHUB_TOKEN;
const REPO         = 'byomes/watson';
const BRANCH       = 'main';
const KB_PATH      = 'kb';

async function extractPdf(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data.text;
}

async function extractExcel(buffer: Buffer): Promise<string> {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const lines: string[] = [];
  for (const sheetName of workbook.SheetNames) {
    lines.push(`## ${sheetName}\n`);
    const sheet = workbook.Sheets[sheetName];
    const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    for (const row of rows) {
      const cells = (row as string[]).map(c => String(c ?? '').trim());
      if (cells.some(c => c)) {
        lines.push(cells.join('\t'));
      }
    }
    lines.push('');
  }
  return lines.join('\n');
}

async function extractDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

async function pushToGithub(slug: string, content: string): Promise<void> {
  if (!GITHUB_TOKEN) throw new Error('WATSON_GITHUB_TOKEN not configured');

  const path    = `${KB_PATH}/${slug}.md`;
  const encoded = Buffer.from(content).toString('base64');

  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };

  let sha: string | null = null;
  const check = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, { headers });
  if (check.ok) {
    const existing = await check.json();
    sha = existing.sha;
  }

  const body: Record<string, string> = {
    message: `ingest: add ${slug}`,
    content: encoded,
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || `GitHub error ${res.status}`);
  }
}

function toSlug(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer   = Buffer.from(await file.arrayBuffer());
    const ext      = file.name.split('.').pop()?.toLowerCase() ?? '';
    const slug     = toSlug(file.name);
    const now      = new Date().toISOString().split('T')[0];

    let extracted = '';

    if (ext === 'pdf') {
      extracted = await extractPdf(buffer);
    } else if (['xlsx', 'xls', 'csv'].includes(ext)) {
      extracted = await extractExcel(buffer);
    } else if (['docx', 'doc'].includes(ext)) {
      extracted = await extractDocx(buffer);
    } else {
      return NextResponse.json({ error: `Unsupported file type: .${ext}` }, { status: 400 });
    }

    if (!extracted.trim()) {
      return NextResponse.json({ error: 'No text could be extracted from this file' }, { status: 422 });
    }

    const markdown = `---\ntitle: ${file.name}\ndate: ${now}\nsource: ${file.name}\n---\n\n${extracted.trim()}\n`;

    await pushToGithub(slug, markdown);

    return NextResponse.json({ ok: true, slug, path: `kb/${slug}.md`, chars: extracted.length });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
