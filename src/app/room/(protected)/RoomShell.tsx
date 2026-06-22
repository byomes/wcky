'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sun, Moon } from 'lucide-react'
import RoomNav from './RoomNav'

interface Props {
  children: React.ReactNode
  name: string
  isAdmin?: boolean
}

export default function RoomShell({ children, name, isAdmin }: Props) {
  const [light, setLight] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('writing-room-theme') === 'light') setLight(true)
  }, [])

  function toggle() {
    const next = !light
    setLight(next)
    localStorage.setItem('writing-room-theme', next ? 'light' : 'dark')
  }

  return (
    <div className={`room-root min-h-screen flex flex-col pt-16 lg:pt-20${light ? ' light' : ''}`}>
      <header className="bg-navy-900 border-b border-navy-800 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <span className="font-serif text-white font-semibold text-base">The Writing Room</span>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-sm hidden sm:block">{name}</span>
          {isAdmin && (
            <>
              <span className="text-xs font-semibold tracking-widest uppercase bg-gold-500/15 text-gold-400 border border-gold-500/30 px-2 py-0.5 rounded hidden sm:block">
                Admin
              </span>
              <Link
                href="https://admin.williamckyomes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-300 text-xs tracking-widest uppercase transition-colors hidden sm:block"
              >
                Admin Dashboard →
              </Link>
            </>
          )}
          <button
            onClick={toggle}
            title={light ? 'Switch to dark mode' : 'Switch to light mode'}
            className="text-slate-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center shrink-0"
          >
            {light ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <LogoutButton />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">{children}</main>

      <RoomNav />
    </div>
  )
}

function LogoutButton() {
  return (
    <form action="/api/room/logout" method="POST">
      <button
        type="submit"
        className="text-slate-500 hover:text-slate-300 text-xs tracking-widest uppercase transition-colors"
      >
        Sign out
      </button>
    </form>
  )
}
