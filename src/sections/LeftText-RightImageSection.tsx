import React from "react";

interface Props {
  title: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt?: string;
  bgFrom?: string;
  bgVia?: string;
  bgTo?: string;
  reverseGradient?: boolean;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
}

export default function LeftTextRightImageSection({
  title,
  paragraphs,
  imageSrc,
  imageAlt = "Illustration",
  bgFrom = "white",
  bgVia = "teal-50",
  bgTo = "white",
  reverseGradient = false,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink,
}: Props) {
  const gradientClass = reverseGradient
    ? `bg-gradient-to-tl from-${bgFrom} via-${bgVia} to-${bgTo}`
    : `bg-gradient-to-br from-${bgFrom} via-${bgVia} to-${bgTo}`;

  return (
    <section
      className={`relative ${gradientClass} py-20 px-6 overflow-hidden`}
    >
      {/* Background Shapes */}
      {reverseGradient ? (
        <>
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-teal-200 rounded-full opacity-20 blur-3xl z-0" />
          <div className="absolute bottom-0 -left-20 w-[200px] h-[200px] bg-yellow-200 rounded-full opacity-10 blur-2xl z-0" />
        </>
      ) : (
        <>
          <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-teal-200 rounded-full opacity-20 blur-3xl z-0" />
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-yellow-200 rounded-full opacity-10 blur-2xl z-0" />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Column */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-extrabold text-teal-800 leading-tight">
            {title}
          </h2>
          {paragraphs.map((text, index) => (
            <p key={index} className="text-gray-700 text-lg leading-relaxed">
              {text}
            </p>
          ))}
          
          {/* Buttons */}
          <div className="flex items-center space-x-4 pt-4">
            {primaryBtnText && primaryBtnLink && (
              <a
                href={primaryBtnLink}
                className="inline-block bg-transparent text-teal-600 font-semibold px-6 py-3 rounded-lg border border-teal-600 hover:bg-teal-600 hover:text-white transition-colors duration-300"
              >
                {primaryBtnText}
              </a>
            )}
            {secondaryBtnText && secondaryBtnLink && (
              <a
                href={secondaryBtnLink}
                className="inline-block bg-transparent text-teal-600 font-semibold px-6 py-3 rounded-lg border border-teal-600 hover:bg-teal-600 hover:text-white transition-colors duration-300"
              >
                {secondaryBtnText}
              </a>
            )}
          </div>
        </div>

        {/* Image Column */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-md w-full rounded-2xl md:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}