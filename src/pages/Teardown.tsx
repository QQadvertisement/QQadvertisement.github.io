import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Seo, { breadcrumbsJsonLd } from "../components/Seo";
import PlayableFrame from "../components/PlayableFrame";
import { Section } from "../components/blocks";
import { SpecGroup, SpecList, SpecRow } from "../components/ui/Spec";
import { usePlayable } from "../hooks/usePlayable";
import type { Condition } from "../hooks/usePlayable";
import { complianceRows, demos, getDemo, kb } from "../data/demos";
import { playables } from "../data/playables";
import { measurements, measuredAt } from "../data/measurements.generated";

const BEAR_URL = "/assets/brand/bear.png";

const CONDITIONS: { id: Condition; label: string }[] = [
  { id: "portrait", label: "Portrait" },
  { id: "landscape", label: "Landscape" },
  { id: "slow3g", label: "Slow 3G" },
];

/**
 * /demos/[slug] — the live teardown. The signature page.
 *
 * The playable runs live on the left; the spec sheet on the right
 * reacts to what the visitor actually does. The session panel is the
 * point of the page: it is genuine instrumentation, not a comp, and it
 * is the strongest form of "mono means measured" — the numbers are
 * being recorded off the reader as they read.
 *
 * Teal census for this page: 5.
 *   1. playable focus ring   2. loader progress rule
 *   3. play button           4. restart / play-again
 *   5. the live readouts, as one group
 * Everything else — spec rows, PASS marks, the export button, the next
 * -build link — is neutral.
 *
 * The two-column split collapses at 1024, before the spec sheet can
 * drop under ~440px (tokens audit A3, risk 1).
 */
export default function Teardown() {
  const { slug } = useParams();
  const demo = getDemo(slug);
  const [condition, setCondition] = useState<Condition>("portrait");

  const measurement = demo?.measurementId ? measurements[demo.measurementId] : undefined;
  const playable = usePlayable({
    // The load is real: we fetch the shipped file and report the bytes
    // as they arrive. Where the build lives off-site, we load the
    // page's own bear asset instead and never claim it is the build.
    assetUrl: demo?.embedGame ? playables[demo.embedGame].src : BEAR_URL,
    fallbackBytes: measurement?.bytes ?? 26122,
    condition,
  });

  if (!demo) return <Navigate to="/demos" replace />;

  const index = demos.findIndex((d) => d.slug === demo.slug);
  const next = demos[(index + 1) % demos.length];
  const others = demos.filter((d) => d.slug !== demo.slug);
  const rows = complianceRows(demo);

  const { phase, elapsedMs, received, loadMs, liveBytes } = playable;
  const running = phase === "running";

  let status = "IDLE";
  if (running) status = "RUNNING";
  else if (phase === "ready") status = "READY";

  /* What the panel can and cannot see.
     The frame runs the shipped file itself, so everything inside it —
     taps, beats reached, score — belongs to that file and is not
     readable from this page. An earlier build printed those numbers
     anyway by driving a stand-in mechanic of its own; they measured the
     stand-in, not the build, so they are gone. What is left is measured
     for real: the bytes fetched, the load, and how long the visitor has
     had the build open. */

  return (
    <main className="main">
      <Seo
        title={`${demo.title} — ${demo.client} Playable Teardown | QQ Advertisement`}
        description={demo.lede}
        path={`/demos/${demo.slug}`}
        image={demo.thumb ? `https://qqadvertisement.com${demo.thumb}` : undefined}
        jsonLd={breadcrumbsJsonLd([
          { name: "Demos", path: "/demos" },
          { name: demo.title, path: `/demos/${demo.slug}` },
        ])}
      />

      <div className="teardown">
        {/* Title block — second on mobile, above both columns on desktop */}
        <div className="teardown__title-block">
          <div>
            <p className="hero__kicker">{demo.kicker}</p>
            <h1 className="t-display t-display-xs t-display-xl-at-desktop" style={{ marginBlockEnd: 16 }}>
              {demo.title}
            </h1>
            <p className="t-body-md t-body-lg-at-desktop c-body" style={{ maxInlineSize: "52ch" }}>
              {demo.lede}
            </p>
          </div>
          <dl className="teardown__stats">
            {demo.headlineStats.map((s) => (
              <div className="teardown__stat" key={s.caption}>
                <dt className="t-numeral t-numeral-sm">{s.value}</dt>
                <dd>{s.caption}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Left rail — the playable. First in reading order on mobile. */}
        <div className="teardown__rail">
          <div className="teardown__rail-head">
            <span>{demo.embedGame ? "Running the shipped file" : "The build, in production"}</span>
            <span>{condition === "slow3g" ? "Throttled · simulated" : demo.orientation}</span>
          </div>

          <PlayableFrame
            playable={playable}
            game={demo.embedGame}
            buildName={demo.title.toUpperCase()}
            ariaBuildName={demo.title}
            poster={demo.thumb}
            posterAlt={demo.thumbAlt}
            liveUrl={demo.liveUrl}
          />

          <div className="teardown__conditions" role="group" aria-label="Playback condition">
            {CONDITIONS.map((c) => (
              <button
                key={c.id}
                type="button"
                className="teardown__condition"
                aria-pressed={condition === c.id}
                onClick={() => setCondition(c.id)}
              >
                {c.label.toUpperCase()}
              </button>
            ))}
          </div>
          <p className="t-body-2xs c-muted" style={{ marginBlockStart: 12, textAlign: "center" }}>
            Slow 3G paces the same real bytes to a 400 kbit/s profile. It is a simulation, and it is
            the only number on this page that is.
          </p>

          {demo.liveUrl ? (
            <a
              className="btn btn--muted btn--lg btn--block"
              style={{ marginBlockStart: 16 }}
              href={demo.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open the build in production →
            </a>
          ) : (
            <a
              className="btn btn--muted btn--lg btn--block"
              style={{ marginBlockStart: 16 }}
              href={demo.embedGame ? playables[demo.embedGame].src : undefined}
              target="_blank"
              rel="noreferrer"
            >
              Open the shipped file →
            </a>
          )}
        </div>

        {/* Right column — the spec sheet */}
        <div className="teardown__sheet">
          {/* The only navy panel inside a light column. Its ground is
              what makes the live teal readouts legal. */}
          <section className="session-panel ground-dark" aria-labelledby="session-head">
            <div className="session-panel__head">
              <h2 id="session-head" className="session-panel__label">
                Your session · measured live
              </h2>
              <span className="session-panel__status" data-live={running ? "true" : undefined}>
                {status}
              </span>
            </div>
            <SpecList density="comfortable" live>
              {/* Bytes are reported ONLY where the thing fetched is the
                  build. Off-site builds load a stand-in asset just to
                  drive the loader, and printing its weight here would
                  read as the build's own. The row is absent instead. */}
              {measurement ? (
                <>
                  <SpecRow
                    label="Fetched this session"
                    value={received > 0 ? kb(received) : "—"}
                    qualifier={liveBytes ? "/ live" : "/ build-time figure"}
                    live
                  />
                  <SpecRow
                    label="Load time"
                    value={phase === "loading" ? "—" : `${loadMs} MS`}
                    live
                  />
                </>
              ) : (
                <SpecRow label="Weight this session" value="NOT FETCHED HERE" />
              )}
              <SpecRow
                label={demo.embedGame ? "Time on build" : "Time on page"}
                value={running ? `${(elapsedMs / 1000).toFixed(1)} S` : "—"}
                live
              />
              <SpecRow
                label="Inside the build"
                value={demo.embedGame ? "NOT INSTRUMENTED" : "NOT EMBEDDED"}
              />
            </SpecList>
            <p className="t-body-2xs c-muted" style={{ marginBlockStart: 12 }}>
              {demo.embedGame
                ? "The frame runs the shipped file, so what happens inside it is the file's, not this page's. We would rather show a short panel we can stand behind than instrument a stand-in and call it the build."
                : "This build runs on the open web and writes every play to its production database, so we do not frame it here and we do not fetch it to weigh it. The link opens the real thing."}
            </p>
          </section>

          {/* The file — every value read off it at build time */}
          <SpecGroup head="The file" aside={measurement ? `Measured ${measuredAt}` : undefined}>
            <SpecList density="comfortable">
              {demo.file.map((r) => (
                <SpecRow key={r.label} label={r.label} value={r.value} qualifier={r.qualifier} />
              ))}
            </SpecList>
          </SpecGroup>

          {/* The beats — the file's own instrumentation, in order.
              There is no per-visitor timing column: the beats fire
              inside the shipped file, and this page cannot see them.
              The previous build filled this column from a stand-in
              mechanic, which made the numbers look measured when they
              were not. Playing the frame is how you see the beats. */}
          <SpecGroup head="The beats" aside="In the shipped file">
            <div className="beats">
              {demo.beats.map((b, i) => (
                <div className="beat" key={b.name}>
                  <span className="beat__index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="beat__name">{b.name}</span>
                  <span className="beat__leader" aria-hidden="true" />
                  <span className="beat__note">{b.note}</span>
                </div>
              ))}
            </div>
            <p className="t-body-xs c-body" style={{ marginBlockStart: 14, maxInlineSize: "56ch" }}>
              These are the beats the shipped file instruments, in order. Timings are not printed:
              they fire inside the file, which is the thing running in the frame, and we are not
              going to estimate them from out here. Play it and you will pass every one.
            </p>
          </SpecGroup>

          {/* Network compliance — computed, not asserted */}
          {rows.length ? (
            <SpecGroup head="Network compliance · at ship">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Network</th>
                    <th scope="col">Weight cap</th>
                    <th scope="col" className="col-measured">
                      Measured
                    </th>
                    <th scope="col">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.network}>
                      <td>{r.network}</td>
                      <td className="is-secondary">{r.cap}</td>
                      <td className="is-secondary col-measured">{r.measured}</td>
                      <td className="is-result">{r.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {demo.complianceNote ? (
                <p className="t-body-xs c-body" style={{ marginBlockStart: 14, maxInlineSize: "56ch" }}>
                  {demo.complianceNote}
                </p>
              ) : null}
            </SpecGroup>
          ) : (
            <SpecGroup head="Network compliance">
              <p className="t-body-sm c-body" style={{ paddingBlockStart: 14, maxInlineSize: "56ch" }}>
                {demo.complianceNote}
              </p>
            </SpecGroup>
          )}

          {/* Name the loss */}
          <section className="panel" aria-labelledby="change-head">
            <h2 id="change-head" className="t-mono t-mono-2xs c-muted u-upper" style={{ marginBlockEnd: 14 }}>
              What we'd change next time
            </h2>
            <p className="t-body-sm c-body" style={{ marginBlockEnd: 20 }}>
              {demo.changeNote}
            </p>
            <SpecList density="compact" variant="top-ruled">
              {demo.nextTests.map((t) => (
                <SpecRow key={t.label} label={t.label} value={t.value} />
              ))}
            </SpecList>
          </section>

          <div className="btn-pair">
            <button type="button" className="btn btn--neutral btn--lg" onClick={() => window.print()}>
              Export this teardown
            </button>
            <a className="btn btn--muted btn--lg" href="/#contact">
              Ask about this build
            </a>
          </div>
        </div>
      </div>

      {/* Related builds */}
      <Section ground="dark" padBlock={[40, 44]} labelledBy="related-head">
        <div className="section-head-row" style={{ marginBlockEnd: 20 }}>
          <h2 id="related-head" className="t-display t-display-3xs t-display-xs-at-desktop c-primary">
            {others.length === 1 ? "One more, torn down the same way" : "More, torn down the same way"}
          </h2>
          <p className="section-head-row__note t-mono t-mono-xs c-muted u-upper">
            Same spec sheet · same measurements
          </p>
        </div>
        <div className="related-grid">
          {others.map((d) => (
            <Link className="card-on-ground" to={`/demos/${d.slug}`} key={d.slug}>
              <div className="related-card__thumb">
                {d.thumb ? <img src={d.thumb} alt="" /> : null}
              </div>
              <div className="related-card__body">
                <h3 className="t-body-md t-semibold c-primary" style={{ marginBlockEnd: 12 }}>
                  {d.title}
                </h3>
                <SpecList density="compact">
                  <SpecRow label="Client" value={d.client} />
                  <SpecRow
                    label="Weight"
                    value={
                      d.measurementId && measurements[d.measurementId]
                        ? kb(measurements[d.measurementId].bytes)
                        : "Mobile web"
                    }
                  />
                </SpecList>
              </div>
            </Link>
          ))}
          <Link className="card-on-ground" to={next.slug === demo.slug ? "/demos" : `/demos/${next.slug}`}>
            <div className="related-card__body" style={{ padding: 18 }}>
              <h3 className="t-body-md t-semibold c-primary" style={{ marginBlockEnd: 8 }}>
                Every build we can show
              </h3>
              <p className="t-body-xs c-body">
                Most of the work is under NDA. The index lists what is not.
              </p>
              <p className="t-mono t-mono-xs c-muted u-upper" style={{ marginBlockStart: 12 }}>
                All demos →
              </p>
            </div>
          </Link>
        </div>
      </Section>
    </main>
  );
}
