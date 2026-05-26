import type { Metadata } from 'next'
import { EB_Garamond, Jost } from 'next/font/google'
import CvDownloadButton from './CvDownloadButton'
import './cv.css'

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Curriculum Vitae',
  description: 'Academic CV — Dr. William C.K. Yomes, DMin, MA. Pastor, Apologist, Author.',
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <h2
        className="whitespace-nowrap text-[10.5px] tracking-[0.18em] uppercase font-semibold text-gray-500"
        style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}
      >
        {children}
      </h2>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  )
}

export default function CVPage() {
  return (
    <div className={`${garamond.variable} ${jost.variable} min-h-screen bg-white`}>
      <div className="cv-body cv-page max-w-[680px] mx-auto px-8 pt-28 pb-24">

        {/* CV Header */}
        <div className="mb-10 pb-8 border-b-2 border-gray-900">
          <h1 className="text-[2.6rem] font-bold text-gray-900 leading-none tracking-tight mb-2">
            William C.K. Yomes
          </h1>
          <div
            className="flex flex-wrap gap-x-5 gap-y-1 text-[13.5px] text-gray-600 mb-6"
            style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}
          >
            <span>williamckyomes.com</span>
            <span className="text-gray-300">|</span>
            <span>me@williamckyomes.com</span>
          </div>
          <CvDownloadButton />
        </div>

        {/* Education */}
        <section className="mb-9">
          <SectionHeading>Education</SectionHeading>
          <div className="space-y-5">
            <div className="flex justify-between items-start gap-6">
              <div>
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Doctor of Ministry — Theology and Apologetics</p>
                <p className="text-[14px] text-gray-600">Liberty University, Lynchburg, VA</p>
                <p className="text-[13.5px] italic text-gray-500 mt-0.5">Thesis: &ldquo;Asynchronous Theologetics for a Digital Church&rdquo;</p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2026</span>
            </div>
            <div className="flex justify-between items-start gap-6">
              <div>
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Master of Arts in Apologetics</p>
                <p className="text-[14px] text-gray-600">Luther Rice College &amp; Seminary, Lithonia, GA</p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2023</span>
            </div>
            <div className="flex justify-between items-start gap-6">
              <div>
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Bachelor of Arts in Religion, Minor in Ministry</p>
                <p className="text-[14px] text-gray-600">Luther Rice College &amp; Seminary, Lithonia, GA</p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2020</span>
            </div>
          </div>
        </section>

        {/* Academic & Professional */}
        <section className="mb-9">
          <SectionHeading>Academic &amp; Professional</SectionHeading>
          <div className="space-y-6">
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Founder, Adelphos Academy</p>
                <p className="text-[13.5px] text-gray-600 mt-1 leading-relaxed">
                  Adelphos Academy is a digital discipleship platform offering structured theological and apologetics content to individual learners and local churches globally. Developed to extend theological education beyond the walls of formal institutions, its curriculum is actively used in partnership with pastor networks in Uganda to support theological formation and ministry development.
                </p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2024–Present</span>
            </div>
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Founder &amp; Lead Apologist</p>
                <p className="text-[14px] text-gray-700 font-medium">Faith Makes Sense — Nonprofit Apologetics Ministry</p>
                <p className="text-[13.5px] text-gray-600 mt-1 leading-relaxed">
                  Faith Makes Sense is a nonprofit apologetics ministry producing and distributing free resources for individuals and local churches. Its work spans conference teaching, written and digital content, and direct partnership with pastor networks in East Africa — all focused on equipping believers to engage their faith thoughtfully and defend it credibly.
                </p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2021–Present</span>
            </div>
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Lead Pastor</p>
                <p className="text-[14px] text-gray-700 font-medium">Catalyst Community Church — Wilmington, DE</p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2022–Present</span>
            </div>
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Senior Pastor</p>
                <p className="text-[14px] text-gray-700 font-medium">Reedswood Christian Church — Gloucester, VA</p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2017–2022</span>
            </div>
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Senior Pastor</p>
                <p className="text-[14px] text-gray-700 font-medium">Christ Community Church — Cape Coral, FL</p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2011–2017</span>
            </div>
          </div>
        </section>

        {/* Teaching Experience */}
        <section className="mb-9">
          <SectionHeading>Teaching Experience</SectionHeading>
          <div className="space-y-6">
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">International Pastor Training — Uganda &amp; Tanzania</p>
                <p className="text-[14px] text-gray-700 font-medium">East Africa Pastor Networks</p>
                <p className="text-[13.5px] text-gray-600 mt-1 leading-relaxed">
                  Two-week intensive teaching tour (Uganda wk. 1; Tanzania wk. 2). Ongoing instruction of Uganda network via video conferencing and web-deployed curriculum.
                </p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2024–Present</span>
            </div>
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Conference Instructor</p>
                <p className="text-[14px] text-gray-700 font-medium">Defending the Faith Conference — Philadelphia, PA</p>
                <p className="text-[13.5px] text-gray-600 mt-1 leading-relaxed">
                  Three sessions: Introduction to Worldviews · Apologetics in Ministry · Christ in Culture
                </p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2024</span>
            </div>
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Defending the Faith Conference — Philadelphia, PA</p>
                <p className="text-[13.5px] text-gray-600 mt-1 leading-relaxed">
                  Three sessions: Introduction to Worldviews · Apologetics in Ministry · Christ in Culture
                </p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2024</span>
            </div>
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Apologetics Youth Conference — Venice, FL</p>
                <p className="text-[13.5px] text-gray-600 mt-1 leading-relaxed">
                  Two-day youth apologetics event; sessions in development
                </p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2026</span>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="mb-9">
          <SectionHeading>Publications</SectionHeading>
          <div className="space-y-4">
            <p className="text-[14.5px] leading-relaxed text-gray-800">
              Yomes, William C.K. <em>He Is Risen: Resurrection Evidence Before the Gospels.</em> Doug Taylor, ed. Self-published, 2023.
            </p>
            <p className="text-[14.5px] leading-relaxed text-gray-800">
              Yomes, William C.K. <em>The Wrong Jesus: When the Worship Is Real But the Jesus Is Wrong.</em> Projected 2026.
            </p>
            <p className="text-[14.5px] leading-relaxed text-gray-800">
              Yomes, William C.K. <em>Invisible Idols: The Hidden Gods Shaping Your Story.</em> Projected 2026.
            </p>
          </div>
        </section>

        {/* Research Interests */}
        <section className="mb-9">
          <SectionHeading>Research Interests</SectionHeading>
          <p className="text-[15px] leading-relaxed text-gray-700">
            Christian apologetics · Resurrection studies · Theological education in digital contexts · Biblical theology · Christian ethics · Ministry formation
          </p>
          <p className="text-[14.5px] leading-relaxed text-gray-700 mt-3">
            Utilizing learning management systems for global theological education, building the infrastructure, course architecture, and digital curriculum from the ground up.
          </p>
        </section>

        {/* Professional Memberships */}
        <section className="mb-9">
          <SectionHeading>Professional Memberships &amp; Affiliations</SectionHeading>
          <div className="space-y-3">
            <div className="flex justify-between items-start gap-6">
              <div>
                <p className="text-[15px] font-semibold text-gray-900">Faith Makes Sense</p>
                <p className="text-[13.5px] text-gray-600">Founder, Nonprofit Apologetics Organization</p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>Present</span>
            </div>
            <div className="flex justify-between items-start gap-6">
              <div>
                <p className="text-[15px] font-semibold text-gray-900">Adelphos Academy</p>
                <p className="text-[13.5px] text-gray-600">Founder, Digital Theological Institution</p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>Present</span>
            </div>
          </div>
        </section>

        {/* References */}
        <section>
          <SectionHeading>References</SectionHeading>
          <p className="text-[14.5px] text-gray-600 italic">Available upon request.</p>
        </section>

      </div>
    </div>
  )
}
