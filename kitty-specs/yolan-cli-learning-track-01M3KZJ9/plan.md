# Implementation Plan: Yolan's CLI Learning Track

**Branch**: `feat/claude-code-onboarding-lab` | **Date**: 2026-09-28 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `kitty-specs/yolan-cli-learning-track-01M3KZJ9/spec.md`

## Summary

Gives the Yolan profile its own 15-module, CLI-first curriculum instead of
the shared 12-module list every profile currently sees. Two kinds of work:
(1) a small, additive module-list-resolution mechanism so the app can show
a different ordered module list per profile, defaulting to the existing
shared list for any profile without one; (2) authoring ~10 new module
content files plus reusing 5 existing ones unchanged (one, Data Safety,
gains a single bullet visible to every profile). No new lab engine is
needed -- every new interactive lab reuses one of the six the app already
has (checklist, quiz, match, prompt-builder).

## Technical Context

**Language/Version**: JavaScript (ES2022, native ES modules), HTML5, CSS3 -- no TypeScript, no build/transpile step. Matches the existing app exactly; this mission introduces no new language or tooling.
**Primary Dependencies**: None (no framework, no npm dependencies at runtime). Dev-only: the same static file server already used for local preview.
**Storage**: Browser `localStorage` only, via the app's existing `js/lib/progress.js` (already profile-namespaced) and `js/lib/profile.js` (already stores the active profile id). No new storage keys or schema fields.
**Testing**: Manual verification via the browser preview workflow (select the Yolan profile, walk every module, exercise a sample of labs, check the landing page's module numbering and progress badges, check console for errors) -- no automated test framework, consistent with the project's existing DR-001 decision and this mission's own C-003.
**Target Platform**: Any modern evergreen browser (Chrome/Edge/Safari/Firefox), desktop and mobile, per this mission's NFR-002 (360px+) -- unchanged from the existing app. Content itself targets an Intel Mac on macOS Monterey 12.7.6 specifically (NFR-004), independent of which browser renders the app.
**Project Type**: Single static site (no frontend/backend split -- there is no backend). This mission adds files inside the existing `js/data/modules/` directory and makes small, additive changes to two existing view files and the module aggregator; no new top-level directories.
**Performance Goals**: No new performance surface -- new module files are the same shape/size class as the existing 12; no new network requests beyond what the service worker's existing stale-while-revalidate strategy already handles once the new files are added to its precache list.
**Constraints**: See spec.md's Constraints table (C-001 through C-005) -- no change to the 5 reused modules' ids/order/existing content beyond one shared Data Safety bullet, no new lab engine type, no build step, no test framework, no real employer/school names, the 3 future-reuse modules written generically.
**Scale/Scope**: ~10 new module content files; 1 existing module file (`03-data-safety.js`) gains one bullet; 3 files get small additive changes (`js/data/modules/index.js`, `js/views/landing-view.js`, `js/views/module-view.js`); `service-worker.js`'s precache list gains the new file paths. No changes to any of the other 11 existing module files, any lab engine, or `js/lib/profile.js` / `js/lib/progress.js` (already built).

## Charter Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

A project charter exists (`.kittify/charter/charter.md`). The directives it
surfaces for planning -- `DIRECTIVE_003` (Decision Documentation),
`DIRECTIVE_010` (Specification Fidelity), `DIRECTIVE_024` (Locality of
Change), `DIRECTIVE_025` (Boy Scout Rule), `DIRECTIVE_028` (Efficient Local
Tooling), `DIRECTIVE_033` (Targeted Staging Policy) -- are all satisfied by
this plan's approach: every change maps directly to one of spec.md's
FR-### rows (traceability/fidelity); the module-list mechanism is a small,
additive function alongside the existing default export rather than a
rewrite of `index.js` (locality); the five reused modules and the existing
12-module shared track are left byte-for-byte unchanged except the one
Data Safety bullet, which was a deliberate, spec'd, low-risk decision
(FR-007), not incidental scope creep. No charter conflicts identified.

## Project Structure

### Documentation (this mission)

```
kitty-specs/yolan-cli-learning-track-01M3KZJ9/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── contracts/             # Phase 1 output (the module-list-resolution contract)
└── tasks/                 # Phase 2 output (/spec-kitty.tasks -- not created by this command)
```

### Source Code (repository root)

```
claude-code-onboarding-lab/
├── js/
│   ├── data/
│   │   └── modules/
│   │       ├── index.js                          # + getModulesForProfile(profileId); default export (shared 12) UNCHANGED
│   │       ├── 03-data-safety.js                  # + 1 bullet: never commit secrets/API keys to git (visible to all profiles)
│   │       ├── terminal-basics.js                 # NEW
│   │       ├── make-your-terminal-yours.js        # NEW
│   │       ├── claude-code-cli-orientation.js     # NEW (replaces get-oriented in Yolan's list only)
│   │       ├── git-properly.js                    # NEW (replaces repos in Yolan's list only)
│   │       ├── github-hosting.js                  # NEW
│   │       ├── mcp-servers-hands-on.js             # NEW -- written generically for future reuse (Wim)
│   │       ├── spec-driven-development.js         # NEW -- written generically for future reuse (Wim)
│   │       ├── building-your-own-tools.js         # NEW -- written generically for future reuse (Wim)
│   │       ├── claude-api-taste.js                # NEW
│   │       └── capstone-ship-a-real-tool.js       # NEW (replaces graduation in Yolan's list only)
│   ├── lib/
│   │   └── profile.js                             # UNCHANGED -- getSelectedProfileId() already exists, just newly consumed here
│   └── views/
│       ├── landing-view.js                        # module list source -> getModulesForProfile(); card number -> list position, not module.order
│       └── module-view.js                         # module list source -> getModulesForProfile(); lookup/pager operate on the resolved list
├── service-worker.js                              # + the ~10 new module file paths in PRECACHE_URLS
└── kitty-specs/yolan-cli-learning-track-01M3KZJ9/  # this mission's own planning artifacts
```

**Structure Decision**: No new top-level directories. New module content
files land flat inside the existing `js/data/modules/` directory,
following the existing per-module file convention (`{id, order, title,
summary, content, labs}`), just without the original 12's `NN-` numeric
filename prefix -- that prefix encodes the shared track's order, which
doesn't apply to files that belong to a differently-ordered track. The
module-list mechanism is one small additive function in the existing
aggregator (`index.js`), not a parallel directory of per-profile
manifests -- simplest structure that satisfies FR-001/FR-002 without
over-engineering for a currently-single second track.

## Complexity Tracking

*No Charter Check violations -- N/A.*

## Implementation Concern Map

> Implementation concerns are NOT work packages. `/spec-kitty.tasks`
> translates these into executable WPs; boundaries below are for
> architectural clarity, not a task list.

### IC-01 — Module-list-resolution mechanism

- **Purpose**: Let the app show a different ordered module list per active profile, defaulting to the existing shared list. This is the foundation every other concern's content depends on to actually become reachable/navigable.
- **Relevant requirements**: FR-001, FR-002, FR-019
- **Affected surfaces**: `js/data/modules/index.js` (new `getModulesForProfile()` export, default export untouched), `js/views/landing-view.js`, `js/views/module-view.js` (both switch their module-list source and, for landing-view, the displayed module number)
- **Sequencing/depends-on**: none (foundation for IC-02 through IC-12 being reachable, though each can be authored independently)
- **Risks**: The displayed module number in `landing-view.js`'s card currently reads `module.order`, which is stale/non-sequential for the 5 reused modules once they sit inside Yolan's differently-ordered list (e.g. Data Safety's stored `order: 3` would show "3. Data Safety" even in Yolan's list, where it's actually item 5) -- must switch to the module's position in the *resolved* list instead. Verify this is behavior-identical for the existing shared track (it is: for 12 sequential, gap-free modules, position-in-list and `.order` are already numerically identical after the existing sort).

### IC-02 — Terminal Basics (new module)

- **Purpose**: Absolute-beginner terminal literacy -- `pwd`, `cd`, `ls`, `mkdir`, `mv`, `cp`, `rm`, editing a file from the CLI, running a script.
- **Relevant requirements**: FR-003
- **Affected surfaces**: `js/data/modules/terminal-basics.js` (new)
- **Sequencing/depends-on**: IC-01 (to be reachable/navigable)
- **Risks**: Lowest risk in this mission -- pure, well-established beginner content, no device-specific instructions.

### IC-03 — Make Your Terminal Yours (new module)

- **Purpose**: A prescribed default terminal-styling stack (Homebrew -> iTerm2 -> Oh My Zsh + theme + plugins), then guidance on finding more add-ons independently.
- **Relevant requirements**: FR-004, NFR-004
- **Affected surfaces**: `js/data/modules/make-your-terminal-yours.js` (new)
- **Sequencing/depends-on**: IC-01
- **Risks**: Highest accuracy risk in this mission -- every install command must actually work on an Intel Mac running macOS Monterey 12.7.6 (see research.md for the Ghostty-incompatibility finding this already avoided, and the Homebrew Intel-path decision).

### IC-04 — Claude Code, from the Command Line (new module, replaces Get Oriented for Yolan)

- **Purpose**: CLI-specific orientation -- launching Claude Code, recognizing a terminal-based permission prompt, asking Claude Code for help when stuck.
- **Relevant requirements**: FR-005
- **Affected surfaces**: `js/data/modules/claude-code-cli-orientation.js` (new)
- **Sequencing/depends-on**: IC-01
- **Risks**: Must not assume an IDE panel is available anywhere in the content (this app's shared Module 1 was recently rewritten to be IDE-specific -- this module is the deliberate CLI counterpart, not a copy of it).

### IC-05 — Data Safety shared bullet

- **Purpose**: Add one bullet -- never commit secrets or API keys to a git repository -- to the existing shared Data Safety module.
- **Relevant requirements**: FR-007
- **Affected surfaces**: `js/data/modules/03-data-safety.js` (existing file, small addition)
- **Sequencing/depends-on**: none
- **Risks**: This file is shared by every profile (C-001) -- the addition must read naturally for Wim's and Princess's non-CLI context too, not only Yolan's, since they will see it as well.

### IC-06 — Git, Properly (new module, replaces Repos for Yolan)

- **Purpose**: Hands-on git commands -- clone, branch, commit, push, pull, diff, log -- and the habit of reading a diff before trusting it.
- **Relevant requirements**: FR-008
- **Affected surfaces**: `js/data/modules/git-properly.js` (new)
- **Sequencing/depends-on**: IC-01
- **Risks**: **Correction from `/spec-kitty.analyze` finding I2**: the shared "Repos" module is *excluded* from Yolan's track entirely (replaced by this module), not merely preceded by it -- so nothing else in his track explains "what's a repo." This module must include its own brief (a few sentences, not a full re-teaching) "what's a repo" grounding before going hands-on, distinct in wording from the shared Repos module's own framing (not a duplicate, just not silently assumed either).

### IC-07 — GitHub & Hosting (new module)

- **Purpose**: SSH keys/auth, first push, forks/PRs conceptually, hosting a static site on GitHub Pages using this app's own deployment as the worked example.
- **Relevant requirements**: FR-009
- **Affected surfaces**: `js/data/modules/github-hosting.js` (new)
- **Sequencing/depends-on**: IC-01, IC-06 (assumes local git commands from Git, Properly)
- **Risks**: The "worked example" (this app's own GitHub Pages deployment) must be described generically enough to teach the pattern without requiring Yolan's own future repo to match this project's specific tooling (Spec Kitty, service worker, etc.) -- those are incidental to this project, not part of the lesson.

### IC-08 — MCP Servers, Hands-On (new module, written for future reuse)

- **Purpose**: Actually connect and use one real MCP server, not just read about the concept.
- **Relevant requirements**: FR-010, C-005
- **Affected surfaces**: `js/data/modules/mcp-servers-hands-on.js` (new)
- **Sequencing/depends-on**: IC-01
- **Risks**: Must pick a genuinely low-friction real MCP server (no paid signup, no complex auth) so the exercise is actually completable by a beginner -- see research.md for the specific server chosen. Must be written generically (no Yolan-specific framing) per C-005, since Wim's future track is expected to reuse this exact file. **Correction from `/spec-kitty.analyze` finding I2**: the shared "MCP Servers" module is *excluded* from Yolan's track entirely (replaced by this module), not merely preceded by it -- so nothing else in his track explains "what's MCP." This module must include its own brief "what's MCP" grounding before going hands-on (this also serves Wim's future reuse of this file, since his track may or may not include the conceptual module either).

### IC-09 — Spec-Driven Development (new module, written for future reuse)

- **Purpose**: Teach the spec -> plan -> tasks -> review methodology tool-agnostically, then Spec Kitty as the concrete example.
- **Relevant requirements**: FR-013, C-005
- **Affected surfaces**: `js/data/modules/spec-driven-development.js` (new)
- **Sequencing/depends-on**: IC-01
- **Risks**: Must stay generic per C-005 -- teach the methodology and Spec Kitty as a tool, not "how this specific app's repo happens to use Spec Kitty." Risk of the module becoming a Spec Kitty user manual instead of a spec-driven-development lesson; keep Spec Kitty as the illustration, not the subject.

### IC-10 — Building Your Own Tools with Claude Code (new module, written for future reuse)

- **Purpose**: Custom slash commands, skills, and subagents inside Claude Code.
- **Relevant requirements**: FR-014, C-005
- **Affected surfaces**: `js/data/modules/building-your-own-tools.js` (new)
- **Sequencing/depends-on**: IC-01
- **Risks**: Must stay generic per C-005. This app's own `.claude/skills/` directory is a legitimate real-world example to point to conceptually, but the module must not assume the learner is working inside this specific repo.

### IC-11 — A Taste of the Claude API (new module)

- **Purpose**: A minimal standalone-program example using the Claude API directly, distinct from using Claude Code itself.
- **Relevant requirements**: FR-015
- **Affected surfaces**: `js/data/modules/claude-api-taste.js` (new)
- **Sequencing/depends-on**: IC-01
- **Risks**: Scope creep risk -- this is explicitly "a taste," not a full API tutorial; keep it to one minimal, concrete example plus pointers, not a comprehensive reference.

### IC-12 — Capstone: Ship a Real Tool (new module, replaces Graduation for Yolan)

- **Purpose**: Guide Yolan to pick, build, verify, and publish one real small tool, suggesting his personal to-do app or reflection tool as candidates, cross-referencing the Data Safety lesson.
- **Relevant requirements**: FR-017, NFR-005
- **Affected surfaces**: `js/data/modules/capstone-ship-a-real-tool.js` (new)
- **Sequencing/depends-on**: IC-01, IC-05 (cross-references the Data Safety bullet), benefits from IC-06/IC-07/IC-08 existing conceptually since the capstone assumes those skills
- **Risks**: Privacy risk (NFR-005) -- any reference to Yolan's own project ideas must stay at the generality already established in `docs/planning/yolan-track-plan.md`, no direct quotes or identifying specifics.
