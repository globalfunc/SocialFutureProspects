# Live Event Moderation Playbook

**Purpose:** the minute-by-minute run of show for 29 Sep 2026, combining the roles and Zoom features from [`zoom_setup.md`](./zoom_setup.md) and the production decisions in [`zoom_technical_setup.md`](./zoom_technical_setup.md) into one document the moderation team can actually run from live. Print it or keep it open in a second window during the event — it's written to be read *during*, not just before.

**Assumes:** Zoom Meeting mode (not Webinar — see `zoom_technical_setup.md` §2), no physical venue, simultaneous BG/EN interpretation + sign-language interpretation, a centralized slide operator (`zoom_technical_setup.md` §6). If the Webinar-license check comes back positive and you switch modes, swap every "waiting room" reference below for "Backstage" per `zoom_setup.md` §5.2 — everything else stays the same.

---

## 1. Roles — consolidated onto one technical operator, not split with the host

**Core decision: all live Zoom UI actions (admission, mute/unmute, spotlight, interpretation panel) belong to the Moderator. Christian's job as Host is voice only — he never touches spotlight/mute/admission controls live, even though the meeting runs under his account.**

Why this isn't split 50/50 with the host: spotlighting in particular means right-clicking a *specific video tile* in a gallery that reflows as people join/leave/speak — exactly the fast, spatial, mouse-driven interaction a screen reader handles worst. Centralizing it avoids that entirely, and also avoids two people both able to click the same controls (double-mutes, conflicting spotlights) during a fast handoff.

| Role | Who | Responsibility |
|---|---|---|
| **Host** | Christian | Voice only: introduces each speaker, narrates transitions, fills any dead air, asks Q&A questions aloud (relayed or self-monitored — see §6), makes the final live call on any judgment decision. His **own** mic is always self-controlled, no permission needed — see §2a. |
| **Moderator** | Jamba team | Everything Zoom's UI touches: admits from the waiting room, unmutes/mutes every other participant (incl. speakers at slot-start, §5), spotlights the current speaker and removes the outgoing one, watches the interpretation panel and sign-language feed, gives the host a verbal heads-up if something technical breaks |
| **Slide operator** | Jamba team | Has all 7 decks loaded, screen-shares the right one per speaker, advances on that speaker's verbal cue (`zoom_technical_setup.md` §6) |

**Minimum viable: 2 people** — fold the slide operator into the Moderator. Workable, but the one real collision risk is a moment where two actions land at once (e.g. unmuting a raised-hand questioner exactly as the next speaker needs spotlighting) — splitting slides off (3 people) removes the highest-frequency version of that.

**Not yet assigned — a real decision, not an oversight:** who reads Q&A questions aloud. It's pure text, so unlike spotlighting this is genuinely something Christian could monitor himself via screen reader if he'd rather own it directly. Default, if he'd rather not: folds into the Moderator's job. Decide this explicitly before the dry run rather than leaving it ambiguous going into the event.

**Not a separate role:** interpreter coordination between the two spoken-language interpreters (their handoff timing, mic discipline) is their own side-channel per `zoom_setup.md` §3.2 — not something your headcount needs to cover, beyond the Moderator noticing if a channel drops.

---

## 2. Zoom UI controls — who can do what, and where to find it

| Control | Where | Who | Scope |
|---|---|---|---|
| Mute / unmute **another** participant | Participants panel | Host / co-host only | The only path to unmuting anyone, since self-unmute is off (§2b) — direct and instant if "Allow host to unmute participants" is on; otherwise sends an "ask to unmute" prompt the participant must accept |
| Admit from waiting room | Participants panel | Host / co-host | — |
| **Spotlight for Everyone / Add Spotlight / Remove Spotlight** | Right-click a video tile | Host / co-host only | **Global** — changes what every attendee sees by default, and what the cloud recording captures. Additive up to 9; a new spotlight does **not** remove an old one automatically (§4 of `zoom_technical_setup.md`) |
| **Pin** | Click a video tile | **Any participant, including attendees** | **Local only** — affects just that person's own screen. No effect on anyone else's view or on the recording |
| Interpretation (globe icon) | Meeting toolbar | Host / co-host | Add interpreters, assign BG/EN pairs, start interpretation. Pre-assigning by email at scheduling is a convenience only — it does **not** auto-activate on join in Meeting mode (that automation is Webinar-only); still requires this manual step live |
| Sign Language icon | Meeting toolbar, once enabled | Host / co-host | Assign the sign-language interpreter — same manual-activation caveat as above |
| Language channel selector | Own audio controls | Every attendee | Picks BG or EN audio for themselves |
| Raise Hand — Alt+Y (Win) / Option+Y (Mac) | Reactions menu / shortcut | Any participant | Signals a question |
| Q&A panel | Meeting toolbar, **once enabled — see note below** | Host/co-host to manage; every attendee to submit | Attendees can post (optionally anonymously) and upvote; host/co-host marks answered/dismissed |
| Recording start/stop | Meeting toolbar | Host / co-host | — |
| Restrict screen-sharing to Host Only | Security icon | Host / co-host | Recommended given the join link is public — stops any random attendee from hijacking the share. Co-hosts should retain sharing ability under this restriction, but confirm in the dry run rather than assume |

**One prerequisite that's easy to miss:** Zoom's Q&A panel in **Meeting** mode (as opposed to Webinar) is not on by default. It needs (a) enabling at the account/group level by an admin, (b) turned on in the host's own meeting settings, and (c) the meeting scheduled via the web portal or desktop client rather than started as an instant meeting. Confirm this is actually enabled during the pre-flight (§3) — don't discover it's off live.

**Pin vs. spotlight, in one line: the audience pins for themselves; the Moderator spotlights for everyone.** They don't conflict — an attendee can keep the sign interpreter pinned locally the entire event regardless of whatever the Moderator is spotlighting for the recording.

**No per-role invite links.** Unlike Webinar's panelist links, Meeting mode has a single shared join link for everyone — role isn't determined by which link someone clicked, only by what the Moderator manually grants them once they're in. See `zoom_technical_setup.md` §8 for the full onboarding/access model this implies.

### 2a. The host's own mic is never gated by any of this

Everything above (self-unmute off, ask-to-unmute) restricts *other* participants. Host and co-host can always mute/unmute **themselves** instantly — no approval, no setting to check. For Christian specifically: **Alt+A** (Windows) / **Cmd+Shift+A** (Mac) toggles his own mute, or — likely the better fit for a blind host — **hold the Spacebar** to talk while muted and release to auto-remute ("push-to-talk"), once "Press and hold SPACE key to temporarily unmute yourself" is checked in Zoom's Audio settings (pre-flight, §3). Rule of thumb: **host stays muted during a speaker's uninterrupted talk portion, unmutes for introductions/transitions/Q&A facilitation.**

### 2b. Why "can speakers/audience unmute themselves" has one answer, not two

"Allow participants to unmute themselves" is a single blanket toggle — Meeting mode has no separate "speaker" role the way Webinar has panelists, so it can't be turned on for speakers only and off for the audience. We're keeping it **off** for the whole event (default once "mute on entry" is on — confirm, don't assume, in §3), given the join link is public. Consequences, both real and worth planning around:
- **Every unmute — audience question or speaker's own slot starting — is a Moderator action.** Not just Q&A: the Moderator must actively unmute each incoming speaker at handoff, not merely confirm they're ready.
- **Muting yourself is always allowed to anyone, unmuting is not** — that asymmetry is the trap. A speaker who reflexively hits their own mute button mid-talk (e.g. to cough) cannot undo it themselves; only the Moderator can. Tell every speaker explicitly, in advance: don't touch your own mute button during your slot.

---

## 3. Day-of pre-flight

Run this **immediately before doors open**, with the full moderation team already in the meeting:

- [ ] Meeting mode confirmed (not accidentally Webinar, or vice versa — `zoom_technical_setup.md` §2)
- [ ] Q&A panel confirmed enabled (see prerequisite in §2) — test that a dummy question can actually be submitted and appears in the panel
- [ ] "Allow host to unmute participants" confirmed **on** (Settings → Meetings → In Meeting (Basic)) — makes every Moderator unmute action (speakers and Q&A alike) a one-click instant action instead of a consent round-trip
- [ ] **"Allow participants to unmute themselves" confirmed OFF** — defaults off once mute-on-entry is on, but confirm rather than assume (§2b)
- [ ] Screen-sharing restricted to Host Only (Security icon) — confirm the Slide operator, once made co-host, can still share under this restriction
- [ ] Cloud Recording started, with "record separate audio file per interpretation language," recording layout set to **"record active speaker, gallery view, and shared screen separately"** (not the default single active-speaker file — this is the setting that actually keeps a silent, spotlighted sign interpreter visible in the recording, not spotlighting alone), "include video in screen share recording," and "Record Sign Language Interpreter" (if present) all on (`zoom_technical_setup.md` §5). **These recording-layout settings can't be changed once the meeting starts** — get them right here, not mid-event.
- [ ] Interpretation panel open; both spoken-language interpreters confirmed live on their channels (manually assigned — pre-assignment by email does not auto-activate, §2)
- [ ] Sign-language interpretation enabled; interpreter confirmed visible and lit correctly, **then spotlighted once here and left alone for the rest of the event** (§4 of `zoom_technical_setup.md`) — this is the one spotlight action that happens only at pre-flight, not per rotation
- [ ] Moderator and Slide operator promoted to co-host (live "Make Co-Host," since Alternative Host requires a license on Jamba's own account — `zoom_technical_setup.md` §8)
- [ ] Slide operator confirms all 7 decks are loaded and the first one (Kris's, if he has slides) is ready to share
- [ ] "Mute participants on entry" is on
- [ ] Host's own push-to-talk enabled: Zoom Settings → Audio → **"Press and hold SPACE key to temporarily unmute yourself"** checked
- [ ] Backup phone/messaging contact on hand for every speaker (collected during connection tests, `zoom_setup.md` §6.1.5)
- [ ] Host has the opening announcement script (§7) and the failure-mode quick reference (§8) open in a visible window
- [ ] **Every speaker has been told, in the pre-event note (`zoom_setup.md` §6.4): don't touch your own mute button during your slot** (§2b)

---

## 4. Run of show

Times from `programLineup.json`, Sofia time. **Every speaker handoff is: Moderator unmutes the incoming speaker, removes the outgoing speaker's spotlight, adds the incoming speaker's spotlight** — three actions, not one. The sign interpreter's spotlight (set once at pre-flight) is never touched.

| Time (Sofia) | Speaker | Notes | Moderator action | Slide operator |
|---|---|---|---|---|
| 11:55 | — | Doors open to attendees; opening announcement (§7) | Confirm Kris is admitted, unmute him | Kris's deck ready if he has one |
| 12:00 | **Kris Grigorov** — Opening Speech | Host's own opening; no Q&A cue needed | Spotlight Kris (first speaker — nothing to remove yet) | Share on cue if used |
| 12:10 | **Plamen Veselinov** — Business in the Dark | 15 talk + Q&A | Mute Kris, unmute Plamen; swap spotlight; Q&A per §6 | Share/advance on cue |
| 12:35 | **Esi Hardy** — Empowering Business Through Lived Experience | UK, -2h — confirm on BST-correct join time | Mute/unmute + swap spotlight; Q&A per §6 | Share/advance on cue |
| 13:00 | **Thorkil Sonne** — Different and Together | Denmark, -1h | Mute/unmute + swap spotlight; Q&A per §6 | Share/advance on cue |
| **13:25** | **10-minute break** | Good window for an interpreter handoff if running two per shift (`zoom_setup.md` §3.2) — not mid-talk | Mute outgoing speaker, remove their spotlight; confirm Dirk is admitted during the break | Load Velizar's + Seema's decks if not staged |
| 13:35 | **Dirk Müller-Remus** — The auticon story | Germany, -1h | Unmute Dirk + swap spotlight; Q&A per §6 | Share/advance on cue |
| 14:00 | **Velizar Marinov** — Starting a Business Beyond Physical Barriers | Bulgarian, no tz conversion | Mute/unmute + swap spotlight; Q&A per §6 | Share/advance on cue |
| 14:30 | **Seema Flower** — Closing the Gap | UK, -2h. **Slide-cue accommodation applies — see §6a** | Mute/unmute + swap spotlight; confirm slide operator primed before her intro starts | Advance strictly on Seema's verbal cue |
| ~14:55–15:00 | — | Closing remarks, thanks, recording stop | Mute Seema, remove her spotlight; confirm recording captured the full session before ending | — |

**Never leave dead air at a handoff.** Host's line while the Moderator does the above: *"Thank you, [name] — while we bring in our next speaker, [one-line teaser]."* Draft all seven teasers in advance, not live.

---

## 5. Use-case playbook — the generic action sequence, phase by phase

The run-of-show table above is specific to this program's speaker names and times. This section is the reusable version — the exact sequence of who-does-what for each *kind* of moment, so the team can run it correctly even if the schedule shifts. Sequence: **opening → speaker → Q&A → speaker → Q&A → speaker-with-slides → Q&A → break → next speaker.**

### Opening

1. Pre-flight (§3) already complete: recording running, interpretation live, sign interpreter spotlighted once.
2. Host unmutes **himself** (free action, §2a) and delivers the opening announcement (§7).
3. Host introduces the first speaker by name/topic, still on his own mic.
4. Moderator: unmutes the speaker (Moderator-only action, §2b), adds their spotlight (first spotlight — nothing to remove yet).
5. Host mutes himself as the speaker begins — standing habit, every time, to avoid two open mics overlapping.

### Speaker segment (talk portion)

- Speaker talks, spotlighted, already unmuted by the Moderator.
- Moderator's only job here: watch the spotlighted speaker's mic icon in case they accidentally self-mute (§2b) — if it happens, unmute them again immediately, don't wait for them to ask.
- If this speaker has slides: Slide operator shares on their verbal cue throughout (see the slides variant below).
- Host stays muted (§2a) unless something needs an interim announcement, in which case he self-unmutes (or uses push-to-talk) to speak, then re-mutes.

### Q&A segment

1. Host wraps the talk: "Let's move to questions." Speaker stays unmuted/spotlighted — they're about to answer.
2. Attendee raises hand or submits a text question (text is the preferred default for anyone with a screen-reader or dexterity need, `zoom_setup.md` §5.5).
3. Moderator unmutes that specific attendee (Moderator-only, §2b).
4. Moderator **adds** a spotlight to the attendee — doesn't need to remove the speaker's. Because multiple spotlighted people means the recording shows whichever of them is actively talking (`zoom_technical_setup.md` §4), this one click is enough: the recording shows the questioner while they talk, and automatically flips back to the speaker the moment the speaker resumes.
5. Host: "Go ahead, [name]."
6. Attendee asks their question.
7. Speaker answers — no spotlight action needed, the automatic active-speaker-among-spotlighted behavior handles the visual switch back.
8. Moderator mutes the attendee back, and removes their spotlight (cleanup — not urgent, can batch after a run of several questions).
9. Repeat 2–8 for each further question in the window.
10. At the end of Q&A: host thanks the speaker; Moderator mutes the speaker and removes their spotlight, ready for the next handoff.

### Speaker-with-slides variant

Layered on top of the standard speaker segment above:

1. At T-3 minutes before this speaker's slot (same cue point as every speaker), Slide operator confirms the deck is loaded — before the introduction starts, not during.
2. Host introduces the speaker as normal; Moderator unmutes + spotlights them as usual.
3. Speaker says their agreed cue phrase ("next slide, please" — confirmed with them directly, not invented on their behalf, `zoom_technical_setup.md` §6) whenever they want to advance.
4. Slide operator advances on hearing the cue. No one else touches that share.
5. If the cue doesn't land clearly (audio glitch, interpreter crosstalk), Slide operator **waits rather than guesses** — a one-slide lag beats advancing on the wrong beat. Past ~10 seconds of visible confusion, the host can ask directly: "[Name], ready for the next slide?"
6. Q&A and handoff for this speaker follow the standard sequence above — slides don't change anything about muting or spotlighting.

*(Seema Flower's slot is exactly this pattern — see §4 for her specific run-of-show row.)*

### Break

1. Host announces the break **with the explicit return time spoken aloud** ("We'll resume at 13:35 Sofia time") — never rely on an on-screen countdown alone, which a blind attendee can't perceive.
2. Moderator mutes the outgoing speaker and removes their spotlight. The sign interpreter's spotlight is untouched.
3. Good window for a spoken-interpreter handoff if running two per shift — coordinated on their own side-channel, not something the Moderator manages.
4. Slide operator loads the next one or two speakers' decks if not already staged.
5. Moderator admits the next speaker from the waiting room during the break, so they're ready and audio-checked before the break ends.

### Next speaker (handoff out of a break or out of Q&A)

1. Host delivers the handoff/teaser line (§7) — self-unmutes first if he'd muted during the break.
2. Moderator unmutes the incoming speaker and adds their spotlight (removing the outgoing one, if that wasn't already done during the preceding break/Q&A close).
3. If this speaker has slides, Slide operator has them ready per the slides variant above.

---

## 6. Q&A / raise-hand flow — condensed reference

(Full walkthrough is §5 above; this is the quick version to glance at live.)

1. Attendee raises hand or types into Q&A.
2. Moderator unmutes them directly (one click, given "Allow host to unmute participants" is confirmed on).
3. Moderator adds their spotlight (doesn't need to remove the speaker's — §5).
4. Host: "Go ahead, [name]."
5. They ask; speaker answers.
6. Moderator mutes them back and removes their spotlight.

### 6a. Seema Flower's segment — specific walkthrough

1. At the T-3-minute cue, Slide operator confirms Seema's deck is loaded — before her introduction starts, not during.
2. Host introduces Seema as normal.
3. Seema speaks and says her agreed cue phrase whenever she wants to advance.
4. Slide operator advances on hearing the cue — no one else touches her share.
5. If the cue doesn't land clearly, Slide operator waits rather than guesses; past ~10 seconds of confusion the host can ask directly.
6. Spotlighting, Q&A, and handoff otherwise follow §4/§5 as normal.

---

## 7. Scripts for the host

**Opening announcement (read verbatim, before the first speaker):**

> "Welcome, and thank you for joining us. A few quick notes before we begin. This session has live interpretation between Bulgarian and English — select your channel from the Interpretation icon in your Zoom controls. We also have a sign-language interpreter available throughout: click that same Interpretation icon and choose the sign-language option to open their video — once open, you can freely resize and reposition it anywhere on your screen, including on top of the slides. If you'd like to ask a question, you can raise your hand using Alt+Y on Windows or Option+Y on Mac, or simply type your question into the Q&A panel at any time — we'll read every question aloud. If anything about the technical setup isn't working for you, please say so in the Q&A panel and we'll address it live."

**Standard handoff line (adapt the teaser per speaker):**

> "Thank you, [outgoing speaker] — that was [one-line reflection]. While we bring in our next speaker, [one-line teaser for incoming speaker]."

**If a technical failure happens (any of `zoom_setup.md` §9):**

> "We're having a brief technical issue with [what specifically — audio / interpretation / video]. We're working on it now and will be back in just a moment." — say this **immediately**, don't wait to see if it resolves itself first. Per `zoom_setup.md` §9.5, silence is the one thing not to do.

### 7a. Audience viewing instructions — what to put in the pre-event note

- **Slides need no action** — the shared screen is automatically the dominant view for everyone; there's no "pin the presentation," since a screen share isn't a video tile.
- **To keep seeing the speaker alongside the slides**, pin the speaker's own video (not the slide operator's — nobody needs to watch whoever's just advancing slides). Side-by-side mode (adjustable split via the divider) is the reliable, well-documented way to do this. A fullscreen-share-with-floating-video overlay also exists in Zoom, but its exact steps vary enough by client/version that the moderation team should verify and note the precise click-path during the dry run rather than this doc guessing at it.
- **Sign-language interpretation is opt-in, not automatic** — once the host activates it, attendees get an in-meeting alert and must click the Interpretation icon and choose the sign-language option themselves before the floating interpreter window appears. Once open, it's independent of everything else on screen (including a fullscreen share) and each attendee resizes/repositions it to their own preference.
- **Blind attendees need none of the above.** Pinning, resizing, and fullscreen are all purely visual and have zero effect on audio or on anything a screen reader announces — there's nothing for them to act on. The sign interpreter is a separate accommodation for Deaf/hard-of-hearing attendees, not blind ones. A blind attendee's only real actions are selecting their audio interpretation channel and navigating Q&A/chat via screen reader (`zoom_setup.md` §6.5) — and since a shared screen is a rendered visual stream no screen reader can read regardless of layout, the actual accessibility fix for slide content is procedural, not a Zoom setting: **speakers verbally describing what's on each slide** (`zoom_setup.md` §6.1.4), which the pre-event speaker note should already be requiring.

---

## 8. Failure-mode quick reference

Full detail in `zoom_setup.md` §9 and `zoom_technical_setup.md` §8 (fallback event plan) — this is the condensed version to have open live:

| Problem | Immediate action |
|---|---|
| Speaker's connection drops | Moderator messages them on backup contact; host says so out loud; reconnect >2 min → move to next speaker, slot the dropped one back in later |
| Speaker can't reconnect at all | Fall back to phone/messaging for a rejoin link; if a pre-recorded backup exists, play that instead |
| Spoken interpreter's feed cuts out | Second interpreter (if on shift) takes over immediately; if solo, host states plainly that interpretation has dropped and is being restored |
| Sign interpreter's feed cuts out | Standby interpreter added via Interpretation menu; host states out loud that sign interpretation has dropped |
| The meeting itself is compromised (lost control, disrupted) | Pivot to the private backup Zoom meeting (`zoom_technical_setup.md` §8) — link goes to speakers/moderation team only, not posted publicly mid-event without a clear reason |
| Zoom platform-wide outage | Check Zoom status page; if a backup platform link was pre-shared with speakers/co-hosts, post it now; otherwise send the pre-drafted holding message |
| Slide cue missed/unclear | Slide operator waits rather than guesses; host can ask the speaker directly if it drags past ~10 seconds |
| Two people end up spotlighted unintentionally | Moderator error, not a Zoom bug — spotlight doesn't auto-replace (`zoom_technical_setup.md` §4). Remove the stale one manually. |
| A speaker mutes themselves mid-talk and can't undo it | Expected, given self-unmute is off (§2b) — Moderator unmutes them again immediately |

**The one rule that covers everything above:** whatever breaks, say what's happening out loud, in words, immediately. Never let a failure be visible only to sighted participants watching the screen.

---

## 9. Post-event

- [ ] Confirm Cloud Recording processed successfully and includes: video, per-language audio files, and the screen-share track with speaker video included (`zoom_technical_setup.md` §5)
- [ ] Confirm the sign-language interpreter is actually visible **throughout** the saved recording, not just live and not just in isolated moments — check that the gallery-view/separate-files recording layout was actually used (not the single active-speaker default, which drops a silent spotlighted interpreter out entirely — `zoom_technical_setup.md` §5), that the "Record Sign Language Interpreter" setting (if present) worked, and that the spotlight-at-pre-flight held for the whole event
- [ ] Hand raw files to the freelance video editor (`zoom_technical_setup.md` §5, §7) along with the run-of-show table above so they know what each segment is
- [ ] Note anything that broke live (§8) so it's fixed before the next event, not just survived through

---

## Sources

- [Zoom Spotlight — behavior for adding/removing multiple spotlights](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0068261)
- [Zoom pin vs. spotlight — local vs. global scope](https://teamdynamix.umich.edu/TDClient/30/Portal/KB/ArticleDet?ID=4184)
- [Requesting permission to unmute participants — Zoom Support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0065350)
- [Using Q&A in Zoom Meetings — Zoom Support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0065237)
- [Enabling Q&A for Meetings — Zoom Support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0058425)
- [WebAIM: Captioning and Sign Language Interpretation in Zoom — Features and Pitfalls](https://webaim.org/blog/captioning-interpretation-in-zoom/)
- [Zoom push-to-talk — hold Spacebar to temporarily unmute](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0063245)
- [Zoom pre-assigned interpreters do not auto-activate in Meetings (Webinar-only automation) — Zoom Community](https://community.zoom.com/t5/Zoom-Meetings/Pre-assigned-interpreters-in-a-meeting/m-p/219253)
- [Zoom Alternative Host requires same-account licensed user — Zoom Support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0067027)
- [Sign Language Interpretation window floats independently, including over fullscreen screen shares](https://www.washington.edu/accesscomputing/resources/accesscomputing-news-december-2022/zoom-announces-new-features-support-sign-language)
- [Viewing sign language interpretation is opt-in per attendee via the Interpretation icon — Zoom Support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0066357)
- [Side-by-side mode and video layout options during screen share](https://itsupport.ou.edu/TDClient/30/Unified/KB/ArticleDet?ID=3149)
- Also see all sources already listed at the bottom of [`zoom_setup.md`](./zoom_setup.md) and [`zoom_technical_setup.md`](./zoom_technical_setup.md), which this document assumes and builds on.
