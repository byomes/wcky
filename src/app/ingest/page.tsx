'use client';

// src/app/ingest/page.tsx
// File ingestion tool: upload PDF, Excel, or Word files.
// Sends to /api/ingest, which extracts text and saves to kb/ in the watson repo.

import { useState, useRef } from 'react';

const ACCEPTED = '.pdf,.xlsx,.xls,.csv,.docx,.doc';

type Result = {
  filename: string;
  status: 'ok' | 'error';
  detail: string;
};

export default function IngestPage() {
  const [files, setFiles]       = useState<File[]>([]);
  const [results, setResults]   = useState<Result[]>([]);
  const [loading, setLoading]   = useState(false);
  const inputRef                = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...dropped]);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  }

  function removeFile(index: number) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit() {
    if (!files.length) return;
    setLoading(true);
    setResults([]);

    const newResults: Result[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res  = await fetch('/api/ingest', { method: 'POST', body: formData });
        const data = await res.json();

        if (res.ok) {
          newResults.push({
            filename: file.name,
            status: 'ok',
            detail: `Saved to kb/${data.slug}.md (${data.chars.toLocaleString()} chars)`,
          });
        } else {
          newResults.push({ filename: file.name, status: 'error', detail: data.error });
        }
      } catch {
        newResults.push({ filename: file.name, status: 'error', detail: 'Network error' });
      }

      setResults([...newResults]);
    }

    setLoading(false);
    setFiles([]);
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.5rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', margin: '0 0 4px' }}>
          Watson
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 500, margin: '0 0 4px' }}>Knowledge base ingest</h1>
        <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>
          PDF, Excel, Word: extracted and saved to kb/ in the watson repo.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        style={{
          border: '1px dashed #d1d5db',
          borderRadius: 10,
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          cursor: 'pointer',
          background: '#fafafa',
          marginBottom: '1rem',
        }}
      >
        <p style={{ margin: '0 0 6px', fontSize: 15, color: '#374151' }}>
          Drop files here or click to browse
        </p>
        <p style={{ margin: 0, fontSize: 13, color: '#9ca3af' }}>
          PDF · Excel (.xlsx, .xls, .csv) · Word (.docx, .doc)
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          {files.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', borderBottom: '1px solid #f3f4f6', fontSize: 14,
            }}>
              <span style={{ color: '#111827' }}>{f.name}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>
                  {(f.size / 1024).toFixed(0)} KB
                </span>
                <button
                  onClick={() => removeFile(i)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 16, padding: 0 }}
                >
                  ×
                </button>
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Submit */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
        <button
          onClick={handleSubmit}
          disabled={loading || !files.length}
          style={{
            padding: '0 24px',
            height: 40,
            fontSize: 14,
            fontWeight: 500,
            background: '#fff',
            border: '1px solid #d1d5db',
            borderRadius: 8,
            cursor: loading || !files.length ? 'not-allowed' : 'pointer',
            opacity: loading || !files.length ? 0.5 : 1,
          }}
        >
          {loading ? 'Processing…' : `Ingest ${files.length ? `${files.length} file${files.length > 1 ? 's' : ''}` : 'files'}`}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div>
          {results.map((r, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontSize: 14,
            }}>
              <span style={{ fontSize: 16, marginTop: 1 }}>{r.status === 'ok' ? '✓' : '✗'}</span>
              <div>
                <div style={{ fontWeight: 500, color: '#111827' }}>{r.filename}</div>
                <div style={{ fontSize: 13, color: r.status === 'ok' ? '#16a34a' : '#dc2626' }}>
                  {r.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
