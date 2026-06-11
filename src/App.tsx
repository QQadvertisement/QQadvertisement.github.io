import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import Home from "./pages/Home";
import About from "./pages/About";
import OurWork from "./pages/OurWork";
import CaseStudyPage from "./pages/CaseStudy";
import PlayableAdsExplained from "./pages/PlayableAdsExplained";
import EmaGame from "./pages/EmaGame";
import NotFoundPage from "./pages/404";
import { initGoogleAnalytics, trackPageView } from "./lib/analytics";

function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}

/* Scroll to top on route change, or to the anchor when a hash is present
   (lets nav links like "/#pricing" work from any page). */
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

function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isFullscreenGame = location.pathname.startsWith("/emagame");
  return (
    <>
      {!isFullscreenGame && <SiteNav />}
      {children}
      {!isFullscreenGame && <SiteFooter />}
    </>
  );
}

export default function App() {
  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  return (
    <Router>
      <AnalyticsTracker />
      <ScrollManager />
      <ConditionalChrome>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/about" element={<About />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/playable-ads-explained" element={<PlayableAdsExplained />} />
          <Route path="/emagame" element={<EmaGame />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ConditionalChrome>
    </Router>
  );
}
