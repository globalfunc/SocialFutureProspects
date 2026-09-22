# Invitation email — Elin Williams (`elin-williams`, matchRating 5)

Status: drafted, pending Stoyan sign-off. Not yet sent.

**Folder/id note:** `elin-williams` is the actual id from `data/blind_leads_list.json` and needs no
cleanup — no diacritics or special characters to strip, unlike Dirk's or Kürşat's ids.

**Contact / addressing decision — addressed directly to Elin, at her own personal blog email, not
routed through Disability Wales:**

The row's `contact` field says `elin@myblurredworld.com`, "confirmed directly on
myblurredworld.com's own contact page." Re-checked today: still live and current — the contact page
still reads "Get in touch by emailing elin@myblurredworld.com, or by using the contact form below."
No staleness issue here, unlike Dirk's row.

Her LinkedIn (supplied by Stoyan this session) shows her day job is Marketing and Communications
Officer at Disability Wales (part-time, May 2020–present) — confirmed independently by Disability
Wales's own staff page (disabilitywales.org/about/staff/elin-williams/), which lists that exact job
title but does **not** publish a staff email address. That day job is a separate professional
context from what this campaign is asking her for (her own self-made blogger/advocate story, per
the mission paragraph's "influencers, and other self-made people with disabilities" framing), so
routing through her employer isn't the right move even if an address were available — same
reasoning as Holly Tuke's, not Dirk's. The email is addressed to Elin personally, at the address she
publishes for exactly this kind of contact.

Sources used: `data/blind_leads_list.json` (`elin-williams` row); myblurredworld.com's own Contact
and About pages (fetched 2026-09-17); Elin's English Wikipedia page (fetched 2026-09-17); Disability
Wales's staff page for Elin Williams and her author archive on disabilitywales.org (fetched
2026-09-17); Disability Wales's own press materials on the "Disabled People's Manifesto 2026–2031"
(fetched 2026-09-17); Elin's own LinkedIn "About" and "Experience" sections (pasted in by Stoyan,
2026-09-17). No fact below goes beyond those sources.

---

## Email

```
Subject: Invitation to an International Online Conference for People with Disabilities

Dear Elin,

On 29 September 2026, from 12:00 PM to 3:00 PM Eastern European Summer Time (EEST) (10:00 AM to
1:00 PM your time, BST), the "Social Future" Foundation (Jamba – Career for All) is organizing an
international online conference on the topic "Adapting Workplaces for People with Disabilities." The foundation's
mission is to support young people with disabilities in Bulgaria in their career development,
education, and employment in the Bulgarian labour market. We are looking for employers of people
with disabilities, or inspiring success stories of self-made entrepreneurs, influencers, and other
self-made people with disabilities. We think your work founding the blog "My Blurred World" in
2015 — writing openly about your own experience of living with retinitis pigmentosa since
childhood, and building it into an award-winning platform recognised on the BBC's 100 Women list
in 2020 — together with the advocacy you've carried into your role as Marketing and Communications
Officer for Disability Wales, including talks to government and schools and writing for the BBC
and The Guardian, is exactly the kind of story we would love to share with people with disabilities
in Bulgaria, to inspire them to seek new opportunities for development and steady employment. The
conference will take place on the Zoom platform, and we will arrange your specific speaking time
once you accept our invitation. We are also able to include a short presentation from you, if you
wish. The conference will have two-way interpretation between Bulgarian and English, and a
sign-language interpreter for deaf participants; the materials will later also be adapted for young
people with intellectual disabilities. Your speaking slot will be 20 to 25 minutes — about 15
minutes for your presentation and the rest for questions from the organizers and the audience. We
will run a connection test the day before the event, and we'll be in touch about that beforehand.
The access link will be posted on our social media channels, and we will also share it with you
directly in case you'd like to pass it on to your own partners or community.

This is the third in a series of conferences dedicated to raising public awareness of employment
issues facing people with disabilities in Bulgaria. It would be both a privilege and a pleasure to
have you join us.

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

**Send to:** elin@myblurredworld.com (see addressing decision above). No LinkedIn message drafted
this round, per instruction.

---

## Praise-sentence sourcing (fact-by-fact)

- "founding the blog 'My Blurred World' in 2015" — `careerBackground` field ("Created 'My Blurred
  World' blog in April 2015"); corroborated by her own LinkedIn ("Blogger, My Blurred World, Apr
  2015 – Present") and myblurredworld.com's About page.
- "living with retinitis pigmentosa since childhood" — `careerBackground` field ("Diagnosed with
  retinitis pigmentosa; vision loss began around age 3, diagnosed age 6, registered blind/sight
  impaired by age 12"); corroborated by English Wikipedia (same timeline, adds that her eyesight
  deteriorated further during her GCSEs, requiring a switch from large print to braille — that
  extra detail isn't used in the email itself, see "not used" below).
- "an award-winning platform recognised on the BBC's 100 Women list in 2020" — `reputationActivity`
  field ("Named in BBC's 100 Women list (2020)"); corroborated by Wikipedia and her own LinkedIn
  ("featuring in the BBC's 100 Women list 2020"). "Award-winning" is corroborated by her LinkedIn's
  own claim of "winning two awards at the Teen Blogger Awards 2018."
- "your role as Marketing and Communications Officer for Disability Wales" — not in the original
  row (which only listed her as "Blogger... freelance writer"); added from her LinkedIn
  ("Marketing and Communications Officer, DISABILITY WALES/ANABLEDD CYMRU, Part-time, May 2020 –
  Present") and independently confirmed by Disability Wales's own staff page, which lists the
  identical job title.
- "talks to government and schools" — her LinkedIn ("delivering talks to government and schools").
  This **updates** the row's `priorPublicSpeaking` field, which stated "no specific
  conference-keynote appearance confirmed" — that's still accurate as far as *conference keynotes*
  go, but her own LinkedIn shows a real public-speaking record (panels, talks to government and
  schools, TV/radio appearances on BBC Wales, ITV, and S4C), so the email doesn't claim conference
  experience she doesn't have, but does credit the talks she's actually given.
- "writing for the BBC and The Guardian" — `roleOrganization` field ("freelance writer (BBC, The
  Guardian)"); corroborated by her own LinkedIn ("My words have also featured on BBC World News...
  and The Guardian") and myblurredworld.com's About page (BBC World Service, BBC News, The
  Guardian).

Local-time mention: corrected event slot is 12:00–15:00 EEST → converts to **10:00–13:00 BST** for
Wales, matching `localTimeInSlot` in `data/blind_leads_list.json` ("10:00-13:00 BST (ideal)",
`tzDiffHours: -2`) — already in the corrected form, same as Holly Tuke's UK conversion.

---

## Not used (true, but held back, or not solid enough to state as settled fact)

- **Shaw Trust Disability Power 100 List, 2018** — well-corroborated (her own LinkedIn, plus a web
  search summary of her About page), a genuinely strong credential, but the praise clause already
  names one specific award (BBC 100 Women) plus the "award-winning" framing; a second named list
  risked overloading the sentence. Easy to add back in if Stoyan wants a fuller version.
- **TV and radio appearances (BBC Wales, ITV, S4C)** — per her own LinkedIn, true and notable, but
  left out to keep the public-speaking clause to one clean phrase ("talks to government and
  schools") rather than stacking media formats.
- **Able Magazine and VICTA UK writing/blogging credits** — Able Magazine per LinkedIn ("Writer, Nov
  2018 – Dec 2019") and myblurredworld.com's About page; VICTA UK per her LinkedIn ("Blogger,
  freelance, Jan 2020 – Mar 2021," writing for VICTA's Parent Portal on sight loss for parents).
  Both true, but BBC and The Guardian are the stronger-recognition names to lead with, and the
  sentence was already carrying enough named credits.
- **Mentor to young visually-impaired people** — the row's `pwdAtRelevance` field states this; a web
  search summary of myblurredworld.com's About page corroborated it as "current mentor for LOOK UK,"
  but that wasn't independently re-confirmed against a primary LOOK UK source today, and her own
  LinkedIn (the more authoritative source pasted in this session) doesn't mention LOOK UK at all.
  Left out rather than stated as settled fact given the source is secondary and unconfirmed by her
  own profile.
- **RNIB roles** — one year working at RNIB per Wikipedia, and a more specific "Trainee Community
  Development Assistant, RNIB, Sep 2016 – Aug 2017" per her LinkedIn (newsletter writing,
  reception/enquiries, running social and IT groups for vision-impaired people, 1-to-1
  iPhone/iPad demonstrations, translating Welsh/English documents). True and relevant to disability
  employment, but this is past employment (ended 2017), not part of her current advocacy story, so
  left out to keep the sentence focused on what she's doing now.
- **Bangor University research support officer, VICTA Young Ambassador (2018)** — per Wikipedia/row
  data and her LinkedIn; general-interest career history but not disability-story-relevant enough
  to include.
- **Disabled People's Manifesto 2026–2031 (Disability Wales)** — she's listed as an author on
  Disability Wales's site with articles through September 2026, and the manifesto itself (launched
  December 2025, ahead of the May 2026 Senedd election) is a genuinely current, high-profile piece
  of work. Not used because her specific personal contribution to it isn't clearly documented in any
  source found today (the search results confirm she's a listed author at Disability Wales, not that
  she authored or led the manifesto specifically) — flagging as a possible detail to firm up and add
  if Stoyan wants a stronger "current work" mention than the general job-title reference already in
  the email.
- **ME/CFS diagnosis as a teenager** — mentioned in one secondary source (a web-search summary of
  her About page), not in the row data or her LinkedIn. Not corroborated by a primary source, and
  not part of the story being pitched here, so excluded.
- **Deterioration during GCSEs requiring a switch from large print to braille** — per English
  Wikipedia, true and corroborates the general vision-loss timeline, but adds detail beyond what the
  row already states without adding to the pitch; left out to keep the sentence tight.
