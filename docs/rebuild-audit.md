# Rebuild audit — QQ Advertisement

**Date** 2026-08-20 · **Branch** `qqads` · **Against** `Playable Ads Wireframes` options
`1c` (home) · `2a` (studios) · `2b` (brands) · `1f` (pricing) · `1g` (work) · `1h` (components),
exported to `wireframe redesign plan/`.

Step 1 of the rebuild brief. Nothing in this document has been implemented. Read §6 first if you
only read one section — read §0, which is what was decided and why.

---

## 0. Decisions taken — 2026-08-20

Answers to §6. These are settled; the rest of the document is the evidence behind them.

| # | Decision | Consequence |
|---|---|---|
| 6.1 | **`/for-brands` replaces `/for-agencies`.** Ship `2b` as designed, brand verticals included. | `/for-agencies` becomes a 301-style redirect (it is indexed) and must be added to `postbuild-seo.mjs`. The throughput table, SLA and white-label rows are **not deleted** — they migrate into `2b`'s "Works with your agency" block, which was designed to hold exactly that, plus the "Agency rate card available" callout. Nothing operational is lost. |
| 6.2 | **Build the slots, leave the numbers empty.** | Every metric becomes a typed entry in `src/content/*.ts` with a required `source` field and the `⚠ sign-off` banner pattern from `agencies.ts`. A metric with no `source` does not render. Sections ship structurally complete and factually empty until signed off. |
| 6.4 | **Stay at three networks.** Meta, TikTok, Google Ads. | The strip renders three logos with more room each. Also fixes the live contradiction: `ForStudios.tsx:68` and `agencies.ts` both still print "Networks QA'd: 6". |
| 6.5 | **Teal = play, amber = buy, navy = everything else.** See below. | Narrowed back to the original gate after `1b` was adopted. The `≤3 teal regions` census is retired and replaced by a positional rule. |

### 6.5 in full — the accent split

**Superseded 2026-08-20 by the `1b` adoption.** The first answer widened teal to cover any element
that responds to the reader — fork cards, primary CTA band — and retired the numeric census. Then
`1b` was chosen, and `1b` puts amber on every primary action and uses no teal anywhere outside the
playable. That is a cleaner system than the widening, so the gate was narrowed back to its original,
contrast-proven scope. **Three colours, three jobs, no overlap:**

| | Job | Where |
|---|---|---|
| **Teal** `#08C7DC` | **Play** | The playable and nothing else — the frame's play affordance, a card's PLAY, the frame's progress and focus. Always a fill, never a word (1.87:1 as text on paper fails; navy on teal is 6.96:1). `--color-action-playable-measure` stays the sole text exception, on navy, for measured values. |
| **Amber** `#F0A93B` | **Buy** | The primary conversion action wherever one appears: "Get a flat quote", "See pricing", the emphasised fork lane, the flagged tier, the guarantee band. |
| **Navy** | **Everything else** | Structure, secondary actions, nav. |

Two contrast facts are load-bearing and were measured, not assumed:

- **Ink on an amber fill is always `--color-text-primary` (7.12:1).** `--color-accent-emphasis-ink`
  is calibrated for amber *as a word on paper* and lands at **2.94:1** used the other way round —
  a fail that the first draft of the fork band shipped with before it was caught.
- **An amber fill on paper is 1.88:1**, so on a light ground the button has no identifiable
  boundary. `.btn--accent` carries a `#8A5A0E` border (5.7:1 on paper) to supply one. Against the
  navy stage the fill is already 8.56:1, so one declaration serves both grounds.

The numeric census (≤3 on `/`) stays retired; the replacement is positional — **at most one teal
region per fold, never two in the same band**. `/for-brands` may carry teal: unlike the agency page
it replaced, it runs live playables. The **no-bear rule on that route stands**.

**The wireframes' blue is discarded** as a tool artifact — it appears on the same components that
`1c` and `1f` fill in amber, so the two cannot both be intended.

---

## 1. Routes and the components that render them

| Route | Page component | Status against the wireframes |
|---|---|---|
| `/` | `src/pages/Home.tsx` (415 ln) | Restructure to `1c`. All sections exist; the order is wrong and the fork is 4th. |
| `/demos` | `src/pages/Demos.tsx` (68 ln) | Becomes `/work` per `1g` — needs a filter bar, URL sync, `Load more`. |
| `/demos/:slug` | `src/pages/Teardown.tsx` (372 ln) | **Not in the wireframes at all.** See §6.6. |
| `/for-studios` | `src/pages/ForStudios.tsx` (155 ln) | Rebuild to `2a`. Currently the thinnest page on the site. |
| `/for-agencies` | `src/pages/ForAgencies.tsx` (281 ln) | Maps to `2b` "For Brands" — but see §6.1, this is the biggest open question. |
| `/about` | `src/pages/About.tsx` (208 ln) | Not in the wireframes; nav calls it "Resources". |
| `/playable-ads-explained` | `src/pages/PlayableAdsExplained.tsx` (194 ln) | Not in the wireframes; folds under "Resources". |
| `/case-studies/:slug` | `src/pages/CaseStudy.tsx` (198 ln) | Legacy redirect target, two live slugs. Keep — indexed. |
| `/emagame` | `src/pages/EmaGame.tsx` (92 ln) | Fullscreen, no chrome. Unaffected. |
| `*` | `src/pages/404.tsx` (45 ln) | Unaffected. |

Chrome is applied by `ConditionalChrome` in [App.tsx:60](../src/App.tsx#L60) — it swaps the nav to a
condensed breadcrumb variant on teardowns, drops the bear on `/for-agencies`, and drops chrome
entirely on `/emagame`.

**Route sync warning.** `scripts/postbuild-seo.mjs` carries its own copy of the route list. Any route
added or renamed here must be added there in the same commit or it ships without SEO output.

---

## 2. Scroll-pinned sections

There is exactly **one** pinned sequence in the codebase, and no scroll-animation library.

| What | Where | Technique |
|---|---|---|
| What We Build | `src/components/WhatWeBuild.tsx` (untracked) + `pages.css:625–885` | CSS `position: sticky` on `.wb-pin` inside a tall `.wb-track`. No JS scroll handler. |
| Sticky nav | `components.css:247` | Plain `position: sticky`. |
| Reveal-on-enter | `src/hooks/useReveal.ts` | One global `IntersectionObserver`, opacity + small translate only, fires once. |

No GSAP. No Framer Motion. No `ScrollTrigger`. No scroll event listener anywhere in `src/`.
Scroll config is CSS custom properties (`--wb-steps`), not a JS config object.

**This means most of the brief's §6 has no target.** The brief says "keep the pinned in-place
sections" and "fix the pin geometry" as though there were several. There is one, it is new
(uncommitted), and it already satisfies most of §6 by construction:

- Pins only ≥1024px; below that it renders `.wb-list`, a fully stacked composition — not a
  cut-down one (`pages.css:877`).
- Reduced motion drops to the same stacked flow.
- Transforms only — opacity and `transform`, never layout.
- A prior clipping bug in this exact section was already fixed with a size container
  (`pages.css:743` documents it).

**The one §6 item that is real and unverified:** the brief says the headline
*"Play them. They're the real files."* ([Home.tsx:249](../src/pages/Home.tsx#L249)) is clipped by
overlapping cards. That headline is in a static, unpinned section. I could not reproduce the
overlap. **Needs a screenshot and viewport width** before I chase it.

---

## 3. Asset inventory

| Asset | Verdict | Note |
|---|---|---|
| `public/playables/atta-sync-your-day.html` | **keep** | Production ad unit, committed as shipped. Never edit. |
| `public/playables/qq-knead-rush.html` | **keep** | Generated from `replication-kit/` by `scripts/build-playables.mjs`. Edit the kit, not the output. |
| `public/assets/qq/*.png` (8 sprites) | **keep** | Bear sprite sheet; drives the in-frame loader. |
| `public/assets/brand/bear.png` | **keep** | Footer/404 lockup. |
| `public/assets/demo-card/3Drunner.webp`, `flappyRamen.webp` | **keep** | Only two card thumbs that are not tied to a live demo entry. Candidates for library seeding. |
| `public/assets/casestudies/**` (7 files) | **keep** | Friends Ramen screens + Atta cover. |
| `public/assets/about/*` (2 photos) | **keep** | About page only. |
| `public/QQadsOnePager.webp` | **keep** | It is `DEFAULT_OG_IMAGE` in `Seo.tsx` — the social card for every page. An earlier draft of this audit called it dead weight; that was wrong, it is just referenced by constant rather than by filename. |
| `public/__frame.html` | **delete from ship** | Already gitignored measurement scratch. |
| `public/assets/icons/*`, `favicon.png` | **keep** | Favicon is still the known-blocked item from the Aug-3 handoff. |

**No video files anywhere.** The brief's "no video thumbnails" rule is already satisfied.

---

## 4. Where copy lives

Mostly extracted already — better than the brief assumes.

**Already in data files:**
- `src/data/site.ts` — networks, the guarantee, the six-day process, FAQ. Carries a standing
  ⚠ sign-off banner on everything under `claims`.
- `src/data/agencies.ts` — the whole `/for-agencies` page. Same banner.
- `src/data/demos.ts` — 2 demo entries.
- `src/data/caseStudies.ts` — 2 case studies.
- `src/data/playables.ts` — the 2 embeddable builds.
- `src/data/measurements.generated.ts` — **generated**, never hand-edited.

**Still inline in JSX** (headline/lede strings, count of long literals per file):
`Home.tsx` 9 · `PlayableAdsExplained.tsx` 8 · `ForStudios.tsx` 7 · `About.tsx` 7 ·
`ForAgencies.tsx` 3 · `Teardown.tsx` 2 · `Demos.tsx` 2.

**Recommendation:** extract per-page copy into `src/content/{home,studios,brands,pricing,work}.ts`
rather than one file, matching the existing `agencies.ts` pattern — including its sign-off banner,
which is the mechanism that has kept invented numbers off this site.

---

## 5. Component system — what already exists

The brief's §5 reads as a from-scratch list. Six of eleven already exist:

| Brief asks for | Exists as | Gap |
|---|---|---|
| `PlayableFrame` (5 states) | `src/components/PlayableFrame.tsx` + `src/hooks/usePlayable.ts` | Has `loading → ready → running`. **Missing `replay` and `complete + CTA`** (`1h` states 4–5). |
| `PlayableModal` | `src/components/PlayableLightbox.tsx` (untracked) | Esc, focus trap, focus restore, scroll lock all present. **Missing `?play=slug` deep link** and a global open-from-any-card context. |
| `PlayableCard` | `src/components/DemoCard.tsx` | Has `grid`. Missing `featured` (inline play) and `compact`. |
| `SpecRow` / `SpecList` | `src/components/ui/Spec.tsx` | Complete. |
| `FaqAccordion` | `src/components/ui/Faq.tsx` | Complete, `defaultOpen={0}` already wired. |
| `StickyHeader` | `src/components/SiteNav.tsx` | Has condensed variant. **Carries only "Book a call"** — needs the dual pair. |
| `CtaBand` | — | **Build.** |
| `ForkCard` | inline in `Home.tsx` | Extract to a component. |
| `MetricChip` / `BigMetric` | — | **Build.** No large-metric treatment exists. |
| `PricingTier` | — | **Build.** No pricing anywhere in the repo. |
| `NetworkStrip` | `NetworkWall` in `blocks.tsx` | Exists; see §6.4 on how many logos it may carry. |

The `1h` state sheet and the existing `usePlayable` state machine agree on the first three states.
Adding states 4 and 5 is an extension, not a rewrite — matching the brief's "do not bulk-rename".

---

## 6. The open decisions, in full

All four are now resolved in §0. Retained here as the reasoning behind each call.

### 6.1 "For Brands" or "For Agencies"? The wireframe and the brief disagree.

The brief says *"where the wireframe says For Brands, it maps to For Agencies, and the value ladder
in `2b` is rewritten in agency terms."* But `2b` is **not** an agency page wearing brand clothes —
its content is brand-vertical throughout: *beauty brand shade try-on*, *QSR mini-game offer drop*,
*auto configurator + dealer locator*, *streaming episode picker*; formats are *product demo /
try-on / configurator*; the ladder is *attention → understanding → intent → learning* (a brand
funnel, not an agency's operating concern).

Meanwhile `/for-agencies` today is a genuinely strong white-label operations page — throughput
table, SLA, invisibility, agency deliverables — and it is the one page with a **zero teal, zero
bear** rule baked into `App.tsx`.

Rewriting `2b` "in agency terms" would discard `2b`'s actual content and duplicate the page that
already exists. **Three coherent options, in §7.**

### 6.2 Every number in the wireframes is unsourced

Enumerated so you can sign off or strike in one pass. None of these exist in the repo today:

- **`1c` proof bar:** `+38%` IPM lift vs static · `6 days` avg turnaround · `420+` playables shipped
- **`1c` featured card:** `+41% IPM` · `−22% CPI`
- **`2a` centrepiece:** CPI `$3.40 → $2.65` · IPM `7.1 → 10.0` · D7 ROAS `1.2× → 2.1×`, plus a
  spend/CPI curve
- **`2a` secondary cards:** `−19% CPI` · `+42% IPM` · `2.3× D7 ROAS`
- **`2a` commitment:** `6 days` · `48h` · `12/mo` capacity
- **`2b` hero:** `+3.4%` CTR vs rich media · `18s` avg time in unit · `6 days` brief to live
- **`2b` cases:** `+3.4% CTR` · `21s` dwell · `+28% engagement` · `+2.7% CTR` · `+31% trailer completes`
- **`1f` pricing:** `$2,400` · `$8,900` · `$7,800/mo` · add-ons `+$350` / `+$180` / `+40%`
- **`1f` comparison:** in-house `~$6,000 loaded` · `4–6 weeks` to first build
- **`1g`:** `All (42)` and eight cards' worth of metric chips

The repo's standing rule (`site.ts`, `agencies.ts`) is that a claim which cannot be verified is
**dropped, not invented** — both case studies currently say results publish on client sign-off.
I will not type any of the above into the build without your go-ahead.

### 6.3 The library has 2 builds, not 42

`1g` shows a filterable grid of 8 with `Load more` and `All (42)`. The repo has **two** demo entries
and **two** embeddable files — and Friends Ramen can never be embedded, because it writes every play
to its production database (documented in `playables.ts`). A filtered library would render two cards,
one of which links out.

### 6.4 The network strip wants seven logos; you cut to three

`1c` and `1h` show seven (Meta, Google, Unity, AppLovin, ironSource, TikTok, Moloco). On 2026-08-05
you narrowed to three — Meta, TikTok, Google Ads — on the grounds that a list you cannot answer
questions about is a liability in a sales call. Every PASS/FAIL badge on a demo page is computed from
that array's published weight caps, so a logo added back needs a real cap.

**Related live inconsistency, worth fixing either way:** `ForStudios.tsx:68` and
`agencies.ts` both still print **"Networks QA'd: 6"**, contradicting the three in `site.ts`.

### 6.5 The wireframe accent conflicts with the Teal Gate — and with itself

`1c` and `1f` fill the fork cards, the flagged pricing tier and the CTA band in **amber**.
`2a`, `2b`, `1g` and `1h` fill the *same components* in **blue**. The wireframes disagree with each
other. Neither reads onto the shipped system, where amber is reserved for the guarantee, teal is
playable-actions-only (never a word, ≤3 per page, 0 on `/for-agencies`), and there is no blue.

Note the current `WhatWeBuild` already resolves a version of this correctly and documents why
(`pages.css:640`) — orange points, teal runs.

### 6.6 The teardown is absent from the wireframes

`/demos/:slug` is 372 lines and was the signature page of the Aug-3 design — the playable runs live
while the spec panel measures the reader in real time. No wireframe covers it. Assume it survives
unchanged unless you say otherwise.

### 6.7 Nav labels: brief vs wireframe

- Brief: `Demos · What we build · For Studios · For Agencies · Playables 101 · About`
- Wireframe: `For Game Studios · For Brands · Work · How It Works · Pricing · Resources`

Wireframe wins on structure per the brief's own rule, which would retire `/demos` in favour of
`/work` and fold About + Playables 101 under "Resources".

### 6.8 Uncommitted baseline

16 modified files and 2 untracked components (`PlayableLightbox.tsx`, `WhatWeBuild.tsx`) are sitting
on `qqads`. The brief asks for one reviewable commit per section; that is not achievable until this
is committed as a baseline.

---

## 7. Progress — 2026-08-20

| # | Step | State |
|---|---|---|
| 1 | Commit WIP as a baseline | **not done** — needs your say-so; the tree is still uncommitted |
| 2 | Decisions | done, §0 |
| 3 | Copy to `src/content/` | done — `metrics.ts`, `home.ts`, `studios.ts`, `brands.ts`, `pricing.ts` |
| 4 | `PlayableFrame` states 4–5 · modal deep link | **partial** — `?play=slug` done, guarded, Back closes. States `replay` and `complete+CTA` **not built** |
| 5 | Missing components | done — `CtaBand`, `BigMetric`/`MetricChip`, `PricingTier`; `ForkCard` already existed. `PlayableCard` `featured`/`compact` variants **not built** |
| 6 | Home to **`1b`** + nav dual CTA | done — `1c` was built first, then replaced. See the brief's "Page structure". |
| 7 | `/for-studios` to `2a` | done |
| 8 | `/for-brands` + redirects | done — canonical of each superseded URL points at its replacement |
| 9 | `/pricing` to `1f` | done — every price gated, comparison table held back |
| 10 | `/work` to `1g` + URL filters | done — facets derived from data, single-option facets suppressed |
| 11 | §8 checklist | pending the two items above |

**The `1b` pass (later the same day):** home rebuilt to the lean nine-section composition; hero
reverted to copy-left/playable-right and un-stickied (**no scroll-linked behaviour left in `src/`**);
fork became a full-bleed two-lane band; work shelf went 4-up; how-it-works shares a row with the
pricing teaser; FAQ went two-column and dropped to four rows. The brief form moved to `/contact`
(`QUOTE_HREF` is now a route, not an anchor) and was removed from both lane pages, which now end on
their CTA band as `2a` and `2b` draw them. The guarantee band moved to `/pricing`. The Teal Gate was
narrowed back and `.btn--accent` added — two contrast fails caught and fixed in the process, see §6.5.

**Also done, outside the sequence:** the WhatWeBuild pin removed (owner's call) and the component
re-sited to `/for-brands` §4; the "Networks QA'd: 6" contradiction fixed in both places; SEO route
list and sitemap rebuilt.

## 8. Recommended sequence

Differs from the brief's §10 only where the audit found the work already done.

1. **Commit the current WIP** as a baseline. (§6.8)
2. ~~Decide §6.1, §6.2, §6.4, §6.5.~~ **Done — see §0.**
3. Extract page copy to `src/content/*.ts`, carrying the sign-off banner pattern.
4. Extend `PlayableFrame` with states 4–5; add `?play=slug` + the open-from-anywhere context to
   `PlayableLightbox`. *(Extension, ~half the brief's §5.)*
5. Build the four genuinely-missing components: `CtaBand`, `BigMetric`/`MetricChip`, `PricingTier`,
   `ForkCard`.
6. Restructure Home to `1c` — fork into the first fold. Add the dual CTA to `SiteNav`.
7. `/for-studios` to `2a`.
8. `/for-brands` to `2b`; redirect `/for-agencies`; migrate the throughput/SLA/white-label
   content into the "Works with your agency" block; update `postbuild-seo.mjs` and the no-bear
   route key in `App.tsx`.
9. `/pricing` to `1f` — tiers and comparison table render with empty, sign-off-gated values.
10. `/work` to `1g` with URL-synced filters — seeded with the two real builds. **§6.3 stands
    open:** the grid is built for 42 and has 2. Filters and `Load more` ship inert until the
    library grows.
11. Re-run the brief's §8 checklist and report what is unmet and why.

## 9. Checklist items already met before any work starts

- Hero runs a real playable, not the mascot ([Home.tsx:142](../src/pages/Home.tsx#L142)).
- No hardcoded build metric in JSX — `measure-builds.mjs` → `measurements.generated.ts`.
- Mascot is already stricter than the brief requires: in-frame loader, footer, 404 — and banned
  outright on `/for-agencies`.
- `prefers-reduced-motion` already renders stacked flow site-wide.
- No video thumbnails anywhere.
- No pinning below 768px (the one pinned section releases at 1024).
