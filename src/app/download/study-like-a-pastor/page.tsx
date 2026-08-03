import type { Metadata } from 'next'
import DownloadStart from './DownloadStart'

export const metadata: Metadata = {
  title: 'Your Guide Is Ready',
  robots: { index: false },
}

export default function StudyLikeAPastorDownloadPage() {
  return <DownloadStart />
}
