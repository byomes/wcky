import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Start Here',
  description:
    'Links, resources, and free downloads from Dr. William C.K. Yomes — pastor, apologist, and author.',
}

const links = [
  {
    label: 'Catalyst Community Church',
    href: 'https://catalyst302.com',
    external: true,
  },
  {
    label: 'Adelphos Academy',
    href: 'https://adelphosacademy.com',
    external: true,
  },
  {
    label: 'Faith Makes Sense',
    href: 'https://faithmakessense.com',
    external: true,
  },
  {
    label: 'Read the Blog',
    href: '/blog',
    external: false,
  },
  {
    label: 'Books',
    href: '/theology',
    external: false,
  },
]

const LEAD_MAGNET_HTML = `<form action="https://app.kit.com/forms/9400485/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="9400485" data-uid="074d4e9a43" data-format="inline" data-version="5" min-width="400 500 600 700 800" style="background-color: rgb(255, 255, 255); border-radius: 6px;"><div data-style="full"><div data-element="column" class="formkit-background" style="background-image: url(&quot;https://embed.filekitcdn.com/e/sQCuyGC8iheSyD6maLMaJ5/4AvxrUArR5NL5MmorJYtC2&quot;);"></div><div data-element="column" class="formkit-column"><div class="formkit-header" data-element="header" style="color: rgb(83, 83, 83); font-size: 28px; font-weight: 700;"><h2>Get Your Copy Today</h2></div><ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul><div data-element="fields" class="seva-fields formkit-fields"><div class="formkit-field"><input class="formkit-input" aria-label="First Name" name="fields[first_name]" placeholder="First Name" type="text" style="color: rgb(139, 139, 139); border-color: rgb(221, 224, 228); font-weight: 400;"></div><div class="formkit-field"><input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="color: rgb(139, 139, 139); border-color: rgb(221, 224, 228); font-weight: 400;"></div><button data-element="submit" class="formkit-submit formkit-submit" style="color: rgb(255, 255, 255); background-color: rgb(93, 93, 93); border-radius: 3px; font-weight: 700;"><div class="formkit-spinner"><div></div><div></div><div></div></div><span class="">Send It To Me</span></button></div><div class="formkit-disclaimer" data-element="disclaimer" style="color: rgb(139, 139, 139); font-size: 13px;">We respect your privacy. Unsubscribe at anytime.</div></div></div></form>`

export default function StartPage() {
  return (
    <>
      <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="afterInteractive" />

      <section className="bg-navy-950 min-h-screen pt-28 pb-20">
        <div className="max-w-lg mx-auto px-6">

          {/* Profile */}
          <div className="text-center mb-10">
            <div className="w-24 h-24 rounded-full bg-navy-700 border border-navy-600 mx-auto mb-5 flex items-center justify-center">
              <span className="text-slate-600 text-xs">Photo</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-white mb-1">
              Dr. William C.K. Yomes
            </h1>
            <p className="text-gold-500 text-xs tracking-[0.25em] uppercase">
              Pastor. Apologist. Author.
            </p>
          </div>

          {/* Link Cards */}
          <nav className="flex flex-col gap-3 mb-16">
            {links.map(link =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-6 py-4 bg-navy-800 border border-navy-700 hover:border-gold-500/50 hover:bg-navy-700 text-white hover:text-gold-300 transition-all duration-200 group"
                >
                  <span className="font-semibold text-sm tracking-wide">
                    {link.label}
                  </span>
                  <span className="text-gold-600 group-hover:text-gold-400 transition-colors text-lg leading-none">
                    →
                  </span>
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between w-full px-6 py-4 bg-navy-800 border border-navy-700 hover:border-gold-500/50 hover:bg-navy-700 text-white hover:text-gold-300 transition-all duration-200 group"
                >
                  <span className="font-semibold text-sm tracking-wide">
                    {link.label}
                  </span>
                  <span className="text-gold-600 group-hover:text-gold-400 transition-colors text-lg leading-none">
                    →
                  </span>
                </Link>
              )
            )}
          </nav>

          {/* Free Resource */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-navy-700" />
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold">
                Free Resource
              </p>
              <div className="flex-1 h-px bg-navy-700" />
            </div>
            <div dangerouslySetInnerHTML={{ __html: LEAD_MAGNET_HTML }} />
          </div>

        </div>
      </section>
    </>
  )
}
