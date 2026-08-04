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
import Demos from "./pages/Demos";
import Teardown from "./pages/Teardown";
import ForAgencies from "./pages/ForAgencies";
import ForStudios from "./pages/ForStudios";
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
 *   · /for-agencies forces `showBrandMark` false — that page carries no
 *     bear at any size, including in the footer
 *   · /emagame is fullscreen and takes neither
 */
function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith("/emagame")) return <>{children}</>;

  const teardownSlug = path.startsWith("/demos/") ? path.split("/")[2] : undefined;
  const demo = getDemo(teardownSlug);
  const index = demos.findIndex((d) => d.slug === demo?.slug);
  const next = demo ? demos[(index + 1) % demos.length] : undefined;

  const showBrandMark = path !== "/for-agencies";
  /* The homepage opens on a navy stage, so the bar starts transparent
     and only materialises once the page has scrolled off it. */
  const overStage = path === "/";

  return (
    <>
      {demo ? (
        <SiteNav
          variant="condensed"
          breadcrumbs={[{ label: "Demos", to: "/demos" }, { label: demo.title }]}
          counter={`${String(index + 1).padStart(2, "0")} / ${String(demos.length).padStart(2, "0")}`}
          nextLabel="NEXT BUILD →"
          nextTo={next && next.slug !== demo.slug ? `/demos/${next.slug}` : "/demos"}
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

function LegacyCaseStudy() {
  const { slug } = useParams();
  // The case studies keep their own pages — they carry narrative the
  // teardown does not. Only an unknown slug falls through to /demos.
  if (slug && LEGACY_CASE_STUDY[slug]) return <CaseStudyPage />;
  return <Navigate to="/demos" replace />;
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
          <Route path="/demos" element={<Demos />} />
          <Route path="/demos/:slug" element={<Teardown />} />
          <Route path="/for-studios" element={<ForStudios />} />
          <Route path="/for-agencies" element={<ForAgencies />} />
          <Route path="/about" element={<About />} />
          <Route path="/playable-ads-explained" element={<PlayableAdsExplained />} />
          <Route path="/case-studies/:slug" element={<LegacyCaseStudy />} />
          <Route path="/emagame" element={<EmaGame />} />
          {/* Superseded routes — redirect rather than 404, so existing
              links and search results keep working. */}
          <Route path="/our-work" element={<Navigate to="/demos" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ConditionalChrome>
    </Router>
  );
}
