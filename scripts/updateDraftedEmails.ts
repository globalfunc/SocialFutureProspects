// One-off script: persists hand-drafted invitation emails from
// public/prospects/<id>/invitation_email.md into prospect_state
// (drafted_email_subject / drafted_email_body / drafted_email_updated_at).
//
//   npx tsx scripts/updateDraftedEmails.ts   # reads VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY from .env.local
//
// Requires supabase/migrations/0001_drafted_email_columns.sql to have been run
// against the live project first. Only touches prospect ids whose folder has an
// invitation_email.md with a "## Email" section — every other prospect_state
// row is left exactly as it is.
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { SupabaseStorageClient } from "../src/lib/storage/supabaseClient.js";

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

interface DraftedEmail {
  subject: string;
  body: string;
}

// Extracts the "## Email" section's fenced code block: first line
// "Subject: ...", a blank line, then the body through the sign-off. Returns
// null when the file has no "## Email" heading (e.g. a LinkedIn-only round
// like francis-carl-reyes) or the block doesn't match the expected shape.
function parseDraftedEmail(markdown: string): DraftedEmail | null {
  const headingMatch = /^## Email\s*$/m.exec(markdown);
  if (!headingMatch) return null;

  const afterHeading = markdown.slice(headingMatch.index + headingMatch[0].length);
  const nextHeadingMatch = /^## /m.exec(afterHeading);
  const section = nextHeadingMatch ? afterHeading.slice(0, nextHeadingMatch.index) : afterHeading;

  const fenceMatch = /```[^\n]*\n([\s\S]*?)```/.exec(section);
  if (!fenceMatch) return null;

  const block = (fenceMatch[1] ?? "").replace(/\n$/, "");
  const lines = block.split("\n");
  const subjectMatch = /^Subject:\s*(.+)$/.exec(lines[0] ?? "");
  if (!subjectMatch) return null;

  // lines[1] is the blank line separating the subject from the body.
  const body = lines.slice(2).join("\n").trim();
  if (!body) return null;

  return { subject: (subjectMatch[1] ?? "").trim(), body };
}

const repoRoot = process.cwd();
const fileEnv = readEnvFile(resolve(repoRoot, ".env.local"));
const url = process.env.VITE_SUPABASE_URL ?? fileEnv.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY ?? fileEnv.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error("VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set (.env.local or env).");
  process.exit(1);
}

const prospectsDir = resolve(repoRoot, "public/prospects");
const ids = readdirSync(prospectsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const client = new SupabaseStorageClient(url, anonKey);
const updated: string[] = [];
const skippedNoEmail: string[] = [];
const skippedNoStateRow: string[] = [];

for (const id of ids) {
  const mdPath = resolve(prospectsDir, id, "invitation_email.md");
  let markdown: string;
  try {
    markdown = readFileSync(mdPath, "utf8");
  } catch {
    continue; // no invitation_email.md for this prospect
  }

  const email = parseDraftedEmail(markdown);
  if (!email) {
    skippedNoEmail.push(id);
    continue;
  }

  const existing = await client.prospectState.getById(id);
  if (!existing) {
    skippedNoStateRow.push(id);
    continue;
  }

  await client.prospectState.update(id, {
    drafted_email_subject: email.subject,
    drafted_email_body: email.body,
    drafted_email_updated_at: new Date().toISOString(),
  });
  updated.push(id);
}

console.log(`Updated ${updated.length} prospect_state row(s):`);
for (const id of updated) console.log(`  - ${id}`);

if (skippedNoEmail.length > 0) {
  console.log(`\nSkipped (no "## Email" section found): ${skippedNoEmail.join(", ")}`);
}
if (skippedNoStateRow.length > 0) {
  console.log(`\nSkipped (no existing prospect_state row — run the seed importer first): ${skippedNoStateRow.join(", ")}`);
}
