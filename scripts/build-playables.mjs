/**
 * Assemble the house playables from replication-kit/ into shipped files
 * under public/playables/.
 *
 * The kit is the source of truth. Nothing here rewrites its game logic
 * or its look — the kit's CSS and JS are inlined verbatim, so editing
 * replication-kit/hero-tap-game.{css,js} and rebuilding is all it takes
 * to change the demo on the site.
 *
 * Two things are adjusted, both because the kit ships as a standalone
 * page and here it runs inside the site's own phone frame:
 *
 *   1. Asset paths are pointed at /assets/qq/. The kit carries its own
 *      copies, which are byte-identical to the ones already in public/;
 *      shipping both would put 1.9 MB of duplicate PNGs in the bundle.
 *   2. The kit's page chrome (.page / .phone / .phone-screen) is
 *      neutralised, because the frame around this file is the site's.
 *      This is done as an override appended after the kit's CSS rather
 *      than by editing it out, so the kit's own rules stay untouched.
 *
 * Run by `npm run build` ahead of measure-builds.mjs, which then reads
 * the emitted file — the numbers the hero prints are measured off this
 * output, never typed in.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const KIT = join(ROOT, "replication-kit");
const OUT_DIR = join(ROOT, "public/playables");
const OUT = join(OUT_DIR, "qq-knead-rush.html");

/* The kit's sprite copies are gitignored (they duplicate public/assets/qq),
   so a fresh clone has the kit's code but not its images — which is fine,
   because the emitted build points at the shared copies. If the kit itself
   is missing entirely, keep any previously emitted file and carry on: a
   missing hand-off bundle should not be able to fail a deploy. */
if (!existsSync(join(KIT, "hero-tap-game.js"))) {
  const had = existsSync(OUT);
  console.warn(
    `playables: replication-kit/ not found — ${
      had ? "keeping the existing" : "NOT writing"
    } ${OUT.replace(ROOT + "/", "")}`
  );
  process.exit(had ? 0 : 1);
}

const read = (p) => readFileSync(join(KIT, p), "utf8");

const css = read("hero-tap-game.css");
/* The kit resolves sprites relative to its own folder. Inside the site
   they come from the shared copies, so no asset is shipped twice. */
const js = read("hero-tap-game.js").replaceAll('"assets/qq-', '"/assets/qq/qq-');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ready, Set, Knead — QQ house demo</title>
    <style>
${css}
    </style>
    <style>
      /* Embedded context: this file is mounted inside the site's phone
         frame, so it fills its viewport and draws no device of its own. */
      html, body { block-size: 100%; }
      body { background: #f5a727; }
      .page { min-block-size: 0; display: block; padding: 0; block-size: 100%; }
      .phone {
        inline-size: 100%;
        block-size: 100%;
        aspect-ratio: auto;
        border-radius: 0;
        background: none;
        padding: 0;
        box-shadow: none;
      }
      .phone-screen { border-radius: 0; }
    </style>
  </head>
  <body>
    <main class="page">
      <div class="phone">
        <div id="hero-demo" class="phone-screen"></div>
      </div>
    </main>
    <script>
${js}
    </script>
    <script>
      window.initHeroTapGame(document.getElementById("hero-demo"));
    </script>
  </body>
</html>
`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, html);
console.log(
  `playables: wrote ${OUT.replace(ROOT + "/", "")} (${html.length} B, from replication-kit/)`
);
