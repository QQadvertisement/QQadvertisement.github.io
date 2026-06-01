import React from "react";
import { insights } from "../data/caseStudies";
import { Link } from "react-router-dom";

function CaseStudyCard({ title, summary, image, slug }: { title: string; summary: string; image: string; slug: string }) {
  return (
    <Link
      to={`/articles/${slug}`}
      className="group block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-teal-400"
      style={{ textDecoration: 'none' }}
    >
      <div className="aspect-[4/3] w-full bg-gray-50 flex items-center justify-center overflow-hidden">
        <img src={image} alt={title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm leading-snug">{summary}</p>
      </div>
    </Link>
  );
}

export default function CaseStudiesSection() {
  return (
    <section className="bg-gradient-to-b from-white to-teal-50 py-10 md:py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-teal-800 mb-2 text-center">Case Studies & Success Stories</h2>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          Real-world results from playable ad campaigns—see how brands and marketers achieved measurable growth with our creative strategies.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {insights.map((item, idx) => (
            <CaseStudyCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
