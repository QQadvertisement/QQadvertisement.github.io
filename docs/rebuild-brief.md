# Rebuild brief — reconciled against the wireframes

**Supersedes** the brief pasted in chat on 2026-08-20. Where the two disagree, this file wins,
because the wireframes are the later thinking.

**The home page follows `1b`, not `1c`** — changed 2026-08-20 on the owner's call that the page was
"too much to read and action… giving paralysis". `1b` is the lean composition: the hero holds the
whole first decision, the fork is one band with one choice in it, and the page ends nine sections
later. See "Page structure" below for what that cut.

Companion documents:
`docs/rebuild-audit.md` (what exists today + the decisions and why),
`wireframe redesign plan/*.png` (options `1c` `2a` `2b` `1f` `1g` `1h`).

**The standing rule, unchanged:** the wireframes win on structure, IA and copy hierarchy;
the current build wins on visual language, type and colour. This is a restructure wearing the
existing skin, not a restyle and not a rewrite.

---

## Reconciliations — where this differs from the chat brief

| Chat brief said | Wireframe says | Resolution |
|---|---|---|
| Home follows `1c` — fork inside the first fold | `1b` — fork as its own band below a self-contained hero | **`1b`**, owner's call: `1c` asked for too many decisions in one screen. |
| Nav: `Demos · What we build · For Studios · For Agencies · Playables 101 · About` | `For Game Studios · For Brands · Work · How It Works · Pricing · Resources` | **Wireframe.** See the route map below. |
| Second lane is "For UA Agencies", `2b` rewritten in agency terms | `2b` is a brand page — beauty, QSR, auto, streaming | **Wireframe.** `/for-brands` replaces `/for-agencies`; the agency operating content migrates into `2b`'s "Works with your agency" block. |
| "Keep the pinned in-place scroll sections", fix pin geometry | No pinned sequence anywhere. `1c` asks for exactly one sticky element: the hero playable holding while the fork column scrolls. | **Wireframe.** The WhatWeBuild pin is removed; its stacked composition becomes the only composition. See "Motion" below. |
| Network strip of 7 | 7 logos | **Neither** — owner's call, stays at 3 (Meta, TikTok, Google Ads). |
| Accent = "one cyan/teal + amber for the guarantee" | `1c`/`1f` amber, `2a`/`2b`/`1g`/`1h` blue — self-contradictory | **`1b`.** Teal = play, amber = buy, navy = everything else. Full rule + the contrast maths in `rebuild-audit.md` §6.5. |
| Mascot in "footer, 404, loading" | not shown | **Current build**, which is stricter: in-frame loader, footer, 404, and none at all on the second audience lane. |

---

## Route map

Applied from the 2026-08-20 sitemap (`Playable Ads Studio Sitemap`). Five top-level nav items —
**How It Works was cut as repetitive**: it pointed at a home-page anchor whose content is also the
spine of `/for-game-studios`. The home section stays; the nav item that duplicated it does not.

| Route | Source | State |
|---|---|---|
| `/` | `1b` | built |
| `/for-game-studios` | `2a` | built (renamed from `/for-studios`) |
| `/for-game-studios/testing` | sitemap | **skeleton** |
| `/for-brands` | `2b` | built |
| `/for-brands/demos` | sitemap | **skeleton** |
| `/work` | `1g` | built — the library. `?a=games` / `?a=brands` are the published filters |
| `/work/industries` | sitemap | built — groups derived from the library, never listed by hand |
| `/work/:slug` | — | built (the teardown) |
| `/pricing` | `1f` | built. `#packages` `#studios` `#brands` `#faq` are live anchors |
| `/resources` | sitemap | built (hub) |
| `/resources/benchmarks` | sitemap | **skeleton** |
| `/playable-ads-explained` | — | built (listed under Resources as "Playables 101") |
| `/blog` · `/glossary` | sitemap | **skeleton** |
| `/faq` | sitemap | built — the union of the site and pricing FAQs, no third list |
| `/quote` | sitemap | built — the brief form, and `QUOTE_HREF` |
| `/book-a-call` | sitemap | built |
| `/thank-you` | sitemap | built (noindex by intent) |
| `/contact` | sitemap | built — the general front door, deliberately *not* the brief form |
| `/about` | — | built |
| `/careers` | sitemap | **skeleton** |
| `/privacy` · `/terms` · `/cookies` | sitemap | **skeleton** — need a lawyer's pass, not a writer's |
| `/case-studies/:slug` | — | legacy, indexed, keep |
| `/emagame` | — | fullscreen, no chrome |

**Redirects** (all indexed): `/for-studios` → `/for-game-studios`, `/for-agencies` → `/for-brands`,
`/demos` → `/work`, `/demos/:slug` → `/work/:slug`, `/our-work` → `/work`,
`/work/playables` → `/work`. Each carries a canonical pointing at its replacement and is excluded
from `sitemap.xml`.

**One deliberate departure from the sitemap.** It draws `/work` and `/work/playables` as parent and
child. With a single library there is nothing for the parent to be *except* that library, so
`/work` is the library and `/work/playables` is an alias — a hollow hub page above one real page is
a click that costs the reader something and returns nothing.

**Skeleton pages are real routes with no invented content**: title, description, heading, an honest
outline of what the page will hold, and a CTA band. See `src/components/ui/PageSkeleton.tsx` for the
argument and `src/pages/skeletons.tsx` for the outstanding list.

**Every route change must land in `scripts/postbuild-seo.mjs` in the same commit** or it ships
without SEO output.

---

## Page structure

Section order per wireframe; see the PNGs for the composition.

**`/` — `1b`.** Nine sections, in this order:

1. Sticky header, dual CTA.
2. **Hero, self-contained** — copy left, live playable right, no scrolling required. Eyebrow,
   two-line outcome headline, one lede, the dual CTA, then a hairline and three metrics. Nothing
   else in the fold.
3. **Fork band** — full bleed, two lanes, directly under the hero. Deliberately asymmetric: the
   studio lane is amber-filled, the brand lane sits on paper. It is the only decision on that
   screen.
4. **Network strip** — "Runs on every network", three logos.
5. **Featured work** — four wider cards in one row, plus `All playables →`.
6. **How it works** — three compact rows with day labels, **sharing its row** with:
7. **Pricing teaser** — one card: the price, `See pricing`, `Get a flat quote`.
8. **FAQ** — four rows, two columns, first open.
9. **Final CTA band** — dual CTA.

**What `1b` cuts from the home page, and where it went.** Nothing was deleted:

| Cut | Now lives |
|---|---|
| The brief form | `/contact`, its own route. Every "Get a flat quote" on the site lands there. |
| The guarantee band | `/pricing`, above the FAQ — its three numbers are the terms the price is quoted against. |
| "What we build" | `/for-brands` §4, "Formats we build". |
| The video-vs-playable comparison | Removed from `/`. Available to re-place if you want it. |
| "How we work" prose | Removed from `/`; the same commitments are in the six-day timeline. |
| The hero's "Where these run" spec list | Redundant with the network strip four sections down. |

**`/for-studios` — `2a`.** Compact opener + "Where does it hurt?" chip card → value map table
(stage → what you get → metric it moves) → case study centrepiece + 3 secondary cards → genres
shipped beside what we need from you → commitment block → pricing pair → CTA band.
No device frame in the opener. Shares zero hero markup with `/`.

**`/for-brands` — `2b`.** Opener + inline metric row and dual CTA → value ladder, four full-width
labelled rows (attention / understanding / intent / learning) → case studies, one large + three
compact → formats we build (2×2) beside "Works with your agency" + agency rate card → published
price strip → CTA band.

**`/pricing` — `1f`.** Header → three tiers (Single Playable / Campaign Pack, flagged / Monthly
Retainer) → add-ons row → us-vs-in-house table → pricing FAQ → dual CTA band.

**`/work` — `1g`.** Header → filter bar (audience, vertical, format, network + sort) → playable
card grid → `Load more` → CTA band. Filters URL-synced (`?audience=studios&network=meta`).

---

## Components — `1h`

Build or extend, never bulk-rename. Six of these already exist; see `rebuild-audit.md` §5 for
what each one is missing.

`PlayableFrame` (5 states: idle → loading → playing → replay → complete+CTA) ·
`PlayableModal` (any card, any page, `?play=slug`, Esc, focus trap, restores scroll) ·
`PlayableCard` (`grid` / `featured` / `compact`) · `MetricChip` · `BigMetric` (never below 34px) ·
`PricingTier` (`default` / `flagged`) · `NetworkStrip` · `CtaBand` (`primary` / `secondary`,
always two buttons) · `StickyHeader` (condensed on scroll, CTA pair never hidden) · `ForkCard` ·
`SpecRow` · `FaqAccordion`.

---

## Motion

The scroll-animation section of the chat brief is retired. There is no animation library in this
repo and no pinned sequence in the wireframes.

- **Keep:** the sticky header, and `useReveal` — one IntersectionObserver, opacity + small
  translate, fires once, never reverses.
- **Removed:** the sticky hero playable. `1b` says "no scrolling required" — the fold is
  self-contained and the fork band is the next thing, so a device travelling alongside a scrolling
  column implies more to read against it than there is. **The site now has no scroll-linked
  behaviour at all.**
- **Remove:** the WhatWeBuild pinned sequence. Its stacked composition was written as a full
  second design rather than a fallback, so it becomes the only composition and the track, pin,
  rail and scroll handler are deleted. This leaves **no scroll handler in `src/`**.
- **Unchanged constraints:** transforms and opacity only, never layout; `prefers-reduced-motion`
  renders everything as static stacked flow; nothing may overlap a section headline at any scroll
  offset; touch and click must always reach the playable iframe.

---

## Copy and numbers

- Every headline is an outcome or a fact, never a category label.
- **Every number renders from a `src/content/*.ts` entry carrying a `source` field. A metric with
  no source does not render at all** — the slot stays empty rather than being filled with a guess.
  This is the mechanism, not a habit: the wireframes' ~30 placeholder figures (`+38%`, `420+`,
  `$2.65`, `$2,400`, `All (42)` …) are all unsourced and are listed in `rebuild-audit.md` §6.2 for
  sign-off.
- Build metrics keep coming from `scripts/measure-builds.mjs` → `measurements.generated.ts`.
  Never hand-edited, never typed into JSX.
- Keep verbatim: the six-day timeline steps, the guarantee ("If the first build misses the spec,
  you don't pay for it."), and the existing FAQ questions.
- Never a placeholder client name. A category ("Top-20 puzzle studio") or nothing.
- Tone: short, technical, unhyped, first person plural. No exclamation marks, no "unlock", no
  "revolutionize", no emoji. No headcount stated anywhere.

## Do not

New palette, font or icon set · hero carousel, testimonial slider, or counting-up stats ·
sections not listed above, without asking · video thumbnails in place of playables ·
deleting the guarantee band or the brief form · bulk-renaming existing components ·
reinstating the four dropped networks · putting teal on a nav item, a form submit, a link, a rule,
or any word.
