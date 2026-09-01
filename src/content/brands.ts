/* ============================================================
   /for-brands — wireframe `2b`. Replaces /for-agencies.

   ⚠ EVERY METRIC BELOW IS UNSIGNED AND THEREFORE INVISIBLE.

   WHY THIS PAGE EXISTS IN THIS SHAPE. `2b` is a brand page, not an
   agency page in brand clothing: its ladder runs attention →
   understanding → intent → learning, which is a brand funnel, and its
   formats are product demos, try-ons and configurators. The agency
   material that used to be the whole of /for-agencies has not been
   thrown away — it moves into §4 "Works with your agency", which `2b`
   drew as a three-row block with a rate-card callout, i.e. exactly the
   slot it needed. The throughput table and the SLA keep their own
   sections below it.

   The page still carries NO BEAR, including in the footer, inherited
   from the route it replaces. It no longer carries a zero-teal rule:
   unlike the agency page, this one runs live playables, and teal marks
   the thing that responds to the reader.
   ============================================================ */

import type { BuildFormat } from "../components/WhatWeBuild";
import type { Metric } from "./metrics";

export const hero = {
  kicker: "For brand and digital leads, and their agencies",
  title: "A banner gets looked at. A playable gets used — and reports what happened.",
  lede: "Product demos, try-ons and configurators built as single files that run inside the ad slot, instrument every tap, and hand the event data back to whoever is buying the media.",
};

/** `2b` §1 — the metric row inline with the dual CTA. All three are
 *  the wireframe's placeholders (+3.4% CTR, 18s, 6 days). */
export const heroMetrics: Metric[] = [
  { label: "CTR vs rich media" },
  { label: "Avg time in unit" },
  { label: "Brief to live" },
];

/* --- §2 THE VALUE LADDER ---------------------------------------
   Four full-width rows. The claim in each is a statement about the
   format, which we can make; the chip beside it names the metric it
   moves, which is not the same as claiming a number for it. -------- */
export const ladder = [
  {
    label: "Attention",
    claim: "Interaction beats impression — the unit earns the second look",
    metric: "CTR",
  },
  {
    label: "Understanding",
    claim: "Product demo, try-on, configurator — they learn by doing",
    metric: "Dwell time",
  },
  {
    label: "Intent",
    claim: "The end card routes to store, offer or locator — carrying the event data with it",
    metric: "CVR",
  },
  {
    label: "Learning",
    claim: "Every tap is an event — creative insight, not just a media report",
    metric: "Event data",
  },
] as const;

/* --- §4 FORMATS WE BUILD ---------------------------------------
   Moved here from the homepage, where `1c` has no section for it.
   The figures are diagrams of real deliverables, not mocked-up
   screenshots of builds that do not exist. ----------------------- */
export const formats: BuildFormat[] = [
  {
    title: "Playable ads",
    body: "One build, both orientations. The unit reads the placement at runtime and lays itself out for it — there is no second file to QA, no second file to reject, and no landscape variant that silently drifts from the portrait one.",
    note: "One file · both orientations",
    figure: "one-build",
  },
  {
    title: "Interactive end cards",
    body: "The video hands off to the playable in the same document. No second load, no white flash between the two, and the store link is the same one the video's CTA was already pointing at.",
    note: "No second load · no flash",
    figure: "handoff",
  },
  {
    title: "Variant sets",
    body: "Hook, tutorial and end-card splits built as one file behind flags, so a test is a parameter rather than a rebuild. The losing arms come back to you with the winner, so nobody retests them next quarter.",
    note: "One file · flagged splits",
    figure: "variants",
  },
  {
    title: "Localisation",
    body: "Copy, layout and font swaps per market, at the same file weight. Scripts that set wider get their own line breaks rather than a shrunken type size, and the layout is checked per locale, not once in English.",
    note: "Per market · same weight",
    figure: "localisation",
  },
];

/** `2b` §4, right column — the agency block, carried over from the
 *  page this one replaces. */
export const withYourAgency = {
  head: "Works with your agency",
  rows: [
    "You brief us direct, or we sit under your media agency.",
    "Brand guidelines respected; end cards built legal-ready.",
    "Trafficking specs and per-network QA, handed to your buyer.",
  ],
  rateCard: {
    label: "Agency rate card available",
    cta: "Request it",
  },
};

export const ctaBand = {
  title: "Send us the brand deck. We'll come back with a concept and a number.",
};
