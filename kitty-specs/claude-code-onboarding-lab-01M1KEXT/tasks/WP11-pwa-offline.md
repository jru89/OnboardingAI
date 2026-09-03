---
work_package_id: WP11
title: PWA & Offline Support
dependencies:
- WP01
- WP08
- WP10
requirement_refs:
- FR-027
- FR-028
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
subtasks:
- T051
- T052
- T053
- T054
phase: Phase 4 - Polish
assignee: ''
agent: "claude:sonnet-5:frontend-freddy:reviewer"
shell_pid: "17472"
history:
- at: '2026-09-03T14:08:39Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: service-worker.js
create_intent:
- manifest.json
- service-worker.js
- icons/icon-192.png
- icons/icon-512.png
execution_mode: code_change
model: ''
owned_files:
- manifest.json
- service-worker.js
- icons/*
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP11 – PWA & Offline Support

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Installable, offline-capable app shell, matching `rijbewijs-study-app`'s
proven pattern. Deliberately sequenced last among the build WPs (per
`plan.md` IC-08) so the file list to precache is stable. On completion:

- The browser offers "Install"/"Add to Home Screen" for this app.
- Going offline and reloading still serves the full app shell and all 12
  modules' content (FR-028) — only Module 1's external video link is
  visibly affected, and it must be clearly marked as requiring
  connectivity (spec Edge Cases).
- `index.html`'s `<link rel="manifest">` (already present from WP01) now
  resolves to a real file.

## Context & Constraints

- Read [`spec.md`](../spec.md) FR-027, FR-028 and its Edge Cases section
  (offline behavior for Module 1's video link).
- Read [`research.md`](../research.md)'s "Offline strategy" decision
  (cache-first, same-origin, precache on install).
- Look at `A:\_code\rijbewijs-study-app\manifest.json` and
  `service-worker.js` directly as a working reference to adapt (same
  static-site, no-backend, no-build-step context) — do not reinvent the
  pattern from scratch.
- Depends on WP01 (the `<link rel="manifest">` tag already exists),
  WP08 (all module content/JS files must exist to know what to precache),
  and WP10 (diagram assets must exist too).

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab

## Subtasks & Detailed Guidance

### Subtask T051 – Create manifest.json (FR-027)

- **Purpose**: PWA installability metadata.
- **Steps**: `name`/`short_name` ("Claude Code Onboarding Lab"),
  `start_url: "."`, `display: "standalone"`, a `theme_color`/
  `background_color` matching `css/style.css`'s color tokens (WP01), and
  an `icons` array referencing the files T052 creates.
- **Files**: `manifest.json` (new)
- **Parallel?**: [P]

### Subtask T052 – Create PWA icon set

- **Purpose**: Icons for install/home-screen use.
- **Steps**: Produce at least a 192x192 and a 512x512 PNG icon (a simple,
  legible mark — this is app iconography, not a C-006-constrained teaching
  diagram, so a straightforward generated icon is fine here; C-006's
  restriction is specifically about *lesson content* visuals, not app
  chrome icons).
- **Files**: `icons/icon-192.png`, `icons/icon-512.png` (new)
- **Parallel?**: [P]

### Subtask T053 – Create service-worker.js (FR-028)

- **Purpose**: Offline-first precaching.
- **Steps**:
  1. On `install`, precache the full static file list: `index.html`,
     `css/style.css`, all `js/**` files, `manifest.json`, the icon files,
     and the downloadable `.md` assets (`content/mock-use-cases/*.md`,
     `docs/reference/*.md`) — enumerate explicitly (no runtime glob
     available without a build step); build this list by checking what
     actually exists on disk at this point in the mission, not by
     guessing.
  2. On `fetch`, cache-first for same-origin requests; pass through
     (network) for anything cross-origin (Module 1's external video link
     is a normal `<a>` navigation away from the app, not a same-origin
     fetch — it doesn't need special handling here, it simply won't work
     offline, which is expected and already called out in the spec's Edge
     Cases).
  3. On `activate`, clean up any old cache versions (bump a cache-name
     constant on future content changes).
- **Files**: `service-worker.js` (new)
- **Parallel?**: No — needs the full file list from prior WPs, hence this
  WP's late sequencing.

### Subtask T054 – Register service worker + verify install prompt

- **Purpose**: Actually activate the above.
- **Steps**:
  1. In `js/app.js` (small addition, not a rewrite — out-of-map edit on a
     WP01-owned file; record the one-line rationale in this WP's Activity
     Log), register the service worker on load:
     `navigator.serviceWorker.register('service-worker.js')`.
  2. Verify in the browser preview: DevTools > Application > Service
     Workers shows it active; toggling offline and reloading still serves
     the app.
- **Files**: `js/app.js` (small addition)
- **Parallel?**: No — depends on T053.

## Risks & Mitigations

- **Risk**: A stale precache during active development (files change but
  the service worker keeps serving old cached versions). **Mitigation**:
  this is exactly why IC-08/this WP is sequenced last — build it once the
  file set has actually stabilized, not earlier.
- **Risk**: Forgetting to add a file to the precache list when it's added
  later. **Mitigation**: this WP runs after content is complete (depends
  on WP08/WP10), so the list should be final at authoring time — if any
  file is added after this WP merges, that's a follow-up fix, not a defect
  in this WP.

## Review Guidance

- Confirm offline reload actually works (not just that a service worker
  file exists) — test it directly in the browser preview.
- Confirm the precache list is complete (spot-check a few module routes
  and the two downloadable reference docs while offline).
- Confirm install prompt/"Add to Home Screen" is offered.

## Activity Log

**Initial entry**:

- 2026-09-03T14:08:39Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP11 --to <status>` to change WP status.
- 2026-09-03T19:49:46Z – user – shell_pid=13884 – Moved to planned
- 2026-09-03T19:49:59Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=17680 – Started implementation via action command
- 2026-09-03T19:54:26Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=17680 – Ready for review
- 2026-09-03T19:54:53Z – claude:sonnet-5:frontend-freddy:reviewer – shell_pid=17472 – Started review via action command
