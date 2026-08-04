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
export const CONTACT_EMAIL = "hello@qqadvertisement.com";

export const site = {
  name: "QQ Advertisement",
  legalName: "QQ Advertisement LLC",
  city: "New York, NY",
  descriptor: "Custom HTML5 playable ads for mobile user acquisition.",
  year: new Date().getFullYear(),
};

/** The six networks every build is QA'd against, with their published
 *  weight caps. Caps are the networks' own published limits — used to
 *  compute PASS/FAIL against a measured file weight, never asserted. */
export const networks = [
  { id: "meta", name: "Meta", capMb: 5, spec: "5 MB CAP · 2 S TTI" },
  { id: "tiktok", name: "TikTok", capMb: 2, spec: "2 MB CAP · MRAID 3" },
  { id: "applovin", name: "AppLovin", capMb: 5, spec: "5 MB CAP · SINGLE FILE" },
  { id: "unity", name: "Unity", capMb: 5, spec: "5 MB CAP · ORIENTATION" },
  { id: "ironsource", name: "ironSource", capMb: 3, spec: "3 MB CAP · DAPI" },
  { id: "mintegral", name: "Mintegral", capMb: 2, spec: "2 MB CAP · MRAID 3" },
] as const;

export const claims = {
  /* --- The guarantee. These are the terms you are measured against. */
  guarantee: {
    kicker: "The guarantee",
    title: "If the first build misses the spec, you don't pay for it.",
    body: "Under 2 MB, interactive in under a second, and passing on every network you named in the brief. Those are the terms we're measured against — and the numbers on every demo page are pulled from the shipped file, not typed in by us.",
    stats: [
      { value: "<2 MB", caption: "Every build, no exceptions" },
      { value: "<1 S", caption: "To first interaction" },
      { value: "6", caption: "Networks QA'd per build" },
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
  networkWallClaim: "Six networks · one codebase · zero templates",
} as const;

export const navItems = [
  { label: "Demos", to: "/demos" },
  { label: "What we build", to: "/#what-we-build" },
  { label: "For Studios", to: "/for-studios" },
  { label: "For Agencies", to: "/for-agencies" },
  { label: "Playables 101", to: "/playable-ads-explained" },
  { label: "About", to: "/about" },
];

export const footerColumns = [
  {
    head: "Work",
    links: [
      { label: "Demos", to: "/demos" },
      { label: "Teardowns", to: "/demos" },
    ],
  },
  {
    head: "What we build",
    links: [
      { label: "Playable ads", to: "/#what-we-build" },
      { label: "End cards", to: "/#what-we-build" },
      { label: "Variant sets", to: "/#what-we-build" },
    ],
  },
  {
    head: "Who we serve",
    links: [
      { label: "For Studios", to: "/for-studios" },
      { label: "For Agencies", to: "/for-agencies" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "Process", to: "/#process" },
      { label: "About", to: "/about" },
      { label: "FAQ", to: "/#faq" },
    ],
  },
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
    a: "Meta, TikTok, AppLovin, Unity, ironSource and Mintegral by default. Each has a different weight cap, a different MRAID version and a different orientation contract, so the build carries flags rather than forks.",
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
