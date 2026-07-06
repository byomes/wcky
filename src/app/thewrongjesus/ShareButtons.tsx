'use client'

import { MessageCircle, Share2 } from 'lucide-react'

const shareText =
  "I'm getting an advance copy of The Wrong Jesus by Dr. Bill Yomes — check it out:"
const smsText = 'I want to share this with you.'
const shareUrl = 'https://williamckyomes.com/thewrongjesus'

const buttonClasses =
  'inline-flex items-center justify-center px-7 py-3 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200'

export default function ShareButtons() {
  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'The Wrong Jesus', text: shareText, url: shareUrl })
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
      }
      return
    }
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href={`sms:?&body=${encodeURIComponent(`${smsText} ${shareUrl}`)}`}
        className={buttonClasses}
      >
        <MessageCircle size={18} className="mr-2" />
        Share via Text
      </a>
      <button type="button" onClick={handleShare} className={buttonClasses}>
        <Share2 size={18} className="mr-2" />
        Share on Social
      </button>
    </div>
  )
}
