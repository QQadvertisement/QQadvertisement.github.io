import React from "react";

const offerings = [
  {
    imageSrc: "/assets/products/product1.webp",
    title: "Branded Mini-Games",
    description: "Custom tap games, puzzle challenges, leaderboard contests, and interactive experiences that keep users engaged while building brand awareness.",
  },
  {
    imageSrc: "/assets/products/product2.webp",
    title: "Gamified Experience",
    description: "Interactive discount unlocks, reward systems, digital scratch cards, and achievement mechanics that drive conversions and customer loyalty.",
  },
  {
    imageSrc: "/assets/products/product3.webp",
    title: "Analytics Dashboard",
    description: "Real-time engagement tracking, user behavior analytics, conversion funnel insights, and performance metrics to optimize your campaigns.",
  },
  {
    imageSrc: "/assets/products/product4.webp",
    title: "Creative Consulting",
    description: "End-to-end strategy including concept development, visual design, copywriting, and user experience optimization for maximum impact.",
  },
];

export default function ProductSection() {
  return (
    <section className="relative py-10 md:py-24 bg-white overflow-hidden">
      {/* Pitch Deck Background */}
      <div className="absolute inset-0 z-0">
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(196, 181, 253, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(196, 181, 253, 0.2) 1px, transparent 1px)",
            backgroundSize: "3.5rem 3.5rem",
            opacity: 0.3,
          }}
        />
        {/* Shapes */}
        <div className="absolute top-0 left-0 w-[40vw] h-[50vh] bg-cyan-200/30 blur-3xl transform -translate-x-1/2 -translate-y-1/3 rotate-12" />
        <div className="absolute top-0 left-0 w-[30vw] h-[60vh] bg-indigo-300/30 blur-3xl transform -translate-x-1/4 -translate-y-1/4 rotate-[30deg]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            What We Offer
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
          {offerings.map((offering, index) => (
            <div key={offering.title} className="text-left">
              <div className="relative">
                <span className="absolute -top-4 -left-4 text-7xl font-extrabold text-gray-200/80 -z-10">
                  {index + 1}
                </span>
                <div className="aspect-[4/3] flex items-center justify-center mb-4">
                  <img
                    src={offering.imageSrc}
                    alt={offering.title}
                    className="max-h-full max-w-full"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {offering.title}
              </h3>
              <p className="text-gray-600 text-base">
                {offering.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 