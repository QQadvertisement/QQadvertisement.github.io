import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; //test action
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";

import Footer from "./components/Footer";
import NotFoundPage from "./pages/404";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        {/* Future routes can be added here */}

        {/* 👇 Catch-all 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
