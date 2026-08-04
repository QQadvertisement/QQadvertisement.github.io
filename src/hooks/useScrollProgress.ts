import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Drives the mobile gallery's progress indicator from the scroller's
 * own offset. Returns the thumb's width and its translate, both as
 * percentages of the track.
 *
 * The thumb is neutral, never teal — scrolling is not a playable
 * action.
 */
export default function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ width: 100, offset: 0 });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { scrollWidth, clientWidth, scrollLeft } = el;
    if (scrollWidth <= clientWidth) {
      setState({ width: 100, offset: 0 });
      return;
    }
    const width = (clientWidth / scrollWidth) * 100;
    const travel = scrollLeft / (scrollWidth - clientWidth);
    setState({ width, offset: travel * ((100 - width) / width) * 100 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return { ref, ...state };
}
