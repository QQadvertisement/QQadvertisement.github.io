import { useState } from "react";
import { Link } from "react-router-dom";
import { BEAR_SRC } from "../lib/brand";
import { SpecList, SpecRow } from "./ui/Spec";
import PlayableGame from "./PlayableGame";
import { playables } from "../data/playables";
import { usePlayable } from "../hooks/usePlayable";
import type { Demo } from "../data/demos";
import { measurements } from "../data/measurements.generated";

/**
 * Component 3 — Demo Card.
 *
 * The action button is the card's variant axis, and the choice is
 * semantic, not decorative:
 *
 *   play      the playable runs inline on tap   -> TEAL fill
 *   teardown  tap navigates to /demos/[slug]    -> NEUTRAL outline
 *
 * Never both. A card is one or the other. `Teardown →` leads to a
 * playable; it is not one, so it stays neutral.
 */

const kb = (b: number) => `${(b / 1024).toFixed(1)} KB`;

/** The in-thumbnail playable: bear loader, then the real build.
 *
 *  What runs here is the shipped file itself, mounted by PlayableGame —
 *  the card is a smaller frame around the same build the teardown runs,
 *  not a trimmed-down imitation of it. It therefore has no run length
 *  of its own: the build ends when the build ends. */
function InlinePlayable({ demo, onDone }: { demo: Demo; onDone: () => void }) {
  const m = demo.measurementId ? measurements[demo.measurementId] : undefined;
  const playable = usePlayable({
    assetUrl: demo.measurementId ? "/playables/atta-sync-your-day.html" : BEAR_SRC,
    fallbackBytes: m?.bytes ?? 26122,
  });
  const { phase, received, progressPct, tapFrame } = playable;

  if (phase === "loading" || phase === "ready") {
    return (
      <button
        type="button"
        className="card-play card-play--loader"
        onClick={tapFrame}
        aria-label={phase === "loading" ? `Loading ${demo.title}` : `Play ${demo.title}`}
      >
        <img className="card-play__bear" src={BEAR_SRC} alt="" data-settled={phase === "ready"} />
        <span
          className="loader__track"
          role="progressbar"
          aria-valuenow={Math.round(progressPct)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span className="loader__fill" style={{ inlineSize: `${progressPct.toFixed(2)}%` }} />
        </span>
        <span className="card-play__readout t-mono t-mono-2xs">
          {phase === "loading" ? `LOADING · ${kb(received)}` : "READY · TAP TO PLAY"}
        </span>
      </button>
    );
  }

  return (
    <div className="card-play card-play--live">
      {demo.embedGame ? (
        <PlayableGame
          src={playables[demo.embedGame].src}
          title={playables[demo.embedGame].title}
        />
      ) : null}
      <button
        type="button"
        className="card-play__reset t-mono t-mono-2xs"
        onClick={onDone}
        aria-label={`Close ${demo.title}`}
      >
        CLOSE
      </button>
    </div>
  );
}

export default function DemoCard({ demo }: { demo: Demo }) {
  const [playing, setPlaying] = useState(false);
  const m = demo.measurementId ? measurements[demo.measurementId] : undefined;

  const specs: { label: string; value: string }[] = m
    ? [
        { label: "Weight", value: kb(m.bytes) },
        { label: "Requests", value: String(m.requests) },
        { label: "Format", value: "Single file" },
      ]
    : [
        { label: "Format", value: "Mobile web" },
        { label: "Loop", value: "10 s" },
        { label: "Status", value: "Live" },
      ];

  return (
    <article className="demo-card">
      <div className="demo-card__thumb">
        {playing ? (
          <InlinePlayable demo={demo} onDone={() => setPlaying(false)} />
        ) : (
          <>
            {demo.thumb ? <img src={demo.thumb} alt={demo.thumbAlt ?? ""} /> : null}
            <span className="demo-card__orientation">{demo.orientation.toUpperCase()}</span>
            <span className="demo-card__action">
              {demo.cardVariant === "play" ? (
                /* TEAL GATE 2 — demo-card play button */
                <button
                  type="button"
                  className="btn btn--playable btn--sm"
                  onClick={() => setPlaying(true)}
                >
                  ▸ PLAY
                </button>
              ) : (
                <Link className="btn btn--outline btn--sm" to={`/demos/${demo.slug}`}>
                  TEARDOWN →
                </Link>
              )}
            </span>
          </>
        )}
      </div>

      <div className="demo-card__body">
        <h3 className="demo-card__title t-body-lg t-semibold">
          <Link to={`/demos/${demo.slug}`}>{demo.title}</Link>
        </h3>
        <p className="demo-card__subtitle t-body-xs">{demo.mechanic}</p>
        <div className="demo-card__specs">
          <SpecList density="dense">
            {specs.map((s) => (
              <SpecRow key={s.label} label={s.label} value={s.value} />
            ))}
          </SpecList>
        </div>
      </div>
    </article>
  );
}

/** The scroller's run-off affordance and the NDA empty state. Never a
 *  placeholder logo and never a fake client name. */
export function NdaCard() {
  return (
    <article className="demo-card demo-card--nda" aria-label="Work under NDA">
      <div className="demo-card__thumb demo-card__thumb--nda">
        <span className="t-mono t-mono-2xs c-muted u-upper">Most work is under NDA</span>
      </div>
      <div className="demo-card__body">
        <h3 className="demo-card__title t-body-lg t-semibold">The rest we can't show</h3>
        <p className="demo-card__subtitle t-body-xs">
          Most builds ship under an NDA that outlives the campaign. We'd rather leave the row short
          than fill it with art we don't have the right to publish.
        </p>
      </div>
    </article>
  );
}
