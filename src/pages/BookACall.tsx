import Seo from "../components/Seo";
import { Section } from "../components/blocks";
import { SpecList, SpecRow } from "../components/ui/Spec";
import CtaBand from "../components/ui/CtaBand";
import { BOOKING_URL, claims } from "../data/site";

/**
 * /book-a-call — the booking endpoint.
 *
 * The scheduler itself is Calendly and stays there; embedding it would
 * pull a third-party script and its cookies onto the site for one
 * route. What this page adds is the thing a bare scheduler link never
 * tells you: what the call is, how long, who is on it, and what to
 * bring. That is the difference between a booked slot and a booked
 * slot that was worth taking.
 */
export default function BookACall() {
  return (
    <main className="main">
      <Seo
        title="Book a Call | QQ Advertisement"
        description="Thirty minutes with the people who build the playables. Bring the creative that's winning now and we'll tell you what we'd test against it."
        path="/book-a-call"
      />

      <Section padBlock={[40, 48]} labelledBy="call-head">
        <div className="opener">
          <div>
            <h1
              id="call-head"
              className="t-display t-display-sm t-display-2xl-at-desktop"
              style={{ maxInlineSize: "18ch", marginBlockEnd: 20 }}
              data-reveal
            >
              Thirty minutes, your build open.
            </h1>
            <p
              className="t-body-md t-body-lg-at-desktop c-body"
              style={{ maxInlineSize: "50ch", marginBlockEnd: 28 }}
              data-reveal
            >
              Not a discovery call. Bring the creative that is winning right now and the networks
              you buy on, and you will leave with a mechanic worth testing against it — whether or
              not we build it.
            </p>
            <a
              className="btn btn--accent btn--xl"
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              data-reveal
            >
              Open the calendar
            </a>
          </div>

          <div data-reveal>
            <h2 className="spec-group__head">The call</h2>
            <SpecList density="comfortable">
              <SpecRow label="Length" value="30 minutes" />
              <SpecRow label="On the call" value="The build owner" />
              <SpecRow label="Bring" value="Your best creative" />
              <SpecRow label="You leave with" value="A mechanic + a number" />
              {claims.replyRows.slice(0, 1).map((r) => (
                <SpecRow key={r.label} label={r.label} value={r.value} />
              ))}
            </SpecList>
          </div>
        </div>
      </Section>

      <CtaBand title="Rather just send the build and get a price?" variant="secondary" />
    </main>
  );
}
