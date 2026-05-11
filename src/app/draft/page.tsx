'use client';

// src/app/draft/page.tsx
// Blog preparation tool — paste markdown, auto-slugs from frontmatter title,
// submits to /api/submit-draft which holds the GitHub token server-side.

import { useState, useRef } from 'react';

export default function DraftPage() {
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<{ msg: string; type: string }>({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);
  const slugTouched = useRef(false);

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    setContent(val);

    if (!slugTouched.current) {
      const match = val.match(/^title:\s*['"]?(.+?)['"]?\s*$/m);
      if (match) {
        setSlug(
          match[1]
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        );
      }
    }
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    slugTouched.current = true;
    setSlug(e.target.value);
  }

  async function handleSubmit() {
    if (!content.trim()) {
      setStatus({ msg: 'Paste your markdown first.', type: 'error' });
      return;
    }
    if (!slug.trim()) {
      setStatus({ msg: 'Add a slug before pushing.', type: 'error' });
      return;
    }

    setLoading(true);
    setStatus({ msg: 'Pushing to GitHub…', type: 'loading' });

    try {
      const res = await fetch('/api/submit-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: slug.trim(), content: content.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ msg: '✓ Pushed — Vercel will deploy on schedule.', type: 'success' });
        setContent('');
        setSlug('');
        slugTouched.current = false;
      } else {
        setStatus({ msg: `GitHub error: ${data.error}`, type: 'error' });
      }
    } catch {
      setStatus({ msg: 'Network error — check connection.', type: 'error' });
    }

    setLoading(false);
  }

  const statusColor = {
    success: '#16a34a',
    error: '#dc2626',
    loading: '#6b7280',
  }[status.type] ?? 'transparent';

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '3rem 1.5rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', margin: '0 0 4px' }}>
          Watson
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 500, margin: 0 }}>Blog preparation</h1>
      </div>

      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Paste markdown here — frontmatter, body, everything..."
        style={{
          width: '100%',
          minHeight: 460,
          boxSizing: 'border-box',
          fontFamily: 'monospace',
          fontSize: 13,
          lineHeight: 1.7,
          padding: '1rem',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          resize: 'vertical',
          outline: 'none',
        }}
      />
      <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'right', margin: '4px 0 0' }}>
        {content.length.toLocaleString()} characters
      </p>

      <input
        type="text"
        value={slug}
        onChange={handleSlugChange}
        placeholder="slug (e.g. kingdom-over-empire)"
        style={{
          display: 'block',
          width: '100%',
          boxSizing: 'border-box',
          marginTop: '0.75rem',
          height: 40,
          padding: '0 12px',
          fontSize: 14,
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          outline: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem' }}>
        <span style={{ fontSize: 13, color: statusColor }}>{status.msg}</span>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 20px',
            height: 40,
            fontSize: 14,
            fontWeight: 500,
            background: '#fff',
            border: '1px solid #d1d5db',
            borderRadius: 8,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
          }}
        >
          Push to queue
        </button>
      </div>
    </div>
  );
}
