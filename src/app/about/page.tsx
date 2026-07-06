import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'William CK Yomes: pastor, apologist, and author. Senior Pastor of Catalyst Community Church and founding apologist of Faith Makes Sense.',
  openGraph: {
    images: [
      {
        url: 'https://williamckyomes.com/images/TWJ_Launch_2.PNG',
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://williamckyomes.com/images/TWJ_Launch_2.PNG',
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            About
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
            Pastor, Apologist,
            <br />
            <span className="text-gold-400">and Author</span>
          </h1>
        </div>
      </section>

      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="relative aspect-[3/4] overflow-hidden mb-8">
                <Image
                  src="/images/Bill-RC.png"
                  alt="Dr. William C.K. Yomes"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Main bio */}
            <div className="lg:col-span-2">
              <div className="space-y-5 text-slate-400 leading-relaxed mb-12">
                <p>
                  William CK Yomes is a pastor, apologist, and author based in
                  Wilmington, Delaware. He serves as Senior Pastor of Catalyst
                  Community Church and is the founding apologist of Faith Makes
                  Sense, a nonprofit providing free apologetics and theological
                  education for pastors, leaders, and believers around the world.
                </p>
                <p>
                  He holds a Master&apos;s Degree in Apologetics from Luther
                  Rice College and Seminary and a Doctor of Ministry in Theology
                  and Apologetics from Liberty University. Through Faith Makes
                  Sense he oversees Adelphos Academy, an online theological
                  education platform, and provides training to a pastor training
                  network in Uganda.
                </p>
                <p>
                  He writes theology for the church, including{' '}
                  <em className="text-slate-300">He Is Risen</em> and the
                  forthcoming{' '}
                  <em className="text-slate-300">The Wrong Jesus</em>, and
                  children&apos;s fantasy fiction for his family through the
                  Dreamstone Chronicles series.
                </p>
                <p>
                  He and his wife Melanie share an ever-growing family. He is
                  also a daydreamer, guitar player, and lifelong ice cream
                  superfan.
                </p>
              </div>

              <div className="border-t border-navy-800 pt-10 mb-10">
                <p className="text-slate-400 leading-relaxed">
                  For ministry resources and theological education, visit{' '}
                  <a
                    href="https://faithmakessense.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-400 hover:text-gold-300 transition-colors duration-200"
                  >
                    FaithMakesSense.com
                  </a>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/theology"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
                >
                  View Books
                </Link>
                <a href="mailto:me@williamckyomes.com" className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
