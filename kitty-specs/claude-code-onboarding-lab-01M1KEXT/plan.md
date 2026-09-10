# Implementation Plan: Claude Code Onboarding Lab

**Branch**: `feat/claude-code-onboarding-lab` | **Date**: 2026-09-03 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `kitty-specs/claude-code-onboarding-lab-01M1KEXT/spec.md`

## Summary

A 12-module, static, no-backend e-learning site. Each module is a plain-JS
data record rendered by a generic module view; a handful of reusable lab
"engines" (sort/match, spot-the-mistake, quiz, checklist, prompt-builder,
download) are shared across modules rather than one bespoke component per
module. Progress autosaves to a single localStorage record. Technical
approach mirrors the sibling `rijbewijs-study-app` project exactly: plain
HTML/CSS/JS, ES modules, no framework, no build step, PWA via
`manifest.json` + `service-worker.js`, deployed as a static site.

## Technical Context

**Language/Version**: JavaScript (ES2022, native ES modules), HTML5, CSS3 — no TypeScript, no build/transpile step
**Primary Dependencies**: None (no framework, no npm dependencies at runtime). Dev-only: a plain static file server for local preview (e.g. `python -m http.server`), matching `rijbewijs-study-app`.
**Storage**: Browser `localStorage` only, one namespaced key holding a single versioned JSON record (see `data-model.md`). No IndexedDB, no cookies, no backend.
**Testing**: Manual verification via the browser preview workflow (load app, exercise each lab, check localStorage persistence and console/network for errors) — no automated test framework in v1, consistent with `rijbewijs-study-app` and with C-001 (no build step to run a test runner through). Revisit only if a future WP proves genuinely error-prone without one.
**Target Platform**: Any modern evergreen browser (Chrome/Edge/Safari/Firefox), desktop and mobile, per NFR-002 (360px+)
**Project Type**: Single static site (no frontend/backend split — there is no backend)
**Performance Goals**: Landing view interactive within 2s on broadband/mid-range hardware (NFR-001); no specific throughput targets (single local user, no network calls)
**Constraints**: No backend/server/database/third-party or LLM API calls (C-001); offline-capable after first load except one external hyperlink (C-002/FR-028); English only (C-003); single learner/device, no accounts (C-004/NFR-004); static-host deployable with zero build step (C-005); visual assets limited to hand-authored inline SVG + one external video link, no generated/photorealistic images or reproduced product screenshots (C-006)
**Scale/Scope**: Single user, single device, 12 modules, ~10-15 lab instances total, a handful of downloadable `.md` assets. No concurrency, no multi-user data model.

## Charter Check

No charter exists for this repository (`.kittify/charter/charter.md` not
found) — this section is skipped per the planning workflow's instruction to
note absence rather than block. Only the built-in, ungoverned directives
surfaced by `spec-kitty charter context` apply informally (e.g. DIRECTIVE_001
architectural integrity, DIRECTIVE_003 decision documentation); none of them
conflict with the approach below.

## Project Structure

### Documentation (this mission)

```
kitty-specs/claude-code-onboarding-lab-01M1KEXT/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── contracts/            # Phase 1 output (internal interface contracts -- see note below)
└── tasks/                 # Phase 2 output (/spec-kitty.tasks -- not created by this command)
```

### Source Code (repository root)

```
claude-code-onboarding-lab/
├── index.html                        # App shell: header/nav placeholder + <main> mount point
├── manifest.json                     # PWA manifest
├── service-worker.js                 # App-shell + content precache, offline-first
├── icons/                            # PWA icon set (multiple sizes)
├── css/
│   └── style.css                     # All styling, responsive down to 360px (NFR-002)
├── assets/
│   └── svg/                          # Hand-authored inline SVG diagrams (interface map, folder-tree, etc. -- C-006)
├── js/
│   ├── app.js                        # Hash-based router; renders header/nav chrome + current view
│   ├── data/
│   │   └── modules.js                # Single source of truth: all 12 modules (id, title, summary, order, content, lab config) -- mirrors spec.md's FR table 1:1
│   ├── lib/
│   │   ├── progress.js               # localStorage read/write, debounced autosave, "saved" indicator event
│   │   ├── clipboard.js              # copy-to-clipboard helper with manual-select fallback
│   │   ├── prompt-builder.js         # Pure function: {role,context,task,format,constraints,tone,example} -> assembled prompt string
│   │   └── download.js               # Small helper to trigger a same-origin file download from a static path
│   └── views/
│       ├── landing-view.js           # Module list, overall progress, reset-progress control
│       ├── module-view.js            # Generic module shell: renders a module's content sections + its lab(s)
│       └── labs/
│           ├── checklist-lab.js      # Module 1 orientation checklist (non-graded)
│           ├── match-lab.js          # Generic sort/match/scenario-Q&A engine -- Modules 2, 4, 5, 9
│           ├── spot-mistake-lab.js   # Module 3 graded exercise
│           ├── quiz-lab.js           # Module 8 graded multiple-choice quiz
│           ├── prompt-builder-lab.js # Wraps lib/prompt-builder.js + clipboard -- Modules 6, 8 (rewrite), 10, 11
│           └── download-lab.js       # Download-button list -- Modules 7 and 12
├── content/
│   └── mock-use-cases/               # The >=3 downloadable mock-scenario .md files for Module 7 (authored content, not app code)
└── docs/
    └── reference/
        ├── gemini-agent-repo-blueprint.md       # Already in repo -- served as-is for Module 12
        └── example-agent-minutes-milo.md        # Already in repo -- served as-is for Module 12
```

**Structure Decision**: Single static-site project (no frontend/backend
split exists to choose between). Structure directly mirrors
`rijbewijs-study-app` (`index.html` / `js/app.js` router / `js/data` /
`js/lib` / `js/views` / `css/style.css` / `manifest.json` /
`service-worker.js`), with two additions specific to this mission: a
`js/views/labs/` folder for the six reusable lab engines (rijbewijs had no
need for this since its "labs" were just its two view types), and a
`content/mock-use-cases/` folder for Module 7's authored downloadable files,
kept separate from `docs/reference/` since those are curated
already-existing documents rather than app-authored teaching content.

## Complexity Tracking

*No charter exists, so there are no charter gates to violate or justify.
N/A.*

## Implementation Concern Map

> Implementation concerns are NOT work packages. `/spec-kitty.tasks`
> translates these into executable WPs; boundaries below are for
> architectural clarity, not a task list.

### IC-01 — App shell, router, and nav chrome

- **Purpose**: Single entry point (`index.html` + `js/app.js`) that renders the persistent header, routes between landing/module views, and provides exit/back/scroll-to-top controls.
- **Relevant requirements**: FR-001, FR-002, FR-023, FR-024, FR-025, FR-026
- **Affected surfaces**: `index.html`, `js/app.js`, `css/style.css`
- **Sequencing/depends-on**: none (foundation everything else mounts into)
- **Risks**: Getting the "no dead-end screens" rule (FR-024) right depends on every lab engine correctly exposing an exit affordance -- worth a cross-cutting check once IC-04 lands, not just at IC-01.

### IC-02 — Progress and persistence layer

- **Purpose**: One versioned localStorage record, written automatically (debounced) as the learner interacts, with a "saved" indicator and a guarded reset control.
- **Relevant requirements**: FR-020, FR-021, FR-022
- **Affected surfaces**: `js/lib/progress.js`, consumed by `landing-view.js` and every lab in `js/views/labs/`
- **Sequencing/depends-on**: none, but IC-03 through IC-06 all depend on its API existing first
- **Risks**: Must degrade gracefully on empty/missing/corrupt localStorage (spec Edge Cases) -- needs an explicit "first run" and "reset run" test, not just the happy path.

### IC-03 — Shared prompt-builder component

- **Purpose**: The recurring role/context/task/format builder used across four different modules, with copy-to-clipboard.
- **Relevant requirements**: FR-009, FR-010, FR-011, FR-012, FR-014, FR-015, FR-017, FR-018
- **Affected surfaces**: `js/lib/prompt-builder.js`, `js/lib/clipboard.js`, `js/views/labs/prompt-builder-lab.js`
- **Sequencing/depends-on**: IC-02 (draft persistence)
- **Risks**: FR-012 requires draft state to survive navigation between Modules 6/8/10/11 -- the lab instance must key its draft by module+purpose, not overwrite a single shared draft.

### IC-04 — Reusable lab engines (match / spot-mistake / quiz / checklist)

- **Purpose**: Four small, data-driven interaction engines that every non-builder lab is an instance of, rather than one bespoke implementation per module.
- **Relevant requirements**: FR-003, FR-004, FR-005, FR-006, FR-007, FR-008, FR-013, FR-015, FR-016
- **Affected surfaces**: `js/views/labs/checklist-lab.js`, `match-lab.js`, `spot-mistake-lab.js`, `quiz-lab.js`
- **Sequencing/depends-on**: IC-02 (score/completion persistence)
- **Risks**: `match-lab.js` is deliberately generalized to serve four different-looking exercises (sort, folder-tree matching, MCP scenario Q&A, tool-choice quiz) -- confirm its data shape actually fits all four before authoring Module 9's content, or split it rather than forcing a bad abstraction.

### IC-05 — Module content authoring (data + mock-use-case files)

- **Purpose**: The actual teaching content for all 12 modules, plus the >=3 downloadable mock-scenario `.md` files for Module 7.
- **Relevant requirements**: FR-001, FR-003 through FR-018 (content bodies), NFR-003 (terms defined on first use)
- **Affected surfaces**: `js/data/modules.js`, `content/mock-use-cases/*.md`
- **Sequencing/depends-on**: IC-04 (lab engines must exist to know what shape their config data needs)
- **Risks**: Largest single content-authoring surface in the mission; NFR-003 (no undefined jargon) is a manual-review item, not something a validator can check.

### IC-06 — Graduation module (Module 12)

- **Purpose**: The deliberately unscaffolded handoff module -- fixed goal statement, exactly two downloads, no worksheet/checklist/prompts.
- **Relevant requirements**: FR-019, C-002, C-007
- **Affected surfaces**: `js/data/modules.js` (Module 12 entry), `js/views/labs/download-lab.js`, `docs/reference/*` (already present)
- **Sequencing/depends-on**: IC-04 (download-lab.js), IC-05
- **Risks**: Low risk technically; the real risk is scope creep back toward hand-holding (worksheet/checklist) during implementation -- C-007 exists specifically to guard against that.

### IC-07 — Visual assets (SVG diagrams)

- **Purpose**: Author the hand-drawn SVG diagrams (Module 1 interface map, Module 4 folder-tree illustration, any comparison-table graphics) within the C-006 constraint.
- **Relevant requirements**: FR-003, FR-007, C-006
- **Affected surfaces**: `assets/svg/*.svg`, referenced from `js/data/modules.js`
- **Sequencing/depends-on**: IC-05 (content decides what diagrams are needed)
- **Risks**: None technical; scope risk is spending disproportionate effort polishing diagrams relative to their teaching value.

### IC-08 — PWA and offline support

- **Purpose**: Installable, offline-capable app shell matching the `rijbewijs-study-app` pattern.
- **Relevant requirements**: FR-027, FR-028
- **Affected surfaces**: `manifest.json`, `service-worker.js`, `icons/*`
- **Sequencing/depends-on**: IC-01 (needs a stable file list to precache) -- should land last, after other ICs stop changing the file set.
- **Risks**: A service worker that precaches too early (before file list stabilizes) causes stale-cache bugs during development; sequence this IC last on purpose.
