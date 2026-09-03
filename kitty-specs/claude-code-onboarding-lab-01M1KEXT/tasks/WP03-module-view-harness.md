---
work_package_id: WP03
title: Module View Harness
dependencies:
- WP01
- WP02
requirement_refs:
- FR-002
- FR-024
tracker_refs: []
subtasks:
- T012
- T013
- T014
- T015
- T016
phase: Phase 1 - Foundation
assignee: ''
agent: claude
history:
- at: '2026-09-03T14:08:39Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/views/module-view.js
create_intent:
- js/views/module-view.js
execution_mode: code_change
model: ''
owned_files:
- js/views/module-view.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP03 – Module View Harness

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks: `` `<div>` ``. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Every one of the 12 modules and every lab engine mounts through this one
generic harness. On completion:

- `#/module/:id` renders the matching module's content sections and mounts
  its configured lab(s) per [`contracts/lab-engine-contract.md`](../contracts/lab-engine-contract.md).
- Leaving a module view (navigating elsewhere) reliably calls the mounted
  lab's `unmount()` — no leaked event listeners, no dead-end screens
  (FR-024).
- A module is marked `"done"` in `localStorage` once all of its labs have
  been interacted with at least once (self-marked for non-graded, attempted
  for graded — see `data-model.md` state transitions).
- Content sections can embed a glossary-term definition and an SVG diagram
  reference, even though no real content exists yet in this WP (WP07/WP08
  author it; WP10 authors the diagrams).

## Context & Constraints

- Read [`data-model.md`](../data-model.md) (Module / Content Section / Lab
  shapes) and [`contracts/lab-engine-contract.md`](../contracts/lab-engine-contract.md)
  (the `mount(container, lab, moduleId) -> {unmount()}` contract every lab
  engine must satisfy — this WP is the *caller* of that contract, not an
  implementer of any specific engine).
- Read [`spec.md`](../spec.md) FR-002, FR-024, NFR-003.
- No lab engines exist yet (WP05/WP06 build them) and no real module data
  exists yet (WP07/WP08 author it). Build and verify this WP against a
  **local stub module + a local stub lab** (a trivial object satisfying the
  lab-engine-contract shape, defined inline in a temporary test snippet or
  directly wired against WP02's placeholder module list) — do not wait on
  those other WPs. The important thing this WP proves is that the harness
  correctly calls `mount`/`unmount` and reads/writes completion state
  through `js/lib/progress.js` (WP02) — the specific lab *type* doesn't
  matter yet.
- Wire this WP's real `render` into the router's `#/module/:id` route in
  `js/app.js`, replacing WP01's stub (one-line change, per WP01's design).

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab

## Subtasks & Detailed Guidance

### Subtask T012 – Implement module-view.js

- **Purpose**: The generic per-module shell.
- **Steps**:
  1. Export `render(container, params)` where `params.id` is the module id
     from the route. Look up the module record (from WP02's placeholder
     list for now, or the real `js/data/modules/index.js` once WP08 lands —
     import from whichever exists; if neither is wired yet, use a local
     stub for verification and leave a `// TODO(WP08): import real module
     data` comment).
  2. Render each of the module's `content` sections (heading + body; skip
     `diagram`/`glossaryTerms` rendering logic to T014/T015).
  3. For each of the module's `labs`, dynamically import the matching
     engine module from `js/views/labs/` by `lab.type` (a small
     `type -> import path` map) and call its `mount(container, lab,
     moduleId)`. Store the returned `{unmount}` handle.
  4. Update `progress.js`'s module status to `"in_progress"` on first mount
     if it was previously `"not_started"`.
- **Files**: `js/views/module-view.js`
- **Parallel?**: No — foundation for the rest of this WP.

### Subtask T013 – Implement shared exit-lab/back-to-module affordance

- **Purpose**: FR-024 — no dead-end screens.
- **Steps**:
  1. `module-view.js` itself always renders a "back to all modules" link
     at the top (using WP01's `navigateTo('/')`), independent of whatever
     the mounted lab does internally.
  2. Per the lab-engine-contract, each lab is also individually responsible
     for its own in-lab exit affordance — this subtask only covers the
     module-level one; do not attempt to build lab-specific exit UI here
     (that's each lab engine's own job in WP05/WP06).
- **Files**: `js/views/module-view.js`
- **Parallel?**: No.

### Subtask T014 – Implement glossary-term inline rendering support (NFR-003)

- **Purpose**: Technical terms defined on first use.
- **Steps**:
  1. If a content section has `glossaryTerms`, render each `{term,
     definition}` as an inline, keyboard-accessible disclosure (e.g. a
     `<button>` or `<details>/<summary>` pair) next to its first
     occurrence in the body text — do not require a separate glossary page.
  2. Keep this simple: a native `<details>` element is sufficient and
     accessible by default; no custom tooltip library.
- **Files**: `js/views/module-view.js`
- **Parallel?**: [P] — independent of T015/T016.

### Subtask T015 – Implement SVG diagram embedding support (C-006)

- **Purpose**: Render a content section's optional diagram.
- **Steps**:
  1. If a content section has `diagram` (a path under `assets/svg/`), fetch
     and inline the SVG (or reference it via `<img>` if inlining proves
     unnecessary — inlining is only needed if the diagram must inherit
     page CSS custom properties for theming; a plain `<img src="...">` is
     simpler and sufficient unless a later WP finds a concrete reason
     otherwise).
  2. No diagrams exist yet (WP10) — verify this against a placeholder SVG
     you create temporarily for testing, then remove it; do not leave test
     fixtures behind.
- **Files**: `js/views/module-view.js`
- **Parallel?**: [P]

### Subtask T016 – Implement per-module "mark done" completion rule

- **Purpose**: data-model.md's module status state transition.
- **Steps**:
  1. When a mounted lab signals completion (define a simple convention:
     the lab-engine-contract's `mount()` return value may optionally include
     an `onComplete(callback)` the harness can subscribe to — decide this
     now and reflect it back into `contracts/lab-engine-contract.md` via a
     short note if you add it, since WP05/WP06 will need to implement it),
     check whether *all* of the module's labs are now complete
     (`labState[labId].completed` truthy, or for prompt-builder labs which
     have no notion of "complete," treat "has a non-empty draft" as
     sufficient — use judgment here and document the rule inline as a code
     comment since the spec does not pin down this exact edge case).
  2. If all labs are complete, `setModuleStatus(moduleId, "done")`.
- **Files**: `js/views/module-view.js`
- **Parallel?**: No — depends on T012.

## Risks & Mitigations

- **Risk**: Building against nonexistent lab engines/content leads to
  guessing wrong about the contract. **Mitigation**: the contract files
  already exist and are the source of truth — if this WP needs to change
  them, do so explicitly and note it in the Activity Log so WP05/WP06 pick
  up the change, rather than silently diverging.
- **Risk**: "Mark done" rule (T016) is genuinely underspecified for
  prompt-builder-type labs. **Mitigation**: documented the judgment call
  above; flag it to the stakeholder in review rather than treating it as
  settled.

## Review Guidance

- Confirm `unmount()` is actually called on navigation away (add a
  temporary `console.log` during development, remove before finishing, or
  verify via the browser preview's console).
- Confirm the back-to-all-modules link works from every module route.
- Confirm the completion rule in T016 is documented clearly enough that
  WP05/WP06's lab engines know what they need to signal.

## Activity Log

**Initial entry**:

- 2026-09-03T14:08:39Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP03 --to <status>` to change WP status.
