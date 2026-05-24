'use client'

import { useEffect, useState } from 'react'
import LeadMagnetModal from './LeadMagnetModal'

const COOKIE_NAME = 'popup_dismissed'
const COOKIE_DAYS = 30
const DELAY_MS = 6000

function getCookie(name: string): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.split(';').some(c => c.trim().startsWith(name + '='))
}

function setCookie(name: string, days: number) {
  const expires = new Date()
  expires.setDate(expires.getDate() + days)
  document.cookie = `${name}=1; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

export default function HomePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (getCookie(COOKIE_NAME)) return
    const timer = setTimeout(() => setIsOpen(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  function handleClose() {
    setIsOpen(false)
    setCookie(COOKIE_NAME, COOKIE_DAYS)
  }

  return <LeadMagnetModal isOpen={isOpen} onClose={handleClose} />
}
