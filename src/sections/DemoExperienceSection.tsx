import React, { useEffect, useRef } from "react";
import { trackGameInteraction, trackEngagementTime } from "../lib/analytics";

export default function DemoExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Track when user starts viewing the demo
    trackGameInteraction('demo_view_start');

    // Track engagement time when component unmounts
    return () => {
      const timeSpent = (Date.now() - startTimeRef.current) / 1000; // Convert to seconds
      trackEngagementTime(timeSpent, 'Demo Section');
      trackGameInteraction('demo_view_end', `Duration: ${timeSpent}s`);
    };
  }, []);

  const handleDemoClick = () => {
    trackGameInteraction('demo_interaction', 'User clicked on demo iframe');
  };

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-to-br from-white to-teal-50 text-center">
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
          onClick={handleDemoClick}
        />
      </div>

      <div className="mt-10">
        <a
          href="#contact"
          className="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700"
          onClick={() => trackGameInteraction('demo_cta_click')}
        >
          Build Yours Today
        </a>
      </div>
    </section>
  );
}