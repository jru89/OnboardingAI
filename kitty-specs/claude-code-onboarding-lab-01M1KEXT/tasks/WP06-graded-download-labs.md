---
work_package_id: WP06
title: Spot-Mistake, Quiz & Download Lab Engines
dependencies:
- WP03
requirement_refs:
- FR-005
- FR-006
- FR-013
- FR-014
- FR-015
- FR-019
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
subtasks:
- T026
- T027
- T028
- T029
phase: Phase 2 - Shared Components
assignee: ''
agent: claude
history:
- at: '2026-09-03T14:08:39Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/views/labs/spot-mistake-lab.js
create_intent:
- js/views/labs/spot-mistake-lab.js
- js/views/labs/quiz-lab.js
- js/views/labs/download-lab.js
execution_mode: code_change
model: ''
owned_files:
- js/views/labs/spot-mistake-lab.js
- js/views/labs/quiz-lab.js
- js/views/labs/download-lab.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP06 – Spot-Mistake, Quiz & Download Lab Engines

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

The two graded (but low-stakes, retriable) engines, plus the download-link
engine. On completion:

- `spot-mistake-lab.js` (Module 3) and `quiz-lab.js` (Module 8) both show
  per-item feedback and a score on submit, and allow unlimited retries with
  no penalty (spec Assumptions) — retrying never locks the lab or degrades
  the experience.
- `download-lab.js` (Modules 7, 12) renders a list of real `<a download>`
  links from static config — no Blob construction (per Phase 0 research).
- All three satisfy [`contracts/lab-engine-contract.md`](../contracts/lab-engine-contract.md).

## Context & Constraints

- Read [`spec.md`](../spec.md) FR-005/FR-006 (spot-mistake), FR-014/FR-015
  (quiz), FR-013/FR-019 (downloads), and the spec's Assumptions section
  (graded checks are low-stakes and retriable, not a gate).
- Read [`research.md`](../research.md)'s "Downloadable assets are served as
  real static files" decision — `download-lab.js` must not construct
  Blobs/Object URLs.
- Depends on WP03 (mounting contract) and WP02 (`setLabState` for
  score/attempt tracking).
- No real content exists yet — verify against hand-written stub configs.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab

## Subtasks & Detailed Guidance

### Subtask T026 – Implement spot-mistake-lab.js (FR-005, FR-006)

- **Purpose**: Module 3's graded "spot the unsafe paste" exercise.
- **Steps**:
  1. `lab.config`: an array of `{id, snippet, isUnsafe, explanation}` items
     (sample chat snippets, at least one unsafe per the spec).
  2. `mount()` renders each snippet with a "safe" / "unsafe" toggle; on
     submit, compare selections to `isUnsafe`, show per-item correct/
     incorrect with `explanation`, and a summary score (`correct/total`).
  3. Store `{lastScore: {correct, total}, attempts}` in
     `labState[lab.id]` via `setLabState` (data-model.md shape) — increment
     `attempts` on each submit, overwrite `lastScore`.
  4. A visible "try again" control resets the form (does not require a
     page reload) and does not penalize a retry.
- **Files**: `js/views/labs/spot-mistake-lab.js`
- **Parallel?**: [P]

### Subtask T027 – Implement quiz-lab.js (FR-014, FR-015)

- **Purpose**: Module 8's graded multiple-choice check.
- **Steps**:
  1. `lab.config`: an array of `{id, question, options: string[],
     correctIndex}` items.
  2. Same submit/score/retry pattern as T026 — reuse the same
     `labState[lab.id]` shape (`{lastScore, attempts}`) for consistency; do
     not invent a different shape for this engine.
- **Files**: `js/views/labs/quiz-lab.js`
- **Parallel?**: [P]

### Subtask T028 – Implement download-lab.js (FR-013, FR-019)

- **Purpose**: A simple, real-file download list.
- **Steps**:
  1. `lab.config`: an array of `{label, path}` (per `data-model.md`'s
     Downloadable asset shape).
  2. `mount()` renders each as a plain `<a href="{path}" download>{label}</a>`.
     No Blob/`URL.createObjectURL` — the browser handles the download
     natively for a same-origin static file.
  3. This engine has no "completion" concept in the graded sense — treat
     "the download links rendered without error" as sufficient for
     WP03's completion rule (downloads can't be observed as "clicked"
     reliably/usefully, and the spec doesn't require tracking that).
- **Files**: `js/views/labs/download-lab.js`
- **Parallel?**: [P]

### Subtask T029 – Wire graded-lab score/attempt state into progress.js

- **Purpose**: Confirm both graded engines correctly round-trip through
  the shared store.
- **Steps**:
  1. Confirm score/attempts restore correctly on remount (navigate away,
     come back — the last score and attempt count should still show,
     not reset to blank).
  2. Confirm retry actually increments `attempts` and updates `lastScore`,
     not just resets the UI without persisting.
- **Files**: `js/views/labs/spot-mistake-lab.js`, `js/views/labs/quiz-lab.js`
- **Parallel?**: No — final integration check.

## Risks & Mitigations

- **Risk**: "Retriable, no penalty" gets accidentally implemented as
  "locks after first submit." **Mitigation**: explicitly test retry twice
  in a row during review, not just once.

## Review Guidance

- Confirm retry works unlimited times with no lockout.
- Confirm `download-lab.js` contains no Blob/Object-URL code.
- Confirm both graded engines share the same `labState` shape (consistency
  matters for WP08's content authoring, which will write `lab.config` for
  both).

## Activity Log

**Initial entry**:

- 2026-09-03T14:08:39Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP06 --to <status>` to change WP status.
