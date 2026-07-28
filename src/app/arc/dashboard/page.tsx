import path from 'path'
import fs from 'fs'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { cookies } from 'next/headers'
import { redirect }  from 'next/navigation'
import type { Metadata } from 'next'
import ArcDashboard from './ArcDashboard'
import ArcFeedbackBox from './ArcFeedbackBox'
import ManuscriptReader from './ManuscriptReader'
import CommitmentsPreview from './CommitmentsPreview'
import CountdownTimer from '@/app/thewrongjesus/CountdownTimer'
import { ARC_MANUSCRIPT_UNLOCK, ARC_MANUSCRIPT_CLOSE } from '@/lib/launch-dates'

export const metadata: Metadata = {
  title: 'ARC: The Wrong Jesus',
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
  reader: { id: number; first_name: string; last_name: string; email: string; is_admin_preview: boolean }
  commitments: Commitment[]
  progress: { checked: number; total: number }
}

const SECTIONS = [
  { id: 'introduction', label: 'Intro',       title: 'Introduction: The Most Dangerous Kind of Wrong',                    file: 'introduction.md' },
  { id: 'chapter-01',  label: 'Ch. 1',        title: 'Chapter 1: The Parade We All Join',                                 file: 'chapter-01.md'  },
  { id: 'chapter-02',  label: 'Ch. 2',        title: 'Chapter 2: The Jesus We Needed',                                    file: 'chapter-02.md'  },
  { id: 'chapter-03',  label: 'Ch. 3',        title: 'Chapter 3: The Sincerity Trap',                                     file: 'chapter-03.md'  },
  { id: 'chapter-04',  label: 'Ch. 4',        title: "Chapter 4: When Jesus Doesn't Do What You Hired Him For",           file: 'chapter-04.md'  },
  { id: 'chapter-05',  label: 'Ch. 5',        title: 'Chapter 5: The Jesus Who Tears Things Down',                        file: 'chapter-05.md'  },
  { id: 'chapter-06',  label: 'Ch. 6',        title: "Chapter 6: Going Somewhere You Didn't Sign Up For",                 file: 'chapter-06.md'  },
  { id: 'chapter-07',  label: 'Ch. 7',        title: 'Chapter 7: Choosing Barabbas',                                      file: 'chapter-07.md'  },
  { id: 'chapter-08',  label: 'Ch. 8',        title: 'Chapter 8: Loud Voices',                                            file: 'chapter-08.md'  },
  { id: 'chapter-09',  label: 'Ch. 9',        title: 'Chapter 9: The Quieter Sin',                                        file: 'chapter-09.md'  },
  { id: 'chapter-10',  label: 'Ch. 10',       title: 'Chapter 10: Jesus Has Never Been Ambiguous About Who He Is',        file: 'chapter-10.md'  },
  { id: 'chapter-11',  label: 'Ch. 11',       title: 'Chapter 11: The Disciples as Servants Who Simply Kept Walking',     file: 'chapter-11.md'  },
  { id: 'chapter-12',  label: 'Ch. 12',       title: 'Chapter 12: You Cannot Surrender What You Have Not Named',          file: 'chapter-12.md'  },
  { id: 'conclusion',  label: 'Conclusion',   title: 'Conclusion: Not a Resolution, an Orientation',                      file: 'conclusion.md'  },
]

async function loadSections() {
  const chaptersDir = path.join(process.cwd(), 'src/app/twj/read/chapters')
  const results: { id: string; label: string; title: string; html: string }[] = []

  for (const s of SECTIONS) {
    const filepath = path.join(chaptersDir, s.file)
    if (!fs.existsSync(filepath)) continue
    const source = fs.readFileSync(filepath, 'utf-8')
    const processed = await remark().use(remarkHtml, { sanitize: false }).process(source)
    results.push({ id: s.id, label: s.label, title: s.title, html: processed.toString() })
  }

  return results
}

type ManuscriptStatus = 'locked' | 'open' | 'closed'

function getManuscriptStatus(isAdminPreview: boolean): ManuscriptStatus {
  if (isAdminPreview) return 'open'
  const now = Date.now()
  if (now < new Date(ARC_MANUSCRIPT_UNLOCK).getTime()) return 'locked'
  if (now >= new Date(ARC_MANUSCRIPT_CLOSE).getTime()) return 'closed'
  return 'open'
}

export default async function ArcDashboardPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('arc_session')?.value
  if (!token) redirect('/arc/login')

  const base = (process.env.WATSON_API_URL ?? '').replace(/\/$/, '')
  const key  = process.env.WATSON_API_KEY ?? ''

  let data: DashboardData | null = null
  let sessionInvalid = false
  try {
    const res = await fetch(`${base}/api/arc/dashboard`, {
      headers: { 'X-Watson-Key': key, 'X-Arc-Session': token },
      cache: 'no-store',
    })
    if (res.status === 401) {
      sessionInvalid = true
    } else if (res.ok) {
      data = await res.json()
    }
  } catch {
    // Watson unreachable, show error state below
  }

  // redirect() throws a special Next.js error that must not be swallowed by a
  // try/catch. Call it here, outside the block above, once we know for sure
  // the session itself (not just connectivity) is the problem.
  if (sessionInvalid) redirect('/arc/login?session=expired')

  if (!data) {
    return (
      <div className="bg-navy-950 min-h-screen pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-red-400 text-sm">Could not load your dashboard. Please try again.</p>
        </div>
      </div>
    )
  }

  const manuscriptStatus = getManuscriptStatus(data.reader.is_admin_preview)
  const sections = manuscriptStatus === 'open' ? await loadSections() : []

  return (
    <div className="bg-navy-950 min-h-screen pt-16 lg:pt-20">
      {/* Commitment tracker */}
      <div>
        <section id="commitments" className="pt-16 pb-16">
          <div className="max-w-2xl mx-auto px-6">
            <div className="mb-10">
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
                ARC Team
              </p>
              <h2 className="font-serif text-3xl font-bold text-white mb-1">
                Hi, {data.reader.first_name}.
              </h2>
              <p className="text-slate-400 text-sm">
                {data.progress.checked} of {data.progress.total} commitments completed
              </p>
            </div>

            <ArcDashboard initialData={data} />
          </div>
        </section>
      </div>

      <ArcFeedbackBox />

      {/* Manuscript reader */}
      <div className="border-t-4 border-navy-800">
        <div className="pt-12 pb-6 text-center border-b border-navy-800">
          <p className="text-gold-500 text-[0.7rem] tracking-[0.3em] uppercase font-semibold mb-3">
            Advance Reader Manuscript
          </p>
          <h1
            className="font-serif font-bold text-white tracking-[-0.01em] mb-1.5"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            The Wrong Jesus
          </h1>
          <p className="text-slate-500 text-sm">Dr. William C.K. Yomes</p>
        </div>

        {manuscriptStatus === 'locked' && (
          <div className="max-w-[680px] mx-auto px-6 py-16">
            <div className="flex justify-center mb-12">
              <CountdownTimer targetDate={ARC_MANUSCRIPT_UNLOCK} label="until manuscript unlocks" size="sm" />
            </div>
            <p className="text-gold-500 text-xs tracking-[0.2em] uppercase font-semibold mb-4 text-center">
              Your Commitments
            </p>
            <CommitmentsPreview commitments={data.commitments} />
          </div>
        )}
        {manuscriptStatus === 'closed' && (
          <div className="max-w-[680px] mx-auto px-6 py-24 text-center">
            <p className="text-slate-400 text-lg">Manuscript access has closed.</p>
          </div>
        )}
        {manuscriptStatus === 'open' && <ManuscriptReader sections={sections} />}
      </div>
    </div>
  )
}
