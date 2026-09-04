---
work_package_id: WP02
title: 'Module 1: Permission Judgment'
dependencies:
- WP01
requirement_refs:
- FR-001
- FR-002
tracker_refs: []
planning_base_branch: feat/safety-judgment-additions
merge_target_branch: feat/safety-judgment-additions
branch_strategy: Planning artifacts for this mission were generated on feat/safety-judgment-additions. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/safety-judgment-additions unless the human explicitly redirects the landing branch.
subtasks:
- T004
- T005
- T006
- T007
phase: Phase 2 - Module Content
assignee: ''
agent: "claude:sonnet-5:reviewer-renata:reviewer"
shell_pid: "17988"
history:
- at: '2026-09-04T11:10:00Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/data/modules/01-get-oriented.js
create_intent: []
execution_mode: code_change
model: ''
owned_files:
- js/data/modules/01-get-oriented.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP02 – Module 1: Permission Judgment

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Module 1 (Get Oriented) already introduces permission prompts as vocabulary
("what a permission prompt looks like"). This WP turns that into an actual
safety behavior: understanding that Claude Code can take real actions, and
practicing the judgment call a permission prompt is asking the learner to
make. On completion:

- Module 1 has a new reading section, "Claude can do more than answer
  you," landing after the module's existing content (FR-001).
- Module 1 has a new lab, `module-1-permission-check`, presenting 5
  fictional permission requests, each judged Allow / Don't allow / Not
  sure -- inspect first, with an explanation shown after each answer
  (FR-002).
- This becomes many learners' **very first interactive exercise** in the
  whole app (Module 1 is the first module in order, and this course is
  designed for free browsing but most learners will start at Module 1) --
  its instructions must stand alone without assuming she's done anything
  else in the app first.

## Context & Constraints

- **Depends on WP01.** Do not start until `js/views/labs/quiz-lab.js`
  supports the optional `explanation` field
  ([`contracts/quiz-lab-contract-amendment.md`](../contracts/quiz-lab-contract-amendment.md)).
  If WP01 has not landed yet, this WP's lab config will still be valid
  data (the `explanation` field is simply ignored by the *old* engine) but
  the learner won't see explanations until WP01 merges -- confirm WP01 is
  actually merged into your working branch before calling this WP done.
- Read [`spec.md`](../spec.md) FR-001 and FR-002, and their Acceptance
  Scenario 1 and Edge Case ("very first interactive exercise").
- Read [`data-model.md`](../data-model.md)'s "Module 1 —
  `module-1-permission-check` (quiz)" section for the **exact** authored
  content (5 questions, options, `correctIndex`, `explanation`) --
  use it verbatim; it was already reviewed and approved as part of
  planning. Light wording polish is fine if you find a genuine
  clarity improvement, but the judgment calls themselves (which option is
  correct, and why) must not change.
- Read `js/data/modules/01-get-oriented.js` in full before editing --
  study its existing `content` array (heading/body/glossaryTerms shape)
  and its existing `labs` array (currently one `checklist` lab,
  `module-1-checklist`) so your additions match the file's established
  authoring style exactly (HTML string concatenation via `"<p>" + "..." +
  "</p>"`, `<strong>` for emphasis, no markdown).
- Match the plain-language tone already established in this module and
  this project's `NFR-001` (no jargon without a definition) -- this
  section introduces no new technical terms, so no new `glossaryTerms`
  entries are needed.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/safety-judgment-additions
- **Merge target branch**: feat/safety-judgment-additions

## Subtasks & Detailed Guidance

### Subtask T004 – Author "Claude can do more than answer you" content section

- **Purpose**: The reading content that sets up the lab.
- **Steps**:
  1. Add a new entry to `01-get-oriented.js`'s `content` array (append
     after the existing sections), with `heading: "Claude can do more
     than answer you"`.
  2. Body content must cover, in plain language: Claude Code can read
     files, create files, modify files, and run commands/tools; some of
     those actions require permission; a permission request is a moment
     to stop and understand what's being asked, not just click through;
     the learner is still the one responsible for approving the action.
  3. Keep it proportionate to the module's existing sections (2-4 short
     paragraphs, matching the existing "Where you are, and what you're
     looking at" section's length) -- this is reinforcement of an idea
     already touched on, not a full new topic.
- **Files**: `js/data/modules/01-get-oriented.js`
- **Parallel?**: [P] -- independent of T005 (different array in the same
  file; low collision risk if worked in either order, but land content
  before the lab config for a cleaner diff).

### Subtask T005 – Author `module-1-permission-check` quiz lab config

- **Purpose**: The graded practice exercise.
- **Steps**:
  1. Add a new entry to `01-get-oriented.js`'s `labs` array (append after
     the existing `module-1-checklist` entry): `{id:
     "module-1-permission-check", type: "quiz", graded: true, config:
     [...]}`.
  2. Use the exact 5 items from
     [`data-model.md`](../data-model.md)'s Module 1 section (read-readme,
     edit-budget, delete-old-notes, run-command, outside-folder) --
     `question`, `options` (array of 3 strings), `correctIndex`,
     `explanation` per item.
  3. `graded: true` matches this module's existing checklist lab being
     ungraded but this new lab being a real judgment check with a scored
     outcome, consistent with how Module 8's and (after WP05) the new
     Module 8/11 quizzes are graded.
- **Files**: `js/data/modules/01-get-oriented.js`
- **Parallel?**: No -- depends on T004 landing first for a clean diff
  (not a hard technical dependency, just ordering).

### Subtask T006 – Wire the new lab into the module's `labs` array

- **Purpose**: Make sure the lab actually mounts in the right place.
- **Steps**:
  1. Confirm the new `module-1-permission-check` entry is the **second**
     item in the `labs` array, after the existing `module-1-checklist`
     entry -- `module-view.js` renders labs in array order, and the
     checklist (interface orientation) logically comes before the
     permission-judgment practice.
  2. No other file needs to change -- `module-view.js`'s lab-mounting
     logic already iterates `module.labs` generically and does not need
     to know about this specific lab.
- **Files**: `js/data/modules/01-get-oriented.js`
- **Parallel?**: No -- depends on T005.

### Subtask T007 – Manual browser verification

- **Purpose**: Confirm the whole addition actually works end-to-end, not
  just that the data shape is correct.
- **Steps**:
  1. Start the local preview server, open Module 1, confirm the new
     section reads correctly and lands in the right place.
  2. Scroll to the new lab; confirm 5 questions render, each with 3
     options.
  3. Answer all 5 (mix of correct/incorrect on purpose) and submit;
     confirm an explanation appears under every answer, matching
     `data-model.md`'s content.
  4. Confirm Module 1's status on the landing view still transitions
     correctly now that it has 2 labs (`not_started` -> `in_progress`
     after either lab is touched -> `done` only once **both** the
     checklist and this new lab have been attempted).
  5. Resize to 360px width and confirm the new section and lab render
     without layout breakage (NFR-002 -- added after `/spec-kitty.analyze`
     finding C2, which flagged this check as missing from this WP).
  6. Re-read the new content and confirm no term is used without a
     plain-language explanation or glossary entry (NFR-001 -- added after
     `/spec-kitty.analyze` finding C3).
  7. Check the browser console for errors.
- **Files**: none changed -- verification only.
- **Parallel?**: No -- final step, depends on T004-T006.

## Risks & Mitigations

- **Risk**: This lab is many learners' first interactive exercise --
  instructions that assume prior app familiarity would confuse a
  first-time user. **Mitigation**: read the new content section's own
  wording back as if you've never opened the app before; it must fully
  explain what a permission request is without relying on anything from
  a later module.
- **Risk**: Landing this WP before WP01 merges means the `explanation`
  field is silently ignored (old engine) rather than erroring -- easy to
  miss. **Mitigation**: T007 explicitly requires seeing explanation text
  render; if it doesn't appear, check whether WP01 actually landed on
  your branch before assuming your own config is wrong.

## Review Guidance

- Confirm the 5 lab items and their `correctIndex`/`explanation` values
  match `data-model.md` exactly (or that any wording changes preserve the
  same judgment calls).
- Confirm the new lab is second in the `labs` array, after the checklist.
- Load Module 1 in the browser and confirm explanations render for both a
  correct and an incorrect answer.

## Activity Log

**Initial entry**:

- 2026-09-04T11:10:00Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP02 --to <status>` to change WP status.
- 2026-09-04T13:44:23Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=4776 – Assigned agent via action command
- 2026-09-04T13:58:18Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=4776 – Ready for review
- 2026-09-04T13:58:43Z – claude:sonnet-5:reviewer-renata:reviewer – shell_pid=17988 – Started review via action command
