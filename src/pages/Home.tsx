import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Atmosphere from "../components/Atmosphere";
import DemoCard, { NdaCard } from "../components/DemoCard";
import Faq from "../components/ui/Faq";
import PlayableFrame from "../components/PlayableFrame";
import { NetworkWall, Section } from "../components/blocks";
import CtaBand from "../components/ui/CtaBand";
import ForkBand from "../components/ui/ForkBand";
import { MetricRow } from "../components/ui/Metric";
import { usePlayable } from "../hooks/usePlayable";
import { BOOKING_URL, QUOTE_HREF, faqs } from "../data/site";
import {
  ctaBand,
  fork,
  hero as heroCopy,
  howItWorks,
  pricingTeaser,
  proof,
  shelf,
} from "../content/home";
import { tiers } from "../content/pricing";
import { isApproved } from "../content/metrics";
import { demos } from "../data/demos";
import { measurements } from "../data/measurements.generated";
import { KNEAD_URL } from "../data/playables";

/**
 * / — the homepage.
 *
 * Section rhythm here is deliberately uneven and must stay that way:
 * normalising these to one value is a regression against the design.
 *
 * The mobile hero order INVERTS — the playable sits above the headline.
 * That is the single most important mobile decision in the project: it
 * puts the tap target inside thumb reach with no scroll, on a page
 * whose entire proposition is "play it".
 *
 * Teal census for this page: 3 at rest.
 *   1. hero phone play button (with the loader rule and focus ring on
 *      the same playable surface)
 *   2. the one `play` build tile's PLAY affordance — on a pointer
 *      device it only exists while the tile is hovered, so most of
 *      the time the census is 2
 *   3. the live readouts on the hero's measured panel
 * The nav CTA, "See all demos", the TEARDOWN → tile and the form
 * submit are all neutral. They lead to a playable; they are not one.
 *
 * The play lightbox is NOT a fourth region. It is modal: while it is
 * open the page behind it is scrimmed and inert, so its play button
 * (gate 1 again, on the same phone frame) and its measured stats (the
 * documented teal-as-text exception on a dark ground) never share a
 * screen with the three above. Counting it would be counting a
 * different page.
 *
 * The "What we build" sequence deliberately holds NO teal — its
 * figure marks in orange. See WhatWeBuild.tsx and the header of that
 * section in pages.css for why.
 *
 * The stage's shader bloom (Atmosphere.tsx) is NOT a fourth region:
 * it is held below the amplitude at which it reads as a coloured
 * area rather than as light. See that file's header before raising
 * tealGain.
 */
export default function Home() {
  /* The teaser prints a price only once one is approved. `1c` draws
     "From $2,400 per playable"; until that number is real the band
     falls back to the policy. See content/pricing.ts. */
  const cheapest = tiers.find((t) => isApproved(t.price));
  const priceLine = cheapest ? `From ${cheapest.price.amount} per playable` : null;

  /* The hero runs the house demo, so the hero measures the house demo.
     The loader fetches the same file the frame is about to run. */
  const knead = measurements.knead;
  const playable = usePlayable({ assetUrl: KNEAD_URL, fallbackBytes: knead.bytes });

  return (
    <main className="main">
      <Seo
        title="Playable Ads for Mobile App User Acquisition | QQ Advertisement"
        description="Ads people play, not ads people skip. Custom HTML5 playable ads for Meta, TikTok and Google Ads — built by hand, tested on every network before it reaches you."
        path="/"
      />

      {/* 1 · Hero — the navy stage */}
      <Section
        bleed
        ground="dark"
        className="hero-stage section--atmos"
        padBlock={[20, 72]}
        labelledBy="hero-title"
        atmosphere={
          <Atmosphere
            bloomX={0.74}
            bloomY={0.46}
            tealGain={0.1}
            warmX={0.1}
            warmY={0.72}
            warmGain={0.24}
          />
        }
      >
        <div className="hero">
          <p className="hero__kicker" data-reveal>
            {heroCopy.kicker}
          </p>

          <div className="hero__playable" data-reveal style={{ ["--reveal-i" as string]: 1 }}>
            <div className="hero__phone-abs">
              <PlayableFrame
                playable={playable}
                game="knead"
                buildName="READY, SET, KNEAD"
                ariaBuildName="Ready, Set, Knead"
              />

              {/* The weight/sprites/requests strip that used to sit
                  here was removed on 2026-08-05: under the phone it
                  read as a spec sheet bolted to the hero, and the hero
                  now leads with what the ad does rather than what it
                  weighs. The measurements are not lost — they are still
                  live on each demo card and its teardown, where the
                  build being measured is the one on screen, which was
                  always the rule this strip had to obey. */}
            </div>
          </div>

          <div className="hero__text">
            <h1
              id="hero-title"
              className="hero__title t-display t-display-sm t-display-3xl-at-desktop"
              data-reveal
              style={{ ["--reveal-i" as string]: 1 }}
            >
              {heroCopy.title}
            </h1>
            <p
              className="hero__lede t-body-md t-body-lg-at-desktop"
              style={{ maxInlineSize: "41ch", ["--reveal-i" as string]: 2 }}
              data-reveal
            >
              {heroCopy.lede}
            </p>
            <div
              className="hero__actions btn-pair"
              data-reveal
              style={{ ["--reveal-i" as string]: 3 }}
            >
              <Link className="btn btn--accent btn--xl" to={QUOTE_HREF}>
                Get a flat quote
              </Link>
              <a
                className="btn btn--outline-on-ground btn--xl"
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
              >
                Book a call
              </a>
            </div>

            {/* `1b` puts three numbers in the hero, under a hairline,
                and gives the page no proof section at all. The rule is
                drawn by MetricRow's own wrapper rather than here, so a
                fold with nothing signed off does not ship a hairline
                ruling off empty space. See content/metrics.ts.

                The "Where these run" spec list that sat here is gone
                with it: the network strip two sections down says the
                same thing once, which is the point of this pass. */}
            <MetricRow metrics={proof} className="hero__proof" />
          </div>
        </div>
      </Section>

      {/* 2 · The fork band — `1b` §4. The one decision on the screen
          after the hero, made without reading anything else. */}
      <ForkBand lanes={fork} />

      {/* 3 · Network strip */}
      <NetworkWall />

      {/* 4 · Featured work — `1b` §5. Four wider cards in one row,
          with the shelf's depth reported by the link rather than by
          the grid: there are two builds, and a four-column grid with
          two things in it says something the copy would have to
          apologise for. The NDA tile is the third slot and the link
          is the fourth. */}
      <Section padBlock={[56, 56]} labelledBy="gallery-head">
        <div className="section-head-row" data-reveal>
          <h2 id="gallery-head" className="t-display t-display-2xs t-display-xl-at-desktop">
            {shelf.title}
          </h2>
          <Link className="section-head-row__note t-mono t-mono-xs u-upper" to="/work">
            All playables →
          </Link>
        </div>

        <div className="build-grid build-grid--wide" style={{ marginBlockStart: 30 }}>
          {demos.map((d, i) => (
            <div key={d.slug} data-reveal style={{ ["--reveal-i" as string]: i + 1 }}>
              <DemoCard demo={d} />
            </div>
          ))}
          <div data-reveal style={{ ["--reveal-i" as string]: demos.length + 1 }}>
            <NdaCard />
          </div>
        </div>
      </Section>

      {/* The "What we build" pinned sequence that sat here moved to
          /for-brands on 2026-08-20, where `2b` §4 has a section for it
          ("Formats we build") and `1c` has none. It also lost its pin
          on the way — see WhatWeBuild.tsx. */}

      {/* 5 · How it works, sharing its row with the pricing teaser —
          `1b` §6 + §7. They share the row explicitly to keep the page
          short: the reader gets the shape of the engagement and its
          price in one screen instead of two.

          The four-step timeline in site.ts `claims.process` is still
          the canonical one and /for-studios renders it in full. This
          is the same commitment folded to three lines. */}
      <Section id="how-it-works" padBlock={[0, 56]} labelledBy="how-head" className="section--rule">
        <div className="how-row">
          <div>
            <h2
              id="how-head"
              className="t-display t-display-2xs t-display-xl-at-desktop"
              style={{ marginBlockEnd: 24 }}
              data-reveal
            >
              How it works
            </h2>
            <ol className="steps" data-reveal style={{ ["--reveal-i" as string]: 1 }}>
              {howItWorks.map((step, i) => (
                <li className="steps__item" key={step.title}>
                  <span className="steps__num t-mono t-mono-2xs" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="steps__title t-body-lg t-semibold">
                      {step.title} <span className="steps__day t-mono t-mono-2xs u-upper">{step.day}</span>
                    </h3>
                    <p className="steps__body t-body-sm">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* The teaser prints a price only once one is approved.
              `1b` draws "From $2,400"; until that number is real the
              card states the policy, which is true today and is most
              of what this slot is for — the reader learns they will
              not have to sit through a call to find out the number.
              See content/pricing.ts. */}
          <aside className="teaser" data-reveal style={{ ["--reveal-i" as string]: 2 }}>
            <p className="teaser__label t-mono t-mono-2xs u-upper">{pricingTeaser.kicker}</p>
            <p className="teaser__price t-display t-display-xs t-display-sm-at-desktop">
              {priceLine ?? pricingTeaser.fallbackTitle}
            </p>
            <p className="teaser__body t-body-sm">{pricingTeaser.body}</p>
            <div className="btn-pair">
              <Link className="btn btn--accent btn--lg" to="/pricing">
                See pricing
              </Link>
              <Link className="btn btn--outline btn--lg" to={QUOTE_HREF}>
                Get a flat quote
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {/* 6 · FAQ — four rows in two columns, first one open. `1b` cuts
          this to four; the fifth lives on /pricing with the rest of the
          money questions. */}
      <Section id="faq" padBlock={[0, 56]} labelledBy="faq-head">
        <h2 id="faq-head" className="u-visually-hidden">
          Questions we get weekly
        </h2>
        <div data-reveal>
          <Faq items={faqs.slice(0, 4)} defaultOpen={0} columns={2} />
        </div>
      </Section>

      {/* 11 · The closer. Every page ends in one, and it always
          carries both paths. */}
      <CtaBand title={ctaBand.title} variant="secondary" />
    </main>
  );
}
