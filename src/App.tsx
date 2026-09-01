import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Teardown from "./pages/Teardown";
import ForBrands from "./pages/ForBrands";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import ThankYou from "./pages/ThankYou";
import BookACall from "./pages/BookACall";
import Resources from "./pages/Resources";
import FaqPage from "./pages/Faq";
import Industries from "./pages/Industries";
import {
  Benchmarks,
  Blog,
  Careers,
  Cookies,
  CreativeTesting,
  Glossary,
  InteractiveDemos,
  Privacy,
  Terms,
} from "./pages/skeletons";
import ForGameStudios from "./pages/ForGameStudios";
import About from "./pages/About";
import CaseStudyPage from "./pages/CaseStudy";
import PlayableAdsExplained from "./pages/PlayableAdsExplained";
import EmaGame from "./pages/EmaGame";
import NotFoundPage from "./pages/404";
import { initGoogleAnalytics, trackPageView } from "./lib/analytics";
import useReveal from "./hooks/useReveal";
import { demos, getDemo } from "./data/demos";

function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}

/* Scroll to top on route change, or to the anchor when a hash is
   present. Back navigation restores the browser's own position. */
function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return null;
}

/**
 * Chrome varies by route:
 *   · the teardown takes the condensed nav with breadcrumbs, a position
 *     counter and a NEXT BUILD link, plus the condensed footer
 *   · /for-brands forces `showBrandMark` false — that page carries no
 *     bear at any size, including in the footer. Inherited from
 *     /for-agencies, which it replaced on 2026-08-20.
 *   · /emagame is fullscreen and takes neither
 */
function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith("/emagame")) return <>{children}</>;

  const teardownSlug = path.startsWith("/work/") ? path.split("/")[2] : undefined;
  const demo = getDemo(teardownSlug);
  const index = demos.findIndex((d) => d.slug === demo?.slug);
  const next = demo ? demos[(index + 1) % demos.length] : undefined;

  const showBrandMark = path !== "/for-brands";
  /* The homepage opens on a navy stage, so the bar starts transparent
     and only materialises once the page has scrolled off it. */
  const overStage = path === "/";

  return (
    <>
      {demo ? (
        <SiteNav
          variant="condensed"
          breadcrumbs={[{ label: "Work", to: "/work" }, { label: demo.title }]}
          counter={`${String(index + 1).padStart(2, "0")} / ${String(demos.length).padStart(2, "0")}`}
          nextLabel="NEXT BUILD →"
          nextTo={next && next.slug !== demo.slug ? `/work/${next.slug}` : "/work"}
        />
      ) : (
        <SiteNav overStage={overStage} />
      )}
      {children}
      <SiteFooter
        showBrandMark={showBrandMark}
        variant={demo ? "condensed" : "default"}
      />
    </>
  );
}

/** Legacy case-study URLs map onto the new demo slugs. Keeping the old
 *  paths alive matters more than tidiness — they are indexed. */
const LEGACY_CASE_STUDY: Record<string, string> = {
  atta: "atta-sync-your-day",
  "friends-ramen": "ramen-slurping-challenge",
};

/** /demos/:slug kept its slug when the shelf became /work. */
function LegacyDemo() {
  const { slug } = useParams();
  return <Navigate to={`/work/${slug}`} replace />;
}

function LegacyCaseStudy() {
  const { slug } = useParams();
  // The case studies keep their own pages — they carry narrative the
  // teardown does not. Only an unknown slug falls through to /work.
  if (slug && LEGACY_CASE_STUDY[slug]) return <CaseStudyPage />;
  return <Navigate to="/work" replace />;
}

export default function App() {
  useEffect(() => {
    initGoogleAnalytics();
  }, []);
  /* Mounted once at the root: the observer is global and picks up
     revealables as routes swap them in. */
  useReveal();

  return (
    <Router>
      <AnalyticsTracker />
      <ScrollManager />
      <ConditionalChrome>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Audience lanes */}
          <Route path="/for-game-studios" element={<ForGameStudios />} />
          <Route path="/for-game-studios/testing" element={<CreativeTesting />} />
          <Route path="/for-brands" element={<ForBrands />} />
          <Route path="/for-brands/demos" element={<InteractiveDemos />} />

          {/* The proof engine */}
          <Route path="/work" element={<Work />} />
          <Route path="/work/industries" element={<Industries />} />
          <Route path="/work/:slug" element={<Teardown />} />

          {/* Price */}
          <Route path="/pricing" element={<Pricing />} />

          {/* Resources */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/benchmarks" element={<Benchmarks />} />
          <Route path="/playable-ads-explained" element={<PlayableAdsExplained />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/faq" element={<FaqPage />} />

          {/* Conversion endpoints */}
          <Route path="/quote" element={<Quote />} />
          <Route path="/book-a-call" element={<BookACall />} />
          <Route path="/thank-you" element={<ThankYou />} />

          {/* Company */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />

          {/* Legal */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />

          <Route path="/case-studies/:slug" element={<LegacyCaseStudy />} />
          <Route path="/emagame" element={<EmaGame />} />

          {/* Superseded routes — redirect rather than 404, so existing
              links and search results keep working. All of these are
              indexed; see docs/rebuild-brief.md, "Route map", and keep
              scripts/postbuild-seo.mjs in step. */}
          <Route path="/demos" element={<Navigate to="/work" replace />} />
          <Route path="/demos/:slug" element={<LegacyDemo />} />
          <Route path="/for-agencies" element={<Navigate to="/for-brands" replace />} />
          <Route path="/for-studios" element={<Navigate to="/for-game-studios" replace />} />
          <Route path="/our-work" element={<Navigate to="/work" replace />} />
          {/* The sitemap draws /work and /work/playables as parent and
              child. With one library there is nothing for the parent to
              be except that library, so the child is an alias rather
              than a hollow hub page. */}
          <Route path="/work/playables" element={<Navigate to="/work" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ConditionalChrome>
    </Router>
  );
}
