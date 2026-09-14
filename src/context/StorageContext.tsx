import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { StorageClient } from "../lib/storage/types.js";
import { InMemoryStorageClient } from "../lib/storage/mockClient.js";
import { runSeedImport } from "../lib/seedImport.js";
import { rawSeed } from "../data/rawSeed.js";

interface StorageContextValue {
  client: StorageClient;
  seeding: boolean;
  seedError: string | null;
}

const StorageContext = createContext<StorageContextValue | null>(null);

// Phase 1 decision: build against the in-memory mock now; swapping in the
// real Supabase client later is a one-file change (this one) — app code only
// ever depends on the StorageClient interface, never on InMemoryStorageClient
// directly.
export function StorageProvider({ children }: { children: ReactNode }) {
  const clientRef = useRef<StorageClient>(new InMemoryStorageClient());
  const [seeding, setSeeding] = useState(true);
  const [seedError, setSeedError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    runSeedImport(clientRef.current, rawSeed)
      .catch((err: unknown) => {
        if (!cancelled) {
          setSeedError(err instanceof Error ? err.message : String(err));
        }
      })
      .finally(() => {
        if (!cancelled) setSeeding(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <StorageContext.Provider value={{ client: clientRef.current, seeding, seedError }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage(): StorageContextValue {
  const ctx = useContext(StorageContext);
  if (!ctx) throw new Error("useStorage must be used within StorageProvider");
  return ctx;
}
