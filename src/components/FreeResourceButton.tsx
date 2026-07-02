'use client'

import { useLeadMagnetModal } from './LeadMagnetModalContext'

export default function FreeResourceButton() {
  const { openModal } = useLeadMagnetModal()

  return (
    <button
      onClick={openModal}
      className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
    >
      Get the Free Resource →
    </button>
  )
}
