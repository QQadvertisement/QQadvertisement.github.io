import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import ContactForm from "../components/ContactForm";
import { RuleGrid, Section } from "../components/blocks";
import { SpecList, SpecRow } from "../components/ui/Spec";
import {
  agenciesContact,
  agenciesHero,
  deliverables,
  invisibility,
  operatingNumbers,
  sla,
  tierDefinitions,
  tiers,
  whiteLabel,
} from "../data/agencies";
import { variantVolumeOptions } from "../data/site";

/**
 * /for-agencies — white-label capacity.
 *
 * ZERO TEAL. ZERO BEAR. No playable appears on this page, so neither
 * reserved asset is permitted — including in the footer, where the
 * bear normally sits (App.tsx forces `showBrandMark` false here).
 *
 * The throughput table is the page's spine. An agency buyer's question
 * is not "is this good" but "can you absorb my volume without becoming
 * my problem", and the table answers it in numbers. The SLA block
 * immediately below turns each number into a consequence.
 */
export default function ForAgencies() {
  return (
    <main className="main">
      <Seo
        title="White-Label Playable Ads for UA Agencies | QQ Advertisement"
        description="Concurrent titles, 48-hour variant turns and deliverables under your naming. Retainer throughput, SLA terms and what lands in your drive — the operating numbers a UA agency needs before committing capacity."
        path="/for-agencies"
      />

      {/* 1. Hero */}
      <Section padBlock={[32, 36]} labelledBy="agencies-hero">
        <div className="split split--end" style={{ ["--side" as string]: "460px" }}>
          <div className="split__main">
            <p className="hero__kicker">{agenciesHero.kicker}</p>
            <h1 id="agencies-hero" className="t-display t-display-xs t-display-2xl-at-desktop hero__title">
              {agenciesHero.title.map((line, i) => (
                <span key={line} style={{ display: "block" }}>
                  {line}
                  {i < agenciesHero.title.length - 1 ? null : null}
                </span>
              ))}
            </h1>
            <p className="t-body-lg c-body" style={{ maxInlineSize: "50ch" }}>
              {agenciesHero.lede}
            </p>
          </div>

          <div className="split__side">
            <h2 className="spec-group__head">Current operating numbers</h2>
            <SpecList density="comfortable">
              {operatingNumbers.map((n) => (
                <SpecRow key={n.label} label={n.label} value={n.value} />
              ))}
            </SpecList>
            <div className="btn-pair" style={{ marginBlockStart: 24 }}>
              <a className="btn btn--neutral btn--lg" href="#agencies-contact">
                Request capacity
              </a>
              <Link className="btn btn--muted btn--lg" to="/demos/atta-sync-your-day">
                See a teardown
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Throughput — the page's spine */}
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

      {/* 7. Contact */}
      <Section id="agencies-contact" padBlock={[48, 52]} labelledBy="agencies-contact-head" className="section--rule">
        <div className="split split--wide-gap" style={{ ["--side" as string]: "560px" }}>
          <div className="split__main">
            <h2 id="agencies-contact-head" className="t-display t-display-2xs t-display-lg-at-desktop" style={{ marginBlockEnd: 20 }}>
              {agenciesContact.title.map((l) => (
                <span key={l} style={{ display: "block" }}>
                  {l}
                </span>
              ))}
            </h2>
            <p className="t-body-md c-body" style={{ maxInlineSize: "44ch", marginBlockEnd: 32 }}>
              {agenciesContact.body}
            </p>
            <div style={{ maxInlineSize: 340 }}>
              <SpecList density="compact" variant="top-ruled">
                {agenciesContact.rows.map((r) => (
                  <SpecRow key={r.label} label={r.label} value={r.value} />
                ))}
              </SpecList>
            </div>
          </div>
          <div className="split__side">
            <ContactForm
              variant="agency"
              volumeLabel="Variants / month"
              volumeOptions={variantVolumeOptions}
              detailLabel="Titles in scope"
              detailPlaceholder="Genres are enough if you can't name them yet."
              submitLabel="Request capacity"
              showNetworkChips
            />
          </div>
        </div>
      </Section>
    </main>
  );
}
