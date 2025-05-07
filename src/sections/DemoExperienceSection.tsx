import React from "react";

export default function DemoExperienceSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white to-teal-50 text-center">
      <h2 className="text-3xl font-extrabold mb-4">Try the Experience</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700">
        This is what your customers will see — a fully interactive, brand-safe mini-game that boosts engagement and drives results.
      </p>

      <div
        className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl border-2 border-teal-300"
        style={{
          aspectRatio: "16 / 9", // still responsive
          minHeight: "700px",     // ensures vertical space on mobile
        }}
      >
        <iframe
          src="https://qqadvertisement.com/qqkneadgame/"
          title="Quantum Quokkas Kneading Demo"
          className="w-full h-full"
          loading="lazy"
          style={{ border: "none" }}
        />
      </div>

      <div className="mt-10">
        <a
          href="#contact"
          className="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700"
        >
          Build Yours Today
        </a>
      </div>
    </section>
  );
}