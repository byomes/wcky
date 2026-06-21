'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Post } from '@/lib/writing-room-api'

interface PostListProps {
  posts: Post[]
  section: string
  partnerId: number
  allowReplies?: boolean
  submitLabel?: string
  placeholder?: string
}

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch { return iso }
}

export default function PostList({
  posts,
  section,
  partnerId,
  allowReplies = true,
  submitLabel = 'New Post',
  placeholder = 'Share something with the room…',
}: PostListProps) {
  const router = useRouter()
  const [newContent, setNewContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState('')

  const topLevel = posts.filter((p) => p.parent_id === null)
  const replies = (parentId: number) => posts.filter((p) => p.parent_id === parentId)

  async function submitPost(content: string, parentId?: number) {
    const res = await fetch('/api/room/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section, content, parentId }),
    })
    return res.ok
  }

  async function handleNewPost(e: FormEvent) {
    e.preventDefault()
    if (!newContent.trim()) return
    setSubmitting(true)
    const ok = await submitPost(newContent.trim())
    if (ok) {
      setNewContent('')
      router.refresh()
    }
    setSubmitting(false)
  }

  async function handleReply(e: FormEvent, parentId: number) {
    e.preventDefault()
    if (!replyContent.trim()) return
    setSubmitting(true)
    const ok = await submitPost(replyContent.trim(), parentId)
    if (ok) {
      setReplyContent('')
      setReplyingTo(null)
      router.refresh()
    }
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      {/* New post form */}
      <form onSubmit={handleNewPost} className="bg-navy-900 border border-navy-800 p-4">
        <textarea
          rows={3}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors resize-none"
        />
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={submitting || !newContent.trim()}
            className="bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-2 px-5 text-xs tracking-[0.15em] uppercase transition-colors"
          >
            {submitting ? 'Posting…' : submitLabel}
          </button>
        </div>
      </form>

      {/* Posts */}
      {topLevel.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-8">No posts yet. Be the first.</p>
      ) : (
        topLevel.map((post) => (
          <div key={post.id} className="bg-navy-900 border border-navy-800">
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="text-gold-500 text-xs font-semibold">{post.partner_name}</span>
                <span className="text-slate-500 text-xs">{fmtDate(post.created_at)}</span>
              </div>
              <p
                className="text-slate-200 text-sm leading-relaxed whitespace-pre-line"
                style={{ userSelect: 'none' }}
                onContextMenu={(e) => e.preventDefault()}
              >
                {post.content}
              </p>
              {allowReplies && (
                <button
                  onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                  className="mt-3 text-slate-500 hover:text-gold-500 text-xs tracking-widest uppercase transition-colors"
                >
                  Reply
                </button>
              )}
            </div>

            {/* Replies */}
            {replies(post.id).map((reply) => (
              <div key={reply.id} className="border-t border-navy-800 ml-6 px-4 py-3">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-gold-500 text-xs font-semibold">{reply.partner_name}</span>
                  <span className="text-slate-500 text-xs">{fmtDate(reply.created_at)}</span>
                </div>
                <p
                  className="text-slate-300 text-sm leading-relaxed whitespace-pre-line"
                  style={{ userSelect: 'none' }}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {reply.content}
                </p>
              </div>
            ))}

            {/* Reply form */}
            {allowReplies && replyingTo === post.id && (
              <form
                onSubmit={(e) => handleReply(e, post.id)}
                className="border-t border-navy-800 p-4"
              >
                <textarea
                  rows={2}
                  autoFocus
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply…"
                  className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-2 text-sm focus:outline-none focus:border-gold-600 transition-colors resize-none"
                />
                <div className="mt-2 flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="text-slate-500 text-xs hover:text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !replyContent.trim()}
                    className="bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-1.5 px-4 text-xs tracking-[0.15em] uppercase transition-colors"
                  >
                    {submitting ? 'Posting…' : 'Reply'}
                  </button>
                </div>
              </form>
            )}
          </div>
        ))
      )}
    </div>
  )
}
