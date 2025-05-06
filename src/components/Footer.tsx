import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-sm pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-teal-400">QQ Advertisement</h3>
          <p className="text-gray-300">
            We build gamified ad experiences that delight users and drive measurable results.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-100">Navigation</h4>
          <ul className="space-y-1 text-gray-400">
            <li><a href="/" className="hover:text-teal-400">Home</a></li>
            <li><a href="/about" className="hover:text-teal-400">About</a></li>
            <li><a href="/products" className="hover:text-teal-400">Products</a></li>
            <li><a href="#contact" className="hover:text-teal-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-100">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <Mail size={16} /> hello@qqadvertisement.com
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} /> +1 (312) 555-7788
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} /> New York / Chicago, USA
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-100">Follow Us</h4>
          <ul className="flex gap-4 text-gray-400">
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">LinkedIn</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">Instagram</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-gray-500 text-xs border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} QQ Advertisement. All rights reserved.
      </div>
    </footer>
  );
}