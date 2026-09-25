# Technical Equipment & Zoom Production Setup

**Purpose:** evaluate the technical-services quote from the studio the Jamba team contacted, and decide what equipment/setup is actually needed for the event as it's currently planned. This is a companion to [`zoom_setup.md`](./zoom_setup.md), which covers Zoom's software-side features (interpretation, captions, registration, moderation roles). This doc covers the *physical/production* side: is separate AV hardware needed, is the event doable in-house, and how the slides/interpreters/recording actually get produced live.

**Confirmed with Stoyan, 2026-09-24 (5 days out):**
- No physical venue — every participant, including the Bulgarian speakers and Christian, joins Zoom individually from their own location. This is the single fact that reframes the whole quote below.
- Spoken-language and sign-language interpreters are being hired separately — their fee is not part of this equipment question.
- A polished, edited video is wanted afterward (not just the raw Zoom recording left as-is).
- Zoom Business plan is confirmed; whether the **Webinar add-on** is separately licensed on top of it is **not yet confirmed** — action item in §2.

---

## 1. The quote, evaluated line by line

The studio's 830 EUR/day quote is scoped for a **physical room with a live audience being captured and piped into Zoom** — a normal in-person-conference AV package. Since this event has no physical room, most of it doesn't apply to what's actually being run.

| Line item | Price | What it's for | Needed here? |
|---|---|---|---|
| Room sound (mixer, amp, 2 speakers on stands, 2 wireless mics) | 120 € | PA system so people physically in a room can hear a speaker on a stage/mic | **No.** There's no room and no in-room audience to reinforce sound for. |
| Video connection, video mixer, capture card, laptop for Zoom/WebEx | 160 € | Feeding a physical camera's output into Zoom as a "webcam" via a hardware switcher | **No.** Each speaker already has a native Zoom video feed from their own device — nothing needs converting or switching. |
| "Organizers must provide wired internet" | — | Needed because the mixer/capture rig is fragile on Wi-Fi | **N/A** — moot without the rig. (Individual speakers' connection quality is still worth testing — see [`zoom_setup.md` §6.1](./zoom_setup.md#61-what-the-day-before-connection-test-should-cover-per-speaker) — but that's a "each person tests their own home Wi-Fi" problem, not a venue-wiring problem.) |
| Video camera on stand × 2 | 150 € (2×75€) | Capturing wide/stage shots of a physical room | **No.** Nobody is filming a room. Each remote speaker's own laptop webcam is their camera. |
| Additional audio recording of interpretation languages + room | 60 € | A separate mixer-side recording of each interpreter's feed | **No — Zoom does this natively for free.** Enable **"Record a separate audio file for each interpretation language"** in Zoom's Recording settings before the event, and Cloud Recording saves the original audio plus one `.m4a` per language automatically, with a viewer-side language picker on playback. No extra hardware or fee needed. |
| Additional video recording per camera | 20 €/camera | Multi-camera ISO recording of a physical shoot | **No.** There's one video source per remote speaker (their own webcam) and Zoom's cloud recording already captures gallery/active-speaker/shared-screen video — see §5 for what to enable so the *editor* has enough to work with. |
| Engineer (200 €) + video operator (160 €) | 360 € | On-site crew to run the mixer/PA/cameras live | **No, as scoped.** Their job as quoted is operating hardware that doesn't exist in this plan. The equivalent live role here — running Zoom's host controls, interpretation panel, spotlighting, screen share — is a **Zoom-literate co-host**, not an AV engineer. See §7. |
| Transport in Sofia | 40 € | Getting the crew + gear to the venue | **No.** No venue, no gear to transport. |
| **Total** | **830 €** | | **Not a fit for this event as currently scoped.** |

**Recommendation:** don't book this package. Go back to the studio only if the venue answer changes (see the box below), or ask them for a *remote-production-only* quote — realistically just "an experienced Zoom producer for 3 hours," which should be a small fraction of 830 €. Separately, budget for a freelance video editor for post-production only (§5) — get an actual quote for that rather than assuming a number; it will still likely land well under 830 € since it's hours of editing work, not a day of on-site crew and hardware rental.

> **If the venue answer ever changes** (e.g. you decide to gather the Bulgarian speakers in one room for optics), most of this quote becomes relevant again — that's exactly the scenario it's priced for. Worth re-reading this table at that point rather than assuming the "not needed" verdicts still hold.

---

## 2. Zoom license — Meeting vs. Webinar, resolved for now

`zoom_setup.md`'s original open item #1 flagged this as unconfirmed and defaulted to planning for Webinar. Resolving it now, 5 days out:

- **Business plan confirmed. Webinar add-on status is not confirmed**, and Webinar is *always* a separate paid add-on regardless of plan tier — Business alone does not include it. (Starter Webinar tiers run roughly $66–80/month as a add-on on top of a base Meetings plan, typically sold on an annual/monthly license basis — confirm actual cost only if you decide to pursue it.)
- **How to check, in 2 minutes:** Zoom web portal → **Admin → Account Management → Billing** (or **Admin → Advanced → Plan Management**) — licenses currently attached to the account are listed there. If "Webinar" isn't listed, it isn't active.
- **Given 5 days out, don't gate the plan on this.** Purchasing/attaching a new add-on can involve a billing cycle or approval step that isn't worth risking this close to the date. **Default to Zoom Meeting mode**, which is already active on Business and supports up to 300 participants — comfortably more than the "5–8 confirmed speakers plus a modest public audience via the social-media link" this event expects per the brief.
- Meeting mode also has a genuine *advantage* here, not just a fallback: Webinar's attendee role is deliberately restricted (no video, chat/Q&A only), which reads as more formal/corporate. Meeting mode lets attendees optionally be seen/heard if invited to unmute for a live question — a warmer fit for an event whose whole point is peer employers sharing lived experience.
- **If it turns out Webinar *is* already licensed**, it's still fine to use — nothing else in this doc or in `zoom_setup.md` requires one over the other; just replace "waiting room" with "Backstage" per `zoom_setup.md` §5.2 and use Webinar's built-in attendee muting instead of "mute on entry."

Update `zoom_setup.md`'s open item #1 to point here once you've made the final call.

---

## 3. Do we need separate stands, cameras, and microphones? For whom?

Short answer: **no dedicated hardware for anyone** — this is a distributed event, so "equipment" means each individual's own laptop/webcam/headset, not shared production gear.

| Who | What they actually need | What they don't need |
|---|---|---|
| **Every remote speaker** (all 7, Bulgarian and foreign alike, since there's no venue) | A quiet room, decent laptop webcam, and — this is the one piece of "equipment" worth insisting on — **a headset or wired earbuds with an inline mic**, not the laptop's built-in mic/speakers. This is covered by the connection test in `zoom_setup.md` §6.1. | Camera on a stand, external mixer, wireless mic — those solve a room-acoustics problem this event doesn't have. |
| **Christian (host)** | Same as above, plus his own practiced, screen-reader-compatible control setup — reliability of *his* workflow matters more here than any visual gear. | Any of the above. |
| **Spoken-language interpreters** (hired separately) | A **headset with a boom/noise-isolating mic is not optional for them** — simultaneous interpretation with their mic open while the original speaker's audio is also live is exactly the setup that causes feedback/bleed without a good headset. Wired internet strongly preferred over Wi-Fi. Pass this as a written requirement when you hire them. | — |
| **Sign-language interpreter** (hired separately) | Plain, contrasting background and good front-facing lighting so hands/face read clearly on camera (already in `zoom_setup.md` §6.2) — this is a lighting/background ask, not a stand or camera ask. | A camera stand doesn't help legibility; framing and light do. |
| **A dedicated slide operator** (new role — see §6) | Whatever device they're comfortable screen-sharing from; no special hardware. | — |

The quote's "camera on a stand" line is for filming a room from a distance (a stage shot). A webcam clipped to or built into someone's own laptop, a few feet from their face, is the correct tool for an individual talking-head feed and is what everyone already has.

---

## 4. Simultaneous vs. switching (consecutive) interpretation

**Simultaneous — already the direction `zoom_setup.md` §3 is built for, and the right call. Confirming it explicitly:**

- **The schedule doesn't survive consecutive interpretation.** Consecutive (speaker pauses every sentence/paragraph, interpreter renders it, then speaker continues) roughly **doubles** a segment's length. Seven 25-minute slots (15 talk + 10 Q&A) already fill a ~3-hour window; doubling any of them blows the schedule immediately, and Q&A becomes almost unworkable since a real-time back-and-forth needs continuous audio, not turn-taking through a translator.
- **Zoom's Language Interpretation feature is purpose-built for simultaneous interpretation** — dedicated audio channels each attendee tunes into independently, interpreter voice foregrounded, original speaker backgrounded. This is already configured per `zoom_setup.md` §3.1.
- **The cost of simultaneous is on the interpreters, not the tech setup:** simultaneous interpretation is fatiguing solo past ~20–30 minutes, which is why `zoom_setup.md` §3.2 already plans for two interpreters alternating with a private handoff channel. Make sure whoever you hire is specifically a **simultaneous** interpreter (a distinct skill from consecutive) and has their own headset per §3 above.

**Sign-language interpretation is a different mechanism and the switching question doesn't really apply to it** — it's a continuous visual channel (the interpreter watches/listens and signs live throughout), not something attendees select between like the audio channels. There's nothing to "switch" — just keep the interpreter's video visible and correctly spotlighted (§5, and `zoom_setup.md` §2).

---

## 5. Recording for the polished post-event video

Since a polished, edited video is wanted (not just the raw Zoom file), get the *inputs* right live so editing afterward is actually possible — no separate camera crew required, this is entirely Zoom settings:

**Before the event, in Recording settings (Admin → Recording, or the scheduling screen) — these cannot be changed after the meeting starts, so get them right in the pre-flight, not mid-event:**
- [ ] Cloud Recording enabled
- [ ] **"Record a separate audio file for each interpretation language"** enabled — gives the editor clean BG and EN audio tracks (and the original) without needing the studio's "additional audio recording" line at all (§1)
- [ ] **Recording layout: untick "Record Active Speaker with Shared Screen" (Zoom's default) and tick "Record active speaker, gallery view, and shared screen separately" instead.** This is the setting that actually matters for the interpreter question below — the default single-file layout only ever shows whoever is *currently vocal* among the spotlighted set, which silently drops a silent, spotlighted sign interpreter out of the recording the entire time the speaker is talking (see the correction below). Recording the three views as separate files instead gives the editor a clean slides-only track, a clean gallery-thumbnails track (speaker + interpreter together, continuously, not switching), and a clean active-speaker track — and lets them build the actual polished composite (fullscreen slides with a positioned/sized interpreter box) in the edit, since Zoom itself has no live compositor for that (see the placement/resizing note below).
- [ ] Recording of the shared screen **with speaker's video thumbnail included** (Zoom's "record video during screen share" option) — otherwise the slides-only track has no visible speaker at all
- [ ] If present in this Zoom version: Recording → Cloud Recording → **"Record Sign Language Interpreter"** checked, as an additional safety net on top of the gallery-view fix above. Support for this checkbox varies by account/version — check for it during the dry run.

**Correction to an earlier version of this doc:** spotlighting the interpreter alone is *not* sufficient for them to appear in the recording, and saying "the pair never competes" was misleading. Under the default recording layout, an always-silent spotlighted interpreter loses the active-speaker contest to the speaker every time — meaning they'd effectively never appear while anyone is talking, which is the whole event. The gallery-view/separate-files setting above is what actually fixes this; spotlighting is still necessary (it decides *which* tiles are in the gallery/active-speaker set) but was never sufficient on its own.

**Live, the moderator (not a separate "video operator") must:**
- **Spotlight — not just pin — the sign-language interpreter**, once, during the pre-flight before doors open, and then leave it alone for the rest of the event. Spotlights are additive (Zoom allows up to 9 at once) and persist until manually removed, so the interpreter's spotlight doesn't need touching again — only the *speaker's* spotlight changes each rotation (§4 of `zoom_event_moderation.md`).
- Swap the spotlight to each new speaker at handoff — **this is a two-step action, not one.** Spotlighting a new person does not automatically remove the previous spotlight; the moderator has to explicitly "Remove Spotlight" from the outgoing speaker or the recording ends up with two people spotlighted at once.

**On placing, resizing, or repositioning video tiles — live or in the recording: Zoom doesn't offer this as a host-side control, confirmed directly.** Live, each attendee gets *their own local* layout choices (gallery vs. speaker view, resizing the share/video split, resizing the dedicated Sign Language View window) — the host can't set one layout for everyone, and for this use case that's arguably correct anyway: a Deaf viewer should size the interpreter window however works for them, not however the host chose. In the recording, it's simpler still: Zoom's own documentation confirms **presenter layout choices are not preserved in local or cloud recordings at all** — whatever gets fiddled with live is ignored, and the recording just uses whichever preset was configured beforehand (the three options above). There is no drag/resize/position compositor in Zoom. The only way to get an exact "fullscreen slides with a precisely placed interpreter box" look is: (a) build it in post-production from the separate raw files (the recommended path here, since a video editor is already planned), or (b) run a tool like OBS Studio as a virtual camera feeding a custom-composited scene into Zoom live — real, but a dedicated production role on top of everything else, not worth taking on 4 days out.

**After the event:** hand the raw Cloud Recording files (video + per-language audio + shared-screen recording) to a freelance video editor. This is a bounded, well-scoped editing job — get an actual quote rather than assuming a price, but it should be dramatically cheaper than a day of on-site AV crew, since it's post-production hours against files that already exist, with no live-event risk attached to it at all.

---

## 6. Seema Flower's slide request, and a general policy this suggests

Seema Flower (Founder & Managing Director, Blind Ambition) asked for someone to swipe/advance her slides during her talk. Her own public bio material (used when drafting her invitation — see `public/prospects/seema-flower/invitation_email.md`) documents that she is blind, which is the obvious practical reason a presenter would ask someone else to drive slide advancement rather than clicking through her own deck live — flagging that as background, not as something to state as fact back to her; confirm directly with her what she actually wants if it's not exactly this.

**Recommended setup, which also solves this generally rather than as a one-off:**

- Ask **every** speaker who's using slides (not just Seema) to send their deck in advance, by a firm deadline (e.g. T-2 days, alongside the dry run in `zoom_setup.md` §6.3).
- A single **designated slide operator** (a co-host role, can double up with an existing role from `zoom_setup.md` §5.1) has all decks loaded locally and screen-shares each one during that speaker's slot.
- Speaker advances their own slide **verbally**, on an agreed cue — plain language like "next slide, please" is enough; don't invent a special jargon cue. The slide operator advances on hearing it.
- This is strictly better than each speaker screen-sharing their own deck for a tight 15-minute slot: one fewer live "does their screen-share work" failure point per speaker (seven chances for that to go wrong otherwise), and it makes the accommodation Seema asked for simply *the way slides work for everyone*, rather than a visibly special case — which is generally the better accessibility default.
- Confirm with Seema specifically whether verbal cueing during her own talk works for her, or whether she'd prefer a pre-agreed timed script instead (e.g. if she's worried about mid-sentence interruptions) — this is a detail only she can settle, not one to assume.

This also directly answers the "dual/triple display" question:

- **This is a per-viewer, client-side Zoom layout, not something the production needs to build separately.** When the slide operator shares a screen with "include video" enabled, and the sign interpreter is spotlighted (§5), each attendee's own Zoom window already shows **all three at once**: the shared slide, the speaker's/active-participant video thumbnail, and the interpreter's dedicated, independently resizable window (per `zoom_setup.md` §2.1, the Sign Language View is deliberately separate from and unaffected by whatever else is being shared or spotlighted).
- There's no OBS scene, external monitor wall, or triple-output rig to build. The "display" work is: (1) slide operator remembers to keep their own camera on / include video when sharing, (2) co-host keeps the interpreter spotlighted, (3) this exact combination gets tested once in the dry run (§7) so nobody discovers it doesn't look right live for the first time on event day.

---

## 7. Can this be done in-house with the Jamba team? Verdict: yes

With no physical venue, the entire "technical production" collapses to **operating Zoom's host tools well**, which is a skills-and-rehearsal problem, not an equipment problem.

**What it actually takes:**
- One person comfortable as **Zoom host**: starting the meeting, opening the interpretation panel, enabling sign-language interpretation, driving recording settings.
- One or two **co-hosts** covering the roles already defined in `zoom_setup.md` §5.1 (admitting/spotlighting speakers, interpreter wrangler, Q&A monitor) — these can double up at this scale; they don't need to be four separate people.
- One **slide operator** (§6 above) — can be the same person as a co-host if comfortable multitasking, but worth keeping separate if possible so slide cues never get missed while someone's also managing spotlighting.
- The **dry run already planned** in `zoom_setup.md` §6.3, extended to specifically rehearse: spotlighting the interpreter for recording (§5), the slide hand-off cue (§6), and toggling recording settings once so nobody is finding those menus live under time pressure.

**Real obstacles — all rehearsal/logistics, not hardware:**
- Whoever hosts needs to have actually clicked through the Interpretation menu, Sign Language View toggle, and Recording settings *once* before event day — these are the exact steps in `zoom_setup.md` §2.2 and §3.1, and they're unfamiliar the first time under pressure.
- Getting all 7 speakers' decks in by the T-2 deadline (§6) is a coordination task, not a technical one — chase it early.
- The genuinely tight part of this timeline is **5 days**, not the setup itself: confirm the Meeting-vs-Webinar question (§2) today if possible, since that gates which admission-control flow (`zoom_setup.md` §5.2) the rest of the rehearsal is built around.

**Where outside help still earns its cost:**
- The interpreters (already being hired separately) — that's specialist labor, not equipment.
- The freelance video editor for post-production (§5) — bounded, low-risk, and doesn't touch the live event at all.

Nothing else from the quote is worth paying for as scoped.

---

## 8. Fallback event: one public link, a private backup — not two public ones

Decided 2026-09-25: **don't publish two live links.** A second link posted alongside the primary one on social media splits and confuses the audience, and requires someone to actively babysit a room that's (hopefully) sitting empty all event — capacity the 2–3 person moderation team doesn't have.

Instead, keep the existing `zoom_setup.md` §9.4 pattern — pre-create a backup, share it privately with speakers and the moderation team only, in advance, and only push it out publicly if the primary actually fails. Two different backups solve two genuinely different failure modes, and it's worth being precise about which is which:

| Fallback | Solves | Doesn't solve |
|---|---|---|
| **A second Zoom meeting** (same platform, different meeting ID) | A meeting-specific failure: lost host control, a corrupted meeting state, disruptive/zoombombing chaos in the primary room | A genuine Zoom-wide platform outage — you'd be moving to another room on the same broken service |
| **A different platform** (Google Meet, already optional per `zoom_setup.md` §9.4) | Both of the above, including a true platform-wide outage | Nothing extra — it's strictly the more complete fallback, at the cost of an unfamiliar tool people haven't rehearsed in |

**Given 5 days out and a stretched team, the lightweight version is the right call:** pre-create the second Zoom meeting (cheap, same platform your team already knows), test it once during the dry run, and decide whether the Google Meet layer is worth the extra setup/rehearsal time or better left as a documented-but-unbuilt option. Whichever you pick, someone (Moderator or a backup device already logged in) keeps it pre-loaded and ready — it doesn't need active live monitoring, only fast activation if `zoom_event_moderation.md` §8 calls for it.

## 9. Role-based access and onboarding — there's no per-role link, so plan the live handoff instead

A natural question once you've got several distinct roles (speaker, host, spoken interpreter, sign interpreter, moderator, slide operator) is whether each gets their own invite link that carries their permissions with it. **In Zoom Meeting mode, no — that's a Webinar-only feature** (Webinar panelists each get a personalized join link that grants panelist status automatically). Meeting mode has exactly one shared join link for everyone; every role is granted **live, inside the session**, by the host/co-host — never by which link someone clicked.

What that means concretely, per role:

| Role | Pre-assignable at scheduling? | What actually activates it |
|---|---|---|
| Speaker | No | Nothing — joins as an ordinary participant; Moderator unmutes + spotlights them at their slot (`zoom_event_moderation.md` §4) |
| Spoken-language interpreter | By email + language pair, in the scheduling screen (`zoom_setup.md` §3.1) | **Convenience only — does not auto-activate.** The host/Moderator must still open the Interpretation panel and assign them manually once they've joined, even though pre-assigned |
| Sign-language interpreter | By email, in the scheduling screen (`zoom_setup.md` §2.2) | Same caveat — manual activation live via the Interpretation menu |
| Moderator / Slide operator | Only via **Alternative Host** — and this has a hard requirement worth flagging early: the person must be a **licensed user on Jamba's own Zoom account, in the same organization.** If either of them doesn't have a login under that account, Alternative Host simply isn't available | If Alternative Host doesn't apply (likely, for a volunteer or outside helper): **live "Make Co-Host"** promotion once they've joined — works on any participant regardless of their own account, no pre-setup required |
| Audience | No | Nothing — waiting-room admission is the only gate, and grants no elevated permission at all |

**The practical upshot: "auth" here is procedural, not technical.** There's no credential that proves someone is "the moderator" — the host/co-host has to recognize who they are (by name, by expected timing) and manually grant the permission. That makes the pre-event backstage window load-bearing rather than a nice-to-have: get the Moderator, Slide operator, and both interpreters into the meeting during the **T-30-minute backstage window**, before the public link opens to the audience, so the host can hand out co-host status and interpreter assignments calmly — not while the public is already joining.

**One more consequence of the link being public:** restrict screen-sharing to **Host Only** in the Security settings, so no random attendee can hijack the share. Co-hosts (the Slide operator, once promoted) should retain sharing ability under that restriction — worth confirming specifically in the dry run rather than assuming, since it's the one interaction here not fully nailed down without seeing the account's exact UI.

---

## Sources

- [Enabling separate cloud recording audio files per interpretation language — Zoom Community](https://community.zoom.com/t5/Zoom-Meetings/Cloud-recording-interpreter-s-language/m-p/83427)
- [Comparing meeting and webinar licenses — Zoom Support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0062404)
- [Zoom Events & Webinars Pricing](https://zoom.us/pricing/events)
- [Zoom interpretation: how Language Interpretation works, what it costs, and when it's the wrong tool — InterMIND](https://intermind.com/blog/zoom-interpreter)
- [Zoom pre-assigned interpreters do not auto-activate in Meetings (Webinar-only automation) — Zoom Community](https://community.zoom.com/t5/Zoom-Meetings/Pre-assigned-interpreters-in-a-meeting/m-p/219253)
- [Zoom Alternative Host requires same-account licensed user — Zoom Support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0067027)
- [Zoom Webinar panelist links vs. Meeting's single shared link](https://help.streamalive.com/articles/10473711-zoom-where-to-find-your-zoom-meeting-or-webinar-panelist)
- [Zoom cloud recording layout options — Active Speaker vs. Gallery View vs. separate files](https://www.scu.edu/technology/get-connected/zoom/zoom-settings-faq/zoom-recording-layouts/)
- [Zoom recording of ASL/sign-language interpreters — settings and limitations](https://community.zoom.com/webinars-19/recording-sign-language-interpreters-with-presenters-and-slides-3405?postid=181619)
- [Presenter layout choices are not preserved in local or cloud recordings — Zoom Support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0063672)
- Also see all sources already listed at the bottom of [`zoom_setup.md`](./zoom_setup.md), which this document assumes and builds on.
