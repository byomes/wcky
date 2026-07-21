const WATSON_BASE = (process.env.WATSON_API_URL ?? '').replace(/\/$/, '')
const WATSON_KEY  = process.env.WATSON_API_KEY ?? ''

export interface LeadMagnet {
  slug: string
  title: string
  pdf_filename: string
  active: boolean
}

export async function getLeadMagnet(slug: string): Promise<LeadMagnet | null> {
  try {
    const res = await fetch(`${WATSON_BASE}/api/lead-magnet/${encodeURIComponent(slug)}`, {
      headers: { 'X-Watson-Key': WATSON_KEY },
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json() as Promise<LeadMagnet>
  } catch {
    return null
  }
}
