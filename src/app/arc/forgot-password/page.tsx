import type { Metadata } from 'next'
import ArcForgotPasswordForm from './ArcForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Forgot Password — ARC Team',
  description: 'Request a new password for your ARC team login.',
  robots: { index: false },
}

export default function ArcForgotPasswordPage() {
  return (
    <section className="bg-navy-950 min-h-screen pt-32 pb-16">
      <div className="max-w-md mx-auto px-6">
        <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
          ARC Team
        </p>
        <h1 className="font-serif text-4xl font-bold text-white mb-2">
          Forgot Password
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-10">
          Enter the email you signed up with and we&apos;ll send a new password to it.
        </p>

        <ArcForgotPasswordForm />

        <p className="text-slate-500 text-sm mt-8">
          <a href="/arc/login" className="text-gold-500 hover:text-gold-400">
            ← Back to login
          </a>
        </p>
      </div>
    </section>
  )
}
