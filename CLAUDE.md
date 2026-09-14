# CLAUDE.md — Guidelines for working on this repository

This file is read by Claude Code (or any coding assistant) working in this repo. Keep it short and follow it; update it if the project's real conventions drift from what's written here.

## What this project is

An internal review app for a small set of people (Stoyan, and Christian who is blind) to browse, verify, and generate outreach emails for conference-speaker prospects. It is **not** a public product. It will be hosted on **GitHub Pages** and the link shared directly with Christian.

## Tech stack (fixed — don't substitute without discussing first)

- **React** (Vite scaffold preferred over CRA)
- **Tailwind CSS** for styling
- **Persistent storage**: needs discussion before implementation — see "Known open question" below. Do not default to `localStorage` alone and call it done; the brief explicitly asks for storage that survives beyond one browser/device, since two people (Stoyan and Christian) both need to see and set "Verified" / "Favourite" state and outreach status.
- Static site output, deployable to GitHub Pages (`gh-pages` branch or `/docs` build output — confirm which with the user)

## Known open question — flag this early, don't silently pick one

GitHub Pages serves **static files only** — there is no server to run a real SQLite server process. "SQLite, or other persistent storage that isn't just browser-local" as literally specified has a few real options, each with tradeoffs the user should choose between, not the assistant alone:

1. **sql.js / absurd-sql** — SQLite compiled to WASM, runs entirely client-side. Can export/import a `.sqlite` file, but two people editing independently won't see each other's changes without manually exchanging the file.
2. **A small free-tier backend** (Supabase, Firebase, or similar) — actual shared persistence between Stoyan and Christian, but adds an external dependency and possibly an API key to manage, and stretches "just GitHub Pages hosting."
3. **IndexedDB** — genuinely more robust and larger-capacity than `localStorage`, but still per-browser/per-device, not shared. Worth naming as the "if we don't need cross-device sharing, this is simplest" option.
4. **Commit-as-storage** — a GitHub Action / small serverless function that writes verified/favourite state back into the JSON data file in the repo via the GitHub API. Fits the "just GitHub Pages" constraint and gives a real shared source of truth, at the cost of needing a GitHub token and a bit more setup.

Raise this explicitly during the Phase-1 discussion (see below) with pros/cons before building anything — don't assume.

## Internationalization

- Every page and every prospect-facing piece of content (bios, generated emails, UI strings) needs **Bulgarian and English** versions.
- **English is the default** locale.
- Recommend `react-i18next` (or similarly standard) for UI strings; prospect *content* fields (bios, etc.) will need actual translation, not just a UI string table — flag this as real work, not a config toggle.

## Accessibility (this is a real requirement, not a checkbox)

Christian, the primary stakeholder this app is being built for, is blind and uses a screen reader daily. Build and test accordingly:

- Full keyboard operability: table sort, global search, the timezone-offset filter, and the detail-page tabs must all be usable without a mouse.
- Correct ARIA: sortable `<th>` elements announce current sort direction (`aria-sort`); the tab panel on the detail page uses the standard `role="tablist"` / `role="tab"` / `aria-selected` / `aria-controls` pattern; the timezone filter is a properly labeled form control, not a bare `<select>` with no `<label>`.
- Semantic table markup (`<caption>` or an accessible name, `scope` on header cells) — screen readers rely on this to make a data table navigable at all.
- Never convey match-rating or verification status by color alone — pair every color-coded badge with text or an icon + text.
- Respect `prefers-reduced-motion`.
- Before calling any UI phase "done," do a pass with a screen reader (VoiceOver on Mac, NVDA on Windows) — reading the spec is not the same as it being usable.

## Data handling

- Treat `/data/blind_leads_list.json` as the seed/import source, not something the app edits in place at runtime — the app's own storage layer (see open question above) holds live state (verified/favourite/outreach-status/generated emails); re-importing the seed file should never silently wipe that.
- Never invent or auto-complete a missing contact detail, photo, or social link. If a field is empty or marked "(verify URL)" in the source data, the UI should show that honestly (e.g., "not yet verified") rather than leaving a blank that looks like an oversight, and definitely never fabricate a plausible-looking one.
- `matchRating: 0` rows are marked "do not contact" in the source notes — the UI should make this unmistakable (not just a low number in a sortable column), since the whole point of keeping them is to prevent an accidental outreach send.

## Process

Follow the phased plan in `initial_project_prompt.md`. The short version: **discuss and produce `design.md` + wireframes first, get explicit sign-off, then write code.** Don't jump ahead to component code during the discussion phase even if the direction seems obvious.

---

## Decisions made in the Phase 1 discussion (2026-09-13)

These are settled. Don't re-litigate them; if one turns out wrong, update this section.

### Storage — RESOLVED (closes the "Known open question" above)
**Supabase free tier.** Chosen because it is the only option that delivers the brief's actual
requirement: Stoyan and Christian both seeing each other's Verified / Favourite / outreach state.
- **Shared flags, no per-user identity.** One `verified` and one `favourite` per prospect; either
  person can toggle. Last-write-wins per field is acceptable at 2 users.
- **Write access gated by a single shared passphrase.** The anon key is visible in a static bundle,
  so the link alone must be read-only. This is friction, not cryptographic security — adequate for
  internal, non-sensitive review state.
- **Build against a local mock first.** The storage layer is written against an in-memory stub with
  an interface identical to the Supabase client, so UI work never blocks on account setup. Stoyan
  creates the real project and supplies URL + anon key later; the account stays in his name.

### Deployment
- **`gh-pages` branch, published by a GitHub Action on push to `main`.** Build output stays out of
  source history. Workspace is not yet a git repo — `git init` is part of provisioning.
- **`HashRouter`, not `BrowserRouter`.** GitHub Pages 404s on deep links otherwise, which would
  break the moment Christian bookmarks or reloads a detail page.

### Email generation
- **Deterministic template fill — no LLM at runtime, no API key.** The brief's template from
  `docs/conference_brief_bg.txt` is the skeleton; the 1-2 personalized opening sentences are
  assembled by rule from that prospect's own `pwdAtRelevance` / `careerBackground` text. Never
  synthesizes a fact that isn't in the row.
- **Delivery is copy-to-clipboard** (subject and body separately, plus both together), with a
  screen-reader-announced confirmation. No `mailto:` — most rows list a speaker bureau, contact form
  or social profile rather than an actual email address.

### Bilingual content
- **UI chrome: full BG + EN via react-i18next, English default.**
- **Prospect content: BG translation only for rows with `matchRating >= 4`** (27 of 50, after the
  Masselin/Simon joint-row split — see design.md's Phase 3 note). Lower-rated
  rows display English with an explicit "not translated" label — they're rows nobody will contact.
  The threshold must be a single config constant, not scattered literals.
- Claude produces the BG translations; Stoyan spot-checks as a native speaker before Christian sees
  the app. The brief itself accepts machine-quality translation ("може да се преведе и машинно").

### Data handling rules discovered in the seed file
- **`tzDiffHours` is inconsistently typed**: numbers, 2 real `null`s, and 7 rows holding the *string*
  `"None"`. One value is fractional (`2.5`). Normalize to `number | null` on import.
- **Rows with an unknown offset are NEVER filtered out** by the ±X-hours-of-Sofia control. They
  always display with an explicit "timezone not yet determined" label. A data gap must not make a
  prospect silently vanish.
- **The 10 rows rated 0-1 stay visible**, carrying a textual "DO NOT CONTACT" badge (text, never
  colour alone), and their **email tab is disabled with a stated reason**. They are kept on purpose
  as a transparency record; hiding them would undercut that, and visible-but-blocked is the strongest
  guard against an accidental send.

### Outreach status model
Full cadence per the brief, each state stamped with the date it was set:
`Not sent → Sent → Reminder sent → Replied → Accepted / Declined / No response`.
The 5-day reminder step is part of the brief's process, so "overdue a reminder" must be derivable.

### Profile images (Phase 3) — deprioritized
Build the per-prospect `id`-keyed folder structure and an accessible fallback (initials avatar,
empty `alt`, no layout break). **Do not spend time sourcing photos**: the primary user is blind, the
licensing on press headshots is unclear, and the deadline is tight. Photos drop in later.

### Accessibility verification — KNOWN GAP
Claude cannot run NVDA or VoiceOver from this Linux environment. Current agreement is **automated
checks only** (axe, keyboard-path review, semantics audit) with Christian's first real use as the
screen-reader pass. Automated tooling catches roughly a third of real screen-reader problems, so
**this is a knowingly accepted risk, not coverage**. Re-raise it if the timeline loosens.

### Timeline — URGENT
**The conference is 29.09.2026; the Phase 1 discussion happened on 2026-09-13 — 16 days out.** The
brief's cadence (send, then remind 5 days later) means outreach emails need to go out within days.
Sequence Phase 5 so the table view and the email tab land first; treat photos and polish as fill-in.

### Process ordering
`CLAUDE.md` wins over `initial_project_prompt.md` where they conflict: **`design.md` + wireframes and
explicit sign-off come before any code**, including scaffolding.
