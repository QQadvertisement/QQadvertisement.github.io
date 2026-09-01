import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import DemoCard from "../components/DemoCard";
import WhatWeBuild from "../components/WhatWeBuild";
import CtaBand from "../components/ui/CtaBand";
import { MetricChip, MetricRow } from "../components/ui/Metric";
import { RuleGrid, Section } from "../components/blocks";
import { SpecList, SpecRow } from "../components/ui/Spec";
import {
  deliverables,
  invisibility,
  operatingNumbers,
  sla,
  tierDefinitions,
  tiers,
  whiteLabel,
} from "../data/agencies";
import { BOOKING_URL, QUOTE_HREF } from "../data/site";
import { demos } from "../data/demos";
import {
  ctaBand,
  formats,
  hero,
  heroMetrics,
  ladder,
  withYourAgency,
} from "../content/brands";

/**
 * /for-brands — wireframe `2b`. Replaces /for-agencies.
 *
 * NO BEAR, including in the footer — inherited from the route this
 * replaces (App.tsx forces `showBrandMark` false). The zero-teal half
 * of that old rule does NOT carry over: unlike the agency page, this
 * one runs live playables, and under the widened gate teal marks the
 * thing that responds to the reader.
 *
 * RHYTHM. Deliberately different from /for-studios, which is built out
 * of card grids. This page is full-width labelled rows — the ladder,
 * the throughput table, the SLA. An agency or brand lead reads down a
 * column of commitments; a studio lead scans a shelf of work.
 *
 * The agency material below the fold is the old page, intact. `2b`
 * drew a three-row "works with your agency" block with a rate-card
 * callout, which is the slot the throughput table and SLA hang off.
 */
export default function ForBrands() {
  /* Real builds only. There are no beauty, QSR, auto or streaming
     cases — those are the wireframe's illustrations of verticals we
     have not shipped, and a card invented to fill the grid would be
     the one thing this site does not do anywhere else. */
  const brandDemos = demos.filter((d) => d.audience === "brands");
  const [featured, ...rest] = brandDemos;

  return (
    <main className="main">
      <Seo
        title="Playable Ads for Brands | QQ Advertisement"
        description="Product demos, try-ons and configurators built as single files that run inside the ad slot, instrument every tap, and hand the event data back to the buyer. White-label delivery for agencies."
        path="/for-brands"
      />

      {/* 1 · Opener — no device frame. The playables live inside the
          case studies below, where they prove something. */}
      <Section padBlock={[40, 36]} labelledBy="brands-head">
        <p className="hero__kicker" data-reveal>
          {hero.kicker}
        </p>
        <h1
          id="brands-head"
          className="t-display t-display-sm t-display-2xl-at-desktop"
          style={{ maxInlineSize: "24ch", marginBlockEnd: 20 }}
          data-reveal
        >
          {hero.title}
        </h1>
        <p
          className="t-body-md t-body-lg-at-desktop c-body"
          style={{ maxInlineSize: "58ch" }}
          data-reveal
        >
          {hero.lede}
        </p>

        {/* `2b` puts the metric row inline with the dual CTA. When no
            metric is signed off the row collapses and the CTA pair
            keeps the line to itself, which still reads deliberately. */}
        <div className="brand-hero__foot" data-reveal>
          <MetricRow metrics={heroMetrics} />
          <div className="btn-pair">
            <Link className="btn btn--neutral btn--lg" to={QUOTE_HREF}>
              Get a flat quote
            </Link>
            <a
              className="btn btn--outline btn--lg"
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
            >
              Book a call
            </a>
          </div>
        </div>
      </Section>

      {/* 2 · The value ladder — four full-width rows */}
      <Section padBlock={[0, 48]} labelledBy="ladder-head" className="section--rule">
        <div className="section-head" style={{ marginBlockEnd: 26 }}>
          <p className="section-head__kicker t-mono t-mono-xs">
            The value ladder · what you're actually buying
          </p>
          <h2 id="ladder-head" className="t-display t-display-2xs t-display-lg-at-desktop">
            Four things a playable does that a banner cannot
          </h2>
        </div>

        <div className="ladder" data-reveal>
          {ladder.map((row) => (
            <div className="ladder__row" key={row.label}>
              <p className="ladder__label t-mono t-mono-2xs u-upper">{row.label}</p>
              <p className="ladder__claim t-body-md">{row.claim}</p>
              <MetricChip>{row.metric}</MetricChip>
            </div>
          ))}
        </div>
      </Section>

      {/* 3 · Case studies — the real ones, playable */}
      {featured ? (
        <Section padBlock={[0, 48]} labelledBy="brand-cases-head">
          <div className="section-head-row" style={{ marginBlockEnd: 26 }}>
            <h2
              id="brand-cases-head"
              className="t-display t-display-2xs t-display-lg-at-desktop"
            >
              Play the ones we can publish
            </h2>
            <Link className="section-head-row__note t-mono t-mono-xs u-upper" to="/work">
              Full library →
            </Link>
          </div>
          <div className="build-grid" data-reveal>
            <DemoCard demo={featured} />
            {rest.map((d) => (
              <DemoCard key={d.slug} demo={d} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* 4 · Formats we build, beside the agency block */}
      <Section id="formats" padBlock={[0, 52]} labelledBy="formats-head">
        <div className="opener">
          <div>
            <div className="section-head-row" style={{ marginBlockEnd: 26 }}>
              <h2 id="formats-head" className="t-display t-display-2xs t-display-lg-at-desktop">
                Formats we build
              </h2>
              <Link className="section-head-row__note t-mono t-mono-xs u-upper" to="/for-brands/demos">
                Which one fits →
              </Link>
            </div>
            <WhatWeBuild items={formats} />
          </div>

          <div>
            <h3 className="spec-group__head">{withYourAgency.head}</h3>
            <ul className="hurt__chips" style={{ marginBlockStart: 16 }}>
              {withYourAgency.rows.map((r) => (
                <li className="hurt__chip t-body-sm" key={r}>
                  {r}
                </li>
              ))}
            </ul>
            <div className="rate-card">
              <p className="t-body-md t-semibold">{withYourAgency.rateCard.label}</p>
              <Link className="btn btn--neutral btn--sm" to={QUOTE_HREF}>
                {withYourAgency.rateCard.cta}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 5 · Operating numbers — the spine of the page this replaces */}
      <Section padBlock={[0, 44]} labelledBy="operating-head">
        <h2 id="operating-head" className="spec-group__head">
          Operating numbers
        </h2>
        <div style={{ maxInlineSize: 520 }}>
          <SpecList density="comfortable">
            {operatingNumbers.map((n) => (
              <SpecRow key={n.label} label={n.label} value={n.value} />
            ))}
          </SpecList>
        </div>
      </Section>

      <Section padBlock={[44, 48]} labelledBy="throughput-head" className="section--rule">
        <div className="section-head-row">
          <div className="section-head">
            <p className="section-head__kicker t-mono t-mono-xs">Throughput</p>
            <h2 id="throughput-head" className="t-display t-display-2xs t-display-lg-at-desktop">
              What a month actually looks like
            </h2>
          </div>
          <p className="section-head-row__note t-body-sm">
            Three retainer shapes. The numbers are contractual, not aspirational — miss them and
            the month is credited.
          </p>
        </div>

        {/* Desktop: a real six-column table. */}
        <div className="throughput-table" style={{ marginBlockStart: 34 }}>
          <div className="throughput-head">
            <span className="throughput-col-name">Retainer</span>
            <span className="throughput-col">Titles</span>
            <span className="throughput-col throughput-col--wide">New builds / mo</span>
            <span className="throughput-col throughput-col--wide">Variants / mo</span>
            <span className="throughput-col--flex">Turn · variant</span>
            <span className="throughput-col">Hotfix SLA</span>
          </div>
          {tiers.map((t) => (
            <div className="throughput-row" key={t.name} data-emphasis={t.emphasis ? "true" : undefined}>
              <span className="throughput-col-name">
                <span className="t-body-xl t-semibold" style={{ letterSpacing: "-0.014em" }}>
                  {t.name}
                </span>
                <span className="tier-card__note" style={{ marginBlockStart: 0 }}>
                  {t.note}
                </span>
              </span>
              <span className="throughput-col">{t.titles}</span>
              <span className="throughput-col throughput-col--wide">{t.newBuilds}</span>
              <span className="throughput-col throughput-col--wide">{t.variants}</span>
              <span className="throughput-col--flex">{t.turn.toUpperCase()}</span>
              <span className="throughput-col">{t.hotfix.toUpperCase()}</span>
            </div>
          ))}
        </div>

        {/* Below 900px: three cards. A component substitution, not a
            reflow — six columns cannot survive 350px. */}
        <div className="throughput-cards" style={{ marginBlockStart: 26 }}>
          {tiers.map((t) => (
            <article className="tier-card" key={t.name} data-emphasis={t.emphasis ? "true" : undefined}>
              <div className="tier-card__head">
                <div>
                  <h3 className="t-body-lg t-semibold" style={{ letterSpacing: "-0.014em" }}>
                    {t.name}
                  </h3>
                  <p className="tier-card__note">{t.note}</p>
                </div>
                {t.emphasis ? <span className="tier-card__tag">COMMON</span> : null}
              </div>
              <div className="tier-card__rows">
                <SpecList density="compact">
                  <SpecRow label="Titles" value={t.titles} />
                  <SpecRow label="New builds / mo" value={t.newBuilds} />
                  <SpecRow label="Variants / mo" value={t.variants} />
                  <SpecRow label="Hotfix SLA" value={t.hotfix} />
                </SpecList>
              </div>
            </article>
          ))}
        </div>

        <p className="tier-defs">
          {tierDefinitions.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </p>
      </Section>

      {/* 3. White-label proof */}
      <Section ground="dark" padBlock={[48, 52]} labelledBy="whitelabel-head">
        <div className="section-head-row">
          <div className="section-head">
            <p className="section-head__kicker t-mono t-mono-xs">{whiteLabel.kicker}</p>
            <h2 id="whitelabel-head" className="t-display t-display-2xs t-display-lg-at-desktop c-primary">
              {whiteLabel.title}
            </h2>
          </div>
          <p className="section-head-row__note t-body-sm">{whiteLabel.note}</p>
        </div>

        <div className="nda-grid" style={{ marginBlockStart: 34 }}>
          {whiteLabel.blocks.map((b) => (
            <div className="nda-block" key={b}>
              {b.toUpperCase()}
            </div>
          ))}
        </div>

        <div className="hairline-row" style={{ marginBlockStart: 34 }}>
          <p className="hairline-row__prose t-body-sm c-body">{whiteLabel.prose}</p>
          <div className="hairline-row__cta">
            <Link className="btn btn--on-ground btn--lg btn--block" to={whiteLabel.cta.to}>
              {whiteLabel.cta.label}
            </Link>
          </div>
        </div>
      </Section>

      {/* 4. How we stay invisible */}
      <Section padBlock={[48, 44]} labelledBy="invisible-head">
        <div className="offset">
          <h2 id="invisible-head" className="offset__label">
            How we stay invisible
          </h2>
          <div className="offset__body">
            <ol className="numbered">
              {invisibility.map((item, i) => (
                <li className="numbered__item" key={item.title}>
                  <span className="numbered__num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="numbered__title t-body-xl t-semibold">{item.title}</h3>
                    <p className="numbered__body t-body-sm">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* 5. SLA */}
      <Section padBlock={[0, 48]} labelledBy="sla-head">
        <div className="sla-card">
          <div className="split" style={{ ["--side" as string]: "480px" }}>
            <div className="split__main">
              <p className="hero__kicker">{sla.kicker}</p>
              <h2 id="sla-head" className="t-display t-display-3xs t-display-xs-at-desktop" style={{ maxInlineSize: "22ch", marginBlockEnd: 20 }}>
                {sla.title}
              </h2>
              <p className="t-body-md c-body" style={{ maxInlineSize: "52ch" }}>
                {sla.body}
              </p>
            </div>
            <div className="split__side">
              <h3 className="spec-group__head">The four commitments</h3>
              <SpecList density="comfortable">
                {sla.commitments.map((c) => (
                  <SpecRow key={c.label} label={c.label} value={c.value} />
                ))}
              </SpecList>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. What lands in your drive */}
      <Section padBlock={[0, 52]} labelledBy="drive-head">
        <div className="section-head-row" style={{ marginBlockEnd: 32 }}>
          <h2 id="drive-head" className="t-display t-display-2xs t-display-sm-at-desktop">
            What lands in your drive
          </h2>
          <p className="section-head-row__note t-mono t-mono-xs c-muted u-upper">
            Every build · every time
          </p>
        </div>
        <RuleGrid items={deliverables} />
      </Section>

      {/* The brief form that sat here moved to /contact on 2026-08-20.
          `2a` and `2b` both end on a CTA band, and the reason is the
          same one that emptied the home page: a lane page's job is to
          get the reader to a decision, not to hold the form as well.
          Every "Get a flat quote" on the site lands on /contact. */}

      <CtaBand title={ctaBand.title} />
    </main>
  );
}
