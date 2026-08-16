'use client'

import { useEffect } from 'react'

interface Listing {
  id: string
  name: string
  loc: string
  miles: number
  time: string
  price: string
  capacity: string
  beds: string
  baths: string
  amenities: string
  kitchen: string
  correction?: string | null
  fit: 'good' | 'warn' | 'bad'
  fitLabel: string
  notes: string
  phone: string | null
  phoneDisplay: string | null
  website: string | null
  email: string | null
  source: string
  sourceUrl: string
  free: boolean
}

const mainListings: Listing[] = [
  {
    id: "quietwaters-christian-leader-vacation-program",
    name: "QuietWaters Christian Leader Vacation Program",
    loc: "Nationwide — you pick the resort (Wyndham/Endless Vacation Rentals network)", miles: 0, time: "Varies by resort you choose",
    price: "$299 for a full week (one-time certificate, non-refundable, valid 1 year)",
    capacity: "Varies by resort — filter for 2BR/2BA or larger when browsing", beds: "Varies by resort chosen", baths: "Varies by resort chosen",
    amenities: "Hundreds of Wyndham/Endless Vacation Rentals resorts worldwide to choose from, including options in the Poconos, Virginia Beach, Williamsburg, and the Delaware/Maryland shore — all within your radius",
    kitchen: "Yes, at many resorts — one documented family testimonial: a resort that slept 6, had a full kitchen, and a pool with varied depths",
    fit: "good", fitLabel: "Genuinely different tier — a real resort stay, not a spare ministry cabin",
    correction: null,
    notes: "This is the one option here that functions like an actual vacation rather than a discounted retreat. Browse available resorts BEFORE buying the certificate (non-refundable) — filter specifically for a unit with a full kitchen and room for 5, and check for any required upcharge on top of the $299. Worth trying for something in the Poconos, Williamsburg, or the Delaware/Maryland beaches to stay inside your drive radius.",
    phone: null, phoneDisplay: null, website: "https://www.qwaters.org/programs/pastor-vacation-program/", email: null,
    source: "qwaters.org/programs/pastor-vacation-program", sourceUrl: "https://www.qwaters.org/programs/pastor-vacation-program/",
    free: false
  },
  {
    id: "williamsburg-christian-retreat-center",
    name: "Williamsburg Christian Retreat Center",
    loc: "Toano, VA (15 mi NW of Colonial Williamsburg)", miles: 170, time: "3 hr",
    price: "Oakwood Lodge: $50/night (sleeps 4) · Cabin Village: 50% off individual rate (sleeps up to 12) · Campground: 50% off · pastors get 2 discounted nights/year",
    capacity: "Cabins sleep up to 12 (10 twin + 2 double beds); Oakwood Lodge rooms sleep 4", beds: "Varies by option", baths: "Cabins: 2 bathrooms/2 showers each",
    amenities: "300 wooded acres, outdoor pool with diving board, hayrides, ropes course, disc golf, 15 min from Colonial Williamsburg, Jamestown, Yorktown, and Busch Gardens",
    kitchen: "No confirmed full kitchen — meals are served in the dining room at 50% off for pastors instead of self-catering; Oakwood kitchenette rooms only have a small fridge/microwave/coffee maker",
    fit: "warn", fitLabel: "Best overall destination on this list — but doesn&apos;t meet the full-kitchen requirement",
    correction: null,
    notes: "This is genuinely the most vacation-like option here — real reviews rave about it as a family destination, and it puts you 15 minutes from Busch Gardens and Colonial Williamsburg. The catch is meals: it's built around a discounted dining hall, not self-catering. Worth a direct call to ask whether any option (like a longer stay in a kitchenette room) could work if the full-kitchen requirement has any flexibility for this particular destination.",
    phone: "7575662256", phoneDisplay: "757-566-2256", website: "https://www.wcrc.info/retreats/pastor-personal-retreats/", email: null,
    source: "wcrc.info/retreats/pastor-personal-retreats", sourceUrl: "https://www.wcrc.info/retreats/pastor-personal-retreats/",
    free: false
  },
  {
    id: "faith-mountain-ministries-2br-cottage",
    name: "Faith Mountain Ministries — 2BR Cottage",
    loc: "Rosedale, WV", miles: 260, time: "4.5 hr",
    price: "$69/night",
    capacity: "Sleeps approx. 4–6 (2BR)", beds: "2", baths: "Not published",
    amenities: "A/C, full kitchen, fire pit, 2.5-acre pond, hiking/biking trails, whitewater rafting 90 min away",
    kitchen: "Yes — full kitchen confirmed",
    fit: "good", fitLabel: "Good fit — right-sized for a household of 5, confirmed kitchen",
    correction: null,
    notes: "Held over from the first pass — still one of the most reliably documented options: real price, real capacity, confirmed kitchen.",
    phone: "3043644019", phoneDisplay: "304-364-4019", website: "https://www.mountainoffaith.org/", email: null,
    source: "my-pastor.com/faith-mountain-ministries-west-virginia.html", sourceUrl: "https://www.my-pastor.com/faith-mountain-ministries-west-virginia.html",
    free: false
  },
  {
    id: "energize-ministries-lodge",
    name: "Energize Ministries Lodge",
    loc: "near Martinsville, VA", miles: 280, time: "4.75 hr",
    price: "Free — up to 3 days/2 nights, once per calendar year",
    capacity: "Maximum 10 guests including children", beds: "4 bedrooms", baths: "Not published",
    amenities: "700-acre property, 3,500 sq ft log cabin, 12 miles of trails, pond, amphitheater, RC race cars, disc golf",
    kitchen: "Not explicitly confirmed, but the ministry's own materials describe family vacations as a frequent use of the lodge, which suggests a working kitchen — worth confirming directly",
    fit: "good", fitLabel: "Good fit on paper — free, 4BR, room for 10 — but requires a vetting/membership process first",
    correction: "Requires filling out a membership request and vetting before you can even see the booking page — budget time for this step, it's not an instant-book situation.",
    notes: "This is a legitimate, well-funded pastoral care nonprofit (has public 990 filings), not a fly-by-night listing. The membership/vetting requirement is real friction, but the property itself — 700 acres, 4BR log cabin, free — is one of the better free options found in this round.",
    phone: null, phoneDisplay: null, website: "https://energizeministries.com/what-we-do/our-retreats/", email: null,
    source: "energizeministries.com/what-we-do/our-retreats", sourceUrl: "https://energizeministries.com/what-we-do/our-retreats/",
    free: true
  },
  {
    id: "disciples-retreat",
    name: "Disciples' Retreat",
    loc: "Wellston, OH", miles: 430, time: "7 hr",
    price: "$15 per person, per night",
    capacity: "Sleeps 8", beds: "2", baths: "2 (with showers)",
    amenities: "Log cabin, full kitchen, big living area with couches, 2 fishing ponds, volleyball net, fireplace with wood provided, open year-round, 1.5 hr from Dayton",
    kitchen: "Yes — full kitchen confirmed",
    fit: "good", fitLabel: "Strong fit — sleeps 8, room to spare, confirmed kitchen",
    correction: null,
    notes: "Held over from the first pass — one of the best-documented listings across every directory searched so far.",
    phone: "7403843328", phoneDisplay: "740-384-3328", website: null, email: null,
    source: "pastorgetaways.com/disciples-retreat/", sourceUrl: "https://pastorgetaways.com/disciples-retreat/",
    free: false
  },
  {
    id: "canna-country-inn",
    name: "Canna Country Inn",
    loc: "Etters, PA", miles: 95, time: "1.75 hr",
    price: "25–75% off posted B&amp;B rates for full-time ministry staff (call for current posted rate)",
    capacity: "Whole-inn rental up to 26 guests; 1–2 rooms should cover a family of 5", beds: "7 rooms", baths: "7 private baths (1 with 2-person whirlpool)",
    amenities: "2 full kitchens, 4 fireplaces, 2 living rooms, large meeting room",
    kitchen: "Yes — 2 full kitchens on site (shared inn amenity; confirm access when booking individual rooms)",
    fit: "good", fitLabel: "Good fit — closest option on the list, has real kitchens",
    correction: null,
    notes: "Held over from the first pass. Scholarships available if even the discounted rate is out of reach.",
    phone: null, phoneDisplay: null, website: "http://cannainnbandb.com/", email: null,
    source: "my-pastor.com/canna-country-inn-pennsylvania.html", sourceUrl: "https://www.my-pastor.com/canna-country-inn-pennsylvania.html",
    free: false
  },
  {
    id: "draw-nigh-ministries",
    name: "Draw Nigh Ministries",
    loc: "Pinehurst, NC", miles: 430, time: "7 hr",
    price: "Free (no cost)",
    capacity: "Pastor + wife + up to 4 children", beds: "Not published", baths: "Not published",
    amenities: "Private cottage, east of Charlotte / SSW of Raleigh",
    kitchen: "Not confirmed — likely (private cottage), call to verify",
    fit: "good", fitLabel: "Good fit — a household of 5 fits the published cap",
    correction: null,
    notes: "Held over from the first pass — comfortably fits your actual travel group.",
    phone: null, phoneDisplay: null, website: null, email: null,
    source: "my-pastor.com/draw-nigh-ministries-north-carolina.html", sourceUrl: "https://www.my-pastor.com/draw-nigh-ministries-north-carolina.html",
    free: true
  },
  {
    id: "promise-land-farm",
    name: "Promise Land Farm (Genesis Seminars)",
    loc: "Rutherfordton, NC", miles: 460, time: "7.5 hr",
    price: "Free",
    capacity: "Single cabin — capacity not published, ask directly", beds: "Not published", baths: "Not published",
    amenities: "8-acre property, first cabin built 2004, run personally by a pastor-founder couple who also produce a daily creation-science radio segment",
    kitchen: "Not published — small family-run ministry, call to ask",
    fit: "warn", fitLabel: "Promising but thin on published detail — needs a direct call",
    correction: null,
    notes: "Small, personally-run operation (one family, one cabin) rather than an institution — likely warm and flexible, but you'll need to call for basics like bedroom count and kitchen before planning around it.",
    phone: "8282888424", phoneDisplay: "828-288-8424", website: "https://genesisseminars.org/", email: null,
    source: "genesisseminars.org/about", sourceUrl: "https://genesisseminars.org/about/",
    free: true
  }
]

const borderListings: Listing[] = [
  {
    id: "christian-pastor-retreat",
    name: "Christian Pastor Retreat",
    loc: "Jamestown, TN (Cumberland Plateau)", miles: 560, time: "~9 hr",
    price: "$150/week suggested donation (no one turned away)",
    capacity: "3 cabins, kids welcome, toy room, sports equipment", beds: "Not published", baths: "Not published",
    amenities: "9-acre property, porch swings, gazebo, near Pickett State Park & Big South Fork",
    kitchen: "Yes — each unit equipped with a kitchen (confirmed)",
    fit: "good", fitLabel: "Great fit for a family of 5 — if it were closer",
    correction: null,
    notes: "Still the best-documented kid-friendly, kitchen-equipped option overall — just past the 8-hour cutoff.",
    phone: "9318796784", phoneDisplay: "931-879-6784", website: "http://www.christianpastorretreat.org/", email: null,
    source: "my-pastor.com/christian-pastor-retreat-tennessee.html", sourceUrl: "https://www.my-pastor.com/christian-pastor-retreat-tennessee.html",
    free: false
  },
  {
    id: "potter-s-ranch-wilderness-retreat",
    name: "Potter's Ranch Wilderness Retreat",
    loc: "Union, KY (near Cincinnati)", miles: 530, time: "8.5 hr",
    price: "Contact for cost/availability",
    capacity: "Cedar Cabins: 3BR, sleeps 6+", beds: "3", baths: "Private baths",
    amenities: "440-acre wilderness setting along Gunpowder Creek, fishing, hiking, close to the Creation Museum, chef-prepared dining also available",
    kitchen: "Yes — Cedar Cabins each have a kitchen, living room, dining room (confirmed)",
    fit: "good", fitLabel: "Good fit — confirmed kitchen, right-sized",
    correction: null,
    notes: "Also offers chef-prepared dining as an option if you want to mix self-catering with a few prepared meals.",
    phone: "8595865475", phoneDisplay: "859-586-5475", website: "https://www.pottersranch.org/", email: null,
    source: "pastorgetaways.com/potters-ranch-wilderness-retreat/", sourceUrl: "https://pastorgetaways.com/potters-ranch-wilderness-retreat/",
    free: false
  },
  {
    id: "fairhaven-ministries",
    name: "Fairhaven Ministries",
    loc: "Roan Mountain, TN (Blue Ridge Mtns)", miles: 510, time: "8.25 hr",
    price: "$95/night for a ministry couple",
    capacity: "1BR + loft with 2 twin beds + queen sleeper sofa", beds: "1 queen + loft (2 twin) + sleeper sofa", baths: "1",
    amenities: "15 chalets/cottages on 100 acres, full kitchen, hiking/boating/historical sites nearby",
    kitchen: "Yes — full kitchen confirmed",
    fit: "good", fitLabel: "Good fit — loft plus sleeper sofa sleeps 5 comfortably",
    correction: null,
    notes: "15 separate chalets on the property means good odds of availability even in season.",
    phone: "4237724269", phoneDisplay: "423-772-4269", website: "https://www.fairhavenministries.net/", email: null,
    source: "pastorgetaways.com/fairhaven-ministries/", sourceUrl: "https://pastorgetaways.com/fairhaven-ministries/",
    free: false
  }
]

const fitLabels: Record<Listing['fit'], string> = { good: "GOOD FIT", warn: "PARTIAL FIT", bad: "WEAK FIT" }

const allListings: Listing[] = [...mainListings, ...borderListings]

const STORAGE_KEY = 'retreats-removed-v1'

function cardHTML(item: Listing): string {
  const links: string[] = []
  if (item.website) links.push(`<a href="${item.website}" target="_blank" rel="noopener">🔗 Website</a>`)
  if (item.phone) links.push(`<a href="tel:${item.phone}">☎ ${item.phoneDisplay}</a>`)
  if (item.email) links.push(`<a href="${item.email}">✉ Email</a>`)
  const contactHTML = links.length
    ? `<div class="contact-row">${links.join("")}</div>`
    : `<div class="contact-row"><span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#8a8571;">No direct contact published — see source link below</span></div>`

  const kitchenConfirmed = item.kitchen.startsWith('Yes')
  const featuredClass = item.id === 'quietwaters-christian-leader-vacation-program' ? ' featured' : ''

  return `
  <article class="card${featuredClass}" data-id="${item.id}" data-name="${item.name.toLowerCase()}" data-loc="${item.loc.toLowerCase()}" data-amen="${item.amenities.toLowerCase()}" data-fit="${item.fit}" data-free="${item.free}" data-kitchen="${kitchenConfirmed}">
    <div class="marker">
      <div class="mi">${item.miles === 0 ? '—' : item.miles}</div>
      <div class="mi-label">${item.miles === 0 ? 'varies' : 'miles'}</div>
      <div class="time">${item.time}</div>
    </div>
    <div class="card-body">
      <div class="card-header">
        <h3>${item.name}</h3>
        <button class="remove-btn" data-remove-id="${item.id}" aria-label="Remove ${item.name}">✕ Remove</button>
      </div>
      <div class="location">${item.loc}</div>
      ${item.correction ? `<div style="background:var(--bad-bg);color:var(--bad);border-radius:4px;padding:8px 12px;font-size:13px;font-weight:600;margin-bottom:12px;">⚠ ${item.correction}</div>` : ''}
      <span class="fit-badge fit-${item.fit}">${fitLabels[item.fit]} — ${item.fitLabel}</span>
      <div class="facts">
        <div>
          <div class="fact-label">Full Kitchen</div>
          <div class="fact-value">${item.kitchen}</div>
        </div>
        <div>
          <div class="fact-label">Price</div>
          <div class="fact-value">${item.price}</div>
        </div>
        <div>
          <div class="fact-label">Capacity</div>
          <div class="fact-value">${item.capacity}</div>
        </div>
        <div>
          <div class="fact-label">Beds</div>
          <div class="fact-value">${item.beds}</div>
        </div>
        <div>
          <div class="fact-label">Baths</div>
          <div class="fact-value">${item.baths}</div>
        </div>
      </div>
      <div class="amenities"><strong>Amenities:</strong> ${item.amenities}</div>
      <div class="notes">${item.notes}</div>
      ${contactHTML}
      <div class="source-line">Source: <a href="${item.sourceUrl}" target="_blank" rel="noopener">${item.source}</a></div>
    </div>
  </article>`
}

const styles = `
  .retreats-page{
    --paper:#f4f0e4;
    --paper-2:#eae3d2;
    --ink:#1f2a1f;
    --ink-soft:#4a5648;
    --pine:#2b3a2f;
    --sienna:#a0522d;
    --sienna-deep:#7c3f22;
    --sage:#5b7355;
    --gold:#b98a2e;
    --line:#cfc6ab;
    --card:#fbf8f0;
    --good:#3f6b3f;
    --good-bg:#e3ecdd;
    --warn:#9c5a1f;
    --warn-bg:#f2e2c8;
    --bad:#8a4a3a;
    --bad-bg:#f0e0d8;
  }
  .retreats-page, .retreats-page *{box-sizing:border-box;}
  .retreats-page{
    min-height:100vh;
    background:var(--paper);
    background-image:
      radial-gradient(circle at 1px 1px, rgba(43,58,47,0.06) 1px, transparent 0);
    background-size: 22px 22px;
    color:var(--ink);
    font-family: var(--font-retreats-inter), sans-serif;
    line-height:1.5;
  }
  .retreats-page a{color:var(--sienna-deep);}
  .retreats-page .wrap{max-width:1040px;margin:0 auto;padding:0 24px 80px;}

  .retreats-page header{
    padding:56px 24px 40px;
    border-bottom:3px solid var(--pine);
    background:
      linear-gradient(180deg, rgba(43,58,47,0.04), transparent);
  }
  .retreats-page .header-inner{max-width:1040px;margin:0 auto;}
  .retreats-page .eyebrow{
    font-family: var(--font-retreats-mono), monospace;
    font-size:12.5px;
    letter-spacing:0.14em;
    text-transform:uppercase;
    color:var(--sage);
    font-weight:600;
    margin:0 0 14px;
  }
  .retreats-page h1{
    font-family: var(--font-retreats-fraunces), serif;
    font-optical-sizing:auto;
    font-weight:600;
    font-size:clamp(34px,5vw,54px);
    line-height:1.04;
    margin:0 0 14px;
    color:var(--pine);
    letter-spacing:-0.01em;
  }
  .retreats-page .lede{
    font-size:17px;
    color:var(--ink-soft);
    max-width:640px;
    margin:0 0 26px;
  }
  .retreats-page .origin{
    display:inline-flex;
    align-items:center;
    gap:10px;
    font-family: var(--font-retreats-mono), monospace;
    font-size:13px;
    background:var(--pine);
    color:var(--paper);
    padding:9px 16px;
    border-radius:3px;
  }
  .retreats-page .origin .dot{width:7px;height:7px;border-radius:50%;background:var(--gold);}

  .retreats-page .controls{
    position:sticky;
    top:0;
    z-index:20;
    background:var(--paper);
    border-bottom:1px solid var(--line);
    padding:16px 24px;
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    align-items:center;
  }
  .retreats-page .controls-inner{
    max-width:1040px;margin:0 auto;width:100%;
    display:flex;flex-wrap:wrap;gap:10px;align-items:center;
  }
  .retreats-page #search{
    flex:1 1 220px;
    font-family: var(--font-retreats-inter), sans-serif;
    font-size:14px;
    padding:10px 14px;
    border:1.5px solid var(--line);
    border-radius:4px;
    background:var(--card);
    color:var(--ink);
  }
  .retreats-page #search:focus{outline:2px solid var(--sage);outline-offset:1px;border-color:var(--sage);}
  .retreats-page .chip{
    font-family: var(--font-retreats-mono), monospace;
    font-size:12.5px;
    letter-spacing:0.02em;
    padding:8px 13px;
    border:1.5px solid var(--line);
    border-radius:20px;
    background:var(--card);
    color:var(--ink-soft);
    cursor:pointer;
    user-select:none;
    transition:all .15s ease;
  }
  .retreats-page .chip:hover{border-color:var(--sage);}
  .retreats-page .chip.active{
    background:var(--pine);
    border-color:var(--pine);
    color:var(--paper);
  }
  .retreats-page .chip:focus-visible{outline:2px solid var(--sienna);outline-offset:2px;}
  .retreats-page .count{
    margin-left:auto;
    font-family: var(--font-retreats-mono), monospace;
    font-size:12.5px;
    color:var(--ink-soft);
    white-space:nowrap;
  }

  .retreats-page .section-label{
    display:flex;align-items:baseline;gap:14px;
    margin:44px 0 20px;
  }
  .retreats-page .section-label h2{
    font-family: var(--font-retreats-fraunces), serif;
    font-weight:600;
    font-size:24px;
    margin:0;
    color:var(--pine);
  }
  .retreats-page .section-label .rule{flex:1;height:1px;background:var(--line);}
  .retreats-page .section-note{
    font-size:13.5px;
    color:var(--ink-soft);
    max-width:680px;
    margin:-10px 0 20px;
  }

  .retreats-page .grid{display:flex;flex-direction:column;gap:16px;}

  .retreats-page .card{
    background:var(--card);
    border:1.5px solid var(--line);
    border-radius:6px;
    padding:22px 24px;
    display:grid;
    grid-template-columns:88px 1fr;
    gap:22px;
    transition:border-color .15s ease, transform .15s ease;
  }
  .retreats-page .card.dim{opacity:0.6;}
  .retreats-page .card:hover{border-color:var(--sage);}
  .retreats-page .card.featured{border-color:var(--gold);border-width:2px;}

  .retreats-page .marker{
    text-align:center;
    padding-top:2px;
  }
  .retreats-page .marker .mi{
    font-family: var(--font-retreats-fraunces), serif;
    font-weight:600;
    font-size:30px;
    color:var(--sienna-deep);
    line-height:1;
  }
  .retreats-page .marker .mi-label{
    font-family: var(--font-retreats-mono), monospace;
    font-size:10px;
    letter-spacing:0.08em;
    text-transform:uppercase;
    color:var(--ink-soft);
    margin-top:2px;
  }
  .retreats-page .marker .time{
    font-family: var(--font-retreats-mono), monospace;
    font-size:11.5px;
    color:var(--sage);
    margin-top:8px;
    border-top:1px dashed var(--line);
    padding-top:8px;
  }

  .retreats-page .card-body h3{
    font-family: var(--font-retreats-fraunces), serif;
    font-weight:600;
    font-size:20px;
    margin:0 0 3px;
    color:var(--ink);
  }
  .retreats-page .location{
    font-size:13.5px;
    color:var(--ink-soft);
    margin-bottom:12px;
  }

  .retreats-page .fit-badge{
    display:inline-block;
    font-family: var(--font-retreats-mono), monospace;
    font-size:11px;
    letter-spacing:0.03em;
    padding:3px 10px;
    border-radius:20px;
    font-weight:600;
    margin-bottom:12px;
  }
  .retreats-page .fit-good{background:var(--good-bg);color:var(--good);}
  .retreats-page .fit-warn{background:var(--warn-bg);color:var(--warn);}
  .retreats-page .fit-bad{background:var(--bad-bg);color:var(--bad);}

  .retreats-page .facts{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
    gap:10px 20px;
    margin:14px 0 14px;
    padding:14px 0;
    border-top:1px solid var(--line);
    border-bottom:1px solid var(--line);
  }
  .retreats-page .fact-label{
    font-family: var(--font-retreats-mono), monospace;
    font-size:10px;
    letter-spacing:0.07em;
    text-transform:uppercase;
    color:var(--sage);
    margin-bottom:3px;
  }
  .retreats-page .fact-value{font-size:13.5px;color:var(--ink);}

  .retreats-page .amenities{
    font-size:13.5px;
    color:var(--ink-soft);
    margin:10px 0;
  }
  .retreats-page .amenities strong{color:var(--ink);font-weight:600;}

  .retreats-page .notes{
    font-size:13.5px;
    color:var(--ink-soft);
    font-style:italic;
    margin:10px 0 14px;
    border-left:2.5px solid var(--gold);
    padding-left:12px;
  }

  .retreats-page .contact-row{
    display:flex;flex-wrap:wrap;gap:10px;
    margin-top:14px;
  }
  .retreats-page .contact-row a{
    font-family: var(--font-retreats-mono), monospace;
    font-size:12.5px;
    text-decoration:none;
    color:var(--pine);
    background:var(--paper-2);
    padding:7px 13px;
    border-radius:4px;
    border:1px solid var(--line);
    display:inline-flex;
    align-items:center;
    gap:6px;
    transition:all .15s ease;
  }
  .retreats-page .contact-row a:hover{
    background:var(--pine);
    color:var(--paper);
    border-color:var(--pine);
  }
  .retreats-page .source-line{
    margin-top:12px;
    font-family: var(--font-retreats-mono), monospace;
    font-size:11px;
    color:#8a8571;
  }
  .retreats-page .source-line a{color:#8a8571;text-decoration:underline;}

  .retreats-page .card-header{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    gap:12px;
  }
  .retreats-page .remove-btn{
    flex-shrink:0;
    font-family: var(--font-retreats-mono), monospace;
    font-size:11px;
    letter-spacing:0.02em;
    background:none;
    border:1px solid var(--line);
    color:var(--ink-soft);
    padding:5px 10px;
    border-radius:4px;
    cursor:pointer;
    transition:all .15s ease;
    white-space:nowrap;
  }
  .retreats-page .remove-btn:hover{
    background:var(--bad-bg);
    color:var(--bad);
    border-color:var(--bad);
  }
  .retreats-page .remove-btn:focus-visible{outline:2px solid var(--sienna);outline-offset:2px;}

  .retreats-page .removed-note{
    text-align:center;
    padding:24px;
    font-family: var(--font-retreats-mono), monospace;
    font-size:13px;
    color:var(--ink-soft);
  }
  .retreats-page .removed-note button{
    font-family: var(--font-retreats-mono), monospace;
    font-size:12.5px;
    background:var(--pine);
    color:var(--paper);
    border:none;
    padding:8px 16px;
    border-radius:20px;
    cursor:pointer;
    margin-left:8px;
  }

  .retreats-page .undo-toast{
    position:fixed;
    bottom:24px;
    left:50%;
    transform:translateX(-50%) translateY(0);
    background:var(--pine);
    color:var(--paper);
    padding:12px 18px;
    border-radius:6px;
    font-family: var(--font-retreats-mono), monospace;
    font-size:13px;
    display:flex;
    align-items:center;
    gap:16px;
    box-shadow:0 4px 16px rgba(0,0,0,0.2);
    z-index:50;
    opacity:0;
    pointer-events:none;
    transition:opacity .2s ease;
  }
  .retreats-page .undo-toast.show{opacity:1;pointer-events:auto;}
  .retreats-page .undo-toast button{
    font-family: var(--font-retreats-mono), monospace;
    font-size:13px;
    font-weight:600;
    background:var(--gold);
    color:var(--pine);
    border:none;
    padding:6px 14px;
    border-radius:4px;
    cursor:pointer;
  }

  .retreats-page .resource-note{
    margin-top:20px;
    background:var(--paper-2);
    border:1.5px dashed var(--line);
    border-radius:6px;
    padding:18px 22px;
    font-size:13.5px;
    color:var(--ink-soft);
  }
  .retreats-page .resource-note strong{color:var(--ink);}

  .retreats-page footer{
    margin-top:60px;
    padding-top:24px;
    border-top:1px solid var(--line);
    font-family: var(--font-retreats-mono), monospace;
    font-size:12px;
    color:var(--ink-soft);
  }

  .retreats-page .no-results{
    text-align:center;
    padding:50px 20px;
    color:var(--ink-soft);
    font-family: var(--font-retreats-mono), monospace;
    font-size:13.5px;
  }

  @media (max-width:640px){
    .retreats-page .card{grid-template-columns:1fr;}
    .retreats-page .marker{display:flex;align-items:baseline;gap:10px;text-align:left;}
    .retreats-page .marker .time{border-top:none;padding-top:0;margin-top:0;margin-left:auto;}
    .retreats-page header{padding:40px 20px 30px;}
  }

  @media (prefers-reduced-motion: reduce){
    .retreats-page *{transition:none !important;}
  }
`

export default function RetreatsContent() {
  useEffect(() => {
    const mainGrid = document.getElementById('mainGrid')
    const borderGrid = document.getElementById('borderGrid')
    const removedNote = document.getElementById('removedNote')
    const undoToast = document.getElementById('undoToast')
    const undoText = document.getElementById('undoText')
    const undoBtn = document.getElementById('undoBtn') as HTMLButtonElement | null
    const search = document.getElementById('search') as HTMLInputElement | null
    const countEl = document.getElementById('count')
    const chips = document.querySelectorAll<HTMLButtonElement>('.retreats-page .chip')

    if (!mainGrid || !borderGrid || !removedNote || !undoToast || !undoText || !undoBtn || !search || !countEl) return

    function getRemovedIds(): string[] {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      } catch {
        return []
      }
    }
    function setRemovedIds(ids: string[]) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
      } catch {
        // localStorage unavailable (private browsing, etc.) — remove will only last this session
      }
    }

    let removedIds = getRemovedIds()
    let undoTimer: ReturnType<typeof setTimeout> | null = null
    let activeFilter = 'all'

    function applyFilters() {
      const q = search!.value.trim().toLowerCase()
      const allCards = document.querySelectorAll<HTMLElement>('.retreats-page #mainGrid .card, .retreats-page #borderGrid .card')
      let visible = 0
      allCards.forEach(c => {
        if (removedIds.includes(c.dataset.id ?? '')) {
          c.style.display = 'none'
          return
        }
        const matchesText = !q || (c.dataset.name ?? '').includes(q) || (c.dataset.loc ?? '').includes(q) || (c.dataset.amen ?? '').includes(q)
        let matchesFilter = true
        if (activeFilter === 'good') matchesFilter = c.dataset.fit === 'good'
        if (activeFilter === 'warn') matchesFilter = c.dataset.fit === 'warn'
        if (activeFilter === 'free') matchesFilter = c.dataset.free === 'true'
        if (activeFilter === 'kitchen') matchesFilter = c.dataset.kitchen === 'true'
        const show = matchesText && matchesFilter
        c.style.display = show ? '' : 'none'
        if (show) visible++
      })
      countEl!.textContent = visible + ' shown'
    }

    function renderRemovedNote() {
      if (removedIds.length === 0) {
        removedNote!.style.display = 'none'
        return
      }
      removedNote!.style.display = ''
      const names = removedIds
        .map(id => allListings.find(x => x.id === id))
        .filter((x): x is Listing => Boolean(x))
      removedNote!.innerHTML = `${names.length} listing${names.length === 1 ? '' : 's'} hidden on this device — ` +
        names.map(item => `<button data-restore-id="${item.id}">Restore "${item.name}"</button>`).join(' ')
      removedNote!.querySelectorAll<HTMLButtonElement>('[data-restore-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = (e.currentTarget as HTMLButtonElement).dataset.restoreId
          if (id) restoreListing(id)
        })
      })
    }

    function showUndo(name: string, id: string) {
      if (undoTimer) clearTimeout(undoTimer)
      undoText!.textContent = `Removed "${name}"`
      undoBtn!.onclick = () => {
        restoreListing(id)
        undoToast!.classList.remove('show')
      }
      undoToast!.classList.add('show')
      undoTimer = setTimeout(() => { undoToast!.classList.remove('show') }, 6000)
    }

    function attachRemoveHandlers() {
      document.querySelectorAll<HTMLButtonElement>('.retreats-page .remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = (e.currentTarget as HTMLButtonElement).dataset.removeId
          if (id) removeListing(id)
        })
      })
    }

    function removeListing(id: string) {
      if (removedIds.includes(id)) return
      removedIds.push(id)
      setRemovedIds(removedIds)
      const item = allListings.find(x => x.id === id)
      render()
      showUndo(item ? item.name : 'Listing', id)
    }

    function restoreListing(id: string) {
      removedIds = removedIds.filter(x => x !== id)
      setRemovedIds(removedIds)
      render()
    }

    function render() {
      mainGrid!.innerHTML = mainListings.map(cardHTML).join("")
      borderGrid!.innerHTML = borderListings.map(cardHTML).join("")
      attachRemoveHandlers()
      applyFilters()
      renderRemovedNote()
    }

    const handleChipClick = (chip: HTMLButtonElement) => () => {
      chips.forEach(x => x.classList.remove('active'))
      chip.classList.add('active')
      activeFilter = chip.dataset.filter || 'all'
      applyFilters()
    }

    const chipHandlers = new Map<HTMLButtonElement, () => void>()
    chips.forEach(chip => {
      const handler = handleChipClick(chip)
      chipHandlers.set(chip, handler)
      chip.addEventListener('click', handler)
    })

    search.addEventListener('input', applyFilters)

    render()

    return () => {
      if (undoTimer) clearTimeout(undoTimer)
      search.removeEventListener('input', applyFilters)
      chips.forEach(chip => {
        const handler = chipHandlers.get(chip)
        if (handler) chip.removeEventListener('click', handler)
      })
    }
  }, [])

  return (
    <div className="retreats-page">
      <style>{styles}</style>

      <header>
        <div className="header-inner">
          <p className="eyebrow">Family trip planning · Pastor lodging guide · refreshed round 2</p>
          <h1>Where the Yomes Family Could Actually Go</h1>
          <p className="lede">Refreshed with a second round of sources (Assemblies of God, Hope for Pastors&apos; Wives, Shepherd&apos;s Fold, NAE, and several direct ministry sites) after the first pass didn&apos;t land. This round leans toward places with real vacation appeal — pools, attractions, actual resorts — not just a spare cabin.</p>
          <div className="origin"><span className="dot"></span> Measured from Newark, DE · 8-hour drive radius · 2 adults + 3 teens · full kitchen strongly preferred</div>
        </div>
      </header>

      <div className="controls">
        <div className="controls-inner">
          <input id="search" type="text" placeholder="Search by name, state, or amenity…" aria-label="Search listings" />
          <button className="chip active" data-filter="all">All</button>
          <button className="chip" data-filter="kitchen">Confirmed full kitchen</button>
          <button className="chip" data-filter="good">Good family fit</button>
          <button className="chip" data-filter="warn">Partial fit</button>
          <button className="chip" data-filter="free">Free / donation-based</button>
          <span className="count" id="count"></span>
        </div>
      </div>

      <div className="wrap">

        <div className="section-label"><h2>Within 8 Hours</h2><div className="rule"></div></div>
        <p className="section-note">Sorted nearest to farthest. Distance and drive time are road-trip estimates — confirm before you lock dates. &quot;Full Kitchen&quot; reflects only what&apos;s confirmed in the source listings. Removed a listing by mistake? Undo appears right after you remove one — after that, scroll to the bottom to restore it.</p>
        <div className="grid" id="mainGrid"></div>

        <div className="section-label"><h2>Just Outside 8 Hours</h2><div className="rule"></div></div>
        <p className="section-note">These run 8.25–9 hours, but were documented well enough — or fit the family so well on paper — that they&apos;re worth knowing about.</p>
        <div className="grid" id="borderGrid"></div>

        <div className="removed-note" id="removedNote" style={{ display: 'none' }}></div>

        <div className="resource-note">
          <strong>Also worth checking directly:</strong> Christian Hospitality Network (<a href="https://thechn.org" target="_blank" rel="noopener">thechn.org</a>, <a href="tel:8653767546">865-376-7546</a>) and Shepherd&apos;s Fold Ministries (<a href="https://shepherdsfoldministries.com/retreat-centers/" target="_blank" rel="noopener">shepherdsfoldministries.com</a>) both maintain large state-by-state directories that aren&apos;t broken out by exact distance or kitchen availability — worth a direct look for something closer to home in DE, PA, NJ, MD, or VA specifically.
        </div>

        <footer>
          Sources: my-pastor.com/pastor-retreat-centers.html · pastorgetaways.com · ag.org (Assemblies of God) · hopeforpastorswives.com · shepherdsfoldministries.com · energizeministries.com · wcrc.info · qwaters.org · genesisseminars.org — compiled for personal trip planning, not an endorsement of any listed ministry.
        </footer>
      </div>

      <div className="undo-toast" id="undoToast">
        <span id="undoText"></span>
        <button id="undoBtn">Undo</button>
      </div>
    </div>
  )
}
