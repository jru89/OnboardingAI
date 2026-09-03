---
work_package_id: WP08
title: 'Module Content: Mock Use-Cases Through Graduation (Modules 7-12)'
dependencies:
- WP04
- WP05
- WP06
- WP07
- WP09
requirement_refs:
- FR-013
- FR-014
- FR-015
- FR-016
- FR-017
- FR-018
- FR-019
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
subtasks:
- T036
- T037
- T038
- T039
- T040
- T041
- T042
phase: Phase 3 - Content
assignee: ''
agent: claude
shell_pid: '1724'
history:
- at: '2026-09-03T14:08:39Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/data/modules/07-mock-use-cases.js
create_intent:
- js/data/modules/07-mock-use-cases.js
- js/data/modules/08-prompting-201.js
- js/data/modules/09-claude-vs-gemini.js
- js/data/modules/10-automate-a-task.js
- js/data/modules/11-md-files-habits.js
- js/data/modules/12-graduation.js
- js/data/modules/index.js
execution_mode: code_change
model: ''
owned_files:
- js/data/modules/07-mock-use-cases.js
- js/data/modules/08-prompting-201.js
- js/data/modules/09-claude-vs-gemini.js
- js/data/modules/10-automate-a-task.js
- js/data/modules/11-md-files-habits.js
- js/data/modules/12-graduation.js
- js/data/modules/index.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP08 – Module Content: Mock Use-Cases Through Graduation (Modules 7-12)

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Real lesson content for the remaining six modules, plus the aggregator
that finally wires all 12 modules into the app. On completion:

- Each of Modules 7-11 matches its FR exactly, same bar as WP07.
- **Module 12 (graduation) is deliberately lean** — this is the module
  where it is easiest to accidentally over-build. Re-read `spec.md` FR-019
  and C-007 before writing it: fixed goal statement, exactly two downloads
  (the blueprint doc and the Minutes Milo example, both already in the
  repo at `docs/reference/`), explicit handoff instructions to continue in
  the learner's own Claude Code session, and **nothing else** — no
  worksheet, no checklist, no scripted prompts. If you find yourself
  writing a third downloadable file or a step-by-step worksheet for this
  module, stop — that's the exact hand-holding the stakeholder explicitly
  removed.
- `js/data/modules/index.js` imports and re-exports all 12 modules (from
  WP07's six files and this WP's six files) in a single ordered array,
  and `landing-view.js` (WP02) and `module-view.js` (WP03) are updated to
  import from it instead of their WP02/WP03-era placeholder stub lists.

## Context & Constraints

- Read [`spec.md`](../spec.md) FR-013 through FR-019 and C-002, C-007.
- Read [`docs/reference/gemini-agent-repo-blueprint.md`](../../../docs/reference/gemini-agent-repo-blueprint.md)
  and [`docs/reference/example-agent-minutes-milo.md`](../../../docs/reference/example-agent-minutes-milo.md) —
  both already exist in the repo; Module 12's `download` lab config just
  needs to point at them (`content/mock-use-cases/` is a different folder,
  for Module 7 only — do not mix the two).
- Depends on WP07 (six sibling module files must exist for `index.js` to
  import) and WP09 (Module 7's `download` lab config needs the real mock
  use-case file paths WP09 creates under `content/mock-use-cases/`).
- Read WP04/WP05/WP06's Activity Logs for exact `purposeKey` values and
  lab-config shapes, same as WP07.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab

## Subtasks & Detailed Guidance

### Subtask T036 – Author Module 7: Mock Use-Case Downloads (FR-013)

- **Purpose**: Practice pulling realistic content into her own session.
- **Content to write**: brief framing (what these files are for, how to use
  them in her own Claude Code chat).
- **Lab**: `type: "download"`, one entry per file WP09 created under
  `content/mock-use-cases/` (confirm the actual filenames WP09 used — check
  its Activity Log rather than guessing).
- **Files**: `js/data/modules/07-mock-use-cases.js`
- **Parallel?**: [P] (after WP09 lands)

### Subtask T037 – Author Module 8: Prompting 201 (FR-014, FR-015)

- **Purpose**: Front-loading context, output format, drafts, explicit
  process commands, fresh-thread/memory hygiene.
- **Content to write**: all five techniques listed in FR-014, each with a
  concrete example (especially the exact phrase pattern "do not change
  files yet, propose a short plan and wait for my ok" — use it verbatim
  somewhere as a copy-worthy example).
- **Labs**: two lab entries — `type: "quiz"` (graded, "which prompt
  front-loads context correctly?") and a second `type: "prompt-builder"`
  entry with `purposeKey: "prompting-201-rewrite"` for the "rewrite this
  weak prompt" exercise (must NOT reuse `"prompting-101"`'s key — see
  WP04's T020).
- **Files**: `js/data/modules/08-prompting-201.js`
- **Parallel?**: [P]

### Subtask T038 – Author Module 9: Claude Code vs. Gemini (FR-016)

- **Purpose**: When to reach for which tool.
- **Content to write**: a comparison covering strengths/typical use cases
  of each, completable without an account for either.
- **Lab**: `type: "match"`, "which tool for this task?" mini-quiz (3-5
  scenarios).
- **Files**: `js/data/modules/09-claude-vs-gemini.js`
- **Parallel?**: [P]

### Subtask T039 – Author Module 10: Automate a Task (FR-017)

- **Purpose**: One worked example, then her own attempt.
- **Content to write**: a complete, realistic worked example of directing
  an AI assistant to automate a repetitive task (e.g. "rename a batch of
  files consistently," "turn a list into a formatted table") — walk through
  the actual prompt and what a good response looks like.
- **Lab**: `type: "prompt-builder"`, `purposeKey: "automate-a-task"`.
- **Files**: `js/data/modules/10-automate-a-task.js`
- **Parallel?**: [P]

### Subtask T040 – Author Module 11: .md Files & Habits (FR-018)

- **Purpose**: What Markdown is, why AI tooling favors it, habit-building.
- **Content to write**: explain plain text, structure, and diffability as
  reasons AI tooling favors `.md`; connect to the habit of writing README
  files and context/memory files (tie back to Module 3's safety habit and
  Module 4's repo literacy — this module is the synthesis point).
- **Lab**: `type: "prompt-builder"`, `purposeKey: "readme-exercise"` — a
  guided "write a README.md for X" exercise (seed the `task`/`format`
  fields with a concrete starting scenario, e.g. "X = a small personal
  budgeting spreadsheet project").
- **Files**: `js/data/modules/11-md-files-habits.js`
- **Parallel?**: [P]

### Subtask T041 – Author Module 12: Graduation (FR-019, C-002, C-007)

- **Purpose**: The deliberately lean handoff — see the warning in
  Objectives above before writing this.
- **Content to write**: 2-3 sentences framing the goal ("now that you know
  all this, build something real — a working Gemini Enterprise bot for a
  task you actually want automated: a minutes-maker, under any name you
  choose"), and explicit instructions to continue in her own real Claude
  Code session from here.
- **Lab**: `type: "download"`, exactly two entries: `{label: "Best
  practices: building a Gemini agent repo", path:
  "docs/reference/gemini-agent-repo-blueprint.md"}` and `{label: "Worked
  example: Minutes Milo", path:
  "docs/reference/example-agent-minutes-milo.md"}`. **Do not add a third
  entry.**
- **Files**: `js/data/modules/12-graduation.js`
- **Parallel?**: [P]

### Subtask T042 – Create js/data/modules/index.js aggregator

- **Purpose**: Wire all 12 modules into the running app for the first time.
- **Steps**:
  1. Import all 12 module files (six from WP07, six from this WP) and
     export them as a single array, ordered by `order` field (1-12).
  2. Update `js/views/landing-view.js` (WP02) and `js/views/module-view.js`
     (WP03) to import the module list from this file instead of their
     placeholder/stub lists — this is a small, targeted edit to those two
     files' import statements, not a rewrite. If those files' stub logic
     needs more than an import swap to work with real data, note the
     discrepancy in this WP's Activity Log rather than silently
     restructuring WP02/WP03's ownership.
- **Files**: `js/data/modules/index.js` (new); small edits to
  `js/views/landing-view.js` and `js/views/module-view.js` (out-of-map
  edit — narrow, justified: swapping a stub import for the real one is the
  whole point of this subtask; record the one-line rationale in the
  Activity Log per the ownership rules in the tasks-phase instructions).
- **Parallel?**: No — depends on T036-T041 (all 12 files must exist).

## Risks & Mitigations

- **Risk (the main one for this WP)**: Module 12 scope creep back toward
  hand-holding. **Mitigation**: C-007 exists specifically to prevent this;
  treat "exactly two downloads, no worksheet" as a hard constraint to
  verify in review, not a suggestion.
- **Risk**: `index.js` touching WP02/WP03's files causes a real ownership
  conflict if those WPs are still in flight. **Mitigation**: this WP
  depends on WP07 only in its frontmatter, but its T042 subtask implicitly
  needs WP02 and WP03 to be done too (their files must exist to edit) —
  confirm both are merged before starting T042; if not, flag it rather than
  guessing at files that might still be in progress.

## Review Guidance

- Count Module 12's downloads: must be exactly two, matching the paths
  above verbatim.
- Confirm `purposeKey` values across all prompt-builder labs in this WP are
  distinct from each other and from WP07's Module 6 (`"prompting-101"`,
  `"prompting-201-rewrite"`, `"automate-a-task"`, `"readme-exercise"` — four
  distinct keys, matching FR-012's requirement that all four preserve
  independent drafts).
- Load the full app end to end after this WP and confirm all 12 modules
  appear on the landing view in order.

## Activity Log

**Initial entry**:

- 2026-09-03T14:08:39Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP08 --to <status>` to change WP status.
