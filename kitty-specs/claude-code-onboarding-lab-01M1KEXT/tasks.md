# Tasks: Claude Code Onboarding Lab

**Input**: [plan.md](plan.md), [spec.md](spec.md), [data-model.md](data-model.md), [contracts/](contracts/), [research.md](research.md)
**Prerequisites**: plan.md complete (Implementation Concern Map IC-01..IC-08)

58 subtasks (T001-T058) rolled into 12 work packages. One refinement made
during task derivation, not present in plan.md: `js/data/modules.js` is
split into one file per module under `js/data/modules/` (plus an
`index.js` aggregator) so that the two content-authoring work packages
(WP07, WP08) can own disjoint files instead of both writing to one file.

## Subtask Index

| ID | Description | WP | Parallel |
|---|---|---|---|
| T001 | Create index.html app shell + PWA meta/link tags | WP01 | | [D] |
| T002 | Implement hash-based router in js/app.js | WP01 | | [D] |
| T003 | Implement persistent header/nav chrome | WP01 | [D] |
| T004 | Implement base css/style.css (responsive 360px+) | WP01 | [D] |
| T005 | Implement scroll-to-top utility | WP01 | [D] |
| T006 | Keyboard/mouse-only navigability pass | WP01 | | [D] |
| T007 | Implement js/lib/progress.js core (default record, corrupt-data fallback) | WP02 | | [D] |
| T008 | Implement debounced write + onSaved subscription | WP02 | | [D] |
| T009 | Implement setModuleStatus/setLabState/setBuilderDraft/resetProgress | WP02 | | [D] |
| T010 | Build landing-view.js (module list, statuses, overall progress) | WP02 | | [D] |
| T011 | Add reset-progress control with confirmation gate | WP02 | | [D] |
| T012 | Implement module-view.js (content sections + lab mount) | WP03 | | [D] |
| T013 | Implement shared exit-lab/back-to-module affordance | WP03 | | [D] |
| T014 | Implement glossary-term inline rendering support | WP03 | [D] |
| T015 | Implement SVG diagram embedding support | WP03 | [D] |
| T016 | Implement per-module "mark done" completion rule | WP03 | | [D] |
| T017 | Implement js/lib/prompt-builder.js (assemblePrompt, validateFields) | WP04 | | [D] |
| T018 | Implement js/lib/clipboard.js (copy + manual-select fallback) | WP04 | [D] |
| T019 | Implement prompt-builder-lab.js (form UI) | WP04 | | [D] |
| T020 | Implement per-purpose-key draft isolation | WP04 | | [D] |
| T021 | Live preview + required-field hinting polish | WP04 | | [D] |
| T022 | Implement checklist-lab.js | WP05 | [D] |
| T023 | Implement match-lab.js generic engine | WP05 | | [D] |
| T024 | Verify match-lab.js's data shape fits all 4 use cases; adjust/split if not | WP05 | | [D] |
| T025 | Wire checklist/match completion state into progress.js | WP05 | | [D] |
| T026 | Implement spot-mistake-lab.js (graded, retriable) | WP06 | [P] |
| T027 | Implement quiz-lab.js (graded, retriable) | WP06 | [P] |
| T028 | Implement download-lab.js | WP06 | [P] |
| T029 | Wire graded-lab score/attempt state into progress.js | WP06 | |
| T030 | Author Module 1 content + checklist config | WP07 | [P] |
| T031 | Author Module 2 content + match config | WP07 | [P] |
| T032 | Author Module 3 content + spot-mistake config | WP07 | [P] |
| T033 | Author Module 4 content + match config | WP07 | [P] |
| T034 | Author Module 5 content + match config | WP07 | [P] |
| T035 | Author Module 6 content + prompt-builder config | WP07 | [P] |
| T036 | Author Module 7 content + download config | WP08 | [P] |
| T037 | Author Module 8 content + quiz + rewrite-builder config | WP08 | [P] |
| T038 | Author Module 9 content + match config | WP08 | [P] |
| T039 | Author Module 10 content + prompt-builder config | WP08 | [P] |
| T040 | Author Module 11 content + prompt-builder config | WP08 | [P] |
| T041 | Author Module 12 content + download config (graduation) | WP08 | [P] |
| T042 | Create js/data/modules/index.js aggregator | WP08 | |
| T043 | Author mock use-case #1 (.md) | WP09 | [D] |
| T044 | Author mock use-case #2 (.md) | WP09 | [D] |
| T045 | Author mock use-case #3 (.md) | WP09 | [D] |
| T046 | Author mock use-case #4, optional stretch (.md) | WP09 | [D] |
| T047 | Author Module 1 interface SVG diagram | WP10 | [P] |
| T048 | Author Module 4 folder-tree SVG diagram | WP10 | [P] |
| T049 | Author any needed comparison-table graphics (optional) | WP10 | [P] |
| T050 | Wire diagram references into module content | WP10 | |
| T051 | Create manifest.json | WP11 | [P] |
| T052 | Create PWA icon set | WP11 | [P] |
| T053 | Create service-worker.js (precache, offline-first) | WP11 | |
| T054 | Register service worker + verify install prompt | WP11 | |
| T055 | Run quickstart.md manual verification checklist end-to-end | WP12 | |
| T056 | Cross-browser/responsive check at 360px | WP12 | [P] |
| T057 | Offline verification pass | WP12 | [P] |
| T058 | README deployment section + GitHub Pages readiness check | WP12 | [P] |

## Work Packages

### WP01 — App Shell, Router & Nav Chrome

- **Summary**: Foundational app shell: `index.html`, the hash router, persistent header/nav, base responsive CSS, and shell-level accessibility.
- **Priority**: P0 (foundation — nothing else mounts without it)
- **Independent test**: Open the app; landing route renders inside the shell with header visible; navigating a hash route swaps the `<main>` content without a full reload.
- **Estimated size**: ~6 subtasks, ~350 lines
- **Dependencies**: none
- **Subtasks**: [T001](tasks/WP01-app-shell-router.md), T002, T003, T004, T005, T006
- **Prompt file**: [tasks/WP01-app-shell-router.md](tasks/WP01-app-shell-router.md)

### WP02 — Progress & Persistence Layer

- **Summary**: The single localStorage-backed progress store, its debounced-autosave API, the landing view that displays it, and the reset-progress control.
- **Priority**: P0 (foundation for every stateful lab)
- **Independent test**: Mark a module "done" via the console API, reload the page, confirm it's still "done"; use "reset my progress" and confirm it returns to first-visit state.
- **Estimated size**: ~5 subtasks, ~300 lines
- **Dependencies**: WP01
- **Subtasks**: T007, T008, T009, T010, T011
- **Prompt file**: [tasks/WP02-progress-persistence.md](tasks/WP02-progress-persistence.md)

### WP03 — Module View Harness

- **Summary**: The generic module shell that renders a module's content sections and mounts its lab(s) per the lab-engine contract, plus the shared exit-lab affordance and completion-marking rule.
- **Priority**: P0 (every module and every lab engine mounts through this)
- **Independent test**: Navigate to any module route; content sections render; a stub lab mounts/unmounts cleanly on navigating away.
- **Estimated size**: ~5 subtasks, ~280 lines
- **Dependencies**: WP01, WP02
- **Subtasks**: T012, T013, T014, T015, T016
- **Prompt file**: [tasks/WP03-module-view-harness.md](tasks/WP03-module-view-harness.md)

### WP04 — Prompt Builder & Clipboard

- **Summary**: The shared role-context-task-format builder (pure logic + UI) reused across Modules 6, 8, 10, 11, with copy-to-clipboard and per-purpose draft isolation.
- **Priority**: P1
- **Independent test**: Fill the builder, see the live-assembled prompt, click copy, paste it elsewhere and confirm it matches; switch modules and back, confirm the draft persisted.
- **Estimated size**: ~5 subtasks, ~320 lines
- **Dependencies**: WP02
- **Subtasks**: T017, T018, T019, T020, T021
- **Prompt file**: [tasks/WP04-prompt-builder.md](tasks/WP04-prompt-builder.md)

### WP05 — Checklist & Match Lab Engines

- **Summary**: The non-graded checklist engine (Module 1) and the generic match/sort/scenario-Q&A engine that serves four different modules.
- **Priority**: P1
- **Independent test**: Mount each engine with sample config; checklist items toggle and persist; match-lab correctly scores a sample of each of its 4 target shapes.
- **Estimated size**: ~4 subtasks, ~260 lines
- **Dependencies**: WP03
- **Subtasks**: T022, T023, T024, T025
- **Prompt file**: [tasks/WP05-checklist-match-labs.md](tasks/WP05-checklist-match-labs.md)

### WP06 — Spot-Mistake, Quiz & Download Lab Engines

- **Summary**: The two graded/retriable engines and the download-link engine.
- **Priority**: P1
- **Independent test**: Submit a spot-mistake attempt, see per-item feedback and a score, retry with no penalty; submit a quiz, same behavior; a download-lab instance renders working download links.
- **Estimated size**: ~4 subtasks, ~260 lines
- **Dependencies**: WP03
- **Subtasks**: T026, T027, T028, T029
- **Prompt file**: [tasks/WP06-graded-download-labs.md](tasks/WP06-graded-download-labs.md)

### WP07 — Module Content: Orientation Through Prompting 101 (Modules 1-6)

- **Summary**: Author the lesson content and lab config for the first six modules.
- **Priority**: P1
- **Independent test**: Each of Modules 1-6 renders real content and a working, correctly-configured lab.
- **Estimated size**: ~6 subtasks, ~380 lines
- **Dependencies**: WP04, WP05, WP06
- **Subtasks**: T030, T031, T032, T033, T034, T035
- **Prompt file**: [tasks/WP07-content-modules-1-6.md](tasks/WP07-content-modules-1-6.md)

### WP08 — Module Content: Mock Use-Cases Through Graduation (Modules 7-12)

- **Summary**: Author the lesson content and lab config for the remaining six modules, including the deliberately lean graduation module, and assemble the module index.
- **Priority**: P1
- **Independent test**: Each of Modules 7-12 renders real content and a working lab; Module 12 offers exactly two downloads and no worksheet/checklist/scripted prompts.
- **Estimated size**: ~7 subtasks, ~420 lines
- **Dependencies**: WP04, WP05, WP06, WP07, WP09
- **Subtasks**: T036, T037, T038, T039, T040, T041, T042
- **Prompt file**: [tasks/WP08-content-modules-7-12.md](tasks/WP08-content-modules-7-12.md)

### WP09 — Mock Use-Case Content Files

- **Summary**: Author the >=3 downloadable mock-scenario `.md` files for Module 7.
- **Priority**: P1
- **Independent test**: Each file downloads correctly and reads as a realistic, self-contained scenario a learner could paste into her own Claude Code session.
- **Estimated size**: ~4 subtasks, ~180 lines
- **Dependencies**: none (pure content, independent of app code)
- **Subtasks**: T043, T044, T045, T046
- **Prompt file**: [tasks/WP09-mock-use-case-content.md](tasks/WP09-mock-use-case-content.md)

### WP10 — Visual Assets (SVG Diagrams)

- **Summary**: Hand-authored SVG diagrams for Module 1 (interface map) and Module 4 (folder tree), within the C-006 constraint (no generated/photorealistic images, no reproduced product screenshots).
- **Priority**: P2
- **Independent test**: Diagrams render correctly inline, scale responsively, and are referenced from the correct module content entries.
- **Estimated size**: ~4 subtasks, ~200 lines
- **Dependencies**: WP07
- **Subtasks**: T047, T048, T049, T050
- **Prompt file**: [tasks/WP10-visual-assets.md](tasks/WP10-visual-assets.md)

### WP11 — PWA & Offline Support

- **Summary**: Manifest, icons, and a service worker precaching the app shell and content, matching `rijbewijs-study-app`'s pattern. Sequenced last among build WPs so the precache file list is stable.
- **Priority**: P2
- **Independent test**: Browser offers "install"/"Add to Home Screen"; going offline and reloading still serves the full app and content (except Module 1's external video link).
- **Estimated size**: ~4 subtasks, ~220 lines
- **Dependencies**: WP01, WP08, WP10
- **Subtasks**: T051, T052, T053, T054
- **Prompt file**: [tasks/WP11-pwa-offline.md](tasks/WP11-pwa-offline.md)

### WP12 — Full-App Verification & Deployment Prep

- **Summary**: Run the quickstart.md checklist end-to-end, verify responsive/offline behavior, fix anything broken, and confirm GitHub Pages deployment readiness.
- **Priority**: P2 (final gate before handing the app back to the stakeholder)
- **Independent test**: All 9 quickstart.md steps pass in a single run.
- **Estimated size**: ~4 subtasks, ~200 lines
- **Dependencies**: WP01, WP02, WP03, WP04, WP05, WP06, WP07, WP08, WP09, WP10, WP11
- **Subtasks**: T055, T056, T057, T058
- **Prompt file**: [tasks/WP12-verification-deployment.md](tasks/WP12-verification-deployment.md)

## Parallelization notes

WP05 and WP06 can run in parallel once WP03 lands (both depend only on
WP03). WP09 has no dependencies and can run any time before WP08. WP07 and
WP08 both depend on the same engine WPs (WP04/05/06) but WP08 also depends
on WP07 because both would otherwise touch overlapping content surfaces —
this mission deliberately splits `js/data/modules/` per-file specifically
so WP07 and WP08 have disjoint `owned_files`, but WP08's own aggregator
file (`index.js`) still needs WP07's files to exist first, hence the
dependency.

## MVP scope

WP01 + WP02 + WP03 + WP04 + WP05 + WP06 + WP07 (Modules 1-6 fully working,
end to end, including the prompt builder) is a legitimate, demoable MVP —
everything through "Prompting 101" works before a single line of Module
7-12 content is written.
