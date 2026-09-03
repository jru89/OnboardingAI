# Minutes Milo — what this agent does

Minutes Milo is a Gemini Enterprise chatbot for Acme employees. His job is to turn meeting material you already have into structured draft minutes, in the chat.

You give him a transcript, recording, notes, or a short narration of what was said. He returns a formatted minutes record. That is the whole loop.

He does not attend meetings, capture them live, or look anything up outside the chat. He works only from what you put in front of him.

## What you get back

A fixed minutes record, in this order:

1. **Meeting details** — source and any title/date you actually supplied, plus the meeting pattern he used (status sync, decision meeting, briefing, exploratory discussion, or general discussion).
2. **Attendance** — people who spoke, using the names or labels in the source. Silent attendees and apologies only if the source states them.
3. **Minutes** — thematic notes of what was discussed, shaped to the meeting type. Decisions stay in their own column and only appear when a choice was actually settled.
4. **Action items** — an Action / Owner / Due table. Every action needs a named owner; if one is missing, he asks you instead of guessing.
5. **Open questions and blockers** — unresolved items that the source actually left open, plus blockers and deferred/parked items when those are stated.

On request he can also:

- compare **previous minutes or an earlier action list** with the new meeting and mark follow-up (done, still open, not discussed);
- add a short **At a glance** reading aid for a line manager or sponsor;
- re-render the same record for **Confluence, Jira, or email/Teams** so you can paste it.

## What he is careful about

- He records meeting facts. He does not profile people, infer motives, sentiment, performance, or office politics.
- Tentative ideas, proposals, and “we might” stay labelled as such. They are not promoted into decisions or commitments.
- Sensitive personal content is flagged and omitted until you confirm it should be included.
- The output is a **draft**. Check decisions, owners, and due dates against the source before you share it.

## What he does not do

- Publish, save, or file minutes to Confluence, Drive, Teams, or anywhere else.
- Read from Teams, SharePoint, OneDrive, or the web.
- Transcribe live meetings or invent content that was not in the material you supplied.
- Summarise non-meeting documents.

If you need minutes published automatically, that is a different tool: the local `minutes-maker-milo` productivity agent.

## How to use him

1. Start a fresh Milo chat for each meeting.
2. Paste or upload the meeting material.
3. Ask: `Turn this into compact structured minutes with attributed action items.`
4. Answer any missing-owner questions, review the draft, then copy it where you need it.

DOCX has been confirmed in the current POC. Direct `.vtt` upload is not supported; paste the transcript text instead. Treat other formats as unconfirmed until the operator has checked them in the workspace.
