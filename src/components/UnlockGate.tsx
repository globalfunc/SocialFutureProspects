import { useState, type FormEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useUnlock } from "../context/UnlockContext.js";

// Hides its children entirely until the shared passphrase is entered — used
// on the table listing so the prospect list itself (not just editing) is
// gated, per CLAUDE.md's internal-only distribution intent. Shares the same
// unlock state as Header's own control, so unlocking/locking from either
// place stays in sync.
export function UnlockGate({ children }: { children: ReactNode }) {
  const { unlocked, tryUnlock } = useUnlock();
  const { t } = useTranslation();
  const [passphrase, setPassphrase] = useState("");

  if (unlocked) return <>{children}</>;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    tryUnlock(passphrase);
    setPassphrase("");
  };

  return (
    <div className="flex flex-col items-center gap-3 border border-line bg-paper-raised px-6 py-20 text-center">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ink-soft">{t("table.eyebrow")}</p>
      <h2 className="font-serif text-2xl">{t("table.lockedTitle")}</h2>
      <p className="max-w-[52ch] text-sm text-ink-soft">{t("table.lockedBody")}</p>
      <form className="mt-2 flex items-center gap-2" onSubmit={submit}>
        <label htmlFor="table-passphrase-input" className="sr-only">
          {t("chrome.passphraseLabel")}
        </label>
        <input
          id="table-passphrase-input"
          type="password"
          autoFocus
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          className="w-45 rounded-sm border border-line bg-paper px-2.5 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-sm border border-line bg-paper px-3.5 py-2 text-[13px] font-medium hover:border-ink-soft"
        >
          {t("chrome.passphraseSubmit")}
        </button>
      </form>
    </div>
  );
}
