import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-navy-950 min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
          404
        </p>
        <h1 className="font-serif text-5xl font-bold text-white mb-6">
          Page Not Found
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </section>
  )
}
