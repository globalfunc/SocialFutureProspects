import { useErrorBanner } from "../context/ErrorBannerContext.js";

// role="alert" interrupts rather than waiting politely — design.md §3: a
// transient live-region announcement is easy to miss once focus has moved on.
export function ErrorBanner() {
  const { message, dismiss } = useErrorBanner();
  if (!message) return null;

  return (
    <div
      role="alert"
      className="mx-auto mt-4 flex max-w-[1180px] items-start justify-between gap-4 border border-danger/45 bg-danger/10 px-4 py-3 text-sm text-danger"
    >
      <p>{message}</p>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 font-semibold underline hover:no-underline"
      >
        ×
      </button>
    </div>
  );
}
