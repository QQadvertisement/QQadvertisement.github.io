/* ============================================================
   PRICING — wireframe `1f`

   ⚠ NONE OF THESE PRICES HAVE BEEN APPROVED.

   `1f` publishes $2,400 / $8,900 / $7,800-a-month, plus add-ons at
   +$350, +$180 and +40%, and an in-house comparison at ~$6,000 loaded.
   The business has never published a price, and not one of these
   figures exists anywhere in this repository — they are the designer's
   placeholders showing where a number goes.

   Set `approved: true` on a tier ONLY once the amount is the real one.
   Until then the tier renders its turnaround and inclusions with the
   amount omitted, and the page's own headline falls back from "Prices,
   not a contact form" to a version it can honour.

   The comparison table is held back entirely: a table whose left
   column is blank and whose right column says "~$6,000 loaded" is not
   a comparison, it is an unsourced attack on the reader's own team.
   ============================================================ */

import type { Tier } from "../components/ui/PricingTier";

export const header = {
  /* Used when at least one tier is approved. */
  title: "Prices, not a contact form",
  /* Used when none are. Still true, still worth the page. */
  fallbackTitle: "What a playable costs, and what changes it",
  lede: "Every build is quoted flat before it starts. The variables are the number of concepts, the number of variants and the networks you need it to pass on — so those are what the page explains.",
};

export const tiers: Tier[] = [
  {
    id: "single",
    name: "Single playable",
    price: { amount: "$2,400", approved: false },
    cadence: "6-day turnaround",
    inclusions: ["1 concept", "2 revision rounds", "2 size variants", "3 network exports"],
    cta: { label: "Get a flat quote", to: "/#contact" },
  },
  {
    id: "pack",
    name: "Campaign pack",
    price: { amount: "$8,900", approved: false },
    cadence: "3 weeks, all builds",
    inclusions: [
      "3 concepts",
      "Unlimited revisions in-window",
      "8 variants",
      "Every network you name",
    ],
    cta: { label: "Get a flat quote", to: "/#contact" },
    flag: "Most studios pick this",
  },
  {
    id: "retainer",
    name: "Monthly retainer",
    price: { amount: "$7,800", unit: "/mo", approved: false },
    cadence: "Rolling, 48h variants",
    inclusions: [
      "4 playables a month",
      "Continuous variants",
      "Dedicated Slack channel",
      "All networks + QA",
    ],
    cta: { label: "Book a call", external: true },
  },
];

/** `1f` §3. Same gate — an add-on with no approved amount is dropped
 *  rather than shown with a blank price. */
export const addOns = [
  { label: "Extra variant", amount: "+$350", approved: false },
  { label: "Localization / language", amount: "+$180", approved: false },
  { label: "Rush (72h)", amount: "+40%", approved: false },
];

/** `1f` §4. Held back in full until BOTH columns can be sourced —
 *  see the file header. Rows kept so the shape survives the wait. */
export const comparison = {
  approved: false,
  rows: [
    { label: "Cost per playable", us: "", inHouse: "" },
    { label: "Time to first build", us: "6 days", inHouse: "" },
    { label: "Network compliance QA", us: "Included", inHouse: "Your team" },
    { label: "Variant turnaround", us: "48 hours", inHouse: "Sprint-dependent" },
  ],
};

export const faqs = [
  {
    q: "Why publish prices at all?",
    a: "Because the alternative is a discovery call whose first job is to work out what you can afford. A flat rate means the build is scoped to the brief, not to the budget we guessed.",
  },
  {
    q: "What counts as a revision?",
    a: "Anything that changes the build without changing the brief — timing, art, copy, difficulty, end-card treatment. A new mechanic is a new concept, and we'll say so before starting it.",
  },
  {
    q: "Do you charge per network export?",
    a: "No. One build carries the flags for every network you named, and each export is QA'd against that network's own spec sheet before it ships.",
  },
  {
    q: "Can we pause a retainer?",
    a: "Yes, with a month's notice. Paused months don't invoice, and the queue position is held.",
  },
];

export const ctaBand = { title: "Two ways in. Pick either." };
