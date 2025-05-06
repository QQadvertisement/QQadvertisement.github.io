import React from "react";
import LeftTextRightImageSection from "../sections/LeftText-RightImageSection";
import LeftImageRightTextSection from "../sections/LeftImage-RightTextSection";
import TextOnlySection from "../sections/TextOnlySection";
import StatsSection from "../sections/StatsSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import ContactSection from "../sections/ContactSection";


export default function About() {
  return (
    <main className="space-y-20 px-6 md:px-12 lg:px-24 py-16 text-gray-800">
      <section id="about1">
        <LeftTextRightImageSection
          title="Who We Are"
          paragraphs={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse."
          ]}
          imageSrc="/assets/logos/qq-joystick-bg.png"
        />
      </section>

      <section id="about-text">
        <TextOnlySection
          title="Why Gamified Ads Are the Future"
          paragraphs={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit... Lorem ipsum dolor sit amet, consectetur adipiscing elit... Lorem ipsum dolor sit amet, consectetur adipiscing elit... Lorem ipsum dolor sit amet, consectetur adipiscing elit... Lorem ipsum dolor sit amet, consectetur adipiscing elit... Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            "Our mission is to bridge the gap between play and performance marketing..."
          ]}
        />
      </section>

      <section id="about2">
        <LeftImageRightTextSection
          title="Who We Are"
          paragraphs={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse."
          ]}
          imageSrc="/assets/logos/qq-joystick-bg.png"
        />
        <StatsSection />
        <TextOnlySection
          title="Lorem Ipsum"
          paragraphs={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit... Lorem ipsum dolor sit amet, consectetur adipiscing elit... Lorem ipsum dolor sit amet, consectetur adipiscing elit... Lorem ipsum dolor sit amet, consectetur adipiscing elit... Lorem ipsum dolor sit amet, consectetur adipiscing elit... Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            "Our mission is to bridge the gap between play and performance marketing..."
          ]}
        />
      </section>
      <TestimonialsSection />
      <ContactSection />

    </main>
  );
}
