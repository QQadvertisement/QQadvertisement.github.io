import { Link, useParams } from "react-router-dom";
import Seo, { breadcrumbsJsonLd, SITE_URL } from "../components/Seo";
import { Section } from "../components/blocks";
import { SpecList, SpecRow } from "../components/ui/Spec";
import { caseStudies, getCaseStudy } from "../data/caseStudies";
import { demos } from "../data/demos";
import NotFoundPage from "./404";
import { BOOKING_URL } from "../data/site";

/**
 * /case-studies/[slug] — the narrative half of a build.
 *
 * Kept alongside /demos/[slug] rather than folded into it: the
 * teardown is the file, this is the argument. Both are indexed, and
 * each links to the other.
 *
 * The playable is NOT embedded here. That is what the teardown page is
 * for, and in the Friends Ramen case the production build writes to a
 * live database — the screen flow stands in for it.
 */
export default function CaseStudyPage() {
  const { slug } = useParams();
  const cs = getCaseStudy(slug);

  if (!cs) return <NotFoundPage />;

  const other = caseStudies.find((c) => c.slug !== cs.slug);
  const demo = demos.find((d) => d.caseStudyPath === `/case-studies/${cs.slug}`);

  const jsonLd = [
    breadcrumbsJsonLd([
      { name: "Home", path: "/" },
      { name: "Demos", path: "/demos" },
      { name: cs.title, path: `/case-studies/${cs.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `${cs.name} — for ${cs.client}`,
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      image: `${SITE_URL}${cs.image}`,
      creator: { "@type": "Organization", name: "QQ Advertisement", url: SITE_URL },
      genre: cs.format,
      description: cs.summary,
    },
  ];

  const sections: { head: string; items: string[] }[] = [
    { head: "The challenge", items: cs.challenge },
    { head: "The build", items: cs.solution },
    { head: "Results", items: cs.results },
    { head: "What we learned", items: cs.learnings },
  ];

  return (
    <main className="main">
      <Seo
        title={cs.metaTitle}
        description={cs.metaDescription}
        path={`/case-studies/${cs.slug}`}
        image={`${SITE_URL}${cs.image}`}
        jsonLd={jsonLd}
      />

      <Section padBlock={[32, 40]} labelledBy="cs-head">
        <div className="split split--end" style={{ ["--side" as string]: "420px" }}>
          <div className="split__main">
            <p className="hero__kicker">Case study · {cs.client}</p>
            <h1
              id="cs-head"
              className="t-display t-display-xs t-display-xl-at-desktop"
              style={{ marginBlockEnd: 20 }}
            >
              {cs.name}
            </h1>
            <p className="t-body-lg c-body" style={{ maxInlineSize: "56ch" }}>
              {cs.summary}
            </p>
          </div>
          <div className="split__side">
            <h2 className="spec-group__head">The brief</h2>
            <SpecList density="comfortable">
              <SpecRow label="Client" value={cs.client} />
              <SpecRow label="Vertical" value={cs.vertical} />
              <SpecRow label="Format" value={cs.format} />
              <SpecRow label="Loop length" value={cs.loopLength} />
              <SpecRow label="Spec" value={cs.platforms} />
            </SpecList>
            <div className="btn-pair" style={{ marginBlockStart: 24 }}>
              {demo ? (
                <Link className="btn btn--neutral btn--lg" to={`/demos/${demo.slug}`}>
                  See the teardown
                </Link>
              ) : null}
              {cs.liveUrl ? (
                <a
                  className="btn btn--muted btn--lg"
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in production →
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Section>

      {cs.flow ? (
        <Section ground="sunken" padBlock={[48, 52]} labelledBy="flow-head">
          <div className="section-head-row" style={{ marginBlockEnd: 26 }}>
            <div className="section-head">
              <p className="section-head__kicker t-mono t-mono-xs">The real flow</p>
              <h2 id="flow-head" className="t-display t-display-2xs t-display-md-at-desktop">
                Straight from the production build
              </h2>
            </div>
            <p className="section-head-row__note t-body-sm">
              Every screen below is captured from the live build, leaderboard names included — not
              mockups.
            </p>
          </div>
          <div className="flow-grid">
            {cs.flow.map((f) => (
              <figure className="flow-shot" key={f.src}>
                <img src={f.src} alt={f.alt} loading="lazy" />
                <figcaption className="t-body-xs c-body">{f.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      {sections.map((s, i) => (
        <Section
          key={s.head}
          padBlock={i === 0 ? [48, 40] : [0, 40]}
          labelledBy={`cs-${i}`}
        >
          <div className="offset offset--prose">
            <h2 id={`cs-${i}`} className="offset__label">
              {s.head}
            </h2>
            <div className="offset__body prose">
              <ul>
                {s.items.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ))}

      <Section padBlock={[0, 64]} labelledBy="cs-cta" className="section--rule">
        <div style={{ paddingBlockStart: 48 }}>
          <h2
            id="cs-cta"
            className="t-display t-display-2xs t-display-lg-at-desktop"
            style={{ marginBlockEnd: 16 }}
          >
            Same process, your core loop.
          </h2>
          <p className="t-body-md c-body" style={{ maxInlineSize: "48ch", marginBlockEnd: 24 }}>
            One call, one custom build, one test cell in your next creative round.
          </p>
          <div className="btn-pair">
            <Link className="btn btn--neutral btn--lg" to="/#contact">
              Send us the build
            </Link>
            <a className="btn btn--muted btn--lg" href={BOOKING_URL} target="_blank" rel="noreferrer">
              Book a call
            </a>
          </div>
          <p className="t-body-xs c-body" style={{ marginBlockStart: 28 }}>
            {other ? (
              <>
                Next:{" "}
                <Link className="link-inline" to={`/case-studies/${other.slug}`}>
                  {other.name}
                </Link>{" "}
                ·{" "}
              </>
            ) : null}
            <Link className="link-inline" to="/demos">
              All demos
            </Link>{" "}
            ·{" "}
            <Link className="link-inline" to="/playable-ads-explained">
              How playable ads work
            </Link>
          </p>
        </div>
      </Section>
    </main>
  );
}
