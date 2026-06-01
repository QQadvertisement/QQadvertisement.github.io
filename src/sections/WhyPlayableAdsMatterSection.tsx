import React from "react";

export default function WhyPlayableAdsMatterSection() {
  const problems = [
    {
      icon: "⚠️",
      title: "Traditional Ads Are Dying",
      description: "Banner ads average 0.05% CTR. Users skip them. Static creative loses. You're paying for impressions, not conversions."
    },
    {
      icon: "💸",
      title: "Cost Per Acquisition Keeps Rising",
      description: "CPM prices climb yearly. LTV declines. Ad platforms are saturated. Your margins get squeezed harder every quarter."
    },
    {
      icon: "⏱️",
      title: "Time-to-Market Is Everything",
      description: "Traditional game dev takes 6-12 months. Marketing campaigns move fast. By the time your game launches, the window closed."
    }
  ];

  const solution_points = [
    {
      label: "3-5x Higher Conversion",
      value: "Interactive ads engage users, not repel them"
    },
    {
      label: "Built in 4 Weeks",
      value: "Not months. We move as fast as your campaigns do"
    },
    {
      label: "$8k All-In Cost",
      value: "No hidden fees, no minimums, no long contracts"
    }
  ];

  return (
    <section className="bg-white py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Why Playable Ads Win
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your product is great. Your ads just need to match.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {problems.map((problem, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Solution */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8 md:p-12 border border-teal-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            The Playable Ad Advantage
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {solution_points.map((point, index) => (
              <div key={index}>
                <div className="font-semibold text-teal-700 mb-2">{point.label}</div>
                <p className="text-gray-700">{point.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-teal-200">
            <p className="text-gray-700 mb-4">
              Playable ads work because they're <span className="font-semibold">interactive, fast-loading, and genuinely fun</span>. Users tap, they play, they convert. No scroll-past. No wasted spend. Real engagement from real people.
            </p>
            <p className="text-gray-700">
              That's why Friends Ramen hit 240% ROI. That's why we built this agency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
