# Zoom Setup Essentials

One-page brief: the settings, roles, and live-flow shape of the event. This is the **what to do**, condensed — for the **why** behind any item, rationale, and full sourcing, see [`zoom_setup.md`](./zoom_setup.md) (features/accessibility), [`zoom_technical_setup.md`](./zoom_technical_setup.md) (equipment, license, recording, fallback), and [`zoom_event_moderation.md`](./zoom_event_moderation.md) (full run-of-show and use-case playbook).

**Format:** Zoom Meeting (not Webinar) · no physical venue, everyone joins individually · simultaneous BG/EN interpretation + sign-language interpretation · single public link, private backup ready.

---

## 1. Meeting setup checklist — configure before the event, most of this can't change once recording starts

**Admission & mute**
- [ ] Waiting room ON
- [ ] Mute participants on entry: ON
- [ ] Allow participants to unmute themselves: **OFF** (defaults off once mute-on-entry is on — confirm, don't assume)
- [ ] Allow host to unmute participants: **ON** (makes every moderator unmute a one click action, not a consent round-trip)
- [ ] Screen-sharing restricted to **Host Only** (Security icon) — confirm co-hosts can still share, verify in dry run

**Interpretation** (account level, then per-meeting)
- [ ] Language Interpretation enabled; Bulgarian + English added
- [ ] Sign Language Interpretation View enabled
- [ ] Both spoken interpreters + the sign interpreter pre-assigned by email at scheduling (convenience only — **does not auto-activate**; still needs manual assignment live via the Interpretation panel once they've joined)

**Recording**
- [ ] Cloud Recording enabled
- [ ] "Record a separate audio file for each interpretation language" — ON
- [ ] Recording layout: **untick the default "Record Active Speaker with Shared Screen"; tick "Record active speaker, gallery view, and shared screen separately"** — the default drops a silent, spotlighted sign interpreter out of the recording entirely while the speaker talks. This is the single most important non-default setting in this whole checklist.
- [ ] "Record video during screen share" — ON (otherwise the slides track shows no speaker)
- [ ] "Record Sign Language Interpreter" — ON if present in this account/version (belt-and-suspenders on top of the layout fix above)

**Host convenience**
- [ ] Push-to-talk: "Press and hold SPACE key to temporarily unmute yourself" — ON (Zoom Settings → Audio)

**Q&A**
- [ ] Q&A panel enabled at account/group level, on in host's meeting settings, meeting scheduled (not instant) — this is off by default in Meeting mode, unlike Webinar

---

## 2. The 3 roles

| Role | Who | Does | Never does |
|---|---|---|---|
| **Host** | Christian | Voice only — introduces, narrates transitions, asks Q&A questions aloud, fills dead air | Never touches spotlight/mute/admission live |
| **Moderator** | Jamba team | *Everything* Zoom's UI touches: admits, unmutes/mutes every other participant, spotlights/un-spotlights, watches interpretation panel | — |
| **Slide operator** | Jamba team | Loads all decks, screen-shares, advances on the speaker's verbal cue | Touches anyone's mute/spotlight |

**Why it's not split between Host and Moderator:** spotlighting means right-clicking a specific, constantly-reflowing video tile — the worst-case interaction for a screen reader. Centralizing every UI action onto one person also avoids two people fighting over the same control mid-handoff.

**Minimum: 2** (fold Slide operator into Moderator). **Recommended: 3** — splitting slides off removes the one real collision risk (unmuting a questioner exactly as the next speaker needs spotlighting).

---

## 3. Granting roles live — there's no per-role invite link

Meeting mode has **one shared link for everyone**; role is granted live, not by which link someone clicked (that's a Webinar-only feature).

- **Moderator / Slide operator:** promote to co-host live ("Make Co-Host") once they've joined — works regardless of their own Zoom account. (Alternative Host, the pre-assignable version, requires them to be a *licensed user on Jamba's own account* — likely doesn't apply to outside help.)
- **Interpreters:** pre-assigned by email at scheduling, but still need manual assignment via the Interpretation panel once in — see checklist above.
- **Get everyone in during the T-30-minute backstage window**, before the public link opens, so all of this happens calmly rather than live under pressure.

---

## 4. The nuances that actually bite — read this section twice

1. **Spotlight is additive, never auto-replacing.** Spotlighting a new speaker does **not** remove the old one — the Moderator must explicitly "Remove Spotlight" from the outgoing speaker every handoff, or two people end up spotlighted at once.
2. **Spotlight the sign interpreter once, at pre-flight, then leave it alone.** Since spotlights stack (up to 9), only the *speaker's* spotlight needs swapping each rotation — the interpreter's never gets touched again.
3. **Pin ≠ Spotlight.** Pin is local — any attendee can pin anyone for their own screen only, no effect on the recording. Spotlight is global, host/co-host only, and is what the recording actually captures.
4. **Self-unmute is off for everyone — always, no exceptions.** There's no separate "speaker" role in Meeting mode, so this one blanket toggle covers audience and speakers alike. Consequence: the Moderator must actively unmute each speaker at slot-start, not just confirm they're ready. And muting is a one-way door for anyone but the Moderator — **tell every speaker not to touch their own mute button.**
5. **The recording layout setting is what actually keeps the interpreter visible — spotlighting alone is not enough.** Under Zoom's *default* layout, a silent spotlighted interpreter loses the "who's talking" contest to the speaker every time and effectively never appears. The fix is item 3 in the Recording checklist above (§1) — set before the meeting, not adjustable after it starts.
6. **A Q&A questioner is cheap to make visible:** just **add** their spotlight (don't remove the speaker's) — with multiple spotlighted, the recording auto-shows whoever's actually talking among them, so it flips to the questioner and back automatically.
7. **No live drag/resize/position control exists**, for the host or in the recording — "presenter layout" choices aren't preserved in recordings at all. A custom composited look (fullscreen slides + a positioned interpreter box) is a **post-production editing job**, not a Zoom setting.
8. **Attendee-side viewing needs no Moderator action:** slides are automatically dominant (nothing to pin), sign-language view is opt-in per attendee (click Interpretation icon → choose sign language), and blind attendees need none of this — it's all visual, and a screen reader can't read a shared screen regardless of layout. Their actual accessibility path is the speaker verbally describing slide content.

---

## 5. Live event flow — condensed

```
Pre-flight (T-30 backstage)
  → recording started with the layout above, interpretation live, sign interpreter spotlighted once, roles granted

Opening
  → Host unmutes self, reads opening script, introduces Speaker 1
  → Moderator unmutes + spotlights Speaker 1
  → Host mutes self as speaker begins

[ per speaker, repeat ]
  Talk
    → Moderator watches the spotlighted speaker's mic icon (self-mute is a one-way trap, §4.4)
    → Slide operator advances on verbal cue, if slides
  Q&A
    → Attendee raises hand / types in Q&A
    → Moderator unmutes them, adds their spotlight (doesn't remove speaker's)
    → Host: "Go ahead, [name]" → question → speaker answers
    → Moderator mutes them back, removes their spotlight
  Handoff
    → Host: teaser line for next speaker (never dead air)
    → Moderator: mute outgoing, remove spotlight; unmute incoming, add spotlight

Break
  → Host announces return time out loud (never just on-screen)
  → Moderator mutes/un-spotlights outgoing speaker; admits next speaker early
  → Slide operator stages next decks

Close
  → Mute last speaker, remove spotlight, stop recording
  → Confirm recording captured interpreter + all audio tracks before ending
```

Full per-speaker times, exact scripts, and the failure-mode reference live in `zoom_event_moderation.md`.

---

## Sources

Full sourcing for every claim above is in the three documents this brief distills: [`zoom_setup.md`](./zoom_setup.md), [`zoom_technical_setup.md`](./zoom_technical_setup.md), [`zoom_event_moderation.md`](./zoom_event_moderation.md).
