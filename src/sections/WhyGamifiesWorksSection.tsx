import React from "react";

export default function WhyGamifiesWorksSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-700 mb-4">
          Why Gamified Ads Work
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Gamification turns passive viewers into active participants. With our ad games,
          users click, play, and convert — all while having fun.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold text-teal-600 mb-2">↑ Engagement</h3>
            <p className="text-gray-600">
              Interactive formats drive 3x more engagement than static ads.
              Users remember and respond to brands they play with.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-teal-600 mb-2">↓ Ad Fatigue</h3>
            <p className="text-gray-600">
              Playable ads feel fresh. They reduce banner blindness and boost click-through rates
              without overloading the audience.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-teal-600 mb-2">🎯 Better Targeting</h3>
            <p className="text-gray-600">
              Real-time analytics from game interactions help you understand user behavior
              and optimize ad performance quickly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}