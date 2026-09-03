---
work_package_id: WP04
title: Prompt Builder & Clipboard
dependencies:
- WP02
requirement_refs:
- FR-009
- FR-010
- FR-011
- FR-012
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
subtasks:
- T017
- T018
- T019
- T020
- T021
phase: Phase 2 - Shared Components
assignee: ''
agent: claude
history:
- at: '2026-09-03T14:08:39Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/lib/prompt-builder.js
create_intent:
- js/lib/prompt-builder.js
- js/lib/clipboard.js
- js/views/labs/prompt-builder-lab.js
execution_mode: code_change
model: ''
owned_files:
- js/lib/prompt-builder.js
- js/lib/clipboard.js
- js/views/labs/prompt-builder-lab.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP04 – Prompt Builder & Clipboard

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

The single recurring interactive component used across four modules
(6, 8, 10, 11). On completion:

- `js/lib/prompt-builder.js` exactly matches
  [`contracts/prompt-builder-api.md`](../contracts/prompt-builder-api.md):
  pure functions, no DOM, no network access anywhere in this file (C-001
  must hold by construction, not just by review).
- Filling the builder form live-updates an assembled prompt preview
  (FR-009, FR-010).
- The copy button copies the assembled text via the Clipboard API, with a
  visible manual-select fallback if it's unavailable (FR-011, spec Edge
  Cases).
- Navigating away from Module 6's builder and into Module 8's "rewrite this
  weak prompt" builder and back preserves both drafts independently
  (FR-012) — this is the trickiest behavior in this WP; see T020.

## Context & Constraints

- Read [`contracts/prompt-builder-api.md`](../contracts/prompt-builder-api.md)
  and [`contracts/lab-engine-contract.md`](../contracts/lab-engine-contract.md)
  (this lab engine's `type` is `"prompt-builder"`).
- Read [`spec.md`](../spec.md) FR-009 through FR-012, FR-014/FR-015 (the
  rewrite exercise reuses this same engine, not a separate one), FR-017,
  FR-018.
- Depends on WP02 (`js/lib/progress.js`'s `setBuilderDraft`/`getProgress`).
- No module content exists yet — verify this WP with a hand-written stub
  `lab` config (a `{id, type: "prompt-builder", config: {...}}` object) and
  a stub `moduleId`, per the same pattern WP03 uses. Do not block on
  WP07/WP08.
- This WP does **not** implement `module-view.js`'s mounting logic (WP03
  owns that) — it only needs to satisfy the `mount(container, lab,
  moduleId) -> {unmount()}` contract so WP03 can call it.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab

## Subtasks & Detailed Guidance

### Subtask T017 – Implement js/lib/prompt-builder.js

- **Purpose**: Pure assembly logic, per the contract.
- **Steps**:
  1. `assemblePrompt(fields)`: build the prompt text in role → context →
     task → format order (the golden-rules order taught in Module 6),
     appending constraints/tone/example sections only when non-empty.
     Use clear section labels matching what Module 6 teaches (e.g. "Role:",
     "Context:", "Task:", "Format:", "Constraints:", "Tone:", "Example:").
  2. `validateFields(fields)`: `{valid, missing}` where `missing` lists
     which of `role`/`context`/`task`/`format` are empty/whitespace-only.
  3. No DOM access, no imports beyond nothing (zero dependencies) — this
     file must be independently readable/testable with a plain
     `assemblePrompt({...})` call in a console.
- **Files**: `js/lib/prompt-builder.js`
- **Parallel?**: No — everything else in this WP depends on it.

### Subtask T018 – Implement js/lib/clipboard.js

- **Purpose**: Copy with a real fallback, not a silent failure.
- **Steps**:
  1. `copyText(text)`: try `navigator.clipboard.writeText(text)`; on
     success, return `{copied: true}`.
  2. On rejection/unavailability (catch the promise rejection, and also
     check `navigator.clipboard` exists before calling), return `{copied:
     false}` — do not throw.
  3. `prompt-builder-lab.js` (T019) is responsible for the visible fallback
     UI when `copied: false` is returned (select the text for manual
     copy) — keep that UI logic out of this pure-ish utility file.
- **Files**: `js/lib/clipboard.js`
- **Parallel?**: [P] — independent of T017.

### Subtask T019 – Implement prompt-builder-lab.js

- **Purpose**: The actual form UI, satisfying the lab-engine-contract.
- **Steps**:
  1. Export `mount(container, lab, moduleId)`: render labeled fields for
     role/context/task/format (required) and constraints/tone/example
     (optional, per `lab.config` seed placeholders if provided).
  2. On every input event, call `assemblePrompt(currentFields)` and update
     a live preview `<pre>`/`<code>` block. Call `validateFields` to show
     which required fields are still empty (a subtle hint, not a blocking
     error — per FR-010's "live-assembles ... as the learner types").
  3. A copy button calls `copyText()` (T018); on `{copied: false}`, select
     the preview text and show a short "select the text above to copy
     manually" message (spec Edge Cases).
  4. Return `{unmount()}` that removes all event listeners this function
     added.
- **Files**: `js/views/labs/prompt-builder-lab.js`
- **Parallel?**: No — depends on T017, T018.

### Subtask T020 – Implement per-purpose-key draft isolation (FR-012)

- **Purpose**: Module 6's draft and Module 8's rewrite-exercise draft must
  not collide even though both mount this same engine.
- **Steps**:
  1. `lab.config` for a prompt-builder lab must include a `purposeKey`
     (e.g. `"prompting-101"`, `"prompting-201-rewrite"`, `"automate-a-task"`,
     `"readme-exercise"`) distinct per usage — this is a **data-model.md
     decision this WP must make concrete**: add `purposeKey` to the
     `prompt-builder` lab config shape if not already implied, and use it
     (not `lab.id` or `moduleId`) as the key passed to
     `progress.js`'s `setBuilderDraft`/`getProgress().builderDrafts`.
  2. On mount, seed the form from `getProgress().builderDrafts[purposeKey]`
     if present; on every change, debounce-free direct call to
     `setBuilderDraft(purposeKey, fields)` is fine (progress.js's own write
     is already debounced — do not double-debounce).
- **Files**: `js/views/labs/prompt-builder-lab.js`
- **Parallel?**: No — depends on T019.

### Subtask T021 – Live preview + required-field hinting polish

- **Purpose**: Make the builder feel responsive and clear about what's
  missing, per Module 6's golden rules ("be specific," "one goal at a
  time").
- **Steps**:
  1. Visually distinguish required vs. optional fields (labels, not just
     color — accessible without relying on color alone).
  2. Keep the live preview update synchronous on input (no debounce needed
     here — this is fast, in-memory string assembly, unlike the
     localStorage write).
- **Files**: `js/views/labs/prompt-builder-lab.js`
- **Parallel?**: No — final polish pass after T019/T020.

## Risks & Mitigations

- **Risk**: `purposeKey` decision (T020) isn't explicit anywhere upstream —
  this WP is the first to need it. **Mitigation**: document the chosen
  `purposeKey` values in this WP's Activity Log so WP07/WP08 (which author
  the actual `lab.config` for each module) use the exact same strings —
  mismatched keys would silently create duplicate/lost drafts.
- **Risk**: Clipboard API behaves differently across browsers/contexts (may
  require a user gesture, may be blocked on non-HTTPS). **Mitigation**: the
  fallback path (T018/T019) is not optional — test the fallback
  deliberately (e.g. temporarily stub `navigator.clipboard` to `undefined`)
  rather than assuming the happy path always works.

## Review Guidance

- Confirm `js/lib/prompt-builder.js` has zero DOM/network calls — read the
  file, don't just run it.
- Confirm switching between two different `purposeKey` builder instances
  (simulate Module 6 vs Module 8) preserves both drafts independently.
- Confirm the fallback UI actually appears when clipboard access is denied.

## Activity Log

**Initial entry**:

- 2026-09-03T14:08:39Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP04 --to <status>` to change WP status.
