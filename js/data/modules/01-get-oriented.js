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
  ],
};
