import React from "react";
import { trackCTAClick } from "../lib/analytics";

type CTAProps = {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export default function CTASection({
  title = "Turn Engagement Into Conversions",
  subtitle = "Our gamified ads aren't just fun. They work! From 7x email signups to 1.5M+ app downloads, we build campaigns that people actually interact with. Let's talk about what that'd look like for you.",
  buttonLabel = "👉 Schedule a Discovery Call",
  buttonHref = "https://calendly.com/thitipun-snw/30min", // Replace with actual Tally URL
}: CTAProps) {
  
  const handleCTAClick = () => {
    trackCTAClick(buttonLabel, 'CTA Section');
  };

  return (
    <section className="py-20 px-4 bg-teal-100 text-center">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-lg mb-6 max-w-xl mx-auto text-gray-700">{subtitle}</p>
      <a
        href={buttonHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCTAClick}
        className="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700"
      >
        {buttonLabel}
      </a>
    </section>
  );
}
