import type { ProspectSeedRow, ProspectStateRow } from "../types.js";

// Storage-layer interface, shaped so a real Supabase client can implement it with
// the same call surface the app code uses against the in-memory mock (Phase 1
// discussion: "build against a local mock first"). Deliberately table-scoped and
// async throughout, mirroring how supabase-js is actually called, so swapping the
// mock for the real client later is a one-file change, not a rewrite of call sites.

export interface ProspectsSeedTable {
  // Wholesale replace (design.md §4: "overwritten wholesale on each seed run") —
  // the given rows become the table's entire contents. A row dropped from a
  // re-exported seed file is actually removed from prospects_seed; only
  // prospect_state can be left orphaned (see ProspectStateTable below).
  upsert(rows: ProspectSeedRow[]): Promise<void>;
  getAll(): Promise<ProspectSeedRow[]>;
  getById(id: string): Promise<ProspectSeedRow | null>;
}

export interface ProspectStateTable {
  // Inserts a default row for each given id that does not already exist.
  // Never updates or deletes an existing row — this is what makes seed re-import
  // safe against clobbering live review state (design.md §4 seed-import rule).
  insertIfMissing(rows: ProspectStateRow[]): Promise<void>;
  getAll(): Promise<ProspectStateRow[]>;
  getById(id: string): Promise<ProspectStateRow | null>;
  // App-layer mutation (Phase 5 UI calls this) — not used by the importer.
  update(id: string, patch: Partial<Omit<ProspectStateRow, "id">>): Promise<void>;
}

export interface StorageClient {
  prospectsSeed: ProspectsSeedTable;
  prospectState: ProspectStateTable;
}
