# LinkedIn invitation — Francis Carl Reyes (`francis-carl-reyes`, matchRating 5)

Status: drafted, pending Stoyan sign-off. Not yet sent.

**Naming decision:** kept the filename `invitation_email.md` (matching the pattern used for every
other prospect folder) even though this round only contains a LinkedIn message, not a full email —
consistency with the existing folder structure seemed more useful than a one-off `linkedin_message.md`
name. Flagging in case Stoyan prefers the file split differently once other LinkedIn-only rounds come up.

**Contact / addressing decision — LinkedIn only, direct to Francis, not routed through Caravan's
corporate page:**

The row's `contact` field says "Not found yet — try Caravan Food Group corporate page," which was
stale — no attempt had actually been made to find him directly. Stoyan supplied his LinkedIn URL
(https://www.linkedin.com/in/fcgreyes/, "Chief Executive Officer at Caravan Food Group, Inc.,"
Metro Manila) this session. A direct `WebFetch` of that URL was blocked (LinkedIn returns HTTP 999
to automated fetches — expected, not a red flag), so identity was corroborated independently: a
public LinkedIn post at the same profile slug (`linkedin.com/posts/fcgreyes_caravan-food-group-honored-as-employer-of-...`)
shares Caravan Food Group's own "Employer of the Year" news, which only the company's own CEO/account
would be posting. Combined with the title ("Chief Executive Officer at Caravan Food Group, Inc.")
and location (Metro Manila) matching the row and every press source below, this is confidently the
same Francis Carl Reyes, not a namesake — no discrepancy found. Per Stoyan's instruction, this round
is a LinkedIn-only outreach (no email address has been independently verified either), so only the
LinkedIn message is drafted.

Sources used: `data/blind_leads_list.json` (`francis-carl-reyes` row); Francis Carl Reyes's LinkedIn
profile URL as supplied by Stoyan (fetch blocked, identity corroborated via public post instead,
2026-09-17); The ASEAN Magazine, *"Inclusive Employment is Good for Business: Francis Reyes (CEO of
Caravan Food Group, Inc. Philippines)"* (theaseanmagazine.asean.org, published 2025-03-05, accessed
via search summary 2026-09-17 — direct fetch was redirect-blocked); Tatler Asia profile,
"Francis Reyes" (tatlerasia.com, fetched 2026-09-17); Manila Times / BusinessMirror / Philippines
Graphic / foodieph.com, all republishing the same "Caravan Food Group Honored as Employer of the
Year" wire item (2023-09, philippinesgraphic.com.ph fetched directly 2026-09-17; others via search
summary after direct fetches were blocked); Metroguide, *"The 4 Ways Caravan Food Group Is Making a
Difference For PWDs"* (metroguide.co, fetched 2026-09-17); BusinessMirror, *"Overcoming a personal
challenge and finding the right career with Overdoughs"* (businessmirror.com.ph, fetched 2026-09-17);
THEPHILBIZNEWS, *"Deaf advocate entrepreneur Francis Reyes made it to TOYM finalist"*
(thephilbiznews.com, fetched 2026-09-17); overdoughs.ph "The GoOD Sign" campaign page (Caravan's own
site, fetched 2026-09-17). No fact below goes beyond those sources.

---

## LinkedIn invitational message

```
Subject: Invitation to Speak — International Online Conference for People with Disabilities

Hi Francis — I'm reaching out from the "Social Future" Foundation in Bulgaria. We're organizing an
international online conference on 29 September (Adapting Workplaces for People with Disabilities),
and we're looking for inspiring stories from employers of people with disabilities to share with
young people with disabilities here in Bulgaria. Caravan Food Group's story is exactly the kind
we'd love to feature — building Elait! and Overdoughs around Deaf Partners who make up more than
half your staff, with writing tablets and visual menus built into the counters so communication
works both ways, and real promotion paths into team-leader and area-supervisor roles. Would you be
open to a short (20-25 min) speaking slot? Happy to send full details by email if so.
```

---

## Praise-sentence / message sourcing (fact-by-fact)

- "Deaf Partners who make up more than half your staff" — `pwdAtRelevance` field ("70+ deaf staff");
  corroborated by Tatler Asia ("staffed over 70 deaf employees across branches") and The ASEAN
  Magazine ("more than 50 per cent of CFGI's personnel"). Press from 2023 (Manila Times /
  BusinessMirror / Philippines Graphic / foodieph, all citing the same figure) states a more precise
  **57.38%** — a different measurement point in time from the row's "70+" headcount, not a
  contradiction, so the message uses the safely-corroborated "more than half" rather than picking one
  specific number.
- "writing tablets and visual menus built into the counters so communication works both ways" — not
  in the row's existing fields; added from Metroguide ("customers can order through writing tablets
  available at all Overdoughs and Elait branches," "menus are designed so patrons can easily point
  out the items they want") and an independent web-search summary citing the same details plus
  buzzers connected to watches for staff alerts (buzzer detail not independently re-confirmed by a
  directly-fetched primary source today, so left out of the message itself — see "not used" below).
- "real promotion paths into team-leader and area-supervisor roles" — corroborated by three
  independent sources: Philippines Graphic / press wire ("2 employees promoted to area supervisors,"
  "5 branch team leaders"), The ASEAN Magazine ("Deaf partners... progressing to positions as team
  leaders and area supervisors"), and BusinessMirror's profile of employee Jan Aldrin L. Lontoc (deaf
  since birth, joined 2017 as a part-time waiter, promoted to team leader within five years, now
  training to be an area supervisor) — a concrete individual story behind the general claim.

Local-time mention: this round is a short LinkedIn message (no full email, no local-time line), per
Holly Tuke's LinkedIn-message format. For reference, the row's `localTimeInSlot`
("17:00-20:00 PHT (evening, workable)") checks out: 12:00-15:00 EEST + 5 hours (`tzDiffHours: 5`) =
17:00-20:00 PHT — no correction needed, unlike Holly's or Dirk's rows.

---

## Not used (true, but held back, or not solid enough to state as settled fact)

- **The "not a charity, we are a business" / "no reason to feel sorry for them" quote** (from the
  Bulgarian note supplied this session) — searched specifically for this quote in English-language
  press and could not corroborate it against any source found today. Not used in the message, and
  not stated as fact anywhere in this file; if Stoyan has the original Bulgarian-language source for
  it, worth adding back with that citation.
- **57.38% figure specifically, and the "Employer of the Year" award itself** (Manuel V. Agcaoili
  Award, Small Company category, 30th Apolinario Mabini Awards, awarded by The Philippine Foundation
  for the Rehabilitation of the Disabled, 18 July 2023 — well corroborated across Manila Times,
  BusinessMirror, Philippines Graphic, and foodieph, all appearing to republish the same wire item)
  — true and strong, but the message already leads with the workplace-adaptation and promotion
  story per this session's steer toward that emphasis; the award is a good candidate to add if
  Stoyan wants a fuller version or the eventual full email.
- **Filipino Sign Language (FSL) workshops for hearing colleagues** — corroborated by a web-search
  summary (basic FSL/Deaf-awareness seminars during onboarding, FSL interpreters, live captioning in
  meetings) and independently by Caravan's own site, overdoughs.ph, which currently promotes "The
  GoOD Sign" — a Deaf Awareness and Basic Filipino Sign Language seminar scheduled for September
  2026. True and well-sourced, but left out of the short message to keep it to one adaptation example
  rather than stacking several; strong candidate for the full email if one follows.
- **Partnership with De La Salle-College of Saint Benilde's School of Deaf Education and Applied
  Studies (SDEAS)**, via "The Good Cookie Project" under Overdoughs — corroborated by Metroguide and
  by THEPHILBIZNEWS (which also names a second partner, "Hand & Heart"). True, but a
  donation/outreach partnership is a step removed from the direct hiring/workplace story this message
  leads with; held in reserve.
- **Autism and Down syndrome hiring expansion** — the row's `pwdAtRelevance` field already mentions
  "part-time employees with autism and Down syndrome," and this is independently corroborated by
  Tatler Asia's Gen.T profile ("expanded hiring to include employees with autism and Down's syndrome,
  offering not only jobs but also training programmes and leadership opportunities"). Not repeated in
  the short LinkedIn message (which already names one specific accommodation and one promotion
  story), but confirmed as more than just the row's own claim — good material for the full email.
- **A named graphic artist among the Deaf partners** — The ASEAN Magazine states some Deaf partners
  work "as production staff at their commissary and a graphic artist," which loosely corroborates the
  Bulgarian note's "graphic designers" claim, but only as a single individual, not a described career
  track. The Bulgarian note's additional claim of promotion specifically into **"zone managers"** was
  not found in any source checked today — only "team leaders" and "area supervisors" are
  independently corroborated as promotion titles. Neither "graphic designers" (as a track) nor "zone
  managers" is used as a stated fact in the message; only the corroborated "team-leader and
  area-supervisor" promotion path is used.
- **TOYM (The Outstanding Young Men) 2022 finalist, business/economics/entrepreneurship category**
  (JCI Philippines / TOYM Foundation) and **Gen.T Leaders of Tomorrow Philippines, 2020** (Tatler
  Asia) — both well-corroborated personal accolades, but a LinkedIn pitch this short doesn't have
  room for awards on top of the workplace story; good material for a full email later.
- **Founding year 2017** — corroborated independently by The ASEAN Magazine ("When Francis built his
  business in 2017") and by the BusinessMirror Lontoc profile (Lontoc "joined Caravan Food Group in
  2017"). Not used in the short message but available; the row's own `careerBackground` field doesn't
  state a year.
- **"As a teenager" (age at the clothing-store encounter)** — this detail comes from the row's
  existing `careerBackground` field, not independently re-confirmed against a primary source today
  (press coverage found describes the encounter without stating his age at the time). Not contradicted
  by anything found, just not independently corroborated — flagging rather than treating as
  fully verified, same caution applied to unconfirmed row details in the other prospects' files.
