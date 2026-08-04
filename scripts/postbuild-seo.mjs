/**
 * Post-build SEO step for GitHub Pages.
 *
 * GitHub Pages serves a single-page app, so deep links like /our-work would
 * return the 404 fallback (with a 404 status) to crawlers. This script writes
 * a real index.html for every route — each with its own title, description,
 * canonical URL, and Open Graph tags — plus 404.html and sitemap.xml.
 *
 * Keep ROUTES in sync with src/App.tsx and each page's <Seo> props.
 *
 * /our-work was superseded by /demos in the redesign. It still gets a
 * pre-rendered page here so the indexed URL keeps returning 200; the
 * app then redirects it to /demos client-side.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const SITE = "https://qqadvertisement.com";
const DIST = join(process.cwd(), "dist");

const ROUTES = [
  {
    path: "/",
    title: "Playable Ads for Mobile App User Acquisition | QQ Advertisement",
    description:
      "Custom HTML5 playable ads for Meta, TikTok, AppLovin, Unity, ironSource and Mintegral. We design and code the ad, not a template — and every number on a demo page is read off the shipped file.",
  },
  {
    path: "/demos",
    title: "Playable Ad Demos and Teardowns | QQ Advertisement",
    description:
      "Live playable ad demos with full teardowns: the shipped file's measured weight, its instrumented beats, per-network compliance, and what we'd change next time.",
  },
  {
    path: "/demos/atta-sync-your-day",
    title: "Sync Your Day — Atta Playable Teardown | QQ Advertisement",
    description:
      "A full teardown of Sync Your Day for Atta: the shipped single-file playable's measured weight, gzip size, request count, instrumented beats and per-network compliance.",
  },
  {
    path: "/demos/ramen-slurping-challenge",
    title: "Ramen Slurping Challenge — Friends Ramen Teardown | QQ Advertisement",
    description:
      "A full teardown of the Ramen Slurping Challenge for Friends Ramen: a ten-second tap loop with the survey placed where motivation peaks, built as a mobile web page rather than an ad unit.",
  },
  {
    path: "/for-studios",
    title: "Playable Ads for Game Studios | QQ Advertisement",
    description:
      "We read your core loop and build a playable that keeps the mechanic honest — not a mini-game wearing your art. Under 2 MB, QA'd against six networks, and you keep the source.",
  },
  {
    path: "/for-agencies",
    title: "White-Label Playable Ads for UA Agencies | QQ Advertisement",
    description:
      "Concurrent titles, 48-hour variant turns and deliverables under your naming. Retainer throughput, SLA terms and what lands in your drive — the operating numbers a UA agency needs before committing capacity.",
  },
  {
    path: "/about",
    title: "About QQ Advertisement — Playable Ads Agency for AI & Consumer Apps",
    description:
      "QQ Advertisement is a builder-first playable ads agency in Flushing, Queens. CS and AI/ML background, custom HTML5 builds — not templates — for consumer app and AI startup user acquisition.",
  },
  {
    path: "/case-studies/friends-ramen",
    title: "Friends Ramen Case Study — Ramen Slurping Challenge Gamified Survey | QQ Advertisement",
    description:
      "How QQ Advertisement built the Ramen Slurping Challenge for Friends Ramen — a gamified survey where diners play a 10-second tap game, chase a weekly gift-card leaderboard, and answer three feedback questions on the way to their score.",
  },
  {
    path: "/case-studies/atta",
    title: "Atta Playable Ad Case Study — Sync Your Day | QQ Advertisement",
    description:
      "How QQ Advertisement built Sync Your Day for Atta — a personalized quiz playable ad where players match food, work, and rest to their cycle phase, ending on a live App Store CTA.",
  },
  {
    path: "/playable-ads-explained",
    title: "What Are Playable Ads? Definition, Examples & Best Practices | QQ Advertisement",
    description:
      "Playable ads are interactive HTML5 mini-games that run inside the ad slot. Learn how they work, how they differ from video ads, and why mobile apps use them for user acquisition.",
  },
  {
    path: "/our-work",
    title: "Playable Ad Demos and Teardowns | QQ Advertisement",
    description:
      "Playable ads and gamified surveys built by QQ Advertisement. This page has moved to /demos, where each build gets a full teardown of the shipped file.",
    redirectOnly: true,
  },
];

const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const base = readFileSync(join(DIST, "index.html"), "utf8");

function htmlFor({ path, title, description }) {
  const url = `${SITE}${path === "/" ? "/" : path}`;
  return base
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
}

for (const route of ROUTES) {
  const out =
    route.path === "/" ? join(DIST, "index.html") : join(DIST, route.path.slice(1), "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, htmlFor(route));
  console.log(`seo: wrote ${out.replace(DIST, "dist")}`);
}

// SPA fallback for unknown URLs (served by GitHub Pages with a 404 status).
writeFileSync(join(DIST, "404.html"), base);
console.log("seo: wrote dist/404.html");

// Sitemap — every indexable route, stamped with the build date.
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.filter((r) => !r.redirectOnly).map(
  (r) => `  <url>
    <loc>${SITE}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${r.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`
).join("\n")}
</urlset>
`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);
console.log("seo: wrote dist/sitemap.xml");
