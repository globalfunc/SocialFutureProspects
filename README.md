# Disability-Inclusion Conference — Speaker Prospects App

## Purpose

Stoyan is helping Christian Grigorov (project manager, Bulgarian foundation "Сошъл Фючър", who is himself blind) find and vet international guest speakers for an online conference — **"Адаптиране на работни места за хора с увреждания"** ("Adapting workplaces for people with disabilities") — on **29.09.2026, 14:00–17:00 EEST, via Zoom**, with BG/EN interpretation.

Speakers must be **employers (or closely tied to employers)** who have adopted workplace practices or assistive technology (AT) to support blind and physically disabled staff. The target is ~50 vetted candidates; ~5–8 are expected to actually accept and present.

This repository is the seed data and spec for a small internal **review app**: a table of researched prospects that Christian (and Stoyan) can browse, filter, mark as verified/favourite, and generate a personalized outreach email for — before anyone gets contacted.

## What's in this archive

```
/data/
  blind_leads_list.xlsx   — human-readable spreadsheet (Excel), 49 prospects researched so far
                             (NOTE: blind_leads_list.json now has 50 rows — the joint
                             "Matthieu Masselin & Nicolas Simon" entry was split into two
                             separate prospect rows before Phase 4; .xlsx/.csv not yet
                             regenerated to match, see design.md's Phase 3 note)
  blind_leads_list.csv    — same data, flat CSV
  blind_leads_list.json   — same data, structured JSON (this is the intended seed source for the app's DB — see field reference below)
/docs/
  conference_brief_bg.txt       — Christian's original brief (Bulgarian), incl. the base invitation email template and event logistics
  blind_leads_action_plan.md    — sourcing strategy: candidate directories, Apify scraping notes + pricing, GDPR/ToS considerations, outreach cadence
CLAUDE.md                 — tech/process guidelines for the coding assistant building the app
initial_project_prompt.md — paste this into Claude in VS Code to kick off the build
README.md                 — this file
```

## Data field reference (`blind_leads_list.json` / `.csv`)

| Field | Meaning |
|---|---|
| `id` | URL-safe slug, generated from name — use as the detail-page route/key |
| `matchRating` | 0–5. 5 = verified, direct, quantified "employs/enables X% disabled staff" story. 0–1 = confirmed fabricated/deceased/off-topic — **do not contact** |
| `status` | `existing` = came from Christian's original source list · `new` = found during this project's research |
| `name`, `roleOrganization`, `occupation` | Basic identity |
| `pwdAtRelevance` | Why they fit the brief specifically — the employment/AT story |
| `country`, `tzDiffHours`, `localTimeInSlot` | `tzDiffHours` is offset **vs Sofia** (positive = ahead of Sofia). `localTimeInSlot` is what 14:00–17:00 EEST looks like in their local time — a quick usability check for a live Zoom slot |
| `verificationStatus` | How confident we are this person/fact is real, and from what source. Several early candidates in the *existing* set turned out to be AI-hallucinated (see action plan doc) — always check this field before acting on a row |
| `contact`, `profileUrl` | Best known outreach channel and public profile. Some are marked "(verify URL)" — genuinely not yet confirmed, not a guess |
| `priorPublicSpeaking` | Rough signal for how camera-ready/pitchable they are |
| `outreachStatus` | Currently all `Not sent` — this is the field the app should let a user update and persist |
| `careerBackground` | 1–3 sentence bio/CV summary |
| `reputationActivity` | Awards, press, boards, notable public activity — the "D&I activities" and "awards" content the detail page needs |
| `notes` | Fit caveats, timezone flags, recommended approach |

**Not yet in the data** (the app's later phases need to add these): profile photos, verified social-media handles beyond a website URL, and a generated outreach email per prospect.

## Prospect verification

`matchRating` and `verificationStatus` are Claude's assessment from web research, not ground truth. Treat rating ≥4 + "Verified" as reasonably safe to act on; treat anything "Unconfirmed" or lower-rated as needing a human check before any outreach. Rows rated 0 are kept in the data **on purpose**, clearly marked "do not contact," as a transparency record of what was checked and rejected.

## Email generation

The brief includes a base Bulgarian invitation template (`docs/conference_brief_bg.txt`). The app should generate a **personalized-but-templated** email per prospect: same core structure and ask, but opening with one sentence referencing that person's specific story (drawn from `pwdAtRelevance` / `careerBackground`), in both BG and EN. This is explicitly *not* meant to look mail-merged — see `initial_project_prompt.md` for the intended approach.

## Status as of this export

50 candidates researched (49 originally, plus one joint row split into two — see note above);
27 at match rating ≥4 (target for the conference brief is 50 at ≥4 — research is ongoing outside this app-building track). Several UK/EU contact URLs still need direct verification. See `docs/blind_leads_action_plan.md` for what's been covered vs. not yet attempted (e.g. full Disability:IN index, ILO GBDN roster, Valuable 500 full member list).
