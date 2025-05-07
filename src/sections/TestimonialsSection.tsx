import React from "react";
import { testimonials } from "../data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-10">What Our Early Users Say</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        These aren’t fake testimonials. They’re real reactions from early testers, advisors, and partners we’ve collaborated with during concept development.
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.company}</p>
              </div>
            </div>
            <p className="text-gray-700 italic">“{t.quote}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
