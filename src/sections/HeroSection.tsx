import React from "react";
import mascot from "../assets/logos/qq-jump-aura.webp";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-teal-100 to-white py-24 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-teal-300 opacity-10 blur-3xl z-0"></div>
        <div className="absolute bottom-16 right-20 w-40 h-40 rounded-full bg-pink-400 opacity-10 blur-3xl z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-300 opacity-5 blur-3xl z-0"></div>
      </div>

      {/* Wavy SVG background */}
      <div className="absolute inset-x-0 top-0">
        <svg
          className="w-full h-40 text-white"
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
        {/* Headline + CTA with custom glassmorphism */}
        <div className="text-center md:text-left md:w-1/2 md:pr-16 max-w-xl mt-12 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-gray-900">
            Create Interactive Mini-game for your Brand
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Engage users 3x longer with playful, branded ad experiences across web, mobile, and real life. We help innovative marketers turn banner blindness into brand love.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a
              href="#demo"
              className="bg-teal-600/90 backdrop-blur-sm text-white px-8 py-4 text-base rounded-xl font-semibold hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-white/20"
            >
              🎮 Try Live Demo
            </a>
            <a
              href="#case-studies"
              className="bg-white/30 backdrop-blur-sm text-teal-600 px-8 py-4 text-base rounded-xl font-semibold hover:bg-white/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-white/20"
            >
              📈 See Real Results
            </a>
          </div>
        </div>

        {/* Mascot presentation with glass effect */}
        <div className="md:w-1/2 flex justify-center relative">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full blur-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
            <img
              src={mascot}
              alt="Quantum Quokkas Mascot"
              className="w-90 md:w-[28rem] h-auto animate-float drop-shadow-2xl relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
