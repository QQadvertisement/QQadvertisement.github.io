import React from "react";

export default function FeaturedCaseStudySection() {
  return (
    <section className="bg-white py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Main headline */}
        <div className="text-center mb-12">
          <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Real Results
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Friends Ramen: +240% ROI in 4 Weeks
          </h2>
          <p className="text-lg text-gray-600">
            A single playable ad campaign. $8k investment. $27.2k revenue. Here's exactly what happened.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
            <div className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-2">240%</div>
            <div className="text-sm font-semibold text-gray-700">ROI</div>
            <div className="text-xs text-gray-600 mt-1">In 4 weeks</div>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
            <div className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-2">$27.2k</div>
            <div className="text-sm font-semibold text-gray-700">Revenue Generated</div>
            <div className="text-xs text-gray-600 mt-1">From $8k spend</div>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
            <div className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-2">156%</div>
            <div className="text-sm font-semibold text-gray-700">CAC Reduction</div>
            <div className="text-xs text-gray-600 mt-1">New customers</div>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
            <div className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-2">8.2%</div>
            <div className="text-sm font-semibold text-gray-700">Engagement Rate</div>
            <div className="text-xs text-gray-600 mt-1">vs 0.3% banner avg</div>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">The Campaign</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">What We Built</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal-600 font-bold mr-3">→</span>
                  <span>Interactive spin-to-win playable ad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 font-bold mr-3">→</span>
                  <span>Instant discount unlock on win</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 font-bold mr-3">→</span>
                  <span>Mobile-first design (90% of users mobile)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 font-bold mr-3">→</span>
                  <span>Cross-channel deployment (Meta, Google, native)</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Timeline & Cost</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between">
                  <span>Discovery & Design:</span>
                  <span className="font-semibold">Week 1</span>
                </li>
                <li className="flex justify-between">
                  <span>Development:</span>
                  <span className="font-semibold">Weeks 2-3</span>
                </li>
                <li className="flex justify-between">
                  <span>Testing & Launch:</span>
                  <span className="font-semibold">Week 4</span>
                </li>
                <li className="border-t border-gray-300 pt-2 flex justify-between font-semibold">
                  <span>Total Investment:</span>
                  <span>$8,000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-700 mb-4">Your DTC brand can see similar results.</p>
          <a
            href="#contact"
            className="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-700 transition-colors duration-300"
          >
            Book a Playable Ad Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
