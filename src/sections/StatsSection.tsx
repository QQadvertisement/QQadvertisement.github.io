import React from "react";

export default function StatsSection() {
  const stats = [
    { label: "Higher engagement", value: "+80%" },
    { label: "Conversion rate", value: "3x" },
    { label: "User satisfaction", value: "90%" },
    { label: "Clickable joy", value: "100%" },
  ];

  return (
    <section className="py-16 px-4 bg-white text-center">
      <h2 className="text-2xl font-bold mb-8">Let the numbers work for you</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-4xl font-extrabold text-teal-600">{stat.value}</p>
            <p className="text-sm mt-2 text-gray-700">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
