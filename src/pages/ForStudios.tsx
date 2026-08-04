import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import ContactForm from "../components/ContactForm";
import { ProcessSteps, RuleGrid, Section } from "../components/blocks";
import { SpecList, SpecRow } from "../components/ui/Spec";
import { buildVolumeOptions, claims } from "../data/site";

/**
 * /for-studios — the other half of the homepage fork.
 *
 * Not comped. It is built entirely from components that were comped
 * (spec rows, process steps, rule grid, contact form), so it inherits
 * the system rather than inventing a new one. One teal instance: the
 * link through to a playable demo is neutral, so this page has none.
 */
const workflow = [
  {
    title: "You keep the repository",
    body: "Source, sprite originals and the spec sheet, including the variants that lost.",
  },
  {
    title: "One thread, one owner",
    body: "No account layer between you and the person writing the code.",
  },
  {
    title: "Your loop, not a template",
    body: "We play the build first and pick the mechanic that survives eight seconds.",
  },
  {
    title: "Weekly link, not a zip",
    body: "Every build lands as a URL you can open on a phone in the meeting.",
  },
];

export default function ForStudios() {
  return (
    <main className="main">
      <Seo
        title="Playable Ads for Game Studios | QQ Advertisement"
        description="We read your core loop and build a playable that keeps the mechanic honest — not a mini-game wearing your art. Under 2 MB, QA'd against six networks, and you keep the source."
        path="/for-studios"
      />

      <Section padBlock={[32, 40]} labelledBy="studios-head">
        <div className="split split--end" style={{ ["--side" as string]: "420px" }}>
          <div className="split__main">
            <p className="hero__kicker">For game studios · your loop, your art</p>
            <h1
              id="studios-head"
              className="t-display t-display-xs t-display-2xl-at-desktop"
              style={{ marginBlockEnd: 24 }}
            >
              <span style={{ display: "block" }}>We read the loop</span>
              <span style={{ display: "block" }}>before we draw</span>
              <span style={{ display: "block" }}>a single frame.</span>
            </h1>
            <p className="t-body-lg c-body" style={{ maxInlineSize: "50ch" }}>
              A playable that teaches your mechanic converts. A mini-game wearing your art does not.
              We start by playing your build, pick the beat that survives the first eight seconds,
              and write the spec down before anyone opens an editor.
            </p>
          </div>
          <div className="split__side">
            <h2 className="spec-group__head">What you get back</h2>
            <SpecList density="comfortable">
              <SpecRow label="File weight" value="Under 2 MB" />
              <SpecRow label="First interaction" value="Under 1 s" />
              <SpecRow label="Networks QA'd" value="6" />
              <SpecRow label="Source files" value="Yours" />
              <SpecRow label="Variant turn" value="48 hours" />
            </SpecList>
            <div className="btn-pair" style={{ marginBlockStart: 24 }}>
              <a className="btn btn--neutral btn--lg" href="#studios-contact">
                Send us the build
              </a>
              <Link className="btn btn--muted btn--lg" to="/demos">
                See a teardown
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section ground="dark" bleed padBlock={[64, 64]} labelledBy="studios-process">
        <div className="section-head-row" style={{ marginBlockEnd: 26 }}>
          <h2
            id="studios-process"
            className="t-display t-display-2xs t-display-md-at-desktop c-primary"
          >
            {claims.processTitle}
          </h2>
          <p className="section-head-row__note t-mono t-mono-xs c-muted u-upper">
            Durations are commitments
          </p>
        </div>
        <ProcessSteps steps={claims.process} />
      </Section>

      <Section padBlock={[56, 60]} labelledBy="studios-workflow">
        <div className="section-head-row" style={{ marginBlockEnd: 24 }}>
          <h2
            id="studios-workflow"
            className="t-display t-display-2xs t-display-md-at-desktop"
          >
            How the work actually runs
          </h2>
          <p className="section-head-row__note t-mono t-mono-xs c-muted u-upper">
            Four rules · no exceptions
          </p>
        </div>
        <RuleGrid items={workflow} />
      </Section>

      <Section
        id="studios-contact"
        padBlock={[56, 64]}
        labelledBy="studios-contact-head"
        className="section--rule"
      >
        <div className="split split--wide-gap" style={{ ["--side" as string]: "560px" }}>
          <div className="split__main">
            <h2
              id="studios-contact-head"
              className="t-display t-display-2xs t-display-lg-at-desktop"
              style={{ marginBlockEnd: 16 }}
            >
              <span style={{ display: "block" }}>Send us the build.</span>
              <span style={{ display: "block" }}>We'll send back a plan.</span>
            </h2>
            <p className="t-body-md c-body" style={{ maxInlineSize: "42ch", marginBlockEnd: 28 }}>
              A store link, a TestFlight or an APK is enough to start. We reply within one business
              day with a mechanic recommendation and a date.
            </p>
            <div style={{ maxInlineSize: 340 }}>
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
