'use client';

// src/app/draft/page.tsx

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
        setSlug(match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
      }
    }
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    slugTouched.current = true;
    setSlug(e.target.value);
  }

  async function handleSubmit() {
    if (!content.trim()) { setStatus({ msg: 'Paste your markdown first.', type: 'error' }); return; }
    if (!slug.trim()) { setStatus({ msg: 'Add a slug before submitting.', type: 'error' }); return; }
    setLoading(true);
    setStatus({ msg: 'Queuing draft\u2026', type: 'loading' });
    try {
      const res = await fetch('/api/submit-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: slug.trim(), content: content.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ msg: '\u2713 Draft queued \u2014 Watson will publish on schedule.', type: 'success' });
        setContent(''); setSlug(''); slugTouched.current = false;
      } else {
        setStatus({ msg: `Error: ${data.error}`, type: 'error' });
      }
    } catch {
      setStatus({ msg: 'Network error \u2014 check connection.', type: 'error' });
    }
    setLoading(false);
  }

  const statusColor = { success: '#4ade80', error: '#f87171', loading: '#9ca3af' }[status.type] ?? 'transparent';

  const field: React.CSSProperties = {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#0f172a',
    color: '#f1f5f9',
    WebkitTextFillColor: '#f1f5f9',
    caretColor: '#f1f5f9',
    border: '1px solid #334155',
    borderRadius: 8,
    outline: 'none',
  };

  return (
    <>
      <style>{`
        .draft-wrap { max-width:760px; margin:0 auto; padding:3rem 1.5rem 4rem; }
        .draft-actions { display:flex; align-items:center; justify-content:space-between; margin-top:1.25rem; }
        .draft-btn { display:inline-flex; align-items:center; justify-content:center; padding:0 20px; height:40px; font-size:14px; font-weight:500; background:#1e293b; color:#f1f5f9; border:1px solid #334155; border-radius:8px; cursor:pointer; }
        .draft-btn:disabled { opacity:0.5; cursor:not-allowed; }
        .draft-textarea::placeholder { color:#475569; }
        .draft-input::placeholder { color:#475569; }
        @media (max-width:600px) {
          .draft-wrap { padding:1.5rem 1rem 3rem !important; }
          .draft-actions { flex-direction:column; align-items:stretch; gap:10px; }
          .draft-btn { width:100%; }
        }
      `}</style>
      <div className="draft-wrap">
        <div style={{ marginBottom:'2rem' }}>
          <p style={{ fontSize:12, letterSpacing:'0.08em', textTransform:'uppercase', color:'#64748b', margin:'0 0 4px' }}>Watson</p>
          <h1 style={{ fontSize:28, fontWeight:500, margin:0 }}>Blog preparation</h1>
        </div>

        <textarea
          className="draft-textarea"
          value={content}
          onChange={handleContentChange}
          placeholder="Paste markdown here — frontmatter, body, everything..."
          style={{ ...field, minHeight:460, fontFamily:'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace', fontSize:13, lineHeight:1.7, padding:'1rem', resize:'vertical' }}
        />
        <p style={{ fontSize:12, color:'#64748b', textAlign:'right', margin:'4px 0 0' }}>
          {content.length.toLocaleString()} characters
        </p>

        <input
          className="draft-input"
          type="text"
          value={slug}
          onChange={handleSlugChange}
          placeholder="slug (e.g. kingdom-over-empire)"
          style={{ ...field, marginTop:'0.75rem', height:40, padding:'0 12px', fontSize:14 }}
        />

        <div className="draft-actions">
          <span style={{ fontSize:13, color:statusColor }}>{status.msg}</span>
          <button className="draft-btn" onClick={handleSubmit} disabled={loading}>
            Push to queue
          </button>
        </div>
      </div>
    </>
  );
}
