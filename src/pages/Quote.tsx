import Seo from "../components/Seo";
import ContactForm from "../components/ContactForm";
import { Section } from "../components/blocks";
import { SpecList, SpecRow } from "../components/ui/Spec";
import { buildVolumeOptions, claims } from "../data/site";

/**
 * /quote — the brief form, and the endpoint of every "Get a flat
 * quote" on the site (QUOTE_HREF in data/site.ts).
 *
 * The sitemap lists /quote and /contact as two different things, and
 * they are: this one is a conversion endpoint with a scoped question
 * — tell us the build, get a price — while /contact is the general
 * front door for everything that is not that.
 *
 * Lifted off the homepage on 2026-08-20. `1b` ends the home page on a
 * CTA band, not a form, and the reason is the reason for the whole
 * rebuild: a page that asks the reader to choose a lane, play a build,
 * read a price AND fill in a brief is asking for four decisions in one
 * scroll, and gets none of them.
 *
 * So the form moves to the end of the funnel rather than the end of
 * the page. Every "Get a flat quote" on the site lands here — see
 * QUOTE_HREF in data/site.ts — which also means the form is now a
 * destination someone can be sent to, instead of an anchor halfway
 * down a long page.
 *
 * It is the same form, unchanged. It was never the problem.
 */
export default function Quote() {
  return (
    <main className="main">
      <Seo
        title="Get a Flat Quote | QQ Advertisement"
        description="Tell us the title, the networks and the volume. We reply within one business day with a mechanic recommendation, a flat price and a start date."
        path="/quote"
      />

      <Section padBlock={[40, 56]} labelledBy="contact-head">
        <div className="split split--wide-gap" style={{ ["--side" as string]: "560px" }}>
          <div className="split__main">
            <h1
              id="contact-head"
              className="t-display t-display-sm t-display-xl-at-desktop"
              style={{ marginBlockEnd: 16 }}
              data-reveal
            >
              <span style={{ display: "block" }}>Send us the build.</span>
              <span style={{ display: "block" }}>We'll send back a plan.</span>
            </h1>
            <p
              className="t-body-md t-body-lg-at-desktop c-body"
              style={{ maxInlineSize: "44ch", marginBlockEnd: 28 }}
              data-reveal
            >
              Tell us the title, the networks and the volume. We reply within one business day with
              a mechanic recommendation, a flat price and a date.
            </p>
            <div style={{ maxInlineSize: 340 }} data-reveal>
              <SpecList density="compact" variant="top-ruled">
                {claims.replyRows.map((r) => (
                  <SpecRow key={r.label} label={r.label} value={r.value} />
                ))}
              </SpecList>
            </div>
          </div>
          <div className="split__side">
            <ContactForm
              volumeLabel="Monthly build volume"
              volumeOptions={buildVolumeOptions}
              detailLabel="What are you running now?"
              detailPlaceholder="Store link or a build we can play is enough."
              submitLabel="Send brief"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}
