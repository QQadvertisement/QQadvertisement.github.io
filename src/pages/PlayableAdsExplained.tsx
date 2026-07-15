import { Link } from "react-router-dom";
import Seo, { breadcrumbsJsonLd, SITE_URL } from "../components/Seo";
import { BOOKING_URL } from "../lib/site";

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
    <>
      <Seo
        title="What Are Playable Ads? Definition, Examples & Best Practices | QQ Advertisement"
        description="Playable ads are interactive HTML5 mini-games that run inside the ad slot. Learn how they work, how they differ from video ads, and why mobile apps use them for user acquisition."
        path="/playable-ads-explained"
        jsonLd={jsonLd}
      />

      <main>
        <header className="page-hero">
          <div className="wrap">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <span>Playable Ads Explained</span>
            </nav>
            <div className="sec-head">
              <div className="eyebrow">Playables 101</div>
              <h1 className="h-xl">Playable ads, explained</h1>
              <p className="body-lg muted">
                What they are, why they convert, and what separates a playable that gets played
                from one that gets skipped.
              </p>
            </div>
          </div>
        </header>

        <section aria-label="Playable ads guide">
          <article className="wrap prose">
            <h2>What is a playable ad?</h2>
            <p>
              A playable ad is an interactive, sandboxed HTML5 mini-game that runs inside the ad
              slot itself — on Meta, TikTok, and most major ad networks. Instead of watching a
              video about an app, the viewer plays a 5–15 second slice of it (or a game built
              around its core idea), then lands on an end card with a call to action: download,
              sign up, or visit. The whole experience ships as a single self-contained HTML5
              file, within each platform's size cap, so it loads instantly with no install.
            </p>
            <p>
              Want to feel the difference instead of reading about it? Two of our builds —{" "}
              <Link to="/case-studies/friends-ramen">Knead Rush for Friends Ramen</Link> and{" "}
              <Link to="/case-studies/atta">Sprint to the Finish for Atta</Link> — are live on
              this site.
            </p>

            <h2>How playables differ from video, banner, and interstitial ads</h2>
            <ul>
              <li>
                <span><strong>Video ads</strong> are watched passively — attention without action. A playable demands a tap in the first second, and every tap after that is engagement a static ad never gets.</span>
              </li>
              <li>
                <span><strong>Banners</strong> are wallpaper. They optimize for impressions, not intent.</span>
              </li>
              <li>
                <span><strong>Interstitials</strong> interrupt. A playable interrupts too — but then hands the viewer something fun to do, which converts the interruption into a session.</span>
              </li>
              <li>
                <span><strong>Playables</strong> pre-qualify. By the time someone taps Download, they've already run the loop. The install you pay for knows what it's getting.</span>
              </li>
            </ul>

            <h2>Why mobile apps use them for user acquisition</h2>
            <p>
              The economics of paid UA punish low-intent installs: you pay the CPI either way,
              but uninformed installs churn on day one. Playables move the "do I actually like
              this?" moment from after the install to before it. In practice that means
              higher-intent installs, IPM ceilings static creative can't reach, and retention
              curves that start honest — because the users who arrive already opted into the
              core loop.
            </p>

            <h2>Types of playable ads</h2>
            <ul>
              <li><span><strong>Tap and timing games</strong> — one-finger loops like our kneading score-chase; instantly legible, zero tutorial.</span></li>
              <li><span><strong>Runners and reflex games</strong> — effort maps to outcome, like a tap-mash sprint with a win/lose end state.</span></li>
              <li><span><strong>Puzzle mechanics</strong> — a single satisfying solve that mirrors the app's "aha" moment.</span></li>
              <li><span><strong>Product demos</strong> — a guided interactive slice of the real UI, common for non-game apps.</span></li>
            </ul>

            <h2>Best practices: what makes a playable convert</h2>
            <ul>
              <li><span>The first tap teaches the game. If it needs instructions, the mechanic is wrong.</span></li>
              <li><span>Keep the loop 5–15 seconds — short enough to finish, because a finished loop makes the end card feel earned.</span></li>
              <li><span>Build around the app's one selling mechanic, not a generic template with a logo swap.</span></li>
              <li><span>Design the end card as carefully as the game: one CTA, a score recap, and a friction-free replay.</span></li>
              <li><span>Make losing useful — a losable game reads as a real game, and a replay is more time inside your brand.</span></li>
              <li><span>Ship within platform specs: single-file HTML5, sized for Meta and TikTok playable placements, CTA wired to store links.</span></li>
            </ul>

            <p>
              See these principles in the work:{" "}
              <Link className="link-arrow" to="/our-work">browse the portfolio</Link>, or read{" "}
              <Link className="link-arrow" to="/about">how QQ approaches builds</Link>.
            </p>
          </article>
        </section>

        <section className="final">
          <div className="wrap final-inner">
            <div>
              <h2 className="h-lg">Think a playable fits your funnel?</h2>
              <p className="body-lg" style={{ opacity: 0.75, marginTop: 16, maxWidth: "30em" }}>
                Bring your store listing to a 30-minute call. If the format isn't right for your
                app, you'll hear that too.
              </p>
              <div className="cta-row" style={{ marginTop: 28 }}>
                <Link className="btn btn-accent" to="/#pricing">Start a build</Link>
                <a className="btn btn-ghost" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a call</a>
              </div>
            </div>
            <img className="final-mascot" src="/assets/qq/qq-hero.png" alt="QQ the quokka jumping with excitement" />
          </div>
        </section>
      </main>
    </>
  );
}
