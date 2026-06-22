import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPartnerSession, PARTNER_COOKIE } from '@/lib/writing-room-auth'
import RoomShell from './RoomShell'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  if (!session) redirect('/room/login')

  return (
    <RoomShell name={session.name} isAdmin={session.isAdmin}>
      {children}
    </RoomShell>
  )
}
