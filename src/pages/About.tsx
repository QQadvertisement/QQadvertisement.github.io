import React from "react";
import { Helmet } from "react-helmet-async";
import LeftTextRightImageSection from "../sections/LeftText-RightImageSection";
import LeftImageRightTextSection from "../sections/LeftImage-RightTextSection";
import TextOnlySection from "../sections/TextOnlySection";

import StatsSection from "../sections/StatsSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import ContactSection from "../sections/ContactSection";
import CTASection from "../sections/CTASection";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | QQ Advertisement</title>
        <meta name="description" content="Learn about QQ Advertisement’s mission to bring joy to marketing through gamified ad campaigns and interactive brand experiences." />
        <meta name="keywords" content="about QQ Advertisement, gamified ads, interactive marketing, ad agency mission, brand story" />
      </Helmet>
      <main className="space-y-24">
      <LeftTextRightImageSection
        title="Who We Are"
        paragraphs={[
          "QQ Advertisement is a creative ad studio that builds gamified campaigns people actually want to engage with.",
          "We turn passive viewers into active participants — helping brands boost clicks, dwell time, and conversions through joyfully crafted ad experiences."
        ]}
        imageSrc="/assets/logos/qqads/2.png"
        bgFrom="white"
        bgTo="blue-50"
      />

      <section id="about-text">
        <TextOnlySection
          title="Our Mission & Values"
          paragraphs={[
            "We started QQ Advertisement not from a boardroom, but from a dorm room — as international students with bold ideas and even bolder ambitions. We didn’t wait for permission to build something different. We just built it. At our core, we believe in the power of play — not just as a gimmick, but as a transformative marketing tool. We use interactivity, joy, and experimentation to help brands create campaigns people actually enjoy.",            
            "We’re driven by four values:",
            "• Energy — We move fast, learn faster, and keep things fun. If it’s not exciting to us, it won’t be exciting to your audience.",
            "• Connection — We care about attention with intention. Ads aren’t just about reach — they’re about relationships.",
            "• Daring — We test, we play, we take creative risks. Because the best results come from the boldest experiments.",
            "Our mission is simple:",
            "To bridge the gap between performance marketing and playful design, and to prove that interactive ads can do more than sell — they can stick, surprise, and spark something real."
          ]}
          bgColor="bg-red-100"
        />
      </section>

      <LeftImageRightTextSection
        title="Why Gamified Ads Are the Future"
        paragraphs={[
          "People skip traditional ads. But when ads feel like games — they play.",
          "Gamification combines UX, behavioral science, and interactivity to create branded experiences that spark curiosity and drive action.",
          "At QQ, we design mini-games and reward-based campaigns that turn marketing into entertainment. The result? More engagement, more loyalty, and more fun."
        ]}
        imageSrc="/assets/casestudies/BK.png"
        bgFrom="white"
        bgTo="white"
      />

      <StatsSection />
      {/* <TestimonialsSection /> */}
      {/* <CTASection/> */}

      <ContactSection />
    </main>
    </>
  );
}
