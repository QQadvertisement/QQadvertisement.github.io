import React from "react";
import { Helmet } from "react-helmet-async";
import LeftTextRightImageSection from "../sections/LeftText-RightImageSection";
import LeftImageRightTextSection from "../sections/LeftImage-RightTextSection";
import TextOnlySection from "../sections/TextOnlySection";
import ContactSection from "../sections/ContactSection";

export default function Products() {
  return (
    <>
      <Helmet>
        <title>Products | QQ Advertisement</title>
        <meta name="description" content="Explore QQ Advertisement’s gamified ad products and custom interactive mini-games that help brands capture and convert audiences." />
        <meta name="keywords" content="gamified products, interactive ads, mini-games, marketing tools, QQ Advertisement offerings" />
      </Helmet>
      <main className="flex flex-col">
        <section className="text-center py-20 px-6 bg-gradient-to-b from-white to-teal-50">
          <h1 className="text-5xl font-extrabold text-teal-700 mb-6">
            Lorem Ipsum Dolor Sit Amet
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus.
          </p>
        </section>

        <LeftTextRightImageSection
          title="Lorem Ipsum Dolor"
          paragraphs={["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at libero nec metus pretium convallis."]}
          imageSrc="/assets/product-placeholder-1.png"
          bgFrom="white"
          bgTo="blue-50"
        />

        <LeftImageRightTextSection
          title="Consectetur Adipiscing"
          paragraphs={["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at libero nec metus pretium convallis."]}
          imageSrc="/assets/product-placeholder-1.png"
          bgFrom="teal-50"
          bgTo="white"
        />

        <LeftTextRightImageSection
          title="Integer Nec Odio"
          paragraphs={["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at libero nec metus pretium convallis."]}
          imageSrc="/assets/product-placeholder-1.png"
          bgFrom="white"
          bgTo="teal-50"
        />

        <TextOnlySection
          title="Lorem Ipsum Deep Dive"
          paragraphs={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
            "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.",
            "Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris."
          ]}
        />

        <ContactSection/>
      </main>
    </>
  );
}