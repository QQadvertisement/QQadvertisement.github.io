import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SpecList, SpecRow } from "./ui/Spec";
import { claims, networks } from "../data/site";

/**
 * Components 5, 6, 10 and 11, plus the two shared grid blocks.
 * Small enough that keeping them together beats five one-export files.
 */

/* ---------------------------------------------------------------
   Component 11 — Network Wall
   The left statement is not a label; it is the claim the chips
   substantiate. Never omit it, and never replace it with "AS SEEN
   ON". Below 1024 it is dropped: at 350px it costs two lines and
   pushes the chips below the fold, so the chips carry it alone.

   Wordmarks are deliberately not used. Six foreign brand marks
   would import six colour systems into a two-colour palette, and
   each needs its own usage rights and clear-space compliance.
   --------------------------------------------------------------- */
export function NetworkWall() {
  return (
    <section className="network-wall" aria-labelledby="network-wall-head">
      <h2 id="network-wall-head" className="u-visually-hidden">
        Networks every build is QA'd against
      </h2>
      <p className="network-wall__claim">{claims.networkWallClaim}</p>
      <ul className="network-wall__list">
        {networks.map((n) => (
          <li className="network-chip" key={n.id}>
            {n.name.toUpperCase()}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------
   Component 5 — Fork Card
   The only navy-filled card on a light ground, which is what makes
   the audience split legible. Never teal: these navigate, they do
   not run anything.

   The action differs by breakpoint on purpose. On desktop the whole
   card is the click target, so a button would be redundant chrome.
   On touch that target is invisible, so a 52px bordered row is the
   affordance.
   --------------------------------------------------------------- */
export function ForkCard({
  kicker,
  title,
  body,
  action,
  to,
}: {
  kicker: string;
  title: string;
  body: string;
  action: string;
  to: string;
}) {
  return (
    <Link className="fork-card" to={to}>
      <span className="fork-card__kicker u-upper">{kicker}</span>
      <span className="fork-card__title t-display t-display-2xs">{title}</span>
      <span className="fork-card__body t-body-md">{body}</span>
      <span className="fork-card__action">
        <span className="fork-card__link">
          {action}
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </span>
        <span className="btn btn--outline-on-ground btn--between fork-card__btn" style={{ blockSize: 52, inlineSize: "100%" }}>
          {action}
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </span>
      </span>
    </Link>
  );
}

/* ---------------------------------------------------------------
   Component 6 — Process Step
   Presence comes from the rule's weight, not from a number badge or
   an icon. Step 1's rule is the emphasis and the only progress
   signal: there is no active or complete state, because the
   component describes a process, not a user's position in one.

   On navy, the duration is set in --color-action-playable-measure.
   That is a documented exception to teal-as-text: durations on this
   band are contractual measured commitments, the same claim class
   as the runtime readouts.
   --------------------------------------------------------------- */
export function ProcessSteps({
  steps,
}: {
  steps: readonly { duration: string; title: string; body: string }[];
}) {
  return (
    <ol className="process">
      {steps.map((s) => (
        <li className="process__step" key={s.title}>
          <p className="process__duration u-upper">{s.duration}</p>
          <h3 className="process__title t-body-lg t-semibold">{s.title}</h3>
          <p className="process__body t-body-xs">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------
   Numbered top-rule grid — "What we build", "What lands in your drive"
   --------------------------------------------------------------- */
export function RuleGrid({
  items,
}: {
  items: readonly { title: string; body: string }[];
}) {
  return (
    <ol className="rule-grid">
      {items.map((item, i) => (
        <li className="rule-grid__item" key={item.title}>
          <p className="rule-grid__num">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="rule-grid__title t-body-lg t-semibold">{item.title}</h3>
          <p className="rule-grid__body t-body-xs">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------
   Component 10 — Guarantee Block
   A paper panel inset into a navy band, overlapping its upper edge.
   The overlap is the component's whole visual argument: the promise
   breaks out of the section that contains it.

   Below 1024 the three-up stat grid becomes spec rows. That is a
   component substitution, not a reflow — three side-by-side stats
   at 350px would each get 110px and "<2 MB" would wrap.
   --------------------------------------------------------------- */
export function GuaranteeBlock() {
  const g = claims.guarantee;
  return (
    <section className="guarantee-band section" aria-labelledby="guarantee-head">
      <div className="guarantee">
        <p className="guarantee__kicker u-upper">{g.kicker}</p>
        <h2 id="guarantee-head" className="guarantee__title t-display t-display-2xs t-display-lg-at-desktop">
          {g.title}
        </h2>
        <p className="guarantee__body t-body-md">{g.body}</p>
        <div className="guarantee__stats">
          {g.stats.map((s) => (
            <div className="guarantee__stat" key={s.value}>
              <span className="guarantee__value t-display-3xs t-numeral-at-desktop">{s.value}</span>
              <span className="spec-row__leader" aria-hidden="true" />
              <span className="guarantee__caption u-upper">{s.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   The contact block's reply commitments, shown as spec rows.
   --------------------------------------------------------------- */
export function ReplyRows({ rows }: { rows: readonly { label: string; value: string }[] }) {
  return (
    <div style={{ maxInlineSize: 340 }}>
      <SpecList density="compact" variant="top-ruled">
        {rows.map((r) => (
          <SpecRow key={r.label} label={r.label} value={r.value} />
        ))}
      </SpecList>
    </div>
  );
}

/** Section wrapper that states its own rhythm — there is deliberately
 *  no single default, because uniform section padding is a regression
 *  against the design. */
export function Section({
  id,
  ground,
  bleed = false,
  padBlock,
  labelledBy,
  className = "",
  atmosphere,
  children,
}: {
  id?: string;
  ground?: "dark" | "deep" | "sunken";
  bleed?: boolean;
  /** [top, bottom] in px — drawn from --rhythm-sm/md/lg/xl */
  padBlock: [number, number];
  labelledBy?: string;
  className?: string;
  /** Rendered as a direct child, OUTSIDE .wrap, so the field spans the
   *  full bleed rather than being capped to the content column. */
  atmosphere?: ReactNode;
  children: ReactNode;
}) {
  const groundClass = ground ? ` ground-${ground}` : "";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`section${groundClass} ${className}`}
      style={{ paddingBlock: `${padBlock[0]}px ${padBlock[1]}px` }}
    >
      {atmosphere}
      <div className={bleed ? "wrap wrap--bleed" : "wrap"}>{children}</div>
    </section>
  );
}
