import Seo from "../Seo";
import { Section } from "../blocks";
import CtaBand from "./CtaBand";

/* ---------------------------------------------------------------
   PAGE SKELETON — a route that exists before its content does.

   The 2026-08-20 sitemap publishes nine pages the business has not
   written yet: Blog, Benchmarks, Glossary, Careers, Creative Testing,
   Interactive Demos and the three legal pages. Three ways to handle
   that, and only one of them is honest:

     · leave them unbuilt      -> the nav 404s
     · fill them with filler   -> unreviewed words on a live site,
                                  and claims nobody signed off
     · build the room, not the furniture   <- this

   So each of these routes is REAL: it resolves, it carries its own
   title and description, it renders a heading and a closing CTA, and
   it is reachable from the nav. What it does not do is pretend. The
   `outline` is the section list the page will have, shown as the plan
   it is, and the page says plainly that it is being written.

   A reader who lands here gets a working page that tells them the
   truth and offers them the two things every other page offers. That
   is a worse page than a finished one and a much better page than a
   fabricated one.

   TO FINISH ONE: replace the <PageSkeleton> call with a real page.
   Nothing else has to change — the route, the SEO entry and the nav
   link all already point here.
   --------------------------------------------------------------- */

export default function PageSkeleton({
  path,
  title,
  metaTitle,
  description,
  lede,
  outline,
  ctaTitle = "In the meantime, the work speaks for itself.",
}: {
  path: string;
  /** the <h1> */
  title: string;
  metaTitle: string;
  description: string;
  /** one honest sentence about what this page will hold */
  lede: string;
  /** the sections planned for it, in order */
  outline: readonly string[];
  ctaTitle?: string;
}) {
  return (
    <main className="main">
      <Seo title={metaTitle} description={description} path={path} />

      <Section padBlock={[40, 48]} labelledBy="skeleton-head">
        <p className="hero__kicker" data-reveal>
          In progress
        </p>
        <h1
          id="skeleton-head"
          className="t-display t-display-sm t-display-2xl-at-desktop"
          style={{ maxInlineSize: "20ch", marginBlockEnd: 20 }}
          data-reveal
        >
          {title}
        </h1>
        <p
          className="t-body-md t-body-lg-at-desktop c-body"
          style={{ maxInlineSize: "54ch" }}
          data-reveal
        >
          {lede}
        </p>

        <div className="outline" data-reveal>
          <h2 className="outline__head t-mono t-mono-2xs u-upper">What will be here</h2>
          <ol className="outline__list">
            {outline.map((item, i) => (
              <li className="outline__item" key={item}>
                <span className="outline__num t-mono t-mono-2xs" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-body-sm">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <CtaBand title={ctaTitle} variant="secondary" />
    </main>
  );
}
