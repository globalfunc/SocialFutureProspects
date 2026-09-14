import { createClient, type SupabaseClient as SupabaseJsClient } from "@supabase/supabase-js";
import type { BgTranslation, ContactSource, MatchRating, OutreachStatus, ProspectSeedRow, ProspectStateRow } from "../types.js";
import type { ProspectsSeedTable, ProspectStateTable, StorageClient } from "./types.js";

// Real implementation of the StorageClient interface the app has been built
// against (Phase 1 decision: "build against a local mock first ... swapping the
// mock for the real client later is a one-file change"). Method-for-method
// identical to InMemoryStorageClient; the only extra job here is translating
// between the app's camelCase Prospect shape and the tables' snake_case columns.
//
// No auth: the Phase 1 decision is shared read/write gated by the app-level
// passphrase, not by Supabase auth or RLS. Only the anon ("publishable") key is
// ever used here — the service_role key must never reach client code.

const SEED_TABLE = "prospects_seed";
const STATE_TABLE = "prospect_state";

// PostgREST caps a plain select at 1000 rows by default; the seed is 50, but
// paging keeps getAll() honest if the list ever grows past that.
const PAGE_SIZE = 1000;

interface SeedColumns {
  id: string;
  match_rating: number;
  status: string;
  name: string;
  role_organization: string;
  occupation: string;
  pwd_at_relevance: string;
  country: string;
  tz_diff_hours: number | null;
  local_time_in_slot: string;
  verification_status: string;
  contact: string;
  scraped_email: string | null;
  profile_url: string;
  prior_public_speaking: string;
  outreach_status_source_note: string;
  career_background: string;
  reputation_activity: string;
  notes: string;
  photo_path: string | null;
  bg_translation: BgTranslation | null;
  imported_at: string;
}

function toSeedColumns(row: ProspectSeedRow): SeedColumns {
  return {
    id: row.id,
    match_rating: row.matchRating,
    status: row.status,
    name: row.name,
    role_organization: row.roleOrganization,
    occupation: row.occupation,
    pwd_at_relevance: row.pwdAtRelevance,
    country: row.country,
    tz_diff_hours: row.tzDiffHours,
    local_time_in_slot: row.localTimeInSlot,
    verification_status: row.verificationStatus,
    contact: row.contact,
    scraped_email: row.scrapedEmail,
    profile_url: row.profileUrl,
    prior_public_speaking: row.priorPublicSpeaking,
    outreach_status_source_note: row.outreachStatusSourceNote,
    career_background: row.careerBackground,
    reputation_activity: row.reputationActivity,
    notes: row.notes,
    photo_path: row.photoPath,
    bg_translation: row.bgTranslation,
    imported_at: row.imported_at,
  };
}

function fromSeedColumns(row: SeedColumns): ProspectSeedRow {
  return {
    id: row.id,
    matchRating: row.match_rating as MatchRating,
    status: row.status as ProspectSeedRow["status"],
    name: row.name,
    roleOrganization: row.role_organization,
    occupation: row.occupation,
    pwdAtRelevance: row.pwd_at_relevance,
    country: row.country,
    tzDiffHours: row.tz_diff_hours,
    localTimeInSlot: row.local_time_in_slot,
    verificationStatus: row.verification_status,
    contact: row.contact,
    scrapedEmail: row.scraped_email,
    profileUrl: row.profile_url,
    priorPublicSpeaking: row.prior_public_speaking,
    outreachStatusSourceNote: row.outreach_status_source_note,
    careerBackground: row.career_background,
    reputationActivity: row.reputation_activity,
    notes: row.notes,
    photoPath: row.photo_path,
    bgTranslation: row.bg_translation,
    imported_at: row.imported_at,
  };
}

// prospect_state is already snake_case in the app's own type, so these two are
// near-identity — they exist to pin the jsonb/enum columns back to their
// TypeScript types rather than leaving them as `any` off the wire.
interface StateColumns {
  id: string;
  verified: boolean;
  favourite: boolean;
  outreach_status: string;
  outreach_status_set_at: string | null;
  email: string | null;
  contact_sources: ContactSource[] | null;
  updated_at: string;
}

function fromStateColumns(row: StateColumns): ProspectStateRow {
  return {
    id: row.id,
    verified: row.verified,
    favourite: row.favourite,
    outreach_status: row.outreach_status as OutreachStatus,
    outreach_status_set_at: row.outreach_status_set_at,
    email: row.email,
    contact_sources: row.contact_sources ?? [],
    updated_at: row.updated_at,
  };
}

function fail(operation: string, error: { message: string }): never {
  throw new Error(`Supabase ${operation} failed: ${error.message}`);
}

export class SupabaseStorageClient implements StorageClient {
  readonly prospectsSeed: ProspectsSeedTable;
  readonly prospectState: ProspectStateTable;

  constructor(url: string, anonKey: string) {
    const db: SupabaseJsClient = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    async function selectAll<T>(table: string): Promise<T[]> {
      const all: T[] = [];
      for (let from = 0; ; from += PAGE_SIZE) {
        const { data, error } = await db
          .from(table)
          .select("*")
          .order("id", { ascending: true })
          .range(from, from + PAGE_SIZE - 1);
        if (error) fail(`select from ${table}`, error);
        const page = (data ?? []) as T[];
        all.push(...page);
        if (page.length < PAGE_SIZE) return all;
      }
    }

    async function selectById<T>(table: string, id: string): Promise<T | null> {
      const { data, error } = await db.from(table).select("*").eq("id", id).maybeSingle();
      if (error) fail(`select ${table} by id`, error);
      return (data as T | null) ?? null;
    }

    this.prospectsSeed = {
      async upsert(rows) {
        // "Overwritten wholesale on each seed run" (design.md §4): after this
        // call the table's contents are exactly `rows`. Done as upsert-then-
        // prune rather than delete-all-then-insert so the table is never
        // momentarily empty and a failed insert can't lose the seed copy.
        const payload = rows.map(toSeedColumns);
        if (payload.length > 0) {
          const { error } = await db.from(SEED_TABLE).upsert(payload, { onConflict: "id" });
          if (error) fail(`upsert into ${SEED_TABLE}`, error);
        }
        // Prune rows no longer present in the seed file. Only ever touches
        // prospects_seed — prospect_state rows are deliberately left orphaned
        // rather than cascade-deleted (see supabase/schema.sql). The stale ids
        // are computed client-side and deleted by an explicit `in` list, which
        // avoids hand-building a negated PostgREST filter string out of values.
        const keptIds = new Set(payload.map((r) => r.id));
        const existing = await selectAll<{ id: string }>(SEED_TABLE);
        const staleIds = existing.map((r) => r.id).filter((id) => !keptIds.has(id));
        if (staleIds.length > 0) {
          const { error } = await db.from(SEED_TABLE).delete().in("id", staleIds);
          if (error) fail(`prune ${SEED_TABLE}`, error);
        }
      },
      async getAll() {
        return (await selectAll<SeedColumns>(SEED_TABLE)).map(fromSeedColumns);
      },
      async getById(id) {
        const row = await selectById<SeedColumns>(SEED_TABLE, id);
        return row ? fromSeedColumns(row) : null;
      },
    };

    this.prospectState = {
      async insertIfMissing(rows) {
        if (rows.length === 0) return;
        // ignoreDuplicates turns this into a pure INSERT ... ON CONFLICT DO
        // NOTHING: an id that already has a row is left exactly as it is. This
        // is the seed-import guarantee that live review state survives
        // re-import, enforced by the database rather than by a read-then-write
        // race in the importer.
        const { error } = await db
          .from(STATE_TABLE)
          .upsert(rows, { onConflict: "id", ignoreDuplicates: true });
        if (error) fail(`insert into ${STATE_TABLE}`, error);
      },
      async getAll() {
        return (await selectAll<StateColumns>(STATE_TABLE)).map(fromStateColumns);
      },
      async getById(id) {
        const row = await selectById<StateColumns>(STATE_TABLE, id);
        return row ? fromStateColumns(row) : null;
      },
      async update(id, patch) {
        // Mirrors the mock: updating an id that has no row is an error, not a
        // silent no-op, so a failed write surfaces in the UI's revert path
        // instead of looking like it saved.
        const { data, error } = await db
          .from(STATE_TABLE)
          .update(patch)
          .eq("id", id)
          .select("id");
        if (error) fail(`update ${STATE_TABLE}`, error);
        if (!data || data.length === 0) {
          throw new Error(`Cannot update prospect_state for unknown id "${id}"`);
        }
      },
    };
  }
}
