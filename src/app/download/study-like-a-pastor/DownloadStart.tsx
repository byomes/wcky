'use client'

import { useEffect } from 'react'
import Image from 'next/image'

const FILE_PATH = '/guides/study-like-a-pastor.pdf'
const FILE_NAME = 'Study-Like-A-Pastor-WilliamCKYomes.pdf'

export default function DownloadStart() {
  useEffect(() => {
    const link = document.createElement('a')
    link.href = FILE_PATH
    link.download = FILE_NAME
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  return (
    <section className="bg-navy-950 pt-32 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
          You&apos;re All Set
        </p>
        <div className="relative w-32 aspect-[825/1275] mx-auto mb-6 shadow-2xl">
          <Image
            src="/images/lead-magnet2.png"
            alt="How to Study Like a Pastor"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="font-serif text-4xl font-bold text-white leading-tight mb-6">
          Your Guide Is Ready
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Your download is starting now. If it doesn&apos;t begin automatically,
          click below to grab it.
        </p>
        <a
          href={FILE_PATH}
          download={FILE_NAME}
          className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-4 px-8 text-sm tracking-[0.15em] uppercase transition-colors"
        >
          Download the Guide
        </a>
      </div>
    </section>
  )
}
