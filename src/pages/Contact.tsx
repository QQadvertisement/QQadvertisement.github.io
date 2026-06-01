import React from "react";
import { Helmet } from "react-helmet-async";
import ContactSection from "../sections/ContactSection";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | QQ Advertisement</title>
        <meta name="description" content="Contact QQ Advertisement to explore how we can gamify your ad campaigns. Let's build engaging and playful customer experiences together." />
        <meta name="keywords" content="contact ad agency, playable ads, marketing inquiry, interactive advertising, QQ Advertisement contact" />
      </Helmet>
      <ContactSection />
    </>
  );
}