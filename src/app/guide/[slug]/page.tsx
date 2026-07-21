import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLeadMagnet } from '@/lib/lead-magnet-api'
import GuideSignupForm from './GuideSignupForm'
import ViewPing from './ViewPing'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const magnet = await getLeadMagnet(params.slug)
  if (!magnet) return {}
  return {
    title: `Free Companion Guide — ${magnet.title}`,
    description: `Get the free companion guide for ${magnet.title}, sent straight to your inbox.`,
  }
}

export default async function GuidePage({ params }: Props) {
  const magnet = await getLeadMagnet(params.slug)
  if (!magnet || !magnet.active) notFound()

  return (
    <>
      <ViewPing slug={magnet.slug} />
      <section className="bg-navy-950 pt-32 pb-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Free Companion Guide
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {magnet.title}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-10">
            Enter your name and email below and we&apos;ll send the free companion guide
            straight to your inbox.
          </p>
          <GuideSignupForm slug={magnet.slug} />
        </div>
      </section>
    </>
  )
}
