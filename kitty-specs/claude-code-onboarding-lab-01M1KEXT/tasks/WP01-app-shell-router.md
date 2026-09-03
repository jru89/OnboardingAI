---
work_package_id: WP01
title: App Shell, Router & Nav Chrome
dependencies: []
requirement_refs:
- FR-002
- FR-023
- FR-025
- FR-026
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
base_branch: kitty/mission-claude-code-onboarding-lab-01M1KEXT
base_commit: 8317da50d6d3389e705bda81a777ce7aaf79399c
created_at: '2026-09-03T15:05:52.432582+00:00'
subtasks:
- T001
- T002
- T003
- T004
- T005
- T006
phase: Phase 1 - Foundation
assignee: ''
agent: claude
shell_pid: '28012'
history:
- at: '2026-09-03T14:08:39Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/app.js
create_intent:
- index.html
- js/app.js
- css/style.css
execution_mode: code_change
model: ''
owned_files:
- index.html
- js/app.js
- css/style.css
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP01 – App Shell, Router & Nav Chrome

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter (or any user-defined profile), and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy`
- **Role**: `implementer`
- **Agent/tool**: `claude`

If no profile is specified, run `spec-kitty agent profile list` and select the best match for this work package's `task_type` and `authoritative_surface`.

---

## ⚠️ IMPORTANT: Review Feedback

**Read this first if you are implementing this task!**

- **Has review feedback?**: Check the `review_ref` field in the event log (via `spec-kitty agent status` or the Activity Log below).
- **You must address all feedback** before your work is complete. Feedback items are your implementation TODO list.
- **Report progress**: As you address each feedback item, update the Activity Log explaining what you changed.

---

## Review Feedback

*[If this WP was returned from review, the reviewer feedback reference appears in the Activity Log below or in the status event log.]*

---

## Markdown Formatting

Wrap HTML/XML tags in backticks: `` `<div>` ``, `` `<script>` ``
Use language identifiers in code blocks: ` ```python `, ` ```bash `

---

## Objectives & Success Criteria

This is the foundation work package — nothing else in this mission mounts
without it. On completion:

- Opening the app at its root URL renders a persistent header (course name,
  current view, overall progress placeholder, home link) and an empty/landing
  `<main>` mount point, with no console errors.
- Navigating a hash route (e.g. `#/module/get-oriented`) swaps only the
  `<main>` content — the header/nav never re-renders from scratch.
- The layout does not break at 360px width and is usable with keyboard and
  touch alone (no mouse-only interactions).
- No framework, no build step, no dependency beyond the browser itself (C-001, Technical Context).

## Context & Constraints

- Read [`kitty-specs/claude-code-onboarding-lab-01M1KEXT/plan.md`](../plan.md) (Technical Context, Project Structure) and [`spec.md`](../spec.md) FR-002, FR-023, FR-025, FR-026, NFR-002.
- Mirror the sibling project `A:\_code\rijbewijs-study-app`'s `index.html` /
  `js/app.js` pattern where reasonable (plain ES modules, no bundler), but
  this app's header is persistent and richer (course name + current module +
  progress + home link — `rijbewijs-study-app` has no equivalent).
- No other work package's views exist yet. Build the router to accept a
  route table that later WPs will populate (landing view in WP02, module
  view in WP03) — do not hardcode those views' contents here, but do wire a
  placeholder/stub route so the router is demonstrably working end to end.
- This WP does **not** implement `localStorage` persistence (WP02) or any
  lab logic (WP03/05/06) — keep it strictly to shell, routing, and chrome.

## Branch Strategy

- **Strategy**: already-confirmed (single feature branch, no per-WP PR)
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab

> These fields are populated automatically by `spec-kitty agent mission tasks`.
> Do NOT change them manually unless you are certain the branch topology has changed.

## Subtasks & Detailed Guidance

### Subtask T001 – Create index.html app shell + PWA meta/link tags

- **Purpose**: The single HTML entry point every view mounts into.
- **Steps**:
  1. Create `index.html` with a minimal `<head>`: charset, viewport meta,
     `<title>Claude Code Onboarding Lab</title>`, a `<link rel="stylesheet" href="css/style.css">`, and a `<link rel="manifest" href="manifest.json">` (the manifest file itself is WP11's job — link to it now so WP11 doesn't need to touch this file).
  2. `<body>` contains exactly two top-level elements: a `<header id="app-header">` (populated by `app.js`) and a `<main id="app-main">` (the router's mount point). No other static content.
  3. Load the app as a module: `<script type="module" src="js/app.js"></script>` at the end of `<body>`.
  4. Do not add a `<div id="root">`-style extra wrapper — `#app-main` is the mount point directly.
- **Files**: `index.html` (new)
- **Parallel?**: No — everything else in this WP depends on this shell existing.
- **Notes**: Do not reference `manifest.json`'s icons or `service-worker.js` registration here beyond the `<link rel="manifest">` tag — actual PWA wiring is WP11.

### Subtask T002 – Implement hash-based router in js/app.js

- **Purpose**: Single client-side router with no dependency and no build step.
- **Steps**:
  1. Define a route table: an array/object mapping route patterns to a
     `render(container)` function. Two routes exist for now: `#/` (landing —
     stub for this WP, real implementation in WP02) and `#/module/:id`
     (module view — stub for this WP, real implementation in WP03). Use a
     simple pattern match (split on `/`, no regex router library needed).
  2. On `hashchange` and on initial load, resolve the current route, call its
     `render(container)` against `#app-main`, and re-render the header via a
     shared `renderHeader()` call (T003) so header state (current module
     name) stays in sync.
  3. Export a small navigation helper, e.g. `navigateTo(path)`, that other
     modules can import instead of hand-writing `location.hash = ...` —
     later WPs (landing view's module links, lab engines' exit buttons) will
     use this.
  4. Keep the stub views trivial for this WP (e.g. `container.textContent =
     'Landing view (WP02)'` / `'Module view (WP03)'`) — just enough to prove
     routing works end to end. Do not attempt to build real views here.
- **Files**: `js/app.js` (new)
- **Parallel?**: No — depends on T001's mount point existing.
- **Notes**: Use `import`/`export` ES module syntax throughout; no global
  variables beyond what's exported. This file will grow slightly in later
  WPs only to swap the stub `render` functions for real imports — keep the
  route-table shape stable so that swap is a one-line change per route.

### Subtask T003 – Implement persistent header/nav chrome (FR-023)

- **Purpose**: Course name, current module name, an overall-progress
  placeholder, and a home/all-modules link, visible on every screen.
- **Steps**:
  1. Implement `renderHeader(currentModuleTitle)` in `js/app.js` (or a small
     co-located helper — keep it in this file, this WP owns no other JS
     file) that populates `#app-header` with: the course title (static
     text), the current module's title (or "Home" on the landing route),
     an overall-progress element with `id="overall-progress"` left as an
     empty placeholder (WP02 will populate its text — do not hardcode "0 of
     12" here, just create the element so WP02 can `textContent` into it),
     and a home link that calls `navigateTo('/')`.
  2. The header must be a real, keyboard-focusable `<nav>`/`<a>` — not a
     `<div onclick>` — so FR-026 (keyboard/mouse only) holds by construction.
- **Files**: `js/app.js`
- **Parallel?**: [P] — independent of T004/T005 once T002's router shape exists.
- **Notes**: Do not implement the actual "X of 12 complete" logic — that
  reads from `localStorage` via WP02's `progress.js`, which doesn't exist
  yet. Leave `#overall-progress` textContent empty/placeholder.

### Subtask T004 – Implement base css/style.css (responsive 360px+) (NFR-002)

- **Purpose**: Shared visual foundation for every later view.
- **Steps**:
  1. Mobile-first layout: base styles target 360px width; use `min-width`
     media queries to progressively enhance for tablet/desktop, not the
     reverse.
  2. Style `#app-header` as a sticky/fixed top bar that never causes
     horizontal scroll; style `#app-main` with sane max-width and padding.
  3. Establish base typography, spacing, and color tokens (CSS custom
     properties on `:root`) that later WPs' view-specific styles build on —
     do not let every later WP invent its own color palette.
  4. No CSS framework, no preprocessor — plain CSS, one file.
- **Files**: `css/style.css` (new)
- **Parallel?**: [P]
- **Notes**: Keep this file additive-friendly: later WPs will append
  view/lab-specific rules here (there is no per-component CSS file in this
  mission's structure — see `plan.md`). Use clear section comments
  (`/* --- header --- */`, `/* --- landing --- */`, etc.) so later WPs know
  where to add their rules without reflowing the whole file.

### Subtask T005 – Implement scroll-to-top utility (FR-025)

- **Purpose**: Content pages longer than one viewport need a scroll-to-top
  control.
- **Steps**:
  1. A small reusable function (in `js/app.js`) that, given a container
     element, shows a "back to top" button once the user has scrolled past
     some threshold (e.g. one viewport height) and scrolls smoothly to top
     on click.
  2. Wire it to run on every route render (call it from the router's
     render step, not per-view) so WP03's module view gets this for free
     without having to implement it itself.
- **Files**: `js/app.js`
- **Parallel?**: [P]
- **Notes**: This only needs to be visible on long pages — it's fine if it
  never appears on the (currently short) stub views; it will become visible
  once real module content lands in WP07/WP08.

### Subtask T006 – Keyboard/mouse-only navigability pass (FR-026)

- **Purpose**: Confirm the shell itself is fully operable without any tool
  beyond a browser and standard input.
- **Steps**:
  1. Tab through the header and stub main content; confirm a visible focus
     ring on every interactive element (do not remove `:focus` outlines in
     `style.css` without replacing them with an equally visible custom
     style).
  2. Confirm the home link and route navigation both work via Enter/Space
     on a focused element, not just click.
  3. Fix anything found — this subtask is a verification-and-fix pass, not
     just a checklist to tick.
- **Files**: `js/app.js`, `css/style.css` (fixes only, no new files)
- **Parallel?**: No — do this last, after T001-T005 land.
- **Notes**: This is a manual check (no automated test suite in this
  mission — see `plan.md` Technical Context). Use the `run` skill or the
  browser preview tools to actually drive the app with keyboard only.

## Risks & Mitigations

- **Risk**: Over-building the router (adding a routing library or regex
  engine) when a simple hash-split is sufficient and keeps C-001 (no
  dependencies) trivially true. **Mitigation**: keep the route table to
  exact-match plus one `:id` parameter pattern — that's all this mission
  ever needs (12 module routes + landing).
- **Risk**: Header re-render thrashing (full re-render on every route
  change causing focus loss). **Mitigation**: only update the parts of the
  header that actually change (current module name, progress text) rather
  than replacing the whole header's innerHTML on every navigation.

## Review Guidance

- Confirm `index.html` has exactly the two top-level body elements
  described, no extra wrapper divs.
- Confirm the router's stub views actually render on both `#/` and
  `#/module/anything` — this is the single most important thing to verify
  before later WPs build on top of it.
- Confirm no `console.error`/`console.warn` on load or navigation.
- Confirm keyboard-only navigation works (T006).

## Activity Log

> **CRITICAL**: Activity log entries MUST be in chronological order (oldest first, newest last).

### How to Add Activity Log Entries

**When adding an entry**:

1. Scroll to the bottom of this Activity Log section
2. **APPEND the new entry at the END** (do NOT prepend or insert in middle)
3. Use exact format: `- YYYY-MM-DDTHH:MM:SSZ – agent_id – <action>`
4. Timestamp MUST be current time in UTC (check with `date -u "+%Y-%m-%dT%H:%M:%SZ"`)
5. Agent ID should identify who made the change (claude-sonnet-4-5, codex, etc.)

**Format**:

```
- YYYY-MM-DDTHH:MM:SSZ – <agent_id> – <brief action description>
```

**Common mistakes (DO NOT DO THIS)**:

- Adding new entry at the top (breaks chronological order)
- Using future timestamps (causes acceptance validation to fail)
- Inserting in middle instead of appending to end

**Why this matters**: The acceptance system reads the LAST activity log entry as the current state. If entries are out of order, acceptance will fail even when the work is complete.

**Initial entry**:

- 2026-09-03T14:08:39Z – system – Prompt created.

---

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP01 --to <status>` to change WP status.
