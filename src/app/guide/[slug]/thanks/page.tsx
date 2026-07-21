import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLeadMagnet } from '@/lib/lead-magnet-api'

interface Props {
  params: { slug: string }
}

export const metadata: Metadata = {
  title: 'Check Your Inbox',
  robots: { index: false },
}

export default async function GuideThanksPage({ params }: Props) {
  const magnet = await getLeadMagnet(params.slug)
  if (!magnet) notFound()

  return (
    <section className="bg-navy-950 pt-32 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
          You&apos;re All Set
        </p>
        <h1 className="font-serif text-4xl font-bold text-white leading-tight mb-6">
          Check Your Inbox
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          We&apos;ve sent the {magnet.title} companion guide to your email.
          Can&apos;t wait? Grab it right here:
        </p>
        <a
          href={`/guides/${magnet.pdf_filename}`}
          className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-4 px-8 text-sm tracking-[0.15em] uppercase transition-colors"
        >
          Download the Guide
        </a>
      </div>
    </section>
  )
}
