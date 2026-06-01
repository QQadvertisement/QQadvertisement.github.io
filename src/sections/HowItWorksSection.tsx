import React from "react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "We Understand Your Goals",
      description: "Deep-dive discovery call. We learn about your audience, brand, and what conversion means for you. No generic templates. We build for your specific KPIs.",
      details: [
        "Competitor analysis",
        "Audience research",
        "Conversion mapping",
      ]
    },
    {
      number: "02",
      title: "We Design & Build",
      description: "Our team creates a custom playable ad that feels native to where it runs. Fast, smooth, engaging. Optimized for mobile. Ready to ship in 4 weeks.",
      details: [
        "UX/UI design",
        "Development & testing",
        "A/B variation builds",
      ]
    },
    {
      number: "03",
      title: "We Launch & Optimize",
      description: "Campaign goes live across your channels. We monitor performance, optimize targeting, and scale what works. You get detailed reports, we handle the tech.",
      details: [
        "Campaign deployment",
        "Real-time monitoring",
        "Monthly optimization",
      ]
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            How We Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple. Fast. Effective. Three phases from brief to launch in just 4 weeks.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 -right-4 w-8 h-0.5 bg-gradient-to-r from-teal-400 to-transparent"></div>
              )}

              {/* Step Card */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-teal-400 hover:shadow-lg transition-all duration-300">
                {/* Step Number */}
                <div className="text-5xl font-extrabold text-teal-100 mb-4">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Details */}
                <div className="space-y-2">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-center text-gray-700">
                      <span className="text-teal-600 font-bold mr-3">✓</span>
                      <span className="text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-8">
          <h3 className="font-bold text-gray-900 mb-4">Timeline</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm font-semibold text-teal-700 mb-2">Week 1</div>
              <div className="text-xs text-gray-600">Discovery & Design</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-teal-700 mb-2">Week 2-3</div>
              <div className="text-xs text-gray-600">Development</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-teal-700 mb-2">Week 4</div>
              <div className="text-xs text-gray-600">Testing & Launch</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-teal-700 mb-2">Day 29+</div>
              <div className="text-xs text-gray-600">Optimization</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
