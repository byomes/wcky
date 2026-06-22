'use client'

import { useState, FormEvent, useCallback } from 'react'
import type { Post } from '@/lib/writing-room-api'

interface PostListProps {
  initialPosts: Post[]
  section: string
  partnerId: number
  session: { partnerId: number; isAdmin?: boolean }
  emptyLabel?: string
  submitLabel?: string
  placeholder?: string
  replyLabel?: string
}

function fmtDate(iso: string) {
  try {
    const d = new Date(iso + (iso.endsWith('Z') ? '' : 'Z'))
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 1) return 'just now'
    if (diffMin < 60) return `${diffMin}m ago`
    const diffHr = Math.floor(diffMin / 60)
    if (diffHr < 24) return `${diffHr}h ago`
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return iso
  }
}

export default function PostList({
  initialPosts,
  section,
  partnerId,
  session,
  emptyLabel = 'Be the first to post. Introduce yourself.',
  submitLabel = 'Post',
  placeholder = 'Share something with the room…',
  replyLabel = 'Reply',
}: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newContent, setNewContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set())

  const topLevel = posts
    .filter((p) => p.parent_id === null)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const repliesFor = (parentId: number) =>
    posts
      .filter((p) => p.parent_id === parentId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

  const refetch = useCallback(async () => {
    try {
      const res = await fetch(`/api/room/posts?section=${section}`, { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch {
      // silently ignore
    }
  }, [section])

  async function apiPost(body: object): Promise<boolean> {
    const res = await fetch('/api/room/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return res.ok
  }

  async function handleNewPost(e: FormEvent) {
    e.preventDefault()
    if (!newContent.trim()) return
    setSubmitting(true)
    const ok = await apiPost({ section, content: newContent.trim() })
    if (ok) {
      setNewContent('')
      await refetch()
    }
    setSubmitting(false)
  }

  async function handleReply(e: FormEvent, parentId: number) {
    e.preventDefault()
    if (!replyContent.trim()) return
    setSubmitting(true)
    const ok = await apiPost({ section, content: replyContent.trim(), parentId })
    if (ok) {
      setReplyContent('')
      setReplyingTo(null)
      setExpandedReplies((prev) => new Set(prev).add(parentId))
      await refetch()
    }
    setSubmitting(false)
  }

  function toggleReplies(postId: number) {
    setExpandedReplies((prev) => {
      const next = new Set(prev)
      if (next.has(postId)) {
        next.delete(postId)
      } else {
        next.add(postId)
      }
      return next
    })
  }

  function openReply(postId: number) {
    setReplyingTo(replyingTo === postId ? null : postId)
    setReplyContent('')
    // auto-expand replies when opening reply box
    setExpandedReplies((prev) => new Set(prev).add(postId))
  }

  async function handleDelete(postId: number) {
    if (!window.confirm('Delete this post?')) return
    const res = await fetch('/api/room/post', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId }),
    })
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== postId))
    }
  }

  return (
    <div className="space-y-4">
      {/* New post composer */}
      <form
        onSubmit={handleNewPost}
        className="bg-navy-900 border border-navy-800 rounded-sm p-4"
      >
        <textarea
          rows={3}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none rounded-sm"
        />
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={submitting || !newContent.trim()}
            className="bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-2 px-5 text-xs tracking-[0.15em] uppercase transition-colors rounded-sm"
          >
            {submitting ? 'Posting…' : submitLabel}
          </button>
        </div>
      </form>

      {/* Feed */}
      {topLevel.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-12">{emptyLabel}</p>
      ) : (
        topLevel.map((post) => {
          const threadReplies = repliesFor(post.id)
          const replyCount = threadReplies.length
          const isExpanded = expandedReplies.has(post.id)
          const isReplying = replyingTo === post.id

          return (
            <div
              key={post.id}
              className="bg-navy-900 border border-navy-800 rounded-sm overflow-hidden"
            >
              {/* Post body */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center shrink-0">
                    <span className="text-gold-500 text-xs font-bold uppercase">
                      {(post.partner_name ?? '?').charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="text-white text-sm font-semibold">{post.partner_name}</span>
                    <span className="text-slate-500 text-xs ml-2">{fmtDate(post.created_at)}</span>
                  </div>
                  {(session.partnerId === post.partner_id || session.isAdmin) && (
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-slate-600 hover:text-red-400 text-xs transition-colors ml-auto shrink-0"
                      title="Delete post"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <p
                  className="text-slate-200 text-sm leading-relaxed whitespace-pre-line"
                  style={{ userSelect: 'none' }}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {post.content}
                </p>

                {/* Action bar */}
                <div className="mt-4 flex items-center gap-5 border-t border-navy-800 pt-3">
                  {replyCount > 0 && (
                    <button
                      onClick={() => toggleReplies(post.id)}
                      className="text-slate-400 hover:text-slate-200 text-xs transition-colors"
                    >
                      {isExpanded
                        ? 'Hide replies'
                        : `${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`}
                    </button>
                  )}
                  <button
                    onClick={() => openReply(post.id)}
                    className={`text-xs font-semibold tracking-widest uppercase transition-colors ${
                      isReplying ? 'text-gold-400' : 'text-slate-500 hover:text-gold-500'
                    }`}
                  >
                    {replyLabel}
                  </button>
                </div>
              </div>

              {/* Replies thread */}
              {isExpanded && replyCount > 0 && (
                <div className="border-t border-navy-800 bg-navy-950/40">
                  {threadReplies.map((reply) => (
                    <div
                      key={reply.id}
                      className="px-5 py-3 border-b border-navy-800/60 last:border-b-0 ml-8"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded-full bg-navy-700 flex items-center justify-center shrink-0">
                          <span className="text-gold-500 text-[10px] font-bold uppercase">
                            {(reply.partner_name ?? '?').charAt(0)}
                          </span>
                        </div>
                        <span className="text-white text-xs font-semibold">{reply.partner_name}</span>
                        <span className="text-slate-500 text-[11px]">{fmtDate(reply.created_at)}</span>
                        {(session.partnerId === reply.partner_id || session.isAdmin) && (
                          <button
                            onClick={() => handleDelete(reply.id)}
                            className="text-slate-600 hover:text-red-400 text-[10px] transition-colors ml-auto shrink-0"
                            title="Delete reply"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <p
                        className="text-slate-300 text-sm leading-relaxed whitespace-pre-line pl-8"
                        style={{ userSelect: 'none' }}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Inline reply composer */}
              {isReplying && (
                <form
                  onSubmit={(e) => handleReply(e, post.id)}
                  className="border-t border-navy-800 p-4 bg-navy-950/30"
                >
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-navy-700 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-500 text-[10px] font-bold">Y</span>
                    </div>
                    <div className="flex-1">
                      <textarea
                        rows={2}
                        autoFocus
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply…"
                        className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-3 py-2 text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none rounded-sm"
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
                          className="bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-1.5 px-4 text-xs tracking-[0.15em] uppercase transition-colors rounded-sm"
                        >
                          {submitting ? 'Posting…' : 'Post Reply'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}
