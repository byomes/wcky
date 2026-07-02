import type { Metadata } from 'next'
import ArcLoginForm from './ArcLoginForm'

export const metadata: Metadata = {
  title: 'ARC Team Login',
  description: 'Log in to track your ARC commitments for The Wrong Jesus.',
  robots: { index: false },
}

export default function ArcLoginPage({
  searchParams,
}: {
  searchParams: { session?: string }
}) {
  const expired = searchParams?.session === 'expired'

  return (
    <section className="bg-navy-950 min-h-screen pt-32 pb-16">
      <div className="max-w-md mx-auto px-6">
        <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
          ARC Team
        </p>
        <h1 className="font-serif text-4xl font-bold text-white mb-2">
          ARC Login
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-10">
          Log in with the email and password from your signup confirmation email.
        </p>

        <ArcLoginForm
          initialMessage={expired ? 'Your session has expired. Please sign in again.' : undefined}
        />
      </div>
    </section>
  )
}
