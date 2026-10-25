import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Test',
}

export default function TestPage() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <p className="text-navy-900 text-lg">
        The MCP dispatcher connector is fully wired and working.
      </p>
    </div>
  )
}
