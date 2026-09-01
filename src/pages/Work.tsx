import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import DemoCard, { NdaCard } from "../components/DemoCard";
import { Section } from "../components/blocks";
import CtaBand from "../components/ui/CtaBand";
import { demos } from "../data/demos";
import { networks } from "../data/site";

/**
 * /work — the playable library, wireframe `1g`. Was /demos.
 *
 * THE FILTERS ARE URL STATE, not component state. A filtered library
 * is a thing people send to each other — "here, the puzzle ones" — and
 * a filter that lives in a hook cannot be sent. `?audience=studios&
 * network=meta` is the whole feature; `useSearchParams` is the whole
 * implementation.
 *
 * A NOTE ON SIZE, because the wireframe and the repository disagree
 * loudly. `1g` draws eight cards, a `Load more`, and a count reading
 * "All (42)". There are two builds, and one of them — Friends Ramen —
 * can never be embedded, because it is a live mobile web page that
 * writes every play to a production database. So:
 *
 *   · the count is computed, never typed. It says what is there.
 *   · `Load more` appears only when there is more to load. A button
 *     that pages a two-item list is a lie about the shelf's depth.
 *   · a facet with one option is not rendered. A filter that cannot
 *     change the result is furniture.
 *
 * All three come back on their own as builds are added. Nothing here
 * needs revisiting when the library reaches 42 — see docs/rebuild-
 * audit.md §6.3.
 */

const PAGE_SIZE = 8;

interface Facet {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

export default function Work() {
  const [params, setParams] = useSearchParams();

  /* Facets are derived from the data, so a build with a new vertical
     brings its own filter with it. */
  const facets = useMemo<Facet[]>(() => {
    const unique = (get: (d: (typeof demos)[number]) => string) =>
      [...new Set(demos.map(get))].sort();

    const all: Facet[] = [
      {
        /* `a`, not `audience` — the sitemap publishes /work?a=games and
           /work?a=brands as linkable addresses, so the short key is
           part of the contract, not an abbreviation. */
        key: "a",
        label: "Audience",
        options: unique((d) => d.audience).map((v) => ({
          value: v,
          label: v === "games" ? "Game studios" : "Brands",
        })),
      },
      {
        key: "vertical",
        label: "Vertical",
        options: unique((d) => d.vertical).map((v) => ({ value: v, label: v })),
      },
      {
        key: "format",
        label: "Format",
        options: unique((d) => d.format).map((v) => ({ value: v, label: v })),
      },
      {
        key: "network",
        label: "Network",
        options: networks
          .filter((n) => demos.some((d) => d.networks.includes(n.id)))
          .map((n) => ({ value: n.id, label: n.name })),
      },
    ];
    /* One option cannot filter anything. */
    return all.filter((f) => f.options.length > 1);
  }, []);

  const active = Object.fromEntries(
    facets.map((f) => [f.key, params.get(f.key) ?? ""]).filter(([, v]) => v)
  );

  const matches = demos.filter((d) => {
    if (active.a && d.audience !== active.a) return false;
    if (active.vertical && d.vertical !== active.vertical) return false;
    if (active.format && d.format !== active.format) return false;
    if (active.network && !d.networks.includes(active.network)) return false;
    return true;
  });

  const shown = Number(params.get("show") ?? PAGE_SIZE);
  const visible = matches.slice(0, shown);
  const hasMore = matches.length > visible.length;

  const setFacet = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    /* Paging resets when the set changes — otherwise a narrowed
       result inherits a page size that no longer means anything. */
    next.delete("show");
    setParams(next, { replace: false });
  };

  const clearAll = () => {
    const next = new URLSearchParams(params);
    facets.forEach((f) => next.delete(f.key));
    next.delete("show");
    setParams(next, { replace: false });
  };

  const filtered = Object.keys(active).length > 0;

  return (
    <main className="main">
      <Seo
        title="Playable Ad Library | QQ Advertisement"
        description="Every playable ad build we can publish, running in the browser. Each one opens the shipped file and its full teardown — measured weight, instrumented beats, per-network compliance."
        path="/work"
      />

      <Section padBlock={[40, 28]} labelledBy="work-head">
        <p className="hero__kicker" data-reveal>
          Work · every build we can publish
        </p>
        <h1
          id="work-head"
          className="t-display t-display-sm t-display-2xl-at-desktop"
          style={{ marginBlockEnd: 20 }}
          data-reveal
        >
          Everything here is playable in-browser.
        </h1>
        <p
          className="t-body-md t-body-lg-at-desktop c-body"
          style={{ maxInlineSize: "52ch" }}
          data-reveal
        >
          The real files, not video captures. Each one loads the shipped build in front of you,
          reports its measured weight, and says what we'd change.
        </p>
      </Section>

      {facets.length ? (
        <Section padBlock={[0, 28]} labelledBy="filters-head">
          <h2 id="filters-head" className="u-visually-hidden">
            Filter the library
          </h2>
          <div className="filter-bar">
            <span className="filter-bar__count t-mono t-mono-xs u-upper" aria-live="polite">
              {filtered ? `${matches.length} of ${demos.length}` : `All (${demos.length})`}
            </span>

            {facets.map((f) => (
              <label className="filter" key={f.key}>
                <span className="u-visually-hidden">{f.label}</span>
                <select
                  className="filter__select t-mono t-mono-2xs u-upper"
                  value={active[f.key] ?? ""}
                  onChange={(e) => setFacet(f.key, e.target.value)}
                >
                  <option value="">{f.label}</option>
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}

            {filtered ? (
              <button type="button" className="filter__clear t-mono t-mono-2xs u-upper" onClick={clearAll}>
                Clear
              </button>
            ) : null}
          </div>
        </Section>
      ) : null}

      <Section padBlock={[0, 48]} labelledBy="work-list">
        <h2 id="work-list" className="u-visually-hidden">
          Published builds
        </h2>

        {visible.length ? (
          <div className="build-grid">
            {visible.map((d) => (
              <DemoCard key={d.slug} demo={d} />
            ))}
            {/* The NDA tile belongs to the unfiltered shelf. Inside a
                filtered result it would imply there are hidden builds
                matching that filter, which we cannot know. */}
            {filtered ? null : <NdaCard />}
          </div>
        ) : (
          <p className="t-body-md c-body">
            Nothing in the library matches that combination yet.{" "}
            <button type="button" className="link-inline" onClick={clearAll}>
              Clear the filters
            </button>{" "}
            to see everything.
          </p>
        )}

        {hasMore ? (
          <div className="build-grid__more">
            <button
              type="button"
              className="btn btn--muted btn--lg"
              onClick={() => setFacet("show", String(shown + PAGE_SIZE))}
            >
              Load more
            </button>
          </div>
        ) : null}
      </Section>

      <CtaBand title="Seen one you want a version of?" variant="secondary" />
    </main>
  );
}
