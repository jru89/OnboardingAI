# Wim's track -- planning notes (ON HOLD)

Internal planning doc, not learner-facing content. Captures where the design
conversation for Wim's personalized module track had gotten to before it
was put on hold, so it can be picked up later without re-deriving context.

## Context

Wim gets his own profile in the profile picker (alongside Yolan and
Princess -- see `js/lib/profile.js`). Unlike Yolan, he stays **IDE-based,
no CLI** -- he already uses Claude Code at home. He's an industrial
engineer, smart, works with CAD templates that generate design plans/
drawings, and has identified that repetitive part of his job as something
that "could easily be automated." He also wants exposure to GitHub
Copilot -- he doesn't know what it currently supports (MCP, custom agent
building) and asked for that to be researched rather than guessed at.

**Privacy decision**: keep his employer unnamed and the CAD scenario
generic -- this app is on a public GitHub Pages site, so no real company
name or real proprietary specifics should appear in the content, the same
way Regnology was scrubbed from the wife's content. Describe him only as
"an industrial engineer automating repetitive CAD drawing templates."

## Decisions made so far (via clarifying questions)

- **Privacy**: generic framing, no employer name, no real company
  specifics -- confirmed "keep it generic."
- **Scope vs. Yolan**: all three of Yolan's advanced additions carry over --
  spec-driven development (Spec Kitty), hands-on MCP server setup, and
  building Claude Code skills/subagents. (Yolan's fourth addition, "a taste
  of the Claude API," was NOT selected for Wim -- not in scope here.)
- **Copilot module shape**: a comparison module mirroring the existing
  "Claude Code vs. Gemini" module (Module 9) -- when to reach for Claude
  Code vs. Copilot, a feature table, etc. Requires verifying Copilot's
  actual current feature set (MCP support, custom agent building) before
  writing -- do not guess.
- **Capstone/running theme**: a safe, generic version of his real
  CAD-template automation idea -- synthetic/mock template data only, never
  real company files -- and this should explicitly tie back into the Data
  Safety module's "never paste proprietary work data" lesson.

## Efficiency note

Three of the new modules needed for Wim are identical in substance to ones
already planned for Yolan (see `docs/planning/yolan-track-plan.md`):
**Spec-Driven Development**, **MCP Servers, Hands-On**, and **Building Your
Own Tools with Claude Code**. None of that content actually depends on
CLI vs. IDE -- so these three should be written **once** and included in
both Yolan's and Wim's profile-specific module lists, rather than
duplicated. Keep this in mind when the profile-aware module-list wiring is
built (see "Resuming this later" below).

## Still open

1. **Track length** -- proposed running to however many modules this
   actually needs (14, per the draft below) rather than forcing parity with
   the shared 12-module structure, consistent with the same call made for
   Yolan. Not explicitly re-confirmed for Wim specifically -- flag if he'd
   rather it be trimmed.
2. **GitHub Copilot's current capabilities** -- needs an actual research
   pass (does it support MCP servers today, is there a Gemini-Enterprise-
   style custom agent builder, etc.) before Module 9 can be written
   accurately. Explicitly deferred rather than guessed.

## Draft outline (proposed, not yet approved -- conversation paused before
a final sign-off or before building started)

| # | Module | Status |
|---|---|---|
| 1 | Get Oriented | reuse as-is (already IDE-framed, no change needed for Wim) |
| 2 | AI vs. Claude Code | reuse as-is |
| 3 | Data Safety | reuse, + a line tying "never paste real work files" directly to his CAD-automation scenario |
| 4 | Repos | reuse as-is |
| 5 | MCP Servers, Hands-On | **new, shared with Yolan** -- expanded to actually connect a real server |
| 6 | Prompting 101 | reuse as-is |
| 7 | Mock Use-Cases | reuse as-is |
| 8 | Prompting 201 | reuse as-is |
| 9 | Claude Code vs. GitHub Copilot | **replaces** Claude vs. Gemini -- needs the Copilot research pass above before writing |
| 10 | Automate a Task | reuse structure, reframe the worked example toward template/drawing-style automation |
| 11 | Spec-Driven Development | **new, shared with Yolan** |
| 12 | Building Your Own Tools with Claude Code | **new, shared with Yolan** |
| 13 | .md Files & Habits | reuse as-is |
| 14 | Capstone: Automate Your Template Task | **replaces** Graduation -- generic CAD-template automation using synthetic data, ties back into Data Safety |

## Resuming this later

To pick this back up: do the Copilot capabilities research, confirm track
length, get a final yes/edit on the draft outline, then write the actual
module content following this repo's existing module shape
(`js/data/modules/NN-slug.js`, see any current file for the
`{id, order, title, summary, content, labs}` shape). When wiring the
profile-aware module list, build the three shared-with-Yolan modules
(Spec-Driven Development, MCP Servers Hands-On, Building Your Own Tools)
as single files referenced by both profiles' lists rather than duplicating
them -- see the efficiency note above.
