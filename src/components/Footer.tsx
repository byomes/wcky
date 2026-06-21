'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/room')) return null

  return (
    <footer className="bg-navy-950 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">
              Dr. William C.K. Yomes
            </h3>
            <p className="text-[11px] text-gold-500 tracking-[0.25em] uppercase mb-4">
              Pastor · Apologist · Author
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Exploring the deep foundations of Christian faith through
              preaching, writing, and apologetics.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] text-gold-600 tracking-[0.25em] uppercase font-semibold mb-5">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/start', label: 'Start' },
                { href: '/blog', label: 'Blog' },
                { href: '/theology', label: 'Theology' },
                { href: '/dreamstone', label: 'Dreamstone' },
                { href: '/arc', label: 'Arc' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-500 hover:text-gold-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-[10px] text-gold-600 tracking-[0.25em] uppercase font-semibold mb-5">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:contact@williamckyomes.com"
                className="text-sm text-slate-500 hover:text-gold-400 transition-colors duration-200"
              >
                contact@williamckyomes.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2026 WilliamCKYomes
          </p>
        </div>
      </div>
    </footer>
  )
}
