'use client';

import { useEffect, useRef } from 'react';

export default function TWJPressKit() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLDivElement>('.part-card');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = '1';
              (entry.target as HTMLElement).style.transform = 'translateY(0)';
            }, i * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Mono:wght@300;400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

        .twj-press {
          --ink: #0e0c0a;
          --paper: #f5f0e8;
          --warm-white: #faf7f2;
          --rust: #8b3a2a;
          --gold: #c4963a;
          --mid: #6b6258;
          --rule: #d4cdc4;
          --serif: 'Cormorant Garamond', Georgia, serif;
          --body-serif: 'Libre Baskerville', Georgia, serif;
          --mono: 'DM Mono', monospace;
          background: var(--paper);
          color: var(--ink);
          font-family: var(--body-serif);
          font-size: 16px;
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
          position: relative;
        }

        .twj-press * { box-sizing: border-box; }

        /* Grain */
        .twj-press::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 999;
          opacity: 0.5;
        }

        /* Masthead */
        .twj-masthead {
          border-bottom: 1px solid var(--ink);
          padding: 18px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          background: var(--paper);
          z-index: 100;
        }
        .twj-masthead-brand {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--mid);
          text-decoration: none;
        }
        .twj-masthead-label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--rust);
          border: 1px solid var(--rust);
          padding: 4px 10px;
        }

        /* Hero */
        .twj-hero {
          min-height: 92vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--ink);
          animation: twjFadeIn 1.2s ease forwards 0.2s;
          opacity: 0;
        }
        @keyframes twjFadeIn { to { opacity: 1; } }

        .twj-hero-left {
          padding: 80px 48px;
          border-right: 1px solid var(--ink);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .twj-eyebrow {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--mid);
          margin-bottom: 40px;
        }
        .twj-title {
          font-family: var(--serif);
          font-size: clamp(64px, 8vw, 108px);
          font-weight: 300;
          line-height: 0.92;
          letter-spacing: -0.02em;
          margin-bottom: 32px;
        }
        .twj-title em {
          font-style: italic;
          color: var(--rust);
        }
        .twj-subtitle {
          font-family: var(--serif);
          font-size: 22px;
          font-weight: 300;
          font-style: italic;
          color: var(--mid);
          line-height: 1.5;
          max-width: 420px;
          border-left: 2px solid var(--rust);
          padding-left: 20px;
          margin-bottom: 48px;
        }
        .twj-author {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .twj-hero-right {
          padding: 80px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: var(--ink);
          color: var(--paper);
          position: relative;
          overflow: hidden;
        }
        .twj-hero-right::before {
          content: '"';
          position: absolute;
          top: -60px;
          right: -20px;
          font-family: var(--serif);
          font-size: 400px;
          color: rgba(255,255,255,0.03);
          line-height: 1;
          pointer-events: none;
        }
        .twj-hero-question {
          font-family: var(--serif);
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 300;
          font-style: italic;
          line-height: 1.3;
          color: var(--paper);
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }
        .twj-hero-question strong {
          font-style: normal;
          font-weight: 600;
          color: var(--gold);
          display: block;
          margin-top: 8px;
        }
        .twj-hero-premise {
          font-family: var(--body-serif);
          font-size: 15px;
          line-height: 1.8;
          color: rgba(245,240,232,0.7);
          max-width: 440px;
          position: relative;
          z-index: 1;
        }

        /* Sections */
        .twj-section { padding: 80px 48px; }
        .twj-section-label {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--mid);
          margin-bottom: 48px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .twj-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--rule);
          max-width: 80px;
        }

        /* Overview */
        .twj-overview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--rule);
        }
        .twj-overview-body {
          padding-right: 64px;
          border-right: 1px solid var(--rule);
        }
        .twj-overview h2 {
          font-family: var(--serif);
          font-size: 42px;
          font-weight: 300;
          line-height: 1.15;
          margin-bottom: 28px;
          letter-spacing: -0.01em;
        }
        .twj-overview p {
          font-size: 15px;
          color: #3a3530;
          margin-bottom: 20px;
          max-width: 520px;
        }
        .twj-overview-meta {
          padding-left: 64px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .twj-meta-block dt {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--mid);
          margin-bottom: 6px;
        }
        .twj-meta-block dd {
          font-family: var(--body-serif);
          font-size: 15px;
        }

        /* Structure */
        .twj-structure {
          border-bottom: 1px solid var(--rule);
          background: var(--warm-white);
        }
        .twj-parts-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--rule);
        }
        .part-card {
          padding: 40px 32px;
          border-right: 1px solid var(--rule);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .part-card:last-child { border-right: none; }
        .part-number {
          font-family: var(--serif);
          font-size: 64px;
          font-weight: 300;
          color: var(--rule);
          line-height: 1;
          margin-bottom: 16px;
        }
        .part-title {
          font-family: var(--serif);
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .part-desc {
          font-family: var(--body-serif);
          font-size: 13px;
          line-height: 1.7;
          color: var(--mid);
        }

        /* Argument */
        .twj-argument {
          border-bottom: 1px solid var(--rule);
          display: grid;
          grid-template-columns: 380px 1fr;
          padding: 0;
        }
        .twj-argument-label {
          padding: 80px 48px;
          border-right: 1px solid var(--rule);
        }
        .twj-argument-label h2 {
          font-family: var(--serif);
          font-size: 38px;
          font-weight: 300;
          line-height: 1.2;
          margin-top: 16px;
        }
        .twj-argument-content { padding: 80px 64px; }
        .twj-pullquote {
          font-family: var(--serif);
          font-size: clamp(26px, 3vw, 36px);
          font-weight: 300;
          font-style: italic;
          line-height: 1.35;
          border-top: 3px solid var(--rust);
          padding-top: 32px;
          margin-bottom: 40px;
        }
        .twj-argument-content p {
          font-size: 15px;
          line-height: 1.85;
          color: #3a3530;
          margin-bottom: 20px;
          max-width: 540px;
        }

        /* Author */
        .twj-author-section {
          border-bottom: 1px solid var(--rule);
          background: var(--ink);
          color: var(--paper);
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 0;
        }
        .twj-author-text {
          padding: 80px 64px 80px 48px;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .twj-author-section .twj-section-label { color: rgba(245,240,232,0.4); }
        .twj-author-section .twj-section-label::after { background: rgba(255,255,255,0.1); }
        .twj-author-name {
          font-family: var(--serif);
          font-size: 52px;
          font-weight: 300;
          line-height: 1;
          margin-bottom: 32px;
          letter-spacing: -0.01em;
        }
        .twj-author-bio p {
          font-size: 15px;
          line-height: 1.85;
          color: rgba(245,240,232,0.75);
          margin-bottom: 18px;
        }
        .twj-author-contact {
          padding: 80px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 40px;
        }
        .twj-contact-block dt {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.4);
          margin-bottom: 6px;
        }
        .twj-contact-block dd { font-size: 15px; }
        .twj-contact-block a {
          color: var(--gold);
          text-decoration: none;
          border-bottom: 1px solid rgba(196,150,58,0.3);
        }

        /* Assets */
        .twj-assets { border-bottom: 1px solid var(--rule); }
        .twj-assets-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--rule);
          border: 1px solid var(--rule);
          margin-top: 8px;
        }
        .twj-asset-card {
          background: var(--warm-white);
          padding: 40px 36px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: background 0.2s;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }
        .twj-asset-card:hover { background: var(--paper); }
        .twj-asset-icon {
          width: 44px;
          height: 44px;
          border: 1px solid var(--rule);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--mono);
          font-size: 11px;
          color: var(--mid);
          margin-bottom: 8px;
        }
        .twj-asset-title {
          font-family: var(--body-serif);
          font-weight: 700;
          font-size: 15px;
        }
        .twj-asset-desc {
          font-size: 13px;
          color: var(--mid);
          line-height: 1.6;
        }
        .twj-asset-link {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--rust);
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid var(--rule);
        }

        /* Footer */
        .twj-footer {
          padding: 40px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--ink);
        }
        .twj-footer p {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--mid);
        }
        .twj-footer a { color: var(--rust); }

        /* Responsive */
        @media (max-width: 900px) {
          .twj-hero { grid-template-columns: 1fr; min-height: auto; }
          .twj-hero-left { padding: 48px 24px; border-right: none; border-bottom: 1px solid var(--rule); }
          .twj-hero-right { padding: 48px 24px; }
          .twj-masthead { padding: 16px 24px; }
          .twj-section { padding: 60px 24px; }
          .twj-overview { grid-template-columns: 1fr; }
          .twj-overview-body { padding-right: 0; border-right: none; border-bottom: 1px solid var(--rule); padding-bottom: 48px; margin-bottom: 48px; }
          .twj-overview-meta { padding-left: 0; }
          .twj-parts-grid { grid-template-columns: 1fr 1fr; }
          .part-card { border-bottom: 1px solid var(--rule); }
          .twj-argument { grid-template-columns: 1fr; }
          .twj-argument-label { padding: 60px 24px 0; border-right: none; }
          .twj-argument-content { padding: 40px 24px 60px; }
          .twj-author-section { grid-template-columns: 1fr; }
          .twj-author-text { padding: 60px 24px; border-right: none; }
          .twj-author-contact { padding: 40px 24px 60px; }
          .twj-assets-grid { grid-template-columns: 1fr; }
          .twj-footer { flex-direction: column; gap: 12px; align-items: flex-start; }
        }
      `}</style>

      <div className="twj-press">
        {/* MASTHEAD */}
        <header className="twj-masthead">
          <a className="twj-masthead-brand" href="https://williamckyomes.com">williamckyomes.com</a>
          <span className="twj-masthead-label">Press Kit</span>
        </header>

        {/* HERO */}
        <section className="twj-hero">
          <div className="twj-hero-left">
            <div>
              <p className="twj-eyebrow">Forthcoming — William CK Yomes</p>
              <h1 className="twj-title">The<br /><em>Wrong</em><br />Jesus</h1>
              <p className="twj-subtitle">Am I following Jesus — or am I following what I want Him to be?</p>
            </div>
            <p className="twj-author">William CK Yomes &nbsp;·&nbsp; Theology &amp; Christian Living</p>
          </div>
          <div className="twj-hero-right">
            <p className="twj-hero-question">
              The crowd who welcomed Jesus into Jerusalem wasn&apos;t faking their worship.
              <strong>They were genuinely, passionately, sincerely wrong about who He was.</strong>
            </p>
            <p className="twj-hero-premise">
              By Good Friday, some of those same voices were calling for His crucifixion. <em>The Wrong Jesus</em> traces how that same dynamic plays out in every generation — including ours.
            </p>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="twj-section twj-overview">
          <div className="twj-overview-body">
            <p className="twj-section-label">Book Overview</p>
            <h2>A diagnosis every sincere Christian needs</h2>
            <p>We don&apos;t construct a wrong Jesus out of rebellion or dishonesty. We construct him out of need — from wounds that needed healing, from comfort we didn&apos;t want disturbed, from political convictions we needed God to endorse, from voices we trusted who handed us their picture of Jesus without us ever examining it.</p>
            <p>Using Palm Sunday as its central lens, <em>The Wrong Jesus</em> examines figures from Passion Week — Pilate, the crowd, the disciples, Barabbas — as mirrors for the ways we drift from the real Jesus. It moves from diagnosis to practice, closing with honest tools for identifying the wrong Jesus you&apos;ve been carrying and finding your way back to the One who is actually there.</p>
            <p>The tone is pastoral and direct. The target reader is a sincere Christian who has never been asked whether the Jesus they&apos;re following is actually Jesus.</p>
          </div>
          <dl className="twj-overview-meta">
            {[
              ['Author', 'William CK Yomes'],
              ['Category', 'Christian Living / Theology'],
              ['Structure', 'Four parts, 12 chapters + Introduction & Conclusion'],
              ['Audience', 'Sincere, practicing Christians open to serious self-examination'],
              ['Tone', 'Pastoral, direct, unsettling in the best way'],
            ].map(([label, value]) => (
              <div className="twj-meta-block" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* STRUCTURE */}
        <section className="twj-section twj-structure">
          <p className="twj-section-label">Structure</p>
          <div className="twj-parts-grid" ref={cardsRef}>
            {[
              ['I', 'The Problem', 'What Palm Sunday reveals about the human tendency to overlay what we need onto who Jesus actually is.'],
              ['II', 'How to Recognize It', 'Figures from Passion Week as mirrors — Pilate, the crowd, the disciples — each a distinct pattern of misrecognition.'],
              ['III', 'What It Costs Us', 'The spiritual and relational consequences of following a Jesus of our own construction rather than the one revealed in Scripture.'],
              ['IV', 'Finding the Real Jesus', 'Practical, honest tools for examining the Jesus you\'ve been following and reorienting toward the one who is actually there.'],
            ].map(([num, title, desc]) => (
              <div className="part-card" key={num}>
                <div className="part-number">{num}</div>
                <div className="part-title">{title}</div>
                <p className="part-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ARGUMENT */}
        <section className="twj-argument">
          <div className="twj-argument-label twj-section">
            <p className="twj-section-label">Central Argument</p>
            <h2>The crowd wasn&apos;t cynical. That&apos;s the point.</h2>
          </div>
          <div className="twj-argument-content">
            <blockquote className="twj-pullquote">
              &ldquo;We don&apos;t construct a wrong Jesus out of rebellion. We construct him out of need.&rdquo;
            </blockquote>
            <p>The crowd at Palm Sunday weren&apos;t hypocrites. They were true believers who had layered centuries of political memory and national longing onto the Son of God standing in front of them. Their worship was real. Their theology was catastrophically wrong.</p>
            <p><em>The Wrong Jesus</em> argues that this is not a first-century problem — it is the perennial human problem. Every generation reshapes Jesus in the image of its own anxieties, wounds, and hopes. The book doesn&apos;t target skeptics or apostates. It speaks directly to sincere, committed Christians who may never have examined whether the Jesus they are following bears a genuine resemblance to the Jesus of the Gospels.</p>
            <p>This is not deconstruction. It is reconstruction — a pastoral invitation to put down the Jesus we built and pick up the one who is actually there.</p>
          </div>
        </section>

        {/* AUTHOR */}
        <section className="twj-author-section">
          <div className="twj-author-text">
            <p className="twj-section-label">About the Author</p>
            <h2 className="twj-author-name">William<br />CK Yomes</h2>
            <div className="twj-author-bio">
              <p>William CK Yomes is a pastor, theologian, and writer whose work sits at the intersection of Christian faith, honest inquiry, and the pastoral realities of ordinary life. He writes for people who take their faith seriously enough to question it.</p>
              <p>His writing explores the gap between the Jesus people say they follow and the Jesus the Gospels actually present — with pastoral warmth and theological rigor.</p>
              <p><em>The Wrong Jesus</em> is his first book.</p>
            </div>
          </div>
          <div className="twj-author-contact">
            <p className="twj-section-label">Media Contact</p>
            <dl>
              {[
                ['Website', 'williamckyomes.com', 'https://williamckyomes.com'],
                ['Press Inquiries', 'press@williamckyomes.com', 'mailto:press@williamckyomes.com'],
                ['Interview / Speaking', 'hello@williamckyomes.com', 'mailto:hello@williamckyomes.com'],
                ['ARC Copies', 'williamckyomes.com/arc', 'https://williamckyomes.com/arc'],
              ].map(([label, text, href]) => (
                <div className="twj-contact-block" key={label}>
                  <dt>{label}</dt>
                  <dd><a href={href}>{text}</a></dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ASSETS */}
        <section className="twj-section twj-assets">
          <p className="twj-section-label">Press Assets</p>
          <div className="twj-assets-grid">
            {[
              ['TXT', 'Short Description', 'One-paragraph book summary suitable for event listings, podcast show notes, and catalog copy.', 'Copy text →', '#'],
              ['TXT', 'Long Description', 'Full editorial description for press releases, feature stories, and extended author profiles.', 'Copy text →', '#'],
              ['TXT', 'Author Bio', 'Short and long versions of the author biography, ready for use in press materials.', 'Copy text →', '#'],
              ['IMG', 'Cover Art', 'High-resolution book cover in multiple formats (RGB/CMYK, with and without text).', 'Download →', '#'],
              ['IMG', 'Author Photo', 'High-resolution author photographs, suitable for print and digital use.', 'Download →', '#'],
              ['PDF', 'Full Press Kit', 'Complete press kit PDF including all copy, images, Q&A, and publication details.', 'Download PDF →', '#'],
            ].map(([icon, title, desc, cta, href]) => (
              <a className="twj-asset-card" href={href} key={title}>
                <div className="twj-asset-icon">{icon}</div>
                <div className="twj-asset-title">{title}</div>
                <p className="twj-asset-desc">{desc}</p>
                <div className="twj-asset-link">{cta}</div>
              </a>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="twj-footer">
          <p>© William CK Yomes &nbsp;·&nbsp; All rights reserved</p>
          <p>Permissions &amp; licensing: <a href="mailto:press@williamckyomes.com">press@williamckyomes.com</a></p>
        </footer>
      </div>
    </>
  );
}
