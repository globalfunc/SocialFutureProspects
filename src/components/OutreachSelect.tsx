import { useTranslation } from "react-i18next";
import type { OutreachStatus } from "../lib/types.js";

const OUTREACH_STATES: OutreachStatus[] = [
  "Not sent",
  "Sent",
  "Reminder sent",
  "Replied",
  "Accepted",
  "Declined",
  "No response",
];

interface OutreachSelectProps {
  id: string;
  value: OutreachStatus;
  setAt: string | null;
  locked: boolean;
  pending: boolean;
  onChange: (value: OutreachStatus) => void;
  label?: string;
  // Required whenever no visible `label` is rendered (e.g. the table's
  // per-row column already has a header cell, but each row's control still
  // needs its own accessible name to disambiguate — a `title` attribute
  // alone doesn't count as a robust accessible name, per axe-core's
  // label-title-only rule).
  ariaLabel?: string;
  className?: string;
}

export function OutreachSelect({
  id,
  value,
  setAt,
  locked,
  pending,
  onChange,
  label,
  ariaLabel,
  className = "",
}: OutreachSelectProps) {
  const { t } = useTranslation();
  const selectId = `outreach-${id}`;

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={selectId} className="mb-1 block text-xs font-semibold text-ink-soft">
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        value={value}
        aria-label={label ? undefined : ariaLabel}
        aria-disabled={locked || undefined}
        aria-busy={pending || undefined}
        title={locked ? t("table.unlockToChange") : undefined}
        onChange={(e) => {
          if (locked) return;
          onChange(e.target.value as OutreachStatus);
        }}
        onClick={(e) => {
          if (locked) e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (locked) e.preventDefault();
        }}
        className={`w-full rounded-sm border border-line bg-paper-raised px-1.5 py-1 text-xs ${
          locked ? "cursor-not-allowed opacity-55" : ""
        }`}
      >
        {OUTREACH_STATES.map((state) => (
          <option key={state} value={state}>
            {t(`outreachStatus.${state}`)}
          </option>
        ))}
      </select>
      {setAt ? (
        <span className="mt-0.5 block font-mono text-[11px] text-ink-soft">
          {t("table.setOn", { date: setAt.slice(0, 10) })}
        </span>
      ) : null}
    </div>
  );
}
