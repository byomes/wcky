import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getPosts } from '@/lib/writing-room-api'
import { getPartnerSession, PARTNER_COOKIE } from '@/lib/writing-room-auth'
import PostList from '../PostList'

export const metadata: Metadata = {
  title: 'Board — Writing Room',
  robots: 'noindex, nofollow',
}

export default async function BoardPage() {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  const posts = await getPosts('board')

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif text-2xl font-bold text-white mb-2">Community Board</h1>
      <p className="text-slate-400 text-sm mb-6">Share updates, questions, and encouragement.</p>
      <PostList
        initialPosts={posts}
        section="board"
        partnerId={session?.partnerId ?? 0}
        emptyLabel="Be the first to post. Introduce yourself."
        submitLabel="Post"
        placeholder="Share something with the room…"
        replyLabel="Reply"
      />
    </div>
  )
}
