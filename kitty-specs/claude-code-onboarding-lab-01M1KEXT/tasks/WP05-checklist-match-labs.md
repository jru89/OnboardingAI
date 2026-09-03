---
work_package_id: WP05
title: Checklist & Match Lab Engines
dependencies:
- WP03
requirement_refs:
- FR-003
- FR-004
- FR-007
- FR-008
- FR-016
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
subtasks:
- T022
- T023
- T024
- T025
phase: Phase 2 - Shared Components
assignee: ''
agent: "claude:sonnet-5:frontend-freddy:implementer"
shell_pid: "22192"
history:
- at: '2026-09-03T14:08:39Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/views/labs/checklist-lab.js
create_intent:
- js/views/labs/checklist-lab.js
- js/views/labs/match-lab.js
execution_mode: code_change
model: ''
owned_files:
- js/views/labs/checklist-lab.js
- js/views/labs/match-lab.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP05 – Checklist & Match Lab Engines

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Two non-graded, self-marked lab engines: the Module 1 orientation checklist,
and a generic match/sort/scenario-Q&A engine reused by four modules
(2, 4, 5, 9). On completion:

- Both engines satisfy [`contracts/lab-engine-contract.md`](../contracts/lab-engine-contract.md).
- `match-lab.js`'s data shape has been checked against all four real target
  shapes (a sort-into-buckets exercise, a folder-tree matching exercise, a
  scenario-Q&A exercise, and a tool-choice matching quiz) and either fits
  all four or is deliberately split — this WP must resolve the risk flagged
  in `plan.md` IC-04, not defer it to WP07/WP08.
- Both are self-marked only (no score/pass-fail UI) — graded engines are a
  different WP (WP06).

## Context & Constraints

- Read [`spec.md`](../spec.md) FR-003 (checklist), FR-004/FR-007/FR-008/FR-016
  (the four match-lab use cases) and [`data-model.md`](../data-model.md)'s
  Lab config shape.
- Depends on WP03 (`module-view.js` calls these via the lab-engine-contract)
  and indirectly WP02 (`progress.js`'s `setLabState`).
- No real module content exists yet — build and verify against hand-written
  stub configs covering all four match-lab shapes (see T024), not against
  WP07/WP08's eventual real content.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab

## Subtasks & Detailed Guidance

### Subtask T022 – Implement checklist-lab.js (FR-003)

- **Purpose**: Module 1's non-graded orientation checklist.
- **Steps**:
  1. `lab.config` shape: an array of `{id, label}` items (e.g. `{id:
     "find-input-box", label: "Find the input box"}`).
  2. `mount()` renders each as a checkbox; on toggle, write the set of
     checked ids into `labState[lab.id].checkedItems` via
     `setLabState`. On mount, restore checked state from
     `getProgress().labState[lab.id]?.checkedItems`.
  3. No score, no pass/fail — this is self-marked. Treat "all items
     checked" as this lab's `completed` signal for WP03's T016 "mark done"
     rule (if you implemented an `onComplete` hook per WP03 — check its
     Activity Log for what it settled on and match it).
- **Files**: `js/views/labs/checklist-lab.js`
- **Parallel?**: [P] — independent of T023.

### Subtask T023 – Implement match-lab.js generic engine

- **Purpose**: One engine, four use cases (sort-buckets, folder-tree
  matching, scenario Q&A, tool-choice quiz).
- **Steps**:
  1. Design `lab.config` as an array of `{prompt, options: string[],
     correctOption: string}` items — a "prompt" (statement/scenario/file
     name), a set of choices, and which one is correct. This shape should
     cover: sort-into-buckets (options are the two bucket labels), folder
     matching (options are folder/file descriptions), scenario Q&A
     (options are yes/no or category labels), tool-choice (options are
     tool names).
  2. `mount()` renders each item with its options as a button group or
     radio set; on selection, show immediate feedback (correct/incorrect,
     non-punitive framing since this is self-marked, not graded) and store
     per-item selections in `labState[lab.id]`.
  3. Unlimited changes allowed — this is not a locked-in submit-once quiz
     (that's `quiz-lab.js` in WP06).
- **Files**: `js/views/labs/match-lab.js`
- **Parallel?**: No — needs the shape decided before T024 can verify it.

### Subtask T024 – Verify match-lab.js's shape fits all 4 use cases

- **Purpose**: Resolve the `plan.md` IC-04 risk explicitly, now, not later.
- **Steps**:
  1. Write four small stub configs, one per real use case (Module 2's
     "any chatbot vs. Claude Code specifically" sort, Module 4's
     folder-tree matching, Module 5's MCP scenario Q&A, Module 9's
     tool-choice quiz) and mount each through `match-lab.js`.
  2. If any genuinely doesn't fit the `{prompt, options, correctOption}`
     shape (e.g. folder-tree matching might want to show a small tree
     illustration alongside the prompt, or scenario Q&A might want longer
     prompt text than a sort exercise) — decide now: either extend the
     shared shape with an optional field (preferred, keeps one engine) or
     split into two engines (only if the shapes are genuinely
     incompatible, not just "slightly different"). Record the decision and
     rationale in this WP's Activity Log.
- **Files**: `js/views/labs/match-lab.js` (adjustments only)
- **Parallel?**: No — depends on T023.

### Subtask T025 – Wire checklist/match completion state into progress.js

- **Purpose**: Both engines correctly report state through the shared store.
- **Steps**:
  1. Confirm both engines only mutate state via `progress.js`'s
     `setLabState` — never touch `localStorage` directly.
  2. Confirm both engines restore prior state correctly on remount
     (navigate away and back, or reload).
- **Files**: `js/views/labs/checklist-lab.js`, `js/views/labs/match-lab.js`
- **Parallel?**: No — final integration check after T022-T024.

## Risks & Mitigations

- **Risk**: Forcing all four match-lab use cases into one shape produces an
  awkward, over-generic UI. **Mitigation**: T024 exists specifically to
  catch this before content authoring (WP07/WP08) depends on a bad
  abstraction — do not skip it or treat it as a formality.

## Review Guidance

- Confirm T024's four stub verifications actually ran (not just asserted
  in prose) — check the Activity Log for what was tested and what, if
  anything, was changed as a result.
- Confirm neither engine implements any grading/scoring UI (that's WP06's
  job) — self-marked only.

## Activity Log

**Initial entry**:

- 2026-09-03T14:08:39Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP05 --to <status>` to change WP status.
- 2026-09-03T16:10:17Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=22192 – Assigned agent via action command
