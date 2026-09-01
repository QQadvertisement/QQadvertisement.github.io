import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import DemoCard from "../components/DemoCard";
import { Section } from "../components/blocks";
import CtaBand from "../components/ui/CtaBand";
import { demos } from "../data/demos";

/**
 * /work/industries — the library, grouped by the client's category.
 *
 * The same builds as /work, cut a different way. It exists because the
 * question "have you built for anything like us" is the one a first
 * conversation actually opens with, and a flat grid answers it only if
 * the reader already knows which card belongs to their world.
 *
 * The groups are DERIVED from the library, never listed by hand. An
 * industry with no build in it does not appear, which means this page
 * can never imply coverage we do not have — the failure mode of every
 * "industries we serve" page ever written.
 */
export default function Industries() {
  const byVertical = demos.reduce<Record<string, typeof demos>>((acc, d) => {
    (acc[d.vertical] ??= []).push(d);
    return acc;
  }, {});
  const verticals = Object.keys(byVertical).sort();

  return (
    <main className="main">
      <Seo
        title="Playable Ads by Industry | QQ Advertisement"
        description="The playable library grouped by the client's category — every build we can publish, in the vertical it shipped for."
        path="/work/industries"
      />

      <Section padBlock={[40, 32]} labelledBy="ind-head">
        <p className="hero__kicker" data-reveal>
          Work · by industry
        </p>
        <h1
          id="ind-head"
          className="t-display t-display-sm t-display-2xl-at-desktop"
          style={{ maxInlineSize: "20ch", marginBlockEnd: 20 }}
          data-reveal
        >
          Have you built for anything like us?
        </h1>
        <p
          className="t-body-md t-body-lg-at-desktop c-body"
          style={{ maxInlineSize: "52ch" }}
          data-reveal
        >
          Only categories with a build in them are listed. If yours is not here yet, the mechanic
          usually transfers — ask.{" "}
          <Link className="link-inline" to="/work">
            The full library
          </Link>{" "}
          is filterable by format and network.
        </p>
      </Section>

      {verticals.map((v) => (
        <Section key={v} padBlock={[0, 44]} labelledBy={`ind-${v.replace(/\W+/g, "-")}`}>
          <div className="section-head-row" style={{ marginBlockEnd: 22 }}>
            <h2
              id={`ind-${v.replace(/\W+/g, "-")}`}
              className="t-display t-display-3xs t-display-xs-at-desktop"
            >
              {v}
            </h2>
            <span className="section-head-row__note t-mono t-mono-xs c-muted u-upper">
              {String(byVertical[v].length).padStart(2, "0")}{" "}
              {byVertical[v].length === 1 ? "build" : "builds"}
            </span>
          </div>
          <div className="build-grid">
            {byVertical[v].map((d) => (
              <div key={d.slug} data-reveal>
                <DemoCard demo={d} />
              </div>
            ))}
          </div>
        </Section>
      ))}

      <CtaBand title="Not seeing your category? The mechanic usually transfers." variant="secondary" />
    </main>
  );
}
