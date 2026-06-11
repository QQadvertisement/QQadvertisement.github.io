import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://qqadvertisement.com";
export const SITE_NAME = "QQ Advertisement";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/QQadsOnePager.webp`;

interface SeoProps {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/our-work" */
  path: string;
  image?: string;
  /** One or more schema.org objects rendered as JSON-LD */
  jsonLd?: object | object[];
}

export default function Seo({ title, description, path, image, jsonLd }: SeoProps) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image ?? DEFAULT_OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
}

export function breadcrumbsJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}
