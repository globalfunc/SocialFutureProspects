# Invitation email — Claire Sisk (`claire-sisk`, matchRating 5)

Status: drafted, pending Stoyan sign-off. Not yet sent.

**Contact note:** Claire is represented by an agent — Stephanie Walton, Kindling Talent
(stephanie@kindlingtalent.com). The email below is addressed to Stephanie, asking her to pass the
invitation to Claire, rather than to Claire directly.

Sources used: `data/blind_leads_list.json` (`claire-sisk` row) + RNIB's ambassador announcement
(rnib.org.uk), ITV's *This Morning* article pages for her cooking segments, RNIB Connect Radio's
*The Happy Hour* show page, and Edinburgh TV Festival / Televisual coverage of the 2026 New Voice
Awards (all via web search, fetched 2026-09-17). No fact below goes beyond those sources.

---

## Email

```
Subject: Invitation to an International Online Conference for People with Disabilities — Claire Sisk

Dear Stephanie,

I hope this finds you well. I'm reaching out on behalf of the "Social Future" Foundation (Jamba –
Career for All) regarding Claire Sisk, and would be grateful if you could pass this invitation on
to her.

On 29 September 2026, from 12:00 to 15:00 Eastern European Summer Time (EEST) (10:00–13:00 her
time, BST), the "Social Future" Foundation is organizing an international online conference on
the topic "Adapting Workplaces for People with Disabilities." The foundation's mission is to
support young people with disabilities in Bulgaria in their career development, education, and
employment in the Bulgarian labour market. We are looking for employers of people with
disabilities, or inspiring success stories of self-made entrepreneurs, influencers, and other
self-made people with disabilities. We think Claire's work as the first blind chef to cook live on
ITV's This Morning — turning her own experience of sight loss into accessible cooking
demonstrations for a national audience — together with her role as an RNIB Global Ambassador and
co-host of RNIB Connect Radio's The Happy Hour, is exactly the kind of story we would love to
share with people with disabilities in Bulgaria, to inspire them to seek new opportunities for
development and steady employment. The conference will take place on the Zoom platform, and we
will arrange her specific speaking time once she accepts our invitation. We are also able to
include a short presentation from her, if she wishes. The conference will have two-way
interpretation between Bulgarian and English, and a sign-language interpreter for deaf
participants; the materials will later also be adapted for young people with intellectual
disabilities. Her speaking slot would be 20 to 25 minutes — about 15 minutes for her presentation
and the rest for questions from the organizers and the audience. We will run a connection test
the day before the event, and we'll be in touch about that beforehand. The access link will be
posted on our social media channels, and we will also share it with you directly in case Claire
would like to pass it on to her own partners or community.

This is the third in a series of conferences dedicated to raising public awareness of employment
issues facing people with disabilities in Bulgaria. It would be both a privilege and a pleasure to
have Claire join us.

Please let us know within 5 days of receiving this email whether Claire is able to join, so we
can plan the programme and confirm her exact speaking time. If she decides to accept, we'll also
ask for a short 1–3 sentence introduction we can use for the programme timeline and speaker
listing.

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

## LinkedIn invitational message — skipped, by decision

Not drafted. Reasoning: Claire's contact is explicitly routed through her agent (Stephanie Walton
at Kindling Talent). Sending a separate LinkedIn message directly to Claire would go around that
established channel and could land oddly for a managed talent relationship. A duplicate LinkedIn
note to Stephanie's own profile would just re-ask, on a second channel, the same thing the email
to her business address already asks — no added value at this stage. If there's no reply within
the 5-day window, a short LinkedIn follow-up to Stephanie (linkedin.com/in/stephanie-walton-04353541,
found via web search) could be a reasonable nudge, but it isn't part of this initial outreach.
Flagging this read for Stoyan to override if he'd rather go straight to a two-channel approach.

---

## Praise-sentence sourcing (fact-by-fact)

- "first blind chef to cook live on ITV's This Morning" — `pwdAtRelevance` in
  `data/blind_leads_list.json`; corroborated by ITV *This Morning* article pages for her recurring
  cooking segments (chicken and tomato pasta for Global Accessibility Awareness Day, lasagne for
  World Sight Day, bacon mac 'n' cheese) at itv.com/thismorning.
- "turning her own experience of sight loss into accessible cooking demonstrations for a national
  audience" — same ITV *This Morning* segments; she demonstrates adaptive kitchen technology and
  techniques for a visually-impaired audience on air.
- "RNIB Global Ambassador" — `roleOrganization` field; confirmed by RNIB's own announcement,
  "Blind content creator and disability advocate Claire Sisk announced as RNIB Ambassador"
  (rnib.org.uk).
- "co-host of RNIB Connect Radio's The Happy Hour" — RNIB Connect Radio's show page for *The Happy
  Hour* (rnib.org.uk/connect-radio), which credits Claire Sisk and Paulina Kuchorew as hosts.

Not used (true, but held back to keep the praise clause to 1–2 sentences, or not solid enough to
state as settled fact):
- Her role in ITV's *Blind Matchmakers* (Fresh Cuts 2025) and her 2026 New Voice Awards nomination
  for Debut Presenter — genuinely impressive, but this campaign's mission paragraph leans on the
  "employer / self-made success story" framing, and the This Morning + RNIB Ambassador facts already
  carry that; adding a third achievement risked overloading the sentence rather than adding much.
  Worth keeping in reserve if Stoyan wants a longer or alternate version.
- The podcast "Seeing Within" listed in the data row's `priorPublicSpeaking` field — web search
  turned up an Apple Podcasts listing for a show by that name, but couldn't confirm it's hosted by
  Claire Sisk specifically (it wasn't corroborated the way *The Happy Hour* was), so it's left out
  rather than stated as fact. Flagging this discrepancy for Stoyan — worth checking directly if he
  has the original source for that field.
- Two strokes in 2009 / cone-rod dystrophy / Best Vitelliform Macular Dystrophy diagnosis
  (`careerBackground`) — accurate per RNIB Connect Radio's own bio of her, but personal medical
  history didn't feel like the right note for a 1–2 sentence professional praise clause; available
  if a fuller version is wanted.
- Instagram/TikTok/Facebook following of ~112,000–113,000 (`reputationActivity`, corroborated by
  independent web sources) — true, but Holly Tuke's file already leans on platform reach as one of
  several facts, and here the broadcast/RNIB credentials made a stronger, more specific pair on
  their own.

Local-time mention: corrected event slot is 12:00–15:00 EEST (Sofia is on summer time on
29 September 2026) → converts to **10:00–13:00 BST**, matching `localTimeInSlot` in
`data/blind_leads_list.json` ("10:00-13:00 BST (ideal)", `tzDiffHours: -2`) — same UK/BST
conversion as Holly Tuke's row, already corrected for the 12:00–15:00 EEST slot.
