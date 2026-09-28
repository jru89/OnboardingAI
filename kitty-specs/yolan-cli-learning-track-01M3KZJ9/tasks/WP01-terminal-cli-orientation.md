---
work_package_id: WP01
title: Terminal & CLI Orientation
dependencies: []
requirement_refs:
- FR-003
- FR-004
- FR-005
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
subtasks:
- T001
- T002
- T003
- T004
phase: Phase 1 - Content (Wave 1)
assignee: ''
history:
- at: '2026-09-28T00:00:00Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/data/modules/
create_intent:
- js/data/modules/terminal-basics.js
- js/data/modules/make-your-terminal-yours.js
- js/data/modules/claude-code-cli-orientation.js
execution_mode: code_change
model: ''
owned_files:
- js/data/modules/terminal-basics.js
- js/data/modules/make-your-terminal-yours.js
- js/data/modules/claude-code-cli-orientation.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP01 – Terminal & CLI Orientation

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Author the three modules that open Yolan's CLI-first track: absolute
beginner terminal literacy, a prescribed terminal-styling stack, and
CLI-specific Claude Code orientation. These are three brand-new files --
nothing else in this mission touches them, and they touch nothing else.

- FR-003: "Terminal Basics" teaches `pwd`, `cd`, `ls`, `mkdir`, `mv`, `cp`,
  `rm`, editing a file from the CLI, and running a script.
- FR-004: "Make Your Terminal Yours" walks Homebrew -> iTerm2 -> Oh My Zsh
  (theme + 2+ plugins), then how to find more add-ons independently.
- FR-005: "Claude Code, from the Command Line" covers launching Claude
  Code, recognizing a terminal-based permission prompt, and asking for
  help when stuck -- with zero assumption an IDE panel is available.

## Context & Constraints

- **No dependencies** -- this WP can start immediately in parallel with
  WP02 and WP03.
- Read [`spec.md`](../spec.md) FR-003, FR-004, FR-005, NFR-001, NFR-002,
  NFR-004, and Acceptance Scenarios 2 and 3.
- Read [`data-model.md`](../data-model.md)'s Module shape and the
  "Display-numbering derivation" note (you don't need to touch numbering
  yourself -- WP04 handles it -- but it explains why your modules' own
  `order` field only needs to describe their position *within Yolan's
  track specifically*: 1, 2, 3 respectively for the three modules here).
- Read [`research.md`](../research.md)'s first two entries (Ghostty vs.
  Monterey, Homebrew Intel path) before writing "Make Your Terminal
  Yours" -- both decisions are already made; do not re-litigate them.
- **Device accuracy is the highest-risk part of this WP (NFR-004)**: every
  command in "Make Your Terminal Yours" must actually work on an **Intel**
  Mac running **macOS Monterey 12.7.6**. Do not prescribe Ghostty (it
  requires macOS 13+). Do not use Apple-Silicon-only paths.

### Module authoring reference (read this before writing any file)

Every module file is an ES module with a default export shaped exactly
like the app's existing 12 modules. Look at
[`js/data/modules/01-get-oriented.js`](../../../js/data/modules/01-get-oriented.js)
for a concrete, currently-live example (it's also the closest thematic
cousin to this WP's "Claude Code, from the Command Line" module -- its
IDE-focused version was recently rewritten, so this WP's module is the
deliberate CLI counterpart, not a copy of it: same *shape*, different
*content*).

```js
export default {
  id: "terminal-basics",        // kebab-case, stable, unique app-wide
  order: 1,                      // this module's position WITHIN YOLAN'S TRACK ONLY (see above)
  title: "Terminal Basics",
  summary: "One sentence shown on the module card.",
  content: [
    {
      heading: "A section heading",
      body: "<p>HTML string -- hand-authored, no markdown parser (data-model.md).</p>",
      glossaryTerms: [
        { term: "terminal", definition: "Plain-language definition." },
      ],
    },
    // more sections...
  ],
  labs: [
    {
      id: "module-terminal-basics-checklist",  // kebab-case, unique within this module
      type: "checklist",
      graded: false,
      config: [
        { id: "ran-pwd", label: "Ran `pwd` to see where you are" },
        // more items...
      ],
    },
  ],
};
```

- **HTML body convention**: `body` strings use inline HTML (`<p>`,
  `<strong>`, `<code>`, `<pre>`, `<ul>`/`<li>`, `<ol>`/`<li>`) exactly like
  the existing modules -- open any of `01-get-oriented.js` through
  `12-graduation.js` for the house style (short paragraphs, `<strong>` for
  first-use of a defined term, `<code>` for literal commands/filenames,
  `<pre>` for multi-line examples).
- **Glossary terms (NFR-001)**: every new term this WP introduces must be
  defined either inline in prose or via `glossaryTerms` on first use --
  e.g. "terminal," "shell," "prompt" (if not already covered by the
  reused Module 2), "package manager," "shell profile," "plugin."
- **Tone**: this app's established style for Yolan-adjacent advanced
  content is direct and assumes intelligence but zero prior terminal
  exposure -- explain *why* a step matters, not just *what* to type. Match
  the plain, warm-but-precise register of the existing modules (no
  jargon left undefined, no filler).
- **Design system (NFR-003)**: no new CSS classes, colors, or components
  -- `<pre>` blocks, `glossaryTerms`, and the existing lab types already
  cover everything these modules need.

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab
- Execution worktrees are allocated per computed lane from `lanes.json`
  once `/spec-kitty.tasks` finalizes -- do not create your own worktree by
  hand.

## Subtasks & Detailed Guidance

### Subtask T001 – Author "Terminal Basics"

- **Purpose**: True beginner terminal literacy -- Yolan has never used a
  terminal before this module.
- **Steps**:
  1. Create `js/data/modules/terminal-basics.js` with `id: "terminal-basics"`,
     `order: 1`.
  2. Content sections, in order:
     - **What is a terminal, and why does Yolan need one** -- one short
       section explaining a terminal is how he'll talk to Claude Code
       directly, since his Mac can't run the IDE version. Keep this
       framed around the *reason* (his device), not a value judgment
       about CLI vs. IDE.
     - **Finding your way around** -- `pwd` (where am I), `cd` (change
       directory, including `cd ..` and `cd ~`), `ls` (what's here,
       mention `ls -la` for hidden files briefly).
     - **Making and moving things** -- `mkdir`, `touch` or an equivalent
       "create an empty file" mention, `mv` (move/rename -- explain it's
       both), `cp`, `rm` (with an explicit caution: no trash/undo, unlike
       Finder).
     - **Editing a file from the CLI** -- at minimum, opening a file in
       a simple editor from the terminal (e.g. `nano` -- ships with
       macOS, genuinely beginner-friendly, no modal-editing surprises
       like `vim`). Cover save/exit.
     - **Running a script** -- what a script is in one sentence, and
       running one (e.g. `bash somefile.sh` or `./somefile.sh` after
       `chmod +x`) -- keep this brief; deeper scripting isn't this
       module's job.
  3. Define every new term via `glossaryTerms` or inline on first use:
     terminal, command, argument/flag, directory/folder (if not treated
     as synonyms already), script.
  4. Lab: a `checklist` lab (see reference above) listing each command
     category as a self-marked "I tried this" item (pwd/cd/ls, mkdir/mv/
     cp/rm, edited a file, ran a script) -- 4-6 items, non-graded.
- **Files**: `js/data/modules/terminal-basics.js` (new)
- **Parallel?**: [P] -- independent of T002/T003 (different files).

### Subtask T002 – Author "Make Your Terminal Yours"

- **Purpose**: A prescribed default terminal-styling stack, then guidance
  on finding more independently -- see the answered clarifying question in
  `docs/planning/yolan-track-plan.md` ("Terminal styling: prescriptive --
  give him a good default stack... then show him how to search/evaluate
  more on his own").
- **Steps**:
  1. Create `js/data/modules/make-your-terminal-yours.js` with
     `id: "make-your-terminal-yours"`, `order: 2`.
  2. Content sections, in order:
     - **Homebrew** -- what it is (a package manager -- installs
       command-line software), the official install command (have him
       copy it from `brew.sh`'s own current instructions rather than
       hardcoding a version-specific one-liner that could drift -- but
       DO explicitly state: "the installer will print a couple of lines
       starting with `eval` near the end -- copy and run those exactly as
       shown, that's what puts `brew` on your PATH" so he isn't stuck if
       `brew` isn't found immediately after install; this is the
       Intel-vs-Apple-Silicon-safe approach per `research.md`).
     - **iTerm2, not Ghostty** -- install iTerm2 via Homebrew
       (`brew install --cask iterm2`) or direct download. Include one
       sentence explaining *why* iTerm2 and not the more commonly
       recommended Ghostty: "Ghostty needs a newer macOS than yours
       (13+) -- iTerm2 works great on Monterey and is the standard choice
       for exactly this kind of setup." Add a short, clearly-marked
       aside: "Once you're on a newer Mac, Ghostty is worth trying --
       nothing here locks you out of switching later."
     - **Oh My Zsh** -- install command, then: pick one theme (name a
       specific one to start with, e.g. the default `robbyrussell` or a
       popular alternative -- your call, state it plainly as a starting
       point, not the only option), and add at least two plugins by name
       with one line each on what they do (e.g. a git-status-in-prompt
       plugin, an autosuggestions plugin) and how to enable them (editing
       the `plugins=(...)` line in `~/.zshrc`).
     - **Finding more on your own** -- close with concrete guidance on
       *how* to search for and evaluate further terminal add-ons: search
       "oh-my-zsh plugins" or "iTerm2 profiles," check a plugin's GitHub
       stars/last-updated date before installing, and try one at a time
       so you know what changed if something breaks.
  3. Define new terms via `glossaryTerms`: package manager, shell,
     `.zshrc` / shell profile (in plain language -- "a file your terminal
     reads every time it starts"), plugin, theme.
  4. Lab: a `checklist` lab -- "Installed Homebrew," "Installed iTerm2,"
     "Installed Oh My Zsh," "Picked a theme," "Added at least one plugin"
     (5 items, non-graded).
- **Files**: `js/data/modules/make-your-terminal-yours.js` (new)
- **Parallel?**: [P] -- independent of T001/T003 (different files).
- **Accuracy check**: before marking this subtask done, re-read every
  command against Homebrew's and iTerm2's own current documentation (not
  from memory alone) to confirm nothing assumes Apple Silicon or macOS
  13+. This is the highest-risk subtask in this WP (NFR-004).

### Subtask T003 – Author "Claude Code, from the Command Line"

- **Purpose**: CLI-specific orientation -- the direct counterpart to the
  shared app's IDE-focused Module 1, for someone who will only ever see
  Claude Code in a terminal.
- **Steps**:
  1. Create `js/data/modules/claude-code-cli-orientation.js` with
     `id: "claude-code-cli-orientation"`, `order: 3`.
  2. First, read
     [`js/data/modules/01-get-oriented.js`](../../../js/data/modules/01-get-oriented.js)
     in full -- it's the shared IDE-framed module this one is the CLI
     counterpart to. Match its *shape and rigor* (three things to look
     for, permission prompts, "Claude can do more than answer you," a
     link to official docs) but reframe everything around a terminal
     session, not an editor panel. Do not copy its prose -- the IDE
     framing (panel next to your files, activity bar, etc.) is wrong
     here.
  3. Content sections, in order:
     - **Launching Claude Code** -- opening a terminal, navigating (`cd`)
       into a project folder, and starting a Claude Code session there.
       Reinforce that Claude Code only sees/changes files inside that
       folder (same rule as the IDE version, different mechanism for
       "being there").
     - **What you'll see** -- the input prompt where he types in plain
       English, and how a terminal-based permission prompt looks/behaves
       (a clear yes/no choice printed in the terminal, nothing happens
       until he answers) -- mirror the shared module's "stop and
       understand before approving" guidance.
     - **When you're stuck, ask** -- directly addresses the plan's "the
       habit of asking Claude Code when he's stuck rather than guessing"
       goal: if a command fails, an install step doesn't work, or he
       doesn't know the right terminal command for something, describing
       the problem to Claude Code in plain English is a completely normal
       thing to do -- that's what it's there for.
     - **See it in action** -- reuse the same official-docs link pattern
       as the shared Module 1 (`https://docs.claude.com/en/docs/claude-code/overview`).
  4. Define new terms via `glossaryTerms` as needed (many, like "Claude
     Code," "project," "permission prompt," are already defined in the
     shared Module 2/reused modules elsewhere in Yolan's track -- do not
     re-define a term that's already covered by a module earlier in his
     track; only define what's genuinely new here, e.g. anything specific
     to a terminal session vs. an IDE panel).
  5. Lab: a `quiz` lab mirroring the shared Module 1's "Would you allow
     this?" permission-judgment exercise (5 items, `options: ["Allow",
     "Don't allow", "Not sure -- inspect first"]`, each with a short
     `explanation`) -- adapt the scenarios to read naturally in a terminal
     context (they already do -- "Claude Code asks: ..." works
     identically whether the prompt appeared in a panel or a terminal) --
     reuse the shared module's five scenarios and explanations as a
     starting point rather than inventing new ones, since the underlying
     judgment lesson is identical.
- **Files**: `js/data/modules/claude-code-cli-orientation.js` (new)
- **Parallel?**: [P] -- independent of T001/T002 (different files).

### Subtask T004 – Manual browser verification of all three modules

- **Purpose**: Confirm all three modules render correctly on their own,
  before WP04 wires them into Yolan's actual track.
- **Steps**:
  1. Start the local preview server.
  2. Since these modules aren't wired into any track yet (WP04's job),
     verify each by temporarily navigating directly to its hash route
     (e.g. `#/module/terminal-basics`) -- `module-view.js`'s existing
     `getModule()` fallback means an unwired id still renders once the
     file exists and is imported somewhere reachable; if it does not
     render this way in your test environment, temporarily and
     **reversibly** add a one-line import + push into the default
     `modules` array in `index.js` purely to preview locally, then
     **revert that temporary change before finishing this WP** -- WP04
     owns the real wiring and a leftover temporary edit here would
     conflict with it.
  3. For each module: confirm all content sections render, all glossary
     terms expand/collapse correctly, and the lab mounts and is
     interactable (checklist items check/uncheck for T001/T002; quiz
     options are selectable and show explanations after choosing for
     T003).
  4. Resize to 360px width and re-check all three modules for layout
     breakage (NFR-002), including any `<pre>` blocks in "Make Your
     Terminal Yours."
  5. Re-read all three modules' content once more end-to-end and confirm
     no term is used without a plain-language explanation or glossary
     entry (NFR-001).
  6. Check the browser console for errors on all three modules.
- **Files**: none changed -- verification only (beyond the strictly
  temporary, reverted preview wiring described in step 2).
- **Parallel?**: No -- final step, depends on T001, T002, and T003.

## Risks & Mitigations

- **Risk**: "Make Your Terminal Yours" silently assumes Apple Silicon
  (the far more common target of general-audience tutorials right now),
  breaking on Yolan's actual Intel machine. **Mitigation**: T002's
  explicit accuracy check against current Homebrew/iTerm2 docs, not
  memory of generic tutorials.
- **Risk**: The CLI orientation module (T003) accidentally re-imports IDE
  framing (a "panel," an "activity bar") by copying too closely from the
  shared Module 1. **Mitigation**: read the shared module first for shape
  only, then write CLI content from scratch, not by find-and-replace.
- **Risk**: Terms already covered by earlier modules in Yolan's track
  (e.g. "Claude Code," "permission prompt" from the reused Module 2) get
  redundantly redefined here, cluttering the glossary. **Mitigation**:
  T003's explicit instruction to only define what's genuinely new to this
  module.

## Review Guidance

- Confirm no command in "Make Your Terminal Yours" requires macOS 13+ or
  an Apple Silicon-only path, and that Ghostty is explicitly *not*
  prescribed (only mentioned as a future option).
- Confirm "Claude Code, from the Command Line" contains no IDE-panel
  framing (no "panel," "activity bar," "docked," or similar).
- Confirm the T003 quiz lab has 5 items with explanations, matching the
  judgment lesson (not necessarily the exact wording) of the shared
  Module 1's permission-judgment exercise.
- Load all three modules in the browser at desktop and 360px width and
  confirm no layout breakage, and that no undefined term appears.

## Activity Log

**Initial entry**:

- 2026-09-28T00:00:00Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP01 --to <status>` to change WP status.
