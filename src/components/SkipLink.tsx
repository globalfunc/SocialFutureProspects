import { useTranslation } from "react-i18next";

export function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main"
      className="absolute left-3 top-3 z-50 -translate-y-16 rounded-sm bg-ink px-4 py-2.5 font-semibold text-paper transition-transform focus:translate-y-0"
    >
      {t("common.skipToMain")}
    </a>
  );
}
