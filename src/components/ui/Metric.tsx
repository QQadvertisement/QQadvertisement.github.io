import { sourced, type Metric } from "../../content/metrics";

/* ---------------------------------------------------------------
   BIG METRIC · METRIC CHIP · PROOF BAR

   The wireframes' single loudest instruction is that metrics get room
   to be large — `1c` sets the proof bar at 40px+ and `1h` puts a floor
   of 34px on the large variant. That floor is enforced in CSS, not
   left to each call site, because the failure mode is a metric quietly
   set at body size inside some other component's grid, where it stops
   being proof and becomes a caption.

   MONO AS CLAIM applies here in an unusual direction. The value is set
   in the DISPLAY face, not mono — these are campaign outcomes, not
   measurements this repository took, and mono on this site means "we
   recorded this". The label under it is mono, because the label is
   what was measured against. Build metrics — bytes, requests, TTI —
   keep coming from measurements.generated.ts and stay in mono.

   Every one of these renders only if its number is signed off. See
   content/metrics.ts for why, and what a source has to look like.
   --------------------------------------------------------------- */

export function BigMetric({ metric }: { metric: Metric & { value: string } }) {
  return (
    <div className="metric-big">
      <p className="metric-big__value t-display">{metric.value}</p>
      <p className="metric-big__label t-mono t-mono-2xs u-upper">{metric.label}</p>
    </div>
  );
}

/**
 * The proof bar, and every other row of large metrics.
 *
 * Renders nothing at all when no metric in the set has been signed
 * off — not an empty band, not a row of dashes. A proof section with
 * nothing to prove is worse than no section, and a placeholder dash
 * invites someone to fill it in later without a source.
 */
export function MetricRow({
  metrics,
  className,
}: {
  metrics: readonly Metric[];
  className?: string;
}) {
  const live = sourced(metrics);
  if (!live.length) return null;
  return (
    <div className={["metric-row", className].filter(Boolean).join(" ")}>
      {live.map((m) => (
        <BigMetric key={m.label} metric={m} />
      ))}
    </div>
  );
}

/**
 * The small pill on a card — "+41% IPM", "Meta". Two kinds:
 * `metric` carries a signed-off number, `tag` carries a fact about the
 * build (network, vertical, format) which needs no source because it
 * is not a claim about performance.
 */
export function MetricChip({
  children,
  variant = "tag",
}: {
  children: React.ReactNode;
  variant?: "metric" | "tag";
}) {
  return (
    <span className="metric-chip t-mono t-mono-2xs u-upper" data-variant={variant}>
      {children}
    </span>
  );
}

/** Chips for a card, unsigned ones dropped. */
export function MetricChips({ metrics }: { metrics: readonly Metric[] }) {
  const live = sourced(metrics);
  if (!live.length) return null;
  return (
    <>
      {live.map((m) => (
        <MetricChip key={m.label} variant="metric">
          {m.value} {m.label}
        </MetricChip>
      ))}
    </>
  );
}
