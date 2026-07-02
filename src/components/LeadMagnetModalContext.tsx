'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import LeadMagnetModal from './LeadMagnetModal'

interface LeadMagnetModalContextValue {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const LeadMagnetModalContext = createContext<LeadMagnetModalContextValue | null>(null)

export function LeadMagnetModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <LeadMagnetModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
      <LeadMagnetModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </LeadMagnetModalContext.Provider>
  )
}

export function useLeadMagnetModal() {
  const context = useContext(LeadMagnetModalContext)
  if (!context) {
    throw new Error('useLeadMagnetModal must be used within a LeadMagnetModalProvider')
  }
  return context
}
