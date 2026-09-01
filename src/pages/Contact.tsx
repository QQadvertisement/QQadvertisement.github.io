import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { Section } from "../components/blocks";
import { SpecList, SpecRow } from "../components/ui/Spec";
import CtaBand from "../components/ui/CtaBand";
import { BOOKING_URL, CONTACT_EMAIL, QUOTE_HREF, claims, site } from "../data/site";

/**
 * /contact — the general front door.
 *
 * Deliberately NOT the brief form; that is /quote, and the sitemap
 * draws them as two things because they are. Someone who wants a price
 * has a scoped question and a form built for it. Someone who lands
 * here wants a person: a press question, an invoice, an NDA, a
 * partnership, or a job. Handing all of those a "monthly build volume"
 * dropdown is the reason general contact pages get ignored.
 *
 * So this page routes rather than collects. Three ways in, the reply
 * commitment, and a link to the form for the one case that has one.
 */
export default function Contact() {
  return (
    <main className="main">
      <Seo
        title="Contact QQ Advertisement"
        description="Reach the team that builds the playables — email, a call, or a scoped brief. We reply within one business day."
        path="/contact"
      />

      <Section padBlock={[40, 48]} labelledBy="contact-head">
        <h1
          id="contact-head"
          className="t-display t-display-sm t-display-2xl-at-desktop"
          style={{ maxInlineSize: "18ch", marginBlockEnd: 20 }}
          data-reveal
        >
          Talk to the people who build it.
        </h1>
        <p
          className="t-body-md t-body-lg-at-desktop c-body"
          style={{ maxInlineSize: "52ch" }}
          data-reveal
        >
          No account layer, no routing queue. Whichever of these you pick, the reply comes from
          someone who has read the file.
        </p>

        <div className="contact-routes" data-reveal>
          <article className="contact-route">
            <h2 className="contact-route__head t-mono t-mono-2xs u-upper">Want a price</h2>
            <p className="t-body-sm c-body">
              Tell us the title, the networks and the volume. You get a mechanic recommendation, a
              flat number and a start date.
            </p>
            <Link className="btn btn--accent btn--lg" to={QUOTE_HREF}>
              Get a flat quote
            </Link>
          </article>

          <article className="contact-route">
            <h2 className="contact-route__head t-mono t-mono-2xs u-upper">Want to talk it through</h2>
            <p className="t-body-sm c-body">
              Thirty minutes, screen shared, your build open. Bring the creative that is currently
              winning and we'll tell you what we would test against it.
            </p>
            <a className="btn btn--neutral btn--lg" href={BOOKING_URL} target="_blank" rel="noreferrer">
              Book a call
            </a>
          </article>

          <article className="contact-route">
            <h2 className="contact-route__head t-mono t-mono-2xs u-upper">Everything else</h2>
            <p className="t-body-sm c-body">
              Press, invoices, NDAs, partnerships, or a job. Email reaches all of it.
            </p>
            <a className="btn btn--outline btn--lg" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </article>
        </div>

        <div style={{ maxInlineSize: 340, marginBlockStart: 40 }} data-reveal>
          <h2 className="spec-group__head">What to expect</h2>
          <SpecList density="compact" variant="top-ruled">
            {claims.replyRows.map((r) => (
              <SpecRow key={r.label} label={r.label} value={r.value} />
            ))}
            <SpecRow label="Based in" value={site.city} />
          </SpecList>
        </div>
      </Section>

      <CtaBand title="Or skip the introductions and send the build." variant="secondary" />
    </main>
  );
}
