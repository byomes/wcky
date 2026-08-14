import type { Metadata } from 'next'
import ArcInterestForm from './ArcInterestForm'

export const metadata: Metadata = {
  title: 'Advance Reader Corps',
  description:
    'Read early. Give honest feedback. Help a book find its footing before launch day. Join the waitlist for the next ARC team.',
}

export default function ArcPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Advance Reader Corps
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Wanna Join The ARC?
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed">
            Before a book reaches the public, a small group of readers gets it first.
            They read early, give honest feedback, and help the book find its footing
            before launch day. That&apos;s ARC.
          </p>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Why It Matters
          </p>
          <h2 className="font-serif text-3xl font-bold text-white mb-10">
            A Book Gets Better With Real Readers
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Every book I write goes through an ARC team before it goes out into the
            world. Early readers catch what I can&apos;t see anymore after months of
            writing. They tell me where a chapter lands and where it doesn&apos;t. And
            on launch day, their honest reviews are often the first thing a new reader
            sees.
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-navy-950 py-16 lg:py-24 border-t border-navy-800">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            What You Get
          </p>
          <h2 className="font-serif text-3xl font-bold text-white mb-10">
            Early Access. Real Input.
          </h2>
          <p className="text-slate-300 leading-relaxed">
            ARC readers get the manuscript before anyone else — weeks ahead of the
            public release. It&apos;s a chance to read something before it&apos;s
            finished being shaped, and to have a real say in how it lands. Your
            feedback isn&apos;t a formality; it shapes edits, and your honest review
            helps the book find its first readers.
          </p>
        </div>
      </section>

      {/* Join The List */}
      <section className="bg-navy-950 py-16 lg:py-24 border-t border-navy-800">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Join The List
          </p>
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Be First to Know
          </h2>
          <p className="text-slate-400 leading-relaxed mb-10">
            There isn&apos;t an open ARC team right now. Leave your name and email,
            and you&apos;ll be the first to hear when the next one opens.
          </p>

          <ArcInterestForm />
        </div>
      </section>
    </>
  )
}
