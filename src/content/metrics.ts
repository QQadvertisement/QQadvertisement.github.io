/* ============================================================
   THE METRIC SLOT

   ⚠ EVERY METRIC ON THIS SITE NEEDS A SOURCE BEFORE IT RENDERS.

   The wireframes delivered on 2026-08-20 carry about thirty campaign
   figures — +38% IPM lift, 420+ playables shipped, $2.65 CPI, +3.4%
   CTR, "All (42)" — every one of which is a placeholder drawn to show
   where a number goes, not a number anyone recorded. The full list is
   in docs/rebuild-audit.md §6.2.

   Rather than trust an editing pass to catch them, this file makes the
   omission structural: a Metric renders only when it has BOTH a value
   and a source. A value with no source is not a smaller claim than an
   invented one, it is the same claim with the receipt missing, so it
   does not print. The layouts below are built to look deliberate with
   the slots empty — a proof bar with one sourced metric shows one
   metric, not one metric and two blanks.

   This is the same rule already enforced two other ways:
     · Mono as Claim — monospace is reserved for measured values.
     · measurements.generated.ts — build metrics are read off the
       shipped file by scripts/measure-builds.mjs, never typed.

   TO SIGN A NUMBER OFF: fill in `value` and write `source` as the
   thing you would say out loud if a buyer asked where it came from.
   "Meta campaign, Atta, Mar 2026, 14d window" is a source. "Internal
   data" is not, and neither is "client".
   ============================================================ */

export interface Metric {
  /** e.g. "+38%" · "6 days" · "$2,400". Formatted as it should read. */
  value?: string;
  /** the caption under it. Always written, even when the value is not. */
  label: string;
  /**
   * Where the number came from, specific enough to defend in a call.
   * No source, no render — see `sourced()`.
   */
  source?: string;
}

/** A metric is publishable only with both halves. */
export const isSourced = <T extends Metric>(m: T): m is T & { value: string; source: string } =>
  Boolean(m.value && m.source);

/** Drop every unsigned slot. Use this at the render site, always.
 *  Generic, so a metric carrying extra fields — `2a`'s before/after
 *  pairs, for one — keeps them through the filter. */
export const sourced = <T extends Metric>(metrics: readonly T[]) =>
  metrics.filter((m): m is T & { value: string; source: string } => isSourced(m));

/**
 * True when a section has nothing left to show and should not render
 * its heading either — an empty section with a live headline reads as
 * a loading failure.
 */
export const anySourced = (metrics: readonly Metric[]) => metrics.some(isSourced);

/* ------------------------------------------------------------
   PRICES

   Prices are not metrics — nobody measures them — but they carry the
   same risk, because the wireframes publish three of them and the
   business has never published any. Same gate: a price with no
   `approved` flag does not print, and a pricing section with no
   approved price renders its explanation and its CTA instead of a
   grid of blanks.
   ------------------------------------------------------------ */

export interface Price {
  /** e.g. "$2,400" or "$7,800" */
  amount?: string;
  /** e.g. "/mo" — rendered smaller, alongside */
  unit?: string;
  /** Set true only once the owner has confirmed this is the real price. */
  approved?: boolean;
}

export const isApproved = (p: Price): p is Price & { amount: string } =>
  Boolean(p.amount && p.approved);
