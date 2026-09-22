# Invitation email — Dirk Müller-Remus (`dirk-m-ller-remus`, matchRating 5)

Status: drafted, pending Stoyan sign-off. Not yet sent.

**Folder/id note:** `dirk-m-ller-remus` is the actual id from `data/blind_leads_list.json`
(umlaut stripped, matching the existing pattern for other umlaut names in this dataset —
`hans-j-rgen-wiberg`, `ma-l-fabien`, `k-r-at-ceylan`). Used as-is; not flagging for cleanup since
it's consistent with the rest of the dataset, not a one-off inconsistency.

**Contact / addressing decision — addressed directly to Dirk, at his own personal email, not
routed through auticon:**

The data row's `contact` field says "auticon.com contact form (current Group CEO is Luke Williams
OBE — worth cc'ing)," which reads as if Dirk is still reachable through auticon's own channels.
Research today shows that's out of date: per Dirk's own LinkedIn experience section (supplied by
Stoyan this session), his title at auticon was **"Founder and General Manager," Nov 2011 – Dec
2016** — he left operational leadership of auticon almost a decade ago, within months of the
Virgin Group/Branson investment (Oct 2016) that the row cites. Luke Williams OBE became Group CEO
of the *current* auticon on 1 January 2025 (auticon's own press release), running a company Dirk
hasn't been on the staff of since 2016 — cc'ing him would put a stranger's founder-era pitch in
front of the wrong company's current leadership, not get it to Dirk.

Since leaving auticon, Dirk's LinkedIn shows a clear, continuous professional line: co-founder,
Diversicon (Jan 2017 – Jun 2018) → self-employed speaker, "Dirk Müller-Remus Consulting" (Jul 2018
– Dec 2024) → co-founder, neuroTime (Jan 2021 – present) → founding member, Verband
Neurodiversität (Mar 2024 – present). His own professional website,
**www.mueller-remus.de** (speaker/consulting site, "Dirk Müller-Remus Coaching & Vortragsredner"),
lists a direct personal contact address: **dirk@mueller-remus.de**. That is the address this email
should be sent to — his own current professional inbox, not a decade-old company's general form.

This is a different shape of routing decision than Claire Sisk's (there, an active talent agent is
the correct gatekeeper for a still-working performer). Here there's no gatekeeper to route
through at all — once you know he's no longer at auticon, the direct personal address he
publishes himself is simply the right contact, and no cc is needed.

Sources used: `data/blind_leads_list.json` (`dirk-m-ller-remus` row); Dirk's own LinkedIn
"Experience" section (pasted in by Stoyan, 2026-09-17); English Wikipedia
("Auticon"); German Wikipedia ("Dirk Müller-Remus"); the Irish Times, *"The German firm finding
tech careers for autistic people"* (irishtimes.com, 2016); EU-Startups, *"Auticon: the social
enterprise employing people on the autism spectrum"* (eu-startups.com, 2019); auticon's own press
release, *"auticon Announces Group CEO Transition: Kurt Schoffer Retires, Luke Williams Appointed
as New Group CEO"* (auticon.com, 2024); and Dirk's personal site, mueller-remus.de (fetched
2026-09-17). No fact below goes beyond those sources.

---

## Email

```
Subject: Invitation to an International Online Conference for People with Disabilities

Dear Dirk,

On 29 September 2026, from 12:00 to 15:00 Eastern European Summer Time (EEST) (11:00–14:00 your
time, CEST), the "Social Future" Foundation (Jamba – Career for All) is organizing an international
online conference on the topic "Adapting Workplaces for People with Disabilities." The foundation's
mission is to support young people with disabilities in Bulgaria in their career development,
education, and employment in the Bulgarian labour market. We are looking for employers of people
with disabilities, or inspiring success stories of self-made entrepreneurs, influencers, and other
self-made people with disabilities. We think your story of founding auticon in Berlin in 2011 —
after your son Ricardo's Asperger's diagnosis, and a workshop where autistic adults spoke about
their struggle to find work despite their qualifications — building it into a company that has since grown to 552 employees across
15 countries, together with the work you've continued since then - founding Diversicon and now
neuroTime, and building a career as a speaker on neurodiversity in the workplace, is exactly the
kind of story we would love to share with people with disabilities in Bulgaria, to inspire them to
seek new opportunities for development and steady employment. The conference will take place on
the Zoom platform, and we will arrange your specific speaking time once you accept our invitation.
We are also able to include a short presentation from you, if you wish. The conference will have
two-way interpretation between Bulgarian and English, and a sign-language interpreter for deaf
participants; the materials will later also be adapted for young people with intellectual
disabilities. Your speaking slot will be 20 to 25 minutes — about 15 minutes for your presentation
and the rest for questions from the organizers and the audience. We will run a connection test the
day before the event, and we'll be in touch about that beforehand. The access link will be posted
on our social media channels, and we will also share it with you directly in case you'd like to
pass it on to your own partners or community.

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

**Send to:** dirk@mueller-remus.de (see addressing decision above). No LinkedIn message drafted
this round, per instruction.

---

## Praise-sentence sourcing (fact-by-fact)

- "founding auticon in Berlin in 2011" — `careerBackground` in `data/blind_leads_list.json`;
  corroborated by his LinkedIn ("Founder and General Manager, auticon GmbH," Nov 2011 – Dec 2016),
  German Wikipedia ("Auticon GmbH im November 2011"), and English Wikipedia.
- "after your son Ricardo's Asperger's diagnosis" — `careerBackground` field; corroborated by the
  Irish Times (2016), which names the son Ricardo and states the diagnosis came at age 14. (German
  Wikipedia corroborates a 2007 Asperger's diagnosis for "one of his four children" but doesn't name
  the child — the name comes from the Irish Times and the pre-existing row data, not independently
  re-confirmed by a second English-language source today.)
- "a workshop where autistic adults spoke about their struggle to find work despite their
  qualifications" — `careerBackground` field ("a workshop where 25 unemployed but highly educated
  autistic adults spoke about their struggles"); EU-Startups (2019) corroborates the workshop story
  but gives the attendance as 20, not 25 — flagging this **numeric discrepancy** rather than
  guessing which is right, which is why the email itself doesn't state a headcount.
- "a company that drew investment from Richard Branson's Virgin Group in 2016" — `reputationActivity`
  field ("Virgin Group and Esmee Fairbairn Foundation invested in 2016"); English Wikipedia
  corroborates the October 2016 investment and states Branson publicly endorsed the company.
- "has since grown to 552 employees across 15 countries" — `pwdAtRelevance` field, verbatim;
  corroborated by English Wikipedia's 2024 employee/country figures.
- "founding Diversicon" — Dirk's LinkedIn ("Co-Founder, Diversicon," Jan 2017 – Jun 2018); German
  Wikipedia corroborates (with René Kuhlemann, offering job placement for autistic people beyond IT).
- "and now neuroTime" — Dirk's LinkedIn ("Co-Founder, neuroTime," Jan 2021 – present, building
  digital tools for people with impaired time perception: autism, intellectual disability,
  dementia/Alzheimer's, children). Note: a web search surfaced a secondary claim that neuroTime was
  "founded in 2024," which conflicts with Dirk's own LinkedIn start date of Jan 2021 — his own
  profile is treated as authoritative here.
- "building a career as a speaker on neurodiversity in the workplace" — Dirk's LinkedIn
  ("Vortragsredner / Speaker, Dirk Müller-Remus Consulting," Jul 2018 – Dec 2024); corroborated by
  his own site, mueller-remus.de, which describes him as a keynote speaker on "alternative
  thinkers," autism/ADHD in the workplace, and the auticon story. This also substantiates the row's
  `priorPublicSpeaking` note ("founder gives regular interviews").

Local-time mention: corrected event slot is 12:00–15:00 EEST → converts to **11:00–14:00 CEST**,
matching `localTimeInSlot` in `data/blind_leads_list.json` ("11:00-14:00 CEST (ideal)",
`tzDiffHours: -1`) — that field was already stated in the corrected (post-14:00–17:00-EET-fix)
form, so no further adjustment was needed.

---

## Not used (true, but held back, or not solid enough to state as settled fact)

- **Federal Cross of Merit (Bundesverdienstkreuz am Bande), 2021** — well-corroborated (Berlin.de's
  own press release, berliner-woche.de) and genuinely a strong credential, but adding a fourth
  distinct achievement risked overloading an already-long praise sentence. Strong candidate to add
  back in if Stoyan wants a fuller version.
- **Körber Foundation "Zugabe" prize (2021) and German Founder Prize special award (2015)** — both
  from German Wikipedia; same reasoning as above, held in reserve rather than stacking further
  awards into one sentence.
- **Founding member, Verband Neurodiversität, since March 2024** — true per LinkedIn (his most
  recent role), but the email already names three post-auticon ventures (Diversicon, neuroTime,
  and his speaking practice); a fourth felt like it diluted rather than strengthened the sentence.
  Easy to swap in if Stoyan prefers it over one of the others.
- **Pre-auticon corporate career** — software developer at Siemens (1988), DeTeWe management board
  (from 1999), CEO of NovaVision AG (2005–2011) — all per German Wikipedia. Accurate, but this
  campaign's mission paragraph is about the self-made/disability-employment story, not his general
  corporate CV, so it's left out.
- **neuroTime patent co-holder** — a web-search summary mentioned Dirk as co-holder of a patent for
  a "display device" for sequencing events/activities. Not corroborated against a primary patent
  record today, so it's excluded as unverified rather than stated as fact.
- **Diversicon's "142 autistic persons supported by 2021" figure** — German Wikipedia states this,
  but it conflicts in timing with Dirk's own LinkedIn, which shows him leaving Diversicon in June
  2018 (i.e., the 2021 figure describes the company after his own departure). Left out rather than
  attributed to him personally.
- **Row `contact` field's "worth cc'ing" suggestion (Luke Williams OBE)** — addressed at length in
  the addressing-decision note above; not used, since research shows it would misroute the email to
  a company Dirk hasn't worked at since 2016.
- **Two different-looking Dirk Müller-Remus LinkedIn URLs** turned up in search
  (`de.linkedin.com/in/dirk-mueller-remus` and `.../dirk-mueller-remus-904413aa`) — not resolved
  which is the current/canonical profile, since no LinkedIn message is being drafted this round.
  Flagging for whoever picks up a LinkedIn message for him later — worth confirming which one is
  live before sending anything there.
