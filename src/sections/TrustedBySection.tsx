import React from "react";
import { trustedBrands } from "../data/trustedBy";

export default function TrustedBySection() {
  return (
    <section className="py-12 px-4 bg-gray-50 text-center">
      <h2 className="text-xl font-semibold mb-6">Trusted by forward-thinking teams</h2>
      <div className="flex justify-center flex-wrap gap-8 items-center">
        {trustedBrands.map((brand) => (
          <img
            key={brand.name}
            src={brand.logo}
            alt={brand.name}
            className="h-12 w-auto opacity-70 hover:opacity-100 transition"
          />
        ))}
      </div>
    </section>
  );
}