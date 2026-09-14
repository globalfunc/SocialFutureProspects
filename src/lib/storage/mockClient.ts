import type { ProspectSeedRow, ProspectStateRow } from "../types.js";
import type { ProspectsSeedTable, ProspectStateTable, StorageClient } from "./types.js";

// In-memory stub with the same interface the real Supabase client will expose
// (Phase 1 discussion). Lets UI/import work proceed before the Supabase project
// exists. Not persisted across process restarts — that's the point, it's a stand-in.
export class InMemoryStorageClient implements StorageClient {
  readonly prospectsSeed: ProspectsSeedTable;
  readonly prospectState: ProspectStateTable;

  constructor() {
    const seedRows = new Map<string, ProspectSeedRow>();
    const stateRows = new Map<string, ProspectStateRow>();

    this.prospectsSeed = {
      async upsert(rows) {
        // prospects_seed is "overwritten wholesale on each seed run" (design.md
        // §4) — a full re-import replaces the whole table's contents, not just
        // the ids present in this call, so a row dropped from a re-exported seed
        // file actually disappears from prospects_seed (only prospect_state can
        // be left orphaned, per the seed-import rule).
        seedRows.clear();
        for (const row of rows) {
          seedRows.set(row.id, row);
        }
      },
      async getAll() {
        return [...seedRows.values()];
      },
      async getById(id) {
        return seedRows.get(id) ?? null;
      },
    };

    this.prospectState = {
      async insertIfMissing(rows) {
        for (const row of rows) {
          if (!stateRows.has(row.id)) {
            stateRows.set(row.id, row);
          }
        }
      },
      async getAll() {
        return [...stateRows.values()];
      },
      async getById(id) {
        return stateRows.get(id) ?? null;
      },
      async update(id, patch) {
        const existing = stateRows.get(id);
        if (!existing) {
          throw new Error(`Cannot update prospect_state for unknown id "${id}"`);
        }
        stateRows.set(id, { ...existing, ...patch });
      },
    };
  }
}
