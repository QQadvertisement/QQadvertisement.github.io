/**
 * Post-build SEO step for GitHub Pages.
 *
 * GitHub Pages serves a single-page app, so deep links like /our-work would
 * return the 404 fallback (with a 404 status) to crawlers. This script writes
 * a real index.html for every route — each with its own title, description,
 * canonical URL, and Open Graph tags — plus 404.html and sitemap.xml.
 *
 * Keep ROUTES in sync with src/App.tsx and each page's <Seo> props.
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
      "Custom HTML5 playable ads for Meta & TikTok, designed and coded by one engineer. Players run your app's core loop before they tap Download — pre-qualifying every install.",
  },
  {
    path: "/our-work",
    title: "Playable Ads Portfolio — Our Work | QQ Advertisement",
    description:
      "Playable ads designed and coded by QQ Advertisement: Knead Rush for Friends Ramen, Sprint to the Finish for Atta. Live demos and case studies of custom HTML5 playables for user acquisition.",
  },
  {
    path: "/about",
    title: "About QQ Advertisement — Playable Ads Agency for AI & Consumer Apps",
    description:
      "QQ Advertisement is a builder-first playable ads agency in Flushing, Queens. CS and AI/ML background, custom HTML5 builds — not templates — for consumer app and AI startup user acquisition.",
  },
  {
    path: "/case-studies/friends-ramen",
    title: "Friends Ramen Playable Ad Case Study — Knead Rush | QQ Advertisement",
    description:
      "How QQ Advertisement designed and coded Knead Rush, a 10-second tap-loop playable ad for Friends Ramen — concept, character art, game feel, and HTML5 build.",
  },
  {
    path: "/case-studies/atta",
    title: "Atta Playable Ad Case Study — Sprint to the Finish | QQ Advertisement",
    description:
      "How QQ Advertisement built Sprint to the Finish for Atta — an 8-second tap-mash runner playable ad with a win/lose end state that drives replays and conversions.",
  },
  {
    path: "/playable-ads-explained",
    title: "What Are Playable Ads? Definition, Examples & Best Practices | QQ Advertisement",
    description:
      "Playable ads are interactive HTML5 mini-games that run inside the ad slot. Learn how they work, how they differ from video ads, and why mobile apps use them for user acquisition.",
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
${ROUTES.map(
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
