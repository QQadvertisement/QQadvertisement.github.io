import React from "react";

const stats = [
  {
    value: "+25.3%",
    label: "Increase in Sales Conversions",
    description: "Gamified flows drive real outcomes—not just engagement.",
  },
  {
    value: "1 min+",
    label: "Average Engagement Time",
    description: "Users stay, play, and remember.",
  },
  {
    value: "23%",
    label: "Click-Through Rate",
    description: "Interactive ads outperform static banners.",
  },
  {
    value: "700%↑",
    label: "Boost in Customer Acquisition",
    description: "Gamification scales audience reach fast.",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-teal-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-teal-800 mb-16">
          Let the Numbers Speak for Themselves
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-12 text-left sm:text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-extrabold text-teal-700">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-900 mt-2">{stat.label}</div>
              <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}