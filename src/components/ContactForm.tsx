import { useRef, useState } from "react";
import { BEAR_SRC } from "../lib/brand";
import { ChipGroup, SelectField, TextField } from "./ui/Field";
import { BOOKING_URL, CONTACT_EMAIL, networks } from "../data/site";

/**
 * The contact form, used on / and on /for-agencies.
 *
 * Validation is on blur, never per keystroke; errors clear on the next
 * input event. On submit failure focus moves to the first invalid field
 * and an error summary renders above the form with anchor links.
 *
 * Error copy states the cause and the fix, in the brand voice — not
 * "Invalid input" but "That looks like a personal address — we need the
 * one your team uses."
 *
 * There is no backend in this repository, so submit composes a mail
 * draft rather than pretending to POST somewhere. Swap `deliver` for a
 * real endpoint when one exists; nothing else here needs to change.
 */

const FREE_MAIL = /@(gmail|googlemail|yahoo|hotmail|outlook|icloud|proton(mail)?|aol)\./i;

type Errors = Partial<Record<"name" | "email" | "volume" | "detail", string>>;

export default function ContactForm({
  variant = "studio",
  volumeLabel,
  volumeOptions,
  detailLabel,
  detailPlaceholder,
  submitLabel,
  showNetworkChips = false,
}: {
  variant?: "studio" | "agency";
  volumeLabel: string;
  volumeOptions: readonly string[];
  detailLabel: string;
  detailPlaceholder: string;
  submitLabel: string;
  showNetworkChips?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [volume, setVolume] = useState("");
  const [detail, setDetail] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!name.trim()) e.name = "We need a name to address the reply to.";
    if (!email.trim()) {
      e.email = "We need an address to send the plan to.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "That address is missing something — check the @ and the domain.";
    } else if (FREE_MAIL.test(email)) {
      e.email = "That looks like a personal address — we need the one your team uses.";
    }
    if (!volume) e.volume = "Pick the closest range. “Not sure yet” is a real answer.";
    if (!detail.trim()) e.detail = "One line is enough — a store link, or the genre.";
    return e;
  };

  const clear = (key: keyof Errors) =>
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      setSummary(true);
      const first = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"]'
      );
      first?.focus();
      return;
    }
    setSummary(false);

    const reference = `QQ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `${volumeLabel}: ${volume}`,
      showNetworkChips ? `Networks: ${picked.join(", ") || "not stated"}` : "",
      "",
      detail,
      "",
      `Reference: ${reference}`,
    ].filter(Boolean);

    // deliver
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `${variant === "agency" ? "Capacity request" : "Build brief"} — ${name}`
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(reference);
  };

  if (sent) {
    return (
      <div className="form-success">
        {/* Form success is one of the bear's five permitted placements, at 72px. */}
        <img src={BEAR_SRC} alt="" />
        <div>
          <h3 className="t-display t-display-4xs">That's with us.</h3>
          <p className="t-body-sm c-body" style={{ marginBlockStart: 8 }}>
            Your mail client should have opened with the brief filled in. If it didn't, send the
            same details to{" "}
            <a className="link-inline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            . We reply within one business day.
          </p>
        </div>
        <dl className="spec-list spec-list--compact spec-list--top-ruled" style={{ inlineSize: "100%" }}>
          <div className="spec-row">
            <dt className="spec-row__label">Reference</dt>
            <span className="spec-row__leader" aria-hidden="true" />
            <dd className="spec-row__value">{sent}</dd>
          </div>
          <div className="spec-row">
            <dt className="spec-row__label">Reply within</dt>
            <span className="spec-row__leader" aria-hidden="true" />
            <dd className="spec-row__value">1 business day</dd>
          </div>
        </dl>
        <a className="btn btn--outline" href="/demos/atta-sync-your-day">
          Read a teardown while you wait →
        </a>
      </div>
    );
  }

  return (
    <form className="form" ref={formRef} onSubmit={onSubmit} noValidate>
      {summary && Object.values(errors).some(Boolean) ? (
        <div className="form__error-summary" role="alert">
          <p className="t-semibold">Four fields, and two of them need another look:</p>
          <ul style={{ marginBlockStart: 8, display: "grid", gap: 4 }}>
            {(Object.entries(errors) as [string, string | undefined][])
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <li key={k}>
                  <a href={`#${k}`}>{v}</a>
                </li>
              ))}
          </ul>
        </div>
      ) : null}

      <div className="form__row">
        <TextField
          label="Name"
          name="name"
          autoComplete="name"
          placeholder="Dana Okoye"
          value={name}
          required
          error={errors.name}
          onChange={(v) => {
            setName(v);
            clear("name");
          }}
        />
        <TextField
          label={variant === "agency" ? "Agency email" : "Work email"}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={variant === "agency" ? "you@agency.com" : "you@studio.com"}
          value={email}
          required
          error={errors.email}
          onChange={(v) => {
            setEmail(v);
            clear("email");
          }}
        />
      </div>

      <SelectField
        label={volumeLabel}
        name="volume"
        options={volumeOptions}
        value={volume}
        required
        error={errors.volume}
        onChange={(v) => {
          setVolume(v);
          clear("volume");
        }}
      />

      {showNetworkChips ? (
        <ChipGroup
          legend="Networks you buy on"
          options={networks.map((n) => ({ id: n.id, name: n.name }))}
          selected={picked}
          onToggle={(id) =>
            setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
          }
        />
      ) : null}

      <TextField
        label={detailLabel}
        name="detail"
        multiline
        placeholder={detailPlaceholder}
        value={detail}
        required
        error={errors.detail}
        onChange={(v) => {
          setDetail(v);
          clear("detail");
        }}
      />

      <div className="form__submit-row">
        <button type="submit" className="btn btn--neutral btn--xl">
          {submitLabel}
        </button>
        <span className="t-body-xs c-body">
          or{" "}
          <a className="link-inline" href={BOOKING_URL} target="_blank" rel="noreferrer">
            book a 20-minute call
          </a>
        </span>
      </div>
      <p className="t-body-2xs c-muted">* All four fields are required.</p>
    </form>
  );
}
