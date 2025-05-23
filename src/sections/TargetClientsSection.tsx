import React from "react";
import { trustedBrands as targetBrands } from "../data/trustedBy";

export default function TargetClientsSection() {
  return (
    <section className="py-16 px-4 bg-white text-center">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Our Dream Clients</h2>
      <p className="text-gray-500 max-w-xl mx-auto mb-8">
        We build playful campaigns for bold brands. These are the kinds of teams we’re inspired by—and excited to support.
      </p>
      <div className="flex justify-center flex-wrap gap-8 items-center opacity-80">
        {targetBrands.map((brand) => (
          <img
            key={brand.name}
            src={brand.logo}
            alt={brand.name}
            className="h-12 w-auto grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
      <p className="text-sm text-gray-400 mt-6 italic">
        Logos shown here represent brands we admire and hope to work with. No implied endorsement.
      </p>
    </section>
  );
}



    // <section className="py-16 bg-white text-center">
    //   <h3 className="text-xl font-medium text-gray-600">
    //     Trusted by early-stage brands, startups, and marketers building the future of advertising.
    //   </h3>

    //   {/* Optional aesthetic: blurred logos or generic icons */}
    //   <div className="mt-6 flex justify-center gap-6 opacity-40">
    //     <div className="w-24 h-12 bg-gray-200 rounded animate-pulse" />
    //     <div className="w-24 h-12 bg-gray-200 rounded animate-pulse" />
    //     <div className="w-24 h-12 bg-gray-200 rounded animate-pulse" />
    //     <div className="w-24 h-12 bg-gray-200 rounded animate-pulse" />
    //   </div>
    // </section>