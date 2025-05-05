import React from "react";
import { caseStudies } from "../data/caseStudies";

export default function CaseStudiesSection() {
  return (
    <section className="py-20 px-6 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-10">Case Studies & Success Stories</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {caseStudies.map((study) => (
          <div
            key={study.title}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 text-left"
          >
            <img
              src={study.image}
              alt={study.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">{study.title}</h3>
              <p className="text-sm text-teal-600 font-medium mb-2">{study.outcome}</p>
              <p className="text-gray-700 text-sm mb-4">{study.summary}</p>
              <p className="text-sm font-medium text-gray-500">{study.brand}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
