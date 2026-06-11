import { Link } from "react-router-dom";
import Seo, { breadcrumbsJsonLd, SITE_URL } from "../components/Seo";
import { caseStudies } from "../data/caseStudies";

const BOOKING_URL = "https://calendly.com/thitipun-snw/30min";

export default function OurWork() {
  const jsonLd = [
    breadcrumbsJsonLd([
      { name: "Home", path: "/" },
      { name: "Our Work", path: "/our-work" },
    ]),
    ...caseStudies.map((cs) => ({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `${cs.name} — playable ad for ${cs.client}`,
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      creator: { "@type": "Organization", name: "QQ Advertisement" },
      description: cs.summary,
    })),
  ];

  return (
    <>
      <Seo
        title="Playable Ads Portfolio — Our Work | QQ Advertisement"
        description="Playable ads designed and coded by QQ Advertisement: Knead Rush for Friends Ramen, Sprint to the Finish for Atta. Live demos and case studies of custom HTML5 playables for user acquisition."
        path="/our-work"
        jsonLd={jsonLd}
      />

      <main>
        <header className="page-hero">
          <div className="wrap">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <span>Our Work</span>
            </nav>
            <div className="sec-head">
              <div className="eyebrow">Portfolio</div>
              <h1 className="h-xl">Our playable ads work</h1>
              <p className="body-lg muted">
                Custom HTML5 playables for mobile app user acquisition — every one designed,
                illustrated, and coded end-to-end by one engineer. Each project below links to a
                full case study with a live, playable build.
              </p>
            </div>
          </div>
        </header>

        <section aria-label="Case studies">
          <div className="wrap">
            <div className="work-grid">
              {caseStudies.map((cs) => (
                <article className="work-card" key={cs.slug}>
                  <Link
                    to={`/case-studies/${cs.slug}`}
                    className="work-thumb"
                    style={{ background: "#f5a727", textDecoration: "none" }}
                    aria-label={`${cs.name} case study`}
                  >
                    <img src={cs.image} alt={cs.imageAlt} />
                    <span className="play-hint"><span>READ + PLAY IT</span></span>
                  </Link>
                  <div className="work-meta">
                    <div className="work-tags">
                      <span className="tag">{cs.client}</span>
                      <span className="tag">{cs.vertical}</span>
                      <span className="tag">{cs.loopLength}</span>
                    </div>
                    <h2 style={{ fontSize: 20, fontWeight: 800 }}>{cs.name}</h2>
                    <p className="muted" style={{ fontSize: 15 }}>{cs.summary}</p>
                    <Link className="btn btn-ghost" to={`/case-studies/${cs.slug}`}>
                      Case study →
                    </Link>
                  </div>
                </article>
              ))}

              <article className="work-card case-slot">
                <span className="ph-tag">placeholder — real campaign data</span>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>Your app here</h2>
                <p className="muted" style={{ fontSize: 15 }}>
                  The next slot in the grid belongs to the first paid campaign published with
                  client sign-off — vertical, mechanic, and the numbers UA people actually check.
                </p>
                <div className="case-metrics">
                  <div><b>—</b>IPM</div>
                  <div><b>—</b>CPI Δ vs control</div>
                  <div><b>—</b>D1 retention</div>
                </div>
              </article>
            </div>

            <p className="body-lg" style={{ marginTop: 40 }}>
              New to the format? Read{" "}
              <Link className="link-arrow" to="/playable-ads-explained">how playable ads work</Link>{" "}
              or <Link className="link-arrow" to="/about">why QQ builds them this way</Link>.
            </p>
          </div>
        </section>

        <section className="final">
          <div className="wrap final-inner">
            <div>
              <h2 className="h-lg">Want your core loop in this grid?</h2>
              <p className="body-lg" style={{ opacity: 0.75, marginTop: 16, maxWidth: "30em" }}>
                One call, one build, one test cell in your next creative round.
              </p>
              <div className="cta-row" style={{ marginTop: 28 }}>
                <Link className="btn btn-accent" to="/#pricing">Start a build</Link>
                <a className="btn btn-ghost" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a call</a>
              </div>
            </div>
            <img className="final-mascot" src="/assets/qq/qq-run-happy.png" alt="QQ the quokka sprinting" />
          </div>
        </section>
      </main>
    </>
  );
}
