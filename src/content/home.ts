/* ============================================================
   HOME — wireframe `1c`

   ⚠ EVERY METRIC BELOW IS UNSIGNED AND THEREFORE INVISIBLE.
   Fill in `value` AND `source` to publish one. See content/metrics.ts.
   ============================================================ */

import type { ForkLane } from "../components/ui/ForkBand";
import type { Metric } from "./metrics";

export const hero = {
  kicker: "Custom HTML5 playables · New York",
  /* Two lines max, per `1c`. Kept verbatim from the current build —
     it is an outcome, not a category label, which is exactly what the
     brief asks every headline to be. */
  title: "Ads people play. Not ads people skip.",
  lede: "Interactive creative for Meta, TikTok and Google Ads. Built by hand, tested on every one of them before it reaches you.",
};

/** The audience split, as a full-bleed band directly under the hero
 *  (`1b` §4). Each lane leads with the action its reader actually
 *  wants first — the studio lead wants to see UA work, the brand lead
 *  wants to talk — and both lanes still carry both paths. */
export const fork = [
  {
    title: "I run a game studio",
    body: "We read your core loop and build a playable that keeps the mechanic honest — not a mini-game wearing your art.",
    primary: { label: "UA playables", to: "/for-game-studios" },
    secondary: "quote",
    emphasis: true,
  },
  {
    title: "I run a brand",
    body: "Product demos, try-ons and configurators people finish — that report what they did inside the unit.",
    primary: { label: "Brand demos", to: "/for-brands" },
    secondary: "call",
  },
] as const satisfies readonly ForkLane[];

/* --- The hero's proof row --------------------------------------
   `1b` moves these into the hero, under a hairline, directly below the
   CTA pair — three numbers, no section of their own. All three are
   placeholders in the wireframe (+38%, 6 days, 420+) and none can be
   verified from this repository.

   "6 days" is the closest to publishable — it is the process
   commitment already stated in site.ts `claims.process` — but as a
   PROOF metric it reads as an average of work delivered, which is a
   different assertion from a commitment made forward. Sign it off as
   an average only if you have measured the average.
   -------------------------------------------------------------- */
export const proof: Metric[] = [
  { label: "IPM lift vs static" },
  { label: "Average turnaround" },
  { label: "Playables shipped" },
];

export const shelf = {
  title: "Featured work",
  lede: "The real files, not video captures. Each one runs in the browser.",
};

/** `1b` §6 — three compact rows with day labels, sharing a row with
 *  the pricing teaser. The four-step version in site.ts `claims.process`
 *  stays the canonical one and is what /for-studios renders; this is
 *  the same commitment folded to three lines, because the home page
 *  gets a summary and the lane page gets the detail. */
export const howItWorks = [
  { day: "Day 1", title: "Brief and concept", body: "We play your build and pick the mechanic that survives eight seconds." },
  { day: "Day 2–5", title: "Build and one review round", body: "Coded from scratch, with the hook timing and end-card variants written down first." },
  { day: "Day 6", title: "Network-ready builds", body: "Tested against every network's spec sheet you named, and yours to keep." },
] as const;

export const pricingTeaser = {
  kicker: "Published flat rate",
  /* Renders only once the price is approved in content/pricing.ts.
     Until then the section states the policy, which is true today and
     is most of what the reader wants from this band anyway. */
  fallbackTitle: "Flat rates, published in full.",
  body: "No discovery call to find out what it costs. The rate card is on the pricing page.",
};

export const ctaBand = {
  title: "Pick your lane, get a number the same week.",
};
