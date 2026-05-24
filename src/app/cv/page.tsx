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
          <p
            className="text-[11px] tracking-[0.2em] uppercase font-medium text-gray-500 mb-4"
            style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}
          >
            DMin · MA · Pastor · Apologist · Author
          </p>
          <div
            className="flex flex-wrap gap-x-5 gap-y-1 text-[13.5px] text-gray-600 mb-6"
            style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}
          >
            <span>me@williamckyomes.com</span>
            <span className="text-gray-300">|</span>
            <span>williamckyomes.com</span>
            <span className="text-gray-300">|</span>
            <span>Newport / Wilmington, DE</span>
          </div>
          <CvDownloadButton />
        </div>

        {/* Research Interests */}
        <section className="mb-9">
          <SectionHeading>Research Interests</SectionHeading>
          <p className="text-[15px] leading-relaxed text-gray-700">
            Christian apologetics · Resurrection studies · Theological education in digital contexts · Biblical theology · Christian ethics · Ministry formation
          </p>
        </section>

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
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Bachelor of Arts</p>
                <p className="text-[14px] text-gray-600">Luther Rice College &amp; Seminary, Lithonia, GA</p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2020</span>
            </div>
          </div>
        </section>

        {/* Academic & Professional Appointments */}
        <section className="mb-9">
          <SectionHeading>Academic &amp; Professional Appointments</SectionHeading>
          <div className="space-y-6">
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Founder &amp; Dean</p>
                <p className="text-[14px] text-gray-700 font-medium">Adelphos Academy — Digital Theological Education</p>
                <p className="text-[13.5px] text-gray-600 mt-1 leading-relaxed">
                  Founded and directs an online school offering courses in theology and apologetics to the global church. Certificate-level instruction across three tracks: Bible Teaching, Elder/Pastor Formation, and Apologetics.
                </p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>2024–Present</span>
            </div>
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Lead Pastor</p>
                <p className="text-[14px] text-gray-700 font-medium">Catalyst Community Church — Newport / Wilmington, DE</p>
                <p className="text-[13.5px] text-gray-600 mt-1 leading-relaxed">
                  Verse-by-verse expository preaching, theological formation, and congregational leadership. 20+ years in pastoral ministry.
                </p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>Present</span>
            </div>
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Founder &amp; Lead Apologist</p>
                <p className="text-[14px] text-gray-700 font-medium">Faith Makes Sense — Nonprofit Apologetics Ministry</p>
                <p className="text-[13.5px] text-gray-600 mt-1 leading-relaxed">
                  Produces and distributes free and low-cost apologetics resources for churches and individuals, with concentrated focus on East Africa pastor networks.
                </p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>Present</span>
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
                <p className="text-[15px] font-semibold text-gray-900 leading-snug">Pastoral &amp; Theological Instruction</p>
                <p className="text-[14px] text-gray-700 font-medium">Catalyst Community Church — Newport / Wilmington, DE</p>
                <p className="text-[13.5px] text-gray-600 mt-1 leading-relaxed">
                  Weekly expository teaching, adult theological education, and pastoral apprenticeship program (PACT).
                </p>
              </div>
              <span className="text-[13px] text-gray-500 whitespace-nowrap mt-0.5" style={{ fontFamily: 'var(--font-jost, system-ui, sans-serif)' }}>Present</span>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="mb-9">
          <SectionHeading>Publications</SectionHeading>
          <div className="space-y-4">
            <p className="text-[14.5px] leading-relaxed text-gray-800">
              Yomes, William C.K., and Doug Taylor. <em>He Is Risen: Resurrection Evidence Before the Gospels.</em> Self-published, 2023. ISBN 9798985006735.
            </p>
            <p className="text-[14.5px] leading-relaxed text-gray-800">
              Yomes, William C.K. <em>The Wrong Jesus: When the Worship Is Real But the Jesus Is Wrong.</em> In progress.
            </p>
          </div>
        </section>

        {/* Digital Scholarship */}
        <section className="mb-9">
          <SectionHeading>Digital Scholarship &amp; Educational Technology</SectionHeading>
          <p className="text-[14.5px] leading-relaxed text-gray-700">
            Designed and deployed a Moodle 5.0 LMS environment (adelphosonline.com) for global theological education. Developed web-deployed curriculum assets for distribution in low-bandwidth East Africa contexts via WhatsApp and GitHub Pages. DMin research focused on asynchronous digital learning as a vehicle for apologetics formation in local church contexts.
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
