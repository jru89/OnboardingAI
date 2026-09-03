---
work_package_id: WP07
title: 'Module Content: Orientation Through Prompting 101 (Modules 1-6)'
dependencies:
- WP04
- WP05
- WP06
requirement_refs:
- FR-003
- FR-004
- FR-005
- FR-006
- FR-007
- FR-008
- FR-009
- FR-010
tracker_refs: []
subtasks:
- T030
- T031
- T032
- T033
- T034
- T035
phase: Phase 3 - Content
assignee: ''
agent: claude
history:
- at: '2026-09-03T14:08:39Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/data/modules/01-get-oriented.js
create_intent:
- js/data/modules/01-get-oriented.js
- js/data/modules/02-ai-vs-claude-code.js
- js/data/modules/03-data-safety.js
- js/data/modules/04-repos.js
- js/data/modules/05-mcp-servers.js
- js/data/modules/06-prompting-101.js
execution_mode: code_change
model: ''
owned_files:
- js/data/modules/01-get-oriented.js
- js/data/modules/02-ai-vs-claude-code.js
- js/data/modules/03-data-safety.js
- js/data/modules/04-repos.js
- js/data/modules/05-mcp-servers.js
- js/data/modules/06-prompting-101.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP07 – Module Content: Orientation Through Prompting 101 (Modules 1-6)

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Real, finished lesson content and lab configuration for the first six
modules, each exported as its own file per `js/data/modules/<NN-slug>.js`
(this per-file split is a task-phase refinement over `plan.md`'s single-file
sketch, made specifically so this WP and WP08 can own disjoint files — see
`tasks.md`'s note at the top). On completion:

- Each of the six files default-exports a `Module` object matching
  `data-model.md`'s shape (`id, order, title, summary, content, labs`).
- Every technical term used is either explained inline or given a
  `glossaryTerms` entry on first use (NFR-003) — this is the most
  labor-intensive requirement in this WP; do not skip it for "obvious"
  terms like "repo" or "prompt."
- Every module's lab `config` is filled with **real, finished** exercise
  content (not placeholder Lorem Ipsum) — spot-check against
  `spec.md`'s Functional Requirements table for exactly what each module's
  content and lab must cover.

## Context & Constraints

- Read [`spec.md`](../spec.md) FR-003 through FR-010 (the content
  requirements for Modules 1-6) and the chronological lab list agreed with
  the stakeholder during the specify-phase conversation (recapped per
  module below).
- Read [`data-model.md`](../data-model.md) for the exact `Module`/`Content
  Section`/`Lab` shapes, and each relevant lab engine's config shape from
  WP04/WP05/WP06 (`prompt-builder`, `checklist`, `match`, `spot-mistake`) —
  read those WPs' Activity Logs for any shape decisions made during
  implementation (e.g. WP04's chosen `purposeKey` values, WP05's T024
  match-lab shape resolution).
- This WP does **not** create `js/data/modules/index.js` (that's WP08's
  T042, since WP08 runs after this WP and needs both halves to exist first).
- No SVG diagrams exist yet (WP10) — reference diagram paths that WP10 will
  create (e.g. `assets/svg/interface-map.svg`,
  `assets/svg/repo-folder-tree.svg`) even though the files don't exist yet;
  WP10 depends on this WP's content to know what to draw.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab

## Subtasks & Detailed Guidance

### Subtask T030 – Author Module 1: Get Oriented (FR-003)

- **Purpose**: Interface orientation before any conceptual content.
- **Content to write**: a labeled walkthrough of the Claude Code interface
  (where to type, where project/file context shows up, what a permission
  prompt looks like) referencing `assets/svg/interface-map.svg` (WP10), plus
  a link to Anthropic's official Claude Code introductory video/docs (find
  the current official URL — do not guess or fabricate one; if uncertain,
  link to Anthropic's documentation site's Claude Code section as the safer
  general-purpose link).
- **Lab**: `type: "checklist"`, 3-5 items (e.g. "find the input box," "open
  a project," "recognize a permission prompt").
- **Files**: `js/data/modules/01-get-oriented.js`
- **Parallel?**: [P]

### Subtask T031 – Author Module 2: What Is AI / Claude Code vs. LLM (FR-004)

- **Purpose**: Conceptual grounding.
- **Content to write**: what an LLM is, what makes Claude Code different
  (tool use, file access, multi-step execution), including a comparison
  table (plain HTML table via the content section's body, or a small SVG if
  a table doesn't render well — prefer plain HTML table, simpler and no
  WP10 dependency).
- **Lab**: `type: "match"`, sort/bucket exercise — statements bucketed as
  "true of any chatbot" vs. "specific to Claude Code" (use the shape WP05
  settled on in its T024).
- **Files**: `js/data/modules/02-ai-vs-claude-code.js`
- **Parallel?**: [P]

### Subtask T032 – Author Module 3: Data Safety (FR-005, FR-006)

- **Purpose**: What must never be pasted into an AI chat.
- **Content to write**: client/customer data, personal access tokens, SSH
  private keys, passwords/secrets — explain *why* each is dangerous, not
  just list them.
- **Lab**: `type: "spot-mistake"` (WP06's engine) — several realistic chat
  snippets, at least one containing an unsafe paste (e.g. a snippet that
  includes a fake-but-realistic-looking API key or SSH key fragment; do
  **not** use any real credential format tied to a real service in a way
  that could be mistaken for genuine — use obviously placeholder values
  like `sk-EXAMPLE...` or `-----BEGIN EXAMPLE KEY-----`).
- **Files**: `js/data/modules/03-data-safety.js`
- **Parallel?**: [P]

### Subtask T033 – Author Module 4: Repos (FR-007)

- **Purpose**: What a repository and repo folder are.
- **Content to write**: explain repos/folders and typical contents
  (README, source folders, config, docs), referencing
  `assets/svg/repo-folder-tree.svg` (WP10).
- **Lab**: `type: "match"` — matches common file/folder names (`README.md`,
  `src/`, `docs/`, `.gitignore`) to short descriptions of what belongs
  there.
- **Files**: `js/data/modules/04-repos.js`
- **Parallel?**: [P]

### Subtask T034 – Author Module 5: MCP Servers (FR-008)

- **Purpose**: What an MCP server is, in plain language.
- **Content to write**: explain MCP servers and what belongs in an MCP
  configuration, avoiding unexplained jargon (NFR-003 applies especially
  hard here — this is the most technical module).
- **Lab**: `type: "match"` — short scenario Q&A ("would this go in an MCP
  config?") with 3-4 scenarios.
- **Files**: `js/data/modules/05-mcp-servers.js`
- **Parallel?**: [P]

### Subtask T035 – Author Module 6: Prompting 101 (FR-009, FR-010)

- **Purpose**: The role-context-task-format structure and golden rules.
- **Content to write**: the role-context-task-format structure, and the
  golden rules (be specific, state what good looks like, state the format,
  set constraints, one goal at a time, give tone, show an example, iterate)
  — this is the most important lesson in the course; give it real depth,
  including a short worked example.
- **Lab**: `type: "prompt-builder"`, `purposeKey: "prompting-101"` (must
  match exactly what WP04 used/documented — check its Activity Log).
- **Files**: `js/data/modules/06-prompting-101.js`
- **Parallel?**: [P]

## Risks & Mitigations

- **Risk**: NFR-003 (no undefined jargon) is easy to satisfy for the first
  module and easy to forget by the sixth. **Mitigation**: keep a running
  list of terms already defined (in this WP's Activity Log) and check new
  modules against it — a term defined in Module 1 doesn't need
  re-defining in Module 6, but a new term does.
- **Risk**: `purposeKey` / lab-config shape mismatches with what WP04/05/06
  actually implemented. **Mitigation**: read those WPs' Activity Logs
  before writing config, not just their prompt files — implementation
  details sometimes diverge slightly from the plan during real
  implementation, and the Activity Log is the source of truth for what
  actually shipped.

## Review Guidance

- Spot-check each module's content against its FR in `spec.md` — does it
  actually cover everything the FR requires, not just something adjacent?
- Confirm no undefined jargon slipped through (NFR-003).
- Confirm each lab's `config` shape matches what its engine (WP04/05/06)
  actually expects — load each module in the running app and confirm the
  lab renders and functions, not just that the data file has no syntax
  errors.

## Activity Log

**Initial entry**:

- 2026-09-03T14:08:39Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP07 --to <status>` to change WP status.
