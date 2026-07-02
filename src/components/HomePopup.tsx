'use client'

import { useEffect, useRef } from 'react'
import { useLeadMagnetModal } from './LeadMagnetModalContext'

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
  const { isOpen, openModal } = useLeadMagnetModal()
  const openedByPopup = useRef(false)

  useEffect(() => {
    if (getCookie(COOKIE_NAME)) return
    const timer = setTimeout(() => {
      openedByPopup.current = true
      openModal()
    }, DELAY_MS)
    return () => clearTimeout(timer)
  }, [openModal])

  useEffect(() => {
    if (!isOpen && openedByPopup.current) {
      openedByPopup.current = false
      setCookie(COOKIE_NAME, COOKIE_DAYS)
    }
  }, [isOpen])

  return null
}
