import { Fragment, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BOOKING_URL, CONTACT_EMAIL, navItems } from "../data/site";

/**
 * Component 1 — Nav, all three variants.
 *
 *   1a default    light material, 78px desktop / 60px mobile
 *   1b condensed  translucent deep, 62px — the teardown, and any
 *                 page scrolled past 240px
 *   1c sheet      full-viewport overlay below 1024
 *   1d over-stage transparent, on-ground ink — the at-rest state on
 *                 a page that opens on a navy stage
 *
 * The nav CTA is never teal. It leads somewhere; it does not run
 * anything, and teal promises "here", not "over there".
 */

export interface Breadcrumb {
  label: string;
  to?: string;
}

export default function SiteNav({
  variant = "default",
  breadcrumbs,
  counter,
  nextLabel,
  nextTo,
  overStage = false,
}: {
  variant?: "default" | "condensed";
  breadcrumbs?: Breadcrumb[];
  counter?: string;
  nextLabel?: string;
  nextTo?: string;
  /** Set on pages whose first section is a navy stage, so the bar
   *  starts transparent instead of laying light material over it. */
  overStage?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const condensed = variant === "condensed" || scrolled;

  useEffect(() => {
    if (variant === "condensed") return;
    const onScroll = () => setScrolled(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  /* Lock body scroll, trap focus, and return focus to the hamburger. */
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("is-locked");
    const sheet = sheetRef.current;
    const focusables = sheet?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-locked");
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isTeardown = variant === "condensed";

  return (
    <>
      <header
        className={`nav${condensed ? " nav--condensed ground-deep" : ""}${
          overStage ? " nav--over-stage" : ""
        }`}
        data-variant={condensed ? "condensed" : "default"}
      >
        <div className="nav__inner">
          <Link className="wordmark wordmark--nav" to="/" aria-label="QQ Advertisement, home">
            QQ
          </Link>

          {isTeardown && breadcrumbs?.length ? (
            <>
              <span className="nav__divider" aria-hidden="true" />
              <nav className="nav__crumbs" aria-label="Breadcrumb">
                {breadcrumbs.map((c, i) => (
                  <Fragment key={c.label}>
                    {i > 0 ? (
                      <span className="nav__crumb-sep" aria-hidden="true">
                        /
                      </span>
                    ) : null}
                    {c.to ? (
                      <Link className="nav__crumb" to={c.to}>
                        {c.label}
                      </Link>
                    ) : (
                      <span className="nav__crumb nav__crumb--current" aria-current="page">
                        {c.label}
                      </span>
                    )}
                  </Fragment>
                ))}
              </nav>
            </>
          ) : (
            <nav className="nav__list" aria-label="Primary">
              {navItems.map((item) =>
                /* Hash targets are in-page jumps, not routes — giving
                   them an aria-current would mark two items at once. */
                item.to.includes("#") ? (
                  <Link key={item.to} to={item.to} className="nav__link">
                    {item.label}
                  </Link>
                ) : (
                  <NavLink key={item.to} to={item.to} className="nav__link" end={item.to === "/"}>
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>
          )}

          <div className="nav__end">
            {isTeardown ? (
              <>
                {counter ? <span className="nav__counter">{counter}</span> : null}
                {nextTo && nextLabel ? (
                  <Link className="nav__next" to={nextTo}>
                    {nextLabel}
                  </Link>
                ) : null}
              </>
            ) : (
              <a className="nav__contact" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            )}

            <a
              className={`btn btn--sm ${
                condensed || overStage ? "btn--on-ground" : "btn--neutral"
              }`}
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
            >
              Book a call
            </a>

            <button
              type="button"
              ref={burgerRef}
              className="nav__burger"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          className="sheet ground-dark"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="sheet__bar">
            <span className="wordmark wordmark--nav">QQ</span>
            <button
              type="button"
              className="sheet__close"
              aria-label="Close menu"
              onClick={() => {
                setOpen(false);
                burgerRef.current?.focus();
              }}
            >
              ✕
            </button>
          </div>

          <nav className="sheet__group" aria-label="Primary">
            {navItems.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                className="sheet__item"
                style={{ ["--i" as string]: i }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="sheet__foot">
            <a
              className="btn btn--xl btn--block btn--on-ground"
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
            >
              Book a call
            </a>
            <a className="t-mono t-mono-xs c-muted u-upper" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
