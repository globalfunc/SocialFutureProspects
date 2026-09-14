import { normalizeAllProspects, type RawProspectRow } from "./normalizeProspect.js";
import { DEFAULT_PROSPECT_STATE, type ProspectSeedRow, type ProspectStateRow } from "./types.js";
import type { StorageClient } from "./storage/types.js";

// Implements the seed-import rule from design.md §4 / CLAUDE.md:
//
//   - prospects_seed: upsert ALL normalized rows, keyed by id (wholesale overwrite
//     of the seed copy is fine — it's re-importable by design).
//   - prospect_state: insert-if-missing ONLY. Never UPDATE or DELETE an existing
//     row. This is what makes re-import safe to run after Christian/Stoyan have
//     already marked rows verified/favourite/outreach-status — those edits are
//     mathematically outside the importer's write set for that table.
//
// Orphaned prospect_state rows (design.md §"Risks" #3 — a row later removed from
// a re-exported seed file): decision is to leave them. They're harmless dead data,
// and an automatic prune on import is exactly the kind of silent-deletion behavior
// CLAUDE.md warns against for live review state. No prune step here; revisit only
// if an actual re-export drops a row.
export async function runSeedImport(
  client: StorageClient,
  rawRows: RawProspectRow[],
  now: () => Date = () => new Date(),
): Promise<{ seededCount: number; newStateRowCount: number }> {
  const prospects = normalizeAllProspects(rawRows);
  const importedAt = now().toISOString();

  const seedRows: ProspectSeedRow[] = prospects.map((p) => ({ ...p, imported_at: importedAt }));
  await client.prospectsSeed.upsert(seedRows);

  const existingStateRows = await client.prospectState.getAll();
  const existingIds = new Set(existingStateRows.map((r) => r.id));

  const candidateStateRows: ProspectStateRow[] = prospects.map((p) => ({
    id: p.id,
    ...DEFAULT_PROSPECT_STATE,
    updated_at: importedAt,
  }));
  await client.prospectState.insertIfMissing(candidateStateRows);

  const newStateRowCount = candidateStateRows.filter((r) => !existingIds.has(r.id)).length;

  return { seededCount: seedRows.length, newStateRowCount };
}
