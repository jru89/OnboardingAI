# Feature Specification: Safety & Judgment Curriculum Additions

**Mission**: safety-judgment-additions-01M1P0ZS
**Mission Type**: software-dev
**Status**: Draft

## Purpose

Adds safety, verification, and recovery content across 7 of the existing 12
modules of the Claude Code Onboarding Lab, so the course teaches working
safely and independently with an AI assistant, not just how to prompt one
well.

The course currently teaches structuring a good prompt (Modules 6, 8),
copying it into a real session (Module 7), and building a real project
unaided (Module 12) -- but nothing in it currently teaches what to do when
the AI takes an action worth pausing over, produces output that looks right
but isn't, or gets something wrong. Two independent reviews of the finished
course, conducted separately, converged on this exact gap without
coordinating with each other. This mission closes it entirely within the
existing 12-module structure: no new modules, no reordering, no change to
any module's id/order/purposeKey (real learner progress in localStorage
already keys off those values), and no new lab engine -- every new
interaction reuses one of the six lab engines the app already has.

## User Scenarios & Testing

### Primary User Story

A learner partway through the course reaches Module 8 (Prompting 201) and
hits a new graded lab: she's shown a short source document and an AI
assistant's summary of it that quietly changed a date, invented a task
nobody assigned, and altered a number. She has to identify what's wrong
before moving on -- directly practicing the module's own "treat the first
reply as a draft" lesson instead of only reading about it.

### Acceptance Scenarios

1. **Given** the learner is on Module 1 (Get Oriented), **when** she reads
   the new "Claude can do more than answer you" section and reaches the new
   "Would you allow this?" lab, **then** she is shown five fictional
   permission requests one at a time (or as a set) and, for each, can choose
   Allow / Don't allow / Not sure -- inspect first and immediately see an
   explanation of the right call.
2. **Given** the learner is on Module 3 (Data Safety), **when** she reads
   the broadened content, **then** she sees the two new categories
   (proprietary/internal company information; a wider range of personal
   data), the "when in doubt, don't paste" rule, one example of data that
   is safe to paste, and a closing section on when the better call is not
   to use AI at all.
3. **Given** the learner is on Module 4 (Repos), **when** she reads the new
   section, **then** she sees a concrete before/after example of a project
   changing and two reflection questions about which changes to inspect --
   presented as reading content, not a graded interaction.
4. **Given** the learner is on Module 6 (Prompting 101), **when** she
   reaches the new "A good prompt doesn't guarantee a good answer" section,
   **then** she sees the "AI output is a draft until you've checked it"
   rule and an explicit link back to it from Module 8's existing "treat the
   first reply as a draft" material.
5. **Given** the learner is on Module 8 (Prompting 201), **when** she
   reaches the new "Verification checklist" section and then the new
   "Can you spot what's wrong?" lab, **then** she can submit her answer and
   immediately see which planted inaccuracies (wrong date, invented task,
   wrong number) she caught, her score, and can retry.
6. **Given** the learner is on Module 11 (.md Files & Habits), **when** she
   reads the new "What to do when Claude gets it wrong" section and reaches
   the new "Something went wrong" lab, **then** she picks from a short set
   of possible next responses to an unexpected AI mistake and sees
   immediate feedback on which response models the diagnose-before-fixing
   habit and why.
7. **Given** the learner reaches Module 12 (Graduation), **when** she views
   the module, **then** she sees a short "Before you start" readiness
   self-check (plain reading content, not a graded checklist) above the
   existing two downloads, and can reach the downloads without completing
   or interacting with the self-check.

### Edge Cases

- A learner who has already completed Module 8 or Module 11 before this
  mission ships (i.e., her `moduleStatus` is already `"done"` in
  localStorage) opens the module again after the update: the new lab must
  render and be completable, and the module's `evaluateModuleStatus` logic
  must correctly re-evaluate completion once the new lab is also finished,
  not treat the module as already fully done from stale state.
- A learner who has never opened Module 1 encounters the new "Would you
  allow this?" lab as her very first interactive exercise in the app: the
  instructions must stand alone without assuming she has done any other
  module first.
- Very narrow viewport (360px): the new before/after example (Module 4) and
  any new tables or multi-line lab prompts must remain readable, matching
  the rest of the app's existing responsive behavior.

## Requirements

### Functional Requirements

| ID | Requirement | Status |
|---|---|---|
| FR-001 | Module 1 (Get Oriented) SHALL add a reading section, "Claude can do more than answer you," covering that Claude Code can read, create, and modify files and run commands, that some of those actions require permission, and that a permission prompt is a moment to stop and understand what is being asked before approving. | Draft |
| FR-002 | Module 1 SHALL add a new lab, "Would you allow this?", presenting five fictional permission requests (read a file, edit a file, delete a file, run a command, access a folder outside the project) where the learner chooses Allow / Don't allow / Not sure -- inspect first for each, with an explanation shown after each choice, reusing an existing lab engine. | Draft |
| FR-003 | Module 3 (Data Safety) SHALL broaden its existing four unsafe-data categories with two additional categories -- proprietary/internal company documents and strategy, and a wider range of personal data (employee information, financial account numbers, health-related information) -- plus a "when in doubt, don't paste -- use placeholders" rule and one contrasting example of data that is safe to paste (public or anonymized). | Draft |
| FR-004 | Module 3 SHALL add a closing reading section, "Sometimes the right answer is: don't use AI at all," giving concrete situations where choosing not to use an AI assistant is the better judgment call. | Draft |
| FR-005 | Module 4 (Repos) SHALL add a reading section giving a before/after mental model for reviewing an AI assistant's changes to a project, with a concrete before/after example and reflection questions embedded in the prose, presented as reading content rather than a graded interaction. | Draft |
| FR-006 | Module 6 (Prompting 101) SHALL add a reading section, "A good prompt doesn't guarantee a good answer," covering that Claude Code can misunderstand, assume, or invent information, that a detailed answer is not necessarily a correct one, and introducing the rule "AI output is a draft until you've checked it," explicitly cross-referencing Module 8's existing "treat the first reply as a draft" material. | Draft |
| FR-007 | Module 8 (Prompting 201) SHALL add a reading section, "Verification checklist," presenting six short self-check questions for judging AI output (did it answer the actual question; did it use the given information correctly; did it invent anything; did it change any numbers, names, dates, or facts; does the result make sense; how could it be independently verified if it matters), framed as a second set of course-wide rules alongside Module 6's existing golden rules. | Draft |
| FR-008 | Module 8 SHALL add a new graded lab, "Can you spot what's wrong?", presenting a short source document and a fabricated AI summary of it that changes a date, invents a task or responsibility, and changes a number, requiring the learner to identify the inaccuracies, reusing the existing spot-mistake lab engine with immediate feedback and unlimited retries. | Draft |
| FR-009 | Module 11 (.md Files & Habits) SHALL add a reading section, "What to do when Claude gets it wrong," teaching a short recovery workflow (stop; explain what was expected instead; show the actual wrong output; ask it to diagnose before changing anything; ask for a plan; review the plan; confirm the fix worked), plus a short note establishing one plain rule: before a significant change, make sure there is a way to get back to where things were. | Draft |
| FR-010 | Module 11 SHALL add a new lab, "Something went wrong," presenting a scenario where an AI assistant made an unexpected change and asking the learner to choose the best next response among a few unhelpful options and one option that models the diagnose-before-fixing habit, reusing an existing lab engine with immediate feedback. | Draft |
| FR-011 | Module 12 (Graduation) SHALL add a short "Before you start" readiness self-check -- a plain list of self-check statements followed by a one-line affirmation -- presented as static reading content, not as a graded checklist-lab or scripted worksheet, and SHALL NOT block or gate access to the module's existing two downloads. | Draft |

### Non-Functional Requirements

| ID | Requirement | Status |
|---|---|---|
| NFR-001 | Every term newly introduced by this mission's content SHALL be defined inline or via the app's existing glossary-term mechanism on first use, so a reader with no prior technical vocabulary can follow along (mirrors the original mission's NFR-003). | Draft |
| NFR-002 | All new content and labs SHALL remain usable, with no broken layout or clipped/unreadable content, at viewport widths from 360px up through desktop widths (mirrors the original mission's NFR-002). | Draft |
| NFR-003 | All new content SHALL visually match the existing dark "Visual Novel" design system already used throughout the app -- no new colors, fonts, or component patterns introduced. | Draft |

### Constraints

| ID | Constraint | Status |
|---|---|---|
| C-001 | This mission SHALL NOT introduce any new module, and SHALL NOT change the id, order, or purposeKey of any of the 12 existing modules or their existing labs, since real learner progress in localStorage already keys off these values. | Draft |
| C-002 | This mission SHALL NOT introduce a new lab engine type; every new interactive lab SHALL reuse one of the six existing lab engines (checklist, quiz, spot-mistake, match, download, prompt-builder). | Draft |
| C-003 | This mission SHALL NOT introduce a build step, framework, backend, or automated test framework, consistent with the project's existing static-site, no-build-step, manual-verification-only architecture (see the original mission's Technical Context / DR-001). | Draft |
| C-004 | Module 12's new readiness addition SHALL remain a non-blocking, ungraded self-check presented as reading content, not a checklist-lab, so it does not reintroduce the scripted hand-holding that module's original design constraint (C-007 in the prior mission's spec) deliberately avoided. | Draft |

## Key Entities

- **Module** (existing entity, unchanged shape): 7 of the 12 existing module
  objects gain additional `content` sections; 2 of them (Modules 8 and 11)
  also gain one additional entry in `labs`.
- **Lab** (existing entity, unchanged shape): two new lab instances are
  added, each reusing an existing `type` (no new lab type is introduced).
- **Progress record** (existing entity, unchanged shape): no new fields;
  the two new labs are tracked the same way existing labs of their type
  already are.

## Success Criteria

| ID | Criterion |
|---|---|
| SC-001 | After completing Module 1's new lab, a learner presented with a permission request she has not seen before can correctly judge whether to allow it, deny it, or investigate first. |
| SC-002 | After completing Module 8's new lab, a learner can identify all three planted inaccuracies (the changed date, the invented task, and the changed number) in the fabricated AI summary. |
| SC-003 | After completing Module 11's new lab, when shown a fresh unexpected-mistake scenario, a learner selects a response that asks the AI to diagnose the issue before requesting further changes, rather than a vague repeat-the-request response. |
| SC-004 | Module 12's readiness addition adds no more than a few seconds of reading time and does not block or gate reaching the module's two existing downloads. |
| SC-005 | All new content and labs render correctly, with no layout regressions, at both 360px and desktop viewport widths. |

## Assumptions

- This mission builds entirely on top of the already-merged, already-live
  12-module app; module content files, lab engines, progress persistence,
  and the design system are treated as fixed, reusable infrastructure that
  this mission extends, not redesigns.
- The two external reviews that motivated this mission are treated as
  directionally correct; this mission does not re-litigate whether the
  identified gap is real, only how to close it within the existing
  architecture and content style.
- Module 12's original C-007 decision (documented in the prior mission's
  `spec.md` and in that module's own file header comment) remains binding;
  the new readiness addition is designed to satisfy that same constraint,
  not to override it.
- No new npm/build tooling, and no automated test suite, is introduced;
  verification for this mission is manual, via the browser preview tools,
  matching the original mission's approach.
