import React from "react";
import { caseStudies } from "../data/caseStudies";

export default function CaseStudiesSection() {
  return (
    <section className="bg-gradient-to-b from-white to-teal-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-teal-800 mb-12 text-center">
          Case Studies & Success Stories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {caseStudies.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition group bg-white"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-gray-800 group-hover:text-teal-700 hover:underline"
                  >
                    {item.title}
                  </a>
                ) : (
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-700">
                    {item.title}
                  </h3>
                )}
                <div className="text-sm text-gray-500 font-medium mt-1">
                  {item.stat}
                </div>
                <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-teal-100 text-teal-700 font-medium px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {item.source && (
                  <div className="mt-4 text-xs text-gray-400 italic">
                    {item.source}
                  </div>
                )}
                <div className="mt-4">
                  <a
                    href="#contact"
                    className="text-sm text-teal-600 hover:underline"
                  >
                    Request a similar campaign →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
