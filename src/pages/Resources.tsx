import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { Section } from "../components/blocks";
import CtaBand from "../components/ui/CtaBand";

/**
 * /resources — the hub.
 *
 * A hub page earns its place only if it does something a dropdown
 * cannot, so this one says what each resource is FOR rather than
 * listing five titles. The ones that are written are live; the ones
 * being written say so and link anyway, because a reader deciding
 * whether to come back deserves to know what is coming.
 *
 * LAYOUT. Five items in a two-column grid leaves the fifth alone on
 * its own row beside a hole — which is what shipped first, and it read
 * as a broken page rather than a deliberate one. The fix is not a
 * third column (five is prime; every symmetric grid strands one).
 *
 * Instead the set is split the way it actually divides: the WRITTEN
 * ones lead, at full width, because they are the ones worth a click
 * today; the IN PROGRESS ones follow in a tighter grid underneath.
 * Two ordered rows and a hole nowhere. The hierarchy is the honest
 * one — finished work above unfinished — so the layout is carrying
 * meaning rather than filling space.
 */
const resources = [
  {
    title: "Playables 101",
    to: "/playable-ads-explained",
    body: "What a playable ad actually is, how it differs from a video or an end card, and why the file weight decides whether anyone sees it.",
    state: "Written",
  },
  {
    title: "Benchmarks",
    to: "/resources/benchmarks",
    body: "What good looks like per network and per vertical — file weight, time to interaction, and the metrics a playable is judged on.",
    state: "In progress",
  },
  {
    title: "Glossary",
    to: "/glossary",
    body: "IPM, CPI, D7 ROAS, MRAID, playable, end card, exit API. The vocabulary a UA conversation assumes you already have.",
    state: "In progress",
  },
  {
    title: "Blog",
    to: "/blog",
    body: "Teardowns of builds that are not ours, notes on what tested badly, and the occasional argument about creative testing.",
    state: "In progress",
  },
  {
    title: "FAQ",
    to: "/faq",
    body: "How we work, what we need to start, who owns the files afterwards, and what a build costs.",
    state: "Written",
  },
] as const;

function ResourceCard({
  resource,
  lead = false,
}: {
  resource: (typeof resources)[number];
  lead?: boolean;
}) {
  return (
    <li>
      <Link className="res-card" to={resource.to} data-lead={lead ? "true" : undefined}>
        <span className="res-card__head">
          <span
            className={
              lead ? "res-card__title t-display t-display-3xs" : "res-card__title t-body-xl t-semibold"
            }
          >
            {resource.title}
          </span>
        </span>
        <span className="res-card__body t-body-sm">{resource.body}</span>
        <span className="res-card__go t-mono t-mono-2xs u-upper">
          Read
          <span className="btn__arrow" aria-hidden="true">
            {" "}
            →
          </span>
        </span>
      </Link>
    </li>
  );
}

export default function Resources() {
  /* Split by state rather than sliced by count — adding a sixth
     resource, or finishing one, re-balances both rows on its own. */
  const written = resources.filter((r) => r.state === "Written");
  const pending = resources.filter((r) => r.state !== "Written");

  return (
    <main className="main">
      <Seo
        title="Playable Ad Resources | QQ Advertisement"
        description="Playables explained, per-network benchmarks, a UA glossary, teardowns and the questions we get weekly — the reference material behind the builds."
        path="/resources"
      />

      <Section padBlock={[40, 40]} labelledBy="res-head">
        <h1
          id="res-head"
          className="t-display t-display-sm t-display-2xl-at-desktop"
          style={{ maxInlineSize: "20ch", marginBlockEnd: 20 }}
          data-reveal
        >
          The reference material behind the builds.
        </h1>
        <p
          className="t-body-md t-body-lg-at-desktop c-body"
          style={{ maxInlineSize: "52ch" }}
          data-reveal
        >
          Written for the person who has to defend a creative decision to someone else. No gated
          PDFs, no email wall.
        </p>
      </Section>

      <Section padBlock={[0, 40]} labelledBy="res-ready" className="section--rule">
        <h2 id="res-ready" className="spec-group__head" style={{ marginBlockEnd: 20 }}>
          Ready to read
        </h2>
        <ul className="res-list res-list--lead" data-reveal>
          {written.map((r) => (
            <ResourceCard key={r.to} resource={r} lead />
          ))}
        </ul>
      </Section>

      <Section padBlock={[0, 52]} labelledBy="res-soon">
        <h2 id="res-soon" className="spec-group__head" style={{ marginBlockEnd: 20 }}>
          Being written
        </h2>
        <ul className="res-list" data-reveal>
          {pending.map((r) => (
            <ResourceCard key={r.to} resource={r} />
          ))}
        </ul>
      </Section>

      <CtaBand title="Read enough? Send us the build." variant="secondary" />
    </main>
  );
}
