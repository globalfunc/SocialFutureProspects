import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

// The single aria-live status region from design.md §3. All sort/filter/copy/
// toggle announcements funnel through here so only the latest one fires.
type AnnounceFn = (text: string) => void;

const AnnounceContext = createContext<AnnounceFn | null>(null);

export function AnnounceProvider({ children }: { children: ReactNode }) {
  const [text, setText] = useState("");
  // Screen readers sometimes don't re-announce identical consecutive text.
  // Appending/removing a zero-width space forces each announcement to be a
  // distinct DOM mutation even when the message repeats verbatim.
  const toggleRef = useRef(false);

  const announce = useCallback<AnnounceFn>((message) => {
    toggleRef.current = !toggleRef.current;
    setText(message + (toggleRef.current ? "" : "​"));
  }, []);

  return (
    <AnnounceContext.Provider value={announce}>
      {children}
      <div className="sr-only" role="status" aria-live="polite">
        {text}
      </div>
    </AnnounceContext.Provider>
  );
}

export function useAnnounce(): AnnounceFn {
  const ctx = useContext(AnnounceContext);
  if (!ctx) throw new Error("useAnnounce must be used within AnnounceProvider");
  return ctx;
}
