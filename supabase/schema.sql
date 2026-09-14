-- SocialFutureProspects — Supabase schema (Phase 4 storage swap).
-- Run once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
--
-- No RLS, by the Phase 1 decision in CLAUDE.md: two-person internal tool, shared
-- read/write, gated only by the app-level VITE_WRITE_PASSPHRASE. The anon
-- ("publishable") key ships in the static bundle; the secret/service_role key
-- must never appear in client code. "Automatically expose new tables" is already
-- on for this project, so both tables are reachable through PostgREST as soon as
-- they exist.
--
-- Idempotent: safe to re-run. It creates nothing that drops or truncates data.

-- ---------------------------------------------------------------------------
-- prospects_seed — the re-importable copy of the seed JSON. Overwritten
-- wholesale on each seed run (design.md §4). Holds no live review state.
-- ---------------------------------------------------------------------------
create table if not exists public.prospects_seed (
  id                           text primary key,
  match_rating                 smallint not null,
  status                       text not null,
  name                         text not null,
  role_organization            text not null default '',
  occupation                   text not null default '',
  pwd_at_relevance             text not null default '',
  country                      text not null default '',
  -- double precision, not integer: one row's offset is fractional (2.5), and
  -- rows with an undetermined offset are null (never filtered out by the UI —
  -- CLAUDE.md data-handling rule).
  tz_diff_hours                double precision,
  local_time_in_slot           text not null default '',
  verification_status          text not null default '',
  contact                      text not null default '',
  -- The seed's own read-only finding, extracted from `contact` at import time.
  -- The live, user-editable address lives in prospect_state.email.
  scraped_email                text,
  profile_url                  text not null default '',
  prior_public_speaking        text not null default '',
  outreach_status_source_note  text not null default '',
  career_background            text not null default '',
  reputation_activity          text not null default '',
  notes                        text not null default '',
  photo_path                   text,
  -- BgTranslation object ({pwdAtRelevance, careerBackground, reputationActivity,
  -- notes}) or null for rows below BG_TRANSLATION_MIN_MATCH_RATING.
  bg_translation               jsonb,
  imported_at                  timestamptz not null
);

-- ---------------------------------------------------------------------------
-- prospect_state — the live, shared, mutable review state. The seed importer
-- only ever INSERTs missing rows here; it never UPDATEs or DELETEs (design.md
-- §4 seed-import rule), which is what keeps re-import from clobbering
-- Verified / Favourite / outreach status.
--
-- Deliberately NO foreign key to prospects_seed(id), even though design.md
-- sketched one: prospects_seed is replaced wholesale on each import, and an FK
-- would either block that replace or (with ON DELETE CASCADE) silently delete
-- live review state — exactly the silent-deletion behaviour CLAUDE.md forbids.
-- The settled decision is that an orphaned prospect_state row is harmless dead
-- data, so the constraint is omitted on purpose.
-- ---------------------------------------------------------------------------
create table if not exists public.prospect_state (
  id                      text primary key,
  verified                boolean not null default false,
  favourite               boolean not null default false,
  outreach_status         text not null default 'Not sent'
    check (outreach_status in (
      'Not sent', 'Sent', 'Reminder sent', 'Replied',
      'Accepted', 'Declined', 'No response'
    )),
  outreach_status_set_at  timestamptz,
  -- User-editable override for "the email to use". Null means "fall back to
  -- prospects_seed.scraped_email, if any".
  email                   text,
  -- ContactSource[]: [{ id, type, url }], type one of personal-website |
  -- company-website | linkedin | instagram | facebook | other.
  contact_sources         jsonb not null default '[]'::jsonb,
  updated_at              timestamptz not null default now()
);

-- The table view is sorted by match rating in the UI's default ordering.
create index if not exists prospects_seed_match_rating_idx
  on public.prospects_seed (match_rating desc);
