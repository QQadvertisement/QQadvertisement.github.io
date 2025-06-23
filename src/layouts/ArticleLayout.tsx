import React from "react";
import { Link } from "react-router-dom";

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <a href="/" className="text-teal-600 hover:underline">← Back to Case Studies</a>
      </div>
      <article className="prose prose-lg">{children}</article>
    </div>
  );
} 