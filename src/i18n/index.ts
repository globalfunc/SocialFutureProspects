import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { LANGUAGE_STORAGE_KEY } from "../config.js";
import { en } from "./locales/en.js";
import { bg } from "./locales/bg.js";

export type AppLanguage = "en" | "bg";

function initialLanguage(): AppLanguage {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "en" || stored === "bg") return stored;
  } catch {
    // localStorage unavailable (private mode etc.) — fall through to default.
  }
  return "en";
}

void i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    bg: { translation: bg },
  },
  lng: initialLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnNull: false,
});

export function setAppLanguage(lang: AppLanguage): void {
  void i18next.changeLanguage(lang);
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // Per-viewer convenience only — losing this preference is not harmful.
  }
}

export default i18next;
