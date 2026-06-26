import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CountdownTimer from './CountdownTimer'
import SignupForm from './SignupForm'

export const metadata: Metadata = {
  title: 'The Wrong Jesus — Coming September 15, 2026',
  description:
    "Most Christians never think to ask the question. The Wrong Jesus asks it anyway: What if the Jesus you're following isn't actually true? By Dr. Bill Yomes. Coming September 15, 2026.",
  openGraph: {
    title: 'The Wrong Jesus by Dr. Bill Yomes',
    description:
      "What if the Jesus you're following isn't actually true? Coming September 15, 2026.",
    images: [{ url: '/images/wrong-jesus-cover-iso.png' }],
  },
}

// Flip to true and replace placeholder when preorder goes live
const AMAZON_LIVE = false
const AMAZON_LINK = '[AMAZON_LINK]'

const GIVEBUTTER_LINK = '[GIVEBUTTER_LINK]'

export default function TheWrongJesusPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-8 sm:flex-row sm:items-start sm:text-left sm:gap-12">
            <div className="w-48 shrink-0 sm:w-56">
              <Image
                src="/images/wrong-jesus-cover-iso.png"
                alt="The Wrong Jesus book cover"
                width={448}
                height={672}
                className="w-full h-auto shadow-2xl"
                priority
              />
            </div>
            <div className="flex flex-col justify-center gap-5">
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold">
                New Book
              </p>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
                The Wrong Jesus
              </h1>
              <p className="text-slate-400 text-lg">by Dr. Bill Yomes</p>
              <div className="border-t border-navy-800 pt-5">
                <p className="text-slate-500 text-xs tracking-widest uppercase mb-3">
                  September 15, 2026
                </p>
                <CountdownTimer />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="bg-navy-900 py-16 lg:py-20 border-t border-navy-800">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="space-y-5 text-slate-300 leading-relaxed text-lg">
            <p>
              Most Christians never think to ask the question.{' '}
              <em className="text-white">The Wrong Jesus</em> asks it anyway: What if the Jesus
              you&apos;re following isn&apos;t actually true?
            </p>
            <p>
              Drawing from the Palm Sunday crowd in the Gospel of Mark, pastor and author Dr. Bill
              Yomes shows how ordinary, sincere, passionate believers can worship a Jesus shaped by
              their wounds, their politics, their tribe, and their needs — and miss the real One
              entirely. The danger isn&apos;t cynicism or rebellion. It&apos;s sincerity aimed at
              the wrong target.
            </p>
            <p>
              Part pastoral narrative, part theological reckoning,{' '}
              <em className="text-white">The Wrong Jesus</em> walks readers through Holy Week and
              invites them to lay down the Jesus they built — and encounter the One who rode in on
              His own terms.
            </p>
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section className="bg-navy-950 py-14 border-t border-navy-800">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Launch Updates
          </p>
          <h2 className="font-serif text-2xl font-bold text-white mb-2">
            Be the first to know
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Get notified when the book is available — and when the preorder goes live.
          </p>
          <SignupForm />
        </div>
      </section>

      {/* PRIMARY CTA — FMS Monthly Donor */}
      <section className="bg-navy-900 py-16 lg:py-20 border-t border-navy-800">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Monthly Partnership
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
            Get a signed copy at launch
          </h2>
          <p className="text-slate-300 leading-relaxed mb-8">
            Every monthly donor to Faith Makes Sense receives a signed physical copy of{' '}
            <em>The Wrong Jesus</em> at launch. This is a permanent program — not a one-time
            promotion. Every future WCKY book will also ship to active monthly donors at launch.
          </p>
          <a
            href={GIVEBUTTER_LINK}
            className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200 mb-5"
          >
            Become a Monthly Partner
          </a>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            <em>
              Monthly partners receive a signed copy of every WCKY book at launch — starting with
              this one. Join before September 15 to receive yours.
            </em>
          </p>
          <p className="text-slate-500 text-sm leading-relaxed border-t border-navy-800 pt-8">
            Faith Makes Sense is a ministry training pastors in East Africa. Your monthly gift funds
            that work — and puts this book in your hands at every launch.
          </p>
        </div>
      </section>

      {/* SECONDARY CTA — ARC Reader */}
      <section className="bg-navy-950 py-16 lg:py-20 border-t border-navy-800">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="border border-navy-700 p-8 lg:p-10">
            <p className="text-slate-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              Advance Reader Copy
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white leading-tight mb-4">
              Read it before anyone else
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              ARC readers receive early digital access to{' '}
              <em className="text-slate-300">The Wrong Jesus</em> before launch. Access closes on
              September 15.
            </p>
            <p className="text-slate-400 text-sm mb-8">
              <em>Read it early. Your review on launch day matters.</em>
            </p>
            <Link
              href="/arc"
              className="inline-flex items-center justify-center px-7 py-3 border border-gold-500/50 text-gold-400 text-sm font-bold tracking-wide uppercase hover:border-gold-400 hover:text-gold-300 transition-colors duration-200"
            >
              Request a Review Copy
            </Link>
          </div>
        </div>
      </section>

      {/* TERTIARY CTA — Amazon preorder (hidden until live) */}
      {AMAZON_LIVE && (
        <section className="bg-navy-900 py-16 border-t border-navy-800">
          <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-slate-400 text-lg mb-6">Available now for preorder on Amazon.</p>
            <a
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
            >
              Order on Amazon
            </a>
          </div>
        </section>
      )}
    </>
  )
}
