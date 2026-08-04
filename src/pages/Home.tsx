import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Atmosphere from "../components/Atmosphere";
import ContactForm from "../components/ContactForm";
import DemoCard, { NdaCard } from "../components/DemoCard";
import Faq from "../components/ui/Faq";
import PlayableFrame from "../components/PlayableFrame";
import {
  ForkCard,
  GuaranteeBlock,
  NetworkWall,
  ProcessSteps,
  RuleGrid,
  Section,
} from "../components/blocks";
import { SpecList, SpecRow } from "../components/ui/Spec";
import { usePlayable } from "../hooks/usePlayable";
import useScrollProgress from "../hooks/useScrollProgress";
import { buildVolumeOptions, claims, faqs, networks } from "../data/site";
import { demos, mb } from "../data/demos";
import { measurements } from "../data/measurements.generated";
import { KNEAD_URL } from "../data/playables";

const whatWeBuild = [
  { title: "Playable ads", body: "Portrait and landscape from one build, network-conditional at runtime." },
  { title: "Interactive end cards", body: "Video-to-playable handoff without a second load or a white flash." },
  { title: "Variant sets", body: "Hook, tutorial and end-card splits, built as one file with flags." },
  { title: "Localisation", body: "Copy, layout and font swaps per market at the same file weight." },
];

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
 * Teal census for this page: 3.
 *   1. hero phone play button (with the loader rule and focus ring on
 *      the same playable surface)
 *   2. the one `play` demo card's button
 *   3. the live readouts on the hero's measured panel
 * The nav CTA, "See all demos", the TEARDOWN → card and the form
 * submit are all neutral. They lead to a playable; they are not one.
 *
 * The stage's shader bloom (Atmosphere.tsx) is NOT a fourth region:
 * it is held below the amplitude at which it reads as a coloured
 * area rather than as light. See that file's header before raising
 * tealGain.
 */
export default function Home() {
  /* The hero runs the house demo, so the hero measures the house demo.
     The loader fetches the same file the frame is about to run. */
  const knead = measurements.knead;
  const playable = usePlayable({ assetUrl: KNEAD_URL, fallbackBytes: knead.bytes });
  const { ref: scrollerRef, width, offset } = useScrollProgress();

  return (
    <main className="main">
      <Seo
        title="Playable Ads for Mobile App User Acquisition | QQ Advertisement"
        description="Custom HTML5 playable ads for Meta, TikTok, AppLovin, Unity, ironSource and Mintegral. We design and code the ad, not a template — and every number on a demo page is read off the shipped file."
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
            Custom HTML5 playables · New York
          </p>

          <div className="hero__playable" data-reveal style={{ ["--reveal-i" as string]: 1 }}>
            <div className="hero__phone-abs">
              <PlayableFrame
                playable={playable}
                game="knead"
                buildName="READY, SET, KNEAD"
                ariaBuildName="Ready, Set, Knead"
              />

              {/* The comp floats these measurements on a navy card
                  overlapping the text column. In this build that card
                  landed on top of the network table and hid it, so the
                  claim stays and the collision goes: the strip sits
                  under the phone, at every width, aligned to the frame
                  it describes.

                  "Aligned to the frame it describes" is the whole rule
                  here. These numbers are the HOUSE DEMO's, because the
                  house demo is what is playing above them. Printing the
                  Atta unit's 25.5 KB under a frame running something
                  else would be the same lie in a nicer typeface — the
                  client build's numbers live on its own card and its
                  teardown, where that build is the thing on screen.

                  Weight is the total: document plus the sprites it
                  pulls. The document alone is 9 KB and quoting that
                  would be flattery. */}
              <div className="hero__measured">
                <p className="hero__measured-label">Measured, not claimed</p>
                <dl className="hero__phone-stats">
                  <div className="hero__phone-stat">
                    <dt>Weight</dt>
                    <dd>{mb(knead.totalBytes)}</dd>
                  </div>
                  <div className="hero__phone-stat">
                    <dt>Sprites</dt>
                    <dd>{mb(knead.assetBytes)}</dd>
                  </div>
                  <div className="hero__phone-stat">
                    <dt>Requests</dt>
                    <dd>{knead.requests}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="hero__text">
            <h1
              id="hero-title"
              className="hero__title t-display t-display-sm t-display-3xl-at-desktop"
              data-reveal
              style={{ ["--reveal-i" as string]: 1 }}
            >
              Playables that survive the first eight seconds.
            </h1>
            <p
              className="hero__lede t-body-md t-body-lg-at-desktop"
              style={{ maxInlineSize: "41ch", ["--reveal-i" as string]: 2 }}
              data-reveal
            >
              We design and code the ad, not a template. Every build ships under 2&nbsp;MB,
              interactive inside the first second, and QA'd against each network's spec before it
              leaves.
            </p>
            <div
              className="hero__actions btn-pair"
              data-reveal
              style={{ ["--reveal-i" as string]: 3 }}
            >
              <Link className="btn btn--on-ground btn--xl" to="/demos">
                See all demos{" "}
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <span className="t-body-xs c-body">
                or{" "}
                <a className="link-inline" href="#contact">
                  send us the build
                </a>
              </span>
            </div>

            <div className="hero__specs" data-reveal style={{ ["--reveal-i" as string]: 4 }}>
              <h2 className="spec-group__head">Shipped and QA'd against</h2>
              <SpecList density="compact">
                {networks.slice(0, 5).map((n) => (
                  <SpecRow key={n.id} label={n.name} value={n.spec} />
                ))}
              </SpecList>
            </div>
          </div>
        </div>
      </Section>

      {/* 2 · Network wall — full bleed */}
      <NetworkWall />

      {/* 3 · Gallery — the cards run off the right edge on purpose */}
      <Section bleed padBlock={[68, 22]} labelledBy="gallery-head">
        <div className="section-head-row" data-reveal>
          <div className="section-head">
            <p className="section-head__kicker t-mono t-mono-xs">
              Selected builds · {String(demos.length).padStart(2, "0")}
            </p>
            <h2 id="gallery-head" className="t-display t-display-2xs t-display-xl-at-desktop">
              Play them. They're the real files.
            </h2>
          </div>
          <p className="section-head-row__note t-body-sm" style={{ maxInlineSize: "34ch" }}>
            Not video captures. The same HTML that ran on the network, weight and timing included.
          </p>
        </div>
      </Section>

      {/* The reveal sits on the scroller's wrapper, not on each card:
          the cards live on a horizontal axis, so staggering them would
          animate the off-screen ones where nobody sees it and leave
          the first one arriving alone. */}
      <div style={{ paddingBlockEnd: 72 }} data-reveal>
        <div className="scroller" ref={scrollerRef}>
          {demos.map((d) => (
            <DemoCard key={d.slug} demo={d} />
          ))}
          <NdaCard />
        </div>
        <div className="scroll-progress">
          <span className="t-mono t-mono-2xs c-muted u-upper">
            Swipe · {String(demos.length).padStart(2, "0")} builds
          </span>
          <span className="scroll-progress__track">
            <span
              className="scroll-progress__thumb"
              style={{ inlineSize: `${width}%`, transform: `translateX(${offset}%)` }}
            />
          </span>
        </div>
      </div>

      {/* 4 · The fork — both cards must be co-visible without scrolling */}
      <Section padBlock={[0, 64]} labelledBy="fork-head">
        <h2 id="fork-head" className="u-visually-hidden">
          Who we work with
        </h2>
        <div className="fork" data-reveal>
          <ForkCard
            kicker="01 · You make the game"
            title="I'm a game studio"
            body="We read your core loop and build a playable that keeps the mechanic honest — not a mini-game wearing your art."
            action="For Studios"
            to="/for-studios"
          />
          <ForkCard
            kicker="02 · You buy the media"
            title="I'm a UA agency"
            body="Concurrent titles, 48-hour variant turns, delivered under your brand. We stay invisible to your client."
            action="For Agencies"
            to="/for-agencies"
          />
        </div>
      </Section>

      {/* 5 · What we build */}
      <Section id="what-we-build" padBlock={[0, 60]} labelledBy="build-head">
        <div className="section-head-row" style={{ marginBlockEnd: 24 }} data-reveal>
          <h2 id="build-head" className="t-display t-display-2xs t-display-xl-at-desktop">
            What we build
          </h2>
          <p className="section-head-row__note t-mono t-mono-xs c-muted u-upper">
            Four formats · one codebase
          </p>
        </div>
        <div data-reveal style={{ ["--reveal-i" as string]: 1 }}>
          <RuleGrid items={whatWeBuild} />
        </div>
      </Section>

      {/* 6 · Process — navy stage, full bleed */}
      <Section
        id="process"
        ground="dark"
        bleed
        className="section--atmos"
        padBlock={[64, 64]}
        labelledBy="process-head"
      >
        <div className="section-head-row" style={{ marginBlockEnd: 26 }} data-reveal>
          <h2 id="process-head" className="t-display t-display-2xs t-display-xl-at-desktop c-primary">
            {claims.processTitle}
          </h2>
          <p className="section-head-row__note t-mono t-mono-xs c-muted u-upper">
            Durations are commitments
          </p>
        </div>
        <div data-reveal style={{ ["--reveal-i" as string]: 1 }}>
          <ProcessSteps steps={claims.process} />
        </div>
      </Section>

      {/* 7 · How we work */}
      <Section padBlock={[60, 64]} labelledBy="how-head">
        <div className="offset offset--prose" data-reveal>
          <h2 id="how-head" className="offset__label">
            How we work
          </h2>
          <div className="offset__body">
            <p className="t-quote t-quote-at-desktop" style={{ fontSize: 21, marginBlockEnd: 18 }}>
              One thread, one build owner, and the source files at the end of it. No account layer
              between you and the person writing the code.
            </p>
            <p className="t-body-md c-body" style={{ lineHeight: 1.65 }}>
              Weekly builds land in your inbox as a link, not a zip. Feedback goes in one thread and
              gets versioned. When the campaign ends you keep the repository, the sprites and the
              spec sheet — including the parts that didn't win, so the next studio you hire doesn't
              retest them.
            </p>
          </div>
        </div>
      </Section>

      {/* 8 · Guarantee — the panel overlaps the navy band above it */}
      <GuaranteeBlock />

      {/* 9 · FAQ */}
      <Section id="faq" padBlock={[44, 64]} labelledBy="faq-head">
        <div style={{ maxInlineSize: 820, marginInline: "auto" }}>
          <h2
            id="faq-head"
            className="t-display t-display-2xs t-display-xl-at-desktop"
            style={{ marginBlockEnd: 24 }}
            data-reveal
          >
            Questions we get weekly
          </h2>
          <div data-reveal style={{ ["--reveal-i" as string]: 1 }}>
            <Faq items={faqs} defaultOpen={0} />
          </div>
        </div>
      </Section>

      {/* 10 · Contact */}
      <Section id="contact" padBlock={[56, 64]} labelledBy="contact-head" className="section--rule">
        <div className="split split--wide-gap" style={{ ["--side" as string]: "560px" }} data-reveal>
          <div className="split__main">
            <h2
              id="contact-head"
              className="t-display t-display-2xs t-display-lg-at-desktop"
              style={{ marginBlockEnd: 16 }}
            >
              <span style={{ display: "block" }}>Send us the build.</span>
              <span style={{ display: "block" }}>We'll send back a plan.</span>
            </h2>
            <p className="t-body-md c-body" style={{ maxInlineSize: "42ch", marginBlockEnd: 28 }}>
              Tell us the title, the networks and the volume. We reply within one business day with
              a mechanic recommendation and a date.
            </p>
            <div style={{ maxInlineSize: 340 }}>
              <SpecList density="compact" variant="top-ruled">
                {claims.replyRows.map((r) => (
                  <SpecRow key={r.label} label={r.label} value={r.value} />
                ))}
              </SpecList>
            </div>
          </div>
          <div className="split__side">
            <ContactForm
              volumeLabel="Monthly build volume"
              volumeOptions={buildVolumeOptions}
              detailLabel="What are you running now?"
              detailPlaceholder="Store link or a build we can play is enough."
              submitLabel="Send brief"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}
