import Seo from "../components/Seo";
import DemoCard, { NdaCard } from "../components/DemoCard";
import { Section } from "../components/blocks";
import { BEAR_SRC } from "../lib/brand";
import { demos } from "../data/demos";

/**
 * /demos — the index.
 *
 * The empty half of this page is the point. Most of the work is under
 * an NDA that outlives the campaign, and the design commits to saying
 * so rather than inventing client logos to fill a grid.
 */
export default function Demos() {
  return (
    <main className="main">
      <Seo
        title="Playable Ad Demos and Teardowns | QQ Advertisement"
        description="Live playable ad demos with full teardowns: the shipped file's measured weight, its instrumented beats, per-network compliance, and what we'd change next time."
        path="/demos"
      />

      <Section padBlock={[40, 32]} labelledBy="demos-head">
        <p className="hero__kicker">Demos · every build we can publish</p>
        <h1 id="demos-head" className="t-display t-display-sm t-display-2xl-at-desktop" style={{ marginBlockEnd: 20 }}>
          The real files, not video captures.
        </h1>
        <p className="t-body-md t-body-lg-at-desktop c-body" style={{ maxInlineSize: "52ch" }}>
          Each teardown loads the shipped file in front of you, reports its measured weight, and
          says what we'd change. The session panel measures you while you read it.
        </p>
      </Section>

      <Section padBlock={[0, 48]} labelledBy="demos-list">
        <h2 id="demos-list" className="u-visually-hidden">
          Published builds
        </h2>
        <div className="demo-grid">
          {demos.map((d) => (
            <DemoCard key={d.slug} demo={d} />
          ))}
          <NdaCard />
        </div>
      </Section>

      {/* Empty state — it explains the NDA reality and points at real
          work. It never shows placeholder logos or fake client names. */}
      <Section padBlock={[0, 64]} labelledBy="nda-head">
        <div className="empty-state">
          {/* Empty state is one of the bear's five permitted placements, at 54px. */}
          <img src={BEAR_SRC} alt="" />
          <h2 id="nda-head" className="t-display t-display-4xs">
            Most of it we can't show you.
          </h2>
          <p className="t-body-sm c-body" style={{ maxInlineSize: "58ch" }}>
            Playable work ships under NDAs that usually outlive the campaign, so the published list
            will always be shorter than the shipped one. We'd rather say that than fill a grid with
            art we don't have the right to publish. If you want to see more, ask on a call — a lot
            of it can be shown under a mutual NDA that we'll sign the same day.
          </p>
          <a className="btn btn--outline" href="/#contact">
            Ask for the rest →
          </a>
        </div>
      </Section>
    </main>
  );
}
