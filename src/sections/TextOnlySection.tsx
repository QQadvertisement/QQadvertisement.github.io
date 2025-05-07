import React from "react";

interface Props {
  title: string;
  paragraphs: string[];
  align?: "left" | "center";
  bgColor?: string;
}

const bgClassMap: Record<string, string> = {
  "teal-500": "bg-teal-500",
  "white": "bg-white",
  "gray-50": "bg-gray-50",
  "blue-50": "bg-blue-50",
  "teal-50": "bg-teal-50",
  // Add more if needed
};

export default function TextOnlySection({
  title,
  paragraphs,
  align = "left",
  bgColor = "white",
}: Props) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  const backgroundClass = bgClassMap[bgColor] || "bg-white";

  return (
    <section className={`py-20 px-6 ${backgroundClass}`}>
      <div className={`max-w-4xl mx-auto flex flex-col gap-6 ${alignment}`}>
        <h2 className="text-3xl font-bold text-teal-700">{title}</h2>
        {paragraphs.map((text, index) => (
          <p key={index} className="text-gray-700 text-lg leading-relaxed">
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}