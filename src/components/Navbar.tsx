import React from "react";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-teal-600">
          QQ Advertisement
        </div>
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <a href="#demo" className="hover:text-teal-600">Demo</a>
          <a href="#case-studies" className="hover:text-teal-600">Case Studies</a>
          <a href="#testimonials" className="hover:text-teal-600">Testimonials</a>
          <a href="#contact" className="hover:text-teal-600">Contact</a>
        </nav>
        <div className="md:hidden">
          {/* You can add a mobile menu toggle here later */}
        </div>
      </div>
    </header>
  );
}