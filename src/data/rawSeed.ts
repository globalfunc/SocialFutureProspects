import type { RawProspectRow } from "../lib/normalizeProspect.js";
// The seed JSON lives at the repo root (CLAUDE.md: it's an import source, not
// something the app edits), not under src/ — Vite resolves and inlines this
// at build time same as any other static import.
import rawSeedJson from "../../data/blind_leads_list.json";

export const rawSeed = rawSeedJson as unknown as RawProspectRow[];
