import { useCallback, useEffect, useRef, useState } from "react";

/**
 * State machine for the phone frame — improvement-spec §7.
 *
 *   loading -> ready -> running -> won -> loading
 *
 * The governing principle is that THE BEAR WAITS FOR THE USER, NOT FOR
 * THE NETWORK. Loading completes underneath the bear and the frame then
 * holds indefinitely until a tap, so the bear is always seen without
 * inventing a fake minimum-display delay, and the tap that dismisses it
 * is the same tap that starts the playable.
 *
 * The load is real. We actually fetch the shipped file and report the
 * bytes as they arrive and the elapsed milliseconds when they stop —
 * which is the only way the mono readout is allowed to exist at all
 * ("Mono as Claim"). If the fetch is blocked or unavailable we fall
 * back to the build-time measurement and stop reporting a live byte
 * count rather than animate an invented one.
 *
 * `slow3g` paces the same real bytes to a labelled 3G rate. It is a
 * simulation and the UI says so — it is the condition switcher's whole
 * purpose.
 */

export type Phase = "loading" | "ready" | "running";
export type Condition = "portrait" | "landscape" | "slow3g";

/** ~400 kbit/s effective, the usual "slow 3G" throttle profile. */
const SLOW_3G_BYTES_PER_MS = 50;

export interface PlayableState {
  phase: Phase;
  /** bytes received so far — real, not simulated */
  received: number;
  /** total bytes for the file being loaded */
  total: number;
  /** measured wall-clock ms from mount to load complete */
  loadMs: number;
  /** true when the byte count is a live measurement rather than the
   *  build-time figure */
  liveBytes: boolean;
  pokes: number;
  hopKey: number;
  /** wall-clock ms the visitor has had the real build open */
  elapsedMs: number;
}

export function usePlayable({
  assetUrl,
  fallbackBytes,
  condition = "portrait",
}: {
  assetUrl: string;
  fallbackBytes: number;
  condition?: Condition;
}) {
  const [state, setState] = useState<PlayableState>({
    phase: "loading",
    received: 0,
    total: fallbackBytes,
    loadMs: 0,
    liveBytes: false,
    pokes: 0,
    hopKey: 0,
    elapsedMs: 0,
  });

  const runStart = useRef<number | null>(null);
  const raf = useRef<number | null>(null);
  const loadToken = useRef(0);

  /* --- the real load ------------------------------------------------ */
  const startLoad = useCallback(() => {
    const token = ++loadToken.current;
    const t0 = performance.now();
    setState((s) => ({
      ...s,
      phase: "loading",
      received: 0,
      total: fallbackBytes,
      loadMs: 0,
      liveBytes: false,
      pokes: 0,
      elapsedMs: 0,
    }));
    runStart.current = null;

    const finish = (bytes: number, live: boolean) => {
      if (token !== loadToken.current) return;
      setState((s) => ({
        ...s,
        phase: "ready",
        received: bytes,
        total: bytes,
        liveBytes: live,
        loadMs: Math.round(performance.now() - t0),
      }));
    };

    (async () => {
      try {
        const res = await fetch(assetUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const declared = Number(res.headers.get("content-length"));
        const total = Number.isFinite(declared) && declared > 0 ? declared : fallbackBytes;
        const reader = res.body?.getReader();

        if (!reader) {
          const buf = await res.arrayBuffer();
          finish(buf.byteLength, true);
          return;
        }

        let received = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (token !== loadToken.current) return;
          if (done) break;
          received += value.byteLength;
          const shown = received;
          setState((s) => ({ ...s, received: shown, total, liveBytes: true }));
        }

        if (condition === "slow3g") {
          // Same real bytes, paced to a labelled 3G rate so the loading
          // phase is long enough to watch — and to poke.
          const durationMs = received / SLOW_3G_BYTES_PER_MS;
          const paceFrom = performance.now();
          const pace = () => {
            if (token !== loadToken.current) return;
            const elapsed = performance.now() - paceFrom;
            if (elapsed >= durationMs) {
              finish(received, true);
              return;
            }
            setState((s) => ({
              ...s,
              received: Math.round((elapsed / durationMs) * received),
              total: received,
              liveBytes: true,
            }));
            raf.current = requestAnimationFrame(pace);
          };
          raf.current = requestAnimationFrame(pace);
          return;
        }

        finish(received, true);
      } catch {
        // Blocked, offline, or cross-origin. Fall back to the build-time
        // measurement and stop claiming a live byte count.
        finish(fallbackBytes, false);
      }
    })();
  }, [assetUrl, fallbackBytes, condition]);

  useEffect(() => {
    startLoad();
    return () => {
      // loadToken is a plain counter, not a node: bumping it on unmount
      // is exactly what invalidates any fetch or pacing loop still in
      // flight, so reading it here is intended.
      loadToken.current += 1;
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [startLoad]);

  /* --- the running clock, one rAF loop, cancelled on unmount.
     There is no win condition here and no run length. What runs in the
     frame is the shipped build, which owns its own scoring and its own
     end card; this clock only measures how long the visitor has had it
     open, which is the one thing about the run we can honestly see from
     outside the file. ------------------------------------------------ */
  useEffect(() => {
    if (state.phase !== "running") return;
    let frame = 0;
    const tick = () => {
      if (runStart.current !== null) {
        const elapsed = performance.now() - runStart.current;
        setState((s) => (s.phase === "running" ? { ...s, elapsedMs: elapsed } : s));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [state.phase]);

  /* --- interaction -------------------------------------------------- */

  /** A tap on the frame does a different thing per phase. Once the real
   *  build is mounted the frame stops intercepting: taps belong to the
   *  file from then on. */
  const tapFrame = useCallback(() => {
    setState((s) => {
      if (s.phase === "loading") {
        // The poke is real: pokes are counted and displayed.
        return { ...s, pokes: s.pokes + 1, hopKey: s.hopKey + 1 };
      }
      if (s.phase === "ready") {
        runStart.current = performance.now();
        return { ...s, phase: "running", elapsedMs: 0 };
      }
      return s;
    });
  }, []);

  const progressPct =
    state.phase === "loading"
      ? Math.max(3, Math.min(100, (state.received / Math.max(1, state.total)) * 100))
      : 100;

  return {
    ...state,
    progressPct,
    tapFrame,
    reload: startLoad,
  };
}
