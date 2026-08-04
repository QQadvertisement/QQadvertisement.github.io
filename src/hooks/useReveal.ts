import { useEffect } from "react";

/**
 * Scroll choreography.
 *
 * Marks any element carrying `data-reveal` as revealed once it has
 * entered the viewport, one time only. All the actual motion lives in
 * CSS (see base.css, REVEAL) — this hook only flips the flag, so the
 * reduced-motion contract is enforced in one place rather than in
 * every component.
 *
 * Three properties this has to keep:
 *
 *   · Once, never back. Elements that re-animate on every pass make a
 *     page feel restless and make a second read worse than the first.
 *   · No flash of hidden content without JS. The hidden state is set
 *     by a class this hook adds to <html>, so a failed bundle leaves
 *     everything visible instead of blank.
 *   · Nothing that moves is load-bearing. Reveal only ever animates
 *     opacity and a small translate; no layout, no content.
 *
 * `data-reveal-stagger` on a parent staggers its revealable children
 * by --reveal-step, which is set in CSS, not here.
 */
export default function useReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* Under reduced motion nothing is ever hidden — the class that
       arms the hidden state is simply never added, so every element
       paints in its final position. */
    if (reduced.matches) return;

    const root = document.documentElement;
    root.classList.add("reveal-armed");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          /* `isIntersecting` alone is not enough. A fast jump — the
             End key, an anchor link, restored scroll position, a
             programmatic scroll — can carry an element from below the
             fold to above it between two observer samples, so it is
             never once seen intersecting and would stay invisible
             forever. Anything that has ended up ABOVE the viewport has
             been passed and must be shown regardless. */
          const passed = e.boundingClientRect.bottom < 0;
          if (!e.isIntersecting && !passed) continue;
          (e.target as HTMLElement).dataset.revealed = "true";
          io.unobserve(e.target);
        }
      },
      /* Fires slightly before the element's top edge clears the fold,
         so the motion reads as the page settling rather than as
         something reacting to being looked at. */
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 }
    );

    const observe = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")
        .forEach((el) => io.observe(el));
    };

    observe();

    /* Route changes and late-mounting content (the gallery, the demo
       cards) bring their own revealables. */
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove("reveal-armed");
    };
  }, []);
}
