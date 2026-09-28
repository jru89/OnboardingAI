// Module: Claude Code, from the Command Line (FR-005, Yolan's CLI track).
//
// CLI-specific orientation -- the direct counterpart to the shared app's
// IDE-framed "Get Oriented" module (js/data/modules/01-get-oriented.js),
// for someone who will only ever see Claude Code in a terminal. Same
// shape and rigor as that module (three things to look for, permission
// prompts, "Claude can do more than answer you," official docs link), but
// reframed around a terminal session -- no panel, no activity bar, no IDE
// framing. Third module in Yolan's track (order: 3).
//
// This module is the ONLY place in Yolan's 15-module track that defines
// "Claude Code," "project," and "permission prompt" -- the shared
// "Get Oriented" module (which normally defines them) is not part of
// Yolan's track, and no earlier module in Yolan's own order (Terminal
// Basics, Make Your Terminal Yours) defines them either. See this WP's
// spec-kitty analysis finding I1.
//
// Shape: data-model.md's Module ({id, order, title, summary, content, labs}).
// Lab type "quiz" -- see js/views/labs/quiz-lab.js; config is an array of
// {id, question, options, correctIndex, explanation}, matching the shared
// module's house style.

export default {
  id: "claude-code-cli-orientation",
  order: 3,
  title: "Claude Code, from the Command Line",
  summary:
    "How to launch Claude Code in a terminal, recognize a permission " +
    "prompt when it appears, and get comfortable asking for help the " +
    "moment something doesn't work.",
  content: [
    {
      heading: "Getting Claude Code installed",
      body:
        "<p>Before any of this works, Claude Code has to actually be " +
        "installed on your machine -- a one-time step. Rather than a " +
        "fixed command here that could go stale, head to the same " +
        "official documentation linked in \"See it in action\" below and " +
        "follow its current installation instructions for macOS. This is " +
        "the exact same reasoning as copying the Homebrew install command " +
        "fresh from brew.sh in \"Make Your Terminal Yours\" -- the " +
        "official source is always more current than any command written " +
        "into a lesson.</p>" +
        "<p>Most install paths expect Node.js to already be available -- " +
        "if the instructions ask for it and you don't have it yet, " +
        "<code>brew install node</code> (using the Homebrew you set up " +
        "earlier) is the standard way to get it on a Mac.</p>" +
        "<p>Once installed, you can confirm it worked with:</p>" +
        "<pre>claude --version</pre>" +
        "<p>If installation doesn't go smoothly, that's genuinely normal " +
        "and not a sign you did something wrong -- search the exact error " +
        "message, or ask someone (a friend, a plain AI chatbot, an online " +
        "forum) to help troubleshoot it. You won't have Claude Code itself " +
        "to ask yet at this exact step, but you will for everything after " +
        "it works once.</p>",
    },
    {
      heading: "Launching Claude Code",
      body:
        "<p><strong>Claude Code</strong> is Anthropic's official AI " +
        "coding assistant. It's an AI assistant you talk to in plain " +
        "English, and unlike a typical chatbot, it can read, edit, and " +
        "run things in your project -- always asking permission first for " +
        "anything that changes something. On your machine, you'll run it " +
        "entirely from the terminal, using the skills from \"Terminal " +
        "Basics.\"</p>" +
        "<p>To start a session: open a terminal, use <code>cd</code> to " +
        "navigate into the folder for the work you're doing -- your " +
        "<strong>project</strong> -- and then type <code>claude</code> " +
        "and press Enter. That's the whole command -- just the one word.</p>" +
        "<pre>claude</pre>" +
        "<p>Whichever folder you were in when you started " +
        "it becomes the project Claude Code is working in: it can only " +
        "see and change files inside that folder, the same rule as the " +
        "editor version of Claude Code -- just that here, " +
        "\"being there\" means the folder you `cd`'d into before " +
        "launching, instead of a folder opened in an editor window.</p>",
      glossaryTerms: [
        {
          term: "Claude Code",
          definition:
            "Anthropic's official AI coding assistant. It's an AI " +
            "assistant you talk to in plain English, and unlike a " +
            "typical chatbot, it can read, edit, and run things in your " +
            "project -- always asking permission first for anything that " +
            "changes something.",
        },
        {
          term: "project",
          definition:
            "A folder of related files on your computer -- for example, " +
            "all the files for one document, app, or piece of work. " +
            "Claude Code only works inside the project folder you were " +
            "in when you started it.",
        },
      ],
    },
    {
      heading: "What you'll see",
      body:
        "<p>Once Claude Code starts, you'll see a prompt at the bottom of " +
        "the terminal window where you type -- just type what you want in " +
        "your own words, the same way you'd text a very capable " +
        "assistant, and press Enter.</p>" +
        "<p>When Claude Code wants to change a file or run a command on " +
        "your computer, it stops and shows a <strong>permission " +
        "prompt</strong>: a clear yes/no choice printed right in the " +
        "terminal. Nothing happens until you answer.</p>" +
        "<p>Treat that moment as a pause to stop and understand what's " +
        "being asked -- not something to click (or type) through on " +
        "autopilot. Read what it says it wants to do. If it's clear and " +
        "matches what you asked for, approve it. If anything is unclear, " +
        "it's fine to say no or ask a question first. Claude Code will " +
        "always ask -- but only you can decide whether the answer should " +
        "be yes.</p>",
      glossaryTerms: [
        {
          term: "permission prompt",
          definition:
            "A pause-and-ask message Claude Code prints in the terminal " +
            "before it does anything that changes a file or runs a " +
            "command on your computer. Nothing happens until you " +
            "approve it.",
        },
      ],
    },
    {
      heading: "When you're stuck, ask",
      body:
        "<p>If a command fails, an install step doesn't work, or you " +
        "don't know the right terminal command for something, describing " +
        "the problem to Claude Code in plain English is a completely " +
        "normal thing to do -- that's what it's there for.</p>" +
        "<p>You don't need the exact right words or terminology. " +
        "Something as simple as \"I ran this and got this error, what do " +
        "I do?\" -- pasted straight from your terminal -- is exactly the " +
        "kind of thing to type. Building the habit of asking early, " +
        "instead of guessing or getting stuck, is one of the most useful " +
        "skills in this entire course.</p>",
    },
    {
      heading: "See it in action",
      body:
        "<p>Anthropic, the company that builds Claude Code, keeps an " +
        "official introduction and documentation up to date as the " +
        "product changes. Before you go further, take a few minutes to " +
        "skim it:</p>" +
        "<p><a href=\"https://docs.claude.com/en/docs/claude-code/overview\" " +
        "target=\"_blank\" rel=\"noopener noreferrer\">Claude Code overview " +
        "-- official Anthropic documentation &#8599;</a></p>" +
        "<p>This link opens in a new tab and requires an internet " +
        "connection; everything else in this module works fully offline.</p>",
    },
  ],
  labs: [
    {
      id: "module-claude-code-cli-orientation-permission-check",
      type: "quiz",
      graded: true,
      config: [
        {
          id: "read-readme",
          question: "Claude Code asks: \"May I read README.md?\"",
          options: ["Allow", "Don't allow", "Not sure -- inspect first"],
          correctIndex: 0,
          explanation:
            "Reading a file to understand the project is low-risk and " +
            "exactly the kind of thing Claude Code needs permission to " +
            "do routinely.",
        },
        {
          id: "edit-budget",
          question: "Claude Code asks: \"May I edit budget.xlsx?\"",
          options: ["Allow", "Don't allow", "Not sure -- inspect first"],
          correctIndex: 2,
          explanation:
            "Editing a real spreadsheet with numbers you care about is " +
            "worth a quick look first -- ask what it plans to change " +
            "before saying yes.",
        },
        {
          id: "delete-old-notes",
          question: "Claude Code asks: \"May I delete old-notes.md?\"",
          options: ["Allow", "Don't allow", "Not sure -- inspect first"],
          correctIndex: 2,
          explanation:
            "Deleting is hard to undo. Ask what's in the file and why it " +
            "should go before agreeing, even if the name sounds safe to " +
            "remove.",
        },
        {
          id: "run-command",
          question:
            "Claude Code asks: \"May I run this command?\" (and shows " +
            "you the exact command)",
          options: ["Allow", "Don't allow", "Not sure -- inspect first"],
          correctIndex: 2,
          explanation:
            "You're shown the exact command -- read it before deciding. " +
            "If you understand it and it matches what you asked for, " +
            "allow it; if not, ask what it does first.",
        },
        {
          id: "outside-folder",
          question:
            "Claude Code asks: \"May I access a folder outside this " +
            "project?\"",
          options: ["Allow", "Don't allow", "Not sure -- inspect first"],
          correctIndex: 1,
          explanation:
            "Reaching outside the project folder is unusual for the " +
            "tasks this course covers -- don't allow it without " +
            "understanding specifically why it's needed.",
        },
      ],
    },
  ],
};
