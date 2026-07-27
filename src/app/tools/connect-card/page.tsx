import type { Metadata } from 'next'
import ConnectCardForm from './ConnectCardForm'

export const metadata: Metadata = {
  title: 'Connect Card',
  robots: { index: false, follow: false },
}

export default function ConnectCardPage() {
  return (
    <div className="min-h-screen bg-navy-950 pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <ConnectCardForm />
      </div>
    </div>
  )
}
