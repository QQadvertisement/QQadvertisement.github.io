import PageSkeleton from "../components/ui/PageSkeleton";

/* ---------------------------------------------------------------
   THE ROUTES THAT EXIST BEFORE THEIR CONTENT DOES.

   Nine pages the 2026-08-20 sitemap publishes and the business has
   not written. Each is a real route with a real title, description and
   CTA, and an honest outline of what it will hold. None of them
   invents a word of content — see PageSkeleton for the argument.

   They are together in one file on purpose: it is the list of what is
   outstanding, and it should be uncomfortable to look at until it is
   empty. Finishing one means deleting its export here and adding a
   real page — the route, the SEO entry and the nav link already point
   at it and do not change.
   --------------------------------------------------------------- */

export function CreativeTesting() {
  return (
    <PageSkeleton
      path="/for-game-studios/testing"
      metaTitle="Creative Testing for Game Studios | QQ Advertisement"
      description="How to run a playable creative test that produces a decision: how many concepts, how many variants, what to hold constant and when to call it."
      title="How to test creative without burning a month."
      lede="This page will lay out the testing method we run with studios — how many concepts it takes to find a winner, what to change between variants, and how to read the result. It is being written from the tests we have actually run, which is why it is not here yet."
      outline={[
        "The test matrix: concepts, hooks, difficulty, end cards — and which one to move first",
        "How many variants a decision actually needs",
        "What to hold constant so the result means something",
        "Reading the result: IPM, CPI and the trap of calling it early",
        "The refresh cadence that keeps a winner alive",
      ]}
      ctaTitle="Want the method applied to your title?"
    />
  );
}

export function InteractiveDemos() {
  return (
    <PageSkeleton
      path="/for-brands/demos"
      metaTitle="Interactive Product Demos | QQ Advertisement"
      description="Product demos, try-ons and configurators that run inside the ad slot — what each format is for, and which one fits the thing you're selling."
      title="Which interactive format fits what you sell."
      lede="Product demo, try-on, configurator, mini-game — they are not interchangeable, and picking the wrong one is the most expensive decision in a brand playable. This page will match format to product category, with a live build against each."
      outline={[
        "Product demo — for things that need to be understood before they're wanted",
        "Try-on / AR-lite — for things bought on how they look on you",
        "Configurator — for things with options that change the price",
        "Mini-game + offer — for things bought on impulse",
        "What each one costs to build, and what it needs from your brand team",
      ]}
      ctaTitle="Send the brand deck and we'll recommend a format."
    />
  );
}

export function Benchmarks() {
  return (
    <PageSkeleton
      path="/resources/benchmarks"
      metaTitle="Playable Ad Benchmarks by Network | QQ Advertisement"
      description="What good looks like per network: file weight caps, time to interaction, and the metrics a playable is judged on before it's allowed to run."
      title="What good looks like, per network."
      lede="Two halves, and only one of them can be written today. The hard specs — weight caps, MRAID versions, orientation rules — are published by the networks and verifiable. The performance benchmarks are not ours to publish until we have enough campaigns to average honestly. This page ships when the second half can be sourced."
      outline={[
        "Published caps and specs, per network, with the source for each",
        "Time to interaction: what the networks require and what actually holds attention",
        "Weight budgets by format — playable, end card, variant set",
        "Performance ranges by vertical — pending enough campaigns to average honestly",
        "How we measure our own builds, and why those numbers are read off the file",
      ]}
    />
  );
}

export function Glossary() {
  return (
    <PageSkeleton
      path="/glossary"
      metaTitle="Playable Ads and UA Glossary | QQ Advertisement"
      description="IPM, CPI, D7 ROAS, MRAID, exit API, end card, playable — the vocabulary a user-acquisition conversation assumes you already have."
      title="The vocabulary the room assumes you have."
      lede="Every UA conversation runs on about forty acronyms, and nobody stops to define them. This will be the plain-language version — each term, what it actually measures, and why anyone cares."
      outline={[
        "Metrics — IPM, CPI, CPM, CTR, CVR, D1/D7 ROAS, retention",
        "Formats — playable, end card, interstitial, rewarded, variant set",
        "Technical — MRAID, exit API, single-file build, atlas, TTI",
        "Buying — bid, budget cap, creative fatigue, frequency",
      ]}
    />
  );
}

export function Blog() {
  return (
    <PageSkeleton
      path="/blog"
      metaTitle="Notes on Playable Ads | QQ Advertisement"
      description="Teardowns of builds that aren't ours, notes on what tested badly, and the occasional argument about creative testing."
      title="Notes, teardowns, and things that didn't work."
      lede="Not a content marketing schedule. Posts go up when there is something worth saying — usually a teardown of a build that is not ours, or a test that failed in a way worth explaining. The first ones are being written."
      outline={[
        "Teardowns of builds we did not make",
        "Tests that failed, and what the failure was actually telling us",
        "Network changes worth knowing about",
        "Arguments about creative testing we are willing to have in public",
      ]}
    />
  );
}

export function Careers() {
  return (
    <PageSkeleton
      path="/careers"
      metaTitle="Careers | QQ Advertisement"
      description="How we work, what we hire for, and how to reach us if you build things that run in 2 MB."
      title="We hire people who ship the file."
      lede="No headcount is stated anywhere on this site and that is not going to change here. When there is a role, it will be described here in full — the work, the money, and the terms. Until then, the door is not closed: if you build things that survive a 2 MB budget, write to us."
      outline={[
        "How we work — one thread, one build owner, source files at the end",
        "What we look for in a build engineer, and in a creative lead",
        "Open roles, when there are any, with the salary in the post",
        "How to apply without a role being open",
      ]}
      ctaTitle="No role open? Write to us anyway."
    />
  );
}

/* --- Legal. Boilerplate is still a legal document, and a wrong one
   is worse than an absent one, so these carry the outline and no
   invented clauses. They need a lawyer's pass, not a writer's. --- */

export function Privacy() {
  return (
    <PageSkeleton
      path="/privacy"
      metaTitle="Privacy Policy | QQ Advertisement"
      description="What data this site collects, what the playables collect, how long it is kept and who it is shared with."
      title="Privacy policy"
      lede="This page needs a lawyer's pass rather than a writer's, and it is not one to approximate — the site runs analytics and the playables are instrumented, so the policy has to describe two different kinds of collection accurately. It is outstanding, and it is listed here rather than quietly missing."
      outline={[
        "What the site collects — analytics, and the legal basis for it",
        "What a playable collects when someone plays it, and who receives it",
        "The brief form: what is stored, for how long, and who can read it",
        "Third parties — analytics, scheduling, form handling",
        "Your rights, and the address to exercise them at",
      ]}
      ctaTitle="Questions about data? Ask directly."
    />
  );
}

export function Terms() {
  return (
    <PageSkeleton
      path="/terms"
      metaTitle="Terms of Service | QQ Advertisement"
      description="The terms covering work commissioned from QQ Advertisement: scope, revisions, ownership, payment and the build guarantee."
      title="Terms of service"
      lede="The commercial terms this site already states in public — the guarantee, the flat price, that you keep the source files — need to exist as an agreement rather than as marketing copy. That is what this page will be, and it needs a lawyer's pass before it goes up."
      outline={[
        "Scope: what a build includes, and what counts as a revision",
        "Ownership: you keep the source, and what that covers",
        "The guarantee, stated as a term rather than a promise",
        "Payment, cancellation and pausing a retainer",
        "Confidentiality and the NDA that outlives the campaign",
      ]}
      ctaTitle="Need our terms before you can brief us? Ask."
    />
  );
}

export function Cookies() {
  return (
    <PageSkeleton
      path="/cookies"
      metaTitle="Cookie Policy | QQ Advertisement"
      description="Which cookies this site sets, what each one does, and how to refuse them."
      title="Cookie policy"
      lede="Short, because the site is close to cookie-free by design: no CDN scripts, no embedded scheduler, no ad pixels. What remains is analytics, and this page will name it exactly rather than reaching for a generic banner."
      outline={[
        "What is set, by whom, and for how long",
        "What is not set — and why the scheduler stays off-site",
        "How to refuse, and what stops working if you do",
      ]}
      ctaTitle="Questions about data? Ask directly."
    />
  );
}
