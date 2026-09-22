# Invitation email — Ashish Goyal (`ashish-goyal`, matchRating 5)

Status: drafted, pending Stoyan sign-off. Not yet sent.

**Tone note (per Stoyan's instruction on this draft):** because this email routes through LSE staff
who have to decide whether to forward it (see the routing decision below), the email itself is
written in a **more formal register** than the Srikanth Bolla / Elin Williams template — full salutation,
no contractions, "Sincerely" close. The LinkedIn message, sent directly to Ashish rather than through
an intermediary, is written **warmer and more conversational** than the email, on the theory that a
DM read cold benefits from sounding like a person rather than a form letter.

## Contact / addressing decision — verified today, not assumed from the row

The row's `contact` field suggests routing through the **LSE Inclusion Initiative (TII)**. This was
checked rather than taken on faith, in three parts:

1. **Is `tii@lse.ac.uk` still TII's live address?** Yes — LSE's own TII "People" page and a direct
   fetch of Ashish's TII profile (`lse.ac.uk/tii/people/Ashish-Goyal`, fetched 2026-09-18) both list
   **`tii@lse.ac.uk`** as the contact method, and a web search independently confirms it's the address
   TII gives corporate partners for general inquiries today. Nothing found suggests it's stale.
2. **Is Ashish still listed as a current advisory-board member?** Yes — his TII profile page, fetched
   today, actively lists him as **"Advisory Board Member"** (not a past/emeritus tag), alongside the
   same bio TII itself uses. A TII press release, *"Diverse Expertise Joins The Inclusion Initiative's
   Advisory Board as TII Celebrates its 3-Year Anniversary"* (`lse.ac.uk/tii/assets/documents/AB-Press-Release.pdf`,
   fetched 2026-09-18 — TII launched Nov 2020, so this dates his appointment to roughly 2023), confirms
   the appointment in LSE's own words: *"Ashish's expertise in global markets and dedication to
   socio-economic equality align with TII's goals."* That sentence is the direct source for the
   "advocate for socio-economic equality" framing used below — it isn't this file's own paraphrase,
   it's LSE's.
3. **Is there a more direct route?** A personal LinkedIn profile was found and independently
   corroborated — **`linkedin.com/in/ashishgoyalwg08`** (the "WG08" matches his real Wharton MBA class
   year), surfaced via a public LinkedIn post from a named third party tagging him at that exact
   handle. No personal email address, personal website, or current-employer contact page was found
   anywhere public today — his LSE bio and every recent press mention describe him only as "a
   London-based investment professional," with no employer named. **Net: LSE/TII remains the only
   verified, addressable inbox that's actually about him** (not a company switchboard); LinkedIn is
   used in parallel as the direct-to-him backup channel, per this project's established pattern.

**Recommendation: send the email to `tii@lse.ac.uk`, subject line naming Ashish and the invitation
explicitly, so TII staff can identify and forward it without needing to read the whole body first.**
Send the LinkedIn message in parallel, worded so it doesn't duplicate the pitch — it just flags that
a formal invitation has gone to him via LSE and invites him to look out for it.

## Framing check — "blind investor, advocate for socio-economic equality and inclusion"

This exact framing was checked against research rather than accepted as given, and holds up:
- **"Blind investor"** — corroborated everywhere: retinitis pigmentosa from around age 7–9, total
  blindness by his late teens/early twenties depending on the source's exact wording (Wikipedia says
  by 19; his own LSE/TII bio's "between the ages of nine and 22" is treated as the more authoritative
  self-reported version); a 15+ year career as a global macro investor.
- **"Advocate for socio-economic equality and inclusion"** — this is close to verbatim LSE's own
  language for him (see press release quote above), not an invented gloss, and matches independent
  coverage describing him as "a financial adviser, public speaker and disability advocate" (Wikipedia)
  and quoted this year saying "Talent is universal. Opportunity is not." (Westminster Extra,
  2026-07-03).

## The "first blind Wharton graduate" / "first blind Wall Street trader" claims — solidly corroborated

Both distinctions are stated consistently, in near-identical wording, across every independent source
checked: his own LSE/TII profile, Wharton Magazine's 2019 profile of him, his Wikipedia article, and
his World Economic Forum profile — "world's first visually impaired graduate of The Wharton School
(2008)" and "world's first visually impaired investor-trader on Wall Street (2009)." No source
contradicts either claim. The row's `careerBackground` field states both correctly.

## Career history — one detail flagged, not used

Every source agrees on the three anchor employers: **J.P. Morgan** (his first trading job, 2009),
**BlueCrest Capital Management**, and **Citadel** (portfolio manager on the global fixed-income team,
joined London office August 2019 per Wharton Magazine). These three, and only these three, are also
exactly what the row's own `roleOrganization` field names ("Citadel/BlueCrest/JPM"), so they're the
set used in the email.

**Flagging, not using, a fourth-employer discrepancy:** the row's `careerBackground` field adds "Pharo
Management" as a later stop; Wikipedia's career list agrees on "Pharo Management." But independent
2026 sources (a World Economic Forum profile fetch and an Asian Standard news piece, both today) instead
describe his 17-year career as spanning "J.P. Morgan, Citadel, BlueCrest **and Balyasny**" — no mention
of Pharo. Since the two lists disagree on the fourth firm and neither "Pharo" nor "Balyasny" is
corroborated by more than one independent path, **neither is named in the email** — only the
three-firm set every source agrees on is used.

**Flagging, and explicitly excluding, a likely person-conflation:** several AI-generated search
summaries today asserted he is currently "CIO of the Goyal Family Office" with "a focus on Emerging
Markets and Asia." This claim could not be traced to any actual page of text saying so — a direct
fetch of his real LSE profile page says only "a London-based investment professional focusing on
global macro strategies," with no mention of a family office. A **different Ashish Goyal** — Head of
Asia-Pacific and EVP at OMERS, based in Singapore, with an engineering/CFA background and no mention
of blindness anywhere on his profile — turned up on a speaker-bureau site (salt.org) and appears to be
the actual source of the "Emerging Markets and Asia" phrase bleeding into search summaries about our
Ashish Goyal. **Neither "Family Office CIO" nor "Emerging Markets and Asia" is used anywhere below.**

## The 2026 update — independently corroborated, this is the "recent, ongoing" beat

Not in the row at all, and the strongest current-year fact found. On **25 June 2026**, Ashish led and
completed a **20-mile charity walk past London landmarks** ("7 Wonders of London"), raising funds for
educational programmes for disadvantaged children and for opportunities for blind and visually
impaired young people, with the child-poverty charity Akshaya Patra among the causes supported.
Corroborated independently by two outlets: **Westminster Extra** (2026-07-03, "last week" relative to
publication — consistent with the 25 June date), which quotes him ("My own life was transformed by
education, mentorship, opportunity and the belief of others that blindness should not determine what
was possible" / "Talent is universal. Opportunity is not."), and the **Asian Standard** (fetched via
search summary, 2026-09-18), which independently confirms the walk, its date, and its purpose.

**Flagging one figure discrepancy, not resolved:** the two outlets give different fundraising totals —
Westminster Extra says "nearly £70,000," the Asian Standard says "more than £80,000" (against an
initial £25,000 target, ~360 donors before the walk began). Both may simply reflect the total at
different points as donations kept coming in after the walk itself, which is common for these
campaigns, but this file can't confirm that and doesn't guess a single number — the email below
describes the walk and its purpose without stating an exact amount raised.

## Timezone — verified from current research, not assumed from the row

The row lists `country: "UK (London)"` and `tzDiffHours: -2`. This was checked against current
sourcing rather than taken as given: Westminster Extra's July 2026 piece places him doing the charity
walk "through London landmarks," his LSE/TII profile calls him "a London-based investment
professional," and no source found today suggests he has relocated. **London, UK, on British Summer
Time (BST) on 29 September 2026, is confirmed as his current base.** The event slot (12:00 PM–3:00 PM
EEST) converts to **10:00 AM–1:00 PM BST** — this matches the row's `localTimeInSlot`
("10:00-13:00 BST (ideal)") exactly, and is the same conversion already used for Holly Tuke and Elin
Williams's UK rows; no correction needed.

## Sources used

`data/blind_leads_list.json` (`ashish-goyal` row); LSE's own staff profile for Ashish Goyal
(lse.ac.uk/people/ashish-goyal, fetched 2026-09-18); LSE TII's dedicated profile for Ashish Goyal
(lse.ac.uk/tii/people/Ashish-Goyal, fetched 2026-09-18); TII's Advisory Board press release PDF,
"Diverse Expertise Joins The Inclusion Initiative's Advisory Board as TII Celebrates its 3-Year
Anniversary" (lse.ac.uk/tii/assets/documents/AB-Press-Release.pdf, fetched and read directly
2026-09-18); English Wikipedia, "Ashish Goyal" (fetched 2026-09-18); Wharton Magazine, "The Pioneer:
Ashish Goyal WG08" (magazine.wharton.upenn.edu, published 2019-12-11, fetched 2026-09-18); World
Economic Forum, Ashish Goyal speaker/person profile (weforum.org/people/ashish-goyal, accessed via
search summary 2026-09-18); Westminster Extra, "'Disability shouldn't define limits of human
potential'" (westminsterextra.co.uk, published 2026-07-03, accessed via search summary 2026-09-18 —
direct fetch returned HTTP 403); Asian Standard, "How a 20-mile walk helped raise £80,000 funds for
education and opportunity" (asianstandard.co.uk, accessed via search summary 2026-09-18 — direct
fetch twice timed out); a public LinkedIn post by Dr. Ritesh Malik tagging Ashish Goyal at
linkedin.com/in/ashishgoyalwg08 (fetched 2026-09-18, used only to corroborate the LinkedIn handle);
salt.org speaker profile for a different "Ashish Goyal" (Head of Asia-Pacific, OMERS) (fetched
2026-09-18, used only to identify and exclude a person-conflation — see career-history section
above). No fact below goes beyond those sources.

Not fetchable / not used: campdenfb.com's "Ashish Goyal: 'From the dumpster to the goldmine!'"
interview (DNS resolution failure both attempts — likely relevant given its Campden FB/family-office
context, but its content could not be checked, so nothing from it is used or assumed);
whartonclubuk.net's "Meeting with Ashish Goyal" event page and the "54. Global Macro Trading 101"
podcast episode (both surfaced in search results with consistent biographical summaries, not
individually fetched — nothing in the email depends on them); yourstory.com's 2016 profile and
theblindcook.com's 2010 blog post (older secondary profiles, consistent with everything above, not
separately fetched since they'd add nothing not already independently corroborated).

---

## Email

```
Subject: Speaker Invitation for Ashish Goyal — International Online Conference for People with Disabilities, 29 September 2026

Dear Colleagues at The Inclusion Initiative,

I am writing on behalf of the "Social Future" Foundation (Jamba – Career for All), a Bulgarian
non-profit, to request that this invitation be forwarded to Mr. Ashish Goyal, whom I understand
serves on your Advisory Board.

On 29 September 2026, from 12:00 PM to 3:00 PM Eastern European Summer Time (EEST) (10:00 AM to
1:00 PM his time, BST), our foundation is organizing an international online conference on the
subject of "Adapting Workplaces for People with Disabilities." Our mission is to support young
people with disabilities in Bulgaria in their career development, education, and employment in the
Bulgarian labour market. We are seeking speakers who are either employers of people with
disabilities or who can share an inspiring personal story of achievement as a person with a
disability. We believe Mr. Goyal is an exceptional example of the latter: as the first blind
graduate of the Wharton School and the first blind trader on Wall Street, who went on to build a
career at leading institutions including J.P. Morgan, BlueCrest Capital Management, and Citadel,
and who now channels that same conviction into advocacy for socio-economic equality as an Advisory
Board member of your own Inclusion Initiative — most recently leading a 20-mile charity walk across
London this past June to raise funds for the education of disadvantaged children and for
opportunities for blind and visually impaired young people. We believe his story is exactly the
kind of example we would be honoured to share with people with disabilities in Bulgaria, to inspire
them to pursue new opportunities for development and steady employment.

The conference will take place on the Zoom platform, and we would arrange Mr. Goyal's specific
speaking time once he accepts our invitation; we are also glad to include a short presentation from
him, should he wish. The conference will provide two-way interpretation between Bulgarian and
English, as well as a sign-language interpreter for deaf participants; the materials will
subsequently be adapted for young people with intellectual disabilities as well. His speaking slot
would be 20 to 25 minutes in total — approximately 15 minutes for a presentation and the remainder
for questions from the organizers and the audience. We will conduct a connection test the day
before the event and will be in contact beforehand to arrange this. The access link will be
published on our social media channels, and we would also share it with Mr. Goyal directly, should
he wish to pass it on to his own partners or community.

This will be the third in a series of conferences dedicated to raising public awareness of
employment issues facing people with disabilities in Bulgaria. It would be both a privilege and a
genuine pleasure to have Mr. Goyal join us.

We would be most grateful if Mr. Goyal could reply within 5 days of receiving this invitation, so
that we may plan the programme and confirm his exact speaking time. Should he accept, we would also
ask him for a short 1–3 sentence introduction for use in the programme timeline and speaker
listing.

Thank you very much for your assistance in passing this invitation along.

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

**Send to:** tii@lse.ac.uk (see addressing decision above — verified live and current today, and
Ashish is verified still listed as a current Advisory Board member there).

---

## LinkedIn invitational message

```
Subject: A speaking invitation is on its way to you via LSE!

Hi Ashish — hope this finds you well! I'm Christian, from the "Social Future" Foundation in
Bulgaria. We're putting together an international online conference on 29 September (Adapting
Workplaces for People with Disabilities), and your story — first blind Wharton grad, first blind
trader on Wall Street, and now all the advocacy work you do through LSE's Inclusion Initiative — is
exactly the kind of thing we'd love young people with disabilities here in Bulgaria to hear
firsthand. Loved reading about the 20-mile London walk you led back in June, too — what a way to
put that conviction into action! I've just sent a full invitation with all the details to LSE's
Inclusion Initiative, since that's the contact route we had for you — just wanted to flag it here
directly as well, in case it's easier to spot this way, or in case you'd rather I send it to you
some other way instead. Would love to have you join us if the timing works!
```

Sent to: https://uk.linkedin.com/in/ashishgoyalwg08 (verified handle — see addressing decision
above). Per the routing decision, he is actually being contacted formally via the LSE Inclusion
Initiative email (above); this message deliberately doesn't repeat the full pitch, since duplicating
it risks reading as two different, uncoordinated asks landing at once.

---

## Not used (true, but held back, or not solid enough to state as settled fact)

- **"CIO of the Goyal Family Office," "focus on Emerging Markets and Asia"** — already covered above:
  this looks like a search-summary conflation with a different person entirely (an OMERS executive
  also named Ashish Goyal). Not used anywhere, and worth a note that this bad claim is circulating in
  AI search summaries if it resurfaces elsewhere in this project's research.
- **"Pharo Management" as a career stop** — corroborated only by the row itself and Wikipedia, while
  two independent 2026 sources instead name "Balyasny" for what looks like the same slot in his
  career timeline. Neither is used; see the career-history section above.
- **Vedic Sciences / meditation practice, mentioned in the LinkedIn About section Stoyan supplied** —
  genuinely his own self-description, but personal/spiritual framing that doesn't fit a professional
  invitation letter to an intermediary organization; left out of both the email and the LinkedIn
  message.
- **National Award for the Empowerment of People with Disabilities, awarded by the President of
  India (2010)** — well corroborated (row, Wikipedia, LSE bio, and Ashish's own LinkedIn About
  section calling himself "a President of India awardee"), but the email already carries three
  concrete beats (Wharton/Wall Street, the hedge-fund career, the LSE/charity-walk advocacy angle);
  adding a fourth award risked overloading the sentence, per the established pattern from other
  files in this folder.
- **World Economic Forum Young Global Leader (2015)** — solidly corroborated everywhere (row, LSE
  bio, Wikipedia, WEF's own profile), and genuinely a strong credential, but held back for the same
  reason as the National Award above — the sentence already carries enough named credits without it.
  Easy to add back in if Stoyan wants a longer version.
- **Blind cricket (Metro London Sports Club, 2009), per Wikipedia** — true, charming, but minor and
  unrelated to the conference's employment/advocacy theme; not used.
- **Board service, Rising Flame (India) and prior involvement with Peek Vision Foundation (UK)** —
  per his LSE profile page directly (not in the row at all); genuinely relevant disability-sector
  affiliations, but the email already leads with the LSE/TII connection itself as the advocacy beat,
  so naming two further boards felt like it would dilute rather than strengthen that sentence. Strong
  candidate material if a longer bio is wanted for the programme listing later.
- **campdenfb.com's "From the dumpster to the goldmine!" interview** — likely relevant (a family-office
  publication interviewing him) but the page could not be fetched (DNS failure both attempts), so
  nothing from it is used or assumed; worth another attempt later if useful context surfaces there.
