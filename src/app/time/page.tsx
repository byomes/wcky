import type { Metadata } from 'next'
import Clock from './Clock'

export const metadata: Metadata = {
  title: 'Current Time',
  description: 'The current time in the Eastern Time zone (America/New_York), live and updating every second.',
}

export default function TimePage() {
  return (
    <section className="bg-navy-950 min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
          Live Clock
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-10">
          Eastern Time
        </h1>
        <Clock />
      </div>
    </section>
  )
}
