import { useId, useState } from "react";

/**
 * Component 7 — FAQ Accordion.
 *
 * Single-open, not multi. Clicking the open row closes it, leaving all
 * closed. One row is open on load; which one is a prop (-1 for none).
 *
 * The open row's top border darkening to --color-text-primary is the
 * primary signal; the +/− is the redundant non-colour signal required
 * by the colour-not-alone rule.
 *
 * Height is never animated — it is a layout property and thrashes.
 * `grid-template-rows: 0fr → 1fr` is compositor-safe and snaps under
 * prefers-reduced-motion (see components.css).
 */
export default function Faq({
  items,
  defaultOpen = 0,
  compact = false,
  columns = 1,
}: {
  items: { q: string; a: string }[];
  defaultOpen?: number;
  compact?: boolean;
  /** `1b` lays the home page's four rows out two-up. Single-open
   *  behaviour is unchanged across columns — opening a row on the
   *  right still closes one on the left, because they are one
   *  accordion that happens to wrap, not two lists. */
  columns?: 1 | 2;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();

  return (
    <div className="faq" data-columns={columns}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        const headId = `${uid}-head-${i}`;
        return (
          <div className="faq__row" key={item.q} data-open={isOpen ? "true" : "false"}>
            <h3>
              <button
                type="button"
                id={headId}
                className="faq__head"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className={`faq__q ${compact ? "t-body-lg" : "t-body-xl"}`}>
                  {item.q}
                </span>
                <span className="faq__sign" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              className="faq__panel"
              id={panelId}
              role="region"
              aria-labelledby={headId}
              data-open={isOpen ? "true" : "false"}
            >
              <div>
                <p className="faq__a t-body-md">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
