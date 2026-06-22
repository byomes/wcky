const WATSON_BASE = process.env.WATSON_API_URL
const WATSON_KEY = process.env.WATSON_API_KEY

function headers() {
  return {
    'Content-Type': 'application/json',
    'X-Watson-Key': WATSON_KEY ?? '',
  }
}

async function watsonGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${WATSON_BASE}${path}`, {
      headers: headers(),
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json() as Promise<T>
  } catch {
    return null
  }
}

async function watsonPost<T>(path: string, body: object): Promise<T | null> {
  try {
    const res = await fetch(`${WATSON_BASE}${path}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json() as Promise<T>
  } catch {
    return null
  }
}

async function watsonDelete(path: string, body?: object): Promise<any> {
  const res = await fetch(`${WATSON_BASE}${path}`, {
    method: 'DELETE',
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) return null
  return res.json()
}

export interface Post {
  id: number
  partner_id: number
  section: string
  parent_id: number | null
  content: string
  flagged: number
  created_at: string
  partner_name: string
}

export interface Feedback {
  id: number
  partner_id: number
  target_type: string
  target_slug: string
  reaction: string | null
  comment: string | null
  created_at: string
}

export interface Call {
  id: number
  title: string
  scheduled_at: string
  meeting_url: string | null
  reminder_24h_sent: number
  reminder_1h_sent: number
}

export interface Partner {
  id: number
  name: string
  email: string
  username: string | null
  status: string
  joined_at: string | null
  last_active: string | null
  why_join: string | null
}

export interface Message {
  id: number
  partner_id: number | null
  name: string
  email: string
  message: string
  created_at: string
}

export async function submitApplication(data: {
  name: string
  email: string
  why_join: string
  faith_description: string
  agreed_to_participate: boolean
}): Promise<{ ok: boolean } | null> {
  return watsonPost('/api/writing-room/signup', data)
}

export async function loginPartner(
  username: string,
  password: string,
): Promise<{ partnerId: number; name: string; username: string } | null> {
  return watsonPost('/api/writing-room/login', { username, password })
}

export async function getPosts(section: 'board' | 'beta' | 'prayer'): Promise<Post[]> {
  return (await watsonGet<Post[]>(`/api/writing-room/posts?section=${section}`)) ?? []
}

export async function submitPost(data: {
  partnerId: number
  section: string
  content: string
  parentId?: number
}): Promise<{ ok: boolean } | null> {
  if (data.parentId) {
    return watsonPost('/api/writing-room/reply', {
      partner_id: data.partnerId,
      section: data.section,
      parent_id: data.parentId,
      content: data.content,
    })
  }
  return watsonPost('/api/writing-room/post', {
    partner_id: data.partnerId,
    section: data.section,
    content: data.content,
  })
}

export async function submitBetaFeedback(data: {
  partnerId: number
  targetType: string
  targetSlug: string
  reaction?: string
  comment?: string
}): Promise<{ ok: boolean } | null> {
  return watsonPost('/api/writing-room/feedback', {
    partner_id: data.partnerId,
    target_type: data.targetType,
    target_slug: data.targetSlug,
    reaction: data.reaction,
    comment: data.comment,
  })
}

export async function submitMessage(data: {
  partnerId: number
  name: string
  email: string
  message: string
}): Promise<{ ok: boolean } | null> {
  return watsonPost('/api/writing-room/message', {
    partner_id: data.partnerId,
    name: data.name,
    email: data.email,
    message: data.message,
  })
}

export async function getCalls(): Promise<Call[]> {
  return (await watsonGet<Call[]>('/api/writing-room/calls')) ?? []
}

export async function requestPasswordReset(email: string): Promise<{ ok: boolean } | null> {
  return watsonPost('/api/writing-room/reset-request', { email })
}

export async function validateResetToken(token: string): Promise<{ valid: boolean }> {
  return (await watsonGet<{ valid: boolean }>(`/api/writing-room/reset-validate?token=${encodeURIComponent(token)}`)) ?? { valid: false }
}

export async function confirmPasswordReset(
  token: string,
  newPassword: string,
): Promise<{ ok: boolean } | null> {
  return watsonPost('/api/writing-room/reset-confirm', { token, password: newPassword })
}

export async function validateVerifyToken(
  token: string,
): Promise<{ valid: boolean; name?: string }> {
  return (
    (await watsonGet<{ valid: boolean; name?: string }>(
      `/api/writing-room/verify-validate?token=${encodeURIComponent(token)}`,
    )) ?? { valid: false }
  )
}

export async function confirmVerify(
  token: string,
  password: string,
): Promise<{ ok: boolean } | null> {
  return watsonPost('/api/writing-room/verify-confirm', { token, password })
}

// Admin
export async function getPartners(): Promise<Partner[]> {
  return (await watsonGet<Partner[]>('/api/writing-room/partners')) ?? []
}

export async function getPendingApplications(): Promise<Partner[]> {
  return (await watsonGet<Partner[]>('/api/writing-room/partners?status=pending')) ?? []
}

export async function getRecentMessages(limit = 10): Promise<Message[]> {
  return (await watsonGet<Message[]>(`/api/writing-room/messages?limit=${limit}`)) ?? []
}

export async function deletePost(postId: number, partnerId: number): Promise<{ ok: boolean } | null> {
  return watsonDelete(`/api/writing-room/post/${postId}`, { partner_id: partnerId })
}
