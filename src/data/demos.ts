/* ============================================================
   DEMOS AND TEARDOWNS

   Two real client builds. There are no invented builds here and no
   invented numbers: everything rendered in mono on a demo page is
   either read off the file by scripts/measure-builds.mjs, computed
   from a network's own published cap, or measured off the visitor's
   own session at runtime.

   The comps carried four builds (Merge Harbor, Idle Foundry,
   Blockfall Run, Card Keep) with weights and TTIs to match. Those
   were placeholder content. The gallery here runs the real two and
   uses the design's own NDA empty-state instead of padding the row —
   "the empty state admits most work is under NDA rather than
   inventing client logos" (README, Voice).
   ============================================================ */

import { measurements, measuredAt } from "./measurements.generated";
import { networks } from "./site";
import type { PlayableId } from "./playables";

export type CardVariant = "play" | "teardown";

export interface SpecPair {
  label: string;
  value: string;
  qualifier?: string;
}

export interface Demo {
  slug: string;
  title: string;
  client: string;
  /** card subtitle — the mechanic in five words */
  mechanic: string;
  kicker: string;
  lede: string;
  orientation: string;
  /** `play` runs the demo playable in place; `teardown` navigates. */
  cardVariant: CardVariant;
  thumb?: string;
  thumbAlt?: string;
  /** measurement id in measurements.generated.ts, when the file is
   *  in this repository and can be measured at build time */
  measurementId?: string;
  /** the live production build, when it is hosted elsewhere */
  liveUrl?: string;
  /** The build to run in the phone frame — see data/playables.ts.
   *
   *  Omitted means "do not embed this one", and that is a deliberate
   *  call per build, not an oversight: Friends Ramen is a live mobile
   *  web page that writes every play to the production database, so
   *  framing it on a marketing page would post real rows. It links out
   *  instead. */
  embedGame?: PlayableId;
  /** headline stats for the teardown title block */
  headlineStats: { value: string; caption: string }[];
  file: SpecPair[];
  /** the shipped file's own instrumented beats, in order. Timings are
   *  not listed: they are per session, and the session panel measures
   *  the visitor's own as they read. */
  beats: { name: string; note: string }[];
  /** true when the build is an ad unit a network cap applies to */
  /* --- taxonomy, for the `/work` filter bar (wireframe `1g`) -----
     Facts about the build, never about its performance: what it is,
     who it was made for, which networks it was QA'd against. Nothing
     here is a campaign claim, so nothing here needs a source. A
     campaign metric on a card comes from content/metrics.ts and is
     gated separately. -------------------------------------------- */
  /** which lane's page this build belongs on */
  audience: "games" | "brands";
  /** the client's category, not ours */
  vertical: string;
  /** the mechanic class — how it plays, in one or two words */
  format: string;
  /** ids from site.ts `networks` this build was QA'd against. Empty
   *  for builds that are not ad units and carry no network cap. */
  networks: readonly string[];
  networkGraded: boolean;
  complianceNote?: string;
  changeNote: string;
  nextTests: SpecPair[];
  caseStudyPath?: string;
}

const atta = measurements.atta;

const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;
const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

export const demos: Demo[] = [
  {
    slug: "atta-sync-your-day",
    title: "Sync Your Day",
    client: "Atta",
    mechanic: "Personalised quiz, drag and match",
    kicker: `Quiz playable · single file · measured ${measuredAt}`,
    lede:
      "A quiz you answer by dragging: three phase-matched cards go into three slots under a cycle ring. Everything below is read from the shipped file — and the session block is reading you, right now.",
    orientation: "Portrait · responsive",
    audience: "brands",
    vertical: "Health & fitness",
    format: "Quiz",
    networks: ["meta", "tiktok", "google"],
    cardVariant: "play",
    thumb: "/assets/casestudies/atta-sync-your-day.jpg",
    thumbAlt:
      "Sync Your Day playable ad for Atta — intro screen reading 'Turn your cycle into a superpower'",
    measurementId: "atta",
    embedGame: "atta",
    headlineStats: [
      { value: kb(atta.bytes).replace(" KB", ""), caption: "KB shipped" },
      { value: kb(atta.gzipBytes).replace(" KB", ""), caption: "KB over the wire" },
      { value: String(atta.requests), caption: "Network request" },
    ],
    file: [
      { label: "Total weight", value: kb(atta.bytes), qualifier: "/ 2.00 MB cap" },
      { label: "Over the wire", value: kb(atta.gzipBytes), qualifier: "/ gzip" },
      { label: "Network requests", value: String(atta.requests), qualifier: "/ single file" },
      { label: "Raster assets", value: String(atta.rasterCount), qualifier: `/ ${atta.inlineSvgCount} inline SVG` },
      { label: "Script tags", value: String(atta.scriptCount), qualifier: "/ no framework" },
      { label: "Style tags", value: String(atta.styleCount), qualifier: "/ tokenised" },
    ],
    beats: [
      { name: "View gate", note: "MRAID VIEWABLE BEFORE START" },
      { name: "Play start", note: "PLAY_START FIRES" },
      { name: "First interaction", note: "FIRST CARD PICKED UP" },
      { name: "Wrong-drop hint", note: "NOT FOR THIS PHASE" },
      { name: "Day complete", note: "LEVEL_COMPLETE FIRES" },
      { name: "End card", note: "CTA_CLICK OPENS THE STORE" },
    ],
    networkGraded: true,
    complianceNote: `Weight cap results are computed from the measured file (${kb(
      atta.bytes
    )}) against each network's published limit. The store link goes through mraid.open() with a plain window.open() fallback.`,
    changeNote:
      "The end card is the part we would test first. It carries the icon, the rating and one CTA, and the whole card is tappable — but we have not run it against a variant that shows the completed day behind the button instead of beside it. Until that test runs, we are not going to claim a lift.",
    nextTests: [
      { label: "End card A · shipped", value: "Baseline" },
      { label: "End card B · day behind CTA", value: "Not yet run" },
      { label: "Tutorial · hint on first drag", value: "Not yet run" },
    ],
    caseStudyPath: "/case-studies/atta",
  },
  {
    slug: "ramen-slurping-challenge",
    title: "Ramen Slurping Challenge",
    client: "Friends Ramen",
    mechanic: "Gamified survey, 10-second tap loop",
    kicker: "Gamified survey · mobile web · live in production",
    lede:
      "A ten-second tap challenge with the survey placed where motivation peaks — after 'time's up' and before the score reveal. It is a mobile web build, not an ad unit, so no network cap applies to it.",
    orientation: "Portrait · mobile web",
    audience: "brands",
    vertical: "Food & beverage",
    format: "Timed tap",
    /* Not an ad unit — a mobile web page. No network cap applies, so
       it is QA'd against none of them and filters out of every
       network facet rather than claiming a pass it never took. */
    networks: [],
    cardVariant: "teardown",
    thumb: "/assets/casestudies/Friends Ramen/friendsramen.webp",
    thumbAlt:
      "Ramen Slurping Challenge for Friends Ramen — a hand holding a phone showing the game's start screen",
    liveUrl: "https://qqadvertisement.com/PL01FR1N3DR4M3NCH/",
    headlineStats: [
      { value: "10", caption: "Second loop" },
      { value: "3", caption: "Survey questions" },
      { value: "1", caption: "Session ID per play" },
    ],
    file: [
      { label: "Format", value: "Mobile web", qualifier: "/ no install" },
      { label: "Backend", value: "Supabase", qualifier: "/ per-session ID" },
      { label: "Leaderboard read", value: "Restricted view", qualifier: "/ names + scores only" },
      { label: "Consent", value: "Explicit opt-in", qualifier: "/ before capture" },
    ],
    beats: [
      { name: "Start screen", note: "ONE BUTTON, PLAY" },
      { name: "Consented opt-in", note: "NAME, PHONE, EMAIL" },
      { name: "Tutorial", note: "ONE LINE, THEN 3-2-1" },
      { name: "Ten seconds", note: "MULTI-TOUCH COUNTS" },
      { name: "Survey gate", note: "THREE QUESTIONS" },
      { name: "Score and leaderboard", note: "LIVE RANK, PLAY AGAIN" },
    ],
    networkGraded: false,
    complianceNote:
      "This build runs on the open mobile web, so the ad-network weight caps do not apply and are not shown. Grading it against a 2 MB playable cap would be a category error.",
    changeNote:
      "The asset weight is the honest weakness here. It is a mobile web page opened from a table QR code, not an ad unit under a cap, so the images were never packed to an atlas. On a slow connection the start screen is the slowest thing on the site, and that is worth fixing before the next season of the promotion.",
    nextTests: [
      { label: "Start background · packed", value: "Not yet run" },
      { label: "Mascot sprite · WebP", value: "Not yet run" },
      { label: "Survey before score", value: "Shipped" },
    ],
    caseStudyPath: "/case-studies/friends-ramen",
  },
];

export const getDemo = (slug: string | undefined) =>
  demos.find((d) => d.slug === slug);

export const getDemoIndex = (slug: string | undefined) =>
  demos.findIndex((d) => d.slug === slug);

/** PASS/FAIL computed from the measured file against each network's own
 *  published cap. Never asserted — if there is no measurement, there is
 *  no row. */
export function complianceRows(demo: Demo) {
  if (!demo.networkGraded || !demo.measurementId) return [];
  const m = measurements[demo.measurementId];
  if (!m) return [];
  return networks.map((n) => ({
    network: n.name.toUpperCase(),
    cap: `${n.capMb.toFixed(2)} MB`,
    measured: kb(m.bytes),
    result: m.bytes <= n.capMb * 1024 * 1024 ? "PASS" : "FAIL",
  }));
}

export { kb, mb };
