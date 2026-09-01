import { Link } from "react-router-dom";
import { BOOKING_URL, QUOTE_HREF } from "../../data/site";

/* ---------------------------------------------------------------
   CTA BAND

   Every page ends in one, and it always carries BOTH paths. That is
   the rule the wireframes repeat on every artboard and the one the
   current site breaks: a reader who will not book a call has, today,
   nowhere else to go.

   The two paths are not the same size of ask, and the band should not
   pretend they are. "Get a flat quote" is the low-commitment path —
   it lands on the brief form, which the reader fills in alone. "Book
   a call" asks for a calendar slot. So the quote is the filled button
   and the call is the outline one, on both variants.

   GROUND. Both variants sit on sunken paper; they differ only in the
   weight of the rule above them. `1b` ends on a paper band with an
   amber primary — amber is the buy colour — and no teal, because a
   full-width teal band would compete with the playable for the one
   meaning teal is allowed to carry.
   --------------------------------------------------------------- */

export default function CtaBand({
  title,
  variant = "primary",
  quoteHref = QUOTE_HREF,
  quoteLabel = "Get a flat quote",
}: {
  title: string;
  variant?: "primary" | "secondary";
  quoteHref?: string;
  quoteLabel?: string;
}) {
  const internal = quoteHref.startsWith("/") || quoteHref.startsWith("#");
  const quoteClass = "btn btn--accent btn--lg";

  return (
    <section className="cta-band" data-variant={variant} data-reveal>
      <div className="cta-band__inner">
        <h2 className="cta-band__title t-display t-display-2xs t-display-md-at-desktop">
          {title}
        </h2>
        <div className="cta-band__actions btn-pair">
          {internal ? (
            <Link className={quoteClass} to={quoteHref}>
              {quoteLabel}
            </Link>
          ) : (
            <a className={quoteClass} href={quoteHref}>
              {quoteLabel}
            </a>
          )}
          <a
            className="btn btn--outline btn--lg"
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
          >
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}
