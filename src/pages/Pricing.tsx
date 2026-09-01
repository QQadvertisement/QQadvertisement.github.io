import Seo from "../components/Seo";
import { GuaranteeBlock, Section } from "../components/blocks";
import CtaBand from "../components/ui/CtaBand";
import PricingTier from "../components/ui/PricingTier";
import Faq from "../components/ui/Faq";
import { SpecList, SpecRow } from "../components/ui/Spec";
import { isApproved } from "../content/metrics";
import { addOns, comparison, ctaBand, faqs, header, tiers } from "../content/pricing";

/**
 * /pricing — wireframe `1f`.
 *
 * The page has a problem the wireframe does not: none of its three
 * prices have been signed off, and the headline the wireframe gives it
 * — "Prices, not a contact form" — is a promise the page cannot keep
 * with three blank tiers under it. So the headline is conditional on
 * there being at least one approved price, and the page falls back to
 * explaining what moves a quote, which is true today and is most of
 * what a buyer wants from this page anyway.
 *
 * The us-vs-in-house table is held back entirely until both columns
 * can be sourced. A comparison with a blank left column and "~$6,000
 * loaded" on the right is not a comparison; it is an unsourced attack
 * on the reader's own team, made on the one page where they arrived
 * ready to be sceptical about money.
 */
export default function Pricing() {
  const anyPriced = tiers.some((t) => isApproved(t.price));
  const liveAddOns = addOns.filter((a) => a.approved);

  return (
    <main className="main">
      <Seo
        title="Playable Ad Pricing | QQ Advertisement"
        description="What a custom HTML5 playable costs, what moves the number, and what every build includes: concepts, revisions, variants and per-network QA."
        path="/pricing"
      />

      <Section padBlock={[40, 36]} labelledBy="pricing-head">
        <h1
          id="pricing-head"
          className="t-display t-display-sm t-display-2xl-at-desktop"
          style={{ marginBlockEnd: 20 }}
          data-reveal
        >
          {anyPriced ? header.title : header.fallbackTitle}
        </h1>
        <p
          className="t-body-md t-body-lg-at-desktop c-body"
          style={{ maxInlineSize: "58ch" }}
          data-reveal
        >
          {header.lede}
        </p>
      </Section>

      <Section id="packages" padBlock={[0, 96]} labelledBy="tiers-head">
        <h2 id="tiers-head" className="u-visually-hidden">
          What each engagement includes
        </h2>
        {/* #studios and #brands are published in the sitemap as
            separate addresses. Both lanes buy from the same three
            tiers — there is no studio price and a brand price — so
            they are anchors onto the same grid rather than two grids
            that would have to be kept identical by hand.

            BOTH ANCHORS SIT OUTSIDE THE GRID. An empty <span> inside
            it is still a grid item: it took the first cell, pushed
            every tier one place along and left a hole where the first
            card should be. Anchors are layout-free by definition and
            must never be grid or flex children. */}
        <span id="studios" className="u-anchor" aria-hidden="true" />
        <span id="brands" className="u-anchor" aria-hidden="true" />
        <div className="tier-grid" data-reveal>
          {tiers.map((t) => (
            <PricingTier key={t.id} tier={t} />
          ))}
        </div>
      </Section>

      {liveAddOns.length ? (
        <Section padBlock={[0, 48]} labelledBy="addons-head" className="section--rule">
          <h2 id="addons-head" className="spec-group__head">
            Add-ons
          </h2>
          <SpecList density="compact" variant="top-ruled">
            {liveAddOns.map((a) => (
              <SpecRow key={a.label} label={a.label} value={a.amount} />
            ))}
          </SpecList>
        </Section>
      ) : null}

      {comparison.approved ? (
        <Section padBlock={[0, 52]} labelledBy="compare-head">
          <h2
            id="compare-head"
            className="t-display t-display-2xs t-display-xl-at-desktop"
            style={{ marginBlockEnd: 20 }}
          >
            Us vs building in-house
          </h2>
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col" className="t-mono t-mono-2xs u-upper">
                  Us
                </th>
                <th scope="col" className="t-mono t-mono-2xs u-upper">
                  In-house
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="t-body-sm">
                    {r.label}
                  </th>
                  <td className="t-body-sm">{r.us}</td>
                  <td className="t-body-sm">{r.inHouse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      ) : null}

      {/* The guarantee moved here from the homepage on 2026-08-20,
          when `1b` cut it from `/`. It belongs on this page more than
          it belonged on that one: its three numbers are the terms the
          price is quoted against, so they answer the question this
          page has just raised rather than interrupting a page that had
          not yet mentioned money. */}
      <GuaranteeBlock />

      <Section id="faq" padBlock={[0, 56]} labelledBy="pricing-faq" className="section--rule">
        <h2
          id="pricing-faq"
          className="t-display t-display-2xs t-display-xl-at-desktop"
          style={{ marginBlockEnd: 20 }}
        >
          Pricing questions
        </h2>
        <Faq items={faqs} defaultOpen={0} />
      </Section>

      <CtaBand title={ctaBand.title} />
    </main>
  );
}
