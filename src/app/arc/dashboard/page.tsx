import { cookies } from 'next/headers'
import { redirect }  from 'next/navigation'
import type { Metadata } from 'next'
import ArcDashboard from './ArcDashboard'

export const metadata: Metadata = {
  title: 'ARC Commitment Tracker',
  robots: { index: false },
}

interface Commitment {
  id: number
  commitment_number: number
  commitment_text: string
  is_checked: number
  evidence_text: string | null
  submitted_at: string | null
  flagged_as_suspicious: number
  approved_by_admin: number
}

interface DashboardData {
  reader: { id: number; first_name: string; last_name: string; email: string }
  commitments: Commitment[]
  progress: { checked: number; total: number }
}

export default async function ArcDashboardPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('arc_session')?.value
  if (!token) redirect('/arc/login')

  const base = (process.env.WATSON_API_URL ?? '').replace(/\/$/, '')
  const key  = process.env.WATSON_API_KEY ?? ''

  let data: DashboardData | null = null
  try {
    const res = await fetch(`${base}/api/arc/dashboard`, {
      headers: { 'X-Watson-Key': key, 'X-Arc-Session': token },
      cache: 'no-store',
    })
    if (res.status === 401) redirect('/arc/login')
    if (res.ok) data = await res.json()
  } catch {
    // Watson unreachable — show error state
  }

  if (!data) {
    return (
      <section className="bg-navy-950 min-h-screen pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-red-400 text-sm">Could not load your dashboard. Please try again.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-navy-950 min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
            ARC Team
          </p>
          <h1 className="font-serif text-3xl font-bold text-white mb-1">
            Hi, {data.reader.first_name}.
          </h1>
          <p className="text-slate-400 text-sm">
            {data.progress.checked} of {data.progress.total} commitments completed
          </p>
        </div>

        <ArcDashboard initialData={data} />
      </div>
    </section>
  )
}
