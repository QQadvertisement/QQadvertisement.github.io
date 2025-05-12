import React from "react";
import HeroSection from "../sections/HeroSection";
import StatsSection from "../sections/StatsSection";
import TrustedBySection from "../sections/TrustedBySection";
import CTASection from "../sections/CTASection";
import DemoExperienceSection from "../sections/DemoExperienceSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import CaseStudiesSection from "../sections/CaseStudiesSection";
import ContactSection from "../sections/ContactSection";

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <section id="hero">
        <HeroSection />
      </section>
      <section id="trusted">
        <TrustedBySection />
      </section>
      <section id="demo">
        <DemoExperienceSection />
      </section>
      <section id="stats">
        <StatsSection />
      </section>
      <section id="case-studies">
        <CaseStudiesSection />
      </section>
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      <section id="contact">
        <CTASection />
      </section>
        <ContactSection />
    </main>
  );
}