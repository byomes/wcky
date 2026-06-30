const WATSON_BASE = (process.env.WATSON_API_URL ?? '').replace(/\/$/, '')
const WATSON_KEY  = process.env.WATSON_API_KEY ?? ''

export async function submitArcFeedback(
  data: {
    targetType: string
    targetSlug: string
    reaction?: string
    comment?: string
  },
  sessionToken: string,
): Promise<{ ok: boolean } | null> {
  try {
    const res = await fetch(`${WATSON_BASE}/api/arc/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'X-Watson-Key':  WATSON_KEY,
        'X-Arc-Session': sessionToken,
      },
      body: JSON.stringify({
        target_type: data.targetType,
        target_slug: data.targetSlug,
        reaction:    data.reaction,
        comment:     data.comment,
      }),
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json() as Promise<{ ok: boolean }>
  } catch {
    return null
  }
}
