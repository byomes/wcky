import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Books',
  description:
    'Books by Dr. William C.K. Yomes on Christian apologetics, theology, and preaching.',
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

export default function BooksPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Published Works
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
            Books
          </h1>
        </div>
      </section>

      {/* Theology & Apologetics */}
      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-4">
            <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              Theology &amp; Apologetics
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Books written for the church, because theology belongs to everyone,
              not just the academy.
            </p>
          </div>

          <div className="space-y-0">

            {/* Book 1: The Wrong Jesus (Coming Soon) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 py-16">
              <div className="lg:col-span-1">
                <Image
                  src="/images/wrong-jesus-cover-iso.png"
                  alt="The Wrong Jesus book cover"
                  width={344}
                  height={516}
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-3">
                <span className="inline-block text-xs text-gold-500 border border-gold-600/50 px-3 py-1 tracking-wide font-semibold uppercase mb-4">
                  Coming Soon
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                  The Wrong Jesus
                </h2>
                <p className="text-slate-500 text-xl font-serif italic mb-5">
                  When the Worship Is Real But the Jesus Is Wrong
                </p>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  Many people are devoted. But devoted to a Jesus they constructed rather than the Jesus of Scripture. This book diagnoses the problem and points back to the real thing.
                </p>
                <a
                  href="https://faithmakessense.kit.com/31040c8e97"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
                >
                  Let Me Know When It&apos;s Available
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-navy-800" />

            {/* Book 2: He Is Risen (Published) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 py-16">
              <div className="lg:col-span-1">
                <Image
                  src="/images/HeIsRisen-Cover.jpg"
                  alt="He Is Risen book cover"
                  width={344}
                  height={516}
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-3">
                <span className="inline-block text-xs text-white bg-gold-600 px-3 py-1 tracking-wide font-semibold uppercase mb-4">
                  Published
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  He Is Risen
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  A careful examination of the resurrection accounts across the four Gospels. Written for believers who want solid answers and skeptics who want an honest look at the evidence.
                </p>
                <a
                  href="https://www.amazon.com/He-Risen-Resurrection-Evidence-Gospels/dp/B0BTRRC8CF/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
                >
                  Order on Amazon
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Dreamstone Chronicles */}
      <section className="bg-navy-950 py-16 lg:py-24 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-4">
            <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              The Dreamstone Chronicles
            </p>
            <p className="text-slate-300 text-xl leading-relaxed mb-5">
              The Dreamstone Chronicles is a fantasy fiction series written to
              remind children of the power of family.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Written for children, enjoyed by the whole family.
            </p>
          </div>

          <div className="space-y-0">

            {/* Book 1: The Blackstone Curse */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 py-16">
              <div className="lg:col-span-1">
                <Image
                  src="/images/DS1-cover.png"
                  alt="The Blackstone Curse book cover"
                  width={344}
                  height={516}
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-3">
                <span className="inline-block text-xs text-white bg-gold-600 px-3 py-1 tracking-wide font-semibold uppercase mb-4">
                  Published · Book 1
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  The Blackstone Curse
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  When teenage Ella finds herself sharing dreams with her three younger sisters, she soon discovers they are more than just dreams. Every night while the Stone sisters are asleep they are transported to a magical world and given tremendous powers. But their dreams quickly turn to nightmares as an ancient prophecy places them in the path of a rising evil. Students by day and heroes by night, the sisters must learn to master their powers, defend their family, and become the guardians they were born to be or risk being trapped in their own dreams forever.
                </p>
                <a
                  href="https://www.amazon.com/Blackstone-Curse-Dream-Stone-Chronicles/dp/B09GZBXB3B/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
                >
                  Order on Amazon
                </a>
              </div>
            </div>

            <div className="border-t border-navy-800" />

            {/* Book 2: The Wolf's War */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 py-16">
              <div className="lg:col-span-1">
                <Image
                  src="/images/DS2-cover.png"
                  alt="The Wolf's War book cover"
                  width={344}
                  height={516}
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-3">
                <span className="inline-block text-xs text-white bg-gold-600 px-3 py-1 tracking-wide font-semibold uppercase mb-4">
                  Published · Book 2
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  The Wolf&apos;s War
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  The Stone sisters continue their exciting adventures as Ella, Charlie, Nicki, and Reagan return each night in their dreams to the magical world of Terea. There, they enhance their powers and discover more about what it means to be Guardians. Werewolves from the western mountains threaten an invasion of the peaceful lands they&apos;re sworn to protect. The heroic Stone sisters are called upon once again to fight against this new evil and to aid the mysterious and powerful Aquarian Queen in defending her kingdom.
                </p>
                <a
                  href="https://www.amazon.com/gp/product/B09LZSF37J"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
                >
                  Order on Amazon
                </a>
              </div>
            </div>

            <div className="border-t border-navy-800" />

            {/* Book 3: The Cave of Kings */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 py-16">
              <div className="lg:col-span-1">
                <Image
                  src="/images/DS3-cover.png"
                  alt="The Cave of Kings book cover"
                  width={344}
                  height={516}
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-3">
                <span className="inline-block text-xs text-white bg-gold-600 px-3 py-1 tracking-wide font-semibold uppercase mb-4">
                  Published · Book 3
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  The Cave of Kings
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  Ella and her sisters continue their adventure as they learn to balance the challenges of being a student in real life and a Guardian in the magical land of Terea. After the events of The Wolf&apos;s War, the Stone family must seek help from the high council and root out a hidden plot, all while being hunted by a ghostly elemental seeking to destroy them. Meeting new allies and enemies, the Guardians are on a collision course with destiny in the Cave of Kings.
                </p>
                <a
                  href="https://www.amazon.com/gp/product/B09NR7CBFK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-gold-400 transition-colors duration-200"
                >
                  Order on Amazon
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
