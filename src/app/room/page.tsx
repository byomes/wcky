import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPartnerSession, PARTNER_COOKIE } from '@/lib/writing-room-auth'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'The Writing Room',
  robots: 'noindex, nofollow',
}

export default async function RoomPage() {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  if (session) redirect('/room/board')

  return (
    <>
      <section className="bg-navy-950 pt-20 pb-10 sm:pt-32 sm:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Writing Room
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Sign In
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Use the credentials Dr. Bill sent you.
          </p>
        </div>
      </section>

      <LoginForm />
    </>
  )
}
