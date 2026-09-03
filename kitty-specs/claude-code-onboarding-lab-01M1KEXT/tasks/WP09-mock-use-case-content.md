---
work_package_id: WP09
title: Mock Use-Case Content Files
dependencies: []
requirement_refs:
- FR-013
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
subtasks:
- T043
- T044
- T045
- T046
phase: Phase 3 - Content
assignee: ''
agent: "claude:sonnet-5:frontend-freddy:reviewer"
shell_pid: "28464"
history:
- at: '2026-09-03T14:08:39Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: content/mock-use-cases/
create_intent:
- content/mock-use-cases/draft-a-client-email.md
- content/mock-use-cases/summarize-a-meeting.md
- content/mock-use-cases/plan-a-spreadsheet-cleanup.md
- content/mock-use-cases/write-a-project-update.md
execution_mode: code_change
model: ''
owned_files:
- content/mock-use-cases/*.md
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP09 – Mock Use-Case Content Files

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Real, downloadable, realistic mock-scenario `.md` files for Module 7 —
this is pure content authoring, independent of any app code, and can start
immediately. On completion:

- At least 3 (target 4) `.md` files exist under `content/mock-use-cases/`,
  each a self-contained, realistic scenario the learner could genuinely
  download and paste/upload into her own Claude Code session to practice
  on (FR-013).
- Each file contains **no real personal or client data** — invented,
  clearly fictional names/companies/numbers only.
- Each file is written so a first-time, non-technical user immediately
  understands what it's for and what she might ask an AI assistant to do
  with it.

## Context & Constraints

- Read [`spec.md`](../spec.md) FR-013 and the mock-use-case examples named
  during the specify-phase conversation: "draft a client email,"
  "summarize a meeting," "plan a spreadsheet cleanup."
- No app-code dependency — this WP has no upstream dependency and can run
  in parallel with anything.
- Downstream: WP08's Module 7 (T036) will reference these exact filenames
  in its `download` lab config — pick clear, stable, kebab-case filenames
  now and record them in this WP's Activity Log so WP08 doesn't have to
  guess.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab

## Subtasks & Detailed Guidance

### Subtask T043 – Author mock use-case #1: draft a client email

- **Purpose**: Practice a common, low-stakes writing task.
- **Content**: a short brief (2-3 fictional bullet points: who the client
  is, what's changed, what tone is needed) that a learner could hand to
  Claude with a request like "draft a short update email to this client."
- **Files**: `content/mock-use-cases/draft-a-client-email.md`
- **Parallel?**: [P]

### Subtask T044 – Author mock use-case #2: summarize a meeting

- **Purpose**: Practice turning raw notes into a structured summary.
- **Content**: a short, invented meeting-notes excerpt (a few
  fictional attendees, a couple of discussion points, one action item with
  no clearly stated owner — deliberately, so it's a good test case for
  "ask rather than guess" prompting habits taught in the course).
- **Files**: `content/mock-use-cases/summarize-a-meeting.md`
- **Parallel?**: [P]

### Subtask T045 – Author mock use-case #3: plan a spreadsheet cleanup

- **Purpose**: Practice a structuring/planning task, not just prose.
- **Content**: a short description of a messy, fictional spreadsheet
  (inconsistent columns, some blank rows, mixed date formats) and what
  "cleaned up" should look like, as material for asking Claude to propose
  a cleanup plan.
- **Files**: `content/mock-use-cases/plan-a-spreadsheet-cleanup.md`
- **Parallel?**: [P]

### Subtask T046 – Author mock use-case #4 (optional stretch): write a project update

- **Purpose**: A fourth scenario for variety, beyond the spec's ">= 3"
  minimum.
- **Content**: a short set of fictional project-status bullet points to
  turn into a brief written update for a stakeholder.
- **Files**: `content/mock-use-cases/write-a-project-update.md`
- **Parallel?**: [P] — genuinely optional; if time-constrained, the first
  three subtasks alone satisfy FR-013.

## Risks & Mitigations

- **Risk**: Accidentally realistic-looking data (a real company name, a
  plausible real email address) gets mistaken for genuine. **Mitigation**:
  use obviously fictional placeholders (`Acme Fictional Co.`, `jane.doe@
  example.invalid`) throughout.

## Review Guidance

- Open each file and confirm it reads as a complete, usable scenario, not
  a stub.
- Confirm no real personal/client data anywhere.
- Confirm filenames match what this WP's Activity Log records (WP08 will
  depend on exact filename accuracy).

## Activity Log

**Initial entry**:

- 2026-09-03T14:08:39Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP09 --to <status>` to change WP status.
- 2026-09-03T15:06:10Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=19024 – Assigned agent via action command
- 2026-09-03T15:09:21Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=19024 – Ready for review
- 2026-09-03T15:09:48Z – claude:sonnet-5:frontend-freddy:reviewer – shell_pid=28464 – Started review via action command
- 2026-09-03T15:10:51Z – user – shell_pid=28464 – Review passed: all 4 mock-use-case files are complete, self-contained, fictional-only content matching FR-013, with summarize-a-meeting.md correctly containing an unowned action item for ask-not-guess practice; diff scope clean.
