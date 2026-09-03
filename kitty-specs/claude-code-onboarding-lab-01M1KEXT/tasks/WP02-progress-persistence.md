---
work_package_id: WP02
title: Progress & Persistence Layer
dependencies:
- WP01
requirement_refs:
- FR-001
- FR-002
- FR-020
- FR-021
- FR-022
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
subtasks:
- T007
- T008
- T009
- T010
- T011
phase: Phase 1 - Foundation
assignee: ''
agent: "claude:sonnet-5:frontend-freddy:implementer"
shell_pid: "30868"
history:
- at: '2026-09-03T14:08:39Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/lib/progress.js
create_intent:
- js/lib/progress.js
- js/views/landing-view.js
execution_mode: code_change
model: ''
owned_files:
- js/lib/progress.js
- js/views/landing-view.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP02 – Progress & Persistence Layer

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

If no profile is specified, run `spec-kitty agent profile list` and select the best match for this work package's `task_type` and `authoritative_surface`.

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback; it is your implementation TODO list. Update the Activity Log as you address each item.

## Markdown Formatting

Wrap HTML/XML tags in backticks: `` `<div>` ``. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

The single source of truth for everything the learner has done, and the
view that surfaces it. On completion:

- `js/lib/progress.js` exactly matches the contract in
  [`contracts/progress-store.md`](../contracts/progress-store.md): `getProgress()`
  never throws, writes are debounced, `resetProgress()` is immediate.
- The landing view lists all 12 module placeholders (real module data
  arrives in WP07/WP08 — use minimal stub entries here, see T010 notes)
  with status and an overall "`X of 12 complete`" indicator that updates
  live from `localStorage`.
- A "reset my progress" control exists, gated behind a confirmation step,
  and actually clears state (FR-022).
- Reloading the page after interacting with the (still-stubbed) progress
  API restores the prior state with no data loss (SC-005) — this is the
  single most important thing to manually verify before marking this WP done.

## Context & Constraints

- Read [`data-model.md`](../data-model.md) (Progress record shape,
  localStorage key `ccol:progress:v1`, state transitions) and
  [`contracts/progress-store.md`](../contracts/progress-store.md) (the exact
  function signatures — implement precisely this API, no more, no less; no
  other module should ever call `localStorage` directly, only through this
  file).
- Read [`spec.md`](../spec.md) FR-001, FR-002, FR-020, FR-021, FR-022, and
  the Edge Cases section (cleared site data / corrupt localStorage must
  degrade to a fresh default record, never throw).
- Depends on WP01: use `navigateTo()` from `js/app.js` for the landing
  view's module links, and wire this WP's real `landing-view.js` into the
  router's `#/` route (replacing WP01's stub — a one-line change in
  `js/app.js`'s route table, per WP01's design intent).
- Module content (titles, summaries) does not exist yet (that's WP07/WP08).
  Use a small local placeholder list of 12 `{id, order, title}` stub
  entries directly in `landing-view.js` for this WP, clearly marked with a
  comment that WP08 will replace this with a real import from
  `js/data/modules/index.js` once it exists. Do not block this WP on
  content that hasn't been written yet.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab

## Subtasks & Detailed Guidance

### Subtask T007 – Implement js/lib/progress.js core

- **Purpose**: Default record shape, safe read.
- **Steps**:
  1. Define the default record per `data-model.md`: `{schemaVersion: 1,
     moduleStatus: {}, labState: {}, builderDrafts: {}, updatedAt: null}`.
  2. `getProgress()`: read `localStorage.getItem('ccol:progress:v1')`,
     `JSON.parse` in a `try/catch`; on any failure (missing key, parse
     error, wrong shape) return a **fresh default record**, never throw.
     Cache the parsed record in a module-level variable so repeated calls
     don't re-read/re-parse localStorage on every call.
- **Files**: `js/lib/progress.js`
- **Parallel?**: No — everything else in this file builds on this.

### Subtask T008 – Implement debounced write + onSaved subscription

- **Purpose**: Autosave with a "saved" indicator hook (FR-020).
- **Steps**:
  1. Internal `scheduleWrite()`: clears any pending `setTimeout`, sets a new
     one (~300-500ms), and on fire, `JSON.stringify`s the in-memory record
     (with `updatedAt` set to `new Date().toISOString()`) into
     `localStorage`, then calls every subscriber registered via `onSaved`.
  2. `onSaved(callback)`: pushes `callback` into an internal list, returns
     an unsubscribe function that removes it.
- **Files**: `js/lib/progress.js`
- **Parallel?**: No — depends on T007.

### Subtask T009 – Implement setters + resetProgress

- **Purpose**: The mutation API every consumer uses.
- **Steps**:
  1. `setModuleStatus(moduleId, status)`, `setLabState(labId, state)` (merge,
     not replace, into `labState[labId]`), `setBuilderDraft(purposeKey,
     draft)` (replace) — each mutates the in-memory record then calls
     `scheduleWrite()`.
  2. `resetProgress()`: `localStorage.removeItem('ccol:progress:v1')`,
     reset the in-memory record to a fresh default, call subscribers
     immediately (not debounced — this is an explicit, immediate user
     action).
- **Files**: `js/lib/progress.js`
- **Parallel?**: No — depends on T007/T008.

### Subtask T010 – Build landing-view.js

- **Purpose**: The `#/` route: module list + overall progress (FR-001, FR-002, FR-021).
- **Steps**:
  1. Export a `render(container)` function matching the router's stub
     signature from WP01 (replace the stub in `js/app.js`'s route table
     with an import of this function — a one-line change).
  2. Render a card per module (use the placeholder 12-entry list described
     in Context above) showing title, one-line summary, and a status badge
     read from `getProgress().moduleStatus[id]` (default "not started").
     Each card is a real link (`navigateTo('/module/' + id)`), not a
     `<div onclick>` (FR-026).
  3. Render an overall completion string ("`X of 12 modules complete`")
     into the header's `#overall-progress` element (from WP01/T003) — count
     entries in `moduleStatus` with value `"done"`.
  4. Subscribe to `onSaved` so the view (and the header's progress text)
     re-render automatically when progress changes elsewhere (e.g. after
     leaving a module and coming back).
- **Files**: `js/views/landing-view.js` (new)
- **Parallel?**: No — depends on T007-T009 for the data it reads.

### Subtask T011 – Add reset-progress control with confirmation gate

- **Purpose**: FR-022.
- **Steps**:
  1. A visible "Reset my progress" button on the landing view.
  2. On click, show a confirmation step (a native `confirm()` dialog is
     acceptable for v1 — simplest implementation that satisfies "gated
     behind a confirmation step"; do not skip this and reset immediately).
  3. On confirm, call `resetProgress()` and re-render the landing view to
     first-visit state.
- **Files**: `js/views/landing-view.js`
- **Parallel?**: No — depends on T010.

## Risks & Mitigations

- **Risk**: A corrupt/legacy localStorage value crashes `getProgress()`.
  **Mitigation**: the `try/catch` in T007 is not optional — write a manual
  test: open DevTools, set `localStorage['ccol:progress:v1'] = 'not json'`,
  reload, confirm the app still loads cleanly.
- **Risk**: Debounce timer leaks across rapid navigation (e.g. a pending
  write from a module the learner just left never fires because the module
  unmounted). **Mitigation**: the debounce lives in `progress.js`, not in
  any view/lab component, so it is unaffected by view mount/unmount —
  confirm this design holds when WP03's module-view unmount logic lands.

## Review Guidance

- Verify no file other than `js/lib/progress.js` touches `localStorage`
  directly (`grep -r localStorage js/` should show only this file).
- Verify reload-persistence manually (set some state, hard refresh, confirm
  it's still there) — this is SC-005 and the most important acceptance
  check for this WP.
- Verify reset actually clears the key (check DevTools Application >
  Local Storage after clicking reset+confirm).

## Activity Log

**Initial entry**:

- 2026-09-03T14:08:39Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP02 --to <status>` to change WP status.
- 2026-09-03T15:19:30Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=30868 – Assigned agent via action command
