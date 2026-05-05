import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Dr. William C.K. Yomes for speaking inquiries, media requests, or general questions.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Contact
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
            Get in Touch
          </h1>
        </div>
      </section>

      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <h2 className="font-serif text-2xl font-bold text-white mb-8">
                Contact Information
              </h2>
              <div className="space-y-7">
                {[
                  { label: 'General Inquiries', email: 'contact@williamckyomes.com' },
                  { label: 'Speaking Inquiries', email: 'speaking@williamckyomes.com' },
                  { label: 'Media & Press', email: 'media@williamckyomes.com' },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-gold-500 text-xs tracking-widest uppercase font-semibold mb-1">
                      {item.label}
                    </p>
                    <a
                      href={`mailto:${item.email}`}
                      className="text-slate-400 hover:text-gold-400 transition-colors text-sm"
                    >
                      {item.email}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-navy-800">
                <p className="text-slate-500 text-sm leading-relaxed">
                  Dr. Yomes typically responds within 3–5 business days. For
                  urgent matters, please indicate &ldquo;URGENT&rdquo; in your
                  subject line.
                </p>
              </div>
            </div>

            {/* Contact form — update the Formspree action URL before going live */}
            <div className="lg:col-span-2">
              <form
                action="https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID"
                method="POST"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-gold-500 tracking-widest uppercase font-semibold mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full bg-navy-800 border border-navy-600 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors placeholder-slate-600"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gold-500 tracking-widest uppercase font-semibold mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full bg-navy-800 border border-navy-600 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors placeholder-slate-600"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gold-500 tracking-widest uppercase font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-navy-800 border border-navy-600 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors placeholder-slate-600"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gold-500 tracking-widest uppercase font-semibold mb-2">
                    Inquiry Type
                  </label>
                  <select
                    name="inquiryType"
                    className="w-full bg-navy-800 border border-navy-600 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors"
                  >
                    <option value="">Select a topic...</option>
                    <option value="speaking">Speaking Inquiry</option>
                    <option value="media">Media / Press</option>
                    <option value="books">Books / Bulk Orders</option>
                    <option value="general">General Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gold-500 tracking-widest uppercase font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full bg-navy-800 border border-navy-600 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors placeholder-slate-600 resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 bg-gold-500 text-navy-950 text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
