/**
 * Measure the shipped playable files and emit the numbers the site
 * renders in mono.
 *
 * The design system reserves monospace type for values that were
 * genuinely recorded ("Mono as Claim" — design/components.md). This
 * script is how that rule is kept honest: every mono number on a demo
 * page below is read off the real file at build time, not typed in.
 *
 * Run automatically by `npm run build`, or by hand:
 *   node scripts/measure-builds.mjs
 *
 * If a value cannot be measured here, it does not get set in mono.
 */
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "src/data/measurements.generated.ts");

/** Files we ship and can measure directly from this repository.
 *  qq-knead-rush.html is emitted by build-playables.mjs, which runs
 *  first — measuring it is what keeps the hero's numbers real. */
const TARGETS = [
  { id: "atta", path: "public/playables/atta-sync-your-day.html" },
  { id: "knead", path: "public/playables/qq-knead-rush.html" },
];

const count = (haystack, needle) => haystack.split(needle).length - 1;

const ASSET_EXT = /\.(?:png|jpe?g|webp|gif|svg|avif|mp3|mp4|woff2?)$/i;

/**
 * Every local file the browser would additionally fetch.
 *
 * Markup attributes are not enough: a build can name its sprites in a
 * script string, and those are real requests and real bytes even though
 * no src= mentions them. Both forms are collected and de-duplicated, so
 * a file that inlines everything still measures as one request and a
 * file that loads three PNGs cannot look like one.
 */
function localAssets(html) {
  const found = new Set();
  const push = (raw) => {
    if (!raw || /^(?:data:|#|mailto:|https?:|\/\/)/.test(raw)) return;
    if (!ASSET_EXT.test(raw.split("?")[0])) return;
    found.add(raw.split("?")[0]);
  };
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) push(m[1]);
  for (const m of html.matchAll(/["'`]([^"'`\s]+\.(?:png|jpe?g|webp|gif|svg|avif|mp3|mp4|woff2?))["'`]/gi)) {
    push(m[1]);
  }
  return [...found];
}

function measure({ id, path }) {
  const source = readFileSync(join(ROOT, path));
  const html = source.toString("utf8");

  // Anything the browser would have to fetch separately. A single-file
  // playable has none of these, which is the claim being made.
  const externalRefs = (html.match(/(?:src|href)="(https?:)?\/\/[^"]*"/g) ?? []).length;
  const assets = localAssets(html);

  /* Assets are weight too. A 9 KB document that pulls 1.9 MB of PNGs is
     a 1.9 MB build, and reporting only the document would be exactly the
     kind of flattering number this script exists to prevent. */
  let assetBytes = 0;
  for (const ref of assets) {
    const onDisk = join(ROOT, "public", ref.replace(/^\//, ""));
    try {
      assetBytes += statSync(onDisk).size;
    } catch {
      console.warn(`measure: ${id} — referenced asset not found on disk: ${ref}`);
    }
  }

  return {
    id,
    bytes: source.length,
    gzipBytes: gzipSync(source, { level: 9 }).length,
    /** bytes of separately-fetched local assets */
    assetBytes,
    /** what the build actually costs: document + everything it pulls */
    totalBytes: source.length + assetBytes,
    // 1 = the document itself. Every extra ref is another request.
    requests: 1 + externalRefs + assets.length,
    inlineSvgCount: count(html, "<svg"),
    rasterCount: count(html, "<img") + count(html, "base64,"),
    scriptCount: count(html, "<script"),
    styleCount: count(html, "<style"),
    usesMraidOpen: html.includes("mraid.open"),
    hasWebviewFallback: html.includes("window.open"),
  };
}

const results = TARGETS.map(measure);
const stamp = new Date().toISOString().slice(0, 10);

const body = `/**
 * GENERATED — do not edit by hand.
 * Written by scripts/measure-builds.mjs on ${stamp}.
 *
 * These are the only numbers on a demo page permitted to appear in
 * monospace, because these are the only ones actually measured.
 */

export interface FileMeasurement {
  id: string;
  bytes: number;
  gzipBytes: number;
  /** bytes of separately-fetched local assets */
  assetBytes: number;
  /** document + everything it pulls — the build's real cost */
  totalBytes: number;
  requests: number;
  inlineSvgCount: number;
  rasterCount: number;
  scriptCount: number;
  styleCount: number;
  usesMraidOpen: boolean;
  hasWebviewFallback: boolean;
}

export const measuredAt = ${JSON.stringify(stamp)};

export const measurements: Record<string, FileMeasurement> = ${JSON.stringify(
  Object.fromEntries(results.map((r) => [r.id, r])),
  null,
  2
)};
`;

writeFileSync(OUT, body);
for (const r of results) {
  console.log(
    `measure: ${r.id} — ${r.bytes} B raw, ${r.gzipBytes} B gzip, ` +
      `${r.assetBytes} B assets, ${r.totalBytes} B total, ${r.requests} request(s)`
  );
}
console.log(`measure: wrote ${OUT.replace(ROOT + "/", "")}`);
