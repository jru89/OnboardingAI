# Implementation Plan: Safety & Judgment Curriculum Additions

**Branch**: `feat/safety-judgment-additions` | **Date**: 2026-09-04 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `kitty-specs/safety-judgment-additions-01M1P0ZS/spec.md`

## Summary

Adds reading content to 7 of the 12 existing modules and two new graded labs
(Modules 8 and 11), so the course also teaches reviewing an AI assistant's
changes, catching wrong or fabricated output, and recovering from a mistake
-- not just how to prompt one well. Almost entirely content authoring within
the app's existing data-driven module/lab architecture. The one code change
is a small, backward-compatible addition to the existing `quiz-lab.js`
engine (an optional per-question `explanation` field), which lets all three
new interactive exercises (Module 1, Module 8, Module 11) reuse that one
engine with real per-answer explanations instead of generic correct/
incorrect text -- avoiding both a new lab engine and reuse of
`spot-mistake-lab.js`, whose "Safe"/"Unsafe" button labels and "Spot the
Mistake" heading are hardcoded in JS and would be the wrong words for
judging a permission request or a summary's factual accuracy.

## Technical Context

**Language/Version**: JavaScript (ES2022, native ES modules), HTML5, CSS3 -- no TypeScript, no build/transpile step. Matches the existing app exactly; this mission introduces no new language or tooling.
**Primary Dependencies**: None (no framework, no npm dependencies at runtime). Dev-only: the same static file server already used for local preview (`python -m http.server`).
**Storage**: Browser `localStorage` only, via the app's existing `js/lib/progress.js`. No new storage keys or schema fields -- the two new labs are tracked using the exact same `labState[lab.id]` shape (`{lastScore, attempts, completed}`) their reused engine already writes for Module 8's existing quiz.
**Testing**: Manual verification via the browser preview workflow (load each touched module, exercise its new content/lab, check localStorage persistence and console for errors) -- no automated test framework, consistent with the project's existing DR-001 decision and this mission's own C-003.
**Target Platform**: Any modern evergreen browser (Chrome/Edge/Safari/Firefox), desktop and mobile, per this mission's NFR-002 (360px+) -- unchanged from the existing app.
**Project Type**: Single static site (no frontend/backend split -- there is no backend). This mission touches only existing files; no new top-level directories.
**Performance Goals**: No new performance surface -- this mission adds text and lab config to files the app already loads; it does not add new network requests, precached files, or runtime dependencies.
**Constraints**: See spec.md's Constraints table (C-001 through C-004) -- no new module, no id/order/purposeKey changes, no new lab engine type, no build step, no test framework, Module 12's addition stays a non-blocking self-check.
**Scale/Scope**: 7 of 12 existing module files gain new `content` entries; 2 of them (Modules 8, 11) also gain one new `labs` entry each; 1 existing lab engine file (`quiz-lab.js`) gains one small backward-compatible addition. No new files except this mission's own planning artifacts.

## Charter Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

A project charter now exists (`.kittify/charter/charter.md`, added since the
original mission). The directives it surfaces for planning --
`DIRECTIVE_003` (Decision Documentation), `DIRECTIVE_010` (Specification
Fidelity), `DIRECTIVE_024` (Locality of Change), `DIRECTIVE_025` (Boy Scout
Rule), `DIRECTIVE_028` (Efficient Local Tooling), `DIRECTIVE_033` (Targeted
Staging Policy) -- are all satisfied by this plan's approach: every change
maps directly to one of spec.md's FR-### rows (traceability/fidelity), the
one code change (`quiz-lab.js`) is small, additive, and confined to the file
it needs to touch (locality), and no unrelated cleanup or refactor is bundled
in. No charter conflicts identified.

## Project Structure

### Documentation (this mission)

```
kitty-specs/safety-judgment-additions-01M1P0ZS/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── contracts/             # Phase 1 output (the one engine contract change)
└── tasks/                 # Phase 2 output (/spec-kitty.tasks -- not created by this command)
```

### Source Code (repository root)

```
claude-code-onboarding-lab/
├── js/
│   ├── data/
│   │   └── modules/
│   │       ├── 01-get-oriented.js       # + "Claude can do more than answer you" section, + "Would you allow this?" lab
│   │       ├── 03-data-safety.js        # + 2 broadened categories, + "when in doubt" rule, + safe-example, + "when not to use AI" section
│   │       ├── 04-repos.js              # + before/after change-review section
│   │       ├── 06-prompting-101.js      # + "a good prompt doesn't guarantee a good answer" section
│   │       ├── 08-prompting-201.js      # + "verification checklist" section, + "can you spot what's wrong?" lab
│   │       ├── 11-md-files-habits.js    # + "what to do when Claude gets it wrong" section, + "something went wrong" lab
│   │       └── 12-graduation.js         # + "before you start" readiness self-check (content-only)
│   └── views/
│       └── labs/
│           └── quiz-lab.js              # + optional per-item `explanation` field, rendered in feedback (backward-compatible)
└── kitty-specs/safety-judgment-additions-01M1P0ZS/   # this mission's own planning artifacts
```

**Structure Decision**: No new directories or files beyond this mission's own
`kitty-specs/` folder. Every change lands inside the existing module-data /
lab-engine structure the original mission already established; this mission
extends that structure rather than introducing a parallel one.

## Complexity Tracking

*No Charter Check violations -- N/A.*

## Implementation Concern Map

> Implementation concerns are NOT work packages. `/spec-kitty.tasks`
> translates these into executable WPs; boundaries below are for
> architectural clarity, not a task list.

### IC-01 — `quiz-lab.js` explanation-field enhancement

- **Purpose**: Add an optional per-question `explanation` string to the existing quiz engine's config shape, rendered after submit alongside the existing correct/incorrect text. Absent for Module 8's existing quiz items, so that quiz's rendered output is byte-for-byte unchanged.
- **Relevant requirements**: FR-002, FR-008, FR-010 (all three depend on this engine capability existing first)
- **Affected surfaces**: `js/views/labs/quiz-lab.js` only
- **Sequencing/depends-on**: none (foundation for IC-03, IC-06, IC-07)
- **Risks**: Must confirm Module 8's existing quiz lab config (no `explanation` field present) still renders identically after this change -- a quick manual check, not just "the code compiles."

### IC-02 — Module 1 additions (Get Oriented)

- **Purpose**: Teach that Claude Code can take real actions, not just answer questions, and that a permission prompt is a moment to pause and understand -- reinforced by a judgment-practice lab.
- **Relevant requirements**: FR-001, FR-002
- **Affected surfaces**: `js/data/modules/01-get-oriented.js`
- **Sequencing/depends-on**: IC-01 (the new lab uses the enhanced quiz engine)
- **Risks**: This becomes the learner's very first interactive exercise in the app if she does modules in order -- instructions must stand alone without assuming she's completed anything else yet.

### IC-03 — Module 3 additions (Data Safety)

- **Purpose**: Broaden the existing four unsafe-data categories and add judgment about when not to use AI at all.
- **Relevant requirements**: FR-003, FR-004
- **Affected surfaces**: `js/data/modules/03-data-safety.js`
- **Sequencing/depends-on**: none
- **Risks**: Content-only; low risk. Keep new categories/examples as concrete and concise as the four existing ones (each currently ~1 short paragraph) rather than letting the module balloon.

### IC-04 — Module 4 addition (Repos)

- **Purpose**: Give a light before/after mental model for reviewing an AI assistant's changes to a project.
- **Relevant requirements**: FR-005
- **Affected surfaces**: `js/data/modules/04-repos.js`
- **Sequencing/depends-on**: none
- **Risks**: Content-only. Keep the before/after example small enough to read at a glance (matching the module's existing folder-tree diagram's scale), not a sprawling file tree.

### IC-05 — Module 6 addition (Prompting 101)

- **Purpose**: Establish that a good prompt doesn't guarantee a correct answer, cross-referencing Module 8's existing "treat the first reply as a draft" material.
- **Relevant requirements**: FR-006
- **Affected surfaces**: `js/data/modules/06-prompting-101.js`
- **Sequencing/depends-on**: none
- **Risks**: Content-only, lowest risk in this mission.

### IC-06 — Module 8 additions (Prompting 201)

- **Purpose**: Teach a verification checklist and give the learner hands-on practice catching fabricated/altered AI output.
- **Relevant requirements**: FR-007, FR-008
- **Affected surfaces**: `js/data/modules/08-prompting-201.js`
- **Sequencing/depends-on**: IC-01 (the new lab uses the enhanced quiz engine)
- **Risks**: The reframing from "identify what's wrong in one summary" (spec's descriptive framing) to "judge each of several claims as Accurate/Inaccurate" (the shape the quiz engine actually supports) must still land the same lesson -- verify the planted errors (wrong date, invented task, wrong number) are each independently identifiable as their own claim/question.

### IC-07 — Module 11 additions (.md Files & Habits)

- **Purpose**: Teach a short recovery workflow for when an AI assistant gets something wrong, plus a plain "keep a way back" rule, reinforced by a lab practicing the diagnose-before-fixing habit.
- **Relevant requirements**: FR-009, FR-010
- **Affected surfaces**: `js/data/modules/11-md-files-habits.js`
- **Sequencing/depends-on**: IC-01 (the new lab uses the enhanced quiz engine)
- **Risks**: This module already covers Markdown and habit-building; keep the new section clearly separated (its own heading) so it doesn't read as continuous with the Markdown material.

### IC-08 — Module 12 addition (Graduation)

- **Purpose**: A short, non-blocking readiness self-check before the module's existing two downloads.
- **Relevant requirements**: FR-011
- **Affected surfaces**: `js/data/modules/12-graduation.js`
- **Sequencing/depends-on**: none
- **Risks**: Highest-care item despite being content-only: this module has an explicit prior constraint (C-007 in the original mission, carried forward as C-004 here) against re-hand-holding. Must land as plain reading content the learner can silently self-assess, never a graded checklist-lab, and must not block or gate the existing downloads.
