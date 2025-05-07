import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const navLinks = (
    <>
      <a href="/about" className="hover:text-teal-600 block py-2 md:inline-block md:py-0">About</a>
      <a href="/pricing" className="hover:text-teal-600 block py-2 md:inline-block md:py-0">Pricing</a>
      <a href="/contact" className="hover:text-teal-600 block py-2 md:inline-block md:py-0">Contact</a>
    </>
  );

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-teal-600">
          <a href="/">QQ Advertisement</a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          {navLinks}
        </nav>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 transition-transform duration-200 hover:scale-110"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-4">
          <nav className="flex flex-col text-gray-700 font-medium space-y-1">
            {navLinks}
          </nav>
        </div>
      )}
    </header>
  );
}