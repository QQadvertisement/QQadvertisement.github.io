import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | QQ Advertisement</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main>
        <section className="page-hero" style={{ paddingBottom: "clamp(56px, 8vw, 110px)" }}>
          <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center" }}>
            <img
              src="/assets/qq/qq-sit.png"
              alt="QQ the quokka sitting with a game controller"
              style={{ width: "min(260px, 60vw)" }}
            />
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <div className="eyebrow">404</div>
              <h1 className="h-lg">This level doesn't exist.</h1>
              <p className="body-lg muted">
                Wrong link, or the page moved. The good stuff is one tap away.
              </p>
              <div className="cta-row" style={{ marginTop: 10 }}>
                <Link className="btn btn-primary" to="/">Back to home</Link>
                <Link className="btn btn-ghost" to="/our-work">Play the work</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
