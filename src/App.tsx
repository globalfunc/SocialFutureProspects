import { Outlet, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SkipLink } from "./components/SkipLink.js";
import { Header } from "./components/Header.js";
import { ErrorBanner } from "./components/ErrorBanner.js";
import { TableView } from "./routes/TableView/TableView.js";
import { DetailView } from "./routes/DetailView/DetailView.js";
import { ProgramLineup } from "./routes/ProgramLineup/ProgramLineup.js";

// The internal review tool's shell (skip link, unlock/lock header, footer).
// /program-lineup deliberately renders outside this shell — see
// ProgramLineup.tsx's own comment — so it stays a Route sibling, not nested
// inside it.
function ReviewToolShell() {
  const { t } = useTranslation();

  return (
    <>
      <SkipLink />
      <Header />
      <ErrorBanner />
      <main id="main" className="mx-auto max-w-[1180px] px-4">
        <Outlet />
      </main>
      <footer className="mx-auto mt-8 max-w-[1180px] border-t border-line px-4 pt-4 pb-10 text-xs text-ink-soft">
        <p>{t("footer.text")}</p>
      </footer>
    </>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<ReviewToolShell />}>
        <Route path="/" element={<TableView />} />
        <Route path="/prospect/:id" element={<DetailView />} />
      </Route>
      <Route path="/program-lineup" element={<ProgramLineup />} />
    </Routes>
  );
}
