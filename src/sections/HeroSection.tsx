import React from "react";
import mascot from "../assets/logos/qq-jump-aura.png";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-teal-100 to-white py-20 overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-teal-300 opacity-30 blur-xl z-0"></div>
      <div className="absolute bottom-16 right-20 w-24 h-24 rounded-full bg-pink-400 opacity-20 blur-2xl z-0"></div>

      {/* Wavy SVG background */}
      <div className="absolute inset-x-0 top-0">
        <svg
          className="w-full h-32 text-white"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M0,160L80,149.3C160,139,320,117,480,122.7C640,128,800,160,960,181.3C1120,203,1280,213,1360,218.7L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6">
        
        
        {/* Headline + CTA */}
        <div className="text-center md:text-left md:w-1/2 md:pr-12 max-w-xl mt-12 md:mt-0">
          <h1 className="text-4xl font-extrabold mb-4 leading-tight text-gray-900">
            Turn Engagement Into Results <br className="hidden sm:block" /> with Gamified Ads
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">            
            QQ Advertisement creates playful, powerful ad experiences through gamification. More fun. More engagement. More results.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="#demo"
              className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700"
            >
              Try Demo
            </a>
            <a
              href="#case-studies"
              className="border border-teal-600 text-teal-600 px-6 py-3 rounded-xl font-semibold hover:bg-teal-50"
            >
              See Examples
            </a>
          </div>
        </div>

        {/* Mascot */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={mascot}
            alt="Quantum Quokkas Mascot"
            className="w-80 h-auto animate-float drop-shadow-xl"
          />
        </div>
        
      </div>
    </section>
  );
}
