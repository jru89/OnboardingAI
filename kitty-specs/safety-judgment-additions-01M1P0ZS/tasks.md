# Tasks: Safety & Judgment Curriculum Additions

**Input**: [plan.md](plan.md), [spec.md](spec.md), [data-model.md](data-model.md), [contracts/](contracts/), [research.md](research.md), [quickstart.md](quickstart.md)
**Prerequisites**: plan.md complete (Implementation Concern Map IC-01..IC-08)

23 subtasks (T001-T023) rolled into 7 work packages. WP01 (the `quiz-lab.js`
explanation-field enhancement, plus a `module-view.js` fix added below) is
the one shared dependency: WP02, WP05, and WP06 each add a new lab that
relies on it. WP03, WP04, and WP07 are pure content additions to files
nothing else in this mission touches, so they have no dependencies and can
run fully in parallel with WP01 and each other.

**Remediation applied after `/spec-kitty.analyze`** (report:
[analysis-report.md](analysis-report.md), verdict `blocked` — 1 high, 2
medium):

- **C1 (high)**: added T023 to WP01 — `evaluateModuleStatus()` in
  `js/views/module-view.js` early-exits once a module is `"done"` and
  never re-checks, so Modules 1/8/11 would show a permanently stale
  "done" badge for a learner who completed them before this mission
  shipped. WP01 now also owns `js/views/module-view.js`.
- **C2 (medium)**: added an explicit 360px-width check to the final
  verification subtask of WP02, WP03, WP05, WP06, and WP07 (WP04 already
  had one).
- **C3 (medium)**: added an explicit "no undefined jargon" check to the
  final verification subtask of every content-authoring WP (WP02–WP07).

## Subtask Index

| ID | Description | WP | Parallel |
|---|---|---|---|
| T001 | Add optional `explanation` field to quiz-lab.js's config item shape + render it in submit feedback | WP01 | |
| T002 | Verify Module 8's existing quiz lab renders/behaves identically before and after the change | WP01 | |
| T003 | Manual browser verification of the new field with a temporary test config | WP01 | |
| T023 | Fix `evaluateModuleStatus` to re-evaluate past "done" (analyze finding C1) | WP01 | |
| T004 | Author "Claude can do more than answer you" content section (Module 1) | WP02 | [P] |
| T005 | Author `module-1-permission-check` quiz lab config (5 items) | WP02 | |
| T006 | Wire the new lab into Module 1's `labs` array | WP02 | |
| T007 | Manual browser verification of Module 1's new section and lab | WP02 | |
| T008 | Author Module 3's two new categories + "when in doubt" rule + safe-example contrast | WP03 | [P] |
| T009 | Author Module 3's closing "don't use AI at all" section | WP03 | [P] |
| T010 | Manual browser verification of Module 3's new content | WP03 | |
| T011 | Author Module 4's "How do I know what changed?" section | WP04 | [D] |
| T012 | Author Module 6's "A good prompt doesn't guarantee a good answer" section | WP04 | [D] |
| T013 | Manual browser verification of both new sections (Modules 4 and 6) | WP04 | | [D] |
| T014 | Author Module 8's "Verification checklist" section + lab source-facts intro | WP05 | [P] |
| T015 | Author `module-8-verification` quiz lab config (3 items) | WP05 | |
| T016 | Manual browser verification of Module 8's new section and lab | WP05 | |
| T017 | Author Module 11's "What to do when Claude gets it wrong" section | WP06 | [P] |
| T018 | Author `module-11-recovery` quiz lab config (1 item, 4 options) | WP06 | |
| T019 | Manual browser verification of Module 11's new section and lab | WP06 | |
| T020 | Author Module 12's "Before you start" readiness self-check (plain content) | WP07 | [D] |
| T021 | Verify the self-check has no lab-engine, no persisted/graded state, no gating of the existing downloads | WP07 | | [D] |
| T022 | Manual browser verification of Module 12's new content and both existing downloads | WP07 | | [D] |

## Work Packages

### WP01 — Quiz Lab Engine: Explanation Field + Module-Status Fix

- **Summary**: Add an optional per-question `explanation` field to `quiz-lab.js`'s config shape, rendered after submit alongside the existing correct/incorrect text; plus (added post-analyze, T023) fix `evaluateModuleStatus()` in `module-view.js` so Modules 1/8/11 don't show a stale "done" badge for a learner who completed them before this mission's new labs shipped. The one shared foundation WP02/WP05/WP06 depend on.
- **Priority**: P0 (blocks WP02, WP05, WP06)
- **Independent test**: A quiz item with an `explanation` field shows that text after submit, for both a correct and an incorrect answer; Module 8's existing quiz (no `explanation` fields) renders identically to before this change; a module manually put into a "done" state with an incomplete lab set re-evaluates to "in_progress" on next save/reload.
- **Estimated size**: 4 subtasks, ~280 lines
- **Dependencies**: none
- **Subtasks**: T001, T002, T003, T023
- **Prompt file**: [tasks/WP01-quiz-lab-explanation-field.md](tasks/WP01-quiz-lab-explanation-field.md)

### WP02 — Module 1: Permission Judgment

- **Summary**: Teaches that Claude Code can take real actions, not just answer questions, and gives hands-on practice judging fictional permission requests.
- **Priority**: P1
- **Independent test**: Module 1 shows the new reading section before its existing content; the new lab presents 5 questions, each with 3 options and an explanation shown after answering.
- **Estimated size**: 4 subtasks, ~250 lines
- **Dependencies**: WP01
- **Subtasks**: T004, T005, T006, T007
- **Prompt file**: [tasks/WP02-module-1-permission-judgment.md](tasks/WP02-module-1-permission-judgment.md)

### WP03 — Module 3: Data Safety Expansion

- **Summary**: Broadens Data Safety's four existing categories and adds judgment about when not to use AI at all.
- **Priority**: P1
- **Independent test**: Module 3 shows two new unsafe-data categories, a "when in doubt" rule, one safe-example contrast, and a closing "don't use AI at all" section, all in the existing visual style.
- **Estimated size**: 3 subtasks, ~200 lines
- **Dependencies**: none
- **Subtasks**: T008, T009, T010
- **Prompt file**: [tasks/WP03-module-3-data-safety-expansion.md](tasks/WP03-module-3-data-safety-expansion.md)

### WP04 — Modules 4 & 6: Reviewing Changes and Prompt Fallibility

- **Summary**: A before/after mental model for reviewing an AI assistant's changes (Module 4), and the idea that a good prompt doesn't guarantee a correct answer (Module 6).
- **Priority**: P1
- **Independent test**: Both modules show their new section, each cross-referencing where relevant (Module 6 references Module 8's existing "treat the first reply as a draft" material).
- **Estimated size**: 3 subtasks, ~200 lines
- **Dependencies**: none
- **Subtasks**: T011, T012, T013
- **Prompt file**: [tasks/WP04-modules-4-6-content.md](tasks/WP04-modules-4-6-content.md)

### WP05 — Module 8: Verification Checklist & Spot-the-Wrong-Fact Lab

- **Summary**: A verification checklist (a second set of course-wide rules alongside Module 6's golden rules) and a graded lab practicing catching fabricated/altered AI output.
- **Priority**: P1
- **Independent test**: Module 8 shows the new checklist section, then a lab presenting source facts and 3 accuracy-judgment questions; submitting shows a correct explanation for each.
- **Estimated size**: 3 subtasks, ~220 lines
- **Dependencies**: WP01
- **Subtasks**: T014, T015, T016
- **Prompt file**: [tasks/WP05-module-8-verification.md](tasks/WP05-module-8-verification.md)

### WP06 — Module 11: Recovery Workflow & Lab

- **Summary**: A short recovery workflow for when an AI assistant gets something wrong, a "keep a way back" rule, and a lab practicing the diagnose-before-fixing habit.
- **Priority**: P1
- **Independent test**: Module 11 shows the new recovery section, then a lab with 4 response options to an unexpected-mistake scenario; each option shows its explanation after submit.
- **Estimated size**: 3 subtasks, ~200 lines
- **Dependencies**: WP01
- **Subtasks**: T017, T018, T019
- **Prompt file**: [tasks/WP06-module-11-recovery.md](tasks/WP06-module-11-recovery.md)

### WP07 — Module 12: Readiness Self-Check

- **Summary**: A short, non-blocking "Before you start" self-check above Module 12's existing two downloads -- plain reading content, not a graded checklist-lab, preserving the module's prior no-hand-holding constraint.
- **Priority**: P1
- **Independent test**: Module 12 shows the self-check as static content with no interaction affordance, and both existing downloads remain immediately reachable and functional.
- **Estimated size**: 3 subtasks, ~180 lines
- **Dependencies**: none
- **Subtasks**: T020, T021, T022
- **Prompt file**: [tasks/WP07-module-12-readiness.md](tasks/WP07-module-12-readiness.md)

## Parallelization

- **Wave 1 (start immediately)**: WP01, WP03, WP04, WP07 -- four independent lanes, no shared files.
- **Wave 2 (after WP01 lands)**: WP02, WP05, WP06 -- each adds a lab depending on WP01's `explanation` field; independent of each other (different module files).

## MVP Scope

WP01 alone has no learner-visible effect on its own -- the smallest
learner-visible slice is WP01 + any one of WP02/WP05/WP06. There is no
natural way to ship fewer than all 7 WPs partial-credit style, since each
WP closes a distinct, independently-reviewed part of the identified gap;
the mission is scoped to land as one complete batch.
