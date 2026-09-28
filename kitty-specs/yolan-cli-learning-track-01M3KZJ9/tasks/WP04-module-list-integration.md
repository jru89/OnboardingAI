---
work_package_id: WP04
title: Module-List Mechanism & Integration
dependencies:
- WP01
- WP02
- WP03
requirement_refs:
- FR-001
- FR-002
- FR-006
- FR-007
- FR-011
- FR-012
- FR-016
- FR-018
- FR-019
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
subtasks:
- T014
- T015
- T016
- T017
- T018
- T019
phase: Phase 2 - Integration (Wave 2)
assignee: ''
shell_pid: "5928"
agent: "claude:sonnet-5:reviewer-renata:reviewer"
history:
- at: '2026-09-28T00:00:00Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/data/modules/index.js
create_intent: []
execution_mode: code_change
model: ''
owned_files:
- js/data/modules/index.js
- js/views/landing-view.js
- js/views/module-view.js
- js/data/modules/03-data-safety.js
- service-worker.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP04 – Module-List Mechanism & Integration

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Make the 10 new modules from WP01/WP02/WP03 (plus 5 reused ones) reachable
as Yolan's own distinct, correctly-ordered 15-module track, without
breaking the shared 12-module track Wim and Princess still use.

- FR-001/FR-002: a new `getModulesForProfile(profileId)` export resolves
  the active profile to the right track, defaulting to the existing shared
  list.
- FR-006/FR-011/FR-012/FR-016: the four unchanged reused modules (AI vs.
  Claude Code, Prompting 101, Prompting 201, .md Files & Habits) are
  referenced into Yolan's track by the same object, not copied.
- FR-007: Data Safety (also reused) gains one bullet, visible to every
  profile.
- FR-018: Yolan's track excludes Mock Use-Cases, Claude vs. Gemini,
  Automate a Task.
- FR-019: the shared track and the Wim/Princess profiles are otherwise
  completely unaffected.

## Context & Constraints

- **Depends on WP01, WP02, and WP03** -- do not start until all three have
  landed (or, if running before their merge, confirm their 10 new files
  actually exist with the exact filenames/ids listed below -- this WP's
  entire job is assembling them into a track, so it cannot proceed without
  them).
- Read [`spec.md`](../spec.md) FR-001, FR-002, FR-006, FR-007, FR-011,
  FR-012, FR-016, FR-018, FR-019, C-001, and all 8 Acceptance Scenarios.
- Read [`data-model.md`](../data-model.md) in full -- especially "Module
  Track" (the exact code shape to produce) and "Display-numbering
  derivation" (why the landing-view.js change is not optional).
- Read [`contracts/module-list-resolution.md`](../contracts/module-list-resolution.md)
  in full -- it is the authoritative contract for the function this WP
  introduces; follow it exactly, including its "Consumer obligations"
  section.
- Read [`quickstart.md`](../quickstart.md) -- this WP's own final
  verification subtask (T019) is that walkthrough.
- Read the current
  [`js/data/modules/index.js`](../../../js/data/modules/index.js),
  [`js/views/landing-view.js`](../../../js/views/landing-view.js), and
  [`js/views/module-view.js`](../../../js/views/module-view.js) in full
  before editing any of them.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab
- Execution worktrees are allocated per computed lane from `lanes.json`
  once `/spec-kitty.tasks` finalizes -- do not create your own worktree by
  hand.

## Subtasks & Detailed Guidance

### Subtask T014 – Add `getModulesForProfile()` to `index.js`

- **Purpose**: The core mechanism -- resolve a profile id to the right
  ordered module list.
- **Steps**:
  1. In `js/data/modules/index.js`, **leave the existing code completely
     untouched** (the 12 imports, the `modules` array, its `.sort()`, and
     `export default modules`) -- this is the shared track and C-001
     forbids changing it.
  2. Add new imports for the 10 new files from WP01/WP02/WP03:
     `terminal-basics.js`, `make-your-terminal-yours.js`,
     `claude-code-cli-orientation.js`, `git-properly.js`,
     `github-hosting.js`, `mcp-servers-hands-on.js`,
     `spec-driven-development.js`, `building-your-own-tools.js`,
     `claude-api-taste.js`, `capstone-ship-a-real-tool.js`.
  3. Add a `yolanTrack` array, in this exact order (matching
     `data-model.md`'s Module Track section and `spec.md`'s Key Entities
     table):
     ```js
     const yolanTrack = [
       terminalBasics,
       makeYourTerminalYours,
       claudeCodeCliOrientation,
       aiVsClaudeCode,        // reused -- same import already used by `modules` above
       dataSafety,             // reused -- same import already used by `modules` above
       gitProperly,
       githubHosting,
       mcpServersHandsOn,
       prompting101,            // reused
       prompting201,            // reused
       specDrivenDevelopment,
       buildingYourOwnTools,
       claudeApiTaste,
       mdFilesHabits,           // reused
       capstoneShipARealTool,
     ];
     ```
     Note: reference the *same* imported binding already used by the
     shared `modules` array for each reused module (e.g. whatever local
     name `02-ai-vs-claude-code.js`'s default export is already imported
     as) -- do not add a second import of the same file under a different
     name.
  4. Add the exported resolver function, exactly matching
     `contracts/module-list-resolution.md`:
     ```js
     export function getModulesForProfile(profileId) {
       if (profileId === "yolan") return yolanTrack;
       return modules;
     }
     ```
  5. Do **not** call `.sort()` on `yolanTrack` -- its array order *is* the
     intended display/navigation order (data-model.md's explicit
     invariant: a module's own `.order` field is never a cross-track sort
     key).
- **Files**: `js/data/modules/index.js`
- **Parallel?**: No -- T015 and T016 both need this export to exist first,
  conceptually, though they touch different files and can be written
  alongside it.

### Subtask T015 – Update `landing-view.js`

- **Purpose**: Show the active profile's track, with correct module
  numbering.
- **Steps**:
  1. Replace the static import (`import MODULE_STUBS from
     "../data/modules/index.js"`) with an import of
     `getModulesForProfile` instead, plus `getSelectedProfileId` from
     `../lib/profile.js`.
  2. Everywhere `MODULE_STUBS` (or its local name) is currently used to
     build the module list, call `getModulesForProfile(getSelectedProfileId())`
     instead, once per render (per the contract's "Consumer obligations"
     -- do not cache the resolved list across renders in module-level
     state; call it fresh each time `render()`/`renderLanding()` runs,
     matching how `getProgress()` is already called fresh each render in
     this same file).
  3. **Remove the `.sort((a, b) => a.order - b.order)` call** on the
     resolved list if present today -- `yolanTrack` is already in its
     intended order and must not be re-sorted by `.order` (that would
     scramble it, per `data-model.md`'s "Display-numbering derivation"
     section); the shared `modules` default export is already sorted at
     its own definition site in `index.js`, so re-sorting it again here
     was always redundant, and removing it is safe/behavior-preserving
     for that track too.
  4. **Fix the displayed module number**: `buildModuleCard()` currently
     reads `module.order` for the "N. Title" prefix. Change it to use the
     module's position in the resolved list instead -- pass the index
     through when calling `buildModuleCard` (e.g.
     `buildModuleCard(module, status, index + 1)` from a `.forEach`/`for`
     loop over the resolved list with its index, or `list.map((module,
     index) => buildModuleCard(module, statusFor(...), index + 1))`), and
     use that parameter instead of `module.order` inside the function.
  5. `countDone()` / `renderOverallProgress()`'s "N of M modules complete"
     text should use the resolved list's `.length`, not a hardcoded
     reference to the old default export -- confirm this already falls
     out naturally from step 2's change (it should, since these read from
     the same resolved list) rather than needing a separate fix.
- **Files**: `js/views/landing-view.js`
- **Parallel?**: [P] relative to T016 (different file); depends
  conceptually on T014's export existing.

### Subtask T016 – Update `module-view.js`

- **Purpose**: Resolve the active profile's list for the per-module
  lookup and the prev/next pager.
- **Steps**:
  1. Replace the static import of the default module list with
     `getModulesForProfile` (plus `getSelectedProfileId` from
     `../lib/profile.js`, if not already importable from a shared
     location -- check whether `landing-view.js`'s T015 change already
     establishes a pattern to mirror).
  2. `getModule(id)` currently searches a module-level constant
     (`MODULES.find(...)`). Change it to search the list resolved via
     `getModulesForProfile(getSelectedProfileId())` -- called fresh each
     time `getModule()` runs (or once per `render()` call and passed
     through, whichever reads more naturally given this file's existing
     structure -- your call, but it must reflect the *current* profile
     on every render, not a value cached from module load time).
  3. `renderPager()` currently does `MODULES.findIndex(...)` against the
     same module-level constant for prev/next adjacency. Update it to use
     the same resolved list as step 2 -- the adjacency logic itself
     (array-index-based) does not need to change, only which array it
     operates on.
  4. The existing `GENERIC_STUB_CONTENT` fallback for an unrecognized id
     (e.g. a bookmarked Yolan-only module id visited while a different
     profile is active) should continue to work unchanged -- confirm this
     with T019's edge-case check rather than adding new fallback logic
     here.
- **Files**: `js/views/module-view.js`
- **Parallel?**: [P] relative to T015 (different file); depends
  conceptually on T014's export existing.

### Subtask T017 – Add the Data Safety bullet

- **Purpose**: One new bullet, visible to every profile, on never
  committing secrets or API keys to a git repository.
- **Steps**:
  1. In `js/data/modules/03-data-safety.js`, find the existing content
     section covering "Personal access tokens and API keys" (or the
     closest equivalent existing section -- read the file first).
  2. Add one new bullet/short paragraph: never commit secrets or API keys
     to a git repository -- even a private one, and even if you plan to
     remove it later (once committed, it's in the project's history).
     Keep it consistent in tone/length with this module's existing
     bullets (each is roughly one short paragraph).
  3. This is a genuinely small, additive change -- do not restructure or
     rewrite any existing content in this file.
- **Files**: `js/data/modules/03-data-safety.js`
- **Parallel?**: [P] -- fully independent of T014/T015/T016/T018
  (different file, no shared dependency).

### Subtask T018 – Update `service-worker.js`'s precache list

- **Purpose**: Offline availability for the 10 new module files.
- **Steps**:
  1. In `service-worker.js`'s `PRECACHE_URLS` array, add the 10 new paths
     under the existing `// js/data/modules` comment block, alongside the
     12 existing entries: `./js/data/modules/terminal-basics.js`,
     `./js/data/modules/make-your-terminal-yours.js`,
     `./js/data/modules/claude-code-cli-orientation.js`,
     `./js/data/modules/git-properly.js`,
     `./js/data/modules/github-hosting.js`,
     `./js/data/modules/mcp-servers-hands-on.js`,
     `./js/data/modules/spec-driven-development.js`,
     `./js/data/modules/building-your-own-tools.js`,
     `./js/data/modules/claude-api-taste.js`,
     `./js/data/modules/capstone-ship-a-real-tool.js`.
  2. Do not change `CACHE_NAME` -- per this file's own header comment,
     the stale-while-revalidate strategy already picks up new/changed
     files within one extra reload with no manual version bump required.
- **Files**: `service-worker.js`
- **Parallel?**: [P] -- fully independent of T014/T015/T016/T017.

### Subtask T019 – Full end-to-end manual verification

- **Purpose**: Confirm the whole mission works together, per
  `quickstart.md`.
- **Steps**: Follow [`quickstart.md`](../quickstart.md) exactly, all 6
  sections:
  1. Yolan's list is correct (SC-001) -- exactly 15 modules, correct
     order, correct numbering (1-15, not the reused modules' stale
     original numbers), none of the 3 excluded modules present.
  2. Other profiles are unaffected (SC-002) -- Wim/Princess still show
     the original 12-module list correctly numbered 1-12, with the one
     new Data Safety bullet, and any prior progress intact.
  3. Terminal-styling instructions accuracy (SC-003) -- re-confirm
     against current Homebrew/iTerm2 docs if not already fully verified
     in WP01.
  4. Every module renders and every lab is completable (SC-004) -- all 15
     of Yolan's modules, 360px and desktop, every lab type used
     (checklist, match, quiz, prompt-builder) completable.
  5. Progress survives a profile switch (SC-005).
  6. No console errors, including the edge case of visiting a Yolan-only
     module id directly while a non-Yolan profile is active (should
     gracefully fall back, not throw).
  - Additionally: confirm the overall progress count ("N of 15 modules
    complete") is correct for Yolan and ("N of 12 modules complete")
    remains correct for Wim/Princess.
- **Files**: none changed -- verification only. If this step surfaces a
  bug, fix it in whichever of this WP's owned files is responsible before
  considering the WP done.
- **Parallel?**: No -- final step, depends on T014-T018 all being
  complete.

## Risks & Mitigations

- **Risk**: Forgetting to remove the `.sort()` call in `landing-view.js`
  silently re-scrambles `yolanTrack` back into `.order` order (which is
  wrong for the 5 reused modules). **Mitigation**: T015's explicit
  instruction, and T019's SC-001 check (verify the *displayed order*,
  not just that all 15 are present).
- **Risk**: A stale cached module list (from `module.order`-based
  numbering) makes Yolan's landing page show duplicate or wrong numbers
  for the reused modules. **Mitigation**: T015's position-based numbering
  fix is the actual fix; T019 must specifically check numbering, not just
  presence.
- **Risk**: Editing the shared `modules` array or any of its 12 imports
  by mistake while adding the new ones (violates C-001, breaks Wim/
  Princess). **Mitigation**: T014's explicit "leave the existing code
  completely untouched" instruction; T019's SC-002 check.
- **Risk**: One of WP01/WP02/WP03's 10 files is missing, misnamed, or
  exports a different `id` than expected, breaking the import in T014.
  **Mitigation**: T014's own dependency note to confirm all 10 files
  exist with exact filenames/ids before starting; a missing/renamed file
  surfaces immediately as a build/console error.

## Review Guidance

- Confirm `js/data/modules/index.js`'s existing 12-import block, `modules`
  array, its `.sort()`, and `export default modules` are byte-for-byte
  unchanged (C-001).
- Confirm `getModulesForProfile("yolan")` returns exactly the 15 modules
  in the exact order from `data-model.md`, and any other input (including
  `undefined`) returns the unchanged shared 12-module array.
- Confirm `landing-view.js`'s displayed module numbers are 1-15 for Yolan
  and 1-12 for the other profiles, derived from list position, not
  `module.order`.
- Confirm `module-view.js`'s prev/next pager works correctly within
  Yolan's track (including at both ends of the list) and within the
  shared track.
- Confirm the Data Safety bullet appears identically for every profile.
- Confirm `service-worker.js`'s precache list contains all 10 new paths
  with correct relative paths (`./js/data/modules/...`, matching the
  existing entries' format exactly).
- Walk `quickstart.md` yourself and confirm every one of its 6 sections
  passes.

## Activity Log

**Initial entry**:

- 2026-09-28T00:00:00Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP04 --to <status>` to change WP status.
- 2026-09-28T18:02:37Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=17368 – Assigned agent via action command
- 2026-09-28T18:14:51Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=17368 – Ready for review: getModulesForProfile() wired, Yolan's 15-module track verified live in-browser (order/numbering/exclusions/persistence/edge-case fallback/360px all confirmed); shared 12-module track and Wim/Princess unaffected. Had to cherry-pick commit a19183d (profile.js plumbing) from feat/claude-code-onboarding-lab into this lane first, since this lane branched before that commit landed and the WP's contract depends on it.
- 2026-09-28T18:16:00Z – claude:sonnet-5:reviewer-renata:reviewer – shell_pid=5928 – Started review via action command
