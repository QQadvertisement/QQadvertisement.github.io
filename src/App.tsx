import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"; //test action
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ContactSection from "./pages/Contact";
import EmaGame from "./pages/EmaGame"; // Import the new EmaGame component

import Footer from "./components/Footer";
import NotFoundPage from "./pages/404";

import { useEffect } from "react";
import { initGoogleAnalytics, trackPageView } from "./lib/analytics";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page views with enhanced path tracking
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

export default function App() {
  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  return (
    <Router>
      <AnalyticsTracker />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/emagame" element={<EmaGame />} /> {/* Add new EmaGame route */}
        {/* Future routes can be added here */}

        {/* 👇 Catch-all 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
