---
work_package_id: WP02
title: Git, GitHub & MCP
dependencies: []
requirement_refs:
- FR-008
- FR-009
- FR-010
tracker_refs: []
planning_base_branch: feat/claude-code-onboarding-lab
merge_target_branch: feat/claude-code-onboarding-lab
branch_strategy: Planning artifacts for this mission were generated on feat/claude-code-onboarding-lab. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into feat/claude-code-onboarding-lab unless the human explicitly redirects the landing branch.
base_branch: kitty/mission-yolan-cli-learning-track-01M3KZJ9
base_commit: 77dda83dcaae8cf32f0edb1dc7b236e514cbf3fc
created_at: '2026-09-28T17:39:46.179124+00:00'
subtasks:
- T005
- T006
- T007
- T008
phase: Phase 1 - Content (Wave 1)
assignee: ''
shell_pid: '26404'
history:
- at: '2026-09-28T00:00:00Z'
  actor: system
  action: Prompt generated via /spec-kitty.tasks
agent_profile: frontend-freddy
authoritative_surface: js/data/modules/
create_intent:
- js/data/modules/git-properly.js
- js/data/modules/github-hosting.js
- js/data/modules/mcp-servers-hands-on.js
execution_mode: code_change
model: ''
owned_files:
- js/data/modules/git-properly.js
- js/data/modules/github-hosting.js
- js/data/modules/mcp-servers-hands-on.js
role: implementer
tags: []
task_type: implement
---

# Work Package Prompt: WP02 – Git, GitHub & MCP

## ⚡ Do This First: Load Agent Profile

Use the `/ad-hoc-profile-load` skill to load the agent profile specified in the frontmatter, and behave according to its guidance before parsing the rest of this prompt.

- **Profile**: `frontend-freddy` | **Role**: `implementer` | **Agent/tool**: `claude`

## ⚠️ IMPORTANT: Review Feedback

Check the `review_ref` field in the event log before starting. Address all feedback before your work is complete.

## Markdown Formatting

Wrap HTML/XML tags in backticks. Use language identifiers in code blocks.

---

## Objectives & Success Criteria

Author the three modules that make repo/file literacy central to Yolan's
track: hands-on Git commands, GitHub setup and hosting, and an actual
hands-on MCP server connection (not just the conceptual explanation the
shared app already has). Three brand-new files -- nothing else in this
mission touches them.

- FR-008: "Git, Properly" covers clone/branch/commit/push/pull/diff/log,
  including reading a diff before trusting it.
- FR-009: "GitHub & Hosting" covers SSH keys/auth, first push, forks/PRs
  conceptually, and hosting a static site on GitHub Pages.
- FR-010: "MCP Servers, Hands-On" has him actually connect and use one
  real MCP server.

## Context & Constraints

- **No dependencies** -- start immediately in parallel with WP01 and WP03.
- Read [`spec.md`](../spec.md) FR-008, FR-009, FR-010, NFR-001, NFR-002,
  C-002, C-005, and Acceptance Scenario 4.
- Read [`research.md`](../research.md)'s "MCP server for the hands-on
  exercise" entry before writing "MCP Servers, Hands-On" -- the decision
  (Anthropic's official reference **filesystem** MCP server,
  `@modelcontextprotocol/server-filesystem`) is already made; do not
  substitute a different server.
- **"MCP Servers, Hands-On" is written for future reuse (C-005)**: Wim's
  own future mission is expected to wire this exact file into his track
  unmodified. Write it generically -- no Yolan-specific framing, no
  reference to his personal projects, his Mac, or anything else specific
  to him. It should read naturally for any learner.
- **"GitHub & Hosting"'s worked example**: this repo's own GitHub Pages
  deployment is a legitimate real-world example of the pattern (a static
  site, pushed to a GitHub repo, served from GitHub Pages) -- but describe
  the *pattern*, not this project's specific tooling. Do not have the
  module instruct the learner to inspect Spec Kitty, the service worker,
  or any of this repo's own internals -- those are incidental to this
  project, not part of the lesson.
- The shared app has a conceptual "Repos" module (what a repo is, common
  files/folders) and a conceptual "MCP Servers" module (what MCP is, what
  belongs in a config), both reused unchanged in the Wim/Princess shared
  track. **Correction from `/spec-kitty.analyze` finding I2**: an earlier
  draft of this WP wrongly assumed those two conceptual modules "sit right
  earlier in Yolan's track" and that "Git, Properly"/"MCP Servers,
  Hands-On" could skip re-explaining the basics as a result. They cannot --
  per `spec.md`'s Key Entities table, both conceptual modules are
  **excluded** from Yolan's 15-module list entirely (these two new modules
  *replace* them, not follow them). Nothing else in Yolan's track explains
  "what is a repo" or "what is MCP." Each of "Git, Properly" and "MCP
  Servers, Hands-On" MUST therefore include its own brief grounding (a few
  sentences, not a full re-teaching, and not a copy of the shared
  conceptual module's exact wording) before going hands-on -- see each
  subtask's guidance below for exactly where.

### Module authoring reference (read this before writing any file)

Same shape as every other module in this app -- see
[`js/data/modules/04-repos.js`](../../../js/data/modules/04-repos.js) and
[`js/data/modules/05-mcp-servers.js`](../../../js/data/modules/05-mcp-servers.js)
for the closest thematic examples (the conceptual modules these three
build on).

```js
export default {
  id: "git-properly",
  order: 6,                      // position WITHIN YOLAN'S TRACK ONLY -- see data-model.md
  title: "Git, Properly",
  summary: "One sentence shown on the module card.",
  content: [ /* { heading, body: "<p>HTML...</p>", glossaryTerms? } */ ],
  labs: [ /* see per-subtask lab guidance below */ ],
};
```

Order values for this WP's three modules within Yolan's 15-module track:
`git-properly` -> `order: 6`, `github-hosting` -> `order: 7`,
`mcp-servers-hands-on` -> `order: 8`.

- **`match` lab config item shape** (used below):
  `{ prompt: string, options: string[], correctOption: string, visual?: string, id?: string }`
  -- see
  [`js/views/labs/match-lab.js`](../../../js/views/labs/match-lab.js)'s
  header comment for the full contract. Immediate feedback per selection,
  never locks, unlimited retries.
- **`checklist` lab config**: a bare array of `{ id, label }` -- see
  [`js/views/labs/checklist-lab.js`](../../../js/views/labs/checklist-lab.js).
  Non-graded, self-marked, complete once every item is checked.
- **Glossary terms (NFR-001)**: define every genuinely new term on first
  use; do not redefine terms already covered by the reused conceptual
  Repos/MCP Servers modules (repo, MCP, MCP server, MCP configuration) --
  only what's new to *this* content (e.g. SSH key, fork, pull request,
  diff, commit history if not already covered).

## Branch Strategy

- **Strategy**: already-confirmed
- **Planning base branch**: feat/claude-code-onboarding-lab
- **Merge target branch**: feat/claude-code-onboarding-lab
- Execution worktrees are allocated per computed lane from `lanes.json`
  once `/spec-kitty.tasks` finalizes -- do not create your own worktree by
  hand.

## Subtasks & Detailed Guidance

### Subtask T005 – Author "Git, Properly"

- **Purpose**: Hands-on Git commands. **Correction from
  `/spec-kitty.analyze` finding I2**: this module can NOT assume prior
  "what's a repo" grounding -- the shared conceptual Repos module is
  excluded from Yolan's track (replaced by this one), so this module is
  the only place that idea will ever appear for him.
- **Steps**:
  1. Create `js/data/modules/git-properly.js`, `id: "git-properly"`,
     `order: 6`.
  2. Content sections, in order:
     - **What's a repo, briefly** -- a short (2-3 sentence) grounding
       section: a repo is a folder of project files tracked over time by
       Git, so every change is recorded and can be undone. This is
       intentionally brief -- not a full re-teaching of the shared Repos
       module's "what's usually inside a repo" file-listing content, just
       enough that "repo," "commit," and "clone" below aren't landing on
       someone with zero context. Define "repository (repo)" via
       `glossaryTerms` here.
     - **Cloning a repo** -- `git clone <url>`, what it actually does
       (downloads the full project + its history onto his machine).
     - **Branches** -- `git branch`, `git switch` or `git checkout -b`
       (pick one consistently -- your call, state which you're teaching
       and why briefly, e.g. `git switch -c` as the more modern/clearer
       form), what a branch is for in one plain sentence (a separate line
       of work that doesn't touch the main version until you're ready).
     - **The commit loop** -- `git status`, `git add`, `git commit -m`,
       explained as a repeatable loop, not a one-time sequence.
     - **Push and pull** -- `git push`, `git pull`, and what "remote"
       means in plain language.
     - **Reading a diff before trusting it** -- `git diff` (unstaged),
       `git diff --staged`, and explicitly connect this to a judgment
       habit: before committing or pushing something Claude Code changed,
       skim the diff -- does it match what you asked for? This is the
       same "before/after" review habit taught elsewhere in this app,
       applied to real Git output instead of a plain-language description
       of it.
     - **Log** -- `git log` (mention `--oneline` for a readable view) as
       "how do I see what happened."
  3. Lab: a `match` lab -- 5 scenario/command pairs, e.g. "You want to see
     exactly what changed before committing" -> `git diff`; "You want to
     start a new line of work without touching your main code yet" ->
     `git switch -c` (or your chosen branch command); "You want to save
     your current changes with a message" -> `git commit -m`; "You want to
     send your commits to GitHub" -> `git push`; "You want to see a list
     of past commits" -> `git log`. Each item: 3-4 plausible `options`
     (other Git commands from this module), one `correctOption`.
- **Files**: `js/data/modules/git-properly.js` (new)
- **Parallel?**: [P] -- independent of T006/T007 (different files).

### Subtask T006 – Author "GitHub & Hosting"

- **Purpose**: SSH/auth setup, a first real push, forks/PRs conceptually,
  and hosting a static site on GitHub Pages.
- **Steps**:
  1. Create `js/data/modules/github-hosting.js`, `id: "github-hosting"`,
     `order: 7`.
  2. Content sections, in order:
     - **What GitHub is** -- one short section: GitHub hosts Git repos
       online and adds collaboration features on top (issues, pull
       requests) -- distinct from Git itself, which works with no GitHub
       account at all.
     - **SSH keys and authenticating** -- what an SSH key pair is (already
       defined by the reused Data Safety module's SSH-key glossary entry
       if present -- check, and reference it rather than re-explaining
       from scratch if so), generating one (`ssh-keygen`), and adding the
       public half to a GitHub account -- described as a one-time setup.
     - **Your first push** -- creating a repo on GitHub, connecting a
       local repo to it (`git remote add origin ...`), and pushing for
       the first time -- tie this directly to "Git, Properly"'s push/pull
       section (this is where those commands actually go somewhere).
     - **Forks and pull requests, conceptually** -- a fork is your own
       copy of someone else's repo; a pull request is asking them to pull
       your changes into theirs. Keep this conceptual (no hands-on lab
       item requiring an actual PR against a real project) -- just enough
       that he recognizes the terms and what they're for.
     - **Hosting a static site on GitHub Pages** -- the general pattern:
       a repo containing plain HTML/CSS/JS can be turned on as a live
       website through GitHub's own Pages settings, no server of his own
       needed. Describe this as *the pattern*, generically -- do not
       reference this repo's own Spec Kitty tooling, service worker, or
       any other project-specific detail; a reader should be able to
       apply this to any static-site project of their own.
  3. Lab: a `checklist` lab -- "Generated an SSH key," "Added it to
     GitHub," "Created a repo and pushed to it," "Can explain what a fork
     and a pull request are," "Knows how GitHub Pages hosting works"
     (5 items, non-graded).
- **Files**: `js/data/modules/github-hosting.js` (new)
- **Parallel?**: [P] -- independent of T005/T007 (different files).

### Subtask T007 – Author "MCP Servers, Hands-On"

- **Purpose**: Actually connect and use one real MCP server -- written
  generically for future reuse by Wim's track (C-005). **Correction from
  `/spec-kitty.analyze` finding I2**: this module can NOT assume prior
  "what's MCP" grounding -- the shared conceptual MCP Servers module is
  excluded from Yolan's track (replaced by this one), so this module is
  the only place that idea will ever appear for him. (Wim's future track
  may or may not include the conceptual module either, since this file is
  written for his reuse too -- self-contained grounding is the safe
  choice either way.)
- **Steps**:
  1. Create `js/data/modules/mcp-servers-hands-on.js`,
     `id: "mcp-servers-hands-on"`, `order: 8`.
  2. Content sections, in order:
     - **What's MCP, briefly** -- a short (2-3 sentence) grounding
       section: MCP (Model Context Protocol) is a shared, open way for an
       AI assistant to connect to outside tools and data -- like a
       calendar, a database, or in this case a folder on your machine --
       instead of being limited to only what's already in front of it. An
       MCP server is one such connection point; an MCP configuration is
       the settings file that tells Claude Code which servers to use.
       Define "MCP (Model Context Protocol)," "MCP server," and "MCP
       configuration" via `glossaryTerms` here -- this is intentionally
       brief, not the shared conceptual module's full treatment (which
       also covers config-file judgment calls this hands-on module
       doesn't need).
     - **The server you'll use** -- introduce the official reference
       **filesystem** MCP server (`@modelcontextprotocol/server-filesystem`)
       by name, and why it's a good first one: no signup, no API key, no
       external service -- it just exposes a folder on your own machine to
       Claude Code.
     - **Connecting it** -- describe adding it to Claude Code's MCP
       configuration (the concept just defined above), pointed at a
       folder of his choosing.
     - **Using it** -- a concrete example prompt that would only work
       *because* the server is connected (e.g. asking Claude Code to list
       or describe files in that folder through the MCP connection,
       distinct from Claude Code's own normal built-in file access to the
       current project -- make the distinction clear: this is about
       reaching a folder *outside* the current project, which is exactly
       what MCP is for).
     - **Beyond this one server** -- close with a brief, generic note that
       a large ecosystem of other MCP servers exists (databases,
       calendars, search, etc.) and that connecting a new one always
       follows the same basic pattern he just practiced.
  4. Write this section generically (C-005) -- phrase everything as "you"
     addressing any learner, with no reference to Yolan's own projects,
     his Mac, or anything CLI-orientation-specific beyond what MCP itself
     requires (MCP configuration works the same whether Claude Code is
     reached via CLI or IDE -- do not assume a terminal-only context here
     either).
  5. Lab: a `checklist` lab -- "Installed/configured the filesystem MCP
     server," "Pointed it at a real folder," "Asked Claude Code to use it
     and saw a real result," "Can explain the difference between this and
     Claude Code's normal project file access" (4 items, non-graded).
- **Files**: `js/data/modules/mcp-servers-hands-on.js` (new)
- **Parallel?**: [P] -- independent of T005/T006 (different files).

### Subtask T008 – Manual browser verification of all three modules

- **Purpose**: Confirm all three modules render correctly on their own,
  before WP04 wires them into Yolan's actual track.
- **Steps**:
  1. Start the local preview server.
  2. As in WP01's T004: these modules aren't wired into any track yet.
     Verify each by temporarily, reversibly wiring it into `index.js`'s
     default array purely for local preview, then **revert that temporary
     change before finishing this WP** -- WP04 owns the real wiring.
  3. For each module: confirm all content sections render, glossary terms
     expand/collapse correctly, and the lab mounts and is interactable
     (match options select and show correct/incorrect feedback for T005;
     checklist items check/uncheck for T006/T007).
  4. Resize to 360px width and re-check all three modules for layout
     breakage (NFR-002).
  5. Re-read all three modules' content once more end-to-end and confirm
     no term is used without a plain-language explanation or glossary
     entry (NFR-001), and that "MCP Servers, Hands-On" reads naturally
     with no Yolan-specific framing (C-005 self-check).
  6. Check the browser console for errors on all three modules.
- **Files**: none changed -- verification only (beyond the strictly
  temporary, reverted preview wiring described in step 2).
- **Parallel?**: No -- final step, depends on T005, T006, and T007.

## Risks & Mitigations

- **Risk**: "MCP Servers, Hands-On" ends up written specifically for
  Yolan despite C-005's future-reuse requirement, forcing Wim's later
  mission to rewrite it instead of reusing it. **Mitigation**: T007's
  explicit generic-phrasing instruction and the final C-005 self-check in
  T008.
- **Risk**: "GitHub & Hosting" accidentally teaches this specific repo's
  tooling (Spec Kitty, the service worker) instead of the general GitHub
  Pages pattern, confusing a reader who isn't inside this project.
  **Mitigation**: T006's explicit instruction to describe the pattern
  generically.
- **Risk** (`/spec-kitty.analyze` finding I2): "Git, Properly" or "MCP
  Servers, Hands-On" ships without its own "what's a repo"/"what's MCP"
  grounding, leaving those terms undefined for Yolan since the shared
  conceptual modules aren't part of his track. **Mitigation**: both
  subtasks' corrected first content section (T005's "What's a repo,
  briefly," T007's "What's MCP, briefly") plus the corrected Review
  Guidance check below.

## Review Guidance

- Confirm "Git, Properly" and "MCP Servers, Hands-On" each include their
  own brief "what's a repo" / "what's MCP" grounding (a few sentences,
  with a `glossaryTerms` entry) rather than assuming it happened elsewhere
  in Yolan's track -- per the I2 correction above, nothing else in his
  track covers it.
- Confirm "MCP Servers, Hands-On" names the official filesystem reference
  server specifically and reads generically (no Yolan-specific framing).
- Confirm "GitHub & Hosting" describes the GitHub Pages pattern generically
  with no reference to this repo's own internal tooling.
- Load all three modules in the browser at desktop and 360px width and
  confirm no layout breakage, and that no undefined term appears.

## Activity Log

**Initial entry**:

- 2026-09-28T00:00:00Z – system – Prompt created.

### Updating Status

Status is managed via `status.events.jsonl`. Use `spec-kitty agent tasks move-task WP02 --to <status>` to change WP status.
