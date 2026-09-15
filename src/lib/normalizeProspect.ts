import type { MatchRating, Prospect } from "./types.js";

// Shape of a row exactly as it appears in /data/blind_leads_list.json.
// tzDiffHours is the field CLAUDE.md/design.md flag as inconsistently typed:
// real numbers (including fractional, e.g. 2.5), JSON null, or the literal string "None".
export interface RawProspectRow {
  id: string;
  matchRating: number;
  status: string;
  name: string;
  roleOrganization: string;
  occupation: string;
  pwdAtRelevance: string;
  country: string;
  tzDiffHours: number | null | string;
  localTimeInSlot: string;
  verificationStatus: string;
  contact: string;
  profileUrl: string;
  priorPublicSpeaking: string;
  outreachStatus: string;
  careerBackground: string;
  reputationActivity: string;
  notes: string;
  // Optional: absent on every pre-existing row. Hand-authored per row (unlike
  // the other Prospect fields derived below), used to group/filter prospects
  // by where they came from (e.g. an import batch).
  tags?: string[];
}

export class InvalidSeedRowError extends Error {
  constructor(id: string, reason: string) {
    super(`Invalid seed row "${id}": ${reason}`);
    this.name = "InvalidSeedRowError";
  }
}

// Normalizes `tzDiffHours` per the rule in design.md §4: numbers (including
// fractional values like 2.5) pass through unchanged; JSON `null` and the literal
// string "None" both become `null`. Any other string is a data error worth
// surfacing loudly rather than silently coercing to null (which would hide a
// prospect from the "timezone not yet determined" reasoning by accident).
function normalizeTzDiffHours(raw: number | null | string, id: string): number | null {
  if (raw === null) return null;
  if (typeof raw === "number") return raw;
  if (raw === "None") return null;
  throw new InvalidSeedRowError(id, `unrecognized tzDiffHours value ${JSON.stringify(raw)}`);
}

function assertMatchRating(raw: number, id: string): MatchRating {
  if (!Number.isInteger(raw) || raw < 0 || raw > 5) {
    throw new InvalidSeedRowError(id, `matchRating ${raw} is not an integer 0-5`);
  }
  return raw as MatchRating;
}

function assertStatus(raw: string, id: string): "existing" | "new" {
  if (raw !== "existing" && raw !== "new") {
    throw new InvalidSeedRowError(id, `status "${raw}" is not "existing" or "new"`);
  }
  return raw;
}

const EMAIL_PATTERN = /[\w.+-]+@[\w-]+\.[\w.-]+/;

// Best-effort pull of an email address out of the free-text `contact` field, e.g.
// "srikanth@bollant.com (published by him on Instagram)". Never guesses or completes
// a partial address (CLAUDE.md's "never invent a missing contact detail") — only
// returns text that already looks like a full address, verbatim.
function extractScrapedEmail(contact: string): string | null {
  return EMAIL_PATTERN.exec(contact)?.[0] ?? null;
}

const UNKNOWN_COUNTRY_VALUES = new Set(["n/a", "unclear", ""]);

// Derives a clean country name for filtering out of the free-text `country`
// field (29 distinct raw strings across the current seed, e.g. "USA (Cupertino,
// CA)", "UK (London)", "N/A", "Ireland/UK (org HQ London)"). Strips a trailing
// "(city/detail)" qualifier; "N/A"/"Unclear" become null (unknown, never
// filtered out — same rule as tzDiffHours). A compound like "Ireland/UK" is
// genuine ambiguity in the source data, not something to resolve by guessing
// one of the two countries, so it also becomes null rather than picking one.
function normalizeCountry(raw: string): string | null {
  const withoutDetail = raw.replace(/\s*\([^)]*\)\s*$/, "").trim();
  if (UNKNOWN_COUNTRY_VALUES.has(withoutDetail.toLowerCase())) return null;
  if (withoutDetail.includes("/")) return null;
  return withoutDetail;
}

// Converts one raw seed-JSON row into the normalized Prospect shape (design.md §4).
// Pure function, no I/O — the caller (seedImport) is responsible for persistence.
export function normalizeProspect(raw: RawProspectRow): Prospect {
  return {
    id: raw.id,
    matchRating: assertMatchRating(raw.matchRating, raw.id),
    status: assertStatus(raw.status, raw.id),
    name: raw.name,
    roleOrganization: raw.roleOrganization,
    occupation: raw.occupation,
    pwdAtRelevance: raw.pwdAtRelevance,
    country: raw.country,
    tzDiffHours: normalizeTzDiffHours(raw.tzDiffHours, raw.id),
    localTimeInSlot: raw.localTimeInSlot,
    verificationStatus: raw.verificationStatus,
    contact: raw.contact,
    scrapedEmail: extractScrapedEmail(raw.contact),
    profileUrl: raw.profileUrl,
    priorPublicSpeaking: raw.priorPublicSpeaking,
    outreachStatusSourceNote: raw.outreachStatus,
    careerBackground: raw.careerBackground,
    reputationActivity: raw.reputationActivity,
    notes: raw.notes,
    // Phase 3 (folded into Phase 4): every row gets photoPath: null explicitly at
    // import time. Never populated by the importer — see design.md's Phase 3 note.
    photoPath: null,
    // Phase 5 content work — no translations exist yet at import time, regardless
    // of matchRating.
    bgTranslation: null,
    countryNormalized: normalizeCountry(raw.country),
    tags: raw.tags ?? [],
  };
}

export function normalizeAllProspects(rawRows: RawProspectRow[]): Prospect[] {
  const ids = new Set<string>();
  for (const row of rawRows) {
    if (ids.has(row.id)) {
      throw new InvalidSeedRowError(row.id, "duplicate id in seed file");
    }
    ids.add(row.id);
  }
  return rawRows.map(normalizeProspect);
}
