// Module 1: Get Oriented (FR-003).
//
// Interface orientation before any conceptual content -- a labeled walkthrough
// of the Claude Code interface (input box, project/file context, permission
// prompts) plus a link to Anthropic's official documentation, and a short
// non-graded checklist lab.
//
// Shape: data-model.md's Module ({id, order, title, summary, content, labs}).
// Lab type "checklist" -- see js/views/labs/checklist-lab.js: lab.config may
// be a bare array of {id, label} or {items: [...]}; this file uses the bare
// array form (data-model.md's literal wording).

export default {
  id: "get-oriented",
  order: 1,
  title: "Get Oriented",
  summary:
    "A guided tour of the Claude Code interface -- where to type, where " +
    "your project shows up, and what a permission prompt means -- before " +
    "you touch anything for real.",
  content: [
    {
      heading: "Where you are, and what you're looking at",
      body:
        "<p>Claude Code lives in a <strong>terminal</strong> -- a plain, " +
        "text-based window where you type commands and see responses, " +
        "instead of clicking buttons in a typical app. It might look " +
        "intimidating at first, but you'll only ever need to do one thing " +
        "in it: type in plain English and read what comes back.</p>" +
        "<p>The diagram below labels the three things you'll look for " +
        "every time you open Claude Code:</p>" +
        "<ol>" +
        "<li><strong>The input box</strong> -- near the bottom of the " +
        "window. This is where you type what you want, in your own " +
        "words, just like texting a very capable assistant.</li>" +
        "<li><strong>Project/file context</strong> -- usually shown near " +
        "the top or in the window title. This tells you which " +
        "<strong>project</strong> Claude Code is currently working in. " +
        "Claude Code can only see and change files inside that folder.</li>" +
        "<li><strong>Permission prompts</strong> -- a message that pauses " +
        "everything and asks \"can I do this?\" before Claude Code runs a " +
        "command or changes a file. You'll see a clear yes/no choice; " +
        "nothing happens until you answer.</li>" +
        "</ol>",
      diagram: "assets/svg/interface-map.svg",
      glossaryTerms: [
        {
          term: "Claude Code",
          definition:
            "Anthropic's official command-line assistant. It's an AI " +
            "assistant you talk to in plain English, and unlike a typical " +
            "chatbot, it can read, edit, and run things on your own " +
            "computer -- always asking permission first for anything " +
            "that changes something.",
        },
        {
          term: "terminal",
          definition:
            "A plain, text-only window for typing commands and reading " +
            "responses, instead of clicking through menus and buttons. It " +
            "looks old-fashioned, but you only ever need to type and read.",
        },
        {
          term: "prompt",
          definition:
            "The instruction you type telling Claude Code (or any AI " +
            "assistant) what you want it to do. \"Prompting\" just means " +
            "writing that instruction well -- Module 6 covers this in " +
            "depth.",
        },
        {
          term: "project",
          definition:
            "A folder of related files on your computer -- for example, " +
            "all the files for one document, app, or piece of work. " +
            "Claude Code only works inside the project folder you've " +
            "opened.",
        },
        {
          term: "permission prompt",
          definition:
            "A pause-and-ask message Claude Code shows before it does " +
            "anything that changes a file or runs a command on your " +
            "computer. Nothing happens until you approve it.",
        },
      ],
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
    {
      heading: "Claude can do more than answer you",
      body:
        "<p>Claude Code isn't just a chat window. Once it's working in " +
        "your project, it can <strong>read your files</strong> to " +
        "understand them, <strong>create new files</strong>, " +
        "<strong>modify files</strong> that already exist, and " +
        "<strong>run commands</strong> on your computer -- the same kinds " +
        "of actions you could take yourself, just done on your behalf.</p>" +
        "<p>That's real power, so some of those actions require your " +
        "permission first. That's what the permission prompt from the " +
        "previous section is for: before Claude Code changes a file or " +
        "runs a command, it stops and asks.</p>" +
        "<p>When that prompt appears, treat it as a moment to stop and " +
        "understand what's being asked -- not something to click through " +
        "on autopilot. Read what it says it wants to do. If it's clear " +
        "and matches what you asked for, approve it. If anything is " +
        "unclear, it's fine to say no or ask a question first.</p>" +
        "<p>You are the one responsible for approving each action. Claude " +
        "Code will always ask -- but only you can decide whether the " +
        "answer should be yes.</p>",
    },
  ],
  labs: [
    {
      id: "module-1-checklist",
      type: "checklist",
      graded: false,
      config: [
        {
          id: "find-input-box",
          label: "Find the input box where you type to Claude Code",
        },
        {
          id: "open-a-project",
          label: "Open a project folder so Claude Code knows what you're working on",
        },
        {
          id: "spot-permission-prompt",
          label: "Recognize what a permission prompt looks like before Claude Code acts",
        },
        {
          id: "locate-file-context",
          label: "Locate where Claude Code shows which project/files it's using",
        },
      ],
    },
    {
      id: "module-1-permission-check",
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
