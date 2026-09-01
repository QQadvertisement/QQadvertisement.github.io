import { Link } from "react-router-dom";
import { BEAR_SRC } from "../lib/brand";
import { CONTACT_EMAIL, footerColumns, legalLinks, site } from "../data/site";

/**
 * Component 12 — Footer.
 *
 * Ground is --color-ground-deep, deeper than any section band, so it
 * reads as the page's floor.
 *
 * `showBrandMark` is forced false on /for-brands. That page carries
 * no bear at any size, including here: no playable on the page, so
 * neither reserved asset is permitted.
 */
export default function SiteFooter({
  showBrandMark = true,
  variant = "default",
}: {
  showBrandMark?: boolean;
  variant?: "default" | "condensed";
}) {
  const legal = `${site.legalName.toUpperCase()} · ${site.city.toUpperCase()} · © ${site.year}`;

  if (variant === "condensed") {
    return (
      <footer className="footer footer--condensed ground-deep">
        <div className="footer__row">
          <div className="footer__mark">
            <span className="wordmark wordmark--footer">QQ</span>
            {showBrandMark ? <img src={BEAR_SRC} alt="" /> : null}
          </div>
          <p className="footer__legal">
            <a className="footer__link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL.toUpperCase()}
            </a>
            <span aria-hidden="true"> · </span>
            {legal}
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer ground-deep">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__mark">
            <span className="wordmark wordmark--footer">QQ</span>
            {/* One of the bear's five permitted placements, at 24–26px. */}
            {showBrandMark ? <img src={BEAR_SRC} alt="" /> : null}
          </div>
          <p className="footer__descriptor t-body-xs">{site.descriptor}</p>
        </div>

        <div className="footer__grid">
          {footerColumns.map((col) => (
            <nav className="footer__col" key={col.head} aria-label={col.head}>
              <h2 className="footer__col-head">{col.head}</h2>
              {col.links.map((l) => (
                <Link className="footer__link" to={l.to} key={`${col.head}-${l.label}`}>
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </div>

      <div className="footer__divider" />

      <div className="footer__legal">
        <span>{legal}</span>
        <span className="footer__legal-links">
          {/* The sitemap's legal row. One line in the base, not a
              fifth content column — these are obligations, not
              things anyone came here to read. */}
          {legalLinks.map((l) => (
            <Link className="footer__link" key={l.to} to={l.to}>
              {l.label.toUpperCase()}
            </Link>
          ))}
          <a className="footer__link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL.toUpperCase()}
          </a>
          <a
            className="footer__link"
            href="https://linkedin.com/company/qqadvertisement"
            target="_blank"
            rel="noreferrer"
          >
            LINKEDIN
          </a>
        </span>
      </div>
    </footer>
  );
}
