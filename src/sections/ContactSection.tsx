import React, { useEffect } from "react";

export default function ContactSection() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.Tally) window.Tally.loadEmbeds();
    };
    document.body.appendChild(script);
  }, []);

  return (
    <section className="bg-gray-50 py-10 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 md:gap-12 items-start">
        {/* Form Embed - Shows first on mobile, second on desktop */}
        <div className="w-full max-w-xl order-1 md:order-2">
          <iframe
            data-tally-src="https://tally.so/embed/31xKGL?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="574"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Registration form"
          ></iframe>
        </div>

        {/* Text Column - Shows second on mobile, first on desktop */}
        <div className="order-2 md:order-1">
          <h2 className="text-4xl font-bold text-teal-700 mb-6">
            Ready to Gamify Your Next Campaign?
          </h2>
          <p className="text-gray-700 text-lg mb-4">
            Let's turn your marketing into something people actually want to interact with. Book a free discovery call — we'll brainstorm your first gamified concept, on the house.
          </p>
          <p className="text-gray-700 text-lg">
            Whether you're launching a product, boosting loyalty, or just tired of boring ads — we've got ideas ready to roll.
            <br></br>
            ⸻
            <br></br>
            🛡️ We'll only use your info to contact you about your inquiry. No spam. Ever!!
          </p>
        </div>
      </div>
    </section>
  );
}