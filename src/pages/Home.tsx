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
import CaseStudiesSection from "../sections/CaseStudiesSection";
import InsightStatsSection from "../sections/InsightStatsSection";

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
            "Banner blindness affects 86% of consumers. Your display ads are filtered out before anyone even notices them. You're paying for impressions that generate zero impact.",
            "Traditional banners now average just a 0.05% click-through rate. Customers' brains automatically tune out rectangular ad spaces, and your marketing budget disappears into ignored impressions."
          ]}
          imageSrc="/assets/home/tired.webp"
          imageAlt="Illustration showing low engagement with traditional ads"
          bgFrom="white"
          bgVia="red-50"
          bgTo="white"
        />

        {/* 4. Product Offer 2: Real-Time Analytics */}
        <LeftImageRightTextSection
          title="Turn Ads Into Experiences People Want to Engage With"
          paragraphs={[
            "Customer forget ads. They remember experience. That's why we don't do traditional ads, we build memroable gamified ads.",
            "Mini-games spark curiosity, invite interaction, and keep your brand top-of-mind. Gamified ads don't just get seen,they get played, shared, and remembered. We turn passive scrollers into active participants, and boring impressions into measurable results."
          ]}
          imageSrc="/images/placeholder-solution.webp"
          imageAlt="Analytics dashboard showing engagement metrics"
          reverseGradient={true}
          primaryBtnText="Learn More"
          primaryBtnLink="#"
          secondaryBtnText="Schedule a Demo"
          secondaryBtnLink="#"
        >
          {/* Stat Row */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-white/80 border border-teal-100 rounded-xl px-4 py-2 flex flex-col items-center shadow-sm">
              <span className="text-2xl font-extrabold text-teal-700">300%</span>
              <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">Higher Engagement</span>
            </div>
            <div className="bg-white/80 border border-teal-100 rounded-xl px-4 py-2 flex flex-col items-center shadow-sm">
              <span className="text-2xl font-extrabold text-teal-700">65%</span>
              <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">Better Recall</span>
            </div>
            <div className="bg-white/80 border border-teal-100 rounded-xl px-4 py-2 flex flex-col items-center shadow-sm">
              <span className="text-2xl font-extrabold text-teal-700">+25.3%</span>
              <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">Sales Conversions</span>
            </div>
          </div>
        </LeftImageRightTextSection>

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

        <section id="case-studies">
          <CaseStudiesSection />
        </section>

        {/* 9. Get Started */}
        <section id="contact">
          <CTASection />
          <ContactSection />
        </section>
      </main>
    </>
  );
}