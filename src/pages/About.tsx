import { Link } from "react-router-dom";
import Seo, { breadcrumbsJsonLd } from "../components/Seo";
import { RuleGrid, Section } from "../components/blocks";
import { SpecList, SpecRow } from "../components/ui/Spec";
import { BOOKING_URL } from "../data/site";

/**
 * /about — not comped, rebuilt from comped components.
 *
 * Voice note: the brief forbids stating headcount anywhere, so the old
 * copy's "three people" / "three specialists" framing is gone. Naming
 * who does the work is still fair game and still the strongest thing
 * on the page — it is the count-as-a-selling-point that the brief
 * rules out, not the people.
 */
const crafts = [
  {
    title: "Game feel",
    body: "Whether the loop is worth playing for eight seconds, and which beat carries it.",
  },
  {
    title: "Shipping code",
    body: "One file, no framework, under the cap, passing every network's spec sheet.",
  },
  {
    title: "The numbers",
    body: "What the ad is judged on after it leaves — and what a variant is actually testing.",
  },
  {
    title: "One thread",
    body: "You talk to the person writing the code. There is no account layer to route through.",
  },
];

export default function About() {
  return (
    <main className="main">
      <Seo
        title="About QQ Advertisement — Playable Ads Studio for AI & Consumer Apps"
        description="QQ Advertisement is a builder-first playable ads studio in Flushing, Queens. Custom HTML5 builds, not templates, for consumer app and AI startup user acquisition — and every number we publish is read off the shipped file."
        path="/about"
        jsonLd={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <Section padBlock={[32, 40]} labelledBy="about-head">
        <div className="split split--end" style={{ ["--side" as string]: "420px" }}>
          <div className="split__main">
            <p className="hero__kicker">About · Flushing, Queens</p>
            <h1
              id="about-head"
              className="t-display t-display-xs t-display-2xl-at-desktop"
              style={{ marginBlockEnd: 24 }}
            >
              <span style={{ display: "block" }}>A playable ad is</span>
              <span style={{ display: "block" }}>three crafts wearing</span>
              <span style={{ display: "block" }}>one file extension.</span>
            </h1>
            <p className="t-body-lg c-body" style={{ maxInlineSize: "50ch" }}>
              It is a game, a piece of production software, and a performance ad at the same time.
              Most shops are genuinely good at one of those and quietly outsource the other two —
              and you can usually tell which one by playing the ad.
            </p>
          </div>
          <div className="split__side">
            <h2 className="spec-group__head">Where we sit</h2>
            <SpecList density="comfortable">
              <SpecRow label="Based" value="Flushing, Queens" />
              <SpecRow label="Networks QA'd" value="6" />
              <SpecRow label="Build stack" value="Hand-coded HTML5" />
              <SpecRow label="Frameworks" value="None" />
              <SpecRow label="Source ownership" value="Client's" />
            </SpecList>
            <div className="btn-pair" style={{ marginBlockStart: 24 }}>
              <Link className="btn btn--neutral btn--lg" to="/demos">
                Play the work
              </Link>
              <a className="btn btn--muted btn--lg" href={BOOKING_URL} target="_blank" rel="noreferrer">
                Book a call
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section padBlock={[0, 56]} labelledBy="crafts-head">
        <div className="section-head-row" style={{ marginBlockEnd: 24 }}>
          <h2 id="crafts-head" className="t-display t-display-2xs t-display-md-at-desktop">
            What we're actually good at
          </h2>
          <p className="section-head-row__note t-mono t-mono-xs c-muted u-upper">
            Four crafts · one file
          </p>
        </div>
        <RuleGrid items={crafts} />
      </Section>

      <Section ground="dark" bleed padBlock={[56, 60]} labelledBy="who-head">
        <div className="offset offset--prose">
          <h2 id="who-head" className="offset__label">
            Who we work with
          </h2>
          <div className="offset__body">
            <p className="t-quote t-quote-at-desktop c-primary" style={{ fontSize: 21, marginBlockEnd: 18 }}>
              Consumer app founders, AI startups and mobile teams buying user acquisition — the ones
              who want creative built around their core loop, shipped while the hypothesis is still
              warm.
            </p>
            <p className="t-body-md c-body" style={{ lineHeight: 1.65 }}>
              When someone runs your app's core loop for ten seconds before tapping Download, the
              install you paid for is pre-qualified: they already know what they're getting. That
              shows up as higher-intent installs and retention curves that start honest. The long
              version is in{" "}
              <Link className="link-inline" to="/playable-ads-explained">
                Playables 101
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section padBlock={[56, 64]} labelledBy="people-head">
        <div className="split" style={{ ["--side" as string]: "460px" }}>
          <div className="split__main">
            <p className="hero__kicker">The people</p>
            <h2 id="people-head" className="t-display t-display-2xs t-display-md-at-desktop" style={{ marginBlockEnd: 20 }}>
              You talk to whoever writes the code.
            </h2>
            <p className="t-body-md c-body" style={{ maxInlineSize: "52ch", marginBlockEnd: 24 }}>
              Kevin builds games in Unreal and UEFN. Timo is a software engineer with an AI/ML
              background — work spanning Meta AI, Mercor and Snorkel AI. Ploy does growth marketing
              at a high-growth startup. Whichever third of a playable your question is about, you
              get the person who owns it, in the same thread.
            </p>
            <div style={{ maxInlineSize: 380 }}>
              <SpecList density="compact" variant="top-ruled">
                <SpecRow label="Kevin" value="Game developer · Unreal, UEFN" />
                <SpecRow label="Timo" value="Software engineer · AI/ML" />
                <SpecRow label="Ploy" value="Growth marketing" />
              </SpecList>
            </div>
          </div>
          <div className="split__side">
            <figure style={{ margin: 0 }}>
              <img
                src="/assets/about/Timo-Ploy-Kevin.jpeg"
                alt="Timo, Ploy and Kevin on a rooftop with a city skyline behind them"
                style={{ inlineSize: "100%", borderRadius: "var(--radius-2xl)", display: "block" }}
              />
              <figcaption className="t-body-2xs c-muted" style={{ marginBlockStart: 12 }}>
                <a
                  className="link-inline"
                  href="https://www.linkedin.com/in/thitipun-s/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Timo
                </a>
                ,{" "}
                <a
                  className="link-inline"
                  href="https://www.linkedin.com/in/ploywongtaladkwon/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ploy
                </a>{" "}
                and{" "}
                <a
                  className="link-inline"
                  href="https://www.linkedin.com/in/jenkaiwang/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Kevin
                </a>
                .
              </figcaption>
            </figure>
          </div>
        </div>
      </Section>

      <Section padBlock={[0, 64]} labelledBy="about-cta" className="section--rule">
        <div style={{ paddingBlockStart: 48 }}>
          <h2 id="about-cta" className="t-display t-display-2xs t-display-lg-at-desktop" style={{ marginBlockEnd: 16 }}>
            Proof beats pitch.
          </h2>
          <p className="t-body-md c-body" style={{ maxInlineSize: "48ch", marginBlockEnd: 24 }}>
            Both published builds run on this site, with the shipped file's measurements next to
            them and the parts we'd change written down.
          </p>
          <div className="btn-pair">
            <Link className="btn btn--neutral btn--lg" to="/demos">
              See the teardowns
            </Link>
            <Link className="btn btn--muted btn--lg" to="/#contact">
              Send us a build
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
