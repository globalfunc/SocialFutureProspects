-- Adds the drafted-invitation-email columns to prospect_state. Null on every
-- row until a draft has been captured for that prospect; these are the
-- persisted result of hand-drafting an email (public/prospects/<id>/
-- invitation_email.md's "## Email" section), not something the app generates
-- or edits at runtime (src/email/generateEmail.ts's template fill is separate
-- and unrelated to these columns).
--
-- Idempotent: safe to re-run.
alter table public.prospect_state
  add column if not exists drafted_email_subject text;
alter table public.prospect_state
  add column if not exists drafted_email_body text;
alter table public.prospect_state
  add column if not exists drafted_email_updated_at timestamptz;
