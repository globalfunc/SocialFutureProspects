# Invitation email — Rachael Mole (`rachael-mole`, matchRating 4)

Status: drafted, pending Stoyan sign-off. Not yet sent.

**Tone note:** written in the **more formal register used for Amar Latif OBE and Ashish Goyal**
("Dear Ms. Mole," / no contractions / "Sincerely" close), not the warmer Holly Tuke/Elin
Williams/Luke Christian register. Reasoning, per the task's instruction to decide and justify
rather than default: this invitation is going through a **public, structured professional-services
contact page** (`rachaelmole.com/work-with-rachael`), not a personal social inbox or an
intermediary organization's generic enquiry line. That page itself organizes enquiries into four
named "engagement types" (board/advisory, consultancy, strategy work, and speaking) the way a
public figure's speaker-booking page does, not the way a casual personal contact form does — the
same signal that put Amar Latif's site in the formal camp. She is also a sitting advisor to a UK
government committee (DPTAC, see below) and a Churchill Fellow, which reads closer to Amar
Latif/Ashish Goyal's public-professional register than to the smaller, personal scale of Luke
Christian's or Holly Tuke's stories. The LinkedIn message is sent separately in the warmer,
conversational register used throughout, per the established formal-email/warm-LinkedIn split.

## The `status: "existing"` field — checked, not assumed

Same check as run on Luke Christian's and Amar Latif's rows: `design.md` defines `status` only as
`"existing" | "new"` with no further meaning given, and this row's own `outreachStatus` reads "Not
sent" — the same value carried by "new" rows too. Nothing found in today's research (her own sites,
press, SIC's team page, LinkedIn) suggests any prior contact attempt from this campaign.
**Conclusion: treating this as first contact**, consistent with the reading already established for
other "existing" rows.

## Contact / addressing decision — verified today, not assumed from the row

The row's `contact` field read "Not found yet — search SIC official site" and `profileUrl` read
"(verify URL)." Checked properly rather than guessed:

1. **SIC's own current team page** (`sicofficial.co.uk/meet-the-team`, fetched 2026-09-18) lists
   **Alice Hargreaves as SIC's current CEO**, describing Rachael only in SIC's origin story ("SIC
   was created by Alice Hargreaves and Rachael Mole back in February 2021. Both Alice and Rachael
   had experienced barriers in the workplace due to their disabilities.") — with **no current role,
   bio, or contact route for Rachael on that page at all.** Routing an invitation through SIC's own
   site would not reach her. **Ruled out.**
2. **Her personal site's own engagement page**, `rachaelmole.com/work-with-rachael` (fetched
   2026-09-18), is the route specified in the task, and it checks out on inspection rather than by
   assumption: the page's own copy groups everything she takes on into four named categories — board
   and advisory roles; consultancy/strategic projects (via Moleworks Solutions); strategy and
   organisational-development work; and, distinctly, **"Talks, keynotes, and workshops"** —
   described on her own site as speaking to audiences on topics like "Using AI as a reasonable
   adjustment" and "Designing work that works for everyone," offered as "keynotes, workshops,
   panels, or webinars." A conference speaking invitation falls squarely inside that named category,
   not into the consultancy or advisory ones — this is the same "is this actually the speaking
   route, not a sales/enquiry route" check the Amar Latif draft ran on `amarlatif.com/contact`, and
   it passes.
3. **Inspecting the form itself** (fetched the page's raw markup directly, 2026-09-18, since the
   rendered text alone didn't expose the field structure): it is a plain Squarespace contact block
   with exactly three fields — **Name, Email, Message** — and **no category dropdown or subject
   field**. So there is nothing to select; the invitation is framed entirely through the Message
   text itself. Per the task's instruction for a form with no dedicated subject field, the subject
   line is pasted as the literal first line of the Message field below, the same convention used on
   Amar Latif's and Luke Christian's drafts.

**Row update:** `contact` → the resolved form route, noting the field structure and that her own
"Talks, keynotes, and workshops" category covers this; `profileUrl` → `rachaelmole.com` (her own
current site, fetched and confirmed live today), in place of `(verify URL)`.

## Career facts — cross-checked against the row, not just repeated from it

- **"Built SIC specifically around the 'workplace culture, not disability inclusion' framing"**
  (the row's `careerBackground`) — this is the single most solidly corroborated fact in this file.
  **Charity Digital's own article**, "How to make recruitment disability-inclusive" (fetched
  directly today, published 14 March 2023, byline identifying her as "CEO and founder of SIC"),
  quotes her **verbatim**: *"It's workplace culture, not disability inclusion."* This is the exact
  phrase the row's `verificationStatus` ("Verified (Charity Digital quoted)") points to, and it is
  confirmed today as a direct quote, not a paraphrase.
- **"Vocal media commentator on performative vs. substantive inclusion practices"** (the row's
  `reputationActivity`) — also corroborated in the same Charity Digital piece, where she is quoted
  describing employers who "want to hire us (disabled people) but are already asking questions like
  'how can we let go of them?'" and states plainly: *"This shows it's performative."* **One
  distinction worth flagging honestly:** the row's `notes` field uses the phrase **"inclusion
  theatre"** as a description of this stance — that specific two-word phrase does not appear
  verbatim in any source found today (it reads as a reasonable editorial gloss on the "performative"
  quote above, not a direct quotation of hers). Nothing below attributes "inclusion theatre" to her
  as a quote; the email instead uses the verified verbatim quote.
- **Reasonable adjustments are usually free, not expensive** — a related, well-corroborated point
  from the same article ("Many reasonable adjustments are just work culture changes. Proper sick
  leave, flexible working, working from home... they're totally free.") — true and on-brand, but not
  used in the email itself; see "Not used" below.
- **Disabled since age 12** — stated on her own Sounddelivery Media spokesperson bio
  (sounddelivery.org.uk, accessed via search summary today) and repeated in an f:Entrepreneur bio
  page; no specific condition or diagnosis is named in either source, and none is guessed at here.
  Not used in the email — see "Not used" below.

## A material discrepancy found and flagged, not silently corrected in the row

**The row's `roleOrganization` — "CEO & Founder, SIC" — appears to be out of date.** SIC's own
current team page (fetched today) lists **Alice Hargreaves as SIC's current CEO** and describes
Rachael only in the founding story, with no current title or role for her on that page. Independent
sources checked today are consistent with this: her own site (`rachaelmole.com`, fetched today)
describes her current work as **founder / Managing Director of Moleworks Solutions**, "a research
and consultancy practice supporting organisations to adopt AI responsibly, design inclusive systems,
and embed accessibility into how they operate and grow" — with no mention of a current SIC title.
The task asked only that `contact` and `profileUrl` be resolved in the row, so `roleOrganization` is
being **flagged here rather than silently rewritten**; Stoyan should confirm before that field is
changed. The email below does not describe her as SIC's current CEO — it credits her, accurately,
with **co-founding** SIC in 2021 (a past-tense fact every source agrees on) and describes her current
work at Moleworks Solutions in the present tense, rather than asserting a title that may no longer
be current.

## The 2025/2026 update — the "recent, ongoing" beat

Not in the row at all: since founding SIC, Rachael has moved into a broader role as an
**accessibility and AI specialist**. Corroborated across her own site and Moleworks Solutions' own
"About" page (both fetched today): she is **Managing Director of Moleworks Solutions**, a
consultancy on responsible AI adoption and accessibility; a **2023 Churchill Fellow**, for
international research on inclusive work cultures (her own Moleworks blog post on the fellowship,
fetched today, is a first-person account, not a secondary claim); and an appointed advisor on the UK
**Department for Transport's Disabled Persons Transport Advisory Committee (DPTAC)** — a named,
checkable public appointment, not a vague "advisor" claim. A search summary today also places her
among the UK's **Top 100 Female Entrepreneurs for 2025** (f:Entrepreneur / Small Business Britain).
Her own site additionally lists **February 2026** speaking and webinar activity on AI as a
reasonable adjustment (a UN Zero Project Conference session in Vienna, and a webinar) — used here as
evidence her speaking and advisory work is current and ongoing into 2026, the same role the HF
Holidays handback played in Amar Latif's draft and the STEM collection played in Luke Christian's.

## Timezone and location — verified from current research, not assumed from the row

The row lists `country: "UK"` and `tzDiffHours: -2`. Checked rather than taken as given: her current
LinkedIn profile (fetched today) lists her location as **Howden, East Yorkshire, England**; Moleworks
Solutions' own site separately lists a York, England address for the company. Both are within
England and on the same time zone as the rest of the UK — no relocation outside the UK found in any
source today. British Summer Time (BST) is still in effect on 29 September 2026. The event slot
(12:00 PM–3:00 PM EEST) converts to **10:00 AM–1:00 PM BST**, matching the row's `localTimeInSlot`
("10:00-13:00 BST (ideal)") exactly and using the same conversion already established for Holly
Tuke, Elin Williams, Amar Latif, and Luke Christian's UK rows — no correction needed.

## Sources used

`data/blind_leads_list.json` (`rachael-mole` row); Rachael Mole's own site, home page
(rachaelmole.com, fetched 2026-09-18) and "Work with Rachael" engagement/contact page
(rachaelmole.com/work-with-rachael, fetched 2026-09-18, including its raw page markup to confirm the
contact form's field structure); Moleworks Solutions' own "About" page
(moleworkssolutions.com/about, fetched 2026-09-18) and Churchill Fellowship blog post
(moleworkssolutions.com/blog/the-churchill-fellowship-a-platform-for-change-and-my-journey-towards-inclusive-work-cultures,
accessed via search summary 2026-09-18); SIC's own "Meet the Team" page (sicofficial.co.uk/meet-the-team,
fetched 2026-09-18); Charity Digital, "How to make recruitment disability-inclusive"
(charitydigital.org.uk, fetched directly today, published 14 March 2023 — the source named in the
row's own `verificationStatus` field); her LinkedIn profile, linkedin.com/in/rachael-mole/ (fetched
today via the uk.linkedin.com redirect); Sounddelivery Media spokesperson bio
(sounddelivery.org.uk/spokesperson-network/member/rachael-mole/, accessed via search summary
2026-09-18); f:Entrepreneur "iAlso Top 100" bio page (f-entrepreneur.com, accessed via search summary
2026-09-18, used for the Top 100 Female Entrepreneurs 2025 claim). No fact below goes beyond those
sources.

Not fetchable / not used: The Unwritten's "What I've learned building a business as a disabled
person" and Attendable's guest-blog interview with her (both surfaced in search results with
consistent biographical summaries, not individually fetched — nothing in the email depends on them);
a stray, apparently stale "Rachael Mole - Patchwork Hub | LinkedIn" search-result title (Patchwork
Hub is a separate flexible-working platform; this reads like an out-of-date cached LinkedIn headline
rather than a current affiliation, and is not used for anything — her current LinkedIn content,
fetched directly today, shows Moleworks Solutions instead); MDGroup's "patient experience" interview
(appears to concern a different context for her, not directly relevant, not used).

---

## Email

```
Subject: Invitation to an International Online Conference for People with Disabilities

Dear Ms. Mole,

On 29 September 2026, from 12:00 PM to 3:00 PM Eastern European Summer Time (EEST) (10:00 AM to
1:00 PM your time, BST), the "Social Future" Foundation (Jamba – Career for All) is organizing an
international online conference on the subject of "Adapting Workplaces for People with
Disabilities." The foundation's mission is to support young people with disabilities in Bulgaria in
their career development, education, and employment in the Bulgarian labour market. We are seeking
employers of people with disabilities, or inspiring success stories of self-made entrepreneurs,
influencers, and other self-made people with disabilities. We believe your work is exactly the kind
of story we would be honoured to share with people with disabilities in Bulgaria: co-founding SIC in
2021 around the argument that the barrier to hiring and keeping disabled employees is workplace
culture, not disability itself — "it's workplace culture, not disability inclusion," as you have put
it — and now carrying that same case further through Moleworks Solutions and your work as a
Churchill Fellow and government transport-access advisor, including your recent work on how
artificial intelligence itself can serve as a reasonable adjustment. We believe a story like that
would help inspire young disabled people in Bulgaria to pursue new opportunities for development and
steady employment. The conference will take place on the Zoom platform, and we would arrange your
specific speaking time once you accept our invitation; we are also glad to include a short
presentation from you, should you wish. The conference will provide two-way interpretation between
Bulgarian and English, as well as a sign-language interpreter for deaf participants; the materials
will subsequently be adapted for young people with intellectual disabilities as well. Your speaking
slot would be 20 to 25 minutes in total — approximately 15 minutes for a presentation and the
remainder for questions from the organizers and the audience. We will conduct a connection test the
day before the event and will be in contact beforehand to arrange this. The access link will be
published on our social media channels, and we would also share it with you directly, should you
wish to pass it on to your own network.

This will be the third in a series of conferences dedicated to raising public awareness of
employment issues facing people with disabilities in Bulgaria. It would be both a privilege and a
genuine pleasure to have you join us.

We would be most grateful if you could reply within 5 days of receiving this invitation, so that we
may plan the programme and confirm your exact speaking time. Should you accept, we would also ask
you for a short 1–3 sentence introduction for use in the programme timeline and speaker listing.

Sincerely,
Christian Grigorov
"Social Future" Foundation

—

Christian Grigorov
Project Activities Specialist, Jamba Foundation
"Social Future" Foundation — International Online Conference, 29 September 2026

Conference event page (Jamba): https://jamba.bg/adaptirane-rabotno-myasto/
LinkedIn: https://www.linkedin.com/in/krgrigorov/
```

**Send via:** the contact form at https://www.rachaelmole.com/work-with-rachael (see addressing
decision above). The form has only Name, Email, and Message fields — no subject field and no
category dropdown — so the subject line above is pasted as the literal first line of the Message
field, followed by the body, so whoever reads it can identify this as a speaking invitation before
reading further.

---

## LinkedIn invitational message

```
Subject: A speaking invitation from Bulgaria — flagging it here too!

Hi Rachael — hope this finds you well! I'm Christian, from the "Social Future" Foundation in
Bulgaria. We're putting together an international online conference on 29 September (Adapting
Workplaces for People with Disabilities), and we're looking for inspiring, direct voices to share
with young people with disabilities here in Bulgaria. Your work with SIC — building it around the
idea that it's workplace culture holding disabled people back, not disability itself — and now your
work through Moleworks Solutions and as a Churchill Fellow, including on AI as a reasonable
adjustment, is exactly the kind of thing we'd love people here to hear firsthand. I've just sent a
full invitation through the "Talks, keynotes, and workshops" enquiry route on your website, but
wanted to flag it here directly too, in case it's easier to catch this way. Would love to have you
join us if the timing works!
```

Sent to: https://www.linkedin.com/in/rachael-mole/ — handle verified independently today: fetching
this profile (via its uk.linkedin.com redirect) surfaces content matching her current, confirmed
work (Moleworks Solutions Ltd., location Howden/York, England), not an unrelated namesake. This is
sent in parallel with the email, not instead of it — the email above remains the formal invitation
submitted through her site's contact form.

---

## Not used (true, but held back, or not solid enough to state as settled fact)

- **"Inclusion theatre"** — the row's own `notes` field uses this phrase, but it was not found
  verbatim in any source today; the closest verified quote is her saying a specific hiring
  double-standard "shows it's performative" (Charity Digital, 2023). The email uses that verified
  quote's substance without putting the words "inclusion theatre" in quotation marks as if they were
  hers.
- **"Reasonable adjustments are usually free" (sick leave, flexible working, WFH)** — a genuinely
  strong, well-corroborated point from the same Charity Digital piece, and consistent with the row's
  `pwdAtRelevance`, but the email already carries three named credentials (SIC's founding argument,
  Moleworks Solutions, the Churchill Fellowship/DPTAC/AI work) without adding a fourth distinct claim
  about adjustment costs.
- **Disabled since age 12** — stated on two secondary bio pages (Sounddelivery Media,
  f:Entrepreneur), but neither names a specific condition, and nothing on her own site repeats this
  detail directly; left out rather than restated from secondary sources alone, and because no
  specific disability should be attributed to her without her own primary confirmation.
- **UK Top 100 Female Entrepreneurs 2025 listing** — corroborated via search summary
  (f-entrepreneur.com) but not independently confirmed on a primary Small Business Britain page
  fetched directly today; a real, positive credential, but held back rather than named as a settled
  fact given the search-summary-only sourcing, and because the email already leads with enough named
  credentials.
- **Lloyds Bank Foundation Developmental Partner / Financial Inclusion Commission secretariat
  roles** — surfaced via search summary today (in the same result naming her Churchill Fellowship and
  DPTAC role) but not corroborated on any primary page fetched directly; not used, to avoid stating
  an affiliation that couldn't be checked against a primary source in the time available.
- **Alice Hargreaves as SIC's current CEO** — solidly corroborated (SIC's own team page), and the
  basis for flagging the row's `roleOrganization` as out of date above, but it is a fact about
  someone else's current title, not Rachael's; not stated in the email itself, which focuses on
  Rachael's own founding role and current work rather than on who succeeded her.
