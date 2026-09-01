import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import PlayableFrame from "./PlayableFrame";
import { usePlayable } from "../hooks/usePlayable";
import { playables } from "../data/playables";
import { measurements } from "../data/measurements.generated";
import type { Demo } from "../data/demos";

/**
 * The play surface — a build running full size, over the page.
 *
 * WHY THIS EXISTS. The demo card used to run the shipped file inside
 * its own 190px thumbnail. That is smaller than the loader bear, it is
 * a quarter of the shortest dimension any of these builds were
 * designed against, and the result was a gallery that invited a tap
 * and then made the thing it opened unplayable. A playable you cannot
 * play is a screenshot with extra steps.
 *
 * So the card no longer runs anything. It opens this, which gives the
 * build the largest device that fits the viewport and takes the page
 * out from under it.
 *
 * It is a PORTAL, and that is load-bearing rather than tidiness: the
 * tile lifts on hover with a transform, and a transformed ancestor
 * becomes the containing block for position:fixed descendants. Left in
 * place, the overlay would be positioned against the card it came from
 * and would move when the card moved.
 *
 * The frame inside is the same PlayableFrame the hero and the teardown
 * use, mounted fresh — so opening a build replays its real load and
 * its bear, and the byte readout is measured on this visit rather than
 * remembered from the last one.
 */
export default function PlayableLightbox({
  demo,
  onClose,
}: {
  /** must be a demo with `embedGame` set — see data/demos.ts on why
   *  some builds are deliberately not embeddable */
  demo: Demo;
  onClose: () => void;
}) {
  const game = demo.embedGame;
  const build = game ? playables[game] : undefined;
  const m = build ? measurements[build.measurementId] : undefined;

  /* Hooks run unconditionally; the guard is on the render. A demo with
     no embeddable build should never have opened this in the first
     place, and falling back to a URL that does not exist would make
     the loader report a fabricated weight. */
  const playable = usePlayable({
    assetUrl: build?.src ?? "",
    fallbackBytes: m?.bytes ?? 0,
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* The opener gets focus back. Captured on mount rather than passed
     in, so the caller does not have to hold a ref to its own button. */
  const openerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    return () => openerRef.current?.focus?.();
  }, []);

  /* Scroll lock, Escape, and a focus trap — the same contract the nav
     sheet keeps, because this is the same kind of object. */
  useEffect(() => {
    document.body.classList.add("is-locked");
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-locked");
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  /* Only a press that both starts and ends on the scrim closes. A drag
     that began inside the running build and finished outside it is a
     gesture in the game, not a dismissal — and on a tap game that
     misfire costs the player their run. */
  const downOnScrim = useRef(false);
  const onScrimDown = useCallback((e: ReactPointerEvent) => {
    downOnScrim.current = e.target === e.currentTarget;
  }, []);
  const onScrimUp = useCallback(
    (e: ReactPointerEvent) => {
      if (downOnScrim.current && e.target === e.currentTarget) onClose();
      downOnScrim.current = false;
    },
    [onClose]
  );

  if (!game || !build) return null;

  const kb = (b: number) => `${(b / 1024).toFixed(1)} KB`;
  const stats = m
    ? [
        { label: "Weight", value: kb(m.bytes) },
        { label: "Over the wire", value: kb(m.gzipBytes) },
        { label: "Requests", value: String(m.requests) },
      ]
    : [];

  return createPortal(
    <div
      className="lightbox"
      onPointerDown={onScrimDown}
      onPointerUp={onScrimUp}
    >
      <div
        className="lightbox__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${demo.title} — playable`}
      >
        <div className="lightbox__head">
          <div className="lightbox__id">
            <p className="lightbox__client t-mono t-mono-2xs u-upper">{demo.client}</p>
            <h2 className="lightbox__title t-display t-display-4xs">{demo.title}</h2>
          </div>
          <button
            type="button"
            className="lightbox__close"
            ref={closeRef}
            onClick={onClose}
            aria-label={`Close ${demo.title}`}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="lightbox__stage">
          <PlayableFrame
            playable={playable}
            game={game}
            buildName={demo.title.toUpperCase()}
            ariaBuildName={demo.title}
          />
        </div>

        <div className="lightbox__foot">
          {/* Measured, like everywhere else these numbers appear — read
              off the shipped file at build time, not typed in here. */}
          <dl className="lightbox__stats">
            {stats.map((s) => (
              <div className="lightbox__stat" key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          {/* A route, not an href — a full reload here would throw away
              the load the visitor just watched happen. */}
          <Link className="lightbox__teardown t-mono t-mono-xs u-upper" to={`/work/${demo.slug}`}>
            Full teardown →
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
