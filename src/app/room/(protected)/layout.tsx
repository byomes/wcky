import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPartnerSession, PARTNER_COOKIE } from '@/lib/writing-room-auth'
import RoomNav from './RoomNav'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  if (!session) redirect('/room/login')

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      {/* Top bar */}
      <header className="bg-navy-900 border-b border-navy-800 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <span className="font-serif text-white font-semibold text-base">The Writing Room</span>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm hidden sm:block">{session.name}</span>
          <LogoutButton />
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>

      {/* Bottom nav */}
      <RoomNav />
    </div>
  )
}

function LogoutButton() {
  return (
    <form action="/api/room/logout" method="POST">
      <button
        type="submit"
        className="text-slate-500 hover:text-slate-300 text-xs tracking-widest uppercase transition-colors"
      >
        Sign out
      </button>
    </form>
  )
}
