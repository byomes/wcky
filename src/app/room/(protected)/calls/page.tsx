import type { Metadata } from 'next'
import { getCalls } from '@/lib/writing-room-api'

export const metadata: Metadata = {
  title: 'Calls — Writing Room',
  robots: 'noindex, nofollow',
}

function fmtDateTime(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

export default async function CallsPage() {
  const calls = await getCalls()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif text-2xl font-bold text-white mb-6">Upcoming Calls</h1>
      {calls.length === 0 ? (
        <p className="text-slate-400 text-sm">No calls scheduled yet. Check back soon.</p>
      ) : (
        <div className="space-y-4">
          {calls.map((call) => (
            <div key={call.id} className="bg-navy-900 border border-navy-800 p-5">
              <h2 className="text-white font-semibold mb-1">{call.title}</h2>
              <p className="text-slate-400 text-sm mb-3">{fmtDateTime(call.scheduled_at)}</p>
              {call.meeting_url && (
                <a
                  href={call.meeting_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-2 px-5 text-xs tracking-[0.15em] uppercase transition-colors"
                >
                  Join Call →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
