import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getPosts } from '@/lib/writing-room-api'
import { getPartnerSession, PARTNER_COOKIE } from '@/lib/writing-room-auth'
import PostList from '../PostList'

export const metadata: Metadata = {
  title: 'Prayer — Writing Room',
  robots: 'noindex, nofollow',
}

export default async function PrayerPage() {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  const posts = await getPosts('prayer')

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif text-2xl font-bold text-white mb-2">Prayer</h1>
      <p className="text-slate-400 text-sm mb-6">We pray for each other here.</p>
      <PostList
        posts={posts}
        section="prayer"
        partnerId={session?.partnerId ?? 0}
        allowReplies={false}
        submitLabel="Share Request"
        placeholder="Share a prayer request…"
      />
    </div>
  )
}
