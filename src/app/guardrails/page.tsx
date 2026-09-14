import type { Metadata } from 'next'
import Image from 'next/image'
import SignupForm from './SignupForm'
import ShareButtons from './ShareButtons'

export const metadata: Metadata = {
  title: { absolute: 'GUARDRAILS | William CK Yomes' },
  description:
    'Most Christians never ask where the line is with AI. GUARDRAILS draws it — four biblical guardrails for using AI without losing what makes you human. By William CK Yomes.',
  openGraph: {
    title: 'GUARDRAILS by William CK Yomes',
    description: 'Four biblical guardrails for using AI without losing what makes you human.',
    images: [
      {
        url: 'https://williamckyomes.com/images/guardrails-og.png',
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://williamckyomes.com/images/guardrails-og.png',
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
  },
}

const GIVEBUTTER_LINK = 'https://givebutter.com/fms1'

export default function GuardrailsPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-8 sm:flex-row sm:items-start sm:text-left sm:gap-12">
            <div className="w-48 shrink-0 sm:w-56">
              <Image
                src="/images/guardrails-cover.png"
                alt="GUARDRAILS book cover"
                width={400}
                height={640}
                className="w-full h-auto shadow-2xl"
                priority
              />
            </div>
            <div className="flex flex-col justify-center gap-5">
              <span className="inline-block bg-gold-500 text-black text-xs tracking-[0.3em] uppercase font-semibold px-3 py-1.5 w-fit">
                Coming Soon
              </span>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
                GUARDRAILS
              </h1>
              <p className="text-slate-400 text-lg italic">
                Biblical Navigation For An AI-Driven Age
              </p>
              <p className="text-slate-400 text-lg">by William CK Yomes</p>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="bg-navy-900 py-16 lg:py-20 border-t border-navy-800">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="space-y-5 text-slate-300 leading-relaxed text-lg">
            <p>
              Most Christians never stop to ask where the line is with AI.{' '}
              <em className="text-white">GUARDRAILS</em> draws it — not to keep you off the
              road, but to keep you from going somewhere dangerous.
            </p>
            <p>
              Pastor and author William CK Yomes walks readers through four biblical guardrails
              for the AI-driven age: AI is a thing, not a someone. It should amplify your
              thinking, not replace it. It should strengthen your relationships, not substitute
              for them. And it should point you back to God, never stand in for Him. Each
              guardrail is grounded in Scripture — from Genesis to the golden calf of Exodus
              32 — and translated into a plain warning sign: how you know you&apos;ve crossed it.
            </p>
            <p>
              Part pastoral guide, part theological reckoning,{' '}
              <em className="text-white">GUARDRAILS</em> doesn&apos;t ask Christians to fear
              AI or to use it without thinking. It gives them a road to drive — and the rails
              that keep them on it.
            </p>
          </div>
        </div>
      </section>

      {/* SHARE */}
      <section className="bg-navy-950 py-14 border-t border-navy-800">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <ShareButtons />
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section className="bg-navy-900 py-14 border-t border-navy-800">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Launch Updates
          </p>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white leading-tight mb-2">
            Be the first to know
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Get notified when the book is available, and when the preorder goes live.
          </p>
          <SignupForm />
        </div>
      </section>

      {/* SECONDARY CTA: FMS Monthly Donor */}
      <section className="bg-navy-950 py-16 lg:py-20 border-t border-navy-800">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Monthly Partnership
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
            Get a signed copy at launch
          </h2>
          <p className="text-slate-300 leading-relaxed mb-8">
            Every monthly donor to William CK Yomes&apos;s teaching ministry, Faith Makes Sense, receives
            a signed physical copy of <em>GUARDRAILS</em> at launch. This is a permanent
            program, not a one-time promotion. Every future book ships to active monthly donors
            at launch.
          </p>
          <a
            href={GIVEBUTTER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200 mb-5"
          >
            Become a Monthly Partner
          </a>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            <em>
              Monthly partners receive a signed copy of every book at launch, starting with
              this one.
            </em>
          </p>
          <p className="text-slate-500 text-sm leading-relaxed border-t border-navy-800 pt-8">
            Faith Makes Sense is a ministry training pastors in East Africa. Your monthly gift
            funds that work, and puts this book in your hands at every launch.
          </p>
        </div>
      </section>
    </>
  )
}
