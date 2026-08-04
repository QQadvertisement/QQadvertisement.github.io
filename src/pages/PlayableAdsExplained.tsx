import { Link } from "react-router-dom";
import Seo, { breadcrumbsJsonLd, SITE_URL } from "../components/Seo";
import { RuleGrid, Section } from "../components/blocks";
import { SpecList, SpecRow } from "../components/ui/Spec";
import { BOOKING_URL } from "../data/site";

/**
 * /playable-ads-explained — not comped. Rebuilt in the system using
 * the offset prose layout, the rule grid and spec rows. The article
 * copy and its JSON-LD are carried over unchanged; only the
 * presentation is new.
 */
const formats = [
  {
    title: "Tap and timing",
    body: "Score-chase loops, instantly legible, one line of tutorial at most.",
  },
  {
    title: "Runners and reflex",
    body: "Effort maps to outcome, with a real win or lose end state.",
  },
  {
    title: "Quiz and personalisation",
    body: "The player answers about themselves, so the end card lands as advice.",
  },
  {
    title: "Product demo",
    body: "A guided interactive slice of the real UI. Common for non-game apps.",
  },
];

export default function PlayableAdsExplained() {
  const jsonLd = [
    breadcrumbsJsonLd([
      { name: "Home", path: "/" },
      { name: "Playable Ads Explained", path: "/playable-ads-explained" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Playable Ads Explained: Definition, Examples, and Best Practices",
      author: { "@type": "Organization", name: "QQ Advertisement", url: SITE_URL },
      publisher: { "@type": "Organization", name: "QQ Advertisement", url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}/playable-ads-explained`,
      description:
        "What playable ads are, how they differ from video and banner ads, why mobile apps use them for user acquisition, and what makes one convert.",
    },
  ];

  return (
    <main className="main">
      <Seo
        title="What Are Playable Ads? Definition, Examples & Best Practices | QQ Advertisement"
        description="Playable ads are interactive HTML5 mini-games that run inside the ad slot. Learn how they work, how they differ from video ads, and why mobile apps use them for user acquisition."
        path="/playable-ads-explained"
        jsonLd={jsonLd}
      />

      <Section padBlock={[32, 40]} labelledBy="p101-head">
        <p className="hero__kicker">Playables 101</p>
        <h1
          id="p101-head"
          className="t-display t-display-xs t-display-2xl-at-desktop"
          style={{ marginBlockEnd: 24, maxInlineSize: "16ch" }}
        >
          Playable ads, explained.
        </h1>
        <p className="t-body-lg c-body" style={{ maxInlineSize: "52ch" }}>
          What they are, why they convert, and what separates a playable that gets played from one
          that gets skipped.
        </p>
      </Section>

      <Section padBlock={[0, 56]} labelledBy="what-head">
        <div className="offset offset--prose">
          <h2 id="what-head" className="offset__label">
            What it is
          </h2>
          <div className="offset__body prose">
            <p className="t-body-md">
              A playable ad is an interactive, sandboxed HTML5 mini-game that runs inside the ad
              slot itself — on Meta, TikTok and most major networks. Instead of watching a video
              about an app, the viewer plays a five-to-fifteen-second slice of it, then lands on an
              end card with one call to action. The whole thing ships as a single self-contained
              file, inside each platform's size cap, so it loads with no install.
            </p>
            <p className="t-body-md">
              You can feel the difference rather than read about it:{" "}
              <Link className="link-inline" to="/demos/atta-sync-your-day">
                Sync Your Day for Atta
              </Link>{" "}
              runs on this site with its shipped file's measurements beside it, and{" "}
              <Link className="link-inline" to="/demos/ramen-slurping-challenge">
                the Ramen Slurping Challenge
              </Link>{" "}
              is live in production.
            </p>
          </div>
        </div>
      </Section>

      <Section ground="dark" bleed padBlock={[56, 60]} labelledBy="vs-head">
        <div className="section-head-row" style={{ marginBlockEnd: 26 }}>
          <h2 id="vs-head" className="t-display t-display-2xs t-display-md-at-desktop c-primary">
            Against the alternatives
          </h2>
          <p className="section-head-row__note t-mono t-mono-xs c-muted u-upper">
            Same slot · different ask
          </p>
        </div>
        <SpecList density="comfortable">
          <SpecRow label="Video" value="Watched passively" qualifier="attention, no action" />
          <SpecRow label="Banner" value="Optimises impressions" qualifier="not intent" />
          <SpecRow label="Interstitial" value="Interrupts" qualifier="then asks nothing" />
          <SpecRow label="Playable" value="Pre-qualifies" qualifier="the loop ran first" />
        </SpecList>
        <p className="t-body-md c-body" style={{ maxInlineSize: "58ch", marginBlockStart: 26 }}>
          The economics of paid UA punish low-intent installs: you pay the CPI either way, but an
          uninformed install churns on day one. A playable moves the "do I actually like this?"
          moment from after the install to before it.
        </p>
      </Section>

      <Section padBlock={[56, 56]} labelledBy="types-head">
        <div className="section-head-row" style={{ marginBlockEnd: 24 }}>
          <h2 id="types-head" className="t-display t-display-2xs t-display-md-at-desktop">
            Four formats that work
          </h2>
          <p className="section-head-row__note t-mono t-mono-xs c-muted u-upper">
            Pick one · not five
          </p>
        </div>
        <RuleGrid items={formats} />
      </Section>

      <Section padBlock={[0, 60]} labelledBy="best-head">
        <div className="offset offset--prose">
          <h2 id="best-head" className="offset__label">
            What makes one convert
          </h2>
          <div className="offset__body prose">
            <ul>
              <li>The first tap teaches the game. If it needs instructions, the mechanic is wrong.</li>
              <li>
                Keep the loop five to fifteen seconds — short enough to finish, because a finished
                loop makes the end card feel earned.
              </li>
              <li>
                Build around the app's one selling mechanic, not a generic template with a logo
                swapped in.
              </li>
              <li>
                Design the end card as carefully as the game: one CTA, a score recap, and a
                friction-free replay.
              </li>
              <li>
                Make losing useful. A losable game reads as a real game, and a replay is more time
                inside your brand.
              </li>
              <li>
                Ship inside platform specs: single-file HTML5, sized for the placement, CTA wired
                to the store link with a webview fallback.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section padBlock={[0, 64]} labelledBy="p101-cta" className="section--rule">
        <div style={{ paddingBlockStart: 48 }}>
          <h2
            id="p101-cta"
            className="t-display t-display-2xs t-display-lg-at-desktop"
            style={{ marginBlockEnd: 16 }}
          >
            Think a playable fits your funnel?
          </h2>
          <p className="t-body-md c-body" style={{ maxInlineSize: "48ch", marginBlockEnd: 24 }}>
            Bring your store listing to a twenty-minute call. If the format isn't right for your
            app, you'll hear that too.
          </p>
          <div className="btn-pair">
            <Link className="btn btn--neutral btn--lg" to="/#contact">
              Send us the build
            </Link>
            <a className="btn btn--muted btn--lg" href={BOOKING_URL} target="_blank" rel="noreferrer">
              Book a call
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
