import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import DemoCard from "../components/DemoCard";
import { RuleGrid, Section } from "../components/blocks";
import CtaBand from "../components/ui/CtaBand";
import PricingTier from "../components/ui/PricingTier";
import { MetricChip } from "../components/ui/Metric";
import { sourced } from "../content/metrics";
import {
  caseMetrics,
  commitments,
  ctaBand,
  hero,
  hurts,
  needNote,
  valueMap,
  weNeed,
} from "../content/studios";
import { tiers } from "../content/pricing";
import { demos } from "../data/demos";

/**
 * /for-game-studios — wireframe `2a`.
 *
 * Renamed from /for-studios on 2026-08-20 to match the sitemap. The
 * old path redirects; it was indexed.
 *
 * DELIBERATELY NOT A SECOND HERO. It shares zero markup with the
 * homepage hero: no device frame, no stage, no atmosphere. A reader
 * arrives here having already chosen a lane, and a second full-height
 * hero makes them pay the entrance fee twice. The opener is a headline,
 * a line of prose, and a card that routes them onward.
 *
 * RHYTHM. Card grids and a table, against /for-brands' full-width
 * labelled rows. The two audience pages are the same components at
 * different tempos, which is what makes them feel like two pages
 * rather than one page with the nouns swapped.
 */
const workflow = [
  {
    title: "You keep the repository",
    body: "Source, sprite originals and the spec sheet, including the variants that lost.",
  },
  {
    title: "One thread, one owner",
    body: "No account layer between you and the person writing the code.",
  },
  {
    title: "Your loop, not a template",
    body: "We play the build first and pick the mechanic that survives eight seconds.",
  },
  {
    title: "Weekly link, not a zip",
    body: "Every build lands as a URL you can open on a phone in the meeting.",
  },
];

export default function ForGameStudios() {
  /* The centrepiece is a real build or it is nothing. */
  const [featured, ...secondary] = demos;
  const liveCaseMetrics = sourced(caseMetrics);

  /* `2a` chips six genres we have not shipped. These come off the
     library instead, so the list can only ever name work that exists. */
  const genres = [...new Set(demos.map((d) => d.format))].sort();

  const single = tiers.find((t) => t.id === "single");
  const retainer = tiers.find((t) => t.id === "retainer");

  return (
    <main className="main">
      <Seo
        title="Playable Ads for Game Studios | QQ Advertisement"
        description="We play your game first, then build an ad that feels like it — not a mini-game wearing your art. Under 2 MB, tested on Meta, TikTok and Google Ads, and you keep the source."
        path="/for-game-studios"
      />

      {/* 1 · Compact opener — no device frame. The playables live
          inside the case study below, where they prove something. */}
      <Section padBlock={[40, 40]} labelledBy="studios-head">
        <div className="opener">
          <div>
            <p className="hero__kicker" data-reveal>
              {hero.kicker}
            </p>
            <h1
              id="studios-head"
              className="t-display t-display-sm t-display-2xl-at-desktop"
              style={{ maxInlineSize: "20ch", marginBlockEnd: 20 }}
              data-reveal
            >
              {hero.title}
            </h1>
            <p
              className="t-body-md t-body-lg-at-desktop c-body"
              style={{ maxInlineSize: "52ch" }}
              data-reveal
            >
              {hero.lede}
            </p>
          </div>

          <div className="hurt" data-reveal>
            <p className="hurt__head t-mono t-mono-2xs u-upper">Where does it hurt?</p>
            <ul className="hurt__chips">
              {hurts.map((h) => (
                <li key={h.to}>
                  <a className="hurt__chip t-body-sm" href={h.to}>
                    {h.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="t-mono t-mono-2xs c-muted">Each one goes to the section that answers it.</p>
          </div>
        </div>
      </Section>

      {/* 2 · Value map. The right column NAMES the metric; it does not
          claim a number for it. That is what makes it publishable. */}
      <Section id="value-map" padBlock={[0, 48]} labelledBy="map-head" className="section--rule">
        <div className="section-head" style={{ marginBlockEnd: 24 }}>
          <p className="section-head__kicker t-mono t-mono-xs">
            Value map · your funnel stage → what we hand you
          </p>
          <h2 id="map-head" className="t-display t-display-2xs t-display-lg-at-desktop">
            What you get, by where you are
          </h2>
        </div>

        <div className="ladder" data-reveal>
          {valueMap.map((row) => (
            <div className="ladder__row" key={row.stage}>
              <p className="ladder__label t-mono t-mono-2xs u-upper">{row.stage}</p>
              <p className="ladder__claim t-body-md">{row.get}</p>
              <MetricChip>{row.metric}</MetricChip>
            </div>
          ))}
        </div>
      </Section>

      {/* 3 · The centrepiece. `2a` puts before/after CPI, IPM and D7
          ROAS here plus a spend curve; none of those numbers exist yet
          (docs/rebuild-audit.md §6.2), so the section leads with the
          build itself and the pairs appear as they are signed off. */}
      {featured ? (
        <Section id="case" padBlock={[0, 48]} labelledBy="case-head">
          <div className="section-head-row" style={{ marginBlockEnd: 26 }}>
            <h2 id="case-head" className="t-display t-display-2xs t-display-lg-at-desktop">
              Play the build, then read what it cost
            </h2>
            <Link className="section-head-row__note t-mono t-mono-xs u-upper" to="/work">
              More builds →
            </Link>
          </div>

          {liveCaseMetrics.length ? (
            <div className="metric-row" style={{ marginBlockEnd: 26 }} data-reveal>
              {liveCaseMetrics.map((m) => (
                <div className="metric-big" key={m.label}>
                  <p className="metric-big__value t-display">
                    {m.before ? <s className="metric-big__before">{m.before}</s> : null}
                    {m.value}
                  </p>
                  <p className="metric-big__label t-mono t-mono-2xs u-upper">{m.label}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="build-grid" data-reveal>
            <DemoCard demo={featured} />
            {secondary.map((d) => (
              <DemoCard key={d.slug} demo={d} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* 4 · What we've built, beside what we need from you */}
      <Section padBlock={[0, 48]} labelledBy="need-head">
        <div className="opener">
          <div>
            <h2 className="spec-group__head">Formats we've shipped</h2>
            <ul className="genre-chips" style={{ marginBlockStart: 16 }}>
              {genres.map((g) => (
                <li key={g}>
                  <MetricChip>{g}</MetricChip>
                </li>
              ))}
            </ul>
            <p className="t-body-sm c-body" style={{ marginBlockStart: 18, maxInlineSize: "40ch" }}>
              Every one of these is in the library and runs in your browser. We name formats we have
              built, not genres we could.
            </p>
            <p className="t-body-sm" style={{ marginBlockStart: 14 }}>
              <Link className="link-inline" to="/for-game-studios/testing">
                How we run a creative test →
              </Link>
            </p>
          </div>

          <div>
            <h2 id="need-head" className="spec-group__head">
              What we need from you
            </h2>
            <ol className="numbered" style={{ marginBlockStart: 16 }}>
              {weNeed.map((item, i) => (
                <li className="numbered__item" key={item.title}>
                  <span className="numbered__num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="numbered__title t-body-lg t-semibold">{item.title}</h3>
                    <p className="numbered__body t-body-sm">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="t-mono t-mono-2xs c-muted u-upper" style={{ marginBlockStart: 14 }}>
              {needNote}
            </p>
          </div>
        </div>
      </Section>

      {/* 5 · Commitment, in writing */}
      <Section
        id="commitment"
        ground="dark"
        bleed
        padBlock={[56, 56]}
        labelledBy="commitment-head"
      >
        <div className="section-head-row" style={{ marginBlockEnd: 26 }} data-reveal>
          <h2
            id="commitment-head"
            className="t-display t-display-2xs t-display-xl-at-desktop c-primary"
          >
            Commitment, in writing
          </h2>
          <p className="section-head-row__note t-mono t-mono-xs c-muted u-upper">
            These are promises
          </p>
        </div>
        <div className="metric-row" data-ground="dark" data-reveal>
          {commitments.map((c) => (
            <div className="metric-big" key={c.label}>
              <p className="metric-big__value t-display">{c.value}</p>
              <p className="metric-big__label t-mono t-mono-2xs u-upper">{c.label}</p>
            </div>
          ))}
        </div>
        {/* The six-day timeline that was repeated here lives on the
            home page, which is the one place it belongs — stating the
            same four steps twice made the second telling read as
            padding. The commitments above are what this page adds. */}
      </Section>

      {/* 6 · How we work */}
      <Section padBlock={[56, 48]} labelledBy="studios-workflow">
        <h2 id="studios-workflow" className="spec-group__head" style={{ marginBlockEnd: 20 }}>
          How we work
        </h2>
        <RuleGrid items={workflow} />
      </Section>

      {/* 7 · The pricing pair */}
      {single && retainer ? (
        <Section padBlock={[0, 52]} labelledBy="studios-price" className="section--rule">
          <h2
            id="studios-price"
            className="t-display t-display-2xs t-display-lg-at-desktop"
            style={{ marginBlockEnd: 24 }}
          >
            Two ways to buy it
          </h2>
          <div className="tier-grid tier-grid--pair" data-reveal>
            <PricingTier tier={single} />
            <PricingTier tier={retainer} />
          </div>
          <p className="t-body-sm c-body" style={{ marginBlockStart: 18 }}>
            <Link className="link-inline" to="/pricing">
              The full rate card
            </Link>{" "}
            covers the campaign pack, the add-ons and what counts as a revision.
          </p>
        </Section>
      ) : null}

      {/* The brief form that sat here moved to /contact on 2026-08-20.
          `2a` and `2b` both end on a CTA band, and the reason is the
          same one that emptied the home page: a lane page's job is to
          get the reader to a decision, not to hold the form as well.
          Every "Get a flat quote" on the site lands on /contact. */}

      <CtaBand title={ctaBand.title} />
    </main>
  );
}
