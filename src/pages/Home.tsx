import React from "react";
import { Helmet } from "react-helmet-async";

// Core Sections
import HeroSection from "../sections/HeroSection";
import TargetClientsSection from "../sections/TargetClientsSection";
import ProductSection from "../sections/ProductSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import ContactSection from "../sections/ContactSection";
import CTASection from "../sections/CTASection";

// Reusable Content Sections (for the new B2B flow)
import LeftTextRightImageSection from "../sections/LeftText-RightImageSection";
import LeftImageRightTextSection from "../sections/LeftImage-RightTextSection";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Gamified Advertising Agency | QQ Advertisement</title>
        <meta name="description" content="We build high-retention gamified ad campaigns for DTC and B2C brands. Drive engagement and loyalty with interactive mini-games." />
        <meta name="keywords" content="gamified ads, ad agency, interactive advertising, DTC marketing, brand engagement, retention marketing" />
      </Helmet>
      
      <main className="bg-white text-gray-900">
        {/* 1. Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* 2. Trusted By Bar */}
        <section id="trusted">
          <TargetClientsSection />
        </section>

        {/* 3. Product Offer 1: Stop Losing Money on Ads */}
        <LeftTextRightImageSection
          title="Stop Losing Money on Ads People Ignore"
          paragraphs={[
            "Your ads get 0.05% click rates. Customers scroll past without looking.",
            "Interactive games that engage for 2-3 minutes instead of 2 seconds. Result: 300-500% higher engagement, 10x better brand recall.",
            "Turn your ignored ads into entertainment people choose to play."
          ]}
          imageSrc="/images/placeholder-problem.webp"
          imageAlt="Illustration showing low engagement with traditional ads"
          bgFrom="white"
          bgVia="red-50"
          bgTo="white"
          primaryBtnText="Learn More"
          primaryBtnLink="#"
          secondaryBtnText="Schedule a Demo"
          secondaryBtnLink="#"
        />

        {/* 4. Product Offer 2: Real-Time Analytics */}
        <LeftImageRightTextSection
          title="Finally Know Which Ads Actually Work"
          paragraphs={[
            "You're flying blind - impressions and clicks don't tell you if people care.",
            "See exactly how long people engage, what they remember, what drives action. Result: Stop wasting budget on ads that don't work, double down on what does.",
            "Stop guessing. Start knowing which creative actually moves the needle."
          ]}
          imageSrc="/images/placeholder-solution.webp"
          imageAlt="Analytics dashboard showing engagement metrics"
          reverseGradient={true}
          primaryBtnText="Learn More"
          primaryBtnLink="#"
          secondaryBtnText="Schedule a Demo"
          secondaryBtnLink="#"
        />

        {/* 7. Product Showcase */}
        <section id="product">
          <ProductSection />
        </section>

        {/* 5. Product Offer 3: White-Label for Agencies */}
        <LeftTextRightImageSection
          title="Become The Agency That Delivers Results Others Can't"
          paragraphs={[
            "Clients expect innovation but you're stuck offering the same old banner ads.",
            "Sell cutting-edge interactive campaigns under your brand - we build, you profit. Result: Premium pricing, client retention, competitive differentiation.",
            "Offer what your competitors can't. Keep 60% of revenue for work you don't do."
          ]}
          imageSrc="/images/placeholder-services.webp"
          imageAlt="White-label platform interface"
          bgFrom="white"
          bgVia="blue-50"
          bgTo="white"
          primaryBtnText="Learn More"
          primaryBtnLink="#"
          secondaryBtnText="Schedule a Demo"
          secondaryBtnLink="#"
        />

        {/* 6. Product Offer 4: Done-For-You Campaigns */}
        <LeftImageRightTextSection
          title="Get Premium Campaigns Without The Premium Headaches"
          paragraphs={[
            "You want breakthrough campaigns but lack the team/time/expertise to execute.",
            "We handle everything - strategy, development, deployment, optimization. Result: Launch campaigns that win awards and drive results while you focus on your business.",
            "Hand us your brief. Get back campaigns that make your competitors wonder how you did it."
          ]}
          imageSrc="/images/placeholder-case-study.webp"
          imageAlt="Complete campaign development process"
          reverseGradient={true}
          primaryBtnText="Learn More"
          primaryBtnLink="#"
          secondaryBtnText="Schedule a Demo"
          secondaryBtnLink="#"
        />

        {/* 8. Social Proof & Case Studies */}
        <TestimonialsSection />

        {/* 9. Get Started */}
        <section id="contact">
          <CTASection />
          <ContactSection />
        </section>
      </main>
    </>
  );
}