import { createContext, useContext, useState, type ReactNode } from "react";
import { UNLOCK_SESSION_KEY, WRITE_PASSPHRASE } from "../config.js";
import { useAnnounce } from "./AnnounceContext.js";
import { useTranslation } from "react-i18next";

interface UnlockContextValue {
  unlocked: boolean;
  tryUnlock: (passphrase: string) => boolean;
  lock: () => void;
}

const UnlockContext = createContext<UnlockContextValue | null>(null);

function readInitialUnlocked(): boolean {
  try {
    return sessionStorage.getItem(UNLOCK_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function UnlockProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(readInitialUnlocked);
  const announce = useAnnounce();
  const { t } = useTranslation();

  const tryUnlock = (passphrase: string): boolean => {
    if (passphrase === WRITE_PASSPHRASE) {
      setUnlocked(true);
      try {
        sessionStorage.setItem(UNLOCK_SESSION_KEY, "1");
      } catch {
        // Session persistence is a convenience; unlocking this tab still works.
      }
      return true;
    }
    announce(t("chrome.incorrectPassphrase"));
    return false;
  };

  const lock = () => {
    setUnlocked(false);
    try {
      sessionStorage.removeItem(UNLOCK_SESSION_KEY);
    } catch {
      // Nothing to clean up if storage was already unavailable.
    }
  };

  return (
    <UnlockContext.Provider value={{ unlocked, tryUnlock, lock }}>
      {children}
    </UnlockContext.Provider>
  );
}

export function useUnlock(): UnlockContextValue {
  const ctx = useContext(UnlockContext);
  if (!ctx) throw new Error("useUnlock must be used within UnlockProvider");
  return ctx;
}
