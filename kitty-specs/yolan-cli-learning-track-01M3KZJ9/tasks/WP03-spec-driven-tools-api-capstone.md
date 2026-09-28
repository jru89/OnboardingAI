---
work_package_id: WP03
title: Spec-Driven Dev, Building Tools, API Taste & Capstone
dependencies: []
requirement_refs:
- FR-013
- FR-014
- FR-015
- FR-017
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
base_branch: kitty/mission-yolan-cli-learning-track-01M3KZJ9
base_commit: 3b4db51cb383b4c390afe3107e4bc5c7f6e47231
created_at: '2026-09-28T17:40:17.361380+00:00'
subtasks:
- T009
- T010
- T011
- T012
- T013
phase: Phase 1 - Content (Wave 1)
assignee: ''
shell_pid: "22972"
agent: "claude:sonnet-5:reviewer-renata:reviewer"
history:
- at: '2026-09-28T00:00:00Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/data/modules/
create_intent:
- js/data/modules/spec-driven-development.js
- js/data/modules/building-your-own-tools.js
- js/data/modules/claude-api-taste.js
- js/data/modules/capstone-ship-a-real-tool.js
execution_mode: code_change
model: ''
owned_files:
- js/data/modules/spec-driven-development.js
- js/data/modules/building-your-own-tools.js
- js/data/modules/claude-api-taste.js
- js/data/modules/capstone-ship-a-real-tool.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP03 – Spec-Driven Dev, Building Tools, API Taste & Capstone

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Author the four modules that close out Yolan's track: spec-driven
development methodology, building custom tools inside Claude Code, a
minimal taste of the Claude API, and the capstone that has him ship one
real small tool. Four brand-new files -- nothing else in this mission
touches them.

- FR-013: "Spec-Driven Development" teaches the spec -> plan -> tasks ->
  review methodology tool-agnostically, then Spec Kitty as the concrete
  example.
- FR-014: "Building Your Own Tools with Claude Code" covers custom slash
  commands, skills, and subagents.
- FR-015: "A Taste of the Claude API" introduces a minimal standalone
  program using the Claude API directly.
- FR-017: "Capstone: Ship a Real Tool" has him pick, build, verify, and
  publish one real small tool, and cross-references the Data Safety
  lesson.

## Context & Constraints

- **No dependencies** -- start immediately in parallel with WP01 and WP02.
- Read [`spec.md`](../spec.md) FR-013, FR-014, FR-015, FR-017, NFR-001,
  NFR-002, NFR-005, C-002, C-005, and Acceptance Scenarios 5 and 6.
- Read [`research.md`](../research.md)'s last three entries (Claude Code
  extensibility example, Spec-driven development + Spec Kitty, Claude API
  "taste" scope boundary) before writing -- all three decisions are
  already made.
- Read `docs/planning/yolan-track-plan.md`'s "Examples flavor -- confirmed
  (from Yolan directly)" and "Privacy note" sections before writing the
  Capstone module -- this is the **only** module in this WP allowed to
  reference Yolan's own project ideas, and only at the generality already
  established there (no direct quotes, no identifying specifics beyond
  what's already documented).
- **"Spec-Driven Development" and "Building Your Own Tools with Claude
  Code" are written for future reuse (C-005)**: Wim's own future mission
  is expected to wire these exact files into his track unmodified. Write
  them generically -- no Yolan-specific framing anywhere in either file.
  "A Taste of the Claude API" and "Capstone: Ship a Real Tool" are
  **not** marked for reuse and may be Yolan-specific where it helps (the
  Capstone module in particular should be).
- **This mission itself is a live example**: this exact mission
  (`kitty-specs/yolan-cli-learning-track-01M3KZJ9/`) was produced via
  `spec.md` -> `plan.md` -> `tasks.md` -> this WP prompt, using Spec
  Kitty, in this exact repo. You may reference the general shape of that
  sequence (spec, then plan, then tasks, then implement/review) as a real,
  walkable example without needing to invent a hypothetical one -- but do
  not tell the learner to go read this mission's own files; describe the
  pattern, don't assign homework inside this repo's internals.
- This app's own `.claude/skills/` directory (and the many Spec Kitty
  skills visible throughout this repo) is a legitimate, already-verified
  real-world example of "a project keeps a folder of custom
  skills/commands that Claude Code loads automatically" for "Building Your
  Own Tools" -- reference the *pattern* conceptually, not instructions to
  go modify this specific repo.

### Module authoring reference (read this before writing any file)

Same shape as every other module in this app -- see
[`js/data/modules/06-prompting-101.js`](../../../js/data/modules/06-prompting-101.js)
(reused elsewhere in Yolan's track, right before this WP's modules) for
the closest example of a `prompt-builder` lab in context, and
[`js/data/modules/12-graduation.js`](../../../js/data/modules/12-graduation.js)
for the shared app's existing capstone-style module (deliberately lean --
your Capstone module should follow that same spirit: a clear goal, not a
sprawling worksheet).

```js
export default {
  id: "spec-driven-development",
  order: 11,                     // position WITHIN YOLAN'S TRACK ONLY -- see data-model.md
  title: "Spec-Driven Development",
  summary: "One sentence shown on the module card.",
  content: [ /* { heading, body: "<p>HTML...</p>", glossaryTerms? } */ ],
  labs: [ /* see per-subtask lab guidance below */ ],
};
```

Order values for this WP's four modules within Yolan's 15-module track:
`spec-driven-development` -> `order: 11`, `building-your-own-tools` ->
`order: 12`, `claude-api-taste` -> `order: 13`,
`capstone-ship-a-real-tool` -> `order: 15`.

- **`prompt-builder` lab config shape**:
  `{ purposeKey: string, task: string, placeholders: { role, context, task, format, constraints?, tone?, example? } }`
  -- `purposeKey` MUST be a unique string not used anywhere else in the
  app (existing values: `"prompting-101"`, `"prompting-201-rewrite"`,
  `"automate-a-task"`, `"readme-exercise"` -- pick a new, distinct one for
  this WP's usage, e.g. `"building-your-own-tools"`). See
  [`js/views/labs/prompt-builder-lab.js`](../../../js/views/labs/prompt-builder-lab.js)'s
  header comment for the full contract.
- **`quiz` lab config**: array of `{ id, question, options: string[], correctIndex, explanation? }`.
- **`checklist` lab config**: bare array of `{ id, label }`.
- **Glossary terms (NFR-001)**: define every genuinely new term on first
  use (e.g. "spec," "skill," "subagent," "slash command," "API," "API
  key" if not already covered by the reused Data Safety module -- check
  first).

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab
- Execution worktrees are allocated per computed lane from `lanes.json`
  once `/spec-kitty.tasks` finalizes -- do not create your own worktree by
  hand.

## Subtasks & Detailed Guidance

### Subtask T009 – Author "Spec-Driven Development"

- **Purpose**: The spec -> plan -> tasks -> review methodology,
  tool-agnostically, then Spec Kitty as the concrete example.
- **Steps**:
  1. Create `js/data/modules/spec-driven-development.js`,
     `id: "spec-driven-development"`, `order: 11`.
  2. Content sections, in order:
     - **Why spec first** -- the general idea: writing down what you're
       building and why, before writing any code, catches ambiguity and
       scope drift early -- cheaper to fix on paper than after building
       the wrong thing.
     - **The loop** -- spec (what and why) -> plan (how, technically) ->
       tasks (concrete steps, grouped into reviewable chunks) -> build ->
       review -- described generically, with no tool name yet.
     - **Spec Kitty, as one concrete example** -- introduce it as a real
       tool that enforces exactly this loop, mention its command sequence
       at a high level (specify, then plan, then tasks, then implement/
       review) without a step-by-step install tutorial -- the goal is
       recognizing the pattern in a real tool, not becoming a Spec Kitty
       expert.
     - **Why this matters for him** -- ties back to his stated goal of
       building his own tools: a bigger personal project (per the
       generalized framing in `docs/planning/yolan-track-plan.md` -- do
       not quote his specific project ideas here, that's the Capstone
       module's job) benefits from this same discipline even without a
       formal tool -- a short written spec before starting is valuable on
       its own.
  3. Lab: a `quiz` lab -- 3-4 questions on the methodology (e.g. "what
     comes before a plan in this loop?", "what's the point of writing a
     spec before any code exists?", "what does 'tasks' break a plan
     into?"), each with an `explanation`.
- **Files**: `js/data/modules/spec-driven-development.js` (new)
- **Parallel?**: [P] -- independent of T010/T011/T012 (different files).

### Subtask T010 – Author "Building Your Own Tools with Claude Code"

- **Purpose**: Custom slash commands, skills, and subagents inside Claude
  Code -- written generically for future reuse (C-005).
- **Steps**:
  1. Create `js/data/modules/building-your-own-tools.js`,
     `id: "building-your-own-tools"`, `order: 12`.
  2. Content sections, in order:
     - **Why build your own** -- Claude Code isn't limited to what it
       ships with -- you can teach it your own repeatable
       commands/workflows so you don't re-explain the same thing every
       session.
     - **Custom slash commands** -- what they are (a shortcut that expands
       into a fuller instruction), roughly how they're defined (a small
       file Claude Code reads), one illustrative example (a made-up but
       plausible one, e.g. a `/daily-standup` command that expands into
       "summarize what changed in the last 24 hours in this project").
     - **Skills** -- a slightly richer version of the same idea: a
       packaged set of instructions for a recurring kind of task, that
       Claude Code can load when relevant. Mention, conceptually, that
       real projects keep a folder of these (this project's own is a real
       example you've verified exists, but reference it only as "some
       projects keep a folder of these" -- do not instruct the learner to
       go look at this repo).
     - **Subagents** -- a focused, separately-instructed helper Claude
       Code can delegate a sub-task to, for work that benefits from its
       own clean context.
     - **Getting started** -- practical next step: start small (one
       command for one annoying repeated task), see if it actually saves
       time, iterate.
  3. Write this section generically (C-005) -- no Yolan-specific framing.
  4. Lab: a `prompt-builder` lab, `purposeKey: "building-your-own-tools"`
     -- task: draft a plan for one custom command/skill he'd actually
     want, using the role -> context -> task -> format structure from the
     reused Prompting 101 module. `placeholders`: role (e.g. "You're an
     assistant helping me build a Claude Code command"), context (what
     repeated task this solves), task (what the command should do), format
     (optional/blank is fine -- this is more free-form than a typical
     prompt-builder usage), constraints/tone/example all optional.
- **Files**: `js/data/modules/building-your-own-tools.js` (new)
- **Parallel?**: [P] -- independent of T009/T011/T012 (different files).

### Subtask T011 – Author "A Taste of the Claude API"

- **Purpose**: A minimal standalone-program example using the Claude API
  directly -- explicitly "a taste," not a full tutorial (research.md's
  scope-boundary decision).
- **Steps**:
  1. Create `js/data/modules/claude-api-taste.js`,
     `id: "claude-api-taste"`, `order: 13`.
  2. Content sections, in order:
     - **Claude Code vs. the API directly** -- Claude Code is a whole
       assistant with a UI (terminal, in his case) built on top of
       Anthropic's API; the API itself is the raw building block -- you
       can write your own small program that sends it one message and
       gets a reply back, no chat interface at all.
     - **One minimal example** -- a short, concrete example: a small
       script that sends one message to the Claude API and prints the
       reply (language-agnostic in spirit, but pick one concrete language
       for the actual example -- Python or JavaScript, your call, note
       which and why briefly, e.g. "Python's official SDK is a common
       starting point"). Keep it to the one example -- do not add
       streaming, tool use, or multi-turn conversation (explicitly out of
       scope per research.md).
     - **Why this matters** -- once you can call the API directly, you can
       build your own small tools/apps with Claude's abilities baked in,
       not just use it through Claude Code's own interface.
     - **Where to go deeper** -- one line pointing at Anthropic's own API
       documentation as the place for anything beyond this minimal taste,
       rather than this module trying to be that reference itself.
  3. Define new terms via `glossaryTerms`: API, API key (check the reused
     Data Safety module first -- it likely already defines "API key"; if
     so, do not redefine, just reference it).
  4. Lab: a `checklist` lab -- "Got an API key," "Ran the example script,"
     "Saw a real reply printed," "Changed the prompt and ran it again"
     (4 items, non-graded).
- **Files**: `js/data/modules/claude-api-taste.js` (new)
- **Parallel?**: [P] -- independent of T009/T010/T012 (different files).

### Subtask T012 – Author "Capstone: Ship a Real Tool"

- **Purpose**: The final module -- pick, build, verify, and publish one
  real small tool, explicitly cross-referencing the Data Safety lesson.
- **Steps**:
  1. Create `js/data/modules/capstone-ship-a-real-tool.js`,
     `id: "capstone-ship-a-real-tool"`, `order: 15`.
  2. Read `docs/planning/yolan-track-plan.md`'s "Examples flavor" section
     in full before writing -- reuse only the generalized framing already
     there (a personal to-do app or reflection/self-management tool as
     strong starting candidates; a trajectory-planning app for an
     alternative school program as an explicit later stretch goal, *not*
     the capstone itself). Do not quote him directly or add any
     identifying specifics beyond what's already documented (NFR-005).
  3. Content sections, in order:
     - **Now build something real** -- everything up to this point has
       been practice; this module is the handoff to actually building
       something he wants, using everything covered so far (terminal,
       Claude Code, Git/GitHub, MCP if relevant, maybe spec-driven
       habits).
     - **Picking your tool** -- suggest, generically per the plan doc, a
       personal to-do app or a simple reflection/self-management tool as
       well-scoped starting candidates -- small enough to actually finish,
       already something he wants. Explicitly note a bigger, more
       ambitious idea is better saved for *after* this first one ships.
     - **Build, verify, publish** -- three plain steps: build a first
       working version; verify it actually does what you wanted (not just
       "it runs" -- try it for real); publish it (push it to GitHub, at
       minimum, per "GitHub & Hosting" from this same track).
     - **Before you start, one reminder** -- explicitly cross-reference
       the Data Safety module's "never paste real/proprietary data"
       lesson: if the tool ever touches anything sensitive (even his own
       personal data, if it's the kind he wouldn't want exposed), keep
       that in mind as he builds and shares it. Name the Data Safety
       module directly (e.g. "as covered in Data Safety, ...") without
       needing to quote its exact current wording.
  4. Lab: a `checklist` lab -- "Picked one real tool to build," "Built a
     first working version," "Verified it actually works," "Published it
     (e.g. pushed to GitHub)" (4 items, non-graded) -- deliberately mirrors
     the shared app's existing Graduation module's lean, non-hand-holding
     spirit (see `12-graduation.js`) rather than a sprawling worksheet.
- **Files**: `js/data/modules/capstone-ship-a-real-tool.js` (new)
- **Parallel?**: [P] -- independent of T009/T010/T011 (different files).

### Subtask T013 – Manual browser verification of all four modules

- **Purpose**: Confirm all four modules render correctly on their own,
  before WP04 wires them into Yolan's actual track.
- **Steps**:
  1. Start the local preview server.
  2. As in WP01/WP02's final subtasks: these modules aren't wired into any
     track yet. Verify each by temporarily, reversibly wiring it into
     `index.js`'s default array purely for local preview, then **revert
     that temporary change before finishing this WP** -- WP04 owns the
     real wiring.
  3. For each module: confirm all content sections render, glossary terms
     expand/collapse correctly, and the lab mounts and is interactable
     (quiz for T009, prompt-builder for T010, checklist for T011/T012).
  4. For T010's prompt-builder lab specifically: confirm its
     `purposeKey` (`"building-your-own-tools"`) doesn't collide with any
     existing usage (`"prompting-101"`, `"prompting-201-rewrite"`,
     `"automate-a-task"`, `"readme-exercise"`) -- grep the codebase to
     confirm before finishing.
  5. Resize to 360px width and re-check all four modules for layout
     breakage (NFR-002).
  6. Re-read all four modules' content once more end-to-end and confirm
     no term is used without a plain-language explanation or glossary
     entry (NFR-001); confirm "Spec-Driven Development" and "Building
     Your Own Tools" read generically with no Yolan-specific framing
     (C-005 self-check); confirm the Capstone module stays within the
     documented generality for Yolan's personal project references
     (NFR-005 self-check).
  7. Check the browser console for errors on all four modules.
- **Files**: none changed -- verification only (beyond the strictly
  temporary, reverted preview wiring described in step 2).
- **Parallel?**: No -- final step, depends on T009, T010, T011, and T012.

## Risks & Mitigations

- **Risk**: "Spec-Driven Development" turns into a Spec Kitty user manual
  instead of a methodology lesson. **Mitigation**: T009's explicit
  instruction to keep Spec Kitty as the illustration, not the subject, and
  to skip step-by-step install instructions.
- **Risk**: The Capstone module leaks more identifying detail about
  Yolan's real project ideas than `docs/planning/yolan-track-plan.md`'s
  privacy note allows. **Mitigation**: T012's explicit instruction to
  reuse only the already-documented generalized framing, plus the
  dedicated NFR-005 self-check in T013.
- **Risk**: "A Taste of the Claude API" scope-creeps into a fuller
  tutorial (streaming, tool use, multi-turn). **Mitigation**: T011's
  explicit "one example only" instruction, matching research.md's
  decision.
- **Risk**: T010's new `purposeKey` collides with an existing one, corrupting
  another module's saved draft. **Mitigation**: T013's explicit grep check
  before finishing.

## Review Guidance

- Confirm "Spec-Driven Development" and "Building Your Own Tools" contain
  no Yolan-specific framing (C-005) -- read them as if handing the file to
  Wim's future mission unmodified.
- Confirm the Capstone module's references to Yolan's own project ideas
  match `docs/planning/yolan-track-plan.md`'s generality exactly, with no
  added specifics.
- Confirm the Capstone module explicitly names the Data Safety module.
- Confirm the new `purposeKey` doesn't collide with any existing
  prompt-builder usage.
- Load all four modules in the browser at desktop and 360px width and
  confirm no layout breakage, and that no undefined term appears.

## Activity Log

**Initial entry**:

- 2026-09-28T00:00:00Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP03 --to <status>` to change WP status.
- 2026-09-28T17:41:19Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=19540 – Assigned agent via action command
- 2026-09-28T17:53:33Z – claude:sonnet-5:frontend-freddy:implementer – shell_pid=19540 – Ready for review
- 2026-09-28T17:54:22Z – claude:sonnet-5:reviewer-renata:reviewer – shell_pid=22972 – Started review via action command
- 2026-09-28T17:56:45Z – user – shell_pid=22972 – Verified: exactly the 4 owned files created (spec-driven-development.js, building-your-own-tools.js, claude-api-taste.js, capstone-ship-a-real-tool.js), index.js untouched. All export correct {id,order,title,summary,content,labs} shape with order 11/12/13/15 matching spec. spec-driven-development.js and building-your-own-tools.js read generically with zero Yolan-specific framing (C-005) and Spec Kitty stays an illustration (command sequence only, no install tutorial). claude-api-taste.js has exactly one Python example, no streaming/tool-use/multi-turn. capstone-ship-a-real-tool.js references Yolan's project ideas at or below the generality in yolan-track-plan.md's Examples flavor section (no direct quotes, trajectory-planning/school detail generalized further, not added to) and explicitly cross-references Data Safety by name. building-your-own-tools.js prompt-builder lab uses purposeKey "building-your-own-tools", confirmed non-colliding via grep against existing prompting-101/prompting-201-rewrite/automate-a-task/readme-exercise. All labs use existing engines (quiz/prompt-builder/checklist) with config shapes matching existing modules exactly (graded true for quiz, false for checklist/prompt-builder). Glossary terms (spec, Spec Kitty, slash command, skill, subagent, API) each defined once on first use with no duplication; API key correctly left undefined here since already defined in 03-data-safety.js. No unrelated files touched.
