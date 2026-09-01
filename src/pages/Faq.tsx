import Seo from "../components/Seo";
import { Section } from "../components/blocks";
import FaqAccordion from "../components/ui/Faq";
import CtaBand from "../components/ui/CtaBand";
import { faqs } from "../data/site";
import { faqs as pricingFaqs } from "../content/pricing";

/**
 * /faq — every question, in one place.
 *
 * The home page shows four and /pricing shows the money ones. This
 * page is the union, grouped, and it is the canonical copy: both
 * other pages read from the same two arrays, so an answer edited once
 * is edited everywhere. There is no third list to drift.
 */
export default function Faq() {
  return (
    <main className="main">
      <Seo
        title="Playable Ads FAQ | QQ Advertisement"
        description="How we work, what we need to start, which networks we QA against, who owns the files, what a build costs and what counts as a revision."
        path="/faq"
      />

      <Section padBlock={[40, 40]} labelledBy="faq-head">
        <h1
          id="faq-head"
          className="t-display t-display-sm t-display-2xl-at-desktop"
          style={{ marginBlockEnd: 20 }}
          data-reveal
        >
          Questions, answered in full.
        </h1>
        <p
          className="t-body-md t-body-lg-at-desktop c-body"
          style={{ maxInlineSize: "50ch" }}
          data-reveal
        >
          If something here is still unclear, that is worth knowing — tell us and the answer gets
          rewritten.
        </p>
      </Section>

      <Section padBlock={[0, 40]} labelledBy="faq-build" className="section--rule">
        <h2 id="faq-build" className="spec-group__head" style={{ marginBlockEnd: 20 }}>
          Working with us
        </h2>
        <div data-reveal>
          <FaqAccordion items={[...faqs]} defaultOpen={0} />
        </div>
      </Section>

      <Section padBlock={[0, 52]} labelledBy="faq-money">
        <h2 id="faq-money" className="spec-group__head" style={{ marginBlockEnd: 20 }}>
          Price and terms
        </h2>
        <div data-reveal>
          <FaqAccordion items={[...pricingFaqs]} defaultOpen={-1} />
        </div>
      </Section>

      <CtaBand title="Still unanswered? Ask us directly." />
    </main>
  );
}
