# design.md — Phase 2 design spec & wireframes

Status: **draft, awaiting sign-off**. Nothing in Phase 3/5 (photos, real components, i18n
content, email logic) starts until this is approved. Supersedes nothing in CLAUDE.md — the
Phase 1 decisions there are treated as closed and are only referenced, not re-argued.

Data referenced below is the actual seed file: 50 rows, matchRating distribution
{5:17, 4:10, 3:10, 2:3, 1:7, 0:3} → 27 rows ≥4 (BG-translated), 10 rows ≤1 (DO NOT CONTACT),
9 rows with unresolved timezone (7 literal string `"None"` + 2 JSON `null`, one fractional
value `2.5`). (Was 49 rows/26 ≥4 as of the Phase 1 discussion; the joint "Matthieu Masselin &
Nicolas Simon" row was split into two separate prospect rows before Phase 4 — see the Phase 3
note below.)

---

## 1. Table / list view

### Columns and default sort

| Column | Sortable | Notes |
|---|---|---|
| Verified / Favourite | no (see below) | icon-button pair, not a data column |
| Name | yes | primary link to detail page |
| Match rating | yes | 0–5, rendered as text+icon, not colour alone |
| Country | yes | |
| Timezone offset | yes | unresolved rows sort last, grouped, never interleaved arbitrarily |
| Occupation | yes | |
| Outreach status | no (filter, not sort — see below) | |

**Default sort: match rating descending, then name ascending.** Rationale: the two of you are
triaging ~50 rows against a 16-day deadline; surfacing the strongest candidates first is more
useful than alphabetical, and it's the same ordering the brief itself already implies from the
data ("26 at ≥4 is the target set").

Outreach status is deliberately **not sortable** — five ad-hoc states plus dates don't have a
single meaningful order, and it's more useful as a filter chip than a sort key. Open to
revisiting if you disagree.

### Sortable header behavior

Each sortable `<th>` is a button-like control with `aria-sort` = `"ascending"` / `"descending"`
/ `"none"` reflecting current state, and a visible glyph (▲/▼) alongside the label — never
relying on `aria-sort` alone since not every AT surfaces it identically. Clicking (or
Enter/Space on the focused header) cycles: none → ascending → descending → ascending... Only
one column carries a non-`"none"` `aria-sort` at a time.

### Global search

A single labeled search box above the table, filtering across name, roleOrganization,
occupation, country, pwdAtRelevance, and careerBackground (i.e. the fields someone would
actually remember a prospect by — not internal fields like `id` or `notes`). Debounced client-
side filtering (no backend round-trip — it's 50 rows). Search and the timezone filter and the
DO-NOT-CONTACT visibility toggle (below) all compose with AND logic.

### Timezone filter (±X hours of Sofia)

A labeled numeric control (`<label for="tz-offset">±X hours of Sofia</label>` next to a
number input or a small stepper, range 0–12, default off/unfiltered) rather than a bare
`<select>`. When set to X, shows rows where `|tzDiffHours| <= X`.

**The 9 rows with unresolved offset are never removed by this filter, regardless of X.** They
render in their own always-visible group, each tagged with a text badge "timezone not yet
determined" (not blank, not "0", not omitted). Two ways to lay this out — I'd default to (a)
unless you object:

(a) One filtered table, unresolved rows pinned as a visually distinct trailing group under a
`<caption>`-adjacent subheading "Timezone not yet determined (always shown)" — keeps one table,
one set of headers, one sort state.

(b) Two separate tables/regions: "Timezone known" (filterable) and "Timezone unknown" (static).
Cleaner semantics for the filter, but doubles the ARIA table plumbing and Christian would need
to navigate between two table structures.

I'm proposing (a) in the wireframe below.

### DO NOT CONTACT rows (matchRating 0–1)

These 10 rows are never hidden. Each carries a text badge — literal string **"DO NOT CONTACT"**
(not just "Rating: 0", not colour-coded background alone) rendered inline in the Match rating
cell, and the row's outreach-status cell is replaced with the same badge rather than showing a
normal status control. A row-level visual treatment (e.g. dashed border) may reinforce it, but
the text badge is what actually carries the meaning.

### Verified / Favourite / outreach status placement

Each data row ends with an actions cell containing three controls, in this order:

1. **Verified** — a toggle button, `aria-pressed`, label "Mark verified" / "Verified ✓" (icon +
   text, never a checkbox styled as a colour swatch).
2. **Favourite** — same pattern, "Add to favourites" / "Favourited ★".
3. **Outreach status** — a small `<select>` (or button-triggered menu) showing the current
   state (`Not sent` default) with the five-state cadence from CLAUDE.md; changing it stamps
   today's date, shown as a tooltip/adjacent text ("set 2026-09-14"), not just stored invisibly.

For matchRating 0–1 rows, control 3 is replaced by the static DO NOT CONTACT badge; 1 and 2
remain active (verifying "yes, we checked, and no, don't contact" is still useful signal).

### Empty state vs. "no results"

- **Empty state** (data failed to load / seed not yet imported): a full-width message inside
  where the table would be — "No prospects loaded yet." — never a table with zero `<tr>` and no
  explanation, which reads as broken to a screen reader.
- **No-results state** (search + filter together match nothing among the *offset-known* rows):
  the filterable region shows "No prospects match your search and filter." with a "Clear
  filters" button; the unresolved-offset group **still renders** underneath per the rule above,
  so the page is never fully blank if any unresolved-offset rows exist and pass the text search.

### Wireframe — table view

```
Skip to main content [visually hidden, focusable]
┌───────────────────────────────────────────────────────────────────┐
│  [Logo/title]                              [EN | BG]  language    │
├───────────────────────────────────────────────────────────────────┤
│  Speaker Prospects                                                 │
│                                                                      │
│  Search: [________________________]  (searches name, org, bio...)  │
│                                                                      │
│  Timezone: ±[  2 ] hours of Sofia   [x] show DO NOT CONTACT rows   │
│                                                                      │
│  Showing 14 of 50 prospects   ← live region, announced on change   │
├───────────────────────────────────────────────────────────────────┤
│ ✓/★ │ Name ▼      │ Match      │ Country │ TZ offset │ Occupation │ ⋯ │
│     │ (sortable)  │ rating▲▼   │ ▲▼      │ ▲▼        │ ▲▼         │   │
├───────────────────────────────────────────────────────────────────┤
│ [✓][★]│ Amar Latif OBE │ 5 — Excellent│ UK    │ −2h Sofia │ Entrepreneur │ [Verified][★][Not sent ▾]│
│ [ ][ ]│ Ashish Goyal   │ 5 — Excellent│ UK    │ −2h Sofia │ Finance      │ [Mark verified][☆][Not sent ▾]│
│ ...                                                                  │
├──────────────────── Timezone not yet determined (always shown) ─────┤
│ [ ][ ]│ <name>        │ 3 — Fair    │ <c>   │ ⚠ timezone not yet determined │ ...            │
├───────────────────────────────────────────────────────────────────┤
│ [ ][ ]│ <name>        │ 0 — DO NOT CONTACT │ <c> │ ...  │ [DO NOT CONTACT — email disabled]   │
└───────────────────────────────────────────────────────────────────┘
```

---

## 2. Detail view

### Tab structure

Four tabs, not three — I'm splitting the brief's suggested "Overview / Career & D&I / Contact &
Links" into an explicit fourth **Email** tab (which the brief itself already asked for as "one
tab dedicated to the generated outreach email"). Final set:

1. **Overview** — photo/initials, name, role/org, occupation, match rating (with rationale
   text), verification status, country/timezone, verified/favourite controls (duplicated here
   from the table row so the detail page is self-contained).
2. **Career & D&I** — `careerBackground`, `pwdAtRelevance`, `reputationActivity` (awards/press),
   `priorPublicSpeaking`.
3. **Contact & Links** — `contact`, `profileUrl`, `status` (existing/new), `notes`, outreach
   status control (the authoritative one — the table row's is a shortcut to the same state).
4. **Email** — generated BG/EN outreach email, or the disabled/DO-NOT-CONTACT state.

Why four and not three: Overview and Career&D&I read as different *purposes* (identity/at-a-
glance vs. the actual pitch material), and folding Email into Contact&Links would bury the
single most time-critical action (this is the 16-days-to-deadline artifact) one extra click deep
under an unrelated heading. Four short tabs keeps each one's screen-reader traversal short,
which matters more than minimizing tab count.

### ARIA tab pattern

Full W3C APG pattern, not a shortcut version:

- Container: `<div role="tablist" aria-label="Prospect details">` wrapping four
  `<button role="tab" id="tab-overview" aria-selected="true|false" aria-controls="panel-overview" tabindex="0|-1">`.
  Only the selected tab has `tabindex="0"`; the rest are `tabindex="-1"` (roving tabindex —
  Tab key moves into/out of the tablist as one stop, not through all four buttons).
- Each panel: `<div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" tabindex="0">`.
  Inactive panels are removed from the DOM flow (`hidden`), not just visually hidden, so a
  screen reader in browse mode never lands on off-screen tab content.
- Keyboard model on the tablist (arrow keys work only while focus is inside the tablist):
  - **ArrowRight / ArrowLeft** — move to next/previous tab, wrapping (Email → wraps to Overview
    and vice versa), moving focus **and** activating the panel immediately (this is the
    "automatic activation" APG variant — appropriate here since panel content is cheap/static,
    not a paginated fetch).
  - **Home** — jump to Overview (first tab).
  - **End** — jump to Email (last tab).
  - **Tab** (the actual Tab key) — leaves the tablist entirely and moves to the active panel's
    first focusable content; Shift+Tab from inside a panel returns focus to the active tab, not
    to whichever tab has the mouse hovering.

### Photo-absent layout

Given ~0 rows currently have a photo, the *normal* case (not the edge case) must look
intentional:

```
┌──────────────┐
│              │
│      AL      │   ← 2-letter initials, generated from name, decorative
│              │      (aria-hidden="true" + empty alt on the fallback image
└──────────────┘      element if it's an <img>; the name text elsewhere on
Amar Latif OBE        the page already gives the accessible identity — no
Founder, Traveleyes   redundant "photo of Amar Latif" announcement needed)
```

Fixed-dimension container so the photo/initials swap never reflows surrounding layout when a
photo is added later (Phase 3). No "photo pending" text badge on top of the initials — initials
are the accepted steady state, not an error state, per CLAUDE.md's own framing.

### Email tab — BG/EN rendering and copy actions

```
┌─ Email ──────────────────────────────────────────────────────────┐
│  Language: [ English ]  [ Български ]     (independent of the    │
│                                              global UI language   │
│                                              toggle — see below)  │
│                                                                     │
│  Subject                                                            │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │ Invitation: [conference name] — 29 Sept 2026                │  │
│  └────────────────────────────────────────────────────────────┘   │
│  [Copy subject]                                                    │
│                                                                     │
│  Body                                                               │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │ Dear Amar,                                                    │
│  │                                                                │
│  │ Your work founding Traveleyes and building a team that...     │
│  │ [rest of templated body from conference_brief_bg.txt]         │
│  └────────────────────────────────────────────────────────────┘   │
│  [Copy body]   [Copy subject + body]                              │
└─────────────────────────────────────────────────────────────────┘
```

The email-language toggle is **local to this tab** and separate from the global UI-chrome
language toggle: someone reviewing in English chrome still needs to generate and send the
Bulgarian version to a Bulgarian-preferring contact, and vice versa — coupling them would force
a full page-language switch just to get one email variant. Each Copy button is a real `<button>`
(not a link), writes to clipboard via the standard clipboard API on click, and triggers a status
live-region announcement (§3). The two body/subject blocks are read-only `<textarea>` or
`<pre>` (not editable in Phase 2/5 scope — generation is deterministic template-fill, not a
drafting tool; flag if you actually want inline editing, since that changes the data model).

### Disabled email tab (DO NOT CONTACT rows)

The tab itself stays visible in the tablist (removing it would make the row's tab count
inconsistent across prospects, which is disorienting when tabbing between detail pages) but is
marked `aria-disabled="true"` and not focusable via the roving tabindex sequence (skipped by
Home/End/arrow cycling, matching APG guidance for disabled tabs). If reached at all (e.g. via
browser history), its panel shows only:

```
┌─ Email ──────────────────────────────────────────────────────────┐
│  ⛔ DO NOT CONTACT                                                  │
│  This prospect is rated 0–1 and marked do-not-contact in the      │
│  source research. Email generation is disabled for this row.      │
│  See the Career & D&I tab notes for why.                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Cross-cutting

### Language toggle

Placed top-right of the persistent header, present on every page (table and detail), rendered
as two toggle buttons `[English] [Български]` with `aria-pressed` on the active one — not a
`<select>`, since it's a binary, frequently-used control and buttons are one keypress each
rather than requiring opening a listbox. English is the pressed/default state on first load;
choice persists in `localStorage` only (this is a per-viewer UI preference, not shared review
state, so it's exempt from the Supabase-vs-localStorage discussion in CLAUDE.md).

### Focus order and visible focus

- DOM order matches visual/reading order everywhere (header → skip link target → search/filter
  controls → table → [detail: tabs → panel]) — no CSS-only reordering that would desync tab
  order from visual order.
- A "Skip to main content" link is the first focusable element on every page, visually hidden
  until focused, jumping past the header/nav/language-toggle straight to the search box (table
  view) or the tablist (detail view).
- Every interactive element gets a visible focus outline that meets the same standard regardless
  of pointer type (`:focus-visible`, not a `:focus` style that only fires for mouse users nor
  one that's suppressed entirely) — 3:1 contrast minimum against adjacent colours, never
  `outline: none` without a replacement.

### Live regions / announcements

A single `aria-live="polite"` status region (visually hidden, one per page) carries all of
these, replacing its text content on each event so only the latest announcement fires:

| Event | Announced text |
|---|---|
| Sort changed | `"Sorted by {column}, {ascending/descending}."` e.g. "Sorted by match rating, descending." |
| Filter/search result count changes | `"Showing {N} of 50 prospects."` (or the DO-NOT-CONTACT-inclusive count if that toggle is off — text always states which count it is) |
| No results | `"No prospects match your search and filter."` |
| Copy to clipboard succeeds | `"Subject copied to clipboard."` / `"Email body copied to clipboard."` / `"Subject and body copied to clipboard."` |
| Copy to clipboard fails | `"Could not copy to clipboard. Please select and copy the text manually."` |
| Verified toggle changes | `"Marked {name} as verified."` / `"Removed verified mark from {name}."` |
| Favourite toggle changes | `"Added {name} to favourites."` / `"Removed {name} from favourites."` |
| Outreach status changes | `"Outreach status for {name} set to {status} on {date}."` |
| Toggle/status write pending | (no separate announcement — see below; avoid double-announcing) |
| Toggle/status write fails | `"Could not save. {field} was not updated — please try again."` (see next section) |

Toggle announcements fire once, on confirmed save, not on optimistic click — see below for why
that trade-off is deliberate.

### Failed Supabase write

Given 2 users and last-write-wins semantics already accepted in CLAUDE.md, silent optimistic
updates that can later roll back would be actively confusing over a screen reader (no visual
"snap back" to notice). Proposed model: the toggle **shows a pending state immediately**
(existing `aria-pressed` value unchanged, but a `aria-busy="true"` on the control, no
announcement yet), then either:

- **Success** → flips `aria-pressed`, fires the confirmed announcement from the table above.
- **Failure** → control reverts to its pre-click state, and the live region announces
  `"Could not save. Verified status for {name} was not updated — please try again."` A
  same-page, dismissible error banner (`role="alert"`, so it interrupts rather than waiting
  politely) also appears near the top of the content area, since a transient live-region
  announcement is easy to miss if the user has already tabbed away.

This makes every toggle click feel slightly less instant than true optimistic UI, but for a
screen-reader-primary user, a control that visibly/audibly reverts without explanation is worse
than a half-second delay. Flag if you'd rather optimize for perceived speed here.

### `prefers-reduced-motion`

No motion is load-bearing anywhere in this design (no animated transitions carry information —
tab switching, toggle state, and filter updates are all also reflected in stable text/ARIA
state). Where any transition exists at all (tab panel fade, toggle switch animation), it's
wrapped so `prefers-reduced-motion: reduce` drops it to an instant state change, never removes
functionality.

### Passphrase write-gate

Per CLAUDE.md, the anon key is public in the bundle, so read access is open but writes need a
shared passphrase gate. Proposed UI: a single header-level "Unlock editing" control (button next
to the language toggle) that opens a small labeled password-type input + submit; on correct
entry, stores an unlock flag in `sessionStorage` (not `localStorage` — expires when the browser
session ends, so a shared/borrowed machine doesn't stay unlocked indefinitely) and swaps the
header control to "Editing unlocked" (with a "Lock" affordance to re-lock manually). While
locked, all toggle/status controls remain visible but rendered `aria-disabled="true"` with a
tooltip/adjacent text "Unlock editing to change this" rather than being hidden — Christian and
Stoyan should always be able to *see* current state; only mutation is gated. Wrong passphrase
attempts announce `"Incorrect passphrase."` via the same live region, no lockout/rate-limit
(this is friction against casual editing, not a security boundary, per CLAUDE.md's own framing —
adding brute-force protection would be over-engineering a non-threat).

---

## 4. Data model sketch

### Normalized prospect shape (derived from seed JSON at import time)

```
Prospect {
  id: string                        // slug, primary key, from source
  matchRating: 0-5                  // int, unchanged from source
  status: "existing" | "new"
  name: string
  roleOrganization: string
  occupation: string
  pwdAtRelevance: string
  country: string
  tzDiffHours: number | null        // normalized: "None" string and JSON null both → null;
                                     //   fractional values (e.g. 2.5) kept as-is, not rounded
  localTimeInSlot: string
  verificationStatus: string
  contact: string                   // rendered as-is, including literal "(verify URL)" markers
  profileUrl: string
  priorPublicSpeaking: string
  outreachStatusSourceNote: "Not sent"  // renamed from source `outreachStatus`; this is the
                                         // seed value only — see below, live status lives elsewhere
  careerBackground: string
  reputationActivity: string
  notes: string
  photoPath: string | null          // Phase 3, not populated yet; null = show initials fallback
  bgTranslation: {                  // present only for matchRating >= 4 rows; populated
    pwdAtRelevance, careerBackground, reputationActivity, notes  // Phase 5 content work, not seed data
  } | null
}
```

`outreachStatus`, `verified`, and `favourite` are deliberately **not** kept on the normalized
Prospect record above — they're the live, mutable state and belong only in Supabase (next),
never duplicated onto the immutable imported copy, precisely so re-import can never touch them.

### Supabase tables

```
prospects_seed                 -- re-importable, overwritten wholesale on each seed run
  id            text primary key
  <all normalized fields above except verified/favourite/live outreach status>
  imported_at   timestamptz

prospect_state                 -- the live, shared, mutable state — never touched by import
  id                text primary key references prospects_seed(id)
  verified          boolean default false
  favourite         boolean default false
  outreach_status   text default 'Not sent'   -- Not sent | Sent | Reminder sent | Replied |
                                               --   Accepted | Declined | No response
  outreach_status_set_at  timestamptz null
  updated_at        timestamptz               -- for last-write-wins visibility, not conflict resolution
```

### Seed-import rule (the CLAUDE.md non-negotiable)

Import is an **upsert into `prospects_seed` only, keyed by `id`**, plus an **insert-if-missing**
into `prospect_state` for any `id` not already present there (default `verified=false,
favourite=false, outreach_status='Not sent'`). It never issues an `UPDATE` or `DELETE` against
existing `prospect_state` rows. Concretely: re-running the importer after Christian has already
marked 12 rows verified and set 3 outreach statuses touches only `prospects_seed` — those 15
mutations in `prospect_state` are untouched, because the importer's write set for that table is
mathematically "rows whose id doesn't exist yet," which by definition excludes anything already
edited.

One consequence worth flagging: if a row is ever *removed* from a future re-export of
`blind_leads_list.json` (e.g. confirmed fabricated and pulled), this import rule leaves an
orphaned `prospect_state` row forever, and the seed importer needs a decision on whether that's
fine (it's harmless dead data) or whether you want a manual/explicit prune step. Not blocking
for Phase 2, but worth a one-line decision before Phase 4.

---

## Phase 3 note — folded into Phase 4

Scoped narrowly per CLAUDE.md (no photo sourcing), Phase 3 turned out to have no remaining
work that isn't either already decided above or genuinely Phase 5 component code. Folding it
into Phase 4 (seed import) rather than treating it as a separate step:

- **Folder convention**: `public/prospects/<id>/photo.{ext}` once the Vite scaffold exists
  (Phase 5) — under `public/` so it's served as a static asset and referenced by plain relative
  path (no bundler import needed), which matches how GitHub Pages serves everything else.
  `photoPath` stores the full relative path (`prospects/amar-latif-obe/photo.jpg`), not just the
  id, so the extension can vary per file. Not creating the physical directories yet — there's no
  project structure to anchor them in until Phase 5's scaffold exists, and empty dirs need
  throwaway `.gitkeep` placeholders that would just get reshuffled then.
- **`photoPath` population rule**: at Phase 4 seed import, every one of the 50 rows gets
  `photoPath: null` explicitly (not omitted) — none currently have a sourced photo, per
  CLAUDE.md's Phase-3 deprioritization. It stays `null` until someone manually drops a file
  into the folder above and updates that row's `prospects_seed.photoPath` by hand; this is a
  manual, occasional action, not something the importer or re-import ever automates or guesses.
- **The accessible fallback itself** (initials, fixed-dimension container, `aria-hidden`/empty
  `alt`) is already fully specified in §2 above — writing it is component code, i.e. Phase 5,
  not additional design work.

**Two findings from the real `id` values, checked against the seed file:**

1. ~~`matthieu-masselin-and-nicolas-simon` was a joint two-person row~~ — **resolved**: split
   into two independent prospect rows, `matthieu-masselin` and `nicolas-simon`, before Phase 4
   (50 rows total now, up from 49; 17 rows at matchRating 5, 27 at ≥4). Each carries its own
   `roleOrganization`, `country`/`tzDiffHours`/`localTimeInSlot`, and `notes`; the shared facts
   (company founding, `careerBackground`, `reputationActivity`, `contact`/`profileUrl` — one
   shared company contact channel) are duplicated across both rows rather than invented per
   person. `priorPublicSpeaking` was **not** duplicated where the source only documented it for
   Masselin — Simon's row says so explicitly rather than assuming the same engagements applied
   to him, per CLAUDE.md's never-invent rule. One-person-per-row is now the actual invariant,
   so the initials/single-photo-slot fallback in §2 needs no special case.
2. Several ids are diacritic-stripped ASCII slugs of names that keep full Unicode in the `name`
   field (`dirk-m-ller-remus` → "Dirk Müller-Remus", `k-r-at-ceylan` → "Kürşat Ceylan"). Confirms
   the initials fallback and any other display text must always derive from `name`, never be
   reconstructed from `id` — `id` is a routing/folder key only.

---

## Risks / things I think are worth re-checking before Phase 3

1. **Email tab language toggle vs. global language toggle** — I've made them independent (see
   §2). If you actually want the email language to always follow the page language, say so now;
   it changes the Email-tab state model.
2. **Outreach-status "authoritative" copy in Contact & Links vs. the table-row shortcut** — two
   controls writing the same field is normally an interaction-design smell; I think it's
   justified here (triage happens in the table, confirmation happens on the detail page) but
   flagging it as a deliberate duplication, not an oversight.
3. **Orphaned `prospect_state` rows on future re-exports** — see end of §4. Needs a one-line
   answer, not urgent.
4. **DO-NOT-CONTACT rows are shown by default with a visible toggle to hide them** in the
   wireframe (`[x] show DO NOT CONTACT rows`) — CLAUDE.md says they must never be *filtered out*
   automatically, but doesn't say whether a user-initiated hide toggle is acceptable. I've
   defaulted it to "on" (visible) so the default view matches the letter of CLAUDE.md, and made
   hiding an explicit opt-in action rather than a filter side-effect. Flag if you'd rather not
   offer even an optional hide.
5. **Fractional `tzDiffHours` (one row at 2.5)** — the ±X filter as specified takes an integer
   X; I'm treating the comparison as `|tzDiffHours| <= X` on the raw float, so X=2 would exclude
   the 2.5 row and X=3 would include it, which is correct but easy to get wrong in
   implementation — flagging so it isn't lost.
6. **Accessibility verification gap remains open** per CLAUDE.md — this design spec is not a
   substitute for that; it's designed to make the automated-checks-only pass as effective as
   possible (explicit ARIA, no colour-only signal, live regions), but Christian's first real use
   is still the actual test.

---

**Waiting for explicit sign-off on this document before starting Phase 3 (profile-image
folders) or any Phase 5 build work.**
