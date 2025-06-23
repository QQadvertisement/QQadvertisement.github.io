import React from "react";
import { Helmet } from "react-helmet-async";

// Core Sections
import HeroSection from "../sections/HeroSection";
import TargetClientsSection from "../sections/TargetClientsSection";
import ProductSection from "../sections/ProductSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import ContactSection from "../sections/ContactSection";
import CTASection from "../sections/CTASection";
import DemoExperienceSection from "../sections/DemoExperienceSection";

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
            "Traditional banners now average just a 0.05% click-through rate. Customers' brains automatically tune out rectangular ad spaces, and your marketing budget disappears into ignored impressions.",
            "But what if your ads could be impossible to ignore? Gamified experiences break through banner blindness by turning passive viewing into active engagement."
          ]}
          imageSrc="/assets/home/tired.webp"
          imageAlt="Illustration showing low engagement with traditional ads"
          bgFrom="white"
          bgVia="red-50"
          bgTo="white"
        />

        {/* 4. Product Offer 2: Real-Time Analytics */}
        <LeftImageRightTextSection
          title="Turn Ads Into Experiences People Want to Engage"
          paragraphs={[
            "Customers forget ads. They remember experiences. That's why we don't do traditional ads. Instead, we build memorable gamified experiences that stick.",
            "Mini-games spark curiosity, invite interaction, and keep your brand top-of-mind. Gamified ads don't just get seen. They get played, shared, and remembered. We turn passive scrollers into active participants, and boring impressions into measurable results.",
            "Every interaction becomes data. Every game completion becomes a conversion opportunity. Every share becomes free brand exposure."
          ]}
          imageSrc="/assets/home/trygmf1.png"
          imageAlt="Gamified ad experience mockup"
          reverseGradient={true}
          primaryBtnText="Learn More"
          primaryBtnLink="/contact"
          secondaryBtnText="Schedule a Demo"
          secondaryBtnLink="https://calendly.com/hello-qqadvertisement/30min"
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
            {/* Mobile-only metric */}
            <div className="md:hidden bg-white/80 border border-teal-100 rounded-xl px-4 py-2 flex flex-col items-center shadow-sm">
              <span className="text-2xl font-extrabold text-teal-700">+1 min</span>
              <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">Engagement Time</span>
            </div>
          </div>
        </LeftImageRightTextSection>

        {/* 5. Product Offer 3: White-Label for Agencies */}
        <LeftTextRightImageSection
          title="White-Label Gamified Ads for Agencies"
          paragraphs={[
            "Stand out as the agency with real innovation. Offer your clients interactive, gamified ad campaigns, fully white-labeled under your brand.",
            "Most indie game projects take up to 12 months to publish. That's way too long for marketing! With us, your clients can launch a custom gamified campaign in 2 months or less, ready to drive results fast.",
            "We build the games, you deliver the results. No dev team, no extra overhead. Unlock premium pricing, win new business, and keep clients coming back.",
            "Let us handle the tech and creative. You focus on growing your agency and profits. Keep 60% of revenue for work you don't have to do."
          ]}
          imageSrc="/assets/home/white-label.webp"
          imageAlt="White-label gamified ads platform for agencies"
          bgFrom="white"
          bgVia="blue-50"
          bgTo="white"
          primaryBtnText="Learn More"
          primaryBtnLink="/contact"
          secondaryBtnText="Schedule a Demo"
          secondaryBtnLink="https://calendly.com/hello-qqadvertisement/30min"
        />

        {/* 5.5. Demo Experience Section */}
        <section id="demo">
          <DemoExperienceSection />
        </section>

        {/* 6. Product Offer 4: Done-For-You Campaigns */}
        <LeftImageRightTextSection
          title="See What Your Competitors Can't: Campaign Analytics"
          paragraphs={[
            "While your competitors guess what works, you'll know exactly what drives results. Our comprehensive analytics dashboard transforms raw engagement data into clear, actionable insights that actually matter for your business.",
            "Track engagement patterns, identify user behavior trends, and understand what keeps players coming back. Our team doesn't just build games. We analyze every interaction to help you understand your audience and optimize future campaigns for maximum ROI.",
            "Get detailed performance reports with human interpretation. We don't just show you numbers. We explain what they mean for your brand and how to apply these insights to your next campaign. Data-driven decisions made simple."
          ]}
          imageSrc="/assets/home/tryanal3.png"
          imageAlt="Analytics dashboard showing campaign performance metrics and user insights"
          reverseGradient={true}
          primaryBtnText="Learn more"
          primaryBtnLink="/contact"
          secondaryBtnText="Schedule a Demo"
          secondaryBtnLink="https://calendly.com/hello-qqadvertisement/30min"
        />
        
        {/* 7. Product Showcase */}
        <section id="product">
          <ProductSection />
        </section>


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