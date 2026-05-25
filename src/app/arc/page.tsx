import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Join the ARC Team',
  description:
    'Join the Advance Reader Corps for The Wrong Jesus — read early, review honestly, and help get the word out.',
}

const commitments = [
  'Pray for the book\'s impact',
  'Receive an advance copy of The Wrong Jesus before it\'s published',
  'Read the book before the launch date',
  'Post an honest review on Amazon on launch day',
  'Share about the book on at least one social media platform',
  'Spread the word to anyone who might benefit from reading it',
]

export default function ArcPage() {
  return (
    <>
      <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="afterInteractive" />

      {/* Hero */}
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            The Wrong Jesus
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Join the ARC Team
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed">
            ARC stands for <span className="text-gold-400 font-semibold">Advance Reader Corps</span>.
            You read early. You review honestly. You help get the word out.
          </p>
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            What ARC Members Do
          </p>
          <h2 className="font-serif text-3xl font-bold text-white mb-10">
            Six Commitments
          </h2>
          <ol className="space-y-5">
            {commitments.map((commitment, index) => (
              <li key={index} className="flex gap-5 items-start">
                <span className="shrink-0 w-8 h-8 flex items-center justify-center border border-gold-600/50 text-gold-500 text-xs font-bold font-serif">
                  {index + 1}
                </span>
                <p className="text-slate-300 leading-relaxed pt-1">{commitment}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Signup Form */}
      <section className="bg-navy-950 py-16 lg:py-24 border-t border-navy-800">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Ready to Join?
          </p>
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Sign Up for the ARC Team
          </h2>
          <p className="text-slate-400 leading-relaxed mb-10">
            Fill out the form below. By checking the box, you&apos;re committing
            to all six ARC Partner responsibilities. We&apos;ll be in touch with
            details as the launch approaches.
          </p>

          <form
            action="https://app.kit.com/forms/9395205/subscriptions"
            className="seva-form formkit-form"
            method="post"
            data-sv-form="9395205"
            data-uid="ada13c59d0"
            data-format="inline"
            data-version="5"
          >
            <ul
              className="formkit-alert formkit-alert-error text-red-400 text-sm mb-6 list-none p-0 empty:hidden"
              data-element="errors"
              data-group="alert"
            />

            <div data-element="fields" data-stacked="true" className="seva-fields formkit-fields space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="formkit-field">
                  <input
                    className="formkit-input w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
                    aria-label="First Name"
                    name="fields[first_name]"
                    placeholder="First Name"
                    type="text"
                  />
                </div>
                <div className="formkit-field">
                  <input
                    className="formkit-input w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
                    aria-label="Last Name"
                    name="fields[last_name]"
                    placeholder="Last Name"
                    type="text"
                  />
                </div>
              </div>

              <div className="formkit-field">
                <input
                  className="formkit-input w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
                  name="email_address"
                  aria-label="Email Address"
                  placeholder="Email Address"
                  required
                  type="email"
                />
              </div>

              <div className="formkit-field pt-2">
                <fieldset data-group="checkboxes" className="formkit-5227 border-0 p-0 m-0">
                  <div
                    className="formkit-checkboxes flex items-start gap-3"
                    data-element="tags-checkboxes"
                    data-group="checkbox"
                  >
                    <input
                      className="formkit-checkbox mt-1 shrink-0 w-4 h-4 accent-gold-500 cursor-pointer"
                      id="tag-1831783686-19285341"
                      type="checkbox"
                      name="tags[]"
                      value="19285341"
                    />
                    <label
                      htmlFor="tag-1831783686-19285341"
                      className="text-slate-300 text-sm leading-relaxed cursor-pointer"
                    >
                      I have read the ARC Partner commitments above and I agree to fulfill all six.
                      I want to be an ARC team member.
                    </label>
                  </div>
                </fieldset>
              </div>

              <div className="pt-2">
                <button
                  data-element="submit"
                  className="formkit-submit w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-4 px-8 text-sm tracking-[0.15em] uppercase transition-colors"
                >
                  <div className="formkit-spinner hidden">
                    <div /><div /><div />
                  </div>
                  <span>Join The Team</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
