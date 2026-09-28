# Yolan's track -- planning notes (ON HOLD)

Internal planning doc, not learner-facing content. Captures where the design
conversation for Yolan's personalized module track had gotten to before it
was put on hold, so it can be picked up later without re-deriving context.

## Context

Yolan gets his own profile in the profile picker (alongside Wim and
Princess -- see `js/lib/profile.js`). His device is an older Mac whose OS
can't run the Claude Code IDE extension, so his track needs to be CLI-first
rather than IDE-first, and pitched more advanced (he's a bioengineer --
smart, just new to the terminal specifically).

His stated goal: get comfortable building tools and apps from the command
line. He needs: GitHub (what it is, how to host things), spec-driven coding
(he named Spec Kitty by name), building agents in Claude Code, MCP and repo
literacy (more central than for the other two profiles), a good-looking/
customized terminal (Ghostty, Oh My Zsh, finding add-ons), basic git
commands, and the habit of asking Claude Code when he's stuck rather than
guessing. The Gemini-track content (Module 9, and Module 12's Gemini-agent
capstone) does not apply to him and should be omitted.

## Device details -- confirmed

MacBook Pro (13-inch, 2016, Four Thunderbolt 3 Ports), 3.3 GHz Dual-Core
Intel Core i7, 16 GB RAM, Intel Iris Graphics 550, running **macOS Monterey
12.7.6** -- Intel chip, not Apple Silicon. This is the last macOS version
this hardware can run; it cannot update further.

## Risk -- confirmed real, not hypothetical

Yolan checked this himself: certain programs are expected to stop working
on his machine from January onward (consistent with the earlier concern
that a current Node.js runtime, which Claude Code CLI needs, may not run
much longer on an OS this old). He's aware and plans to buy a new Mac
within a few months regardless -- so the CLI-first framing is likely a
**temporary constraint** rather than a permanent one, but content should
still be written to work correctly today, on this machine, without
assuming the replacement has already arrived.

**Resolved: Ghostty does not support Monterey.** Ghostty 1.3.x officially
requires macOS 13 (Ventura) or later -- it uses APIs introduced in macOS 13,
so it won't run on 12.7.6. It's only getting stricter: Ghostty 1.4 (planned
Sept 2026) raises the floor to macOS 14. Unofficial community forks claim
Monterey compatibility, but they're unsigned/unmaintained third-party
builds -- not worth pointing a beginner at.

**Use iTerm2 instead** as the prescribed terminal in "Make Your Terminal
Yours" -- broad legacy support, well past Monterey, actively maintained.
Worth a one-line note in that module that Ghostty is a fine (arguably
better) choice once he's on his new Mac in a few months, in case he wants
to revisit it later. (Sources: [Ghostty 1.3.0 release
notes](https://ghostty.org/docs/install/release-notes/1-3-0),
[ghostty-org/ghostty#3416](https://github.com/ghostty-org/ghostty/issues/3416),
[ghostty-org/ghostty discussion
#3960](https://github.com/ghostty-org/ghostty/discussions/3960).)

## Decisions made so far (via clarifying questions)

- **Spec-driven development**: teach the general spec -> plan -> tasks ->
  review methodology first (tool-agnostic), then use Spec Kitty as the
  concrete hands-on example, since it's free and already proven in this
  project.
- **"Build agents in Claude Code"**: both, in this order -- (1) Claude
  Code's own extensibility (custom slash commands, skills, subagents), then
  (2) a taste of building with the Claude API directly, beyond Claude Code
  itself.
- **MCP depth**: hands-on -- he should actually connect and use a real MCP
  server, not just read about the concept (unlike the conceptual-only
  version in the shared Module 5).
- **Capstone**: replace Module 12's Gemini-agent ending with "ship one real
  small CLI tool" -- he picks something he actually wants, builds it,
  verifies it works, and publishes it (e.g. pushes it to GitHub with a
  README).
- **CLI experience assumed**: total beginner -- needs the absolute basics
  (pwd/cd/ls/mkdir/mv/rm, editing a file, running a script) before anything
  else.
- **Terminal styling**: prescriptive -- give him a good default stack
  (Ghostty, Oh My Zsh, a theme, a couple of solid plugins) rather than
  making him research from zero, then show him how to search/evaluate more
  on his own.
- **Track length**: free to differ from the shared 12-module structure --
  don't force parity with Wim's/Princess's tracks. Given everything above,
  it will likely run longer (the draft below is 15 modules).

## Examples flavor -- confirmed (from Yolan directly)

Not bioengineering-flavored -- his real interest runs toward personal
productivity / self-management tools. In his own words (paraphrased; see
privacy note below), the projects he has in mind, roughly in order:

1. A personal reflection/self-management tool -- weekly reflections that
   feed into short-, medium-, and long-term self-tracking.
2. A personal to-do app.
3. Eventually (once he's capable enough), a trajectory-planning app for an
   alternative/cooperative school program he's involved with.

**Capstone implication**: (1) or (2) are well-scoped, small, and already
things he wants -- either is a strong candidate for the "ship one real
small CLI tool" capstone. (3) is explicitly a stretch goal for *after* this
course, not the capstone itself -- he named it as something he'd only
attempt "once he already can."

**Privacy note**: this file lives in the same repo that gets pushed to a
public GitHub Pages site. Keep any reference to his personal goals at this
level of generality in learner-facing content and in this doc -- no direct
quotes, no identifying specifics beyond what's already written here.

## Still open

None -- all questions raised during scoping are now resolved. Ready to
build whenever you want to proceed.

## Draft outline (proposed, not yet approved -- reacted to but conversation
paused before a final sign-off)

| # | Module | Status |
|---|---|---|
| 1 | Terminal Basics | **new** -- pwd/cd/ls/mkdir/mv/rm, editing a file, running a script (true beginner start) |
| 2 | Make Your Terminal Yours | **new** -- Homebrew -> iTerm2 (not Ghostty -- unsupported on his Monterey machine, see above) -> Oh My Zsh + theme + a couple solid plugins, then how to find more himself |
| 3 | Claude Code, from the Command Line | **replaces** Module 1 -- CLI orientation, permission prompts in a terminal, how to ask Claude Code for help when stuck |
| 4 | AI vs. Claude Code | reuse as-is |
| 5 | Data Safety | reuse, + a note on never committing secrets/API keys to git |
| 6 | Git, Properly | **expands** Module 4 -- clone/branch/commit/push/pull/diff/log, reading a diff before trusting it |
| 7 | GitHub & Hosting | **new** -- SSH keys/auth, first push, forks/PRs conceptually, hosting on GitHub Pages (using this very app as the real example) |
| 8 | MCP Servers, Hands-On | **expands** Module 5 -- actually connect a real server |
| 9 | Prompting 101 | reuse as-is |
| 10 | Prompting 201 | reuse as-is |
| 11 | Spec-Driven Development | **new** -- spec->plan->tasks->review mindset, then Spec Kitty as the concrete example |
| 12 | Building Your Own Tools with Claude Code | **new** -- custom slash commands, skills, subagents |
| 13 | A Taste of the Claude API | **new** -- going beyond Claude Code itself, a minimal standalone-agent example |
| 14 | .md Files & Habits | reuse as-is |
| 15 | Capstone: Ship a Real Tool | **replaces** Graduation -- pick one real small tool, build it, verify it, publish it. Strong candidate: his own personal to-do app or reflection tool (see "Examples flavor" above) |

**Dropped from the shared skeleton:** Mock Use-Cases (office-worker
scenarios don't fit his goal), Claude vs. Gemini (explicitly out), Automate
a Task (folded into the capstone).

## Resuming this later

To pick this back up: get a final yes/edit on the draft outline, then write
the actual module content
following this repo's existing module shape (`js/data/modules/NN-slug.js`,
see any current file for the `{id, order, title, summary, content, labs}`
shape) and wire a profile-aware module list so Yolan's picker selection
actually loads this set instead of the shared one.
