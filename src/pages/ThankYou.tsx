import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { Section } from "../components/blocks";
import { SpecList, SpecRow } from "../components/ui/Spec";
import { claims } from "../data/site";

/**
 * /thank-you — where a submitted brief lands.
 *
 * The job of this page is to replace anxiety with a timetable. A
 * "thanks, we'll be in touch" is the version that makes someone wonder
 * for two days whether the form worked, so this one states what
 * happens, in what order, by when — using the same reply commitments
 * the form promised, read from the same place.
 *
 * It is noindex-by-intent: linked only from a submission, never from
 * the nav, and absent from the sitemap.
 */
export default function ThankYou() {
  return (
    <main className="main">
      <Seo
        title="Brief received | QQ Advertisement"
        description="Your brief is in. Here is what happens next and when."
        path="/thank-you"
      />

      <Section padBlock={[56, 56]} labelledBy="thanks-head">
        <div style={{ maxInlineSize: 640 }}>
          <p className="hero__kicker" data-reveal>
            Brief received
          </p>
          <h1
            id="thanks-head"
            className="t-display t-display-sm t-display-2xl-at-desktop"
            style={{ marginBlockEnd: 20 }}
            data-reveal
          >
            It's in. Here's what happens next.
          </h1>

          <ol className="steps" style={{ marginBlockStart: 32 }} data-reveal>
            <li className="steps__item">
              <span className="steps__num t-mono t-mono-2xs" aria-hidden="true">1</span>
              <div>
                <h2 className="steps__title t-body-lg t-semibold">We play what you sent</h2>
                <p className="steps__body t-body-sm">
                  Before we reply. The recommendation you get back is about your loop, not about
                  playables in general.
                </p>
              </div>
            </li>
            <li className="steps__item">
              <span className="steps__num t-mono t-mono-2xs" aria-hidden="true">2</span>
              <div>
                <h2 className="steps__title t-body-lg t-semibold">You get a mechanic and a number</h2>
                <p className="steps__body t-body-sm">
                  One recommended mechanic, the flat price, and the earliest start date. Within one
                  business day.
                </p>
              </div>
            </li>
            <li className="steps__item">
              <span className="steps__num t-mono t-mono-2xs" aria-hidden="true">3</span>
              <div>
                <h2 className="steps__title t-body-lg t-semibold">You decide, and the clock starts</h2>
                <p className="steps__body t-body-sm">
                  First build six days from kickoff. Nothing is invoiced before you've agreed the
                  spec.
                </p>
              </div>
            </li>
          </ol>

          <div style={{ maxInlineSize: 340, marginBlockStart: 40 }} data-reveal>
            <SpecList density="compact" variant="top-ruled">
              {claims.replyRows.map((r) => (
                <SpecRow key={r.label} label={r.label} value={r.value} />
              ))}
            </SpecList>
          </div>

          <p className="t-body-md c-body" style={{ marginBlockStart: 36 }} data-reveal>
            While you wait —{" "}
            <Link className="link-inline" to="/work">
              play the library
            </Link>
            . Every build there runs in the browser.
          </p>
        </div>
      </Section>
    </main>
  );
}
