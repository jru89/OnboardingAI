---
work_package_id: WP01
title: 'Quiz Lab Engine: Explanation Field'
dependencies: []
requirement_refs:
- FR-002
- FR-008
- FR-010
tracker_refs: []
planning_base_branch: feat/safety-judgment-additions
merge_target_branch: feat/safety-judgment-additions
branch_strategy: Planning artifacts for this mission were generated on feat/safety-judgment-additions. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/safety-judgment-additions unless the human explicitly redirects the landing branch.
subtasks:
- T001
- T002
- T003
phase: Phase 1 - Shared Engine Change
assignee: ''
agent: ''
history:
- at: '2026-09-04T11:10:00Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/views/labs/quiz-lab.js
create_intent: []
execution_mode: code_change
model: ''
owned_files:
- js/views/labs/quiz-lab.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP01 – Quiz Lab Engine: Explanation Field

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

This is the one shared foundation the rest of this mission depends on. Three
other work packages (WP02, WP05, WP06) each add a new graded lab that needs
a per-question explanation shown after the learner answers -- something the
existing `quiz-lab.js` engine doesn't support today (it only shows generic
"Correct." / "Incorrect. The correct answer is: X" text). On completion:

- `quiz-lab.js`'s config item shape gains one new **optional** field,
  `explanation: string`, matching
  [`contracts/quiz-lab-contract-amendment.md`](../contracts/quiz-lab-contract-amendment.md)
  exactly.
- When an item's `explanation` is present, it appears in that item's
  post-submit feedback, appended after the existing correct/incorrect text
  -- for **both** the correct and the incorrect case (the *why* is the
  actual lesson for the labs that will use this).
- When an item's `explanation` is absent, feedback renders **exactly** as
  it does today -- byte-for-byte unchanged output for Module 8's existing
  quiz (`module-8-quiz`, 4 items, none of which have an `explanation`
  field). This is the hard backward-compatibility requirement: nothing
  about this change may alter existing, already-shipped learner-facing
  behavior.

## Context & Constraints

- Read [`contracts/quiz-lab-contract-amendment.md`](../contracts/quiz-lab-contract-amendment.md)
  in full before writing any code -- it is the authoritative contract for
  this change (before/after shape, rendering rule, backward-compatibility
  requirement).
- Read [`research.md`](../research.md)'s Decision 1 for *why* this engine
  was chosen over `spot-mistake-lab.js` (hardcoded "Safe"/"Unsafe" labels
  would be wrong words for the labs that will use this) and over
  `match-lab.js` (no submit/lock step, generic feedback only).
- The current implementation lives at `js/views/labs/quiz-lab.js`. Read the
  whole file before editing -- it's short (~160 lines). Pay particular
  attention to `renderItem()` (builds each `<fieldset>`) and the
  `if (submittedResults)` block inside it (builds the feedback `<p>`).
- Do **not** touch `js/data/modules/08-prompting-201.js` (Module 8's
  existing quiz content) in this WP -- that file is owned by a different
  work package's boundary (WP05 adds a *second*, separate lab to that same
  module; this WP only needs to read the existing quiz config to verify
  regression-safety, not modify it).
- Do **not** change `labState[lab.id]`'s persisted shape
  (`{lastScore, attempts, completed}`) -- `explanation` is rendered from
  already-static config, never written to `progress.js`.
- No new CSS class is required -- the existing `.quiz-feedback` /
  `.quiz-feedback.is-correct` / `.quiz-feedback.is-incorrect` styling
  already applies to the whole feedback `<p>`; appending more text inside
  it inherits the same styling. If you find during T003's manual check
  that the appended explanation text needs its own visual treatment (e.g.
  a lighter weight to distinguish it from the "Correct."/"Incorrect." lead-in),
  it's fine to add a small inline style or a new modifier class in
  `css/style.css` -- but only if you actually find it necessary, not
  preemptively.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/safety-judgment-additions
- **Merge target branch**: feat/safety-judgment-additions

## Subtasks & Detailed Guidance

### Subtask T001 – Add the `explanation` field and render it in feedback

- **Purpose**: The core engine change.
- **Steps**:
  1. In `renderItem(item)`, locate the `if (submittedResults) { ... }`
     block that builds the feedback `<p>`. Currently it sets:
     ```js
     feedback.textContent = result.correct
       ? "Correct."
       : `Incorrect. The correct answer is: ${item.options[item.correctIndex]}`;
     ```
  2. Change this so that when `item.explanation` is a non-empty string, it
     is appended after a separator (a single space is enough -- match the
     existing plain-sentence tone used elsewhere in this file, e.g.
     spot-mistake-lab.js's `"Correct — " + item.explanation` pattern is a
     reasonable style reference, though you are free to pick your own
     separator as long as it reads as one coherent sentence/line, not two
     visually disconnected fragments).
  3. When `item.explanation` is absent, undefined, or an empty string, the
     feedback text must be **identical** to the current behavior -- no
     trailing space, no empty parenthetical, nothing appended.
  4. Do not touch any other part of `renderItem()`, `render()`,
     `handleSubmit()`, or `handleRetry()` -- this is a single, targeted
     addition to one feedback-text computation.
- **Files**: `js/views/labs/quiz-lab.js`
- **Parallel?**: No -- everything else in this WP verifies this change.

### Subtask T002 – Verify backward compatibility against Module 8's existing quiz

- **Purpose**: Prove the hard constraint from Objectives holds, not just
  assume it from reading the diff.
- **Steps**:
  1. Read `js/data/modules/08-prompting-201.js`'s existing
     `module-8-quiz` lab config (4 items) -- confirm none of them currently
     have an `explanation` field (they should not; do not add one as part
     of this WP).
  2. Start the local preview server, open Module 8, complete the existing
     quiz (submit any combination of answers), and read the feedback text
     for at least one correct and one incorrect answer.
  3. Confirm the feedback text matches exactly what Module 8's quiz showed
     before this change (`"Correct."` or `"Incorrect. The correct answer
     is: {option text}"`, nothing more).
- **Files**: none changed -- verification only.
- **Parallel?**: No -- depends on T001.

### Subtask T003 – Manual verification of the new field with a temporary test config

- **Purpose**: Confirm the new field actually renders correctly (spacing,
  readability, both correct/incorrect paths) before any real content
  authors depend on it in WP02/WP05/WP06.
- **Steps**:
  1. Temporarily add one `explanation` field to one item of a lab config
     you can reach easily in the browser -- the simplest approach is to
     add it directly in the browser via `javascript_tool` by mutating the
     in-memory lab config before mount, or by temporarily editing a scratch
     copy of a quiz item's config on disk and reverting it afterward. Pick
     whichever is faster for you; the goal is only to see rendered output,
     not to ship a test fixture.
  2. Submit an answer that's correct for that item, confirm the
     explanation appears after "Correct."; submit an answer that's
     incorrect, confirm the explanation appears after the "Incorrect. The
     correct answer is: ..." text.
  3. Zoom in / screenshot to confirm the appended text reads cleanly (no
     awkward line break, no missing space, no visual clash with the
     existing `.is-correct`/`.is-incorrect` background coloring).
  4. **Revert any temporary test-only config change** before finishing
     this WP -- nothing from this step should be committed. The permanent,
     real `explanation`-bearing content is authored in WP02/WP05/WP06, not
     here.
- **Files**: none permanently changed -- temporary verification only,
  reverted before completion.
- **Parallel?**: No -- final verification pass after T001/T002.

## Risks & Mitigations

- **Risk**: A subtle regression in Module 8's existing quiz (e.g. an extra
  space, a changed conditional) slips through because it "looks right" on
  a quick glance. **Mitigation**: T002 is not optional -- actually load
  Module 8 in the browser and read the rendered feedback text character by
  character for at least one correct and one incorrect answer.
- **Risk**: Leaving temporary test-only config in place after T003,
  accidentally shipping placeholder content. **Mitigation**: T003 explicitly
  requires reverting the temporary change; confirm `git status` /
  `git diff` shows only `quiz-lab.js` changed before finishing, nothing in
  `js/data/modules/`.

## Review Guidance

- Confirm the diff touches only `js/views/labs/quiz-lab.js` (and, only if
  genuinely needed per T001's guidance, a small addition to
  `css/style.css` -- flag if so and confirm the rationale).
- Load Module 8 and confirm its existing quiz renders identically to
  before this change (no `explanation` text appears anywhere).
- Confirm `git diff` shows no leftover temporary/test config in
  `js/data/modules/*.js`.

## Activity Log

**Initial entry**:

- 2026-09-04T11:10:00Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP01 --to <status>` to change WP status.
