---
work_package_id: WP05
title: 'Module 8: Verification Checklist & Spot-the-Wrong-Fact Lab'
dependencies:
- WP01
requirement_refs:
- FR-007
- FR-008
tracker_refs: []
planning_base_branch: feat/safety-judgment-additions
merge_target_branch: feat/safety-judgment-additions
branch_strategy: Planning artifacts for this mission were generated on feat/safety-judgment-additions. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/safety-judgment-additions unless the human explicitly redirects the landing branch.
subtasks:
- T014
- T015
- T016
phase: Phase 2 - Module Content
assignee: ''
agent: "claude:sonnet-5:reviewer-renata:reviewer"
shell_pid: "7876"
history:
- at: '2026-09-04T11:10:00Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/data/modules/08-prompting-201.js
create_intent: []
execution_mode: code_change
model: ''
owned_files:
- js/data/modules/08-prompting-201.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP05 – Module 8: Verification Checklist & Spot-the-Wrong-Fact Lab

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Module 8 (Prompting 201) already teaches "treat the first reply as a
draft." This WP gives the learner a concrete verification tool and direct
hands-on practice catching fabricated/altered AI output. On completion:

- A new reading section, "Verification checklist," presents six short
  self-check questions for judging AI output, framed as a second set of
  course-wide rules alongside Module 6's existing golden rules (FR-007).
- A new graded lab, `module-8-verification`, shows a short source document
  (a few meeting-note-style facts: a date, an assignment, a budget number)
  and, per item, one claim from a fabricated AI summary of those facts,
  judged Accurate/Inaccurate with an explanation shown after each answer
  (FR-008).
- This is the mission's primary teaching moment for "AI output can look
  right and still be wrong" -- get the three planted inaccuracies (wrong
  date, invented task, wrong number) exactly right; they are the whole
  point of the exercise.

## Context & Constraints

- **Depends on WP01.** This lab uses `quiz-lab.js`'s new `explanation`
  field ([`contracts/quiz-lab-contract-amendment.md`](../contracts/quiz-lab-contract-amendment.md)).
  Confirm WP01 has landed on your working branch before verifying this
  WP (T016) -- otherwise explanations silently won't render.
- Read [`spec.md`](../spec.md) FR-007, FR-008, and Acceptance Scenario 5.
- Read [`research.md`](../research.md)'s Decision 2 for *why* this lab is
  shaped as several independently-judged claims rather than one
  free-text "what's wrong with this summary" answer -- the quiz engine
  can't grade free text, so the fabricated summary is split into its
  individual claims, each judged Accurate/Inaccurate.
- Read [`data-model.md`](../data-model.md)'s "Module 8 —
  `module-8-verification` (quiz)" section for the **exact** source facts
  and the 3 lab items (wrong-date, invented-task, wrong-number) --
  `question`, `options`, `correctIndex`, `explanation` per item. Use it
  verbatim; light wording polish is fine, but the three planted
  inaccuracies themselves (a changed date, an invented responsibility, a
  changed number) must not change, since they were specifically chosen to
  mirror this app's existing worked-example style (Module 10's messy
  sign-up-list example already uses a similar "here are the facts, here's
  what changed" structure -- read that for tone reference if useful, but
  do not copy its content).
- Read `js/data/modules/08-prompting-201.js` in full before editing.
  Study its existing content sections (front-loading context, output
  format, drafts, process commands, threads/memory) and its existing
  `labs` array (currently `module-8-quiz` then `module-8-prompt-builder`)
  so your additions match the file's established style exactly.
- The source facts (the short meeting-note-style list) must be shown to
  the learner **before** the lab -- author them as part of the new
  "Verification checklist" content section's body, or as a short
  standalone paragraph immediately preceding the lab (your call on exact
  placement, but they must be visible reading content, not buried in the
  lab's own config, since the learner needs to see the real facts to
  judge the fabricated claims against them).
- **Do not touch** `module-8-quiz` (the module's existing graded quiz) --
  this WP only adds a second, new lab alongside it.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/safety-judgment-additions
- **Merge target branch**: feat/safety-judgment-additions

## Subtasks & Detailed Guidance

### Subtask T014 – Author "Verification checklist" section + lab source-facts intro

- **Purpose**: The reading content that teaches the six-question checklist
  and sets up the lab with real facts to judge against.
- **Steps**:
  1. Add a new content-section entry to `08-prompting-201.js`'s `content`
     array (append after the existing "Keep threads healthy" section),
     heading "Verification checklist."
  2. Body: the six questions from `data-model.md`/spec.md FR-007 -- did
     it answer the actual question; did it use the given information
     correctly; did it invent anything; did it change any numbers,
     names, dates, or facts; does the result make sense; how could it be
     independently verified if it matters. Present as a short list
     (matching this module's existing list-formatting pattern, e.g. its
     "golden rules"-adjacent styling from Module 6 -- reuse the same
     `<ul>`/`<li>` HTML pattern already used elsewhere in this app's
     content, not a new format). Explicitly frame this as a second set
     of course-wide rules alongside Module 6's golden rules (a short
     sentence naming Module 6 directly).
  3. Include the source facts the lab will reference -- a short,
     concrete meeting-note-style list containing (at minimum) one date,
     one task/assignment, and one budget number, written the way the
     fabricated summary in T015 will misstate them. Keep this small and
     scannable (3-5 short bullet lines), matching Module 3's existing
     `spot-mistake` snippet style for brevity.
- **Files**: `js/data/modules/08-prompting-201.js`
- **Parallel?**: [P] -- independent of T015 (different array; land the
  source facts before the lab config for a coherent reading order).

### Subtask T015 – Author `module-8-verification` quiz lab config

- **Purpose**: The graded practice exercise.
- **Steps**:
  1. Add a new entry to `08-prompting-201.js`'s `labs` array, positioned
     as the **first** lab (before the existing `module-8-quiz`) if that
     reads better given where you placed the source facts in T014 --
     otherwise position it wherever it flows naturally with T014's
     content; your call, note the choice in this WP's Activity Log.
  2. `{id: "module-8-verification", type: "quiz", graded: true, config:
     [...]}` -- use the exact 3 items from `data-model.md`'s Module 8
     section (wrong-date, invented-task, wrong-number): `question`
     (stating the fabricated claim and, per `data-model.md`'s wording,
     what the source actually says), `options: ["Accurate",
     "Inaccurate"]`, `correctIndex: 1` for all three (every planted claim
     is inaccurate by design), `explanation`.
- **Files**: `js/data/modules/08-prompting-201.js`
- **Parallel?**: No -- depends on T014 for the source facts it references
  to make sense in context.

### Subtask T016 – Manual browser verification

- **Purpose**: Confirm the whole addition works end-to-end and the
  planted errors are genuinely catchable.
- **Steps**:
  1. Start the local preview server, open Module 8, confirm the new
     "Verification checklist" section and source facts render before the
     existing content flows into the new lab.
  2. Confirm the lab shows all 3 questions, each with 2 options
     (Accurate/Inaccurate).
  3. Answer all 3 (a mix of correct/incorrect on purpose) and submit;
     confirm an explanation appears under every answer, correctly naming
     the actual source fact for each.
  4. Read the source facts and the 3 fabricated claims side by side as a
     genuine learner would -- confirm each of the three planted
     inaccuracies (date, task, number) is independently identifiable
     without needing to see the answer first.
  5. Confirm Module 8's existing quiz (`module-8-quiz`) still renders and
     behaves exactly as before (unaffected by this WP).
  6. Confirm Module 8's status on the landing view now requires **both**
     `module-8-quiz` and `module-8-verification` (plus the existing
     prompt-builder lab) to be attempted before showing "done."
  7. Resize to 360px width and confirm the new section, source facts, and
     lab render without layout breakage (NFR-002 -- added after
     `/spec-kitty.analyze` finding C2, which flagged this check as
     missing from this WP).
  8. Re-read the new content and confirm no term is used without a
     plain-language explanation or glossary entry (NFR-001 -- added after
     `/spec-kitty.analyze` finding C3).
  9. Check the browser console for errors.
- **Files**: none changed -- verification only.
- **Parallel?**: No -- final step, depends on T014 and T015.

## Risks & Mitigations

- **Risk**: The reframing from "one summary with 3 errors" to "3
  independently-judged claims" could make the exercise feel disconnected
  from the source facts if they're not shown together clearly.
  **Mitigation**: T014 explicitly requires the source facts to be visible
  reading content before the lab, not buried in config; T016 explicitly
  requires reading them side by side as a learner would.
- **Risk**: If WP01 hasn't landed yet on this WP's branch, explanations
  silently don't render, and it's easy to mistake that for a bug in this
  WP's own config. **Mitigation**: confirm WP01 is merged before starting
  T016; if explanations don't appear, check that first.

## Review Guidance

- Confirm the source facts and the 3 lab items match `data-model.md`'s
  Module 8 section (or that wording changes preserve the same three
  planted inaccuracies).
- Confirm `module-8-quiz` is untouched and still renders/behaves
  identically to before this WP.
- Load Module 8 in the browser, complete the new lab, and confirm every
  explanation correctly names the true source fact.

## Activity Log

**Initial entry**:

- 2026-09-04T11:10:00Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP05 --to <status>` to change WP status.
- 2026-09-04T13:45:58Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=23176 – Assigned agent via action command
- 2026-09-04T13:58:57Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=23176 – Ready for review
- 2026-09-04T13:59:56Z – claude:sonnet-5:reviewer-renata:reviewer – shell_pid=7876 – Started review via action command
- 2026-09-04T14:05:03Z – user – shell_pid=7876 – Review passed: Verification checklist (6 questions, names Module 6) and module-8-verification lab (3 items, exact data-model.md match, explanations render live for correct/incorrect) both confirmed in browser; module-8-quiz byte-identical/untouched and unaffected; 360px layout clean; only WP01-dependency files (quiz-lab.js, module-view.js) besides 08-prompting-201.js appear in the full diff, none from WP05's own commit.
