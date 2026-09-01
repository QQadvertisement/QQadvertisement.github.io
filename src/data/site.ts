/* ============================================================
   SITE-WIDE CONTENT

   ⚠ EVERY VALUE UNDER `claims` NEEDS YOUR SIGN-OFF BEFORE LAUNCH.

   The design reserves monospace for values that were genuinely
   measured or contractually committed ("Mono as Claim"). File
   measurements come from scripts/measure-builds.mjs and are real.
   The numbers below are the other kind — commitments and operating
   facts only you can confirm. They are collected here, in one place,
   so confirming them is a single editing pass.

   Defaults are deliberately conservative. Where the design comps
   carried a claim that cannot be verified from this repository
   (campaign win-rates, years in business, historical SLA breaches,
   per-client file weights under NDA), the claim has been dropped
   rather than invented — see the notes inline.
   ============================================================ */

export const BOOKING_URL = "https://calendly.com/hello-qqstudio1/30min";

/** The low-commitment path, present in every CTA pair beside the
 *  booking link. Lands on the brief form rather than a calendar, which
 *  is the whole point of carrying two paths: a reader who will not
 *  give up a slot still has somewhere to go.
 *
 *  A ROUTE, not an anchor, since 2026-08-20: the form came off the
 *  homepage when `1b` cut it, so this had to stop being "/#contact".
 *  It is better as a route anyway — a destination can be linked to
 *  from an email, and it does not make every CTA on the site a jump
 *  to the bottom of a page the reader is already reading. */
export const QUOTE_HREF = "/quote";
export const CONTACT_EMAIL = "hello@qqadvertisement.com";

export const site = {
  name: "QQ Advertisement",
  legalName: "QQ Advertisement LLC",
  city: "New York, NY",
  descriptor: "Custom HTML5 playable ads for mobile user acquisition.",
  year: new Date().getFullYear(),
};

/** The three networks every build is QA'd against, with their published
 *  weight caps. Caps are the networks' own published limits — used to
 *  compute PASS/FAIL against a measured file weight, never asserted.
 *
 *  Narrowed from six to three on 2026-08-05, at the owner's call: the
 *  four dropped (AppLovin, Unity, ironSource, Mintegral) were listed
 *  without the operating experience to back them up, and a list you
 *  cannot answer questions about is a liability in a sales call, not
 *  an asset. Adding one back means adding its real published cap here
 *  — every PASS/FAIL badge on a demo page is computed from this array,
 *  so a guessed cap becomes a printed lie.
 *
 *  Google is Google Ads / AdMob app campaigns, NOT AdSense. AdSense is
 *  publisher-side display monetisation and does not run playables; the
 *  distinction is one a UA buyer will know on sight. Google's store
 *  handoff is its own Exit API rather than MRAID, which is why the
 *  chip reads differently from the other two. */
export const networks = [
  { id: "meta", name: "Meta", capMb: 5, spec: "5 MB CAP · 2 S TTI" },
  { id: "tiktok", name: "TikTok", capMb: 2, spec: "2 MB CAP · MRAID 3" },
  { id: "google", name: "Google Ads", capMb: 5, spec: "5 MB CAP · EXIT API" },
] as const;

export const claims = {
  /* --- The guarantee. These are the terms you are measured against. */
  guarantee: {
    kicker: "The guarantee",
    title: "If the first build misses the spec, you don't pay for it.",
    body: "Under 2 MB, interactive in under a second, and passing on every network you named in the brief. Those are the terms we're measured against — and the numbers on every demo page are pulled from the shipped file, not typed in by us.",
    stats: [
      { value: "<2 MB", caption: "Never bounced for size" },
      { value: "<1 S", caption: "Playing before they scroll past" },
      { value: "3", caption: "Networks it's tested on before you see it" },
    ],
  },

  /* --- Process. Durations here are contractual commitments, which is
     what makes them legal in mono. Confirm each one. */
  processTitle: "Six days to first build",
  process: [
    {
      duration: "01 · 1 day",
      title: "Loop read",
      body: "We play your build and pick the mechanic that survives eight seconds.",
    },
    {
      duration: "02 · 2 days",
      title: "Playable spec",
      body: "Hook timing, tutorial cue, win moment, end-card variants — written down.",
    },
    {
      duration: "03 · 3 days",
      title: "Build and network QA",
      body: "Coded from scratch, tested against every network's spec sheet you named.",
    },
    {
      duration: "04 · 48 hours",
      title: "Variant turns",
      body: "Every revision after launch lands on the same clock, indefinitely.",
    },
  ],

  /* --- Response commitments shown as spec rows beside the contact form.
     The comp carried "MEDIAN REPLY · 4 H 20 M". That is a measurement
     of your inbox, and nothing in this repository can verify it, so it
     has been replaced with the commitment it implies. Restore the
     median only if you are actually measuring it. */
  replyRows: [
    { label: "Reply within", value: "1 business day" },
    { label: "NDA on request", value: "Same day" },
    { label: "Time zone", value: "ET · 09–19" },
  ],

  /* --- The network wall's claim line. The comp read "FOUR YEARS · SIX
     NETWORKS · ZERO TEMPLATES"; the tenure is unverifiable here and has
     been dropped. This is the claim the chips substantiate — it is not
     a label, and it is never "AS SEEN ON". */
  networkWallClaim: "Three networks · one build · written for your game, not reskinned",
} as const;

/** Six items, per the wireframes' header. Two audience lanes first —
 *  the reader self-selects before anything else — then the proof, the
 *  process, the price. About drops out of the bar and stays in the
 *  footer: it is the last thing a UA buyer reads, not the first.
 *
 *  FIVE items, not six — "How It Works" was cut on 2026-08-20 as
 *  repetitive: it pointed at a home-page anchor whose content was
 *  also the spine of /for-game-studios. The home section stays; the
 *  nav item that duplicated it does not. */
export const navItems = [
  { label: "For Game Studios", to: "/for-game-studios" },
  { label: "For Brands", to: "/for-brands" },
  { label: "Work", to: "/work" },
  { label: "Pricing", to: "/pricing" },
  { label: "Resources", to: "/resources" },
];

/** Four columns, matching the sitemap's own grouping. The legal row
 *  and the conversion endpoints are rendered separately by SiteFooter
 *  — they are not a category of content. */
export const footerColumns = [
  {
    head: "Work",
    links: [
      { label: "Playable library", to: "/work" },
      { label: "By industry", to: "/work/industries" },
      { label: "Game case studies", to: "/work?a=games" },
      { label: "Brand case studies", to: "/work?a=brands" },
    ],
  },
  {
    head: "Who we serve",
    links: [
      { label: "For Game Studios", to: "/for-game-studios" },
      { label: "Creative testing", to: "/for-game-studios/testing" },
      { label: "For Brands", to: "/for-brands" },
      { label: "Interactive demos", to: "/for-brands/demos" },
    ],
  },
  {
    head: "Resources",
    links: [
      { label: "Playables 101", to: "/playable-ads-explained" },
      { label: "Benchmarks", to: "/resources/benchmarks" },
      { label: "Glossary", to: "/glossary" },
      { label: "Blog", to: "/blog" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "Pricing", to: "/pricing" },
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

/** The sitemap's legal row. Rendered as one line in the footer base,
 *  not as a fifth content column. */
export const legalLinks = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Cookies", to: "/cookies" },
];

export const faqs = [
  {
    q: "Do you work from our art, or make new?",
    a: "Either. Most builds reuse your sprites at a smaller atlas; when a mechanic needs art the game doesn't have, we draw it to match and hand it back with the source.",
  },
  {
    q: "What do you need to start?",
    a: "A build we can play — a store link, a TestFlight or an APK. Plus the networks you buy on and the market you care about most. Everything else we can decide in the loop read.",
  },
  {
    q: "Which networks do you QA against?",
    a: "Meta, TikTok and Google Ads. Each one has its own weight cap, its own way of handing off to the store — Google uses its Exit API where the other two use MRAID — and its own orientation rules. One build carries flags for all three rather than forking into three files that drift apart.",
  },
  {
    q: "Who owns the files afterwards?",
    a: "You do — repository, sprite sources and the spec sheet, including the variants that lost. That last part matters more than it sounds: it stops the next team you hire from retesting a hook we already know fails.",
  },
  {
    q: "Can you work under our agency's brand?",
    a: "Yes. Commits, filenames and deliverables carry your naming, and we never appear in a client thread unless you put us there.",
  },
];

export const buildVolumeOptions = ["1–3", "4–8", "9–16", "17+", "Not sure yet"];
export const variantVolumeOptions = ["Under 6", "6–12", "12–20", "20–32", "32+"];
