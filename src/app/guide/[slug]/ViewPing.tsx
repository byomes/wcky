'use client'

import { useEffect } from 'react'

export default function ViewPing({ slug }: { slug: string }) {
  useEffect(() => {
    fetch('/api/lead-magnet/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
      keepalive: true,
    }).catch(() => {})
  }, [slug])

  return null
}
