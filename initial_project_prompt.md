# Initial project prompt — paste this to Claude in VS Code

I've extracted a project archive into this workspace. Please read `README.md` and `CLAUDE.md` first — they explain what this project is, what's in `/data` and `/docs`, and the working guidelines you should follow throughout (tech stack, i18n, accessibility). Everything below is the actual task.

## Context

I'm building a small internal review app so Christian (a blind project manager at a Bulgarian disability-inclusion foundation) and I can browse, verify, and prepare outreach to a researched list of ~50 potential conference speakers — employers or technologists who've adopted workplace practices or assistive technology for blind and physically disabled people. The data (49 prospects so far, in `/data/blind_leads_list.json`) was researched separately; your job is to build the app around it, not to do more of that research.

It will be hosted on **GitHub Pages** and the link shared directly with Christian for his review and feedback.

## What to build

**1. Table / list view**
A React+Tailwind page listing all prospects with:
- Sortable columns (at least: name, match rating, country, timezone offset, occupation)
- A global text search/filter across the visible fields
- A timezone-offset filter: a dropdown/range control that filters to prospects within **±X hours of Sofia**, where X is user-selectable

**2. Detail view**
Clicking a prospect's name opens a detail page with:
- CV-style fields, a photo if one is available (many don't have one yet — handle that gracefully, don't break the layout)
- D&I activities, description/bio, social/profile links, awards, and the technology/relevance tags already present in the table data (timezone, occupation, match rating, etc.)
- Organize this into **tabs** (e.g., Overview / Career & D&I Activity / Contact & Links), plus **one tab dedicated to a generated outreach email** for that specific person

**Email generation**: use the base template and event details in `docs/conference_brief_bg.txt` as the structural skeleton (don't reinvent the ask or the logistics), but open with 1–2 sentences that reference that specific person's story, drawn from their `pwdAtRelevance`/`careerBackground` fields — so it reads as genuinely personalized, not mail-merged. Generate both a BG and an EN version.

**3. Bilingual content**
Every page — UI chrome and prospect content alike — needs Bulgarian and English versions, with **English as the default**. UI strings vs. actual prospect-content translation are different problems — treat both explicitly rather than assuming a UI i18n library alone covers it.

**4. Tech stack & accessibility**
React + Tailwind CSS. Christian, the person this is ultimately for, is blind and uses a screen reader daily — accessibility here is a real functional requirement, not a nice-to-have. Follow the accessibility section in `CLAUDE.md` (ARIA on sortable headers and tabs, full keyboard operability, semantic table markup, never color-only status indicators, screen-reader testing before calling a phase done). If you see other concrete accessibility improvements worth making beyond what's listed there, suggest them.

**5. Process: wireframes and sign-off before code**
Do **not** jump straight to component code. First produce the design spec and wireframes (see Phase 2 below), and get my explicit approval, before writing the actual React components, translation content, or email-generation logic.

**6. Persistent state: Verified / Favourite buttons**
Each prospect needs a "Verified" toggle and a "Mark as favourite" toggle in the UI, and this state needs to persist somewhere more durable and more shareable than plain browser `localStorage` (see the "Known open question" in `CLAUDE.md` — GitHub Pages is static-only, so this needs a real decision, not a default). Bring this into the Phase 1 discussion below rather than deciding it unilaterally.

## Dev phases

Work through these in order. **Treat Phase 1 and the start of Phase 2 as a real discussion, not a formality** — ask me questions, point out gaps or risks in this spec, propose alternatives where you think there's a better way to do something (data modeling, storage approach, UI structure, whatever), and push back on any assumption of mine that doesn't hold up. I'd rather you surface a disagreement now than build something I have to unwind later. Once we've actually converged, write it down and move on.

1. **Provision the app** — `npm`/Vite React app, Tailwind configured, initial project structure, and the storage layer set up per whatever we land on in the discussion above (sql.js, a small hosted backend, IndexedDB, commit-as-storage via GitHub API, or something else — walk me through the real tradeoffs, including what happens when both Christian and I want to mark different things at different times, before we pick).

2. **`design.md` + wireframes** — a design spec document and wireframes (can be simple: ASCII/markdown layout sketches, or actual low-fi mockups if you have a way to render them in this environment) for both the table/list view and the detail view, covering the filter/sort UI, the tab structure on the detail page, and how the bilingual toggle and the verified/favourite controls fit in. **Stop here and wait for my explicit approval before continuing to Phase 3.**

3. **Profile images & prospect folders** — for each prospect, attempt to find a usable profile photo (check the `profileUrl`/`contact` fields already in the data first) and set up a folder per prospect keyed by their `id` slug (already generated in the JSON) to hold the image and any other per-prospect assets. Handle missing photos as a normal, expected case in both the data layer and the UI, not an error state.

4. **Parse & seed the database** — load `/data/blind_leads_list.json`, validate/normalize it against whatever schema you've defined, and seed the storage layer decided in Phase 1. Keep the JSON as the re-importable seed source (per `CLAUDE.md`), not something the running app edits directly.

5. **Build the actual app** — the real components, routing, sort/filter/search logic, i18n content (UI strings + translated prospect content), the tab-based detail view, and the per-prospect email generation, wired up to the storage layer from Phase 1.

## Reference files in this workspace

- `/data/blind_leads_list.json` — prospect data (primary source for Phase 4)
- `/data/blind_leads_list.csv`, `/data/blind_leads_list.xlsx` — same data, other formats, for my own reference
- `/docs/conference_brief_bg.txt` — event details + base email template (Bulgarian)
- `/docs/blind_leads_action_plan.md` — how the data was sourced (background only, not part of the app build)
- `README.md` — field-by-field explanation of the data
- `CLAUDE.md` — tech/process guidelines; keep following this throughout, and update it if we make a real decision (e.g. the storage approach) that future-you should remember

Start with the Phase 1 discussion.
