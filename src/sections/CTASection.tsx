import React from "react";
import { trackCTAClick } from "../lib/analytics";

type CTAProps = {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export default function CTASection({
  title = "Ready to Launch Your First Playable Ad?",
  subtitle = "Stop guessing on ad creatives. Build something interactive, fast, and proven to convert. Book a 30-min call—we'll map out your campaign, discuss timeline, and show you the playable ad opportunity for your brand.",
  buttonLabel = "Book a Playable Ad Consultation",
  buttonHref = "https://calendly.com/hello-qqadvertisement/30min",
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
