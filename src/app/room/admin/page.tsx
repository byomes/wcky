import type { Metadata } from 'next'
import { getPartners, getPendingApplications, getRecentMessages, getCalls } from '@/lib/writing-room-api'

export const metadata: Metadata = {
  title: 'Writing Room Admin',
  robots: 'noindex, nofollow',
}

function fmtDate(iso: string | null) {
  if (!iso) return 'N/A'
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return iso
  }
}

function fmtDateTime(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

export default async function AdminPage() {
  const [partners, pending, messages, calls] = await Promise.all([
    getPartners(),
    getPendingApplications(),
    getRecentMessages(10),
    getCalls(),
  ])

  const activePartners = partners.filter((p) => p.status === 'active')

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      {/* Top bar */}
      <header className="bg-navy-900 border-b border-navy-800 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold">Admin</span>
          <h1 className="font-serif text-xl font-bold text-white mt-0.5">Writing Room</h1>
        </div>
        <LogoutButton />
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-14">
        {/* Partners */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Partners <span className="text-slate-500 font-normal text-lg">({activePartners.length})</span>
          </h2>
          {activePartners.length === 0 ? (
            <p className="text-slate-400 text-sm">No active partners yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-800">
                    <th className="text-left text-slate-400 text-xs tracking-widest uppercase pb-3 pr-6">Name</th>
                    <th className="text-left text-slate-400 text-xs tracking-widest uppercase pb-3 pr-6">Email</th>
                    <th className="text-left text-slate-400 text-xs tracking-widest uppercase pb-3 pr-6">Joined</th>
                    <th className="text-left text-slate-400 text-xs tracking-widest uppercase pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800">
                  {activePartners.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 pr-6 text-slate-200">{p.name}</td>
                      <td className="py-3 pr-6 text-slate-400">{p.email}</td>
                      <td className="py-3 pr-6 text-slate-400">{fmtDate(p.joined_at)}</td>
                      <td className="py-3">
                        <span className="text-xs px-2 py-0.5 bg-navy-800 border border-navy-700 text-slate-300">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Pending Applications */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Pending Applications <span className="text-slate-500 font-normal text-lg">({pending.length})</span>
          </h2>
          {pending.length === 0 ? (
            <p className="text-slate-400 text-sm">No pending applications.</p>
          ) : (
            <div className="space-y-4">
              {pending.map((p) => (
                <div key={p.id} className="border border-navy-800 bg-navy-900/50 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-medium">{p.name}</p>
                      <p className="text-slate-400 text-sm">{p.email}</p>
                    </div>
                  </div>
                  {p.why_join && (
                    <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-navy-700 pl-4">
                      {p.why_join}
                    </p>
                  )}
                  <p className="text-slate-500 text-xs mt-3">
                    Approve or deny via Telegram.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Messages */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-white mb-6">Recent Messages</h2>
          {messages.length === 0 ? (
            <p className="text-slate-400 text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="border border-navy-800 bg-navy-900/50 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-medium">{m.name}</p>
                      <p className="text-slate-400 text-sm">{m.email}</p>
                    </div>
                    <p className="text-slate-500 text-xs">{fmtDate(m.created_at)}</p>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Upcoming Calls */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-white mb-6">Upcoming Calls</h2>
          {calls.length === 0 ? (
            <p className="text-slate-400 text-sm">No calls scheduled.</p>
          ) : (
            <div className="space-y-3">
              {calls.map((c) => (
                <div key={c.id} className="border border-navy-800 bg-navy-900/50 p-5 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{c.title}</p>
                    <p className="text-slate-400 text-sm mt-0.5">{fmtDateTime(c.scheduled_at)}</p>
                  </div>
                  {c.meeting_url && (
                    <a
                      href={c.meeting_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-500 hover:text-gold-400 text-sm transition-colors"
                    >
                      Join →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function LogoutButton() {
  return (
    <form action="/api/room/logout" method="POST">
      <button
        type="submit"
        className="text-slate-400 hover:text-white text-sm transition-colors"
      >
        Sign out
      </button>
    </form>
  )
}
