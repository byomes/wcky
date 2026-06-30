import type { Metadata } from 'next'
import ArcSignupForm from './ArcSignupForm'

export const metadata: Metadata = {
  title: 'Join the ARC Team',
  description:
    'Join the Advance Reader Corps for The Wrong Jesus — read early, review honestly, and help get the word out.',
}

const commitments = [
  'Pray for the book\'s impact',
  'Read the book before the launch date',
  'Post an honest review on Amazon on launch day',
  'Share about the book on at least one social media platform',
  'Spread the word to anyone who might benefit from reading it',
]

export default function ArcPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            The Wrong Jesus
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Join the ARC Team
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed">
            ARC stands for <span className="text-gold-400 font-semibold">Advance Reader Corps</span>.
            You read early. You review honestly. You help get the word out.
          </p>
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            What ARC Members Do
          </p>
          <h2 className="font-serif text-3xl font-bold text-white mb-10">
            Five Commitments
          </h2>
          <ol className="space-y-5">
            {commitments.map((commitment, index) => (
              <li key={index} className="flex gap-5 items-start">
                <span className="shrink-0 w-8 h-8 flex items-center justify-center border border-gold-600/50 text-gold-500 text-xs font-bold font-serif">
                  {index + 1}
                </span>
                <p className="text-slate-300 leading-relaxed pt-1">{commitment}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Signup Form */}
      <section className="bg-navy-950 py-16 lg:py-24 border-t border-navy-800">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Ready to Join?
          </p>
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Sign Up for the ARC Team
          </h2>
          <p className="text-slate-400 leading-relaxed mb-10">
            Fill out the form below. By checking the box, you&apos;re committing
            to all five ARC Partner responsibilities. We&apos;ll be in touch with
            details as the launch approaches.
          </p>

          <ArcSignupForm />
        </div>
      </section>
    </>
  )
}
