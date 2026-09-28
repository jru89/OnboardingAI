// Module: Building Your Own Tools with Claude Code (FR-014, C-005).
//
// Written generically for future reuse (C-005) -- Wim's own future mission
// is expected to wire this exact file into his track unmodified, so there
// is no Yolan-specific framing anywhere below. Covers custom slash
// commands, skills, and subagents as three flavors of the same idea:
// teaching Claude Code a repeatable thing so you don't re-explain it every
// session.
//
// The "real projects keep a folder of these" reference (research.md's
// "Claude Code extensibility example" decision) is intentionally generic --
// this app's own .claude/skills/ directory is a verified real example of
// the pattern, but this file never instructs the learner to go look at or
// modify any specific repo, this one included.
//
// `order: 12` describes this module's position within Yolan's own
// 15-module track only (see data-model.md's Module/Module Track
// distinction) -- wiring it into any track's ordered array is WP04's job.
//
// Lab type "prompt-builder" -- reuses the same engine as Module 6
// (js/views/labs/prompt-builder-lab.js), with a distinct purposeKey
// ("building-your-own-tools") so its draft never collides with any other
// prompt-builder usage in the app (existing values: "prompting-101",
// "prompting-201-rewrite", "automate-a-task", "readme-exercise").

export default {
  id: "building-your-own-tools",
  order: 12,
  title: "Building Your Own Tools with Claude Code",
  summary:
    "Teach Claude Code your own repeatable commands, skills, and helpers " +
    "-- so you stop re-explaining the same thing every session.",
  content: [
    {
      heading: "Why build your own",
      body:
        "<p>Claude Code isn't limited to what it ships with out of the " +
        "box. You can teach it your own repeatable commands and " +
        "workflows, so the next time you need the same kind of thing " +
        "done, you don't have to re-explain it from scratch. Three " +
        "building blocks make this possible, each a bit more capable " +
        "than the last: custom slash commands, skills, and subagents.</p>",
    },
    {
      heading: "Custom slash commands",
      body:
        "<p>A <strong>slash command</strong> is a shortcut you type (like " +
        "<code>/daily-standup</code>) that expands into a fuller " +
        "instruction, so you don't have to type the whole thing out every " +
        "time. Under the hood, it's usually just a small file that Claude " +
        "Code reads, containing the full instruction the shortcut stands " +
        "in for.</p>" +
        "<p>For example, a <code>/daily-standup</code> command might " +
        "expand into: \"summarize what changed in the last 24 hours in " +
        "this project.\" Typing the short version every morning is a lot " +
        "less friction than typing that full sentence out each time.</p>",
      glossaryTerms: [
        {
          term: "slash command",
          definition:
            "A short typed shortcut (starting with /) that expands into a " +
            "fuller instruction, usually defined in a small file Claude " +
            "Code reads, so a repeated request doesn't need to be typed " +
            "out in full each time.",
        },
      ],
    },
    {
      heading: "Skills",
      body:
        "<p>A <strong>skill</strong> is a slightly richer version of the " +
        "same idea: a packaged set of instructions for a recurring kind " +
        "of task, which Claude Code can load automatically when it's " +
        "relevant, rather than you having to invoke it by name every " +
        "time. Where a slash command is a short, explicit shortcut, a " +
        "skill can carry more context and detail, and Claude Code decides " +
        "on its own when a given task calls for it.</p>" +
        "<p>Some projects keep a whole folder of these -- a set of " +
        "packaged skills covering the recurring kinds of work that " +
        "project involves, which Claude Code loads automatically as " +
        "needed.</p>",
      glossaryTerms: [
        {
          term: "skill",
          definition:
            "A packaged set of instructions for a recurring kind of task " +
            "that Claude Code can load automatically when it's relevant, " +
            "rather than being invoked by an explicit shortcut every time.",
        },
      ],
    },
    {
      heading: "Subagents",
      body:
        "<p>A <strong>subagent</strong> is a focused, separately " +
        "instructed helper that Claude Code can delegate a sub-task to. " +
        "Instead of one long conversation trying to hold every detail at " +
        "once, a subagent gets its own clean context to work in --  " +
        "useful for a well-defined piece of work (like researching one " +
        "question, or handling one isolated step) that benefits from " +
        "starting fresh rather than carrying the whole conversation's " +
        "history along with it.</p>",
      glossaryTerms: [
        {
          term: "subagent",
          definition:
            "A focused, separately instructed helper that Claude Code can " +
            "delegate a sub-task to, working in its own clean context " +
            "instead of the main conversation's full history.",
        },
      ],
    },
    {
      heading: "Getting started",
      body:
        "<p>The practical next step is to start small: pick one annoying, " +
        "repeated task -- something you find yourself asking for the same " +
        "way more than once -- and turn just that one thing into a custom " +
        "command or skill. See whether it actually saves you time and " +
        "friction in practice. If it does, iterate on it and consider " +
        "adding another; if it doesn't quite fit, adjust it or try a " +
        "different task. You don't need a whole toolkit on day one.</p>",
    },
  ],
  labs: [
    {
      id: "module-building-your-own-tools-prompt-builder",
      type: "prompt-builder",
      graded: false,
      config: {
        purposeKey: "building-your-own-tools",
        task:
          "Pick one repeated, annoying task you'd actually want a custom " +
          "Claude Code command or skill for. Draft a plan for it below, " +
          "using the same role -> context -> task -> format structure " +
          "from Prompting 101 -- format is more free-form here, so leave " +
          "it blank or loose if that fits better.",
        placeholders: {
          role: "e.g. You're an assistant helping me build a Claude Code command.",
          context:
            "What repeated task this solves -- what do you find yourself " +
            "asking for the same way, over and over?",
          task: "What should the command or skill actually do, in plain terms?",
          format:
            "Optional -- loose is fine here (e.g. \"a short checklist\" " +
            "or leave blank).",
          constraints: "Any boundaries or things it should avoid (optional).",
          tone: "Optional -- not usually relevant for a command definition.",
          example:
            "A sample of what triggering it should produce, if you have " +
            "one in mind (optional).",
        },
      },
    },
  ],
};
