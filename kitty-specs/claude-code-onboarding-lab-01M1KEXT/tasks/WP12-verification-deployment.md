---
work_package_id: WP12
title: Full-App Verification & Deployment Prep
dependencies:
- WP01
- WP02
- WP03
- WP04
- WP05
- WP06
- WP07
- WP08
- WP09
- WP10
- WP11
requirement_refs:
- FR-026
- FR-028
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
subtasks:
- T055
- T056
- T057
- T058
phase: Phase 4 - Polish
assignee: ''
agent: "claude:sonnet-5:frontend-freddy:implementer"
shell_pid: "11044"
history:
- at: '2026-09-03T14:08:39Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: README.md
create_intent: []
execution_mode: code_change
model: ''
owned_files:
- README.md
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP12 – Full-App Verification & Deployment Prep

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

The final gate before handing the app back to the stakeholder. This WP
owns no new source files (`owned_files` is only `README.md`) — its job is
to **run** the app end to end, find and fix real problems, and confirm
deployment readiness. On completion:

- All 9 steps of [`quickstart.md`](../quickstart.md)'s manual verification
  checklist pass in a single run.
- The app is confirmed usable at 360px width and works correctly offline
  (except Module 1's video link, as expected).
- `README.md` documents how to run and deploy the app (mirroring
  `rijbewijs-study-app`'s README structure).

## Context & Constraints

- Read [`quickstart.md`](../quickstart.md) — it is this WP's test script.
- This is the one WP with no `execution_mode`-relevant new files. **Minor,
  well-justified fixes to any other WP's owned files are expected and
  allowed** if verification surfaces a real bug (per the ownership rules:
  "a small, well-justified out-of-map edit is acceptable when recorded
  with a one-line rationale") — record every such fix in this WP's Activity
  Log with which file, what was wrong, and why. Do not use this allowance
  to do large rewrites; if verification surfaces something big, that's a
  new follow-up WP, not a same-WP rewrite.
- Depends on every other WP being complete — this is intentionally the
  last WP.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab

## Subtasks & Detailed Guidance

### Subtask T055 – Run the quickstart.md checklist end-to-end

- **Purpose**: The primary acceptance gate for the whole mission.
- **Steps**: Start the local static server per `quickstart.md`, and run all
  9 numbered verification steps in order, using the browser preview tools.
  Fix anything that fails (see ownership note above) and re-run the
  affected step(s) — do not mark this done until all 9 pass in one
  sitting.
- **Files**: potentially any (bug fixes only, out-of-map with rationale)
- **Parallel?**: No — this is the trunk of the WP; T056/T057/T058 are
  narrower follow-on checks.

### Subtask T056 – Cross-browser/responsive check at 360px (NFR-002)

- **Purpose**: Confirm the narrowest supported width actually works, not
  just the developer's default window size.
- **Steps**: Resize to 360px width and check the landing view, a
  content-heavy module (e.g. Module 6 with the prompt builder), and a
  graded lab. Fix any overflow/clipping found.
- **Files**: likely `css/style.css` fixes only, if needed
- **Parallel?**: [P] with T057

### Subtask T057 – Offline verification pass (FR-028)

- **Purpose**: Confirm WP11's precache is actually complete.
- **Steps**: Go offline (DevTools > Network > Offline), reload, and click
  through several modules and both Module 12 downloads. Confirm only
  Module 1's external video link is affected, and that it's clearly marked
  as external/requires connectivity.
- **Files**: `service-worker.js` fixes only, if a precache gap is found
  (out-of-map edit on WP11's file, with rationale)
- **Parallel?**: [P] with T056

### Subtask T058 – README deployment section + GitHub Pages readiness

- **Purpose**: The stakeholder-facing "how do I actually put this online"
  documentation.
- **Steps**: Update `README.md` with a "Running it locally" section
  (mirroring `quickstart.md`) and a "Deploying to GitHub Pages" section
  (mirroring `rijbewijs-study-app`'s README — push to a public repo's
  `main` branch, enable Pages, share the resulting URL). Confirm nothing
  in the repo assumes a build step or a non-static host (C-005).
- **Files**: `README.md`
- **Parallel?**: [P]

## Risks & Mitigations

- **Risk**: This WP becomes a dumping ground for unrelated last-minute
  scope. **Mitigation**: the out-of-map allowance is explicitly for
  fixing what verification finds broken, not for adding anything new — if
  a genuinely new idea comes up during this pass, note it for a future
  mission rather than implementing it here.

## Review Guidance

- Confirm all 9 quickstart.md steps were actually run (not just asserted)
  — check the Activity Log for what was tested.
- Confirm every out-of-map edit made during this WP has a one-line
  rationale recorded.
- This is the mission's final review before acceptance — read back through
  `spec.md`'s Success Criteria (SC-001 through SC-005) and confirm each one
  genuinely holds in the running app, not just in the code.

## Activity Log

**Initial entry**:

- 2026-09-03T14:08:39Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP12 --to <status>` to change WP status.
- 2026-09-03T20:04:08Z – user – shell_pid=36152 – Moved to planned
- 2026-09-03T20:04:20Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=11044 – Started implementation via action command
