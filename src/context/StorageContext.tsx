import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { StorageClient } from "../lib/storage/types.js";
import { InMemoryStorageClient } from "../lib/storage/mockClient.js";
import { SupabaseStorageClient } from "../lib/storage/supabaseClient.js";
import { runSeedImport } from "../lib/seedImport.js";
import { rawSeed } from "../data/rawSeed.js";

interface StorageContextValue {
  client: StorageClient;
  seeding: boolean;
  seedError: string | null;
}

const StorageContext = createContext<StorageContextValue | null>(null);

// Phase 1 decision: build against the in-memory mock, then swap in the real
// Supabase client as a one-file change (this one) — app code only ever depends
// on the StorageClient interface, never on a concrete implementation.
//
// Real Supabase when both credentials are present, in-memory mock otherwise, so
// `npm run dev` and the test suite keep working with no credentials at all.
// Only the anon ("publishable") key is read here; it ships in the static bundle
// by design and writes are gated by the app-level passphrase instead.
function createStorageClient(): StorageClient {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (url && anonKey) {
    return new SupabaseStorageClient(url, anonKey);
  }
  return new InMemoryStorageClient();
}

export function StorageProvider({ children }: { children: ReactNode }) {
  // Lazy useState initializer, not a bare `new` in the render body: createClient
  // opens a real connection, so it must run exactly once per provider.
  const [client] = useState(createStorageClient);
  const [seeding, setSeeding] = useState(true);
  const [seedError, setSeedError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    runSeedImport(client, rawSeed)
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
  }, [client]);

  return (
    <StorageContext.Provider value={{ client, seeding, seedError }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage(): StorageContextValue {
  const ctx = useContext(StorageContext);
  if (!ctx) throw new Error("useStorage must be used within StorageProvider");
  return ctx;
}
