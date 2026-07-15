import { Link } from "react-router-dom";
import Seo, { breadcrumbsJsonLd } from "../components/Seo";
import { BOOKING_URL } from "../lib/site";

export default function About() {
  return (
    <>
      <Seo
        title="About QQ Advertisement — Playable Ads Agency for AI & Consumer Apps"
        description="QQ Advertisement is a builder-first playable ads studio in Flushing, Queens — a game developer, an engineer, and a growth marketer. Custom HTML5 builds, not templates, for consumer app and AI startup user acquisition."
        path="/about"
        jsonLd={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <main>
        <header className="page-hero">
          <div className="wrap">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <span>About</span>
            </nav>
            <div className="sec-head">
              <div className="eyebrow">About</div>
              <h1 className="h-xl">Why QQ Advertisement</h1>
              <p className="body-lg muted">
                A playable ads studio built by three specialists — a game developer, an engineer,
                and a growth marketer — making custom interactive ads for user acquisition.
              </p>
            </div>
          </div>
        </header>

        <section className="why" aria-label="Who is QQ">
          <div className="wrap why-grid">
            <article className="prose">
              <h2>Builders first</h2>
              <p>
                QQ Advertisement is three people, and each one does a different third of a
                playable for a living. Kevin is a game developer working in Unreal and UEFN.
                Timo is a software engineer with an AI/ML background — work spanning Meta AI,
                Mercor, and Snorkel AI. Ploy does growth marketing at a high-growth startup.
              </p>
              <p>
                That split is the whole point. A playable ad is a game, a piece of production
                software, and a performance ad all at once — three different crafts wearing one
                file extension. Most shops are genuinely good at one of them and quietly outsource
                the other two, and you can usually tell which one by playing the ad. We'd rather
                ship a testable build than a storyboard deck, and because it's three people who
                already work together, revisions happen in hours instead of sprint cycles.
              </p>
              <h2>Why playable ads</h2>
              <p>
                Playable ads are interactive, sandboxed HTML5 experiences that run inside the ad
                slot. The thesis is simple: when someone runs your app's core loop for ten seconds
                before tapping Download, the install you pay for is pre-qualified — they already
                know what they're getting. That shows up as higher-intent installs and retention
                curves that start honest. The long version is in{" "}
                <Link to="/playable-ads-explained">Playable Ads Explained</Link>.
              </p>
              <h2>Who we work with</h2>
              <p>
                Consumer app founders, AI startups, and mobile teams running user acquisition on
                Meta and TikTok — teams that want creative built around <em>their</em> core loop,
                shipped fast enough to test while the hypothesis is still warm.
              </p>
              <h2>What makes QQ different</h2>
              <ul>
                <li>Custom builds, not templates — every playable starts from your app's one selling mechanic.</li>
                <li>A specialist on each third of the job: game feel, shipping code, and the numbers the ad is judged on.</li>
                <li>Direct and technical: you talk to the people who write the code, every time.</li>
                <li>Days, not the multi-week agency cycle — small enough to move fast, staffed enough not to cut the corner you'd notice.</li>
                <li>A warm network in AI and tech, and a builder's honesty about whether a playable fits your funnel at all.</li>
              </ul>
              <p>
                Proof beats pitch:{" "}
                <Link to="/our-work">play the work</Link> — the{" "}
                <Link to="/case-studies/friends-ramen">Friends Ramen</Link> and{" "}
                <Link to="/case-studies/atta">Atta</Link> builds are live on this site.
              </p>
            </article>
            <figure className="why-card">
              <img
                src="/assets/about/Timo-Ploy-Kevin.jpeg"
                alt="The QQ Advertisement team — Timo, Ploy, and Kevin — on a rooftop with a city skyline behind them"
              />
              <figcaption>
                The people behind QQ:{" "}
                <a href="https://www.linkedin.com/in/thitipun-s/" target="_blank" rel="noreferrer">Timo</a>,{" "}
                <a href="https://www.linkedin.com/in/ploywongtaladkwon/" target="_blank" rel="noreferrer">Ploy</a>, and{" "}
                <a href="https://www.linkedin.com/in/jenkaiwang/" target="_blank" rel="noreferrer">Kevin</a>.
                Human talent, supercharged with AI tech.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="final">
          <div className="wrap final-inner">
            <div>
              <h2 className="h-lg">Let's build your playable ad.</h2>
              <p className="body-lg" style={{ opacity: 0.75, marginTop: 16, maxWidth: "30em" }}>
                Not sure the format fits your funnel? The call is free and you'll get a straight answer.
              </p>
              <div className="cta-row" style={{ marginTop: 28 }}>
                <Link className="btn btn-accent" to="/#pricing">Start a build</Link>
                <a className="btn btn-ghost" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a call</a>
              </div>
            </div>
            <img className="final-mascot" src="/assets/qq/qq-sit.png" alt="QQ the quokka sitting with a game controller" />
          </div>
        </section>
      </main>
    </>
  );
}
