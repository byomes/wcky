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

const ARC_FORM_HTML = `<form action="https://app.kit.com/forms/9395205/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="9395205" data-uid="ada13c59d0" data-format="inline" data-version="5" min-width="400 500 600 700 800"><div data-style="clean"><ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul><div data-element="fields" data-stacked="true" class="seva-fields formkit-fields"><div class="formkit-field"><input class="formkit-input" aria-label="First Name" name="fields[first_name]" placeholder="First Name" type="text" style="color: rgb(0, 0, 0); border-color: rgb(227, 227, 227); border-radius: 4px; font-weight: 400;"></div><div class="formkit-field"><input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="color: rgb(0, 0, 0); border-color: rgb(227, 227, 227); border-radius: 4px; font-weight: 400;"></div><div class="formkit-field"><fieldset data-group="checkboxes" class="formkit-5227" type="Custom" order="2" save_as="Tag" group="field"><legend style="color: rgb(0, 0, 0); font-weight: 400;">I have read the ARC Partner commitments above and I agree to fulfill all six.</legend><div class="formkit-checkboxes" data-element="tags-checkboxes" data-group="checkbox" style="color: rgb(0, 0, 0); border-color: rgb(227, 227, 227); border-radius: 4px; font-weight: 400;"><input class="formkit-checkbox" id="tag-1831783686-19285341" type="checkbox" name="tags[]" value="19285341"><label for="tag-1831783686-19285341">I want to be an ARC team member.</label></div></fieldset></div><button data-element="submit" class="formkit-submit formkit-submit" style="color: rgb(255, 255, 255); background-color: rgb(100, 100, 100); border-radius: 4px; font-weight: 400;"><div class="formkit-spinner"><div></div><div></div><div></div></div><span class="">Join The Team</span></button></div></div></form>`

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
          <div dangerouslySetInnerHTML={{ __html: ARC_FORM_HTML }} />
        </div>
      </section>
    </>
  )
}
