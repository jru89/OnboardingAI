# Feature Specification: Yolan's CLI Learning Track

**Mission**: yolan-cli-learning-track-01M3KZJ9
**Mission Type**: software-dev
**Status**: Draft

## Purpose

Gives Yolan, one of three named learner profiles in the Claude Code
Onboarding Lab, his own distinct module track built around the command
line, instead of the shared IDE-based curriculum every profile currently
sees. His device (a 2016 Intel MacBook Pro capped at macOS Monterey
12.7.6) cannot run the Claude Code IDE extension, and his stated goal --
getting comfortable building tools and apps from the terminal -- calls for
more advanced, CLI-first content than the shared track provides: terminal
setup and styling, Git/GitHub, hands-on MCP, spec-driven development,
building tools with Claude Code, and a real capstone project, while
dropping the Gemini-specific content that does not apply to him.

Full scoping context -- device details, resolved risks, and every decision
behind this spec -- lives in `docs/planning/yolan-track-plan.md`, which this
spec formalizes into buildable requirements.

## User Scenarios & Testing

### Primary User Story

Yolan opens the app on his own Mac, passes the shared passphrase gate, and
picks "Yolan" in the profile picker. Instead of the shared 12-module list
everyone else sees, he lands on his own 15-module list that starts from
absolute terminal basics, builds up through Git, GitHub, hands-on MCP, and
spec-driven development, and ends with him shipping one real small tool he
actually wants -- all without ever needing the IDE extension his machine
can't run.

### Acceptance Scenarios

1. **Given** a device with no profile selected yet, **when** the learner
   picks "Yolan" in the profile picker, **then** the landing view shows
   exactly the 15 modules defined in this spec's module table, in that
   order, and none of the three modules explicitly excluded for him (Mock
   Use-Cases, Claude vs. Gemini, Automate a Task).
2. **Given** the learner is on the Yolan profile, **when** he opens "Make
   Your Terminal Yours," **then** the module walks him through installing
   Homebrew, then iTerm2 (not Ghostty, which does not run on his macOS
   Monterey 12.7.6), then Oh My Zsh with a theme and at least two plugins,
   and closes with guidance on finding further add-ons himself.
3. **Given** the learner is on the Yolan profile, **when** he opens "Claude
   Code, from the Command Line," **then** the content orients him to
   launching Claude Code in a terminal, recognizing a terminal-based
   permission prompt, and asking Claude Code for help when he is stuck --
   with no assumption that an IDE panel is available.
4. **Given** the learner is on the Yolan profile, **when** he reaches
   "MCP Servers, Hands-On," **then** the module has him actually connect
   and use one real MCP server, not just read about the concept.
5. **Given** the learner is on the Yolan profile, **when** he reaches
   "Spec-Driven Development," **then** the content teaches the general
   spec -> plan -> tasks -> review methodology first, tool-agnostically,
   and then walks through Spec Kitty as the concrete hands-on example.
6. **Given** the learner is on the Yolan profile, **when** he reaches the
   final "Capstone: Ship a Real Tool" module, **then** it asks him to pick
   one real small tool he wants (suggesting his own personal to-do app or
   reflection tool as strong starting candidates), build it, verify it
   works, and publish it, and it explicitly cross-references the Data
   Safety module's "never paste real/proprietary data" lesson.
7. **Given** a device where the Wim or Princess profile is active, **when**
   the learner views the landing page, **then** the module list is the
   original, unchanged 12-module list (aside from the one Data Safety
   bullet added by this mission, visible to every profile), and any
   existing progress for that profile is unaffected.
8. **Given** the learner already has in-progress or completed status on
   some of Yolan's modules, **when** he switches to another profile and
   back to Yolan via the header's profile switcher, **then** his progress
   on every one of his 15 modules is exactly as it was before he switched
   away.

### Edge Cases

- A learner switches to the Yolan profile on a device that has never seen
  it before (no prior progress data under his namespaced storage key): the
  15-module list must render with every module at "not started," not throw
  or fall back to the shared list.
- The three modules written for future reuse (MCP Servers Hands-On,
  Spec-Driven Development, Building Your Own Tools with Claude Code) must
  read naturally as generic content -- not written in a way that only
  makes sense addressed to Yolan specifically -- since a future mission is
  expected to wire the same files into Wim's track without rewriting them.
- Very narrow viewport (360px): all new content, including any code blocks,
  terminal command examples, and tables in the new modules, must remain
  readable, matching the rest of the app's existing responsive behavior.
- A learner on the Yolan profile follows the terminal-styling module's
  instructions exactly as written on the specific hardware/OS combination
  documented in this spec (Intel, macOS Monterey 12.7.6): every install
  step must actually succeed on that combination, not merely on a newer or
  Apple Silicon Mac.

## Requirements

### Functional Requirements

| ID | Requirement | Status |
|---|---|---|
| FR-001 | The app SHALL resolve the active learner profile (via `js/lib/profile.js`) and use it to select which module list is shown on the landing view and used for per-module lookup and the prev/next pager in the module-detail view, defaulting any profile without a dedicated list to the existing shared 12-module list. | Draft |
| FR-002 | The Yolan profile SHALL load a dedicated, ordered 15-module list distinct from the shared list, matching this spec's Key Entities module table. | Draft |
| FR-003 | A new "Terminal Basics" module SHALL teach absolute-beginner terminal literacy: `pwd`, `cd`, `ls`, `mkdir`, `mv`, `cp`, `rm`, editing a file from the CLI, and running a script. | Draft |
| FR-004 | A new "Make Your Terminal Yours" module SHALL walk through installing Homebrew, then iTerm2 (not Ghostty -- unsupported on macOS Monterey), then Oh My Zsh with one prescribed theme and at least two prescribed plugins, and SHALL close with guidance on how to search for and evaluate further terminal add-ons independently. | Draft |
| FR-005 | A new "Claude Code, from the Command Line" module (replaces "Get Oriented" in the Yolan profile's list only) SHALL cover CLI-specific orientation: launching Claude Code, recognizing its terminal-based permission prompts, and how to ask Claude Code for help when stuck rather than guessing. | Draft |
| FR-006 | The existing "AI vs. Claude Code" module SHALL be reused unchanged (same module id) in the Yolan profile's list. | Draft |
| FR-007 | The existing "Data Safety" module SHALL be reused (same module id) in the Yolan profile's list, with one additional bullet -- visible to every profile -- on never committing secrets or API keys to a git repository. | Draft |
| FR-008 | A new "Git, Properly" module (replaces "Repos" in the Yolan profile's list only) SHALL cover clone, branch, commit, push, pull, diff, and log, including the habit of reading a diff before trusting it. | Draft |
| FR-009 | A new "GitHub & Hosting" module SHALL cover SSH key setup and GitHub authentication, pushing a first project, forks and pull requests at a conceptual level, and hosting a static site on GitHub Pages, using this app's own deployment as the worked example. | Draft |
| FR-010 | A new "MCP Servers, Hands-On" module (replaces "MCP Servers" in the Yolan profile's list only; written generically for future reuse) SHALL walk through actually connecting and using one real MCP server. | Draft |
| FR-011 | The existing "Prompting 101" module SHALL be reused unchanged (same module id) in the Yolan profile's list. | Draft |
| FR-012 | The existing "Prompting 201" module SHALL be reused unchanged (same module id) in the Yolan profile's list. | Draft |
| FR-013 | A new "Spec-Driven Development" module (written generically for future reuse) SHALL teach the spec -> plan -> tasks -> review methodology tool-agnostically, then use Spec Kitty as the concrete hands-on example. | Draft |
| FR-014 | A new "Building Your Own Tools with Claude Code" module (written generically for future reuse) SHALL cover building custom slash commands, skills, and subagents inside Claude Code. | Draft |
| FR-015 | A new "A Taste of the Claude API" module SHALL introduce building a minimal standalone program with the Claude API directly, distinct from using Claude Code itself. | Draft |
| FR-016 | The existing ".md Files & Habits" module SHALL be reused unchanged (same module id) in the Yolan profile's list. | Draft |
| FR-017 | A new "Capstone: Ship a Real Tool" module (replaces "Graduation" in the Yolan profile's list only) SHALL guide him to pick one real small tool he wants (suggesting his personal to-do app or reflection tool as candidates), build it, verify it works, and publish it, and SHALL explicitly cross-reference the Data Safety module's "never paste real/proprietary data" lesson. | Draft |
| FR-018 | The Yolan profile's module list SHALL NOT include "Mock Use-Cases," "Claude vs. Gemini," or "Automate a Task." | Draft |
| FR-019 | This mission SHALL NOT alter the module list, module content, or module ids used by the Wim or Princess profiles, other than the single added Data Safety bullet from FR-007, which is visible to every profile. | Draft |

### Non-Functional Requirements

| ID | Requirement | Status |
|---|---|---|
| NFR-001 | Every new term introduced by this mission's content SHALL be defined inline or via the app's existing glossary-term mechanism on first use. | Draft |
| NFR-002 | All new or changed content and labs SHALL remain usable, with no broken layout or clipped/unreadable content, at viewport widths from 360px up through desktop widths. | Draft |
| NFR-003 | All new content SHALL visually match the existing dark "Visual Novel" design system already used throughout the app -- no new colors, fonts, or component patterns introduced. | Draft |
| NFR-004 | All installation/setup instructions in "Make Your Terminal Yours" and any other module involving local software installation SHALL be accurate for an Intel-chip Mac running macOS Monterey 12.7.6 specifically, per the confirmed device details in `docs/planning/yolan-track-plan.md`, not generic or Apple-Silicon-only guidance. | Draft |
| NFR-005 | Any reference to Yolan's personal project ideas or goals SHALL stay at the level of generality already established in `docs/planning/yolan-track-plan.md`'s privacy note -- no direct quotes, no identifying specifics beyond what is already documented there -- since this repository is pushed to a public GitHub Pages site. | Draft |

### Constraints

| ID | Constraint | Status |
|---|---|---|
| C-001 | This mission SHALL NOT change the id, order, or existing content of the five reused modules (`ai-vs-claude-code`, `prompting-101`, `prompting-201`, `md-files-habits`, and -- aside from the one added bullet -- `data-safety`), since the Wim and Princess profiles' progress in localStorage already keys off those ids. | Draft |
| C-002 | This mission SHALL NOT introduce a new lab engine type; every new interactive lab SHALL reuse one of the six existing lab engines (checklist, quiz, spot-mistake, match, download, prompt-builder). | Draft |
| C-003 | This mission SHALL NOT introduce a build step, framework, backend, or automated test framework, consistent with the project's existing static-site, no-build-step, manual-verification-only architecture. | Draft |
| C-004 | This mission SHALL NOT name Yolan's real employer/school or any other identifying detail beyond what is already documented in `docs/planning/yolan-track-plan.md`. | Draft |
| C-005 | The three modules written for future reuse (MCP Servers Hands-On, Spec-Driven Development, Building Your Own Tools with Claude Code) SHALL be written generically enough that a future mission can wire the same files into Wim's track without modifying them; this mission wires them into the Yolan profile's list only. | Draft |

## Key Entities

- **Module list / track** (new concept): a named, ordered list of module
  ids associated with a profile. Today there is exactly one shared list,
  used by every profile; this mission introduces a second, Yolan-specific
  list and a resolution mechanism (FR-001) designed to support additional
  per-profile lists later (Wim, once his own mission runs).
- **Module** (existing entity, unchanged shape -- `{id, order, title,
  summary, content, labs}`): ~10 new module objects are created; 5 existing
  module objects are reused by reference (`ai-vs-claude-code`,
  `prompting-101`, `prompting-201`, `md-files-habits`, `data-safety`, the
  last of which gains one content bullet visible to all profiles).

  Yolan's 15-module list, in order:

  | # | Module | Status |
  |---|---|---|
  | 1 | Terminal Basics | new |
  | 2 | Make Your Terminal Yours | new |
  | 3 | Claude Code, from the Command Line | new (replaces Get Oriented for this profile) |
  | 4 | AI vs. Claude Code | reused, unchanged |
  | 5 | Data Safety | reused, +1 shared bullet |
  | 6 | Git, Properly | new (replaces Repos for this profile) |
  | 7 | GitHub & Hosting | new |
  | 8 | MCP Servers, Hands-On | new, written for future reuse |
  | 9 | Prompting 101 | reused, unchanged |
  | 10 | Prompting 201 | reused, unchanged |
  | 11 | Spec-Driven Development | new, written for future reuse |
  | 12 | Building Your Own Tools with Claude Code | new, written for future reuse |
  | 13 | A Taste of the Claude API | new |
  | 14 | .md Files & Habits | reused, unchanged |
  | 15 | Capstone: Ship a Real Tool | new (replaces Graduation for this profile) |

- **Profile** (existing entity, from `js/lib/profile.js` -- unchanged
  shape): this mission is the first consumer of the active profile for
  anything beyond progress-key namespacing.
- **Lab** (existing entity, unchanged shape): new lab instances live
  inside the new modules above; each reuses an existing lab `type`.

## Success Criteria

| ID | Criterion |
|---|---|
| SC-001 | Selecting the Yolan profile and visiting the landing page shows exactly the 15 modules in the order listed in Key Entities, and none of the three excluded modules. |
| SC-002 | Selecting the Wim or Princess profile continues to show the original, unchanged 12-module list (aside from Data Safety's one added bullet), with any existing progress intact. |
| SC-003 | Following "Make Your Terminal Yours" on the documented Intel/Monterey hardware successfully installs Homebrew, iTerm2, and Oh My Zsh using only the module's own instructions, without hitting an incompatible-software step. |
| SC-004 | All 15 of Yolan's modules render without layout errors at 360px and desktop widths, and every lab in his list is completable using an existing lab engine. |
| SC-005 | Switching from the Yolan profile to another profile and back preserves Yolan's own progress exactly as it was before switching away. |

## Assumptions

- Builds entirely on the already-implemented profile picker and
  profile-aware progress namespacing (`js/lib/profile.js`, `js/app.js`,
  `js/lib/progress.js`) -- treated as fixed infrastructure this mission
  extends, not redesigns.
- Ghostty is confirmed unsupported on macOS Monterey 12.7.6 (verified via
  web search; see `docs/planning/yolan-track-plan.md`); iTerm2 is used
  instead without further research needed.
- Wim's track (`docs/planning/wim-track-plan.md`) is explicitly out of
  scope for this mission; the three modules written for future reuse are
  wired into the Yolan profile's list only here. A future mission wires
  them into Wim's list.
- The Data Safety module's one new bullet (never commit secrets/API keys
  to git) is added to the shared module content and will be visible to
  every profile, not only Yolan -- judged low-risk and broadly useful
  rather than something to fork into a Yolan-only variant. Wim's own
  planned CAD-specific addition to the same module (see
  `docs/planning/wim-track-plan.md`) is out of scope here.
- No new npm/build tooling and no automated test suite is introduced;
  verification is manual, via the browser preview tools, matching the
  project's existing approach.
- Definition of Done for this mission: all 15 modules exist with real
  content and verifiably render/function correctly for the Yolan profile,
  confirmed in the dev preview -- confirmed directly with the user, no
  additional formal review step required.
