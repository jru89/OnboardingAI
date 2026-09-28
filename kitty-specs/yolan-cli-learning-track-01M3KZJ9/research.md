# Phase 0 Research: Yolan's CLI Learning Track

## Ghostty vs. macOS Monterey 12.7.6

- **Decision**: Prescribe iTerm2, not Ghostty, in "Make Your Terminal Yours."
- **Rationale**: Verified via web search (see `docs/planning/yolan-track-plan.md`
  for full citations). Ghostty 1.3.x officially requires macOS 13 (Ventura)
  or later -- it depends on APIs introduced in macOS 13, so it will not run
  on 12.7.6. The floor is rising, not falling: Ghostty 1.4 (planned Sept
  2026) raises the minimum to macOS 14. Unofficial community forks claim
  Monterey compatibility, but they are unsigned, unmaintained third-party
  builds -- not appropriate to point a beginner at.
- **Alternatives considered**: Ghostty (rejected -- incompatible, see above).
  Apple's built-in Terminal.app (rejected -- works, but offers a
  meaningfully worse out-of-the-box experience for the "make your terminal
  yours" goal: no split panes without extra config, weaker theming story,
  and the module's own stated purpose is showing him a nicer tool than the
  default). iTerm2 (chosen -- actively maintained, broad legacy macOS
  support well past Monterey, the de facto standard recommendation for
  Mac terminal customization for exactly this kind of use case).

## Homebrew install path on Intel vs. Apple Silicon

- **Decision**: Instructions target the Intel install path (`/usr/local`),
  since Yolan's Mac is confirmed Intel (3.3 GHz Dual-Core Intel Core i7).
- **Rationale**: Homebrew installs to different default prefixes depending
  on CPU architecture -- `/usr/local` on Intel Macs, `/opt/homebrew` on
  Apple Silicon. Using the wrong path in instructions (e.g. copy-pasting
  Apple-Silicon-flavored setup steps, which are far more common in current
  general-audience tutorials since most new Macs are Apple Silicon) would
  produce a `command not found` failure the first time he opens a new
  terminal tab, directly violating NFR-004. The Homebrew installer itself
  detects architecture automatically and prints the correct
  `eval "$(...)"` shell-profile line for the machine it's running on --
  the module should tell him to copy that printed line rather than hand
  him a hardcoded path, so the instructions stay correct regardless of
  exactly which Intel Mac he's on.
- **Alternatives considered**: Hardcoding the `/usr/local/bin/brew shellenv`
  line directly (rejected -- correct for his current machine, but a
  needless landmine if reused/adapted later; telling him to use the
  installer's own printed output is equally simple and self-correcting).

## MCP server for the hands-on exercise

- **Decision**: Use Anthropic's official reference **filesystem** MCP
  server (`@modelcontextprotocol/server-filesystem`) as the one Yolan
  connects to in "MCP Servers, Hands-On."
- **Rationale**: Needs to be genuinely low-friction for a first-timer:
  no signup, no API key, no paid account, no external service dependency
  -- it just exposes a local folder to Claude Code via MCP. That makes the
  success/failure of the exercise fully within his control (no third-party
  outage or auth flow to debug) and ties naturally into repo/file literacy,
  which the spec calls out as more central for his track than for the
  other two profiles. It is also officially maintained by Anthropic
  alongside the MCP spec itself, so the setup steps are unlikely to go
  stale quickly.
- **Alternatives considered**: A fetch/web-search MCP server (rejected as
  the *first* exercise -- introduces network variability and, for some
  implementations, API keys, which adds failure modes unrelated to
  learning what MCP itself is). A third-party/community MCP server
  (rejected -- maintenance and trust are unverifiable for a beginner
  module; the module can *mention* that a large ecosystem of community
  servers exists and point to where to find more, without prescribing one
  as the required hands-on exercise).

## Claude Code extensibility (skills/subagents) -- illustrative example

- **Decision**: "Building Your Own Tools with Claude Code" may reference,
  at a conceptual level, that real projects keep a folder of custom
  skills/commands that Claude Code loads automatically -- without assuming
  the learner is inside any particular repo.
- **Rationale**: This project's own `.claude/skills/` directory (visible in
  this very repo) is a concrete, already-verified real-world example of
  the pattern being taught, which grounds the module in something real
  rather than hypothetical. The module description stays generic (per
  C-005) -- it teaches the mechanism and shows one illustrative example,
  it does not instruct the learner to go modify this specific app's repo.
- **Alternatives considered**: A purely abstract description with no
  concrete example (rejected -- less convincing/memorable for a hands-on
  learner than pointing at something real that already exists and works).

## Spec-driven development methodology + Spec Kitty as the example

- **Decision**: Teach the spec -> plan -> tasks -> review loop generically
  first (this mission's own `spec.md` -> `plan.md` -> `tasks.md` ->
  implement/review sequence is itself a live, walkable example by the time
  this mission ships), then introduce Spec Kitty specifically as one tool
  that enforces that loop.
- **Rationale**: This mission is, itself, being produced spec-driven via
  Spec Kitty in this exact repo -- an unusually strong, first-hand,
  already-verified source of truth for what the methodology and the tool
  actually look like in practice, rather than a description written from
  general knowledge alone.
- **Alternatives considered**: Teaching only the abstract methodology with
  no concrete tool example (rejected -- the spec explicitly calls for Spec
  Kitty by name as the hands-on example, per the user's original request).

## Claude API "taste" module -- scope boundary

- **Decision**: Keep this module to one minimal, concrete example (a short
  standalone script that sends one message to the Claude API and prints
  the reply) plus pointers to where to learn more, not a comprehensive API
  reference.
- **Rationale**: Directly matches the spec's framing ("a taste," not a full
  tutorial) and this mission's Assumptions/Scope -- avoids the module
  ballooning into an API reference that duplicates Anthropic's own
  documentation.
- **Alternatives considered**: A fuller walkthrough covering streaming,
  tool use, multi-turn conversation (rejected as out of scope for "a
  taste" -- would also risk going stale faster than a minimal example).
