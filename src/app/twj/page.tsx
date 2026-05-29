<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Wrong Jesus — Press Kit</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Mono:wght@300;400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0e0c0a;
    --paper: #f5f0e8;
    --warm-white: #faf7f2;
    --rust: #8b3a2a;
    --rust-light: #b04e3a;
    --gold: #c4963a;
    --mid: #6b6258;
    --rule: #d4cdc4;
    --serif: 'Cormorant Garamond', Georgia, serif;
    --body-serif: 'Libre Baskerville', Georgia, serif;
    --mono: 'DM Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--paper);
    color: var(--ink);
    font-family: var(--body-serif);
    font-size: 16px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  /* ── GRAIN OVERLAY ── */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 999;
    opacity: 0.5;
  }

  /* ── MASTHEAD ── */
  .masthead {
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

  .masthead-brand {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--mid);
    text-decoration: none;
  }

  .masthead-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--rust);
    border: 1px solid var(--rust);
    padding: 4px 10px;
  }

  /* ── HERO ── */
  .hero {
    min-height: 92vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid var(--ink);
    opacity: 0;
    animation: fadeIn 1.2s ease forwards 0.2s;
  }

  @keyframes fadeIn {
    to { opacity: 1; }
  }

  .hero-left {
    padding: 80px 48px 80px 48px;
    border-right: 1px solid var(--ink);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .hero-eyebrow {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--mid);
    margin-bottom: 40px;
  }

  .hero-title {
    font-family: var(--serif);
    font-size: clamp(64px, 8vw, 108px);
    font-weight: 300;
    line-height: 0.92;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin-bottom: 32px;
  }

  .hero-title em {
    font-style: italic;
    color: var(--rust);
  }

  .hero-subtitle {
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

  .hero-author {
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink);
  }

  .hero-right {
    padding: 80px 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: var(--ink);
    color: var(--paper);
    position: relative;
    overflow: hidden;
  }

  .hero-right::before {
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

  .hero-question {
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

  .hero-question strong {
    font-style: normal;
    font-weight: 600;
    color: var(--gold);
    display: block;
    margin-top: 8px;
  }

  .hero-premise {
    font-family: var(--body-serif);
    font-size: 15px;
    line-height: 1.8;
    color: rgba(245, 240, 232, 0.7);
    max-width: 440px;
    position: relative;
    z-index: 1;
  }

  /* ── SECTION COMMON ── */
  section {
    padding: 80px 48px;
  }

  .section-label {
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

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--rule);
    max-width: 80px;
  }

  /* ── OVERVIEW ── */
  .overview {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border-bottom: 1px solid var(--rule);
  }

  .overview-body {
    padding-right: 64px;
    border-right: 1px solid var(--rule);
  }

  .overview h2 {
    font-family: var(--serif);
    font-size: 42px;
    font-weight: 300;
    line-height: 1.15;
    margin-bottom: 28px;
    letter-spacing: -0.01em;
  }

  .overview p {
    font-size: 15px;
    color: #3a3530;
    margin-bottom: 20px;
    max-width: 520px;
  }

  .overview-meta {
    padding-left: 64px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .meta-block dt {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--mid);
    margin-bottom: 6px;
  }

  .meta-block dd {
    font-family: var(--body-serif);
    font-size: 15px;
    color: var(--ink);
  }

  /* ── STRUCTURE ── */
  .structure {
    border-bottom: 1px solid var(--rule);
    background: var(--warm-white);
  }

  .parts-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
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
  .part-card.visible { opacity: 1; transform: translateY(0); }

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
    color: var(--ink);
    margin-bottom: 12px;
    line-height: 1.2;
  }

  .part-desc {
    font-family: var(--body-serif);
    font-size: 13px;
    line-height: 1.7;
    color: var(--mid);
  }

  /* ── ARGUMENT ── */
  .argument {
    border-bottom: 1px solid var(--rule);
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 0;
    padding: 0;
  }

  .argument-label-col {
    padding: 80px 48px;
    border-right: 1px solid var(--rule);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .argument-label-col h2 {
    font-family: var(--serif);
    font-size: 38px;
    font-weight: 300;
    line-height: 1.2;
    margin-top: 16px;
  }

  .argument-content {
    padding: 80px 64px;
  }

  .pullquote {
    font-family: var(--serif);
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 300;
    font-style: italic;
    line-height: 1.35;
    color: var(--ink);
    border-top: 3px solid var(--rust);
    padding-top: 32px;
    margin-bottom: 40px;
  }

  .argument-content p {
    font-size: 15px;
    line-height: 1.85;
    color: #3a3530;
    margin-bottom: 20px;
    max-width: 540px;
  }

  /* ── AUTHOR ── */
  .author-section {
    border-bottom: 1px solid var(--rule);
    background: var(--ink);
    color: var(--paper);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    padding: 0;
  }

  .author-text {
    padding: 80px 64px 80px 48px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }

  .author-section .section-label {
    color: rgba(245,240,232,0.4);
  }

  .author-section .section-label::after {
    background: rgba(255,255,255,0.1);
  }

  .author-name {
    font-family: var(--serif);
    font-size: 52px;
    font-weight: 300;
    line-height: 1;
    margin-bottom: 32px;
    letter-spacing: -0.01em;
  }

  .author-bio p {
    font-size: 15px;
    line-height: 1.85;
    color: rgba(245,240,232,0.75);
    margin-bottom: 18px;
  }

  .author-contact {
    padding: 80px 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
  }

  .contact-block dt {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.4);
    margin-bottom: 6px;
  }

  .contact-block dd {
    font-size: 15px;
    color: var(--paper);
  }

  .contact-block dd a {
    color: var(--gold);
    text-decoration: none;
    border-bottom: 1px solid rgba(196,150,58,0.3);
  }

  /* ── ASSETS ── */
  .assets {
    border-bottom: 1px solid var(--rule);
  }

  .assets-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
    margin-top: 8px;
  }

  .asset-card {
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

  .asset-card:hover { background: var(--paper); }

  .asset-icon {
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

  .asset-title {
    font-family: var(--body-serif);
    font-weight: 700;
    font-size: 15px;
    color: var(--ink);
  }

  .asset-desc {
    font-size: 13px;
    color: var(--mid);
    line-height: 1.6;
  }

  .asset-link {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--rust);
    margin-top: auto;
    padding-top: 16px;
    border-top: 1px solid var(--rule);
  }

  /* ── FOOTER ── */
  footer {
    padding: 40px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--ink);
  }

  footer p {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--mid);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; min-height: auto; }
    .hero-left { padding: 48px 24px; border-right: none; border-bottom: 1px solid var(--rule); }
    .hero-right { padding: 48px 24px; }
    .masthead { padding: 16px 24px; }
    section { padding: 60px 24px; }
    .overview { grid-template-columns: 1fr; }
    .overview-body { padding-right: 0; border-right: none; border-bottom: 1px solid var(--rule); padding-bottom: 48px; margin-bottom: 48px; }
    .overview-meta { padding-left: 0; }
    .parts-grid { grid-template-columns: 1fr 1fr; }
    .part-card { border-bottom: 1px solid var(--rule); }
    .argument { grid-template-columns: 1fr; }
    .argument-label-col { padding: 60px 24px 0; border-right: none; }
    .argument-content { padding: 40px 24px 60px; }
    .author-section { grid-template-columns: 1fr; }
    .author-text { padding: 60px 24px; border-right: none; }
    .author-contact { padding: 40px 24px 60px; }
    .assets-grid { grid-template-columns: 1fr; }
    footer { flex-direction: column; gap: 12px; align-items: flex-start; }
  }
</style>
</head>
<body>

<!-- MASTHEAD -->
<header class="masthead">
  <a class="masthead-brand" href="https://williamckyomes.com">williamckyomes.com</a>
  <span class="masthead-label">Press Kit</span>
</header>

<!-- HERO -->
<section class="hero">
  <div class="hero-left">
    <div>
      <p class="hero-eyebrow">Forthcoming — William CK Yomes</p>
      <h1 class="hero-title">The<br><em>Wrong</em><br>Jesus</h1>
      <p class="hero-subtitle">Am I following Jesus — or am I following what I want Him to be?</p>
    </div>
    <p class="hero-author">William CK Yomes &nbsp;·&nbsp; Theology &amp; Christian Living</p>
  </div>
  <div class="hero-right">
    <p class="hero-question">
      The crowd who welcomed Jesus into Jerusalem wasn't faking their worship.
      <strong>They were genuinely, passionately, sincerely wrong about who He was.</strong>
    </p>
    <p class="hero-premise">
      By Good Friday, some of those same voices were calling for His crucifixion. The Wrong Jesus traces how that same dynamic plays out in every generation — including ours.
    </p>
  </div>
</section>

<!-- OVERVIEW -->
<section class="overview">
  <div class="overview-body">
    <p class="section-label">Book Overview</p>
    <h2>A diagnosis every sincere Christian needs</h2>
    <p>We don't construct a wrong Jesus out of rebellion or dishonesty. We construct him out of need — from wounds that needed healing, from comfort we didn't want disturbed, from political convictions we needed God to endorse, from voices we trusted who handed us their picture of Jesus without us ever examining it.</p>
    <p>Using Palm Sunday as its central lens, <em>The Wrong Jesus</em> examines figures from Passion Week — Pilate, the crowd, the disciples, Barabbas — as mirrors for the ways we drift from the real Jesus. It moves from diagnosis to practice, closing with honest tools for identifying the wrong Jesus you've been carrying and finding your way back to the One who is actually there.</p>
    <p>The tone is pastoral and direct. The target reader is a sincere Christian who has never been asked whether the Jesus they're following is actually Jesus.</p>
  </div>
  <dl class="overview-meta">
    <div class="meta-block">
      <dt>Author</dt>
      <dd>William CK Yomes</dd>
    </div>
    <div class="meta-block">
      <dt>Category</dt>
      <dd>Christian Living / Theology</dd>
    </div>
    <div class="meta-block">
      <dt>Structure</dt>
      <dd>Four parts, 12 chapters + Introduction &amp; Conclusion</dd>
    </div>
    <div class="meta-block">
      <dt>Audience</dt>
      <dd>Sincere, practicing Christians open to serious self-examination</dd>
    </div>
    <div class="meta-block">
      <dt>Tone</dt>
      <dd>Pastoral, direct, unsettling in the best way</dd>
    </div>
  </dl>
</section>

<!-- STRUCTURE -->
<section class="structure">
  <p class="section-label">Structure</p>
  <div class="parts-grid">
    <div class="part-card">
      <div class="part-number">I</div>
      <div class="part-title">The Problem</div>
      <p class="part-desc">What Palm Sunday reveals about the human tendency to overlay what we need onto who Jesus actually is.</p>
    </div>
    <div class="part-card">
      <div class="part-number">II</div>
      <div class="part-title">How to Recognize It</div>
      <p class="part-desc">Figures from Passion Week as mirrors — Pilate, the crowd, the disciples — each a distinct pattern of misrecognition.</p>
    </div>
    <div class="part-card">
      <div class="part-number">III</div>
      <div class="part-title">What It Costs Us</div>
      <p class="part-desc">The spiritual and relational consequences of following a Jesus of our own construction rather than the one revealed in Scripture.</p>
    </div>
    <div class="part-card">
      <div class="part-number">IV</div>
      <div class="part-title">Finding the Real Jesus</div>
      <p class="part-desc">Practical, honest tools for examining the Jesus you've been following and reorienting toward the one who is actually there.</p>
    </div>
  </div>
</section>

<!-- CENTRAL ARGUMENT -->
<section class="argument">
  <div class="argument-label-col">
    <p class="section-label">Central Argument</p>
    <h2>The crowd wasn't cynical. That's the point.</h2>
  </div>
  <div class="argument-content">
    <blockquote class="pullquote">
      "We don't construct a wrong Jesus out of rebellion. We construct him out of need."
    </blockquote>
    <p>The crowd at Palm Sunday weren't hypocrites. They were true believers who had layered centuries of political memory and national longing onto the Son of God standing in front of them. Their worship was real. Their theology was catastrophically wrong.</p>
    <p><em>The Wrong Jesus</em> argues that this is not a first-century problem — it is the perennial human problem. Every generation reshapes Jesus in the image of its own anxieties, wounds, and hopes. The book doesn't target skeptics or apostates. It speaks directly to sincere, committed Christians who may never have examined whether the Jesus they are following bears a genuine resemblance to the Jesus of the Gospels.</p>
    <p>This is not deconstruction. It is reconstruction — a pastoral invitation to put down the Jesus we built and pick up the one who is actually there.</p>
  </div>
</section>

<!-- AUTHOR -->
<section class="author-section">
  <div class="author-text">
    <p class="section-label">About the Author</p>
    <h2 class="author-name">William<br>CK Yomes</h2>
    <div class="author-bio">
      <p>William CK Yomes is a pastor, theologian, and writer whose work sits at the intersection of Christian faith, honest inquiry, and the pastoral realities of ordinary life. He writes for people who take their faith seriously enough to question it.</p>
      <p>His writing explores the gap between the Jesus people say they follow and the Jesus the Gospels actually present — with pastoral warmth and theological rigor.</p>
      <p><em>The Wrong Jesus</em> is his first book.</p>
    </div>
  </div>
  <div class="author-contact">
    <p class="section-label">Media Contact</p>
    <dl>
      <div class="contact-block">
        <dt>Website</dt>
        <dd><a href="https://williamckyomes.com">williamckyomes.com</a></dd>
      </div>
      <div class="contact-block">
        <dt>Press Inquiries</dt>
        <dd><a href="mailto:press@williamckyomes.com">press@williamckyomes.com</a></dd>
      </div>
      <div class="contact-block">
        <dt>Interview / Speaking Requests</dt>
        <dd><a href="mailto:hello@williamckyomes.com">hello@williamckyomes.com</a></dd>
      </div>
      <div class="contact-block">
        <dt>ARC Copies</dt>
        <dd><a href="https://williamckyomes.com/arc">williamckyomes.com/arc</a></dd>
      </div>
    </dl>
  </div>
</section>

<!-- ASSETS -->
<section class="assets">
  <p class="section-label">Press Assets</p>
  <div class="assets-grid">
    <a class="asset-card" href="#">
      <div class="asset-icon">TXT</div>
      <div class="asset-title">Short Description</div>
      <p class="asset-desc">One-paragraph book summary suitable for event listings, podcast show notes, and catalog copy.</p>
      <div class="asset-link">Copy text →</div>
    </a>
    <a class="asset-card" href="#">
      <div class="asset-icon">TXT</div>
      <div class="asset-title">Long Description</div>
      <p class="asset-desc">Full editorial description for press releases, feature stories, and extended author profiles.</p>
      <div class="asset-link">Copy text →</div>
    </a>
    <a class="asset-card" href="#">
      <div class="asset-icon">TXT</div>
      <div class="asset-title">Author Bio</div>
      <p class="asset-desc">Short and long versions of the author biography, ready for use in press materials.</p>
      <div class="asset-link">Copy text →</div>
    </a>
    <a class="asset-card" href="#">
      <div class="asset-icon">IMG</div>
      <div class="asset-title">Cover Art</div>
      <p class="asset-desc">High-resolution book cover in multiple formats (RGB/CMYK, with and without text).</p>
      <div class="asset-link">Download →</div>
    </a>
    <a class="asset-card" href="#">
      <div class="asset-icon">IMG</div>
      <div class="asset-title">Author Photo</div>
      <p class="asset-desc">High-resolution author photographs, suitable for print and digital use.</p>
      <div class="asset-link">Download →</div>
    </a>
    <a class="asset-card" href="#">
      <div class="asset-icon">PDF</div>
      <div class="asset-title">Full Press Kit</div>
      <p class="asset-desc">Complete press kit PDF including all copy, images, Q&amp;A, and publication details.</p>
      <div class="asset-link">Download PDF →</div>
    </a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <p>© William CK Yomes &nbsp;·&nbsp; All rights reserved</p>
  <p>For permissions or licensing inquiries: <a href="mailto:press@williamckyomes.com" style="color: var(--rust);">press@williamckyomes.com</a></p>
</footer>

<script>
  // Staggered reveal for part cards
  const cards = document.querySelectorAll('.part-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => observer.observe(card));
</script>

</body>
</html>
