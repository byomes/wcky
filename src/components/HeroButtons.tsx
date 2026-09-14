'use client'

import { useState } from 'react'
import { useLeadMagnetModal } from './LeadMagnetModalContext'
import NewsletterModal from './NewsletterModal'

export default function HeroButtons() {
  const { openModal } = useLeadMagnetModal()
  const [newsletterOpen, setNewsletterOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-end">
      <NewsletterModal isOpen={newsletterOpen} onClose={() => setNewsletterOpen(false)} />
      <button
        onClick={openModal}
        className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-gold-500 text-white text-xs lg:text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
      >
        Get the Free Resource
      </button>
      <button
        onClick={() => setNewsletterOpen(true)}
        className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 border border-white/40 text-white text-xs lg:text-sm font-bold tracking-wide uppercase hover:border-white/70 hover:bg-white/10 transition-colors duration-200"
      >
        Get Updates
      </button>
    </div>
  )
}
