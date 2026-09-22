# Invitation email — Cornel Amariei (`cornel-amariei`, matchRating 5)

Status: drafted, pending Stoyan sign-off. Not yet sent.

**This file is different from the others in this folder:** the personal opening/body paragraph
below was written by Stoyan, not synthesized by Claude from the row. That paragraph's wording and
content have **not** been rewritten or rephrased — only fact-checked against research, with any
unconfirmed claim flagged rather than silently accepted. The template scaffolding (event
logistics paragraph, "third in a series," 5-day reply request, signature/footer) has been added
around it, matching the shape used in the Holly Tuke / Seema Flower / Srikanth Bolla / etc. files.

## Fact-check of Stoyan's draft, claim by claim

- **"Lumen glasses startup: the results, beta testers feedback, the science and technology behind
  it" — CONFIRMED, well corroborated.** .lumen's glasses have been publicly reported as tested by
  400+ visually impaired users across ~40 countries (letsenvision.com, CES 2024 coverage), with a
  specific published trial of 27 visually impaired participants in Bucharest (Oct–Nov 2023,
  covered in an academic usability study, *European Journal of Public Health*). The company won a
  CES 2026 Innovation Award (Accessibility & Longevity) and the CES 2026 Eureka Park pitch
  competition, and describes its underlying tech as adapted from autonomous-vehicle/"Pedestrian
  Autonomous Driving" principles — matching the row's `pwdAtRelevance` field. Nothing in "the
  results, beta testers feedback, the science and technology" overstates what's publicly reported.

- **"Your personal story as the only [healthy] one child in a family of people with disabilities"
  — CONFIRMED, independently corroborated, but not from a single authoritative primary source.**
  Multiple independent outlets converge on the same facts: his parents are polio survivors who met
  in a sanatorium and live with locomotor disabilities, and his sister has cerebral palsy/a
  cerebral disability. On whether Cornel himself is the only unaffected family member specifically:
  - blockleaders.io states outright: "his sister, nephews, and cousins struggled with mental and
    physical challenges, yet Amariei was untouched by these ailments," making him "the family's
    pillar of support."
  - A separate search-engine summary of family-background sources (not independently re-fetchable
    as a single URL) states he was "born into a family where everyone, except him, has some form
    of disability," calling him "the only healthy child in his immediate family."
  - JA Worldwide's profile and businesshalloffame.org both confirm the parents'/sister's
    disabilities but do **not** themselves state Cornel is the only unaffected member — that
    specific framing comes from blockleaders.io and secondary summaries, not from JA Worldwide or
    the Business Hall of Fame page directly.
  - **The likely primary source for this exact framing, The Recursive's profile piece** ("...from
    growing up in a family with disabilities to building high-tech glasses..."), **is paywalled**
    — its headline and subhead confirm the family-with-disabilities premise, but the full article
    (which likely contains the original, most-detailed telling of this story) could not be
    fetched today to verify wording directly.

  **Net: the claim is corroborated across independent sources and not contradicted anywhere, so
  it is safe to send — but it rests on secondary retellings of what appears to be one original
  story, not on a verified primary-source quote.** No fact beyond "parents disabled by
  polio-related locomotor conditions, sister has cerebral palsy, Cornel unaffected" is
  independently confirmed — no specific ages, no birth order beyond "sister," nothing about
  nephews/cousins is claimed in the draft and none of that has been added.

## Contact / addressing decision — the row's contact info is wrong, don't use it

**Flagging this before anything else: the row's `profileUrl` field ("lumen.me") points to a
completely different, unrelated company.** `lumen.me` is the website of "Lumen," a handheld
metabolic/breath-testing device for fitness and nutrition — nothing to do with assistive
technology or Cornel Amariei. This looks like a data-entry mix-up (confusing the product name
"Lumen" with the unrelated wellness-tech company of the same name) and should be corrected in the
row.

The row's `contact` field ("Contact form at lumen.me (not individually verified this session)") is
therefore also wrong, since it points at the wrong domain. **The correct, current official site is
`dotlumen.com`.** Its own Contact page (fetched today) lists a direct, general-purpose email:
**`contact@dotlumen.com`** ("For support, information, anything at all"), plus a contact form on
the same page. No named press or speaker-relations contact is listed separately — inquiries route
through that one address. No personal email address for Cornel Amariei himself was found anywhere
public today (expected — he's a startup founder/CEO, not typically listing a personal inbox).

**Recommendation: send to `contact@dotlumen.com`, addressed to Cornel by name in the body** (as
Stoyan's draft already does), rather than to any address derived from the row. This is a company
inbox rather than his personal address, so there's a mild risk of routing delay — worth a LinkedIn
message in parallel (see below) as a backup channel, which the row's `profileUrl` correction makes
possible now that his actual company (and his own LinkedIn, findable via dotlumen.com/team or
LinkedIn's company page for dotLumen) can be identified correctly.

## Timezone — no conversion needed

Romania (Bucharest) and Bulgaria (Sofia) are both on Eastern European Summer Time (EEST) on
29 September 2026 — the row's `tzDiffHours: 0` and `localTimeInSlot` are correct. The event slot
(12:00 PM – 3:00 PM EEST) is therefore his local time exactly; the email states it once, with no
"your time" conversion needed, unlike the other prospect files.

## A note on the draft's phrasing — flagged, and Stoyan approved both fixes below

- The salutation "Hi Mr. Cornel Amariei" mixed a casual opener ("Hi") with a formal title + full
  name; the other files in this project use either "Dear [First name]," or "Hi [First name] —".
  **Changed to "Hi Cornel," in the email below**, per Stoyan's approval.
- "the only one healthy child" read as a typo for "the only healthy child." **Corrected to "the
  only healthy child" in the email below**, per Stoyan's approval.
- Otherwise the paragraph reads clearly and its claims all check out per the fact-check above.

## Sources used

`data/blind_leads_list.json` (`cornel-amariei` row); dotlumen.com's own Contact page
(fetched 2026-09-18); lumen.me homepage (fetched 2026-09-18, confirmed unrelated company);
blockleaders.io, "Glasses for the Blind" (fetched 2026-09-18); businesshalloffame.org, Cornel
Amariei laureate profile (fetched 2026-09-18); jaworldwide.org, "Cornel Amariei" story page
(fetched 2026-09-18); therecursive.com, "Cornel Amariei's journey: from growing up in a family
with disabilities to building high-tech glasses that empower the blind" (headline/subhead visible,
full article paywalled, checked 2026-09-18); letsenvision.com, "Assistive Tech at CES 2024:
Spotlight on dotLumen's Haptic Navigation Smart Glasses" (via search summary, 2026-09-18); Oxford
Academic / *European Journal of Public Health*, "Usability of an AI-based independent pedestrian
navigation device designed for blind people" (via search summary, 2026-09-18); romania-insider.com
coverage of .lumen's CES 2026 Innovation Award and EIC funding history (via search summaries,
2026-09-18); eu-startups.com / eiturbanmobility.eu / romania-insider.com coverage of the October
2025 €11M PABLO delivery-robots grant (via search summaries, 2026-09-18) — noted for context only,
not used in the email since it concerns a separate robotics project, not the glasses themselves.
No fact in the email goes beyond those sources.

Not fetchable / not used: `jaeurope.org` team page, `a-speakers.com`, `speakersassociates.com`,
`thespeakerhandbook.com`, `constructor.university` alumni page, `techsylvania.com`, and
`en.everybodywiki.com` all surfaced in search results with consistent biographical summaries but
were not individually fetched today (the facts they'd add — awards, JCI honor, Forbes 30-under-30
nomination — aren't used in the email and don't affect the claims that are).

---

## Email

```
Subject: Invitation to an International Online Conference for People with Disabilities

Hi Cornel,

We are truly impressed by your Lumen glasses startup: the results, beta testers feedback, the
science and technology behind it. We would like to invite you to an International Online
Conference "Adapting the workplace for people with disabilities" hosted by the Bulgarian "Social
Future" foundation (Jamba - Careers for all). It is part of an EU program for people with
disabilities that will take place on 29th of September (12:00 PM - 3:00 PM EEST Bulgaria, Sofia —
the same timezone as Bucharest, so no conversion needed on your end). We would love to have you (or
a representative of the Lumen company) to do a quick intro on the technology and its potential for
changing the lives of the blind and visually impaired individuals. You can include a demo video or
presentation as you see fit. Your personal story as the only healthy child in a family of
people with disabilities is impressive and very inspirational and may bring true hope and
motivation to people with disabilities and their families.

The assigned slot per speaker is 25 minutes (15 minutes of presentation time + 10 minutes Q&A).
Since we do not have a dedicated budget for speakers consider this a warm invitation to present
your product and personal story to the Bulgarian blind community as a purely volunteering opportunity. We would
greatly appreciate any feedback from your side even if you cannot attend in person.

The conference will take place on the Zoom platform. The conference will have two-way
interpretation between Bulgarian and English, and a sign-language interpreter for deaf
participants; the materials will later also be adapted for young people with intellectual
disabilities. We will run a connection test the day before the event, and we'll be in touch about
that beforehand. The access link will be posted on our social media channels, and we will also
share it with you directly in case you'd like to pass it on to your own partners or community.

This is the third in a series of conferences dedicated to raising public awareness of employment
issues facing people with disabilities in Bulgaria. It would be both a privilege and a pleasure to
have you join us.

Please reply within 5 days of receiving this email so we can plan the programme and confirm your
exact speaking time.

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

## LinkedIn invitational message

```
Subject: Speaking invitation — International Online Conference for People with Disabilities

Hi Cornel — I'm reaching out from the "Social Future" Foundation in Bulgaria. We're organizing an
international online conference on 29 September (Adapting the Workplace for People with
Disabilities), and we'd love to have you or a Lumen representative join for a short intro on the
glasses and their potential for blind and visually impaired people — a demo video or presentation
is welcome too. It's a volunteer speaking slot (25 min: 15 presenting + 10 Q&A), and since
Bucharest and Sofia share a timezone, there's no time-conversion headache. Happy to send full
details by email if you're open to it.
```
