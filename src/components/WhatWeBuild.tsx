/**
 * "What we build" — the formats grid.
 *
 * WAS a pinned scroll sequence: a tall block of scroll containing one
 * sticky stage, where the scroll drove which of the four formats was
 * showing instead of moving the page. That was removed on 2026-08-20.
 *
 * WHY IT WENT. Two reasons, in order of weight. The wireframes ask for
 * exactly one sticky element on the whole site — the hero playable
 * holding while the fork column scrolls — and a second pinned run
 * competes with it for the same trick. And the pinned version only
 * ever ran on one axis of one breakpoint: below 1024 and under reduced
 * motion it already rendered the stacked composition, which had been
 * written as a full second design rather than a fallback. Deleting the
 * pin therefore deleted a track, a progress rail and a scroll handler,
 * and cost no content at all.
 *
 * WHAT SURVIVED, and it was always the good part: the figure. Four
 * formats described in four boxes of body copy asked the reader to
 * picture the difference between a playable, an end card, a variant
 * set and a localised build. That difference is spatial — how many
 * screens there are, where one hands off to the next, what stays the
 * same across them — so it belongs in a drawing. The drawing works
 * just as well standing still.
 */

export interface BuildFormat {
  title: string;
  body: string;
  /** the mono line under the figure — what the format costs you */
  note: string;
  /** which arrangement of screens the figure draws */
  figure: "one-build" | "handoff" | "variants" | "localisation";
}

/* --------------------------------------------------------------
   THE FIGURE

   Three abstract screens, always the same three, rearranged per
   format. They are diagrams and are drawn as diagrams — flat blocks
   and rules, no fake screenshots. A mocked-up "playable" here would
   be a picture of a build that does not exist, which is the one thing
   this site does not do anywhere else either.

   The screens persist across steps rather than being swapped out, so
   the change between formats is one object moving. Swapping the DOM
   per step would make it four cuts.
   -------------------------------------------------------------- */
function Figure({ format }: { format: BuildFormat }) {
  const labels: Record<BuildFormat["figure"], [string, string, string]> = {
    "one-build": ["PORTRAIT", "LANDSCAPE", ""],
    handoff: ["VIDEO", "PLAYABLE", ""],
    variants: ["HOOK A", "HOOK B", "HOOK C"],
    localisation: ["EN", "JA", "TH"],
  };
  const [a, b, c] = labels[format.figure];

  return (
    <div className="wb-figure" data-figure={format.figure} aria-hidden="true">
      <div className="wb-screen wb-screen--a">
        <span className="wb-screen__bar" />
        <span className="wb-screen__glyph" />
        <span className="wb-screen__label">{a}</span>
      </div>
      <div className="wb-screen wb-screen--b">
        <span className="wb-screen__bar" />
        <span className="wb-screen__glyph" />
        <span className="wb-screen__label">{b}</span>
      </div>
      <div className="wb-screen wb-screen--c">
        <span className="wb-screen__bar" />
        <span className="wb-screen__glyph" />
        <span className="wb-screen__label">{c}</span>
      </div>
      {/* Only the handoff arrangement has a direction to show. */}
      <span className="wb-figure__arrow">→</span>
    </div>
  );
}

export default function WhatWeBuild({ items }: { items: readonly BuildFormat[] }) {
  return (
    <ol className="wb-list">
      {items.map((item, i) => (
        <li className="wb-list__item" key={item.title}>
          <p className="wb-num t-mono t-mono-xs">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="wb-title t-display t-display-4xs">{item.title}</h3>
          <p className="wb-body t-body-sm">{item.body}</p>
          <div className="wb-stage">
            <Figure format={item} />
          </div>
          <p className="wb-note t-mono t-mono-2xs u-upper">{item.note}</p>
        </li>
      ))}
    </ol>
  );
}
