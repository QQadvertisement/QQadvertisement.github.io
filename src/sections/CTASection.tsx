import React from "react";

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-teal-100 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to gamify your next campaign?
      </h2>
      <p className="text-lg mb-6 max-w-xl mx-auto text-gray-700">
        Let’s create something playful and powerful together. Book a free discovery call and get your first campaign idea on us.
      </p>
      <a
        href="https://tally.so/r/your-form-id" // Replace with actual Tally URL
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700"
      >
        Let’s Work Together
      </a>
    </section>
  );
}
