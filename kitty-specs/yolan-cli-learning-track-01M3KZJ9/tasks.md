# Tasks: Yolan's CLI Learning Track

**Input**: [plan.md](plan.md), [spec.md](spec.md), [data-model.md](data-model.md), [contracts/](contracts/), [research.md](research.md), [quickstart.md](quickstart.md)
**Prerequisites**: plan.md complete (Implementation Concern Map IC-01..IC-12)

19 subtasks (T001-T019) rolled into 4 work packages. WP01, WP02, and WP03
are pure content-authoring WPs, each producing brand-new module files
nothing else in this mission touches -- no shared files, no dependencies,
fully parallel. WP04 is the integration/wiring WP: it adds the
`getModulesForProfile()` mechanism, updates the two consuming views, adds
one bullet to the existing shared Data Safety module, and updates the
service worker's precache list -- it depends on WP01/WP02/WP03 because it
assembles Yolan's 15-module track array from the files they produce.

## Subtask Index

| ID | Description | WP | Parallel |
|---|---|---|---|
| T001 | Author "Terminal Basics" module | WP01 | [P] |
| T002 | Author "Make Your Terminal Yours" module | WP01 | [P] |
| T003 | Author "Claude Code, from the Command Line" module | WP01 | [P] |
| T004 | Manual browser verification of WP01's three modules | WP01 | |
| T005 | Author "Git, Properly" module | WP02 | [D] |
| T006 | Author "GitHub & Hosting" module | WP02 | [D] |
| T007 | Author "MCP Servers, Hands-On" module | WP02 | [D] |
| T008 | Manual browser verification of WP02's three modules | WP02 | | [D] |
| T009 | Author "Spec-Driven Development" module | WP03 | [P] |
| T010 | Author "Building Your Own Tools with Claude Code" module | WP03 | [P] |
| T011 | Author "A Taste of the Claude API" module | WP03 | [P] |
| T012 | Author "Capstone: Ship a Real Tool" module | WP03 | [P] |
| T013 | Manual browser verification of WP03's four modules | WP03 | |
| T014 | Add `getModulesForProfile()` to `index.js`, assemble Yolan's 15-module track | WP04 | |
| T015 | Update `landing-view.js`: profile-aware module source + position-based card numbering | WP04 | [P] |
| T016 | Update `module-view.js`: profile-aware module source for lookup + pager | WP04 | [P] |
| T017 | Add the Data Safety "never commit secrets/API keys" bullet | WP04 | [P] |
| T018 | Add the ~10 new module file paths to `service-worker.js`'s precache list | WP04 | [P] |
| T019 | Full end-to-end manual verification per `quickstart.md` | WP04 | |

## Work Packages

### WP01 — Terminal & CLI Orientation

- **Summary**: The three modules that open Yolan's track -- absolute-beginner terminal literacy, a prescribed terminal-styling stack (Homebrew, iTerm2, Oh My Zsh), and CLI-specific Claude Code orientation.
- **Priority**: P1
- **Independent test**: Each of the three new module files exports a valid `{id, order, title, summary, content, labs}` object, renders standalone via a direct hash-route visit, and every install command in "Make Your Terminal Yours" is correct for an Intel Mac on macOS Monterey 12.7.6 (no Ghostty, no Apple-Silicon-only paths).
- **Estimated size**: 4 subtasks, ~450 lines
- **Dependencies**: none
- **Subtasks**: T001, T002, T003, T004
- **Prompt file**: [tasks/WP01-terminal-cli-orientation.md](tasks/WP01-terminal-cli-orientation.md)

### WP02 — Git, GitHub & MCP

- **Summary**: Hands-on Git commands, GitHub setup/hosting, and an actual hands-on MCP server connection -- the three modules that make repo/file literacy central to Yolan's track, per his stated goal.
- **Priority**: P1
- **Independent test**: Each of the three new module files renders standalone; the MCP module's hands-on exercise references a genuinely low-friction real server (the filesystem reference server, per `research.md`); the GitHub Pages walkthrough describes the pattern generically, not tied to this repo's own Spec Kitty/service-worker specifics.
- **Estimated size**: 4 subtasks, ~450 lines
- **Dependencies**: none
- **Subtasks**: T005, T006, T007, T008
- **Prompt file**: [tasks/WP02-git-github-mcp.md](tasks/WP02-git-github-mcp.md)

### WP03 — Spec-Driven Dev, Building Tools, API Taste & Capstone

- **Summary**: The four modules that close out Yolan's track -- spec-driven development methodology (with Spec Kitty as the concrete example), building custom Claude Code skills/subagents, a minimal taste of the Claude API, and the capstone that has him ship one real small tool.
- **Priority**: P1
- **Independent test**: Each of the four new module files renders standalone; the Spec-Driven Development and Building Your Own Tools modules read as generic content with no Yolan-specific framing (C-005, since Wim's future track is expected to reuse them unmodified); the Capstone module's references to Yolan's own project ideas stay at the generality already established in `docs/planning/yolan-track-plan.md` (NFR-005) and explicitly cross-references the Data Safety "never paste real/proprietary data" lesson.
- **Estimated size**: 5 subtasks, ~550 lines
- **Dependencies**: none
- **Subtasks**: T009, T010, T011, T012, T013
- **Prompt file**: [tasks/WP03-spec-driven-tools-api-capstone.md](tasks/WP03-spec-driven-tools-api-capstone.md)

### WP04 — Module-List Mechanism & Integration

- **Summary**: The plumbing that makes the 10 new modules (plus 5 reused ones) reachable as Yolan's own distinct, correctly-ordered track: a new `getModulesForProfile()` export, the two consuming views switched over to it (including fixing a stale-numbering bug for reused modules), one shared Data Safety bullet, and the service worker's precache list updated.
- **Priority**: P0 (final integration -- makes WP01/WP02/WP03's content actually reachable/navigable)
- **Independent test**: Selecting the Yolan profile shows exactly the 15 modules from `data-model.md`'s track table, correctly numbered 1-15; selecting Wim or Princess shows the original, unchanged 12-module list (plus the one new Data Safety bullet); switching between profiles preserves each one's progress.
- **Estimated size**: 6 subtasks, ~400 lines
- **Dependencies**: WP01, WP02, WP03
- **Subtasks**: T014, T015, T016, T017, T018, T019
- **Prompt file**: [tasks/WP04-module-list-integration.md](tasks/WP04-module-list-integration.md)

## Parallelization

- **Wave 1 (start immediately)**: WP01, WP02, WP03 -- three fully independent lanes, zero shared files, together producing all 10 new module content files.
- **Wave 2 (after WP01, WP02, and WP03 all land)**: WP04 -- assembles the track array from files Wave 1 produced and wires the two consuming views; cannot start meaningfully earlier since it needs the actual file names/exports to exist.

## MVP Scope

WP01/WP02/WP03 alone have no learner-visible effect -- their new files exist
but nothing routes to them until WP04 lands. The smallest complete,
learner-visible slice is all four WPs together; there is no natural partial
subset to ship, since Yolan's profile would otherwise still show the
shared 12-module list with no indication anything changed for him.
