import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { setAppLanguage, type AppLanguage } from "../i18n/index.js";
import { useUnlock } from "../context/UnlockContext.js";

export function Header() {
  const { t, i18n } = useTranslation();
  const { unlocked, tryUnlock, lock } = useUnlock();
  const [showPassphraseInput, setShowPassphraseInput] = useState(false);
  const [passphrase, setPassphrase] = useState("");

  const lang = (i18n.resolvedLanguage ?? "en") as AppLanguage;

  const submitPassphrase = () => {
    if (tryUnlock(passphrase)) {
      setShowPassphraseInput(false);
      setPassphrase("");
    } else {
      setPassphrase("");
    }
  };

  return (
    <header className="mx-auto flex max-w-[1180px] flex-wrap items-end justify-between gap-5 border-b border-line pb-4 pt-5">
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] uppercase tracking-[0.12em] text-ink-soft">
          {t("chrome.brandMark")}
        </span>
        <h1 className="font-serif text-2xl">
          <Link to="/" className="hover:underline">
            {t("chrome.title")}
          </Link>
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div
          role="group"
          aria-label={t("chrome.languageGroupLabel")}
          className="inline-flex overflow-hidden rounded-sm border border-line"
        >
          <button
            type="button"
            aria-pressed={lang === "en"}
            onClick={() => setAppLanguage("en")}
            className={`border-r border-line px-3.5 py-1.5 text-[13px] font-medium ${
              lang === "en" ? "bg-ink text-paper" : "bg-paper-raised text-ink-soft"
            }`}
          >
            {t("chrome.english")}
          </button>
          <button
            type="button"
            aria-pressed={lang === "bg"}
            onClick={() => setAppLanguage("bg")}
            className={`px-3.5 py-1.5 text-[13px] font-medium ${
              lang === "bg" ? "bg-ink text-paper" : "bg-paper-raised text-ink-soft"
            }`}
          >
            {t("chrome.bulgarian")}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {unlocked ? (
            <button
              type="button"
              onClick={lock}
              className="rounded-sm border border-line bg-paper-raised px-3.5 py-2 text-[13px] font-medium hover:border-ink-soft"
            >
              {t("chrome.lockBtn")}
            </button>
          ) : showPassphraseInput ? (
            <form
              className="flex items-center gap-1.5"
              onSubmit={(e) => {
                e.preventDefault();
                submitPassphrase();
              }}
            >
              <label htmlFor="passphrase-input" className="sr-only">
                {t("chrome.passphraseLabel")}
              </label>
              <input
                id="passphrase-input"
                type="password"
                autoFocus
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="w-[150px] rounded-sm border border-line bg-paper-raised px-2 py-1.5 text-[13px]"
              />
              <button
                type="submit"
                className="rounded-sm border border-line bg-paper-raised px-2.5 py-1.5 text-[13px] font-medium hover:border-ink-soft"
              >
                {t("chrome.passphraseSubmit")}
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setShowPassphraseInput(true)}
              className="rounded-sm border border-line bg-paper-raised px-3.5 py-2 text-[13px] font-medium hover:border-ink-soft"
            >
              {t("chrome.unlockBtn")}
            </button>
          )}
          <span className={`text-xs ${unlocked ? "font-semibold text-good" : "text-ink-soft"}`}>
            {unlocked ? t("chrome.unlockedStatus") : t("chrome.lockedStatus")}
          </span>
        </div>
      </div>
    </header>
  );
}
