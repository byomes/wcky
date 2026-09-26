import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Contact Card',
  description: 'Save Dr. Bill Yomes’s contact info directly to your phone.',
  robots: { index: false, follow: false },
}

const ROWS = [
  {
    label: 'Phone',
    value: '(302) 502-7928',
    href: 'tel:+13025027928',
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: 'Email',
    value: 'pastorbill@catalyst302.com',
    href: 'mailto:pastorbill@catalyst302.com',
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
  },
  {
    label: 'Website',
    value: 'williamckyomes.com',
    href: 'https://williamckyomes.com',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
      </>
    ),
  },
]

export default function CardPage() {
  return (
    <section className="bg-navy-950 min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm rounded-2xl bg-navy-900 border border-navy-700 p-8 flex flex-col items-center text-center gap-5">
        <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-gold-500/40">
          <Image src="/card/bill.jpg" alt="Dr. Bill Yomes" fill sizes="112px" className="object-cover" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-2xl font-bold text-white">Dr. Bill Yomes</h1>
          <p className="text-gold-500 text-xs tracking-[0.2em] uppercase font-semibold">
            Senior Pastor, Catalyst Community Church
          </p>
        </div>

        <a
          href="/card/bill.vcf"
          className="w-full rounded-xl bg-gold-500 hover:bg-gold-400 transition-colors text-navy-950 font-semibold text-sm py-3 flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 11h-6M19 8v6" />
          </svg>
          Save to Contacts
        </a>

        <div className="w-full flex flex-col gap-1 pt-2">
          {ROWS.map((row) => (
            <a
              key={row.label}
              href={row.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-navy-800 transition-colors text-left"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-500 flex-none">
                {row.icon}
              </svg>
              <span className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wide text-navy-400">{row.label}</span>
                <span className="text-sm text-white">{row.value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
