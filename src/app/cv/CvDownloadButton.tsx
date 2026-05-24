'use client'

export default function CvDownloadButton() {
  return (
    <button
      onClick={() => window.print()}
      className="cv-no-print inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-gray-700 transition-colors duration-200"
      style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}
    >
      Download PDF
    </button>
  )
}
