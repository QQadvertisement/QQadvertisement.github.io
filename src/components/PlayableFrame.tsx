import { useCallback } from "react";
import type { KeyboardEvent } from "react";
import type { usePlayable } from "../hooks/usePlayable";
import PlayableGame from "./PlayableGame";
import { playables, type PlayableId } from "../data/playables";
import { BEAR_SRC } from "../lib/brand";

type Playable = ReturnType<typeof usePlayable>;

const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;

/**
 * Components 2 and 13 — Phone Frame and Bear Loader.
 *
 * The frame is chrome only; it holds no content logic. It is the focus
 * target and the hit target for the whole playable — never a small
 * inner button.
 *
 * Phases are loading -> ready -> running. A tap means a different thing
 * in each, and Enter and Space map to the same handler.
 *
 * What runs in the `running` phase is the REAL build, mounted by
 * PlayableGame from /playables/ — for `atta` that is the exact file the
 * network served. The frame therefore owns no win state and no end card
 * of its own: the build carries its own scoring, end card and replay,
 * and inventing a second one on top would be claiming a mechanic the
 * file does not have.
 *
 * Where a build cannot be embedded — Friends Ramen writes to the
 * production database, so it is never framed — pass no `game` and the
 * frame stays a poster that points at the live URL.
 */
export default function PlayableFrame({
  playable,
  game,
  buildName,
  ariaBuildName,
  poster,
  posterAlt,
  liveUrl,
}: {
  playable: Playable;
  /** the build to mount once play starts; omit when it cannot be embedded */
  game?: PlayableId;
  /** shown in the phone's chrome footer */
  buildName: string;
  ariaBuildName: string;
  /** still frame for builds that are not embeddable */
  poster?: string;
  posterAlt?: string;
  /** where the un-embeddable build actually lives */
  liveUrl?: string;
}) {
  const {
    phase,
    received,
    total,
    loadMs,
    liveBytes,
    pokes,
    hopKey,
    progressPct,
    tapFrame,
  } = playable;

  const loading = phase === "loading";
  const ready = phase === "ready";
  const running = phase === "running";
  const hopping = loading && pokes > 0;
  const embeddable = Boolean(game);

  let readout: string;
  if (loading) readout = kb(received);
  else if (liveBytes) readout = `${loadMs} MS`;
  else readout = kb(total);

  const onKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tapFrame();
      }
    },
    [tapFrame]
  );

  // The aria-label changes per phase, because the frame is one control
  // whose meaning changes. Once the real build is running the frame
  // stops being a control at all — the file inside it is.
  let ariaLabel: string;
  if (loading) ariaLabel = `QQ bear, loading ${ariaBuildName}`;
  else if (ready) ariaLabel = embeddable ? `Play ${ariaBuildName}` : ariaBuildName;
  else ariaLabel = `${ariaBuildName}, running`;

  const isControl = embeddable && !running;

  return (
    <div className="phone">
      <div
        className="playable-stage"
        role={isControl ? "button" : undefined}
        tabIndex={isControl ? 0 : undefined}
        aria-label={ariaLabel}
        onClick={isControl ? tapFrame : undefined}
        onKeyDown={isControl ? onKey : undefined}
      >
        <div className="phone__notch" aria-hidden="true" />

        {/* --- loader layer ------------------------------------------ */}
        <div className="loader" data-hidden={running ? "true" : undefined}>
          <div className="loader__poke" data-visible={hopping ? "true" : undefined}>
            POKE {String(pokes).padStart(2, "0")}
          </div>

          <div className="loader__bear" data-settled={!loading ? "true" : undefined}>
            {/* alt is empty: the frame carries the label */}
            <img src={BEAR_SRC} alt="" key="bear" data-hop={hopping ? hopKey : undefined} />
          </div>

          <div className="loader__spacer" aria-hidden="true" />

          {/* Not a decorative bar — the byte readout is its visible text. */}
          <div
            className="loader__track"
            role="progressbar"
            aria-valuenow={Math.round(progressPct)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Loading ${ariaBuildName}`}
          >
            <div className="loader__fill" style={{ inlineSize: `${progressPct.toFixed(2)}%` }} />
          </div>

          {/* The byte readout is a claim about the build, so it only
              appears where the thing being fetched IS the build. A
              build we do not embed loads a stand-in asset purely to
              drive this loader; printing its weight under the build's
              name would read as the build's own weight. */}
          <p className="loader__readout">
            <span>{loading ? "LOADING" : "READY"}</span>
            <strong>{embeddable ? readout : "LIVE BUILD"}</strong>
          </p>
        </div>

        {/* --- play button -------------------------------------------
            For an embeddable build this starts it in place. For one we
            will not frame, it is a link out and says so. */}
        <div className="loader__play" data-visible={ready ? "true" : undefined}>
          {embeddable ? (
            /* TEAL GATE 1 — phone-frame play button */
            <span className="btn btn--playable">▸ TAP TO PLAY</span>
          ) : liveUrl ? (
            <a
              className="btn btn--playable"
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              ▸ OPEN THE LIVE BUILD
            </a>
          ) : null}
        </div>

        {/* --- the real build ---------------------------------------- */}
        {game && running ? (
          <div className="play-layer" data-visible="true">
            <PlayableGame src={playables[game].src} title={playables[game].title} />
          </div>
        ) : null}

        {/* A build we cannot frame still shows what it is, rather than
            an empty screen or a mechanic we made up for it. */}
        {!embeddable && poster ? (
          <img className="playable-poster" src={poster} alt={posterAlt ?? ""} />
        ) : null}

        {/* The site's chrome comes off once the build is up. It labels
            the frame while the frame is ours; leaving it there would
            park our type on top of the client's ad. */}
        {running ? null : (
          <div className="phone__chrome" aria-hidden="true">
            <span>{buildName}</span>
            <span>SOUND OFF</span>
          </div>
        )}
      </div>
    </div>
  );
}
