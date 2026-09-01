import { Link, useSearchParams } from "react-router-dom";
import PlayableLightbox from "./PlayableLightbox";
import type { Demo } from "../data/demos";
import { measurements } from "../data/measurements.generated";

/**
 * Component 3 — Build Tile.
 *
 * WHAT CHANGED AND WHY. This was a bordered paper card: a 190px
 * thumbnail with a scrim, a button floating on the artwork, then a
 * title, a subtitle and a three-row spec table stacked underneath, all
 * inside a horizontal scroller. Two real builds and an NDA notice do
 * not fill a scroller, so the row's run-off affordance pointed at
 * nothing, and every card carried four separate pieces of chrome
 * competing with the one thing worth looking at — the artwork.
 *
 * The tile is now the artwork. Everything else either drops to a
 * single quiet line beneath it or waits for intent:
 *
 *   at rest    art, then title and one measured line. Nothing else.
 *   on hover   a floating panel with the file's numbers and the action
 *   on touch   no hover to wait for, so the action alone is pinned on
 *              the tile and the panel never renders
 *
 * The action axis is unchanged and still semantic, not decorative:
 *
 *   play      opens the build full size in PlayableLightbox -> TEAL
 *   teardown  navigates to /work/[slug]                    -> NEUTRAL
 *
 * Never both. `Teardown →` leads to a playable; it is not one, so it
 * stays neutral. What DID change is where `play` puts the build: in
 * the lightbox, at the largest size the viewport allows, rather than
 * inside the thumbnail — see PlayableLightbox for that argument.
 *
 * WHICH BUILD IS OPEN IS URL STATE, not component state (`?play=slug`).
 * Three things fall out of that and none of them are free otherwise:
 * a running build is a link someone can send, Back closes the modal
 * instead of leaving the page, and any card on any page opens it the
 * same way without a context or a store in between. Opening PUSHES a
 * history entry so Back is the same gesture as Escape; closing
 * REPLACES, so the closed state does not stack up behind the reader.
 */

const kb = (b: number) => `${(b / 1024).toFixed(1)} KB`;

export default function DemoCard({ demo }: { demo: Demo }) {
  const [params, setParams] = useSearchParams();
  const playing = params.get("play") === demo.slug;

  const setPlaying = (open: boolean) => {
    const next = new URLSearchParams(params);
    if (open) next.set("play", demo.slug);
    else next.delete("play");
    setParams(next, { replace: !open });
  };
  const m = demo.measurementId ? measurements[demo.measurementId] : undefined;

  /* A tile plays only if there is a build to mount. `cardVariant` says
     what the design wants; `embedGame` says what is actually possible,
     and the second one wins — Friends Ramen writes to a production
     database, so it is never framed. */
  const canPlay = demo.cardVariant === "play" && Boolean(demo.embedGame);

  /* The line under the title, in the same register as the reference's
     "06 elements": orientation, then the file's real cost. Where there
     is no measurement there is no number — the mechanic goes there
     instead of an invented figure. */
  const meta = m
    ? `${demo.orientation.split(" · ")[0]} · ${kb(m.bytes)} · ${m.requests} request${
        m.requests === 1 ? "" : "s"
      }`
    : /* No orientation prefix here: without a weight to follow it the
         line has nothing to say, and the mechanic alone keeps it to
         one line at the tile's width. */
      demo.mechanic;

  const panelStats = m
    ? [
        { label: "Weight", value: kb(m.bytes) },
        { label: "Wire", value: kb(m.gzipBytes) },
        { label: "Requests", value: String(m.requests) },
      ]
    : [
        { label: "Format", value: "Mobile web" },
        { label: "Backend", value: "Supabase" },
        { label: "Status", value: "Live" },
      ];

  return (
    <>
      <article className="build-tile">
        <div className="build-tile__frame">
          {demo.thumb ? (
            <img className="build-tile__art" src={demo.thumb} alt={demo.thumbAlt ?? ""} />
          ) : null}

          {/* THE WHOLE TILE IS THE TARGET. One control, covering the
              art, rather than a small button parked on top of it —
              which is also what lets the artwork stay unobstructed at
              rest. Its label is visually hidden because the title
              below is already reading it out on screen. */}
          {canPlay ? (
            <button
              type="button"
              className="build-tile__hit"
              onClick={() => setPlaying(true)}
            >
              <span className="u-visually-hidden">Play {demo.title}</span>
            </button>
          ) : (
            <Link className="build-tile__hit" to={`/work/${demo.slug}`}>
              <span className="u-visually-hidden">{demo.title} teardown</span>
            </Link>
          )}

          {/* THE FLOATING PANEL. aria-hidden and unfocusable
              throughout: every word in it is already announced by the
              tile's control and the caption, and the button here is a
              <span>, not a second tab stop pointing at the same
              action. It is a rendering of state, not a control. */}
          <div className="build-panel" aria-hidden="true">
            <dl className="build-panel__stats">
              {panelStats.map((s) => (
                <div className="build-panel__stat" key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            {canPlay ? (
              /* TEAL GATE 2 — the build tile's play affordance. */
              <span className="btn btn--playable btn--sm build-panel__action">▸ PLAY</span>
            ) : (
              <span className="btn btn--on-ground btn--sm build-panel__action">TEARDOWN →</span>
            )}
          </div>
        </div>

        <div className="build-tile__caption">
          <h3 className="build-tile__title t-body-lg t-semibold">
            <Link to={`/work/${demo.slug}`}>{demo.title}</Link>
          </h3>
          <p className="build-tile__meta t-mono t-mono-sm">{meta}</p>
        </div>
      </article>

      {/* `canPlay` is checked again here, not just on the button. The
          open state comes from the URL now, and a hand-typed
          ?play=ramen-slurping-challenge would otherwise mount a frame
          for a build that must never be framed — see data/demos.ts. */}
      {playing && canPlay ? (
        <PlayableLightbox demo={demo} onClose={() => setPlaying(false)} />
      ) : null}
    </>
  );
}

/** The NDA empty state, in the reference's "add" slot — a tile-shaped
 *  hole in the grid rather than a card pretending to be a build.
 *  Never a placeholder logo and never a fake client name. */
export function NdaCard() {
  return (
    <article className="build-tile build-tile--nda">
      <div className="build-tile__frame build-tile__frame--empty">
        <span className="build-tile__mark" aria-hidden="true">
          ✳
        </span>
        <span className="build-tile__empty-note t-mono t-mono-2xs u-upper">Under NDA</span>
      </div>
      <div className="build-tile__caption">
        <h3 className="build-tile__title t-body-lg t-semibold">The rest we can't show</h3>
        <p className="build-tile__meta t-mono t-mono-sm">
          Most builds ship under an NDA that outlives the campaign
        </p>
      </div>
    </article>
  );
}
