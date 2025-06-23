import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleLayout from "../../layouts/ArticleLayout";
import { insights } from "../../data/caseStudies";

export default function ArticlePage() {
  const { slug } = useParams();
  const article = insights.find(a => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) return <div>Article not found.</div>;
  return (
    <ArticleLayout>
      <img src={article.image} alt={article.title} className="w-full rounded-xl mb-6" />
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="mb-6">{article.summary}</p>
      <a href={article.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition">Try our version</a>
    </ArticleLayout>
  );
}
