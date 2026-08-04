import type { ReactNode } from "react";

/**
 * Component 4 — Spec Row.
 *
 * The most-used component in the system and the motif that carries the
 * brand: a label, a dotted leader, a value. The leader is the row's own
 * dotted border plus a flex spacer — never `::after` with repeating dot
 * characters, because the border survives text reflow and zoom.
 *
 * A run of rows is a description list. Three or more columns is a real
 * <table> instead (see the compliance and throughput tables).
 */

export type Density = "comfortable" | "compact" | "dense";

export function SpecList({
  density = "comfortable",
  variant,
  live,
  className = "",
  children,
  ...rest
}: {
  density?: Density;
  /** `closed` ends the group on a solid rule (a closed table);
   *  `ruled` opens it with one. Open groups end on nothing. */
  variant?: "closed" | "ruled" | "top-ruled";
  /** aria-live goes on the group, never on each row, and must not
   *  steal focus. */
  live?: boolean;
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDListElement>) {
  return (
    <dl
      className={`spec-list spec-list--${density}${
        variant ? ` spec-list--${variant}` : ""
      } ${className}`}
      {...(live ? { "aria-live": "polite" as const } : {})}
      {...rest}
    >
      {children}
    </dl>
  );
}

export function SpecRow({
  label,
  value,
  qualifier,
  live = false,
}: {
  label: ReactNode;
  value: ReactNode;
  qualifier?: ReactNode;
  /** Live/measured values render in --color-action-playable-measure.
   *  Requires a navy ground — never live-teal on light. */
  live?: boolean;
}) {
  return (
    <div className={`spec-row${live ? " spec-row--live" : ""}`}>
      <dt className="spec-row__label">{label}</dt>
      <span className="spec-row__leader" aria-hidden="true" />
      <dd className="spec-row__value">{value}</dd>
      {qualifier ? (
        <dd className="spec-row__qualifier">{qualifier}</dd>
      ) : null}
    </div>
  );
}

/** A spec group with a heading. The heading owns the 2px bottom rule,
 *  which is why the first row carries no top border. */
export function SpecGroup({
  head,
  aside,
  children,
  className = "",
}: {
  head: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`spec-group ${className}`}>
      <h3 className="spec-group__head">
        <span>{head}</span>
        {aside ? <span>{aside}</span> : null}
      </h3>
      {children}
    </section>
  );
}
