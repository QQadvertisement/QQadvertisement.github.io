import React from "react";

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-10 md:py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 md:gap-16 items-center">
        {/* Left Column: Stats */}
        <div className="text-left">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-8 leading-tight">
            Our customers see significant and immediate performance improvement.
          </h2>
          <div className="flex space-x-8">
            <div className="flex-1">
              <p className="text-6xl font-extrabold text-teal-500">3X</p>
              <p className="text-gray-600 mt-2">Higher user engagement than traditional display ads.</p>
            </div>
            <div className="border-l border-gray-200"></div>
            <div className="flex-1">
              <p className="text-6xl font-extrabold text-teal-500">2X</p>
              <p className="text-gray-600 mt-2">Increase in customer retention and brand loyalty.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Testimonial */}
        <div className="text-left bg-gray-50 p-8 rounded-2xl shadow-sm">
          <p className="text-2xl lg:text-3xl font-medium text-gray-700 italic leading-snug">
            "They gamified one of our survey campaigns. It's so good! Our customers are happier and we're seeing more returning eaters."
          </p>
          <div className="flex items-center mt-8">
            <img
              src="/assets/logos/Friends-ramen.webp" // Placeholder avatar
              alt="Friends Ramen"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4">
              <p className="font-bold text-gray-900">Friends Ramen</p>
              <p className="text-gray-600">Owner, Friends Ramen</p>
              {/* If you have a company logo, it can go here */}
              {/* <img src="/path/to/company-logo.svg" alt="Example Corp" className="mt-2 h-6" /> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Dotted Line - a simplified version */}
      <div
        className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-1"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
        }}
      ></div>
    </section>
  );
}
