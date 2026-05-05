'use client'

import { useState } from 'react'
import Link from 'next/link'
import FreeResourceModal from './FreeResourceModal'

export default function HeroButtons() {
  const [kitOpen, setKitOpen] = useState(false)

  return (
    <>
      <FreeResourceModal isOpen={kitOpen} onClose={() => setKitOpen(false)} />
      <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-end">
        <button
          onClick={() => setKitOpen(true)}
          className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-gold-500 text-navy-950 text-xs lg:text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
        >
          Get the Free Resource
        </button>
        <Link
          href="/arc"
          className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 border border-white/40 text-white text-xs lg:text-sm font-bold tracking-wide uppercase hover:border-white/70 hover:bg-white/10 transition-colors duration-200"
        >
          Join the Launch Team
        </Link>
      </div>
    </>
  )
}
