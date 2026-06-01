import React from "react";

const offerings = [
  {
    imageSrc: "/assets/products/product1.webp",
    title: "Spin-to-Win",
    description: "Users tap, they spin, they unlock a discount or reward. Instant gratification. High engagement. Proven conversion driver. Perfect for first-time buyers.",
  },
  {
    imageSrc: "/assets/products/product2.webp",
    title: "Tap-to-Match Puzzle",
    description: "Memory-style game with brand-themed cards. Engaging, replayable, addictive. Players keep tapping to beat their high score. Natural virality.",
  },
  {
    imageSrc: "/assets/products/product3.webp",
    title: "Scratch & Reveal",
    description: "Digital scratch-off card. Instant discovery of what they won. Faster than physical. Mobile-native. Drives repeat plays and social shares.",
  },
  {
    imageSrc: "/assets/products/product4.webp",
    title: "Custom Interactive",
    description: "Your brand's unique idea. Shooting games, trading games, quizzes, trivia, swipe-based experiences. We build it. No limits to creativity.",
  },
];

export default function ProductSection() {
  return (
    <section className="relative py-10 md:py-24 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(196, 181, 253, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(196, 181, 253, 0.2) 1px, transparent 1px)",
            backgroundSize: "3.5rem 3.5rem",
            opacity: 0.3,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Playable Ad Formats We Build
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            No limits to creativity. We build custom playable ads tailored to your brand and campaign goals. Here are some formats we specialize in:
          </p>
        </div>
        
        <div className="space-y-8">
          {offerings.map((offering, index) => (
            <div key={offering.title} className="bg-gradient-to-r from-teal-50 to-white rounded-xl p-8 border border-teal-100 hover:border-teal-300 transition-colors">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <span className="text-4xl font-extrabold text-teal-200">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {offering.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {offering.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 