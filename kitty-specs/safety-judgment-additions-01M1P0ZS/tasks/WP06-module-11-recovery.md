---
work_package_id: WP06
title: 'Module 11: Recovery Workflow & Lab'
dependencies:
- WP01
requirement_refs:
- FR-009
- FR-010
tracker_refs: []
planning_base_branch: feat/safety-judgment-additions
merge_target_branch: feat/safety-judgment-additions
branch_strategy: Planning artifacts for this mission were generated on feat/safety-judgment-additions. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/safety-judgment-additions unless the human explicitly redirects the landing branch.
subtasks:
- T017
- T018
- T019
phase: Phase 2 - Module Content
assignee: ''
agent: ''
history:
- at: '2026-09-04T11:10:00Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/data/modules/11-md-files-habits.js
create_intent: []
execution_mode: code_change
model: ''
owned_files:
- js/data/modules/11-md-files-habits.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP06 – Module 11: Recovery Workflow & Lab

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Module 11 (.md Files & Habits) is the course's last habit-building module
before Graduation. This WP adds the mission's other core safety habit:
what to do when an AI assistant gets something wrong. On completion:

- A new reading section, "What to do when Claude gets it wrong," teaches a
  short recovery workflow (stop; explain what was expected instead; show
  the actual wrong output; ask it to diagnose before changing anything;
  ask for a plan; review the plan; confirm the fix worked), plus a short
  "things can go wrong, and that's okay" note establishing one plain rule:
  before a significant change, make sure there's a way to get back to
  where things were (FR-009).
- A new lab, `module-11-recovery`, presents a scenario where an AI
  assistant made an unexpected change, and the learner picks the best
  next response from 4 options, with an explanation shown after
  answering (FR-010).

## Context & Constraints

- **Depends on WP01.** This lab uses `quiz-lab.js`'s new `explanation`
  field ([`contracts/quiz-lab-contract-amendment.md`](../contracts/quiz-lab-contract-amendment.md)).
  Confirm WP01 has landed on your working branch before verifying this
  WP (T019).
- Read [`spec.md`](../spec.md) FR-009, FR-010, and Acceptance Scenario 6.
- Read [`data-model.md`](../data-model.md)'s "Module 11 —
  `module-11-recovery` (quiz)" section for the **exact** authored lab
  content (1 item, 4 options, `correctIndex: 2`, `explanation`). Use it
  verbatim; light wording polish is fine, but the judgment call itself
  (which response models diagnose-before-fixing) must not change.
- Read `js/data/modules/11-md-files-habits.js` in full before editing.
  Study its existing three content sections ("What is Markdown?", "Why AI
  tooling favors it", "The habit worth building") and its existing single
  lab (`module-11-prompt-builder`) so your additions match the file's
  established style exactly.
- FR-009 is explicit that the "things can go wrong" note is **not a Git
  course** -- mention version history/backups/undo only as plain
  concepts, not as instructions for using any specific tool. One plain
  rule is the deliverable, not a tutorial.
- This module already covers Markdown and habit-building; keep the new
  section **clearly separated** with its own heading so it doesn't read
  as continuous with the Markdown material -- place it as its own section
  after "The habit worth building," before the existing lab.
- **Do not touch** `module-11-prompt-builder` (the module's existing
  README-writing exercise) -- this WP only adds a second, new lab
  alongside it.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/safety-judgment-additions
- **Merge target branch**: feat/safety-judgment-additions

## Subtasks & Detailed Guidance

### Subtask T017 – Author "What to do when Claude gets it wrong" section

- **Purpose**: The reading content teaching the recovery workflow.
- **Steps**:
  1. Add a new content-section entry to `11-md-files-habits.js`'s
     `content` array (append after the existing "The habit worth
     building" section), heading "What to do when Claude gets it wrong."
  2. Cover the short recovery workflow in plain language: stop (don't
     keep asking it to randomly fix things); explain what was expected
     instead; show it the actual wrong output; ask it to diagnose what
     went wrong before changing anything else; ask for a plan; review
     the plan; confirm the fix actually worked. Present as a short
     numbered or bulleted sequence (matching this app's existing
     numbered-list pattern, e.g. Module 1's diagram-labeling list, or a
     plain `<ol>` -- your call on the exact HTML shape, consistent with
     this file's existing style).
  3. Add a short, separate closing note establishing one plain rule:
     before a significant change, make sure there's a way to get back to
     where things were. Mention version history / backups / undo only as
     plain concepts the reader should be aware exist, explicitly **not**
     as a Git tutorial -- one sentence naming the idea, one sentence
     giving the rule, no more.
- **Files**: `js/data/modules/11-md-files-habits.js`
- **Parallel?**: [P] -- independent of T018 (different array; land
  content before the lab config for a coherent reading order).

### Subtask T018 – Author `module-11-recovery` quiz lab config

- **Purpose**: The graded practice exercise.
- **Steps**:
  1. Add a new entry to `11-md-files-habits.js`'s `labs` array, as the
     **first** lab (before the existing `module-11-prompt-builder`) so
     the recovery-workflow practice immediately follows the section that
     teaches it.
  2. `{id: "module-11-recovery", type: "quiz", graded: true, config:
     [...]}` -- use the exact single item from `data-model.md`'s Module
     11 section: `question` (the "you asked Claude Code to clean up a
     list, it removed several rows" scenario), `options` (4 strings: two
     unhelpful vague retries, the diagnose-before-fixing option, and a
     rude/unhelpful option), `correctIndex: 2`, `explanation`.
- **Files**: `js/data/modules/11-md-files-habits.js`
- **Parallel?**: No -- depends on T017 for a coherent content-to-lab
  reading order.

### Subtask T019 – Manual browser verification

- **Purpose**: Confirm the whole addition works end-to-end.
- **Steps**:
  1. Start the local preview server, open Module 11, confirm the new
     "What to do when Claude gets it wrong" section renders after "The
     habit worth building," clearly separated by its own heading, and
     confirm the "keep a way back" closing note reads as a plain rule,
     not a Git tutorial.
  2. Confirm the new lab renders before the existing
     `module-11-prompt-builder` lab, with 4 response options.
  3. Submit each of the 4 options in turn (one at a time, using
     retry/reload as needed) and confirm the explanation appears for
     both the correct choice and each incorrect one.
  4. Confirm the existing `module-11-prompt-builder` lab still renders
     and behaves exactly as before (unaffected by this WP).
  5. Confirm Module 11's status on the landing view now requires **both**
     `module-11-recovery` and `module-11-prompt-builder` to be attempted
     before showing "done."
  6. Check the browser console for errors.
- **Files**: none changed -- verification only.
- **Parallel?**: No -- final step, depends on T017 and T018.

## Risks & Mitigations

- **Risk**: The "keep a way back" note drifts into an unintended
  mini-Git-course despite FR-009's explicit constraint. **Mitigation**:
  after writing, re-read it and confirm it would make sense to someone
  who has never used version control -- one plain rule, not a how-to.
- **Risk**: If WP01 hasn't landed yet on this WP's branch, explanations
  silently don't render. **Mitigation**: confirm WP01 is merged before
  starting T019.

## Review Guidance

- Confirm the new section is clearly visually separated from the
  Markdown-focused content above it (its own heading, not folded into
  "The habit worth building").
- Confirm the lab's 4 options and `correctIndex`/`explanation` match
  `data-model.md` (or that wording changes preserve the same judgment
  call).
- Load Module 11 in the browser, submit each of the 4 lab options, and
  confirm an explanation renders for all four.

## Activity Log

**Initial entry**:

- 2026-09-04T11:10:00Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP06 --to <status>` to change WP status.
