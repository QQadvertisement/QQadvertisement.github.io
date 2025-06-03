import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../sections/HeroSection";
import StatsSection from "../sections/StatsSection";
import TargetClientsSection from "../sections/TargetClientsSection";
import CTASection from "../sections/CTASection";
import DemoExperienceSection from "../sections/DemoExperienceSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import CaseStudiesSection from "../sections/CaseStudiesSection";
import ContactSection from "../sections/ContactSection";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home | QQ Advertisement</title>
        <meta name="description" content="Gamified ad tech agency helping brands grow through interactive mini-games and playful marketing." />
        <meta name="keywords" content="gamified ads, ad agency, digital marketing, interactive advertising, mini-games for brands" />
      </Helmet>
      <main className="bg-white text-gray-900">
        <section id="hero">
          <HeroSection />
        </section>
        <section id="trusted">
          <TargetClientsSection />
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
    </>
  );
}