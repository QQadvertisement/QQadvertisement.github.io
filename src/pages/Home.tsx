import React from "react";
import { Helmet } from "react-helmet-async";

// Core Sections
import HeroSection from "../sections/HeroSection";
import TargetClientsSection from "../sections/TargetClientsSection";
import ProductSection from "../sections/ProductSection";
import ContactSection from "../sections/ContactSection";
import CTASection from "../sections/CTASection";
import CaseStudiesSection from "../sections/CaseStudiesSection";

// New Agency-Focused Sections
import FeaturedCaseStudySection from "../sections/FeaturedCaseStudySection";
import WhyPlayableAdsMatterSection from "../sections/WhyPlayableAdsMatterSection";
import HowItWorksSection from "../sections/HowItWorksSection";

// Reusable Content Sections
import LeftTextRightImageSection from "../sections/LeftText-RightImageSection";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Playable Ads Agency | QQ Advertisement</title>
        <meta name="description" content="We build high-converting playable ads for DTC brands. 240% ROI, 4-week timeline, $8k all-in. Interactive ads convert 3-5x higher than static banners." />
        <meta name="keywords" content="playable ads, interactive advertising, DTC marketing, ad agency, conversion optimization, mobile ads" />
      </Helmet>
      
      <main className="bg-white text-gray-900">
        {/* 1. Hero Section - Problem-Led */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* 2. Social Proof - Featured Case Study */}
        <section id="case-study">
          <FeaturedCaseStudySection />
        </section>

        {/* 3. Problem Section - Why Playable Ads Matter */}
        <section id="why">
          <WhyPlayableAdsMatterSection />
        </section>

        {/* 4. Agency Positioning - Speed & Pricing */}
        <LeftTextRightImageSection
          title="Agency Built for Speed"
          paragraphs={[
            "We're not a SaaS platform. We're an agency of builders. We do the work for you.",
            "4-week timeline from brief to launch. $8k all-in cost. No hidden fees. No minimums. You get a custom playable ad built specifically for your brand, audience, and conversion goals.",
            "Most agencies charge $30k+. Most take 3 months. We do better because we focus on playable ads only. It's all we build. We're damn good at it."
          ]}
          imageSrc="/assets/home/tired.webp"
          imageAlt="Fast playable ad development"
          bgFrom="white"
          bgVia="teal-50"
          bgTo="white"
          primaryBtnText="Check Availability"
          primaryBtnLink="#contact"
        />

        {/* 5. Trusted By Section (optional, can be removed) */}
        <section id="trusted" className="bg-gray-50 py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-gray-600 font-semibold mb-6">Trusted by</h3>
            <TargetClientsSection />
          </div>
        </section>

        {/* 6. Playable Ad Formats */}
        <section id="formats">
          <ProductSection />
        </section>

        {/* 7. How It Works - 3-Step Process */}
        <section id="process">
          <HowItWorksSection />
        </section>

        {/* 8. Additional Case Studies */}
        <section id="case-studies">
          <CaseStudiesSection />
        </section>

        {/* 9. Final CTA */}
        <section id="contact">
          <CTASection />
          <ContactSection />
        </section>
      </main>
    </>
  );
}