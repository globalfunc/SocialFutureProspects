import { createContext, useContext, useState, type ReactNode } from "react";

interface ErrorBannerContextValue {
  message: string | null;
  showError: (message: string) => void;
  dismiss: () => void;
}

const ErrorBannerContext = createContext<ErrorBannerContextValue | null>(null);

// A same-page, dismissible role="alert" banner — design.md §3: a transient
// live-region announcement alone is easy to miss once focus has moved on.
export function ErrorBannerProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <ErrorBannerContext.Provider
      value={{
        message,
        showError: setMessage,
        dismiss: () => setMessage(null),
      }}
    >
      {children}
    </ErrorBannerContext.Provider>
  );
}

export function useErrorBanner(): ErrorBannerContextValue {
  const ctx = useContext(ErrorBannerContext);
  if (!ctx) throw new Error("useErrorBanner must be used within ErrorBannerProvider");
  return ctx;
}
