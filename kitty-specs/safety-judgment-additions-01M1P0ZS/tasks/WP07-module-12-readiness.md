---
work_package_id: WP07
title: 'Module 12: Readiness Self-Check'
dependencies: []
requirement_refs:
- FR-011
tracker_refs: []
planning_base_branch: feat/safety-judgment-additions
merge_target_branch: feat/safety-judgment-additions
branch_strategy: Planning artifacts for this mission were generated on feat/safety-judgment-additions. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/safety-judgment-additions unless the human explicitly redirects the landing branch.
subtasks:
- T020
- T021
- T022
phase: Phase 2 - Module Content
assignee: ''
agent: ''
history:
- at: '2026-09-04T11:10:00Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/data/modules/12-graduation.js
create_intent: []
execution_mode: code_change
model: ''
owned_files:
- js/data/modules/12-graduation.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP07 – Module 12: Readiness Self-Check

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

**Read this whole prompt before writing anything.** This is the
smallest-looking WP in the mission (content-only, no lab, no code change)
but plan.md flags it as the highest-care item, because Module 12 carries
an explicit prior design decision this WP must not violate. On completion:

- A short "Before you start" readiness self-check appears above Module
  12's existing two downloads: 7 self-check statements (can you describe
  what you want to build; protect sensitive information; ask Claude for a
  plan before big changes; review what Claude changed; check whether
  output is correct; explain what went wrong if something breaks; stop
  and ask for help when unsure), followed by a one-line affirmation
  ("If you can do those things, you're ready. Go build something
  useful.") (FR-011).
- This is **plain reading content** -- a static list the learner can
  silently self-assess against. It has **no checkboxes, no submit
  control, no persisted or graded state, and does not use the
  `checklist` lab engine.**
- It does **not** block or gate reaching the module's two existing
  downloads in any way -- they remain immediately visible/reachable
  exactly as before this WP.

## Context & Constraints — read before starting

- No dependencies -- this WP can start immediately in parallel with any
  other WP in this mission.
- Read [`spec.md`](../spec.md) FR-011, Acceptance Scenario 7, and
  Constraint C-004 in full.
- Read [`research.md`](../research.md)'s Decision 4 for the reasoning
  behind "content-only, not a lab" -- **this is not a style
  preference, it's a hard constraint.**
- **Critical prior context**: Module 12's own file
  (`js/data/modules/12-graduation.js`) has a header comment explaining
  that it is "Deliberately lean by design" and references a prior
  constraint (originally `C-007` in the mission that built this app) that
  exists specifically to stop this module from re-hand-holding what the
  learner already has the skills to work out herself after Modules 6-11
  -- no worksheet, no checklist, no scripted prompts. **Read that file's
  header comment in full before writing anything else.** This mission's
  own `spec.md` carries the same constraint forward as `C-004`.
- The temptation with a "readiness checklist" is to reach for
  `type: "checklist"` (Module 1 already uses this engine) since the name
  matches. **Do not do this.** `checklist-lab.js` persists
  checked/unchecked state and factors into `evaluateModuleStatus`'s
  completion logic -- using it here would make the self-check something
  the learner "completes," directly reintroducing the scripted-worksheet
  feel C-007/C-004 exists to prevent. This must be plain HTML content
  inside a `content` section's `body`, using the same list-authoring
  pattern already used throughout this app (e.g. Module 6's "golden
  rules" `<ul>`), not a `labs` array entry.
- Read `js/data/modules/12-graduation.js` in full -- it is short (one
  content section, one `download` lab with exactly two entries). Your
  addition is a **new content-section entry**, not a change to the
  existing `labs` array.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/safety-judgment-additions
- **Merge target branch**: feat/safety-judgment-additions

## Subtasks & Detailed Guidance

### Subtask T020 – Author the "Before you start" readiness self-check

- **Purpose**: A short, plain self-check the learner reads and silently
  assesses herself against -- not homework to complete.
- **Steps**:
  1. Add a new content-section entry to `12-graduation.js`'s `content`
     array (append after the existing "Now build something real"
     section, so it appears immediately before the download lab in
     reading order), heading "Before you start."
  2. Body: a short intro line, then a plain `<ul>` list of 7 self-check
     statements framed as questions the learner asks herself (not
     imperative instructions to carry out right now): can you describe
     what you want to build; can you protect sensitive information; can
     you ask Claude for a plan before making significant changes; can you
     review what Claude changed; can you check whether its output is
     correct; can you explain what went wrong if something breaks; can
     you stop and ask for help when you're unsure.
  3. Close with a one-line affirmation: "If you can do those things,
     you're ready. Go build something useful." (or a close paraphrase --
     keep the encouraging, non-gatekeeping tone).
  4. Keep the whole section short -- this should add a few seconds of
     reading time, consistent with `spec.md`'s SC-004, not become a new
     substantial section in an otherwise deliberately lean module.
  5. Use plain `<ul>`/`<li>` HTML (no `<input type="checkbox">`, no
     interactive elements of any kind) -- match this app's existing
     styled-list pattern (e.g. Module 6's golden rules list) exactly, so
     it inherits the app's existing list styling without any new markup.
- **Files**: `js/data/modules/12-graduation.js`
- **Parallel?**: [P] -- this is the only content change in the WP; no
  other subtask writes to this file concurrently.

### Subtask T021 – Verify no lab-engine, no persisted state, no gating

- **Purpose**: Prove the hard constraint from Objectives holds by
  inspection, not just by writing plain-looking HTML.
- **Steps**:
  1. Re-read your own diff to `12-graduation.js` and confirm the new
     content is entirely inside a `content` array entry's `body` string
     -- confirm you did **not** add anything to the `labs` array, and
     that the existing `module-12-download` lab entry (with its exactly
     two downloads) is completely unmodified.
  2. Confirm no `<input>`, `<button>`, or other interactive element
     appears anywhere in the new HTML string.
  3. Confirm nothing in your change calls `setLabState`,
     `setModuleStatus`, or any other `progress.js` writer -- content
     sections never do this; only lab engines do, and this WP adds no
     lab.
- **Files**: none changed -- verification/inspection only.
- **Parallel?**: No -- depends on T020.

### Subtask T022 – Manual browser verification

- **Purpose**: Confirm the addition renders correctly and genuinely does
  not block the downloads.
- **Steps**:
  1. Start the local preview server, open Module 12, confirm the new
     "Before you start" section renders as plain reading content --
     visually, it should look like every other content section in this
     app (headings, paragraph, styled list), with **no** checkbox,
     button, or "completed" state of any kind, unlike Module 1's
     checklist lab immediately below it in the app's overall structure
     (for contrast, not because Module 12 should resemble it).
  2. Confirm both of Module 12's existing downloads ("Best practices:
     building a Gemini agent repo" and "Worked example: Minutes Milo")
     are immediately visible below the new section and both still
     download successfully, without needing to interact with the new
     section at all.
  3. Confirm Module 12's status on the landing view is unaffected by this
     WP -- it should still transition to "done" purely based on the
     existing download lab's own completion rule, exactly as before.
  4. Resize to 360px width and confirm the new section renders without
     layout breakage (NFR-002 -- added after `/spec-kitty.analyze`
     finding C2, which flagged this check as missing from this WP).
  5. Re-read the new content and confirm no term is used without a
     plain-language explanation or glossary entry (NFR-001 -- added after
     `/spec-kitty.analyze` finding C3).
  6. Check the browser console for errors.
- **Files**: none changed -- verification only.
- **Parallel?**: No -- final step, depends on T020 and T021.

## Risks & Mitigations

- **Risk**: The single biggest risk in this entire mission -- reaching
  for the `checklist` lab engine because the feature is literally called
  a "checklist" in casual conversation, silently reintroducing the
  scripted-worksheet feel Module 12's design has deliberately avoided
  since the original mission. **Mitigation**: this prompt states the
  constraint three times on purpose (Objectives, Context, T021's explicit
  verification step) -- if you find yourself importing or referencing
  `checklist-lab.js` at any point while working this WP, stop and re-read
  `research.md`'s Decision 4.
- **Risk**: The new section grows longer than intended and starts to feel
  like a worksheet even without a lab engine, purely through its own
  length/tone. **Mitigation**: keep it to the 7 items plus one intro line
  and one closing line -- do not add explanatory prose under each item;
  the items should be scannable in a few seconds, matching `spec.md`'s
  SC-004.

## Review Guidance

- **This is the most important review check in the whole mission**:
  confirm `12-graduation.js`'s `labs` array is byte-for-byte unchanged
  from before this WP -- still exactly one `download` lab, exactly two
  entries, nothing added.
  \`\`\`
  git diff feat/claude-code-onboarding-lab -- js/data/modules/12-graduation.js
  \`\`\`
  Read the diff directly; do not trust a summary.
- Confirm the new section contains zero interactive elements.
- Load Module 12 in the browser and confirm both downloads work without
  interacting with the new self-check section at all.

## Activity Log

**Initial entry**:

- 2026-09-04T11:10:00Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP07 --to <status>` to change WP status.
