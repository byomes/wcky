import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPartnerSession, PARTNER_COOKIE } from '@/lib/writing-room-auth'
import ApplyForm from './ApplyForm'

export const metadata: Metadata = {
  title: 'Apply — The Writing Room',
  robots: 'noindex, nofollow',
}

export default async function ApplyPage() {
  const cookieStore = cookies()
  const session = await getPartnerSession(cookieStore.get(PARTNER_COOKIE)?.value)
  if (session) redirect('/room/board')

  return (
    <>
      <section className="bg-navy-950 pt-20 pb-10 sm:pt-32 sm:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Private Community
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            The Writing Room
          </h1>
          <p className="text-slate-300 text-base sm:text-xl leading-relaxed">
            A private community for people helping to shape the writing. Read and respond to Dr. Bill as the writing happens. Beta chapters. Cover designs. Author Calls. This is a real community.
          </p>
        </div>
      </section>

      <section className="bg-navy-900 py-12 sm:py-16 lg:py-24 border-t border-navy-800">
        <div className="max-w-lg mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Apply for Access
          </p>
          <h2 className="font-serif text-3xl font-bold text-white mb-3">
            Request to Join
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Dr. Bill reviews every request personally. Membership is not guaranteed.
          </p>
          <ApplyForm />
        </div>
      </section>
    </>
  )
}
