import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BEAR_SRC } from "../lib/brand";
import { Section } from "../components/blocks";

/**
 * 404 — the bear's largest permitted appearance, at 132px. Copy is in
 * the plural brand voice, and it names what happened rather than
 * apologising for it.
 */
export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page not found | QQ Advertisement</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="main">
        <Section padBlock={[0, 0]}>
          <div className="notfound">
            <img src={BEAR_SRC} alt="" />
            <p className="hero__kicker" style={{ marginBlockEnd: 0 }}>
              404 · nothing at this address
            </p>
            <h1 className="t-display t-display-2xs t-display-lg-at-desktop">
              We don't have a build here.
            </h1>
            <p className="t-body-md c-body" style={{ maxInlineSize: "48ch" }}>
              Either the link is wrong or we moved the page and didn't leave a forwarding address.
              The demos are the fastest way back in — each one runs the real file and tears it down.
            </p>
            <div className="btn-pair">
              <Link className="btn btn--neutral btn--lg" to="/demos">
                See the demos
              </Link>
              <Link className="btn btn--muted btn--lg" to="/">
                Back to home
              </Link>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
