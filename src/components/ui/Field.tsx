import { useId } from "react";
import type { ReactNode } from "react";

/**
 * Components 8 and 9 — Form Field, Budget-Range Select, network chips.
 *
 * Label above, always; never placeholder-as-label. The placeholder is
 * an example, never a restatement of the label. Focus takes the
 * neutral ring — never the teal one, because a form is not a playable.
 * Mobile controls are 52px tall at 16px: under 16px iOS Safari
 * auto-zooms and breaks the layout, so that floor is not negotiable.
 */

interface Base {
  label: string;
  name: string;
  error?: string;
  helper?: string;
  required?: boolean;
}

function Wrapper({
  id,
  label,
  error,
  helper,
  required,
  children,
}: Base & { id: string; children: ReactNode }) {
  return (
    <div className="field" data-invalid={error ? "true" : undefined}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="field__msg field__msg--error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : helper ? (
        <p className="field__msg" id={`${id}-helper`}>
          {helper}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  type = "text",
  placeholder,
  autoComplete,
  multiline,
  value,
  onChange,
  onBlur,
  ...base
}: Base & {
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
}) {
  const id = useId();
  const describedBy = base.error ? `${id}-error` : base.helper ? `${id}-helper` : undefined;
  const shared = {
    id,
    name: base.name,
    className: "field__control",
    placeholder,
    autoComplete,
    value,
    required: base.required,
    "aria-invalid": base.error ? (true as const) : undefined,
    "aria-describedby": describedBy,
    onBlur,
  };
  return (
    <Wrapper id={id} {...base}>
      {multiline ? (
        <textarea {...shared} rows={4} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...shared} type={type} onChange={(e) => onChange(e.target.value)} />
      )}
    </Wrapper>
  );
}

/**
 * Native <select> on purpose: it gets the platform picker on mobile for
 * free, is keyboard-complete, and is announced correctly. A custom
 * listbox is only worth building if options need per-option
 * descriptions — these do not.
 *
 * "Not sure yet" must stay in the volume options. Removing it forces a
 * guess and degrades the lead.
 */
export function SelectField({
  options,
  placeholder = "Select",
  value,
  onChange,
  onBlur,
  ...base
}: Base & {
  options: readonly string[];
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
}) {
  const id = useId();
  return (
    <Wrapper id={id} {...base}>
      <div className="field__select">
        <select
          id={id}
          name={base.name}
          className="field__control"
          value={value}
          required={base.required}
          aria-invalid={base.error ? true : undefined}
          aria-describedby={base.error ? `${id}-error` : undefined}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span className="field__chevron" aria-hidden="true">
          ▾
        </span>
      </div>
    </Wrapper>
  );
}

/**
 * Related pattern — network chips. A fieldset of checkboxes styled as
 * chips. Never teal: selecting a network is not running a playable.
 */
export function ChipGroup({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: readonly { id: string; name: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <fieldset className="field">
      <legend className="field__label">{legend}</legend>
      <div className="chips">
        {options.map((o) => {
          const on = selected.includes(o.id);
          return (
            <label
              key={o.id}
              className="chip"
              data-selected={on ? "true" : undefined}
            >
              <input
                type="checkbox"
                name="networks"
                value={o.id}
                checked={on}
                onChange={() => onToggle(o.id)}
              />
              {o.name.toUpperCase()}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
