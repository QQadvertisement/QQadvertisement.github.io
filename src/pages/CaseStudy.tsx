import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Seo, { breadcrumbsJsonLd, SITE_URL } from "../components/Seo";
import PlayablePhone from "../components/PlayablePhone";
import { caseStudies, getCaseStudy } from "../data/caseStudies";
import NotFoundPage from "./404";
import { BOOKING_URL } from "../lib/site";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const cs = getCaseStudy(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!cs) return <NotFoundPage />;

  const other = caseStudies.find((c) => c.slug !== cs.slug);
  const jsonLd = [
    breadcrumbsJsonLd([
      { name: "Home", path: "/" },
      { name: "Our Work", path: "/our-work" },
      { name: cs.title, path: `/case-studies/${cs.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `${cs.name} — playable ad for ${cs.client}`,
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      image: `${SITE_URL}${cs.image}`,
      creator: { "@type": "Organization", name: "QQ Advertisement", url: SITE_URL },
      genre: "Playable ad",
      description: cs.summary,
    },
  ];

  return (
    <>
      <Seo
        title={cs.metaTitle}
        description={cs.metaDescription}
        path={`/case-studies/${cs.slug}`}
        image={`${SITE_URL}${cs.image}`}
        jsonLd={jsonLd}
      />

      <main>
        <header className="page-hero">
          <div className="wrap">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link> <span>/</span>{" "}
              <Link to="/our-work">Our Work</Link> <span>/</span> <span>{cs.client}</span>
            </nav>
            <div className="sec-head">
              <div className="eyebrow">Case study</div>
              <h1 className="h-xl">{cs.title}</h1>
              <p className="body-lg muted">{cs.summary}</p>
            </div>
            <div className="cs-facts">
              <div className="cs-fact"><div className="k">Client</div><div className="v">{cs.client}</div></div>
              <div className="cs-fact"><div className="k">Vertical</div><div className="v">{cs.vertical}</div></div>
              <div className="cs-fact"><div className="k">Format</div><div className="v">{cs.format}</div></div>
              <div className="cs-fact"><div className="k">Loop length</div><div className="v">{cs.loopLength}</div></div>
              <div className="cs-fact"><div className="k">Spec</div><div className="v">{cs.platforms}</div></div>
            </div>
          </div>
        </header>

        <section aria-label="Live playable demo">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">Play it</div>
              <h2 className="h-lg">This is the actual build.</h2>
              <p className="body-lg muted">
                Not a video capture — the playable itself, running in the page. Finish the loop
                and hit the fake Download button.
              </p>
            </div>
            <div className="cs-hero-stage">
              <PlayablePhone game={cs.game} />
            </div>
          </div>
        </section>

        <section aria-label="Challenge and solution">
          <div className="wrap prose">
            <h2>The challenge</h2>
            <ul>{cs.challenge.map((p, i) => <li key={i}>{p}</li>)}</ul>
            <h2>The build</h2>
            <ul>{cs.solution.map((p, i) => <li key={i}>{p}</li>)}</ul>
            <h2>Results</h2>
            <ul>{cs.results.map((p, i) => <li key={i}>{p}</li>)}</ul>
            <h2>What we learned</h2>
            <ul>{cs.learnings.map((p, i) => <li key={i}>{p}</li>)}</ul>
            <p>
              {other && (
                <>
                  Next:{" "}
                  <Link className="link-arrow" to={`/case-studies/${other.slug}`}>
                    {other.title}
                  </Link>{" "}
                  · or{" "}
                </>
              )}
              <Link className="link-arrow" to="/our-work">back to all work</Link> ·{" "}
              <Link className="link-arrow" to="/playable-ads-explained">how playable ads work</Link>
            </p>
          </div>
        </section>

        <section className="final">
          <div className="wrap final-inner">
            <div>
              <h2 className="h-lg">Let's build playables for your app.</h2>
              <p className="body-lg" style={{ opacity: 0.75, marginTop: 16, maxWidth: "30em" }}>
                Same process, your core loop: one call, one custom build, one test cell in your
                next creative round.
              </p>
              <div className="cta-row" style={{ marginTop: 28 }}>
                <Link className="btn btn-accent" to="/#pricing">Start a build</Link>
                <a className="btn btn-ghost" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a call</a>
              </div>
            </div>
            <img className="final-mascot" src="/assets/qq/qq-finish.png" alt="QQ the quokka celebrating at the finish line" />
          </div>
        </section>
      </main>
    </>
  );
}
