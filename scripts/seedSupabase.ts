// One-off seed importer for the real Supabase project.
//
//   npm run seed          # reads VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY from .env.local
//
// Runs exactly the same runSeedImport() the app runs on load, against
// SupabaseStorageClient instead of the mock. Safe to re-run: prospects_seed is
// replaced wholesale, prospect_state is insert-if-missing only, so live
// Verified / Favourite / outreach state is never touched.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { SupabaseStorageClient } from "../src/lib/storage/supabaseClient.js";
import { runSeedImport } from "../src/lib/seedImport.js";
import type { RawProspectRow } from "../src/lib/normalizeProspect.js";

function readEnvFile(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return out;
  }
  for (const line of text.split("\n")) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/.exec(line);
    const [, key, value] = match ?? [];
    if (key !== undefined && value !== undefined) {
      out[key] = value.replace(/^["']|["']$/g, "");
    }
  }
  return out;
}

// Paths resolve from the repo root (npm run sets cwd there), not from
// import.meta.url — this file is bundled into node_modules/.cache before it runs.
const repoRoot = process.cwd();
const fileEnv = readEnvFile(resolve(repoRoot, ".env.local"));
const url = process.env.VITE_SUPABASE_URL ?? fileEnv.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY ?? fileEnv.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error("VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set (.env.local or env).");
  process.exit(1);
}

const rawSeed = JSON.parse(
  readFileSync(resolve(repoRoot, "data/blind_leads_list.json"), "utf8"),
) as RawProspectRow[];

const client = new SupabaseStorageClient(url, anonKey);
const result = await runSeedImport(client, rawSeed);

const seedRows = await client.prospectsSeed.getAll();
const stateRows = await client.prospectState.getAll();
console.log(
  `Imported ${result.seededCount} prospects; ${result.newStateRowCount} new prospect_state rows.\n` +
    `prospects_seed now holds ${seedRows.length} rows, prospect_state ${stateRows.length}.`,
);
