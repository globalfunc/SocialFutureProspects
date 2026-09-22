# Invitation email — Kürşat Ceylan (`k-r-at-ceylan`, matchRating 5)

Status: drafted, pending Stoyan sign-off. Not yet sent.

**Tone note (per Stoyan's instruction on this draft):** both the email and the LinkedIn message
below explicitly apologize for the short notice (today is 2026-09-19, ten days before the
29 September event), are written in a warmer register than a first pass would default to, and state
plainly that this is an unpaid/volunteer speaking invitation — no dedicated speaker budget — following
the "purely volunteering opportunity" framing already used in Cornel Amariei's file. This is a
deliberate addition for this prospect's file, not something independently found in research.

**This file supersedes and folds in `invitation_linkedin.md`** (the LinkedIn-only draft from
2026-09-17, in this same folder) — that file's sourcing is carried forward and re-verified below,
plus a full email, contact-routing check, and a title-discrepancy finding are added.

**Folder-name note (carried forward from the prior file):** the data row's `id` is `k-r-at-ceylan` (a
diacritics-stripping artifact of "Kürşat"), not `kursat-ceylan` — used the actual `id` value so this
folder matches the app's id-keyed lookup convention. Flagging again in case the id should be
corrected in the data file instead.

## Title discrepancy — "Co-Founder & CEO" is very likely outdated; used "Co-Founder" instead

The row's `roleOrganization` field says **"Co-Founder & CEO, WeWALK."** Today's research finds this
is probably no longer accurate, and the CEO title now sits with a different co-founder:

- **theorg.com's WeWALK leadership-team page** (an independent, structured org chart, fetched today)
  lists all three founders with distinct titles: **Gökhan Meriçliler — Co-Founder & CEO**; **Kürşat
  Ceylan — Co-Founder** (no CEO); **Murat Uğiş — CMO/Growth VP**.
- **Kürşat's own LinkedIn headline**, per both this session's search results and the prior session's
  fetch, reads **"Co-founder at WeWALK"** — no CEO.
- **Engadget's CES 2025 coverage of the Smart Cane 2** (fetched today), which quotes him directly by
  name, identifies him only as **"Co-founder Kürşat Ceylan."**
- Independently, multiple sources (Entrepreneur/MENA, RocketReach's WeWALK management listing) name
  **Gökhan Meriçliler specifically as "Co-Founder and CEO."**

Three independent sources agree Kürşat's current title is "Co-Founder" without "CEO," and a fourth
independently names someone else as CEO. **The email and LinkedIn message below address him as
"Co-Founder, WeWALK," not "Co-Founder & CEO."** This is the same shape of correction as Thorkil
Sonne's file (a title that was accurate at founding but has since shifted) — the row itself isn't
edited, per this project's data-handling rule; worth a manual row update by Stoyan if he agrees.

## Contact / addressing decision — the row's contact form is real and live, but it's a generic inbox

The row's `contact` field says "Contact form at wewalk.io." Checked today, in parts:

1. **Is wewalk.io still the live, correct domain?** Yes — a direct fetch today shows a current,
   actively maintained site (2026 copyright, Smart Cane 2 content, CES 2025/CEATEC 2025 references).
2. **Where does the form/email actually route?** `wewalk.io/en/contact-us/` (fetched today) lists a
   single general address, **`info@wewalk.io`** ("response within 24 hours"), plus a contact form
   asking only for name/email/phone/country/organisation/message — **no category selector for
   press, partnerships, or speaker requests**, and two physical addresses (a London WeWork co-working
   address and the Istanbul Arı Teknokent office). A web search independently confirms
   `info@wewalk.io` as WeWALK's general-inquiries address, and turns up no separate, dedicated
   press/media contact anywhere. The site's nav also has "R&D Partnership" and "Corporate
   partnership" pages, but neither names a specific contact person or address.
3. **Is there a more direct route to Kürşat himself?** His LinkedIn profile
   (linkedin.com/in/kursat-ceylan/) is confirmed as the correct, current handle (matches his name,
   WeWALK affiliation, and the "Co-founder" title across every source checked), but a direct
   `WebFetch` of it returns **HTTP 999**, LinkedIn's standard block on automated fetches — it can't be
   read programmatically, only addressed. RocketReach lists a masked address in the shape
   `k******@wewalk.io` for him, consistent with a firstname-initial company-email convention, but it's
   paywalled/unverifiable and not independently confirmed — **not used**. No personal (non-company)
   email, phone, or "speaking inquiries" page was found anywhere public.

**Net: `info@wewalk.io` is the only verified, currently-live inbox, but it's a general support/sales
address with no press or speaker-request routing — a real risk it gets triaged as a customer-support
ticket rather than reaching Kürşat or anyone who'd forward it to him**, exactly the concern flagged in
the task. To mitigate: the subject line names Kürşat explicitly and states up front that the message
should be forwarded to him, and the LinkedIn message is sent as a genuine parallel channel (not just a
courtesy note) rather than the usual backup-only role it plays in files where a named personal or
role-based email already exists (e.g., Srikanth Bolla's, Thorkil Sonne's).

**Send to:** info@wewalk.io, subject naming Kürşat Ceylan directly so staff can forward it without
reading the full body first. LinkedIn message sent in parallel as an equally real channel, not a
fallback.

## Timezone — re-verified for today's date, not assumed from the row

The row lists `country: "Turkey (Istanbul)"`, `tzDiffHours: 0`, `localTimeInSlot: "12:00-15:00
(identical timezone to Sofia)"`. Checked fresh rather than trusted from the row, since the task
specifically asked not to assume DST alignment carries through to 2026:

- **Türkiye has used a single, fixed UTC+3 offset (Turkey Time, TRT) year-round since 6 September
  2016** — it abolished seasonal clock changes and does not observe DST. Confirmed by multiple
  time-reference sources today.
- **Bulgaria (EU/EEST) still observes DST in 2026** and doesn't fall back to EET until the last
  Sunday of October (25 October 2026) — so on **29 September 2026, Sofia is on EEST (UTC+3)**, the
  same offset as Turkey's fixed UTC+3.

**Both land on UTC+3 on the event date, so the row's `tzDiffHours: 0` is correct for 2026** — not
because the two countries share a DST rule (they don't; Türkiye simply never changes, and Bulgaria's
EEST period happens to still be in effect in late September), but because the two independent facts
happen to coincide on this particular date. The event slot (12:00 PM–3:00 PM EEST) is stated as
identical to Istanbul local time, in am/pm format, with a one-line explanation of why (Türkiye's fixed
offset), rather than just asserting "same timezone" as the row's note does.

## Sources used

`data/blind_leads_list.json` (`k-r-at-ceylan` row); this project's own prior file,
`public/prospects/k-r-at-ceylan/invitation_linkedin.md` (2026-09-17), including its transcription of
Kürşat Ceylan's LinkedIn About-section text pasted in by Stoyan that session (direct WebFetch of
linkedin.com/in/kursat-ceylan/ returns HTTP 999 both sessions — LinkedIn's standard automated-fetch
block); direct fetch of `wewalk.io` homepage (2026-09-19); direct fetch of
`wewalk.io/en/contact-us/` (2026-09-19); web search corroborating `info@wewalk.io` as WeWALK's general
address (2026-09-19); web search on Kürşat Ceylan / WeWALK 2026 activity, surfacing TechFEST 2026
Adelaide and the Envision/VisionServe Alliance Conference (2026-09-19); web search on WeWALK
2025/2026 news, surfacing the Smart Cane 2 launch and CNIB partnership (2026-09-19); Engadget, "The
WeWalk Smart Cane 2 could be one of AI's few good use cases at CES 2025" (engadget.com, fetched
2026-09-19 — quotes "Co-founder Kürşat Ceylan" directly, confirms Smart Cane 2 features/pricing and
the February 2025 CNIB partnership); theorg.com, WeWALK leadership-team page (fetched 2026-09-19 —
source for the Meriçliler/CEO finding); web search corroborating Gökhan Meriçliler as "Co-Founder and
CEO" via Entrepreneur/MENA and RocketReach listings (2026-09-19; direct fetch of the MENA
Entrepreneur.com profile succeeded but didn't itself name founders); attempted direct fetch of
`uk.linkedin.com/in/gokhanmericliler` (2026-09-19, partial/inconclusive — used only as one input among
several, not as the sole basis for the title finding); web search on WeWALK's Time Best Inventions
2019 listing (2026-09-19 — direct fetch of `time.com/collection/best-inventions-2019/5733049/wewalk/`
returned HTTP 404 both attempts; used via the search result's own title/snippet, "WeWALK: Best
Inventions 2019 - A Smarter Cane," consistent with the prior session's independent corroboration of
the same fact); web search on the WeWALK–Microsoft partnership (2026-09-19 — corroborates the
programme's precise name, "AI for Accessibility," announced October 2020, as one strand of Microsoft's
broader "AI for Good" work; direct fetch of `tdk.com`'s featured-story page returned HTTP 403);
Crunchbase person profile for Kürşat Ceylan (fetch attempt returned HTTP 403, not used); time-zone
reference sources (time.is, timeanddate.com, timeofdate.com) confirming Türkiye's fixed UTC+3/no-DST
policy since 2016 (2026-09-19). No fact below goes beyond those sources.

Not fetchable / not used: `rocketreach.co`'s Kürşat Ceylan profile (masked email only, paywalled —
mentioned above only to flag and exclude it); Westminster-style secondary funding aggregators
(PitchBook, Tracxn, LeadIQ, CB Insights) surfaced in a WeWALK-funding search, which disagree with each
other by several million dollars on WeWALK's total raised ($11M vs. $8.66M depending on the
aggregator) — not independently resolvable today and not a personal-achievement fact about Kürşat
himself, so no funding figure is used anywhere in the email or LinkedIn message.

---

## Email

```
Subject: Invitation for Kürşat Ceylan — International Online Conference for People with Disabilities

Dear Kürşat,

First, please forgive the short notice — we're reaching out only about ten days before the event,
and we know that's tight. We would still love the chance to have you with us if your schedule allows,
and if this message needs forwarding to reach you directly, we'd be very grateful.

On 29 September 2026, from 12:00 PM to 3:00 PM Eastern European Summer Time (EEST) — the same as
your own time in Istanbul, since Türkiye's fixed UTC+3 offset lines up with Bulgaria's EEST at this
time of year — the "Social Future" Foundation (Jamba – Career for All) is organizing an international
online conference on the topic "Adapting Workplaces for People with Disabilities." The foundation's
mission is to support young people with disabilities in Bulgaria in their career development,
education, and employment in the Bulgarian labour market. We are looking for employers of people
with disabilities, or inspiring success stories from self-made entrepreneurs, public speakers, and
advocates for equality. We think your story — turning a painful collision with a pole while
navigating a New York airport with a cane, a phone, and a suitcase all at once into the idea behind
WeWALK's smart cane, since named a TIME Best Invention and a Microsoft AI for Accessibility partner,
now used by blind and visually impaired people in more than 37 countries, and carried onto stages
like the UN Convention on the Rights of Persons with Disabilities — is exactly the kind of story we
would love to share with people with disabilities in Bulgaria, to inspire them to seek new
opportunities for development and steady employment.

The conference will take place on the Zoom platform, and we will arrange your specific speaking time
once you accept our invitation. We are also able to include a short presentation or demo from you,
if you wish. The conference will have two-way interpretation between Bulgarian and English, and a
sign-language interpreter for deaf participants; the materials will later also be adapted for young
people with intellectual disabilities. Your speaking slot would be 20 to 25 minutes — about 15
minutes for your presentation and the rest for questions from the organizers and the audience. We
will run a connection test the day before the event, and we'll be in touch about that beforehand.
The access link will be posted on our social media channels, and we will also share it with you
directly in case you'd like to pass it on to your own partners or community.

We should also be upfront that we don't have a dedicated budget for speakers, so please treat this
as a warm, volunteer invitation — we'd be genuinely grateful for your time either way.

This is the third in a series of conferences dedicated to raising public awareness of employment
issues facing people with disabilities in Bulgaria. It would be both a privilege and a pleasure to
have you join us, even on short notice.

Please reply within 5 days of receiving this email so we can plan the programme and confirm your
exact speaking time. If you decide to accept, we'll also ask you for a short 1–3 sentence
introduction we can use for the programme timeline and speaker listing.

Best regards,
Christian Grigorov
"Social Future" Foundation

—

Christian Grigorov
Project Activities Specialist, Jamba Foundation
"Social Future" Foundation — International Online Conference, 29 September 2026

Conference event page (Jamba): https://jamba.bg/adaptirane-rabotno-myasto/
LinkedIn: https://www.linkedin.com/in/krgrigorov/
```

**Send to:** info@wewalk.io (see addressing decision above — the only verified live inbox; subject
line names Kürşat directly to help it get forwarded past general support triage).

---

## LinkedIn invitational message

```
Subject: Invitation to Speak — International Online Conference for People with Disabilities (apologies for the short notice!)

Hi Kürşat — I'm reaching out from the "Social Future" Foundation in Bulgaria, and I'll admit upfront
this is short notice on our part! We're organizing an international online conference on 29
September (Adapting Workplaces for People with Disabilities), and we're looking for inspiring
self-made stories from people with disabilities to share with young people with disabilities here in
Bulgaria. Co-founding WeWALK's smart cane — born from your own experience navigating with a cane, a
phone, and a suitcase at once, since named a TIME Best Invention and a Microsoft AI for Accessibility
partner, and a story you've taken to platforms like the UN — is exactly what we'd love to feature.
Istanbul lines up with Sofia's time zone too, so the logistics would be simple. It's a volunteer
speaking slot (20–25 min) since we don't have a speaker budget, but we'd be so glad to have you if
you're open to it — happy to send full details by email as well, if you'd like.
```

Sent to: https://www.linkedin.com/in/kursat-ceylan/. Per the addressing decision above, this is being
treated as a genuine parallel channel rather than a pure backup, given the risk that the
`info@wewalk.io` email gets triaged as general support.

---

## Praise-sentence sourcing (fact-by-fact)

- "co-founding WeWALK's smart cane" — `roleOrganization` / `pwdAtRelevance` fields; title corrected
  to drop "& CEO" per the title-discrepancy finding above.
- "turning a painful collision with a pole while navigating a New York airport with a cane, a phone,
  and a suitcase all at once into the idea" — `careerBackground` field; corroborated in general terms
  by Anadolu Agency, Daily Sabah, and Hürriyet Daily News coverage of the WeWALK origin story (carried
  forward from the prior session's research), and independently by a 2026 web-search summary
  describing the same airport-pole collision story.
- "named a TIME Best Invention" — `reputationActivity` field; corroborated by the TIME "Best
  Inventions 2019 — A Smarter Cane" listing (title/snippet confirmed today; direct fetch blocked, see
  sources section).
- "a Microsoft AI for Accessibility partner" — `reputationActivity` field says "AI for Good"; today's
  research finds the precise, named Microsoft programme is **AI for Accessibility** (announced October
  2020), which sits within Microsoft's broader AI for Good initiative. The email uses the more precise
  programme name rather than the row's broader phrasing, since both are independently corroborated and
  "AI for Accessibility" is the more specific, verifiable claim.
- "used by blind and visually impaired people in more than 37 countries" — `reputationActivity` field
  ("products sold in 37+ countries"); independently corroborated by a Global Banking & Finance
  description of WeWALK as "already in use across 37 markets."
- "carried onto stages like the UN Convention on the Rights of Persons with Disabilities" —
  `priorPublicSpeaking` field names the UN Convention specifically; corroborated in general terms by
  the prior session's LinkedIn About-text transcription (Stoyan-supplied, "spoke at leading
  international platforms... such as CES, the YGA Summit, the United Nations") and by a 2026 web
  search stating he "has given speeches at the United Nations... (2 times)" in the Convention context
  — neither source is a single authoritative primary document, so the sentence says "stages like the
  UN Convention" rather than asserting exact appearance count or dates.
- "Istanbul lines up with Sofia's time zone" (LinkedIn message) / the full EEST/Türkiye explanation
  (email) — see the timezone section above.

---

## Not used (true, but held back, or not solid enough to state as settled fact)

- **Smart Cane 2, launched with a GPT-powered voice assistant, showcased at CES 2025, and the
  February 2025 partnership with Canada's National Institute for the Blind (CNIB)** — the strongest
  genuinely new 2025-dated fact found today, independently corroborated by Engadget's CES 2025
  coverage (which also directly quotes Kürşat). Held out of the base email to keep the praise sentence
  to four clauses, matching the pattern in Thorkil Sonne's and Srikanth Bolla's files; strong candidate
  to fold in if Stoyan wants a fuller version — e.g., "...and just last year brought a next-generation
  version, with a built-in AI voice assistant, to CES 2025."
- **TechFEST 2026 (Adelaide) and the 2026 Envision/VisionServe Alliance Conference (Columbus)** — true
  per today's search results, and genuinely recent, but these are calendar/appearance facts rather than
  personal-achievement praise, and neither could be corroborated by an independently fetchable primary
  source (only via search-summary text) in today's pass; not used, consistent with how similar
  unconfirmed 2026 conference appearances were held back in the prior session's file.
- **CES and the YGA Summit as additional speaking venues** (his own LinkedIn About, per the prior
  session) — true, but a third and fourth named venue felt like it would overload the sentence beyond
  "the UN"; available if a longer version is wanted.
- **"Named one of the most successful young entrepreneurs by Fortune Turkey... honored with several
  other prestigious awards"** (his own LinkedIn About, per the prior session) — the "several other"
  awards aren't individually named, so this reads weaker than the two specifically sourced credentials
  (TIME, Microsoft) already used; not independently re-verified this session.
- **"Technologies that will change the lives of over 250 million visually impaired people"** (his own
  LinkedIn About) — a population/market statistic, not a personal-achievement fact; left out as
  scale-of-mission framing rather than praise.
- **A masked `k******@wewalk.io` address on RocketReach** — already covered above; paywalled,
  unverifiable, not used as a contact route.
- **WeWALK's total funding raised** — aggregator sources disagree by several million dollars ($11M vs.
  $8.66M) and no single authoritative figure could be confirmed today; not a personal fact about
  Kürşat in any case, so left out entirely.
- **One search-engine summary calling him "CEO and co-founder of Young Guru Academy (YGA)"** — carried
  forward from the prior session's file as a flagged, excluded error (conflicts with both the row and
  every other source, which attach any CEO title, where used at all, to WeWALK or — per this session's
  finding — to Gökhan Meriçliler, not to YGA); still not used.
- **His direct CNN quotes** ("In these days we are talking about flying cars, but these people have
  been using just a plain stick...") — vivid, independently re-confirmed this session via a fresh
  search, but felt like too much text for either the email or the LinkedIn message; held in reserve for
  a longer version.
