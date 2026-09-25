# Zoom Setup & Live-Event Playbook

**Event:** "Adapting the Workplace for People with Disabilities" — International Online Conference
**Date/time:** 29 Sep 2026, 12:00–15:00 EEST, via Zoom
**Host organization:** Social Future Foundation (Jamba – Careers for All)
**Main organizer/host:** Christian Grigorov
**Confirmed accessibility support:** two-way BG/EN spoken interpretation, a sign-language interpreter, ~25-minute speaker slots (15 min talk + 10 min Q&A), per-speaker connection test the day before, access link shared via social media + direct email
**Written:** 2026-09-18, 11 days out

## Open items to confirm before locking this plan

These affect which sections below apply. Everything else in this doc is written to work either way, with the differences called out.

1. **Meeting vs. Webinar license** — **resolved 2026-09-24, 5 days out: default to Zoom Meeting.** Business plan is confirmed; the Webinar add-on's status is not (it's always a separate paid add-on on top of any plan tier, Business included), and there's no time this close to the date to safely gate the plan on purchasing/attaching one. Meeting mode is already active, supports up to 300 participants, and fits this event's expected size. Full reasoning and a 2-minute license-check step in [`zoom_technical_setup.md` §2](./zoom_technical_setup.md#2-zoom-license--meeting-vs-webinar-resolved-for-now). If that check ever turns up an active Webinar license, it's still fine to switch — see that doc for what changes.
2. **Registration form** — not yet decided. Recommendation below is a separate accessible form (Google Form) rather than Zoom's built-in registration page, because Zoom's own registration UI has known screen-reader/tab-order rough edges. Revisit if a decision is needed sooner.
3. **Captioning** — no separate CART captioner planned; the spoken-language interpreters and the sign-language interpreter are the primary accommodation, per your call. Zoom's free automated captions are enabled as a supplementary layer only (see §4), not treated as sufficient on their own.
4. **Outage backup platform** — not decided. This doc includes a lightweight Google Meet fallback as an optional, low-cost safety net (§9). Adopt or skip it; the rest of the plan doesn't depend on it.

---

## 1. Registration

### 1.1 Fields to collect
Whichever form you use, include:
- Name, email, organization/role (standard)
- Timezone (so you can send each speaker/attendee correct local start times — international audience)
- **Screen reader use** (yes/no) — lets you proactively send the "using Zoom with a screen reader" quick-start note (§6.5) instead of waiting for someone to hit friction live
- **Interpretation channel preference** — BG audio / EN audio / sign language / none
- **Captioning preference** — none / Zoom auto-captions on
- **Free-text accommodation field** — "Anything else that would help you participate?" This is the single most important field; don't rely on the checkboxes above to cover every case
- Consent checkbox for recording, if the session will be recorded

### 1.2 Built-in Zoom registration vs. separate form
| | Zoom built-in registration | Separate form (e.g. Google Form) |
|---|---|---|
| Setup effort | Low — lives inside the Webinar scheduling flow | Extra step: import/email registrants their join link |
| Accessibility | Known screen-reader and tab-order issues reported by accessibility auditors | Full control over labels, field order, focus order — verify with a screen reader pass regardless of which tool |
| Custom questions | Supported (Registration → Custom Questions tab; short answer / single answer / multiple answer types) — usable for the fields above | Full free-form control |
| Data ownership | Lives in Zoom | You own the raw data |

**Recommendation:** separate accessible form, confirmed accommodation needs emailed back to registrants manually with the join link and the screen-reader quick-start note. If time runs short, Zoom's built-in registration with the custom-questions tab is an acceptable fallback — just do a screen-reader pass on the form yourself before sending it out (§8).

### 1.3 Registration page accessibility checklist
- Every input has a visible, programmatically-associated `<label>` (not a placeholder-only field)
- Tab order matches the visual/reading order (don't reorder fields with CSS without also reordering the underlying form)
- Required fields are announced as required to a screen reader, not just marked with a red asterisk
- Confirmation screen and confirmation email both state the Zoom join link as *text*, not only as a button/image

---

## 2. Sign-language interpretation setup

Zoom's dedicated **Sign Language Interpretation View** is the right feature here — it's a separate mechanism from the spoken-language interpretation feature (§3), and both can run in the same session.

### 2.1 What it does
- Deaf/hard-of-hearing participants get a dedicated, self-controlled interpreter video window that they can resize, reposition, and keep pinned independently of gallery view, spotlighting, or screen shares — it doesn't get bumped by other video layout changes.
- The host can designate up to 20 interpreters for a single session (you need exactly one, per your current setup).
- Everyone in the meeting is notified when sign-language interpretation becomes available.

### 2.2 Configuration steps
1. **Account level, before the event:** Zoom web portal → Settings → Meeting tab → *In Meeting (Advanced)* → enable **Sign Language Interpretation View**.
2. **When scheduling the webinar/meeting:** you can pre-assign the interpreter by email in the scheduling screen, or add them live.
3. **Day-of, once the interpreter has joined:** meeting controls toolbar → **Interpretation** menu → **+ Add Interpreter** → select the interpreter from the participant list.
4. Confirm with the interpreter beforehand that they know to keep their camera **on** for their assigned segments — Zoom hides interpreter video by default until the interpreter is actively enabled, and only one interpreter's feed is shown at a time if more than one is ever added later.

### 2.3 Known limitations to plan around
- If you ever add breakout rooms, interpretation resets — the interpreter has to be re-added per room. Not relevant if this event stays single-session, but worth knowing if a breakout is added later.
- Because only one interpreter feed displays at a time, don't add a second sign-language interpreter as a "just in case" backup that's live simultaneously — it'll fight the primary feed for the slot. Instead, keep a backup interpreter as a *standby* co-host who only gets added via the Interpretation menu if the primary drops (see §9).
- Recording: pin or spotlight the interpreter's video during recorded segments, or the interpreter may not appear in the saved recording at all.

---

## 3. Spoken (BG/EN) interpretation setup

This is Zoom's separate **Language Interpretation** feature — dedicated audio channels attendees switch between, like tuning a radio.

### 3.1 Configuration steps
1. **Account level:** Settings → Meeting → *In Meeting (Advanced)* → enable **Language Interpretation**; add Bulgarian and English (English often needs adding as a custom language pair alongside Zoom's presets, depending on account region — verify both appear in the dropdown before event day).
2. **When scheduling:** tick "Enable language interpretation," and pre-assign each interpreter's email against their language pair (e.g., interpreter A: Bulgarian → English, interpreter B if you have a second one: English → Bulgarian).
3. **Day-of, once interpreters have joined:** host clicks the **globe/Interpretation icon** in the meeting toolbar to open the interpreter panel and confirm both are active before the event opens to attendees.
4. **Attendee side:** each participant clicks the **Language** option in their audio controls and selects BG or EN. The interpreter's voice becomes the primary audio in that channel; the original speaker's voice continues underneath at reduced volume.

### 3.2 Handoff between interpreters, if you use more than one
- If BG↔EN interpretation is split across two people (common for a 3-hour event — simultaneous interpretation is fatiguing after ~20–30 minutes solo), agree on a handoff cadence in advance (e.g., swap every 2 speaker slots) and have the off-duty interpreter mute their mic in the interpreter panel, not just leave the channel silent, so there's no accidental cross-talk.
- Give interpreters a private channel to coordinate handoffs that isn't the main audio — a side chat thread or a WhatsApp/Telegram thread works; don't make them coordinate via the meeting's spoken audio.

### 3.3 Test before the event
- Run a full interpretation dry run during the tech rehearsal (§7): have each interpreter speak on their channel, and have someone on the attendee side confirm they can select BG and EN channels and that the volume balance (interpreter foreground / original speaker background) is usable.

---

## 4. Captions

Given interpreters (spoken + sign) are the primary accommodation for this event, captions are a **supplementary layer**, not the main accessibility mechanism:
- Enable Zoom's free **automated live captions** (Settings → Meeting → *In Meeting (Advanced)* → Live Transcription/Closed Captioning). No extra cost, no setup beyond the toggle.
- Be explicit in pre-event communication that these are auto-generated and not fully accurate — don't imply they're an equivalent accommodation to the human interpreters.
- If budget or time later allows a human CART captioner, that requires booking a third-party vendor and connecting them via API token or a StreamText link ahead of time — flagging this as a possible future upgrade, not part of the current plan.

---

## 5. Moderation and speaker rotation

### 5.1 Roles
- **Host:** Christian (or designated backup — see §9.1 for the "auto-promote co-host" safety net)
- **Co-host(s):** at least one person solely responsible for admitting speakers, managing mute state, and spotlighting — don't make the host also do this manually while also running the event narration
- **Interpreter wrangler (can be the same co-host):** watches for interpreter handoffs, re-enables sign-language interpretation if it drops
- **Chat/Q&A monitor:** reads written questions aloud for the benefit of anyone who can't see chat, and relays spoken questions into chat/Q&A text for anyone who can't hear

### 5.2 Waiting room vs. direct admit / backstage
- **If using Webinar:** speakers join as **panelists** into the **Backstage** (a green room open before/during/after — ideal for a final audio/video check, last-second coordination, and letting a nervous speaker settle in before their segment). Attendees join directly as **attendees** with no waiting room needed — Webinar's attendee role is already restricted to chat/Q&A, so there's no risk of an unvetted attendee disrupting the session.
- **If using Meeting instead:** use a **waiting room** for admission control, since all participants are otherwise equal. Pre-assign speakers to bypass the waiting room (or admit them a few minutes early) so their backstage-equivalent check happens before the public join.

### 5.3 Running the 25-minute speaker rotation
1. Co-host cues the next speaker from backstage/waiting room ~3–5 minutes before their slot, confirms audio/video live
2. Host introduces the speaker (consider a short written/spoken bio so screen-reader and low-vision attendees get the same intro sighted attendees get from any on-screen name card)
3. Co-host spotlights the speaker's video for the 15-minute talk (spotlighting, not just pinning, ensures the *recording* also shows the right feed for anyone watching back)
4. At the 15-minute mark, host moves to Q&A; co-host un-spotlights so both speaker and question-asker are visible
5. At the 25-minute mark, co-host mutes the outgoing speaker's mic and moves them back to backstage/waiting area while the host introduces the next speaker — this handoff should never leave dead air, so keep a short "housekeeping" line ready for the host to fill the gap

### 5.4 Muting discipline
- All non-active participants muted on entry (Webinar attendees are muted by default with no unmute self-service; for Meeting, enable "mute participants on entry" in settings)
- Panelists/speakers not currently presenting should self-mute — assign the co-host to mute-on-behalf if someone forgets, rather than calling it out live

### 5.5 Accessible Q&A for screen-reader users / limited dexterity
- **Raise Hand keyboard shortcut:** Alt+Y (Windows) / Option+Y (Mac) — toggles raise/lower hand without touching the mouse. Publish this shortcut in the pre-event email, not just assume people will find it.
- **Prefer the Q&A panel's text-question path over "raise hand → get unmuted → speak"** as the default route for anyone who flags a screen-reader or dexterity need at registration — typing a question into Q&A and having the moderator read it aloud removes the multi-step "find the right toolbar button" fumble that raise-hand-then-unmute involves.
- Don't use emoji-only reactions as a polling mechanism — screen readers don't reliably surface reaction bursts, and they disappear after a few seconds even for sighted users who look away. Use the **Q&A panel** or a live poll with results read aloud, not reactions, for anything that needs a real answer.
- If the host ever says "raise your hand if..." live, always pair it with the keyboard-shortcut instruction and a spoken alternative ("...or just type 'yes' in chat/Q&A") — never leave a purely visual cue as the only path to participate.

---

## 6. Mic/connection testing (pre-event)

### 6.1 What the "day-before connection test" should cover, per speaker
Not just "can you get into the call" — actually verify:
1. **Audio path:** speaker's mic level is audible and not clipping; confirm they're not on a laptop's built-in mic if a headset/external mic is available
2. **Video path:** framing, lighting, and that video isn't so dark it strips any expressive content interpreters might use as visual context
3. **Network stability:** ask the speaker to stay on the test call for a full 5 minutes minimum, not just join and leave — brief drops often show up only after a couple of minutes, and this matters more for international speakers on longer/less predictable network paths
4. **Screen share, if their talk uses slides:** confirm they know how to start/stop it, and check slide content isn't purely visual (a slide-only diagram with no verbal description is a content gap for blind attendees regardless of interpretation — flag this to each speaker in advance, not discover it live)
5. **Backup contact info exchanged:** a phone number or messaging app (WhatsApp/Telegram/etc.) for each speaker, in case Zoom itself fails on the day (§9.2) — collect this *during* the connection test, not after
6. **Correct local time confirmed verbally** — don't rely solely on the calendar invite auto-converting correctly across timezones

### 6.2 Interpreter-specific test items
- Confirm each interpreter's assigned channel/role works from their actual event-day setup (some interpreters test from one device, then work from another on the day — test the real one)
- Confirm the sign-language interpreter's lighting/background gives adequate contrast for their hands/face to read clearly on camera
- Run through the handoff protocol from §3.2 at least once live, not just describe it

### 6.3 Full dry run (in addition to individual speaker tests)
Book one session with the full moderation team (host, co-host(s), both interpretation types) that rehearses:
- A full round of the spotlight → un-spotlight → mute → backstage-return cycle from §5.3
- At least one simulated Q&A using the keyboard-shortcut raise-hand path and the Q&A-panel text path
- Enabling and disabling sign-language interpretation and language-interpretation channels live, so whoever is running the co-host seat has done it once before doing it under time pressure on the real day

### 6.4 What to send speakers beforehand
A short written pre-event note (not just a calendar invite) with: the Zoom link, their exact local start time, the backstage/join-early instruction, the backup-contact exchange ask, and a one-line reminder that this is an accessibility-focused audience so any slide content should be described verbally, not just shown.

### 6.5 Screen-reader quick-start note (for registrants who flagged screen-reader use)
A short doc/email covering: how to join via the Zoom desktop app vs. browser with a screen reader, the raise-hand shortcut (§5.5), how to select an interpretation audio channel, and how to enable/adjust screen-reader announcement verbosity in Zoom's accessibility settings — sent proactively, not only on request.

---

## 7. Pre-event timeline (11 days out from today, 2026-09-18)

| When | What |
|---|---|
| ASAP | Confirm Webinar vs. Meeting license (§ Open items) — this gates several other setup steps |
| ASAP | Finalize registration form and send to speaker/attendee lists |
| T-7 days | Account-level feature toggles done (sign-language view, language interpretation, live transcription) |
| T-5 to T-3 days | Individual speaker connection tests (§6.1) |
| T-2 days | Full moderation + interpreter dry run (§6.3) |
| T-1 day | Send final join instructions + screen-reader quick-start note to all confirmed registrants |
| Event day, T-30 min | Backstage/waiting room opens for speakers and co-hosts; final audio/video checks |
| Event day, T-0 | Event opens to attendees |

---

## 8. Pre-launch accessibility checklist

Run this against the registration form, the pre-event emails, and the live session settings before calling any of it done:
- [ ] Every form field has a real `<label>`, not placeholder-only text
- [ ] Tab order on the registration form matches visual/reading order
- [ ] Accommodation free-text field present and visibly positioned near the top, not buried
- [ ] Join link and all instructions exist as plain text somewhere (not image-only or button-only)
- [ ] Raise-hand shortcut and Q&A-panel path documented in the pre-event email
- [ ] Sign-language interpretation view and language interpretation both toggled on at the account level and tested together in the same session
- [ ] Auto-captions enabled as a supplementary layer, framed correctly as "not the primary accommodation" in any pre-event messaging
- [ ] No step in the plan depends on a purely visual cue (reactions, hand-raise icon, color-only status) without a spoken/textual equivalent

---

## 9. Handling failures live

### 9.1 A speaker's link fails or their connection drops mid-talk
- Co-host immediately messages the speaker on the backup channel collected in §6.1 (phone/WhatsApp/Telegram)
- Host fills the gap with a short prepared line ("we're reconnecting with [speaker], back in a moment") rather than dead air — dead air is worse for screen-reader users than for sighted ones, since there's no visual "please wait" cue to fall back on
- If reconnection takes more than ~2 minutes, host moves to the next speaker in rotation and slots the dropped speaker back in later if time allows, or follows up with a recorded/async submission afterward

### 9.2 A speaker's link fails entirely / can't get back in
- Fallback to the phone/messaging backup contact to relay a rejoin link
- If truly stuck, and the speaker prepared a backup: pre-recorded intro or short video submission as a fallback content plan — worth asking each speaker at test time whether they can supply a 2–3 minute recorded backup, but not mandatory for all

### 9.3 The interpreter's feed cuts out (spoken or sign)
- **Spoken interpretation:** if a second interpreter is on rotation (§3.2), they take over immediately since both are already assigned to the interpreter panel. If there's only one interpreter, host briefly pauses and states plainly that interpretation has dropped and is being restored, rather than continuing to talk over what listeners on that channel can no longer follow
- **Sign-language interpretation:** co-host has a standby interpreter (§2.3) ready to be added via the Interpretation menu; until then, host verbally states that sign interpretation has dropped so deaf attendees relying on captions/chat know why the video feed stopped, rather than assuming a personal connection issue

### 9.4 Zoom itself has an outage
- Check Zoom's status page immediately to confirm it's a platform-wide outage and not just your account/network
- If adopting the optional Google Meet fallback (§ Open items): have the backup link pre-created and already shared with speakers and co-hosts (not attendees, to avoid a confusing mass-scramble) before the event starts, so it can be posted to registrants' emails and any social channels immediately if needed
- If no backup platform: prepared holding message to send via email/social ("Zoom is experiencing a platform-wide outage; we'll resume as soon as service is restored / will reschedule to [date]") — draft this in advance so it doesn't need to be written under pressure

### 9.5 General principle for all of the above
Whatever goes wrong, the host says what's happening out loud, in words — never let a technical failure be silently visible only to sighted participants watching the screen. This is the single most important rule in this section for a screen-reader-using co-organizer and audience.

---

## Sources

- [Zoom sign language interpretation view enhances remote learning for the Deaf](https://www.zoom.com/en/blog/zoom-sign-language-interpretation-view/)
- [Enabling Sign Language interpretation view — Zoom Support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0058636)
- [Using sign language interpretation in a meeting or webinar — Zoom Support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0065246)
- [Viewing sign language interpretation — Zoom Support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0066357)
- [WebAIM: Captioning and Sign Language Interpretation in Zoom: Features and Pitfalls](https://webaim.org/blog/captioning-interpretation-in-zoom/)
- [Using Language Interpretation in your meeting or webinar — Zoom Support](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0064768)
- [Zoom interpreter setup: how Language Interpretation works, and when it's the wrong tool](https://intermind.com/blog/zoom-interpreter)
- [Zoom Closed Captioning Service for Live Communication — Verbit](https://verbit.ai/blog/captioning/3rd-party-zoom-closed-captioning/)
- [ZOOM Closed captioning and live transcription — DU Ed-Tech](https://otl.du.edu/knowledgebase/zoom-closed-captioning-and-live-transcription/)
- [Adding custom questions to webinar registration form — Zoom Community](https://community.zoom.com/webinars-19/adding-custom-questions-to-webinar-registration-form-2666)
- [Accessibility Tips for Zoom and Other Virtual Programs — MIUSA](https://miusa.org/resource/tip-sheets/accessibility-tips-for-zoom-and-other-virtual-programs/)
- [Zoom Accessibility FAQ](https://www.zoom.com/en/accessibility/faq/)
- [Forms Accessibility for Screen Readers and WCAG Forms](https://beaccessible.com/post/forms-accessibility/)
- [How To Host A Webinar — Zoom](https://www.zoom.com/en/products/webinars/resources/hosting-a-virtual-event-guide/)
- [Zoom Webinar Best Practices — Columbia University IT](https://www.cuit.columbia.edu/zoom-webinar)
- [Accessible Zoom Meetings — UC Irvine](https://zoom.oit.uci.edu/accessible-zoom-meetings/)
- [Keyboard shortcuts in Zoom — UW Accessible Technology](https://www.washington.edu/accesstech/meetings/zoom/shortcuts/)
- [Best Practices for Inclusive Events for Blind and Visually Impaired Attendees — CNCF](https://contribute.cncf.io/projects/best-practices/accessibility/blind-and-visually-impaired/best-practices-for-inclusive-events-for-blind-and-visually-impaired-attendees/)
- [Zoom Accessibility Best Practices — CU Boulder](https://www.colorado.edu/digital-accessibility/resources/zoom-accessibility-best-practices)
- [Zoom: Accessibility Considerations & Best Practices — UVA Library](http://library.virginia.edu/services/accessibility-services/zoom-best-practices)
- [A Contingency Playbook for Microsoft Teams and Zoom Outages — HP](https://workforceexperience.hp.com/blog/microsoft-teams-zoom-outage/index.html)
- [Zoom Outage Contingency Plan — Syracuse College of Law](https://answers.atlassian.syr.edu/wiki/spaces/law/pages/155749842)
