# Mock Scenario: Summarize a Meeting

**How to use this file:** Download it, then paste its contents (or upload the file itself) into your Claude Code session with a request like: *"Summarize these meeting notes into a short recap with clear action items."*

Read the notes below once yourself first, so you have a sense of what a *good* summary should include — that will help you judge what Claude gives back.

---

## Raw Notes: Acme Fictional Co. — Weekly Ops Sync

**Date**: Tuesday, 10:00 AM
**Attendees**: Priya Shah (Operations), Tom Delgado (Marketing), Lin Marsh (Finance), Sam Okafor (Projects)

### Discussion

- **Website refresh timeline**: Tom raised that the new homepage copy is ready but the staging site still shows the old pricing page. Priya said IT is aware and thinks it's a caching issue, should resolve "within a few days." No one from IT was in the meeting to confirm.
- **Q3 budget check-in**: Lin walked through spend so far — travel is under budget, but the software/subscriptions line is about 15% over what was forecast, mostly due to two new tools the design team added mid-quarter. Lin wants a short note on whether those tools are staying long-term or were a one-time trial, so she can plan Q4 correctly.
- **Riverbend signage project**: Sam gave a quick update — vendor delay pushed the timeline back about two weeks (see the separate client-email exercise for details). No concerns raised in the meeting.
- **Team offsite**: Tom mentioned people have been asking about dates for the autumn offsite. General agreement it should happen sometime in October, but no one committed to actually finding a venue or sending a poll for dates. Priya said "someone should probably just pick a date and we'll work around it," but the meeting moved on before anyone volunteered.

### Action Items (as captured live — rough)

1. Confirm caching fix on staging site — chase IT.
2. Lin to get a note on the two new software subscriptions (keep or cut) before Q4 planning.
3. Send a poll or pick a date for the October offsite.
4. No action needed on Riverbend — informational only.

---

## Things to try in your Claude Code session

- Ask Claude to turn this into a short recap with a clear action-item list, owner, and rough deadline for each item.
- Notice that **action item 3 (the offsite)** has no assigned owner in the notes — Priya suggested someone should pick a date, but nobody agreed to do it. A good assistant should flag this as unclear rather than silently inventing an owner. If Claude just assigns it to someone (e.g., guesses "Tom" or "Priya"), that's a useful teaching moment: try asking it to point out any action items where the owner isn't stated, instead of guessing.
- Try asking for two versions: one long enough to read in a meeting recap, and one short enough to paste into a chat message.

*(Acme Fictional Co. and all attendees named above are invented for this exercise.)*
