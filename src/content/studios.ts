/* ============================================================
   /for-studios — wireframe `2a`

   ⚠ EVERY METRIC BELOW IS UNSIGNED AND THEREFORE INVISIBLE.

   Two of `2a`'s sections are held back rather than filled with the
   wireframe's placeholders, and the reason is the same in both cases:

   · THE CASE-STUDY CENTREPIECE. `2a` draws CPI $3.40 → $2.65, IPM
     7.1 → 10.0, D7 ROAS 1.2x → 2.1x, plus a spend/CPI curve. None of
     those numbers exist. The section still ships — the playable is
     real and it is the thing worth showing — but it renders the build
     and what we changed, and the before/after pairs appear only as
     each is signed off.

   · GENRES WE'VE SHIPPED. `2a` chips hypercasual, casual/puzzle,
     merge, midcore/RPG, strategy and social casino. We have shipped
     none of those. The chips are therefore derived from the real
     library rather than typed, so the list grows as the work does and
     never claims a genre we have not built in.
   ============================================================ */

import type { Metric } from "./metrics";

export const hero = {
  kicker: "For UA and growth teams",
  title: "Your creative test cycle needs new playables every two weeks. That's the whole job.",
  lede: "We read your core loop, build the mechanic that survives the first eight seconds, and turn variants on the same clock every time — so the test cadence is a process, not a scramble.",
};

/** `2a` §1 — the chip card beside the opener. Each one anchors to the
 *  section that answers it, which is the only reason the card earns
 *  its place: it is navigation, not a list of symptoms. */
export const hurts = [
  { label: "Creatives fatigue in 10 days", to: "#value-map" },
  { label: "CPI drifting up", to: "#case" },
  { label: "In-house queue is 6 weeks", to: "#commitment" },
] as const;

/** `2a` §2 — your stage → what you get → the metric it moves.
 *  The right column NAMES a metric; it does not claim a number for
 *  it. That distinction is what makes this table publishable today. */
export const valueMap = [
  {
    stage: "Concept testing",
    get: "Three distinct mechanics, one week",
    metric: "IPM",
  },
  {
    stage: "Scaling a winner",
    get: "Eight variants: hook, difficulty, end card",
    metric: "CPI · ROAS",
  },
  {
    stage: "Fighting fatigue",
    get: "48-hour refresh drops, rolling",
    metric: "Frequency",
  },
  {
    stage: "New network launch",
    get: "A compliant build per network, QA'd against its spec sheet",
    metric: "Time to live",
  },
] as const;

/** `2a` §3 — the before/after pairs on the centrepiece. Each renders
 *  only once signed off; `before` is struck through beside `value`. */
export const caseMetrics: (Metric & { before?: string })[] = [
  { label: "CPI" },
  { label: "IPM" },
  { label: "D7 ROAS" },
];

/** `2a` §4, right column. Facts about the engagement, not claims. */
export const weNeed = [
  {
    title: "An art pack, or your store assets",
    body: "Layered originals if you have them. If you don't, the store screenshots are enough to start.",
  },
  {
    title: "Your current best-performing creative",
    body: "Whatever is winning now. It tells us what the audience has already agreed to look at.",
  },
  {
    title: "Target networks and their specs",
    body: "Which ones you buy on, and the market you care about most. Everything else we decide in the loop read.",
  },
];

export const needNote = "No engine build required. Two-day kickoff.";

/** `2a` §5 — the commitment block. These are the process durations
 *  already stated in site.ts `claims`, which is what makes them legal
 *  in mono: they are commitments made forward, not measurements.
 *  `2a` also draws "12 / mo retainer capacity"; that figure is not in
 *  this repository and is left out until it is. */
export const commitments = [
  { value: "6 days", label: "First build" },
  { value: "48 h", label: "Variant refresh" },
];

export const ctaBand = { title: "Tell us the genre. We'll price it today." };
