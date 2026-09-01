import { Link } from "react-router-dom";
import { BOOKING_URL } from "../../data/site";
import { isApproved, type Price } from "../../content/metrics";

/* ---------------------------------------------------------------
   PRICING TIER — `1f`

   The page's whole argument is "prices, not a contact form", so a
   tier whose price has not been signed off cannot ship as a tier with
   a blank where the price goes — that is a contact form wearing a
   price tag. An unapproved tier renders its inclusions and its CTA
   with the amount omitted and the turnaround promoted in its place,
   which is still a real thing to read.

   See content/metrics.ts for the gate. See docs/rebuild-audit.md §6.2
   for the three prices currently awaiting sign-off.

   ACCENT. The flagged tier is AMBER, and its button stays navy. Amber
   asserts — it is the same job it does on the guarantee band — and the
   button is what gets pressed. Teal on this card would say the card
   itself is interactive, which it is not.
   --------------------------------------------------------------- */

export interface Tier {
  id: string;
  /** "SINGLE PLAYABLE" — mono eyebrow */
  name: string;
  price: Price;
  /** "6-DAY TURNAROUND" — mono, under the price */
  cadence: string;
  inclusions: readonly string[];
  cta: { label: string; to?: string; external?: boolean };
  /** "Most studios pick this" */
  flag?: string;
}

export default function PricingTier({ tier }: { tier: Tier }) {
  const priced = isApproved(tier.price);

  return (
    <article className="tier" data-flagged={tier.flag ? "true" : undefined}>
      {tier.flag ? <p className="tier__flag t-mono t-mono-2xs u-upper">{tier.flag}</p> : null}

      <p className="tier__name t-mono t-mono-xs u-upper">{tier.name}</p>

      {priced ? (
        <p className="tier__price t-display t-display-sm">
          {tier.price.amount}
          {tier.price.unit ? <span className="tier__unit t-body-md">{tier.price.unit}</span> : null}
        </p>
      ) : (
        /* No price yet. The turnaround takes the large slot rather
           than a dash, so the card still leads with something the
           reader wanted to know. */
        <p className="tier__price tier__price--pending t-display t-display-xs">{tier.cadence}</p>
      )}

      <p className="tier__cadence t-mono t-mono-2xs u-upper">
        {priced ? tier.cadence : "Priced per brief"}
      </p>

      <ul className="tier__list t-body-sm">
        {tier.inclusions.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      {tier.cta.external ? (
        <a
          className="btn btn--neutral btn--lg btn--block tier__cta"
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
        >
          {tier.cta.label}
        </a>
      ) : (
        <Link className="btn btn--neutral btn--lg btn--block tier__cta" to={tier.cta.to ?? "/#contact"}>
          {tier.cta.label}
        </Link>
      )}
    </article>
  );
}
