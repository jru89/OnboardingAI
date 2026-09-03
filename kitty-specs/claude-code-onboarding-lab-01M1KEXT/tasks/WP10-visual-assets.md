---
work_package_id: WP10
title: Visual Assets (SVG Diagrams)
dependencies:
- WP07
requirement_refs:
- FR-003
- FR-007
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
subtasks:
- T047
- T048
- T049
- T050
phase: Phase 4 - Polish
assignee: ''
agent: "claude:sonnet-5:frontend-freddy:reviewer"
shell_pid: "26032"
history:
- at: '2026-09-03T14:08:39Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: assets/svg/
create_intent:
- assets/svg/interface-map.svg
- assets/svg/repo-folder-tree.svg
execution_mode: code_change
model: ''
owned_files:
- assets/svg/*.svg
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP10 – Visual Assets (SVG Diagrams)

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

The hand-authored diagrams Module 1 and Module 4 already reference by path.
On completion:

- `assets/svg/interface-map.svg` — a labeled, simplified diagram of the
  Claude Code interface (input area, project/file context, permission
  prompt callout) — an illustration, not an attempted literal screenshot.
- `assets/svg/repo-folder-tree.svg` — a labeled illustration of a typical
  repo folder tree (README.md, src/, docs/, .gitignore, etc.).
- Both scale responsively and render correctly in both light and dark
  contexts (use currentColor / CSS custom properties where practical, or
  at minimum ensure legible contrast against a light background per this
  app's design — no theme-switcher exists per spec scope, so a light-mode-
  legible diagram is sufficient).
- **Hard constraint (C-006)**: no AI-generated photorealistic images, no
  reproduced screenshot of the real Claude Code product UI. These are
  simplified, hand-authored SVG diagrams with labeled boxes/callouts —
  faithful in *what they point out*, not in visually mimicking the actual
  product chrome (which drifts out of date and isn't this app's to
  reproduce).

## Context & Constraints

- Read [`spec.md`](../spec.md) C-006 and FR-003/FR-007, and
  [`plan.md`](../plan.md)'s IC-07.
- Depends on WP07 (Module 1 and Module 4's content already exist and
  describe exactly what these diagrams need to show — read those two
  files before drawing anything).
- These are referenced by `js/data/modules/01-get-oriented.js` and
  `04-repos.js` (WP07) via a `diagram` field on a content section, rendered
  by `module-view.js` (WP03, T015).

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab

## Subtasks & Detailed Guidance

### Subtask T047 – Author Module 1's interface SVG diagram

- **Purpose**: FR-003's labeled diagram.
- **Steps**:
  1. Draw a simplified rectangle-and-callout diagram: a mock terminal/chat
     window shape, with labeled arrows/callouts pointing to "where you
     type," "where your project's files show up," and an example
     permission-prompt box with a label explaining what it means.
  2. Use plain shapes and text (`<rect>`, `<text>`, `<line>`/`<path>` for
     callout lines) — no external image embeds, no raster.
  3. Set a `viewBox` so the SVG scales cleanly at any width down to 360px.
- **Files**: `assets/svg/interface-map.svg` (new)
- **Parallel?**: [P]

### Subtask T048 – Author Module 4's folder-tree SVG diagram

- **Purpose**: FR-007's labeled folder-tree illustration.
- **Steps**:
  1. Draw a simple indented tree (folder icons as plain shapes, not
     imported icon assets) showing `README.md`, `src/`, `docs/`,
     `.gitignore` at minimum, each with a short label of what it's for
     (can reuse/adapt the short descriptions already written in Module 4's
     match-lab config from WP07, for consistency).
- **Files**: `assets/svg/repo-folder-tree.svg` (new)
- **Parallel?**: [P]

### Subtask T049 – Author any needed comparison-table graphics (optional)

- **Purpose**: Only if WP07's Module 2 comparison table doesn't render
  cleanly as plain HTML (it should — see WP07's guidance, which prefers a
  plain HTML table). Skip this subtask entirely unless a real rendering
  problem is found.
- **Files**: none expected; document the "skipped, plain HTML sufficed"
  decision in the Activity Log if so.
- **Parallel?**: [P]

### Subtask T050 – Wire diagram references into module content

- **Purpose**: Confirm the `diagram` paths in WP07's Module 1/4 content
  exactly match the filenames created here.
- **Steps**: Open `01-get-oriented.js` and `04-repos.js`, confirm the
  `diagram` field values match `assets/svg/interface-map.svg` and
  `assets/svg/repo-folder-tree.svg` exactly (case-sensitive). If they
  don't match, this is a small out-of-map edit to those WP07-owned files —
  fix the path string only, record a one-line rationale in this WP's
  Activity Log, do not touch anything else in those files.
- **Files**: `js/data/modules/01-get-oriented.js`,
  `js/data/modules/04-repos.js` (path-string fix only, if needed)
- **Parallel?**: No — depends on T047/T048 existing.

## Risks & Mitigations

- **Risk**: Spending disproportionate effort polishing diagrams relative
  to their teaching value (flagged in `plan.md` IC-07). **Mitigation**:
  these are simplified teaching aids, not portfolio pieces — legible and
  correctly labeled is the bar, not visual sophistication.

## Review Guidance

- Confirm both SVGs render correctly at 360px width (open in the app,
  resize).
- Confirm neither diagram attempts to reproduce the actual Claude Code
  product chrome pixel-for-pixel (C-006).
- Confirm the `diagram` path strings in WP07's files resolve correctly
  (no 404s in the network tab).

## Activity Log

**Initial entry**:

- 2026-09-03T14:08:39Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP10 --to <status>` to change WP status.
- 2026-09-03T19:10:18Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=25348 – Assigned agent via action command
- 2026-09-03T19:41:12Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=25348 – Ready for review
- 2026-09-03T19:42:03Z – claude:sonnet-5:frontend-freddy:reviewer – shell_pid=26032 – Started review via action command
- 2026-09-03T19:48:17Z – user – shell_pid=26032 – Review passed: both SVGs are plain-shape hand-drawn diagrams (no raster/base64, no product-chrome mimicry) with labels matching 04-repos.js's match-lab text exactly, diagram paths in 01-get-oriented.js/04-repos.js already correct, and both render legibly at desktop and 360px width with zero console errors or 404s.
