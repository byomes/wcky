'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/room/board',   label: 'Board'   },
  { href: '/room/read',    label: 'Read'    },
  { href: '/room/beta',    label: 'Beta'    },
  { href: '/room/prayer',  label: 'Prayer'  },
  { href: '/room/calls',   label: 'Calls'   },
  { href: '/room/account', label: 'Account' },
]

export default function RoomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-navy-900 border-t border-navy-800 flex z-50">
      {NAV.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 py-6 text-center text-xs tracking-widest uppercase transition-colors ${
              active
                ? 'text-gold-500 border-t-2 border-gold-500 -mt-px'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
