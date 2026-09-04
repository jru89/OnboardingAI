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
- T023
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
- js/views/module-view.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP01 – Quiz Lab Engine: Explanation Field + Module-Status Fix

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
- **Added after `/spec-kitty.analyze` (finding C1, HIGH, blocked verdict)**:
  `js/views/module-view.js`'s `evaluateModuleStatus()` re-evaluates module
  completion on every progress save, but its very first line is `if
  (currentStatus === "done") return;` -- once a module is marked "done" it
  is never re-checked again, even if its `labs` array later grows (exactly
  what WP02, WP05, and WP06 do to Modules 1, 8, and 11). A learner who
  already completed one of those three modules before this mission ships
  would see it stuck showing "done" forever, having never seen or
  attempted the new lab. T023 below fixes this. It's grouped into WP01
  (not its own WP) because it's the same kind of small, shared,
  foundational fix WP01 already is -- and because WP02/WP05/WP06 all
  indirectly rely on it holding true for their own "done" transition to
  behave correctly for a returning learner.

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
- For T023: read `js/views/module-view.js`'s `evaluateModuleStatus()` and
  `allLabsComplete()` (they sit together, just above the `mountLab`
  section) before changing anything. This function is called from two
  places -- once on mount, and once via the `onSaved` subscription every
  time progress is saved -- so a fix here affects every module in the
  app, not just the three this mission touches; keep the change narrowly
  scoped to the status-transition logic itself.
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

### Subtask T023 – Fix `evaluateModuleStatus` to re-evaluate past "done"

- **Purpose**: Prevent Modules 1, 8, and 11 from showing a permanently
  stale "done" badge for a learner who completed them before this
  mission's new labs shipped (analyze finding C1).
- **Steps**:
  1. In `js/views/module-view.js`, locate:
     ```js
     function evaluateModuleStatus(moduleId, labs) {
       const { moduleStatus } = getProgress();
       const currentStatus = moduleStatus[moduleId] || "not_started";
       if (currentStatus === "done") return; // already settled, nothing to do

       if (labs.length === 0 || allLabsComplete(labs, moduleId)) {
         setModuleStatus(moduleId, "done");
       } else if (currentStatus === "not_started") {
         setModuleStatus(moduleId, "in_progress");
       }
     }
     ```
  2. Replace the blanket early-return with logic that still avoids
     redundant writes (don't call `setModuleStatus` every single save if
     nothing actually changed) but **does** re-open a "done" module back
     to "in_progress" if its current lab set is no longer fully complete
     -- the only way that can happen today is a content update adding a
     lab, exactly this mission's situation. One correct shape (adapt as
     needed, but preserve this behavior exactly):
     ```js
     function evaluateModuleStatus(moduleId, labs) {
       const { moduleStatus } = getProgress();
       const currentStatus = moduleStatus[moduleId] || "not_started";
       const complete = labs.length === 0 || allLabsComplete(labs, moduleId);

       if (complete) {
         if (currentStatus !== "done") setModuleStatus(moduleId, "done");
       } else if (currentStatus !== "in_progress") {
         // Covers "not_started -> in_progress" (first interaction) AND
         // "done -> in_progress" (a lab was added since this module was
         // last marked done -- re-open it rather than leaving a stale
         // badge the learner can never earn back without a full reset).
         setModuleStatus(moduleId, "in_progress");
       }
     }
     ```
  3. This must not change behavior for the common case: a module that is
     "done" and stays fully complete (nothing added) must not flicker or
     re-write on every save -- `complete` stays `true` and `currentStatus`
     is already `"done"`, so the `if (currentStatus !== "done")` guard
     keeps this a no-op, same as before.
  4. Manually verify the actual regression this fixes, not just the
     happy path: in the browser, use `javascript_tool` (or the console)
     to call this app's `setModuleStatus`/progress helpers directly to
     put Module 8 into a `"done"` state with only its *old* lab set
     considered complete (i.e. simulate "a learner who finished Module 8
     before this update"), then reload and confirm the module now shows
     `"in_progress"` (not stuck on `"done"`) until the new
     `module-8-verification` lab (added in WP05) is also attempted. If
     WP05 hasn't landed on your branch yet, you can simulate this with
     any lab config that has more than one entry, temporarily, and revert
     the temporary simulation afterward -- the same rule as T003's
     temporary-config approach.
- **Files**: `js/views/module-view.js`
- **Parallel?**: No -- independent of T001/T002/T003 in terms of code
  (different file), but do it in the same WP pass since both are
  foundational fixes WP02/WP05/WP06 depend on landing correctly.

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
- **Risk**: The T023 fix is easy to half-apply -- removing the early
  `return` without adding the new `else if (currentStatus !==
  "in_progress")` downgrade branch would leave "done" modules stuck (no
  branch matches "was done, no longer complete", so nothing happens,
  same bug as before just with dead code removed). **Mitigation**: use
  the exact replacement shape given in T023, and actually exercise the
  "previously done, lab added" scenario in the browser (T023 step 4),
  not just the fresh-learner path.
- **Risk**: T023 touches a function every module in the app calls, not
  just the three this mission adds labs to -- a careless change here has
  a wide blast radius. **Mitigation**: keep the diff to exactly the
  status-transition logic shown; do not refactor `evaluateModuleStatus`
  or `allLabsComplete` beyond what T023 specifies, and spot-check one
  *unaffected* module (e.g. Module 2) still behaves identically after
  the change.

## Review Guidance

- Confirm the diff touches only `js/views/labs/quiz-lab.js` and
  `js/views/module-view.js` (and, only if genuinely needed per T001's
  guidance, a small addition to `css/style.css` -- flag if so and confirm
  the rationale).
- Load Module 8 and confirm its existing quiz renders identically to
  before this change (no `explanation` text appears anywhere).
- Confirm `git diff` shows no leftover temporary/test config in
  `js/data/modules/*.js`.
- For T023: confirm the fix includes both the "not_started -> in_progress"
  path (unchanged) AND the new "done -> in_progress" downgrade path when a
  module's lab set is no longer fully complete -- read the diff, don't
  just trust that "it compiles." Confirm an unrelated, unaffected module
  (e.g. Module 2) still transitions and stays "done" normally, with no
  flicker on repeated saves.

## Activity Log

**Initial entry**:

- 2026-09-04T11:10:00Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP01 --to <status>` to change WP status.
