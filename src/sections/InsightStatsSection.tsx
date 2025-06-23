import React from "react";

interface Stat {
  label: string;
  before?: string;
  after: string;
}

interface InsightStatsSectionProps {
  headline: string;
  subheadline: string;
  bullets: string[];
  stats: Stat[];
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
}

const InsightStatsSection: React.FC<InsightStatsSectionProps> = ({
  headline,
  subheadline,
  bullets,
  stats,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink,
}) => {
  return (
    <section className="w-full py-12 px-4 md:px-0 flex flex-col md:flex-row items-center justify-center bg-white">
      <div className="max-w-xl md:w-1/2 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-2">{headline}</h2>
        <p className="text-lg text-gray-700 mb-4">{subheadline}</p>
        <ul className="space-y-2 mb-6">
          {bullets.map((b, i) => (
            <li key={i} className="text-base text-gray-600 flex items-start">
              <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-teal-500 inline-block" />
              {b}
            </li>
          ))}
        </ul>
        <div className="flex gap-3">
          <a href={primaryBtnLink} className="px-5 py-2 rounded border border-teal-600 bg-teal-600 text-white font-semibold hover:bg-teal-700 transition">{primaryBtnText}</a>
          <a href={secondaryBtnLink} className="px-5 py-2 rounded border border-teal-600 text-teal-600 font-semibold bg-white hover:bg-teal-50 transition">{secondaryBtnText}</a>
        </div>
      </div>
      <div className="mt-10 md:mt-0 md:ml-12 md:w-1/2 w-full max-w-md bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col gap-4">
        <h3 className="text-base font-semibold text-teal-700 mb-2">Performance Uplift</h3>
        <ul className="space-y-3">
          {stats.map((stat, i) => (
            <li key={i} className="flex items-center justify-between text-gray-700">
              <span className="font-medium">{stat.label}</span>
              <span className="flex items-center gap-2">
                {stat.before && (
                  <span className="text-xs text-gray-400 line-through">{stat.before}</span>
                )}
                <span className="text-lg font-bold text-teal-600">{stat.after}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default InsightStatsSection; 