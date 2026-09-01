import { Link } from "react-router-dom";
import { BOOKING_URL, QUOTE_HREF } from "../../data/site";

/* ---------------------------------------------------------------
   THE FORK BAND — `1b` §4

   Two full-bleed lanes directly under the hero. This replaces both
   earlier attempts: the fork as a card grid three sections down (too
   late to be a fork) and the fork inside the hero fold (too much in
   one screen — the reader met a headline, a lede, two CTAs, three
   metrics, a running build and a two-way decision at once).

   As a band it is the ONE decision on the screen after the hero, and
   the reader makes it without reading anything else.

   WHY THE LANES ARE NOT SYMMETRICAL. `1b` fills the left lane amber
   and leaves the right one on paper. That is deliberate weighting, not
   decoration: it gives the band a place to start and stops two
   identical cards producing the coin-flip pause that a perfectly
   balanced fork always produces. Amber is the assertion colour under
   the site's split (docs/rebuild-audit.md §0) — the lane asserts, and
   the buttons inside it are what get pressed. No teal in this band;
   the hero above it already spends the fold's one teal region on the
   playable.

   NO EYEBROW. The lanes carried "Fork · left lane" and "Fork · right
   lane" until 2026-08-20 — wireframe annotation that got shipped as
   copy. Nothing replaced it: the headline is already the shortest
   possible statement of what the lane is, and a label above it would
   only be a second, worse one.

   EACH LANE CARRIES ITS OWN PAIR of actions, and they differ by lane
   on purpose. A studio lead wants to see UA work, so their first
   action is the library. A brand lead wants to talk, so theirs is the
   call. Both lanes still carry both paths.
   --------------------------------------------------------------- */

export interface ForkLane {
  title: string;
  body: string;
  primary: { label: string; to: string };
  /** `quote` renders the flat-quote link; `call` renders the booking link. */
  secondary: "quote" | "call";
  emphasis?: boolean;
}

function Secondary({ kind }: { kind: ForkLane["secondary"] }) {
  if (kind === "call") {
    return (
      <a className="btn btn--outline btn--lg" href={BOOKING_URL} target="_blank" rel="noreferrer">
        Book a call
      </a>
    );
  }
  return (
    <Link className="btn btn--outline btn--lg" to={QUOTE_HREF}>
      Get a flat quote
    </Link>
  );
}

export default function ForkBand({ lanes }: { lanes: readonly ForkLane[] }) {
  return (
    <section className="fork-band" aria-labelledby="fork-band-head">
      <h2 id="fork-band-head" className="u-visually-hidden">
        Pick your lane
      </h2>
      {lanes.map((lane) => (
        <div
          className="fork-lane"
          key={lane.primary.to}
          data-emphasis={lane.emphasis ? "true" : undefined}
        >
          <div className="fork-lane__inner">
            <h3 className="fork-lane__title t-display t-display-3xs t-display-xs-at-desktop">
              {lane.title}
            </h3>
            <p className="fork-lane__body t-body-sm">{lane.body}</p>
            <div className="fork-lane__actions btn-pair">
              <Link className="btn btn--neutral btn--lg" to={lane.primary.to}>
                {lane.primary.label}{" "}
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Secondary kind={lane.secondary} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
