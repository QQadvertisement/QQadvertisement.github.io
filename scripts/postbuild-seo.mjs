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
 * SUPERSEDED ROUTES still get a pre-rendered page here, so an indexed
 * URL keeps returning 200 and the app redirects it client-side. As of
 * the 2026-08-20 rebuild there are four: /our-work and /demos both go
 * to /work, /demos/[slug] to /work/[slug], and /for-agencies to
 * /for-brands. See docs/rebuild-brief.md, "Route map".
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
      "Ads people play, not ads people skip. Custom HTML5 playable ads for Meta, TikTok and Google Ads — built by hand, tested on every network before it reaches you.",
  },
  {
    path: "/work",
    title: "Playable Ad Library | QQ Advertisement",
    description:
      "Every playable ad build we can publish, running in the browser. Each one opens the shipped file and its full teardown — measured weight, instrumented beats, per-network compliance.",
  },
  {
    path: "/work/atta-sync-your-day",
    title: "Sync Your Day — Atta Playable Teardown | QQ Advertisement",
    description:
      "A full teardown of Sync Your Day for Atta: the shipped single-file playable's measured weight, gzip size, request count, instrumented beats and per-network compliance.",
  },
  {
    path: "/work/ramen-slurping-challenge",
    title: "Ramen Slurping Challenge — Friends Ramen Teardown | QQ Advertisement",
    description:
      "A full teardown of the Ramen Slurping Challenge for Friends Ramen: a ten-second tap loop with the survey placed where motivation peaks, built as a mobile web page rather than an ad unit.",
  },
  {
    path: "/for-game-studios",
    title: "Playable Ads for Game Studios | QQ Advertisement",
    description:
      "We play your game first, then build an ad that feels like it — not a mini-game wearing your art. Under 2 MB, tested on Meta, TikTok and Google Ads, and you keep the source.",
  },
  {
    path: "/for-brands",
    title: "Playable Ads for Brands | QQ Advertisement",
    description:
      "Product demos, try-ons and configurators built as single files that run inside the ad slot, instrument every tap, and hand the event data back to the buyer. White-label delivery for agencies.",
  },
  {
    path: "/pricing",
    title: "Playable Ad Pricing | QQ Advertisement",
    description:
      "What a custom HTML5 playable costs, what moves the number, and what every build includes: concepts, revisions, variants and per-network QA.",
  },
  {
    path: "/for-game-studios/testing",
    title: "Creative Testing for Game Studios | QQ Advertisement",
    description:
      "How to run a playable creative test that produces a decision: how many concepts, how many variants, what to hold constant and when to call it.",
  },
  {
    path: "/for-brands/demos",
    title: "Interactive Product Demos | QQ Advertisement",
    description:
      "Product demos, try-ons and configurators that run inside the ad slot — what each format is for, and which one fits the thing you're selling.",
  },
  {
    path: "/work/industries",
    title: "Playable Ads by Industry | QQ Advertisement",
    description:
      "The playable library grouped by the client's category — every build we can publish, in the vertical it shipped for.",
  },
  {
    path: "/resources",
    title: "Playable Ad Resources | QQ Advertisement",
    description:
      "Playables explained, per-network benchmarks, a UA glossary, teardowns and the questions we get weekly — the reference material behind the builds.",
  },
  {
    path: "/resources/benchmarks",
    title: "Playable Ad Benchmarks by Network | QQ Advertisement",
    description:
      "What good looks like per network: file weight caps, time to interaction, and the metrics a playable is judged on before it's allowed to run.",
  },
  {
    path: "/blog",
    title: "Notes on Playable Ads | QQ Advertisement",
    description:
      "Teardowns of builds that aren't ours, notes on what tested badly, and the occasional argument about creative testing.",
  },
  {
    path: "/glossary",
    title: "Playable Ads and UA Glossary | QQ Advertisement",
    description:
      "IPM, CPI, D7 ROAS, MRAID, exit API, end card, playable — the vocabulary a user-acquisition conversation assumes you already have.",
  },
  {
    path: "/faq",
    title: "Playable Ads FAQ | QQ Advertisement",
    description:
      "How we work, what we need to start, which networks we QA against, who owns the files, what a build costs and what counts as a revision.",
  },
  {
    path: "/quote",
    title: "Get a Flat Quote | QQ Advertisement",
    description:
      "Tell us the title, the networks and the volume. We reply within one business day with a mechanic recommendation, a flat price and a start date.",
  },
  {
    path: "/book-a-call",
    title: "Book a Call | QQ Advertisement",
    description:
      "Thirty minutes with the people who build the playables. Bring the creative that's winning now and we'll tell you what we'd test against it.",
  },
  {
    path: "/careers",
    title: "Careers | QQ Advertisement",
    description:
      "How we work, what we hire for, and how to reach us if you build things that run in 2 MB.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | QQ Advertisement",
    description:
      "What data this site collects, what the playables collect, how long it is kept and who it is shared with.",
  },
  {
    path: "/terms",
    title: "Terms of Service | QQ Advertisement",
    description:
      "The terms covering work commissioned from QQ Advertisement: scope, revisions, ownership, payment and the build guarantee.",
  },
  {
    path: "/cookies",
    title: "Cookie Policy | QQ Advertisement",
    description:
      "Which cookies this site sets, what each one does, and how to refuse them.",
  },
  {
    path: "/thank-you",
    /* Reachable only from a submission, so it is pre-rendered for a
       200 but kept out of the sitemap. */
    redirectOnly: true,
    title: "Brief received | QQ Advertisement",
    description: "Your brief is in. Here is what happens next and when.",
  },
  {
    path: "/contact",
    title: "Contact QQ Advertisement",
    description:
      "Reach the team that builds the playables — email, a call, or a scoped brief. We reply within one business day.",
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
    redirectOnly: true,
    supersededBy: "/work",
    title: "Our Work — Playable Ads and Gamified Surveys | QQ Advertisement",
    description:
      "Playable ads and gamified surveys built by QQ Advertisement. This page has moved to /work, where each build gets a full teardown of the shipped file.",
  },
  {
    path: "/demos",
    redirectOnly: true,
    supersededBy: "/work",
    title: "Playable Ad Demos and Teardowns | QQ Advertisement",
    description:
      "Playable ad demos with full teardowns. This page has moved to /work, where every build we can publish runs in the browser.",
  },
  {
    path: "/demos/atta-sync-your-day",
    redirectOnly: true,
    supersededBy: "/work/atta-sync-your-day",
    title: "Sync Your Day — Atta Playable Teardown | QQ Advertisement",
    description:
      "A full teardown of Sync Your Day for Atta. This page has moved to /work/atta-sync-your-day.",
  },
  {
    path: "/demos/ramen-slurping-challenge",
    redirectOnly: true,
    supersededBy: "/work/ramen-slurping-challenge",
    title: "Ramen Slurping Challenge — Friends Ramen Teardown | QQ Advertisement",
    description:
      "A full teardown of the Ramen Slurping Challenge for Friends Ramen. This page has moved to /work/ramen-slurping-challenge.",
  },
  {
    path: "/for-studios",
    redirectOnly: true,
    supersededBy: "/for-game-studios",
    title: "Playable Ads for Game Studios | QQ Advertisement",
    description:
      "We play your game first, then build an ad that feels like it. This page has moved to /for-game-studios.",
  },
  {
    path: "/work/playables",
    redirectOnly: true,
    supersededBy: "/work",
    title: "Playable Library | QQ Advertisement",
    description:
      "Every playable ad build we can publish, running in the browser. This page has moved to /work.",
  },
  {
    path: "/for-agencies",
    redirectOnly: true,
    supersededBy: "/for-brands",
    title: "White-Label Playable Ads for UA Agencies | QQ Advertisement",
    description:
      "Concurrent titles, 48-hour variant turns and deliverables under your naming. This page has moved to /for-brands, which carries the same operating numbers.",
  },

];

const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const base = readFileSync(join(DIST, "index.html"), "utf8");

function htmlFor({ path, title, description, supersededBy }) {
  const url = `${SITE}${path === "/" ? "/" : path}`;
  /* A superseded URL still returns 200 so the indexed link keeps
     working, but it points its canonical at the route that replaced
     it — otherwise the old and new pages compete for the same query
     and the redirect target never inherits the history. */
  const canonical = supersededBy ? `${SITE}${supersededBy}` : url;
  return base
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
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
