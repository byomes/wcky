'use client'

import { useState } from 'react'
import LeadMagnetModal from './LeadMagnetModal'

export default function StartCTA() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <LeadMagnetModal isOpen={open} onClose={() => setOpen(false)} />
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gold-500 text-white hover:bg-gold-400 transition-colors duration-200 group"
      >
        <span className="font-bold text-sm tracking-wide">Get Your Free Copy</span>
        <span className="text-lg leading-none">→</span>
      </button>
    </>
  )
}
