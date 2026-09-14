import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ContactSource, ContactSourceType } from "../lib/types.js";

const SOURCE_TYPES: ContactSourceType[] = [
  "personal-website",
  "company-website",
  "linkedin",
  "instagram",
  "facebook",
  "other",
];

function makeSourceId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `source-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

interface ContactSourcesEditorProps {
  sources: ContactSource[];
  locked: boolean;
  pending: boolean;
  onChange: (sources: ContactSource[]) => void;
  className?: string;
}

// Non-email ways to reach a prospect (personal/company site, LinkedIn, Instagram,
// Facebook, other) — the common case per CLAUDE.md where no public email exists.
// Purely user-curated: type + URL, addable/removable, list can hold more than one
// entry (e.g. both a personal-site contact form and a LinkedIn profile).
export function ContactSourcesEditor({ sources, locked, pending, onChange, className = "" }: ContactSourcesEditorProps) {
  const { t } = useTranslation();
  const [draftType, setDraftType] = useState<ContactSourceType>("personal-website");
  const [draftUrl, setDraftUrl] = useState("");
  const typeSelectId = useId();
  const urlInputId = useId();

  const handleAdd = () => {
    const url = draftUrl.trim();
    if (!url || locked) return;
    onChange([...sources, { id: makeSourceId(), type: draftType, url }]);
    setDraftUrl("");
  };

  const handleRemove = (sourceId: string) => {
    if (locked) return;
    onChange(sources.filter((s) => s.id !== sourceId));
  };

  return (
    <div className={className} aria-busy={pending || undefined}>
      {sources.length > 0 ? (
        <ul className="mb-2.5 flex flex-col gap-1.5">
          {sources.map((source) => (
            <li
              key={source.id}
              className="flex items-center gap-2 border border-line bg-paper-raised px-2.5 py-1.5 text-xs"
            >
              <span className="shrink-0 rounded-sm border border-line bg-paper px-1.5 py-0.5 font-semibold text-ink-soft">
                {t(`detail.email.contactSourceType.${source.type}`)}
              </span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 flex-1 truncate text-accent hover:underline"
              >
                {source.url}
              </a>
              <button
                type="button"
                onClick={() => handleRemove(source.id)}
                aria-disabled={locked || undefined}
                title={locked ? t("table.unlockToChange") : undefined}
                className={`shrink-0 rounded-sm border border-line bg-paper px-2 py-1 text-xs font-medium hover:border-ink-soft ${
                  locked ? "cursor-not-allowed opacity-55" : ""
                }`}
              >
                {t("detail.email.removeSource")}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-2.5 text-xs text-ink-soft">{t("detail.email.noSources")}</p>
      )}

      <div className="flex flex-wrap items-end gap-2">
        <div>
          <label htmlFor={typeSelectId} className="mb-1 block text-xs font-semibold text-ink-soft">
            {t("detail.email.sourceTypeLabel")}
          </label>
          <select
            id={typeSelectId}
            value={draftType}
            disabled={locked}
            onChange={(e) => setDraftType(e.target.value as ContactSourceType)}
            className={`rounded-sm border border-line bg-paper-raised px-1.5 py-1 text-xs ${
              locked ? "cursor-not-allowed opacity-55" : ""
            }`}
          >
            {SOURCE_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`detail.email.contactSourceType.${type}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[200px] flex-1">
          <label htmlFor={urlInputId} className="mb-1 block text-xs font-semibold text-ink-soft">
            {t("detail.email.sourceUrlLabel")}
          </label>
          <input
            id={urlInputId}
            type="url"
            inputMode="url"
            value={draftUrl}
            readOnly={locked}
            title={locked ? t("table.unlockToChange") : undefined}
            placeholder={t("detail.email.sourceUrlPlaceholder")}
            onChange={(e) => setDraftUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            className={`w-full rounded-sm border border-line bg-paper-raised px-1.5 py-1 text-xs ${
              locked ? "cursor-not-allowed opacity-55" : ""
            }`}
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={locked || !draftUrl.trim()}
          className="shrink-0 rounded-sm border border-line bg-paper-raised px-2.5 py-1.5 text-xs font-medium hover:border-ink-soft disabled:cursor-not-allowed disabled:opacity-45"
        >
          {t("detail.email.addSource")}
        </button>
      </div>
    </div>
  );
}
