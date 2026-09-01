/* ============================================================
   /for-brands CONTENT — the agency half

   Carried over from /for-agencies, which /for-brands replaced on
   2026-08-20. See docs/rebuild-audit.md §0 and §6.1.

   ⚠ EVERY NUMBER IN THIS FILE NEEDS YOUR SIGN-OFF BEFORE LAUNCH.

   This page is entirely operating commitments — the throughput
   table and the SLA are the page's spine, and an agency buyer will
   hold you to both. Nothing here can be measured from the
   repository, so nothing here was measured. The values are the
   comps' shape with conservative defaults.

   Two claims from the comps were dropped rather than carried over,
   because they assert history this repository cannot support:
     · "SLA BREACHES SINCE 2022 · 2 / MONTHS INVOICED AT ZERO · 2"
       and "It has happened twice in four years" — replaced with the
       commitment stated forward.
     · Per-client white-label file weights (1.88 MB / 390 MS etc.)
       for three NDA'd clients — those are measurements of files
       that are not in this repository. The NDA blocks stay; the
       invented measurements are gone.

   This page carries ZERO TEAL and ZERO BEAR, including in the
   footer. It contains no playable, so neither asset is permitted.
   ============================================================ */

export const agenciesHero = {
  kicker: "For UA agencies · white label",
  title: ["A build team that", "never shows up", "in your client's", "inbox."],
  lede: "Concurrent titles, 48-hour variant turns, and deliverables that carry your naming from the filename down. Your client sees your team. We're the capacity behind it.",
};

/** Shown under a border-emphasis rule beside the hero. */
export const operatingNumbers = [
  { label: "Concurrent titles", value: "Up to 9" },
  { label: "First build, new title", value: "6 days" },
  { label: "Variant turn", value: "48 hours" },
  { label: "Hotfix, live campaign", value: "4 hours" },
  { label: "Networks QA'd per build", value: "3" },
  { label: "Capacity remaining", value: "Ask" },
];

/** The page's spine. Six columns on desktop; three cards below 900px —
 *  a component substitution, not a reflow. Six columns cannot survive
 *  350px. */
export interface Tier {
  name: string;
  note: string;
  emphasis?: boolean;
  titles: string;
  newBuilds: string;
  variants: string;
  turn: string;
  hotfix: string;
}

export const tiers: Tier[] = [
  {
    name: "Single title",
    note: "One game, one market",
    titles: "1",
    newBuilds: "2",
    variants: "6",
    turn: "48 h",
    hotfix: "Next day",
  },
  {
    name: "Portfolio",
    note: "Most agencies sit here",
    emphasis: true,
    titles: "3–5",
    newBuilds: "5",
    variants: "18",
    turn: "48 h",
    hotfix: "4 h",
  },
  {
    name: "Embedded",
    note: "We join your standups",
    titles: "6–9",
    newBuilds: "9",
    variants: "32",
    turn: "24 h",
    hotfix: "2 h",
  },
];

export const tierDefinitions = [
  "A variant is a hook, tutorial or end-card split of an existing build.",
  "A new build is a title we haven't shipped before.",
];

export const invisibility = [
  {
    title: "Your naming, all the way down",
    body: "Filenames, commit authors, ZIP structure and the QA report template all carry your agency's conventions. Nothing in the delivered bundle references us.",
  },
  {
    title: "One thread, your side of it",
    body: "We work in your Slack or your Basecamp, never in a client channel. If a client question needs a technical answer, you get the answer and you send it.",
  },
  {
    title: "QA reports you can forward as-is",
    body: "Every build ships with a per-network pass sheet — weight, TTI, MRAID version, orientation behaviour. Formatted to go straight to your client without editing.",
  },
  {
    title: "No approach to your clients, ever",
    body: "Contractual, mutual and permanent — not a courtesy. It survives the end of the retainer.",
  },
];

export const sla = {
  kicker: "Written into the retainer",
  title: "Miss the turn, and the month is credited.",
  body: "Not a discount on the next invoice, not a make-good build. The month the SLA breaks is the month you don't pay for. It is written into the retainer rather than offered as goodwill, which is the only version of it that is worth anything to you.",
  commitments: [
    { label: "Variant turn", value: "48 h or credited" },
    { label: "File weight", value: "Under cap or free" },
    { label: "Network QA", value: "All 3 or not shipped" },
    { label: "Client contact", value: "None, permanently" },
  ],
};

export const deliverables = [
  { title: "The playable", body: "Single HTML file per network, plus the un-minified source." },
  { title: "The QA sheet", body: "Per-network pass table, client-ready, in your template." },
  { title: "The sprite sources", body: "Layered originals and the packed atlas, both." },
  { title: "The variant log", body: "What we tested, what lost, and why we think it lost." },
];

export const whiteLabel = {
  kicker: "White label",
  title: "One build, three of your clients' brands",
  note: "Same mechanic, same file weight, three art directions. Delivered under your naming with no reference to us anywhere in the bundle.",
  /* The comp put three measured spec rows under each NDA block. Those
     files are not in this repository and were not measured, so the rows
     are gone and the honest statement stands in their place. */
  blocks: ["Client A · art under NDA", "Client B · art under NDA", "Client C · art under NDA"],
  prose:
    "We can't show you the art, and you shouldn't want a partner who would. What we can show you in full is the one build that isn't under NDA — the file, the measurements and the parts we'd change — on its teardown page.",
  cta: { label: "See a full teardown", to: "/work/atta-sync-your-day" },
};

export const agenciesContact = {
  title: ["Tell us the volume.", "We'll send a shape."],
  body: "Tell us the titles, the networks and the monthly variant load. We come back with a retainer shape and a start date — usually within one business day.",
  rows: [
    { label: "Reply within", value: "1 business day" },
    { label: "Mutual NDA", value: "Same day" },
    { label: "Earliest start", value: "Ask" },
  ],
};
