import React from "react";

interface Props {
  title: string;
  paragraphs: string[];
  align?: "left" | "center";
}

export default function TextOnlySection({ title, paragraphs, align = "left" }: Props) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <section className="py-20 px-6 bg-white">
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
