import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SkipLink } from "./components/SkipLink.js";
import { Header } from "./components/Header.js";
import { ErrorBanner } from "./components/ErrorBanner.js";
import { TableView } from "./routes/TableView/TableView.js";
import { DetailView } from "./routes/DetailView/DetailView.js";

export function App() {
  const { t } = useTranslation();

  return (
    <>
      <SkipLink />
      <Header />
      <ErrorBanner />
      <main id="main" className="mx-auto max-w-[1180px] px-4">
        <Routes>
          <Route path="/" element={<TableView />} />
          <Route path="/prospect/:id" element={<DetailView />} />
        </Routes>
      </main>
      <footer className="mx-auto mt-8 max-w-[1180px] border-t border-line px-4 pt-4 pb-10 text-xs text-ink-soft">
        <p>{t("footer.text")}</p>
      </footer>
    </>
  );
}
