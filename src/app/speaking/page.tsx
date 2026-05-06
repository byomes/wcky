import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'Book Dr. William C.K. Yomes for your church, conference, or academic event.',
}

const topics = [
  {
    title: 'Christian Apologetics',
    description:
      'Making the case for the truth of Christianity in a skeptical age. Dr. Yomes brings scholarly depth and pastoral clarity to questions about God, Jesus, the Bible, and the problem of evil.',
    events: ['Church Services', 'Apologetics Conferences', 'University Events'],
  },
  {
    title: 'Biblical Preaching',
    description:
      'The power and method of expository preaching. Dr. Yomes challenges and equips pastors and ministry leaders to preach the Word with faithfulness, clarity, and life-changing conviction.',
    events: ["Pastors' Conferences", 'Seminary Chapels', 'Ministry Training'],
  },
  {
    title: 'The Historical Jesus',
    description:
      'An evidence-based exploration of who Jesus of Nazareth was, what he claimed, and why his resurrection is the best explanation of the historical data. Ideal for both believers and seekers.',
    events: ['Evangelistic Events', 'Small Groups', 'Campus Outreach'],
  },
  {
    title: 'Faith and Reason',
    description:
      'Are faith and reason enemies or allies? Dr. Yomes demonstrates that Christian faith is not a leap in the dark but a step into the light — informed by evidence, history, and philosophy.',
    events: ['Church Retreats', 'Adult Education', 'Interfaith Dialogues'],
  },
]

export default function SpeakingPage() {
  return (
    <>
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Speaking
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
            Bring Dr. Yomes
            <br />
            <span className="text-gold-400">to Your Event</span>
          </h1>
        </div>
      </section>

      <section className="bg-navy-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-slate-300 text-xl leading-relaxed mb-5">
              Dr. Yomes is available for a wide range of speaking engagements —
              from Sunday morning sermons and conference keynotes to apologetics
              seminars and academic lectures.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Each engagement is thoughtfully prepared to meet the specific needs
              of your audience. Whether you&apos;re hosting seasoned believers,
              curious skeptics, or a mixed crowd, Dr. Yomes brings intellectual
              substance and pastoral warmth to every event.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              Speaking Topics
            </p>
            <h2 className="font-serif text-4xl font-bold text-white">
              Areas of Expertise
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {topics.map(topic => (
              <div
                key={topic.title}
                className="border border-navy-700 hover:border-gold-600/40 transition-colors duration-300 p-8"
              >
                <h3 className="font-serif text-2xl font-bold text-white mb-4">
                  {topic.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {topic.description}
                </p>
                <div>
                  <p className="text-xs text-gold-600 tracking-widest uppercase font-semibold mb-2">
                    Suitable for
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topic.events.map(event => (
                      <span
                        key={event}
                        className="text-xs text-slate-400 border border-navy-600 px-3 py-1"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4 text-center">
            What Others Are Saying
          </p>
          <h2 className="font-serif text-4xl font-bold text-white text-center mb-16">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="border-t border-gold-600/30 pt-8">
                <p className="text-slate-400 leading-relaxed mb-6 italic">
                  &ldquo;Placeholder testimonial text. Dr. Yomes delivered an
                  exceptional talk that engaged our entire congregation. His
                  ability to make complex ideas accessible is remarkable.&rdquo;
                </p>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Placeholder Name
                  </p>
                  <p className="text-slate-500 text-sm">
                    Senior Pastor, Placeholder Church
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-800 py-16 lg:py-24 border-t border-navy-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            Ready to Book?
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Fill out the contact form with details about your event, preferred
            dates, and topic interests. We&apos;ll be in touch within 2–3
            business days.
          </p>
          <a
            href="mailto:speaking@williamckyomes.com"
            className="inline-flex items-center justify-center px-10 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
          >
            Submit a Speaking Inquiry
          </a>
        </div>
      </section>
    </>
  )
}
