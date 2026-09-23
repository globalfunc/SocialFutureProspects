import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { setAppLanguage, type AppLanguage } from "../../i18n/index.js";
import { isBreak, speakers } from "./speakers.js";
import { SpeakerEntry } from "./SpeakerEntry.js";
import { BreakEntry } from "./BreakEntry.js";
import "./ProgramLineup.css";

// Standalone public programme page (design approved 2026-09-22) — deliberately
// rendered outside the internal tool's <Header>/<main> shell (see App.tsx),
// since it's a distinct white/jamba-branded page meant to be opened in a new
// tab and possibly shared, not part of the review workflow. Reuses the app's
// global i18n language state (its own EN/BG toggle here just mirrors Header's)
// so the choice carries over if the reader navigates back to the review tool.
export function ProgramLineup() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? "en") as AppLanguage;

  return (
    <div className="pl-page">
      <div className="pl-brandbar"></div>
      <div className="pl-wrap">
        <div className="pl-toolbar">
          <div className="pl-lang-group" role="group" aria-label={t("chrome.languageGroupLabel")}>
            <button
              type="button"
              className="pl-lang-btn"
              aria-pressed={lang === "en"}
              onClick={() => setAppLanguage("en")}
            >
              {t("chrome.english")}
            </button>
            <button
              type="button"
              className="pl-lang-btn"
              aria-pressed={lang === "bg"}
              onClick={() => setAppLanguage("bg")}
            >
              {t("chrome.bulgarian")}
            </button>
          </div>
        </div>

        <header className="pl-masthead">
          <p className="pl-eyebrow">{t("programLineup.eyebrow")}</p>
          <h1 className="pl-title">{t("programLineup.title")}</h1>
          <div className="pl-meta-row">
            <span className="pl-meta-chip">{t("programLineup.dateChip")}</span>
            <span className="pl-meta-chip">{t("programLineup.timeChip")}</span>
            <span className="pl-meta-chip">{t("programLineup.platformChip")}</span>
          </div>
          <p className="pl-lede">{t("programLineup.lede")}</p>
        </header>

        <section className="pl-programme" aria-labelledby="pl-speakers-heading">
          <div className="pl-section-head">
            <div>
              <p className="pl-section-eyebrow">{t("programLineup.speakersEyebrow")}</p>
              <h2 className="pl-section-title" id="pl-speakers-heading">
                {t("programLineup.speakersTitle")}
              </h2>
            </div>
            <p className="pl-tz-note">{t("programLineup.tzNote")}</p>
          </div>

          <ol className="pl-lineup">
            {speakers.map((item) =>
              isBreak(item) ? (
                <BreakEntry key={item.id} item={item} lang={lang} />
              ) : (
                <SpeakerEntry key={item.id} speaker={item} lang={lang} />
              ),
            )}
          </ol>
        </section>

        <footer className="pl-page-footer">
          <Link to="/" className="pl-back-link">
            {t("programLineup.backToIndex")}
          </Link>
        </footer>
      </div>
    </div>
  );
}
