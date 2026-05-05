'use client'

import { useState } from 'react'
import LeadMagnetModal from './LeadMagnetModal'

export default function FreeResourceButton() {
  const [kitOpen, setKitOpen] = useState(false)

  return (
    <>
      <LeadMagnetModal isOpen={kitOpen} onClose={() => setKitOpen(false)} />
      <button
        onClick={() => setKitOpen(true)}
        className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
      >
        Get the Free Resource →
      </button>
    </>
  )
}
