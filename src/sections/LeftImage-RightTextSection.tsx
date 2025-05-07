import React from "react";

interface Props {
  title: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt?: string;
  bgFrom?: string;
  bgVia?: string;
  bgTo?: string;
}

export default function LeftImageRightTextSection({
  title,
  paragraphs,
  imageSrc,
  imageAlt = "Illustration",
  bgFrom = "white",
  bgVia = "teal-50",
  bgTo = "white"
}: Props) {
  return (
    <section
      className={`relative bg-gradient-to-br from-${bgFrom} via-${bgVia} to-${bgTo} py-20 px-6 overflow-hidden`}
    >
      {/* Background Shape */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-teal-200 rounded-full opacity-20 blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-yellow-200 rounded-full opacity-10 blur-2xl z-0" />

      <div className="relative z-10 max-w-none w-full flex flex-col-reverse md:flex-row-reverse items-center gap-10">
        {/* Right Text Column */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-extrabold text-teal-800 leading-tight">
            {title}
          </h2>
          {paragraphs.map((text, index) => (
            <p key={index} className="text-gray-700 text-lg leading-relaxed">
              {text}
            </p>
          ))}
        </div>

        {/* Left Image Block */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-md w-full drop-shadow-xl rounded-2xl md:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}
