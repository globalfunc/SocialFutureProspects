# Invitation email — Luke Christian (`luke-christian`, matchRating 3)

Status: drafted, pending Stoyan sign-off. Not yet sent.

**Tone note:** written in the **warmer, direct second-person register used for Holly Tuke and Elin
Williams** ("Dear Luke," / "your"), not the more formal Amar Latif/Ashish Goyal register — this goes
straight to Luke's own inbox, there's no gatekeeper reading it first, and the smaller, personal
scale of his story (see below) fits a warmer tone better than a corporate-formal one. The LinkedIn
message is friendly/conversational, as usual, with its own subject line.

## The `status: "existing"` field — checked, not assumed

The task asked whether "existing" means a prior contact attempt or just a source Stoyan already had
on file. Checked against `design.md`'s own data model comment (`status: "existing" | "new"`, no
further definition given) and against the row itself: **`outreachStatus` for this row reads "Not
sent,"** the same as every other row regardless of `existing`/`new` status. 17 of the ~20 rows
sampled around his in the file are also `"existing"`; only a handful (e.g. `peter-korn`,
`r-mi-du-chalard`) are `"new"`. **Conclusion: `existing` vs `new` is about when a candidate entered
Stoyan's research list, not about outreach history — it does not mean Luke has already been
contacted.** Nothing found in research today (press, socials, his own site) suggests any prior
contact from this campaign either. Treating this as a first-contact invitation, same as the other
drafts.

## Contact / addressing decision

**Sending to `mrlukechristian@outlook.com`, supplied directly by Stoyan and treated as verified per
the task instructions.** Corroboration pass run anyway, same rigor as the other drafts:

- This exact address surfaces in web-search-indexed content tied to his `@mrlukechristian`
  Instagram bio, and separately via RocketReach, a third-party contact-data aggregator listing him
  as "DEAF IDENTITY Founder." **Caveat, stated plainly:** both Instagram and RocketReach blocked
  direct page fetches today (Instagram returned only the page title with no bio text; RocketReach
  returned HTTP 403), so this is corroboration via search-engine snippet, not a directly rendered
  primary page — the same evidentiary tier used for a few "accessed via search summary" citations in
  Amar Latif's file, not a step up from it.
- The address is consistent with his established personal-brand handle: he uses `@mrlukechristian`
  across Instagram, X, and YouTube, and owns the personal domain `mrlukechristian.com` (that domain
  did not render usable content for direct fetch today — likely a JS-rendered site — so it's cited
  as evidence of the handle existing, not as a source of any fact below).
- Deaf Identity's own site (`deafidentity.com/aboutus`, fetched today) lists two different brand
  addresses instead: `hello@deafidentity.com` for general/order queries and `luke@deafidentity.com`
  for collaboration enquiries. Neither is the address being used. This is flagged, not treated as a
  contradiction: `mrlukechristian@outlook.com` is his personal address (matching his personal brand,
  separate from the company inbox), which is exactly the kind of address a founder would give out
  directly rather than publish on a storefront's contact page — consistent with, not undermined by,
  the brand site listing different addresses for customer-facing purposes.

**Row update:** the row's `contact` field ("Not found yet — search official brand site/Instagram")
and `profileUrl` field ("(verify URL)") are being resolved in `data/blind_leads_list.json` as part of
this draft, matching the practice already used for Elin Williams's row. `contact` → the verified
outlook address, with a note on its provenance. `profileUrl` → `deafidentity.com` (his brand site,
directly fetched and confirmed live today) rather than `mrlukechristian.com` (exists per search
results, but did not render for direct verification today, so not used as the resolved profile
link). Honesty check per the task's instruction: nothing public independently confirms this personal
email is his beyond the search-snippet/aggregator evidence above — that gap is stated here rather
than papered over.

## Career facts — cross-checked against the row, not just repeated from it

- **"Founded Deaf Identity after his deaf mother expressed frustration at the lack of clothing
  supporting Deaf Awareness Week"** — this is the row's `careerBackground` claim, and it is the
  single most solidly corroborated fact in this file. **Deaf Unity's own feature** (fetched today):
  his mother said, during Deaf Awareness Week, "I wish I had something to wear to show off being
  deaf and to celebrate it! I've looked online and it's all rubbish…" **Yorkshire Post** (accessed
  via search summary today, direct fetch returned HTTP 403 — both sources named in the row's own
  `verificationStatus` field): "the idea for Deaf Identity began to take shape... when Luke's mum
  expressed to him her disappointment at there not being anything for her to wear in support of Deaf
  Awareness Week." Both match the row closely; nothing here goes beyond it.
- **Launched September 2019, after taking redundancy from Next** — Deaf Unity's feature states this
  directly. One other summarized source described "7 years in retail before leaving in May 2019,"
  which is consistent with (not contradicting) a Next redundancy, but wasn't independently
  re-confirmed against a primary page, so only the Deaf Unity–sourced version ("redundancy from
  Next") is used.
- **Deafness runs in his family** — corroborated by every source checked, but the exact number of
  generations is **inconsistent across sources**: Limping Chicken says "4 family generations,"
  Yorkshire Post (search summary) says "at least five generations," and a separate search-summary
  digest says "at least 6 generations." **No specific number is used in the email** because of this
  spread. Yorkshire Post (search summary) additionally states his mother and sister are also deaf —
  true and touching, but not used in the email itself; see "Not used" below.
- **First deaf-owned business to run a pop-up in John Lewis, during Deaf Awareness Week, May 2021**
  — independently corroborated by a dedicated Limping Chicken news item on exactly this
  ("clothing-brand-deaf-identity-to-become-the-first-deaf-owned-business-in-john-lewis-leeds") and
  the Attitude magazine profile (fetched today, referencing the John Lewis pop-up in the same May
  2021 Deaf Awareness Week context).
- **Comic Relief collaboration** — designed clothing/homeware sold via TK Maxx as one of ~10 artists
  for Red Nose Day (search-summary corroboration, "seeing his clothes worn by the likes of Roman Kemp
  and Pixie Lott" described as "a pinch-me moment"); consistent with, and an elaboration on, the
  row's `reputationActivity` ("Covered by Deaf Unity and regional UK press").
- **Attitude Magazine "LGBTQ+ Community Hero" award** — corroborated by Limping Chicken's July 2023
  follow-up interview headline and by the Living North profile; he is a deaf, gay man and speaks
  publicly about both identities. True and well-sourced, but not used in the pitch paragraph — see
  "Not used" below for why.
- **Scale: genuinely small** — the Living North profile (June 2022, fetched today) describes him
  operating as **"a one-man band," with help from one illustrator** who tweaks his designs. This
  directly corroborates the row's own note ("smaller/less corporate scale than other UK leads") and
  is why the praise paragraph below credits him personally for running the brand himself rather than
  describing "Deaf Identity" as if it were a company with any scale to point to.
- **Represented as a guest speaker by We Create Space** (a UK DEI consultancy; bio page fetched
  today) lists him with a "Looking for a Guest Speaker?" call-to-action. This is real, but it's a
  bureau *listing* him as available, not documented evidence of any specific talk he's actually
  given — so it doesn't safely upgrade the row's `priorPublicSpeaking` ("Y — press interview") beyond
  what's already stated. Noted here, not used to claim a speaking record he hasn't demonstrated.

## The 2026 update — the "recent, ongoing" beat

Not in the row at all: **Deaf Identity's own site** (`deafidentity.com/new-in-clothing`, fetched
today — a primary source, not a search summary) currently lists a **"DEAF in STEM" collection**,
created in collaboration with **Max Fisher**, described on the brand's own site as "a deafblind
person in STEM" and "recognised as the U.K.'s most influential disabled scientist in the Disability
Power 100," timed to **British Science Week 2026**. (Minor, inconsequential discrepancy on Deaf
Identity's own site: one product listing says British Science Week ran "6th–15th March 2026," a
second says "7th–16th March" — not resolved, and not needed, since the email below just says "this
March" rather than citing an exact day range.) This is used as the current, ongoing beat, playing the
same role the HF Holidays handback played in Amar Latif's draft and the John Lewis pop-up did on its
own — evidence he's still actively running and growing the brand today, not just a 2019 origin
story.

## Timezone and location — verified from current research, not assumed from the row

The row lists `country: "UK"` and `tzDiffHours: -2`. Checked rather than taken as given: multiple
sources place him in **Harrogate, North Yorkshire** (his lifelong home town) and **Leeds** (where he
moved his business unit, per the Living North profile, June 2022); his own X/Twitter profile
reportedly describes him as based **"between Yorkshire and London."** No source found today suggests
a relocation outside the UK. British Summer Time (BST) is still in effect on 29 September 2026,
whether he's in Yorkshire or London. The event slot (12:00 PM–3:00 PM EEST) converts to **10:00
AM–1:00 PM BST**, matching the row's `localTimeInSlot` ("10:00-13:00 BST (ideal)") exactly and using
the same conversion already established for Holly Tuke, Elin Williams, and Amar Latif's UK rows — no
correction needed.

## A deliberate note on the sign-language-interpreter line

Luke is himself deaf, so the standard scaffolding sentence about a sign-language interpreter isn't
boilerplate for a hypothetical audience member here — it's directly about him. The email below
rewords that sentence to say so explicitly, and adds a short, genuine offer to arrange whatever would
make the conference easiest for him to follow, rather than presuming a specific communication
preference (his own sourced background mentions hearing aids, speech, and BSL — not one fixed mode),
which is not something to guess at on his behalf.

## Sources used

`data/blind_leads_list.json` (`luke-christian` row); Deaf Unity, "Deaf Role Model of the Month: Luke
Christian" (deafunity.org, fetched 2026-09-18); Deaf Identity's own "About Us" page
(deafidentity.com/aboutus, fetched 2026-09-18) and "New In — Clothing" page
(deafidentity.com/new-in-clothing, fetched 2026-09-18); Living North, "Meet the Entrepreneur: Luke
Christian, DEAF IDENTITY" (livingnorth.com, fetched 2026-09-18); Attitude magazine, "DEAF IDENTITY's
Luke Christian is forging his own path" (attitude.co.uk, fetched 2026-09-18); We Create Space, team
page for Luke Christian (wecreatespace.co/team/luke-christian, fetched 2026-09-18); The Limping
Chicken, "Meet: Luke Christian, founder of fashion brand DEAF IDENTITY" (2019) and "Deaf News:
Clothing brand Deaf Identity to become the first deaf-owned business in John Lewis" (2021) and "A
conversation with deaf fashion designer Luke Christian following his recent award from Attitude
Magazine" (2023) (limpingchicken.com, accessed via search summary 2026-09-18); Yorkshire Post,
"Luke's fashion mission to make a difference for deaf community" (yorkshirepost.co.uk, accessed via
search summary 2026-09-18 — direct fetch returned HTTP 403); LinkedIn profile
"linkedin.com/in/luke-christian-12a966117/," titled "Chief Executive Officer - DEAF IDENTITY"
(accessed via search summary 2026-09-18 — direct fetch returned HTTP 999); Instagram bio for
@mrlukechristian and a RocketReach listing (both accessed via search summary 2026-09-18 only, used
solely for the contact-email corroboration above — direct fetch of both returned no usable content /
HTTP 403). No fact below goes beyond those sources.

Not fetchable / not used: mrlukechristian.com (his personal domain exists and is referenced across
his social profiles, but returned no renderable content on direct fetch today — not used as a source
for any fact); Signature.org.uk's "Deaf Identity: A blog with Luke Christian" and The Deaf
Traveller's 2019 interview (surfaced in search results with consistent biographical summaries, not
individually fetched — nothing in the email depends on them); a TikTok "Luke from Nen Fam Deaf"
result that appears unrelated to this Luke Christian, not used.

---

## Email

```
Subject: Invitation to an International Online Conference for People with Disabilities

Dear Luke,

On 29 September 2026, from 12:00 PM to 3:00 PM Eastern European Summer Time (EEST) (10:00 AM to
1:00 PM your time, BST), the "Social Future" Foundation (Jamba – Career for All) is organizing an
international online conference on the topic "Adapting Workplaces for People with Disabilities." The
foundation's mission is to support young people with disabilities in Bulgaria in their career
development, education, and employment in the Bulgarian labour market. We are looking for employers
of people with disabilities, or inspiring success stories of self-made entrepreneurs, influencers,
and other self-made people with disabilities. We think your story is exactly that kind of story:
designing your first Deaf Awareness Week T-shirt after your mother told you she couldn't find
anything to wear that celebrated being deaf, and growing that into Deaf Identity — a brand you've
designed and run yourself, out of Yorkshire, since 2019, becoming the first deaf-owned business to
hold a pop-up in John Lewis along the way, and still finding new ways to keep it going, most recently
teaming up with DeafBlind scientist Max Fisher on a "Deaf in STEM" collection for British Science
Week this March. We would be honoured to share a story like that with people with disabilities in
Bulgaria, to inspire them to pursue new opportunities for development and steady employment. The
conference will take place on the Zoom platform, and we would arrange your specific speaking time
once you accept our invitation; we are also glad to include a short presentation from you, should you
wish. As you'll appreciate better than most of our speakers, the conference will provide two-way
interpretation between Bulgarian and English, and a sign-language interpreter for deaf participants
throughout — including, of course, for your own session; if there's anything in particular that would
make it easier for you to follow or take part, please just let us know and we'll do our best to
arrange it. The materials will subsequently also be adapted for young people with intellectual
disabilities. Your speaking slot would be 20 to 25 minutes in total — approximately 15 minutes for a
presentation and the remainder for questions from the organizers and the audience. We will conduct a
connection test the day before the event and will be in contact beforehand to arrange this. The
access link will be published on our social media channels, and we would also share it with you
directly, should you wish to pass it on to your own community.

This will be the third in a series of conferences dedicated to raising public awareness of employment
issues facing people with disabilities in Bulgaria. It would be both a privilege and a genuine
pleasure to have you join us.

We would be most grateful if you could reply within 5 days of receiving this invitation, so that we
may plan the programme and confirm your exact speaking time. Should you accept, we would also ask you
for a short 1–3 sentence introduction for use in the programme timeline and speaker listing.

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

**Send to:** mrlukechristian@outlook.com (see addressing decision above).

---

## LinkedIn invitational message

```
Subject: A speaking invitation from Bulgaria — flagging it here too!

Hi Luke — hope this finds you well! I'm Christian, from the "Social Future" Foundation in Bulgaria.
We're putting together an international online conference on 29 September (Adapting Workplaces for
People with Disabilities), and we're looking for inspiring self-made stories to share with young
people with disabilities here in Bulgaria. Your story with Deaf Identity — starting it after your mum
told you she couldn't find anything to wear for Deaf Awareness Week, and building it into a brand
that's had a pop-up in John Lewis and is still going strong (I saw the Deaf in STEM collection with
Max Fisher!) — is exactly the kind of thing we'd love people to hear firsthand. I've just sent a full
invitation to your email, but wanted to flag it here directly too, in case it's easier to catch this
way. Would love to have you join us if the timing works!
```

Sent to: https://www.linkedin.com/in/luke-christian-12a966117/ — handle verified independently today
via search results, where the profile title reads "Chief Executive Officer - DEAF IDENTITY," matching
his known role exactly (direct fetch of the LinkedIn page itself returned HTTP 999, so this is
confirmed via the indexed page title, not a directly rendered profile — see sourcing section above).
This is sent in parallel with the email, not instead of it.

---

## Not used (true, but held back, or not solid enough to state as settled fact)

- **Attitude magazine's "LGBTQ+ Community Hero" award (2023)** — solidly corroborated (Limping
  Chicken, Living North), and a genuine, notable recognition, but it's about his advocacy as a deaf,
  gay man specifically, which is a separate and personal dimension from the
  employment/entrepreneurship theme this conference is built around; the email already carries two
  named credentials (John Lewis, the Max Fisher STEM collection) without adding a third.
- **Comic Relief / TK Maxx collaboration, worn by Roman Kemp and Pixie Lott** — well corroborated via
  search summary, a strong and colourful credential, but left out to avoid overloading the praise
  sentence with a fourth named credit on top of the founding story, John Lewis, and the STEM
  collection; easy to add if Stoyan wants a fuller version.
- **Exact number of family generations affected by deafness ("4," "5," or "6" depending on the
  source)** — genuinely true in spirit and corroborated across every source, but the specific number
  is inconsistent, so no number is stated in the email.
- **His mother and sister are also deaf** — per Yorkshire Post (search summary); true and adds warmth,
  but the email already personalizes the founding story around his mother's specific request, and
  adding his sister risked cluttering one sentence that's meant to stay readable in one breath.
- **Represented as a guest speaker by We Create Space (DEI consultancy)** — real, but it documents
  that a bureau lists him as available, not a specific confirmed speaking engagement; not used to
  claim a public-speaking record beyond what the row's own `priorPublicSpeaking` ("Y — press
  interview") already supports.
- **Redundancy from Next (May 2019), ~7 years in retail beforehand** — genuinely part of his origin
  story (Deaf Unity, corroborated in spirit by a second source describing "7 years in retail"), but
  the email's founding-story sentence is already built around the mother/Deaf Awareness Week trigger;
  adding the employment-redundancy detail on top would shift the sentence from a warm personal story
  toward a career CV, which the task specifically asked to avoid.
- **His age** — not used anywhere, and deliberately so: sources disagree ("26" in a 2019/2020-era
  article, "29" in a July 2023 article, and a 2026-dated search-summary digest that also says "29,"
  which cannot be reconciled with the 2023 figure if it's a distinct, independently reported age
  rather than a recycled bio line) — flagged as an unresolved discrepancy rather than guessed at.
