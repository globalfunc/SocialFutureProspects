import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./i18n/index.js";
import "./index.css";
import { AnnounceProvider } from "./context/AnnounceContext.js";
import { ErrorBannerProvider } from "./context/ErrorBannerContext.js";
import { UnlockProvider } from "./context/UnlockContext.js";
import { StorageProvider } from "./context/StorageContext.js";
import { App } from "./App.js";

// HashRouter, not BrowserRouter: GitHub Pages 404s on deep links otherwise
// (CLAUDE.md Phase 1 decision), which would break the moment Christian
// bookmarks or reloads a detail page.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <AnnounceProvider>
        <ErrorBannerProvider>
          <UnlockProvider>
            <StorageProvider>
              <App />
            </StorageProvider>
          </UnlockProvider>
        </ErrorBannerProvider>
      </AnnounceProvider>
    </HashRouter>
  </StrictMode>,
);
