'use client'

import { useEffect } from 'react'

interface Listing {
  name: string
  loc: string
  miles: number
  time: string
  price: string
  capacity: string
  beds: string
  baths: string
  amenities: string
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
    name: "Faith Mountain Ministries — Cedar House",
    loc: "Rosedale, WV", miles: 260, time: "4.5 hr",
    price: "Cedar House rate not separately listed (2BR cottages on same property: $69/night)",
    capacity: "Up to 25–30 guests", beds: "7", baths: "Not published",
    amenities: "250 wooded acres, A/C, full kitchen, fire pit, 2.5-acre pond, hiking/biking trails, whitewater rafting 90 min away",
    fit: "good", fitLabel: "Best fit — only listing sized for all 9 of you",
    notes: "Also has three separate 2BR cottages at $69/night if you'd rather have more privacy than the big house. The discount is baked into the low nightly rate rather than a separate published 'pastor rate.'",
    phone: "3043644019", phoneDisplay: "304-364-4019", website: "https://www.mountainoffaith.org/", email: null,
    source: "my-pastor.com/faith-mountain-ministries-west-virginia.html", sourceUrl: "https://www.my-pastor.com/faith-mountain-ministries-west-virginia.html",
    free: false
  },
  {
    name: "Faith Mountain Ministries — 2BR Cottage",
    loc: "Rosedale, WV", miles: 260, time: "4.5 hr",
    price: "$69/night",
    capacity: "Sleeps approx. 4–6 (2BR)", beds: "2", baths: "Not published",
    amenities: "A/C, full kitchen, fire pit, pond, hiking/biking trails",
    fit: "warn", fitLabel: "Too small alone — pair with Cedar House",
    notes: "Same property as above; listed separately since it's priced and booked as its own unit.",
    phone: "3043644019", phoneDisplay: "304-364-4019", website: "https://www.mountainoffaith.org/", email: null,
    source: "my-pastor.com/faith-mountain-ministries-west-virginia.html", sourceUrl: "https://www.my-pastor.com/faith-mountain-ministries-west-virginia.html",
    free: false
  },
  {
    name: "Canna Country Inn",
    loc: "Etters, PA", miles: 95, time: "1.75 hr",
    price: "25–75% off posted B&B rates for full-time ministry staff (call for current posted rate)",
    capacity: "Whole-inn rental up to 26 guests", beds: "7 rooms", baths: "7 private baths (1 with 2-person whirlpool)",
    amenities: "2 full kitchens, 4 fireplaces, 2 living rooms, large meeting room",
    fit: "good", fitLabel: "Good fit — book the whole inn",
    notes: "Scholarships available if even the discounted rate is out of reach. Book the whole inn rather than a single room for a family your size.",
    phone: null, phoneDisplay: null, website: "http://cannainnbandb.com/", email: null,
    source: "my-pastor.com/canna-country-inn-pennsylvania.html", sourceUrl: "https://www.my-pastor.com/canna-country-inn-pennsylvania.html",
    free: false
  },
  {
    name: "Disciples' Retreat",
    loc: "Wellston, OH", miles: 430, time: "7 hr",
    price: "$15 per person, per night",
    capacity: "Sleeps 8", beds: "2", baths: "2 (with showers)",
    amenities: "Log cabin, full kitchen, big living area with couches, 2 fishing ponds, volleyball net, fireplace with wood provided, open year-round, 1.5 hr from Dayton",
    fit: "good", fitLabel: "Strong fit — sleeps 8, cheap, kid-friendly",
    notes: "One of the best-documented listings across both directories — specific price, specific capacity, specific amenities.",
    phone: "7403843328", phoneDisplay: "740-384-3328", website: null, email: null,
    source: "pastorgetaways.com/disciples-retreat/", sourceUrl: "https://pastorgetaways.com/disciples-retreat/",
    free: false
  },
  {
    name: "Comfort Inn Splash Harbor",
    loc: "Bellville, OH", miles: 400, time: "6.5 hr",
    price: "Discounted for licensed pastors, Sunday/Monday nights, based on availability",
    capacity: "Standard hotel rooms", beds: "Not published", baths: "Not published",
    amenities: "Indoor water park — 49-ft slide, dumping buckets, shooting geysers, water basketball, kids' pool area, indoor pool & hot tubs",
    fit: "warn", fitLabel: "Great for kids, weak for a full week (2 nights only)",
    notes: "A hotel chain property, not a ministry retreat — only Sun/Mon nights available and likely requires licensed-pastor verification. Good for a quick stop, not a full vacation.",
    phone: "4198864000", phoneDisplay: "419-886-4000", website: null, email: null,
    source: "pastorgetaways.com/ramada-inn-or-comfort-inn/", sourceUrl: "https://pastorgetaways.com/ramada-inn-or-comfort-inn/",
    free: false
  },
  {
    name: "Beulah Beach",
    loc: "Vermillion, OH (Lake Erie)", miles: 430, time: "7 hr",
    price: "Not published — contact for rate",
    capacity: "Varies — some units more/fewer bedrooms", beds: "Not published", baths: "Not published",
    amenities: "On Lake Erie between Cleveland & Toledo, fully furnished units, near Cedar Point amusement park, best availability off-season",
    fit: "warn", fitLabel: "Good potential — confirm bedroom count",
    notes: "Cedar Point next door is a real draw for a family of 9, but this is pitched at pastors and wives specifically — call to confirm they can host 7 kids.",
    phone: "4409674861", phoneDisplay: "440-967-4861", website: "https://www.beulahbeach.org/", email: null,
    source: "pastorgetaways.com/beulah-beach/", sourceUrl: "https://pastorgetaways.com/beulah-beach/",
    free: false
  },
  {
    name: "Laurel Ridge Cabins",
    loc: "near Summersville Lake, WV", miles: 300, time: "5 hr",
    price: "Discounted rate for pastors/missionaries — contact for pricing",
    capacity: "6 cabins total on site", beds: "Not published", baths: "Not published",
    amenities: "15 wooded acres, 4-acre play field, volleyball, horseshoes, playground, near whitewater rafting/fishing/boating",
    fit: "good", fitLabel: "Good fit — actively pitched as family-friendly",
    notes: "Christian families, church groups, and pastors only. Still building out nonprofit status — call ahead to confirm current rates.",
    phone: "3048721602", phoneDisplay: "304-872-1602", website: null, email: null,
    source: "my-pastor.com/laurel-ridge-cabins-west-virginia.html", sourceUrl: "https://www.my-pastor.com/laurel-ridge-cabins-west-virginia.html",
    free: false
  },
  {
    name: "Spruce Lake Retreat",
    loc: "Canadensis, PA (Poconos)", miles: 175, time: "3 hr",
    price: "Not published on listing — check sprucelake.org for current rates",
    capacity: "Large conference center, multiple lodging types", beds: "Not published", baths: "Not published",
    amenities: "Full Christian conference center in the Poconos — lodges, activities, dining hall",
    fit: "warn", fitLabel: "Likely fine, but confirm ministry-family pricing directly",
    notes: "A full-scale retreat/conference center, not a small cabin — good if you want programming and other families around, less private than the others.",
    phone: "5705957505", phoneDisplay: "570-595-7505", website: "https://www.sprucelake.org/", email: "mailto:stay@sprucelake.org",
    source: "my-pastor.com/spruce-lake-retreat-pennsylvania.html", sourceUrl: "https://www.my-pastor.com/spruce-lake-retreat-pennsylvania.html",
    free: false
  },
  {
    name: "Hidden Hollow Retreat Center",
    loc: "Moravian Falls, NC", miles: 430, time: "7 hr",
    price: "Not published — contact for pricing",
    capacity: "Not published", beds: "Not published", baths: "Not published",
    amenities: "Blue Ridge Mountain foothills setting, set aside specifically for those in ministry",
    fit: "bad", fitLabel: "Unknown — too little published detail",
    notes: "The least documented listing found in either directory — worth a direct call before planning around it.",
    phone: "7046343903", phoneDisplay: "704-634-3903", website: "https://www.retreatcabin.com/", email: null,
    source: "pastorgetaways.com (Hidden Hollow Retreat Center)", sourceUrl: "https://pastorgetaways.com/hidden-hollow-retreat-center/",
    free: false
  },
  {
    name: "Draw Nigh Ministries",
    loc: "Pinehurst, NC", miles: 430, time: "7 hr",
    price: "Free (no cost)",
    capacity: "Pastor + wife + up to 4 children", beds: "Not published", baths: "Not published",
    amenities: "Private cottage, east of Charlotte / SSW of Raleigh",
    fit: "warn", fitLabel: "Partial fit — capped at 4 kids, you have 7",
    notes: "Worth calling to ask whether they can flex above the stated 4-child limit for a large family — that cap is the only thing keeping this off the 'good fit' list.",
    phone: null, phoneDisplay: null, website: null, email: null,
    source: "my-pastor.com/draw-nigh-ministries-north-carolina.html", sourceUrl: "https://www.my-pastor.com/draw-nigh-ministries-north-carolina.html",
    free: true
  },
  {
    name: "Ridgecrest Conference Center",
    loc: "Ridgecrest, NC (near Asheville)", miles: 520, time: "8.5 hr",
    price: "$79/night (hotel-style rooms)",
    capacity: "Hotel-style rooms, multiple lodge options on a large campus", beds: "Not published", baths: "Not published",
    amenities: "Large Baptist conference center in the Blue Ridge Mountains, minutes from Asheville",
    fit: "warn", fitLabel: "Likely fine on a big campus, but runs slightly over 8 hours",
    notes: "One of two listings genuinely borderline on the 8-hour cutoff — included because it's otherwise strong and well documented.",
    phone: "8005887222", phoneDisplay: "800-588-7222", website: "https://ridgecrestconferencecenter.com/", email: null,
    source: "my-pastor.com/ridgecrest-conference-center-north-carolina.html", sourceUrl: "https://www.my-pastor.com/ridgecrest-conference-center-north-carolina.html",
    free: false
  },
  {
    name: "Churches in Mission Guest House",
    loc: "near Gettysburg, PA", miles: 130, time: "2.25 hr",
    price: "Free (donation-based, program retreat)",
    capacity: "Pastor couple only", beds: "Not published", baths: "Not published",
    amenities: "South-central PA mountains, hosted by a retired pastor couple, meals provided",
    fit: "bad", fitLabel: "Not a fit — 2-day pastor-couple program, not family lodging",
    notes: "Included for completeness since it's on the source list, but this is a scheduled discussion/counseling retreat, not a rentable getaway.",
    phone: null, phoneDisplay: null, website: null, email: null,
    source: "my-pastor.com/churches-in-mission-guest-house-pennsylvania.html", sourceUrl: "https://www.my-pastor.com/churches-in-mission-guest-house-pennsylvania.html",
    free: true
  },
  {
    name: "New Season Retreat",
    loc: "near Fairfax, VA", miles: 130, time: "2.25 hr",
    price: "Free (donations optional)",
    capacity: "Sleeps 2 adults only", beds: "1 (private suite)", baths: "1",
    amenities: "Private entrance suite, kitchenette, coffee/tea, near restaurants",
    fit: "bad", fitLabel: "Not a fit — 2-adult suite, no room for kids",
    notes: "A couples' respite space, not family lodging — kept on the list since it's a genuinely nice option for you and Mel alone sometime.",
    phone: null, phoneDisplay: null, website: "http://www.newseasonretreat.com/", email: "mailto:info@newseasonretreat.com",
    source: "my-pastor.com/new-season-retreat-virginia.html", sourceUrl: "https://www.my-pastor.com/new-season-retreat-virginia.html",
    free: true
  },
  {
    name: "House of Hope International",
    loc: "Bronx, NYC", miles: 130, time: "2.25 hr",
    price: "Not published — contact required",
    capacity: "Not published", beds: "Not published", baths: "Not published",
    amenities: "Urban NYC location, hosts personal retreats, retreat events, and trainings",
    fit: "bad", fitLabel: "Unknown — too little public detail for a family of 9",
    notes: "The least useful listing here for a family vacation — an urban ministry-events space.",
    phone: "7187941076", phoneDisplay: "718-794-1076", website: null, email: "mailto:HOHINTL@gmail.com",
    source: "my-pastor.com/house-of-hope-international-new-york-city.html", sourceUrl: "https://www.my-pastor.com/house-of-hope-international-new-york-city.html",
    free: false
  },
  {
    name: "Blue Rock Bed & Breakfast",
    loc: "Millersville, PA", miles: 100, time: "1.75 hr",
    price: "Discounted for missionaries/pastors (blacked out October + some summer weekends) — contact for current rate",
    capacity: "B&B, multiple rooms", beds: "Not published", baths: "Not published",
    amenities: "Bed & breakfast setting near Lancaster/Amish Country",
    fit: "warn", fitLabel: "Possible — confirm total room count for a family of 9",
    notes: "Blackout dates apply (October, some summer weekends) — plan around those.",
    phone: null, phoneDisplay: null, website: null, email: null,
    source: "my-pastor.com/blue-rock-b-b-and-healing-ministry-pennsylvania.html", sourceUrl: "https://www.my-pastor.com/blue-rock-b-b-and-healing-ministry-pennsylvania.html",
    free: false
  }
]

const borderListings: Listing[] = [
  {
    name: "Christian Pastor Retreat",
    loc: "Jamestown, TN (Cumberland Plateau)", miles: 560, time: "~9 hr",
    price: "$150/week suggested donation (no one turned away)",
    capacity: "3 cabins, kids welcome, toy room, sports equipment", beds: "Not published", baths: "Not published",
    amenities: "9-acre property, porch swings, gazebo, near Pickett State Park & Big South Fork",
    fit: "good", fitLabel: "Would be the best family match on the whole list — if it were closer",
    notes: "Excluded from the main list because it runs roughly 9 hours, past the 8-hour cutoff — flagged because it's otherwise an excellent fit.",
    phone: "9318796784", phoneDisplay: "931-879-6784", website: "http://www.christianpastorretreat.org/", email: null,
    source: "my-pastor.com/christian-pastor-retreat-tennessee.html", sourceUrl: "https://www.my-pastor.com/christian-pastor-retreat-tennessee.html",
    free: false
  },
  {
    name: "Potter's Ranch Wilderness Retreat",
    loc: "Union, KY (near Cincinnati)", miles: 530, time: "8.5 hr",
    price: "Contact for cost/availability",
    capacity: "Cabin sleeps 6", beds: "Not published", baths: "Not published",
    amenities: "440-acre wilderness setting along Gunpowder Creek, fishing, hiking, close to the Creation Museum",
    fit: "warn", fitLabel: "Sleeps 6, not 9 — would need a second unit",
    notes: "Friday–Saturday stays for pastors and family. Close to Cincinnati if you want a city day mixed in.",
    phone: "8595865475", phoneDisplay: "859-586-5475", website: "https://www.pottersranch.org/", email: null,
    source: "pastorgetaways.com/potters-ranch-wilderness-retreat/", sourceUrl: "https://pastorgetaways.com/potters-ranch-wilderness-retreat/",
    free: false
  },
  {
    name: "Fairhaven Ministries",
    loc: "Roan Mountain, TN (Blue Ridge Mtns)", miles: 510, time: "8.25 hr",
    price: "$95/night for a ministry couple",
    capacity: "1BR + loft with 2 twin beds + queen sleeper sofa", beds: "1 queen + loft (2 twin) + sleeper sofa", baths: "1",
    amenities: "15 chalets/cottages on 100 acres, full kitchen, hiking/boating/historical sites nearby",
    fit: "warn", fitLabel: "Too small for 9 in one unit — 15 chalets on site though",
    notes: "With 15 separate chalets on the property, worth asking whether they'll book two adjoining units for a large family.",
    phone: "4237724269", phoneDisplay: "423-772-4269", website: "https://www.fairhavenministries.net/", email: null,
    source: "pastorgetaways.com/fairhaven-ministries/", sourceUrl: "https://pastorgetaways.com/fairhaven-ministries/",
    free: false
  },
  {
    name: "Whitestone Country Inn",
    loc: "Kingston, TN", miles: 560, time: "9 hr",
    price: "40% discount Sunday–Thursday for ministry",
    capacity: "Country inn, multiple rooms", beds: "Not published", baths: "Not published",
    amenities: "Full-service country inn setting",
    fit: "bad", fitLabel: "Unknown — inn-style, would need multiple rooms",
    notes: "Discount applies Sun–Thu only, so plan a midweek stay rather than a weekend.",
    phone: "8653760113", phoneDisplay: "865-376-0113", website: "https://whitestoneinn.com/", email: null,
    source: "pastorgetaways.com/whitestone-country-inn/", sourceUrl: "https://pastorgetaways.com/whitestone-country-inn/",
    free: false
  }
]

const fitLabels: Record<Listing['fit'], string> = { good: "GOOD FIT", warn: "PARTIAL FIT", bad: "WEAK FIT" }

function cardHTML(item: Listing): string {
  const links: string[] = []
  if (item.website) links.push(`<a href="${item.website}" target="_blank" rel="noopener">🔗 Website</a>`)
  if (item.phone) links.push(`<a href="tel:${item.phone}">☎ ${item.phoneDisplay}</a>`)
  if (item.email) links.push(`<a href="${item.email}">✉ Email</a>`)
  const contactHTML = links.length
    ? `<div class="contact-row">${links.join("")}</div>`
    : `<div class="contact-row"><span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#8a8571;">No direct contact published — see source link below</span></div>`

  return `
  <article class="card" data-name="${item.name.toLowerCase()}" data-loc="${item.loc.toLowerCase()}" data-amen="${item.amenities.toLowerCase()}" data-fit="${item.fit}" data-free="${item.free}">
    <div class="marker">
      <div class="mi">${item.miles}</div>
      <div class="mi-label">miles</div>
      <div class="time">${item.time}</div>
    </div>
    <div class="card-body">
      <h3>${item.name}</h3>
      <div class="location">${item.loc}</div>
      <span class="fit-badge fit-${item.fit}">${fitLabels[item.fit]} — ${item.fitLabel}</span>
      <div class="facts">
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
    const search = document.getElementById('search') as HTMLInputElement | null
    const countEl = document.getElementById('count')
    const chips = document.querySelectorAll<HTMLButtonElement>('.retreats-page .chip')

    if (!mainGrid || !borderGrid || !search || !countEl) return

    mainGrid.innerHTML = mainListings.map(cardHTML).join("")
    borderGrid.innerHTML = borderListings.map(cardHTML).join("")

    let activeFilter = 'all'

    function applyFilters() {
      const q = search!.value.trim().toLowerCase()
      const allCards = document.querySelectorAll<HTMLElement>('.retreats-page #mainGrid .card, .retreats-page #borderGrid .card')
      let visible = 0
      allCards.forEach(c => {
        const matchesText = !q || (c.dataset.name ?? '').includes(q) || (c.dataset.loc ?? '').includes(q) || (c.dataset.amen ?? '').includes(q)
        let matchesFilter = true
        if (activeFilter === 'good') matchesFilter = c.dataset.fit === 'good'
        if (activeFilter === 'warn') matchesFilter = c.dataset.fit === 'warn'
        if (activeFilter === 'free') matchesFilter = c.dataset.free === 'true'
        const show = matchesText && matchesFilter
        c.style.display = show ? '' : 'none'
        if (show) visible++
      })
      countEl!.textContent = visible + ' shown'
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

    applyFilters()

    return () => {
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
          <p className="eyebrow">Family trip planning · Pastor lodging guide</p>
          <h1>Where the Yomes Family Could Actually Go</h1>
          <p className="lede">Every clergy-discounted or free retreat property found across two source directories, filtered to a realistic radius, with real prices and capacities where the ministries publish them — and an honest flag where they don&apos;t.</p>
          <div className="origin"><span className="dot"></span> Measured from Newark, DE · 8-hour drive radius</div>
        </div>
      </header>

      <div className="controls">
        <div className="controls-inner">
          <input id="search" type="text" placeholder="Search by name, state, or amenity…" aria-label="Search listings" />
          <button className="chip active" data-filter="all">All 15</button>
          <button className="chip" data-filter="good">Good family fit</button>
          <button className="chip" data-filter="warn">Partial fit</button>
          <button className="chip" data-filter="free">Free / donation-based</button>
          <span className="count" id="count"></span>
        </div>
      </div>

      <div className="wrap">

        <div className="section-label"><h2>Within 8 Hours</h2><div className="rule"></div></div>
        <p className="section-note">Sorted nearest to farthest. Distance and drive time are road-trip estimates, not turn-by-turn — confirm before you lock dates.</p>
        <div className="grid" id="mainGrid"></div>

        <div className="section-label"><h2>Just Outside 8 Hours</h2><div className="rule"></div></div>
        <p className="section-note">These missed the cutoff by roughly 15 minutes to an hour, but were documented well enough — or fit the family so well on paper — that they&apos;re worth knowing about.</p>
        <div className="grid" id="borderGrid"></div>

        <div className="resource-note">
          <strong>Also worth a call:</strong> Christian Hospitality Network (<a href="https://thechn.org" target="_blank" rel="noopener">thechn.org</a>, <a href="tel:8653767546">865-376-7546</a>) isn&apos;t a single property — it&apos;s a network of roughly 1,000 B&amp;Bs, inns, and other lodging properties across all 50 states offering discounts to full-time ministry staff. Their inventory isn&apos;t broken out by location on the directories searched here, so it&apos;s worth checking directly for something closer to home in DE, PA, NJ, MD, or VA.
        </div>

        <footer>
          Sources: my-pastor.com/pastor-retreat-centers.html · pastorgetaways.com — compiled for personal trip planning, not an endorsement of any listed ministry.
        </footer>
      </div>
    </div>
  )
}
