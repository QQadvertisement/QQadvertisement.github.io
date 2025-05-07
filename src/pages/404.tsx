import React from "react";
import mascot from "../assets/404/404.png"; // Adjust path
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-200 to-white flex flex-col justify-center">
      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-center px-6 py-12 gap-8">
        {/* Mascot */}
        <div className="w-50 md:w-64">
          <img src={mascot} alt="Quantum Quokka mascot" className="w-full h-auto" />
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-600 mb-4">
            Oops! Page Not Found.
          </h1>
          <p className="text-gray-700 mb-6 max-w-md">
            You might have picked the wrong link — or the page has been moved or deleted.
            Let’s get you back on track.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            <ArrowLeft size={16} />
            Back to Home
          </a>
        </div>
      </div>

      {/* Demo MVP or Mini Game Placeholder */}
      {/* <div className="px-6 py-12 ">
        <div className="max-w-5xl mx-auto text-center border-2 border-dashed border-teal-300 rounded-xl py-20">
          <p className="text-teal-500 font-medium text-lg">
            Demo MVP Playground – Endless Runner or Ad Mini-Game goes here 🎮
          </p>
        </div>
      </div> */}
    </div>
  );
}