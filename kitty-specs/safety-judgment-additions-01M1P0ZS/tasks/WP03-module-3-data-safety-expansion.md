---
work_package_id: WP03
title: 'Module 3: Data Safety Expansion'
dependencies: []
requirement_refs:
- FR-003
- FR-004
tracker_refs: []
planning_base_branch: feat/safety-judgment-additions
merge_target_branch: feat/safety-judgment-additions
branch_strategy: Planning artifacts for this mission were generated on feat/safety-judgment-additions. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/safety-judgment-additions unless the human explicitly redirects the landing branch.
subtasks:
- T008
- T009
- T010
phase: Phase 2 - Module Content
assignee: ''
agent: ''
history:
- at: '2026-09-04T11:10:00Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/data/modules/03-data-safety.js
create_intent: []
execution_mode: code_change
model: ''
owned_files:
- js/data/modules/03-data-safety.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP03 – Module 3: Data Safety Expansion

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Module 3 (Data Safety) currently covers four categories of information that
must never be pasted into an AI chat (customer/client data, personal access
tokens/API keys, SSH private keys, passwords/secrets). This WP broadens
that list and adds a closing lesson on judgment, not just rules. On
completion:

- Two new categories are added to the existing list: proprietary/internal
  company documents & strategy, and a wider range of personal data
  (employee information, financial account numbers, health-related
  information) (FR-003).
- A short "when in doubt, don't paste -- use placeholders" rule is added.
- One contrasting example of data that **is** safe to paste (public or
  anonymized) is added, so the module isn't only a list of prohibitions.
- A new closing section, "Sometimes the right answer is: don't use AI at
  all," gives concrete situations where the better call is not to use an
  AI assistant (FR-004).
- This is entirely **content authoring** -- no lab config changes. Module
  3's existing graded `spot-mistake` lab (`module-3-spot-mistake`) is not
  touched by this WP.

## Context & Constraints

- No dependencies -- this WP can start immediately in parallel with any
  other WP in this mission.
- Read [`spec.md`](../spec.md) FR-003 and FR-004 and their Acceptance
  Scenario 2.
- Read `js/data/modules/03-data-safety.js` in full before editing. Study
  its existing four category sections closely -- each follows the same
  shape: a `heading`, a `body` of 1 short paragraph explaining *why* the
  category is dangerous (not just naming it), and (for three of the four)
  `glossaryTerms` defining any jargon introduced (`personal access token
  (PAT)`, `API key`, `SSH key`, `secret`). Match this exact pattern for
  the new categories.
- **Do not touch** the module's existing `labs` array or its
  `module-3-spot-mistake` config -- this WP is content-only per plan.md's
  IC-03. (The original mission's spec Assumptions note this lab is
  low-stakes/retriable; optionally extending it with 1-2 more graded
  examples covering the new categories was considered during planning but
  intentionally left out of this WP's scope to keep it a clean,
  content-only change -- do not add new spot-mistake items here.)
- Keep each new category as concrete and concise as the four existing ones
  (~1 short paragraph each) -- do not let the module balloon into a much
  longer read than it already is.
- This module already explains data safety at a genuinely careful, plain
  level (NFR-001) -- match that register exactly; do not introduce jargon
  the four existing categories don't already model defining.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/safety-judgment-additions
- **Merge target branch**: feat/safety-judgment-additions

## Subtasks & Detailed Guidance

### Subtask T008 – Author the two new categories, the "when in doubt" rule, and the safe-example contrast

- **Purpose**: Broaden what counts as unsafe to paste, and show the other
  side of the line too.
- **Steps**:
  1. Add a new content-section entry for "Proprietary or internal company
     information" (or similar heading matching the module's existing
     naming style, e.g. "Customer or client data" is the existing
     pattern) -- cover internal documents, strategy, and similar
     non-public business information, explaining *why* it's risky to
     paste (competitive harm, breach of confidentiality obligations,
     same "you've lost control of where it goes" logic the module
     already uses for customer data).
  2. Add a new content-section entry broadening personal data beyond
     customer/client records -- employee information, financial account
     numbers, health-related information. Can be its own section or
     reasonably folded into an expansion of the existing "Customer or
     client data" section if that reads more naturally -- your call, but
     keep the "why" explanation as concrete as the existing categories.
  3. Add a short "when in doubt, don't paste -- use placeholders" rule.
     This can be its own brief section or a closing paragraph within one
     of the above -- keep it short (1-2 sentences) and actionable (e.g.
     illustrate "placeholder" with a quick example like replacing a real
     name/number with `[name]`/`[amount]`).
  4. Add one concrete example of data that **is** safe to paste (public
     or already-anonymized information) -- so the module doesn't read as
     "never paste anything." Keep it clearly contrastive against the
     unsafe categories (e.g. a public blog post excerpt -- consistent
     with the existing spot-mistake lab's own "blog-headline" example
     already using this exact contrast).
- **Files**: `js/data/modules/03-data-safety.js`
- **Parallel?**: [P] -- independent of T009 (different section of the
  same array; low collision risk, land in either order).

### Subtask T009 – Author the closing "don't use AI at all" section

- **Purpose**: Teach judgment about when the tool itself is the wrong
  choice, not just what's unsafe to type into it.
- **Steps**:
  1. Add a new content-section entry, heading "Sometimes the right answer
     is: don't use AI at all," as the module's closing section (after the
     categories from T008).
  2. Cover concrete situations, not abstract ones: you don't understand
     what you're asking it to do; the information involved is extremely
     sensitive; the cost of a mistake would be high; you need guaranteed
     accuracy; you already know how to do the task faster yourself; the
     decision should stay yours to make.
  3. Frame this as building judgment ("here's how to recognize when to
     step back"), not as a rule to memorize -- match the module's
     existing tone, which explains *why*, not just *what*.
- **Files**: `js/data/modules/03-data-safety.js`
- **Parallel?**: [P] -- independent of T008 (different section).

### Subtask T010 – Manual browser verification

- **Purpose**: Confirm everything renders correctly in the existing
  visual style.
- **Steps**:
  1. Start the local preview server, open Module 3, and read through the
     whole module top to bottom.
  2. Confirm the two new categories, the "when in doubt" rule, and the
     safe-example contrast all render with the same list/paragraph
     styling as the four existing categories (no unstyled `<ul>`/`<li>`,
     no missing spacing -- this app's content styling was fixed earlier
     this project; confirm it still applies correctly to your new HTML).
  3. Confirm the closing "don't use AI at all" section renders clearly as
     the module's final content section, before the existing
     `spot-mistake` lab.
  4. Confirm the existing `spot-mistake` lab still works exactly as
     before (unaffected by this WP's changes).
  5. Check the browser console for errors.
- **Files**: none changed -- verification only.
- **Parallel?**: No -- final step, depends on T008 and T009.

## Risks & Mitigations

- **Risk**: New categories/sections balloon the module's length well
  beyond its existing four categories, making it feel like a much bigger
  read. **Mitigation**: keep each new section to roughly the same length
  as the existing categories; read the whole module back after adding
  content and confirm it doesn't feel disproportionately long.
- **Risk**: The safe-example contrast accidentally undercuts the safety
  message (e.g. picks an example that's actually borderline sensitive).
  **Mitigation**: pick something unambiguously public (a public blog post,
  a press release) -- when in doubt, err toward the most obviously-safe
  example, not a marginal one.

## Review Guidance

- Confirm all new content follows the exact same HTML-string authoring
  pattern already used in this file (no markdown, no new formatting
  conventions).
- Confirm no jargon is introduced without a plain-language explanation
  (NFR-001) -- this module already models this well; new content should
  match.
- Load Module 3 in the browser and visually confirm new sections render
  in the app's existing card/list styling, not as raw unstyled HTML.

## Activity Log

**Initial entry**:

- 2026-09-04T11:10:00Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP03 --to <status>` to change WP status.
