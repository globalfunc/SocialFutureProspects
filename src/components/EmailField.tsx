import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAnnounce } from "../context/AnnounceContext.js";

interface EmailFieldProps {
  id: string;
  value: string | null;
  locked: boolean;
  pending: boolean;
  onSave: (value: string | null) => void;
  label?: string;
  // Required whenever no visible `label` is rendered — see OutreachSelect's
  // same convention for why a `title` alone doesn't count as an accessible name.
  ariaLabel?: string;
  className?: string;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// The one editable+copyable email control, reused in both the Contact and
// Email tabs so there is exactly one place the value actually lives
// (ProspectState.email, via the onSave callback) — editing it in either tab
// updates the other immediately since both read the same prospect.email.
export function EmailField({ id, value, locked, pending, onSave, label, ariaLabel, className = "" }: EmailFieldProps) {
  const { t } = useTranslation();
  const announce = useAnnounce();
  const [draft, setDraft] = useState(value ?? "");
  const inputId = `email-field-${id}`;

  useEffect(() => {
    setDraft(value ?? "");
  }, [value]);

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed === (value ?? "")) return;
    onSave(trimmed || null);
  };

  const handleCopy = async () => {
    if (!value) return;
    const ok = await copyText(value);
    announce(t(ok ? "announce.copiedEmail" : "announce.copyFailed"));
  };

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={inputId} className="mb-1 block text-xs font-semibold text-ink-soft">
          {label}
        </label>
      ) : null}
      <div className="flex gap-1.5">
        <input
          id={inputId}
          type="email"
          inputMode="email"
          value={draft}
          aria-label={label ? undefined : ariaLabel}
          aria-disabled={locked || undefined}
          aria-busy={pending || undefined}
          readOnly={locked}
          title={locked ? t("table.unlockToChange") : undefined}
          placeholder={t("detail.contact.emailPlaceholder")}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              (e.target as HTMLInputElement).blur();
            } else if (e.key === "Escape") {
              setDraft(value ?? "");
            }
          }}
          className={`min-w-0 flex-1 rounded-sm border border-line bg-paper-raised px-1.5 py-1 text-xs ${
            locked ? "cursor-not-allowed opacity-55" : ""
          }`}
        />
        <button
          type="button"
          onClick={() => void handleCopy()}
          disabled={!value}
          className="shrink-0 rounded-sm border border-line bg-paper-raised px-2 py-1 text-xs font-medium hover:border-ink-soft disabled:cursor-not-allowed disabled:opacity-45"
        >
          {t("detail.contact.copyEmail")}
        </button>
      </div>
    </div>
  );
}
