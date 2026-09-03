// Module 9: Claude Code vs. Gemini (FR-016).
//
// When to reach for which tool -- completable without an account for
// either, per FR-016.
//
// Lab type "match" -- lab.config is a bare array of
// {prompt, options: string[], correctOption, id?}. Used as a "which tool
// for this task?" mini-quiz, options being the two tool names.

const TOOL_OPTIONS = ["Claude Code", "Gemini"];

export default {
  id: "claude-vs-gemini",
  order: 9,
  title: "Claude Code vs. Gemini",
  summary:
    "When to reach for Claude Code and when Gemini is the better fit -- " +
    "no account needed for either to follow along here.",
  content: [
    {
      heading: "Two different jobs",
      body:
        "<p>You've spent this whole course inside Claude Code, but it " +
        "isn't the only AI tool you'll run into -- <strong>Gemini</strong> " +
        "is Google's AI assistant family, and you'll likely meet it too, " +
        "including through <strong>Gemini Enterprise</strong> chatbots " +
        "like the one you'll build in Module 12. The two aren't " +
        "competitors for the same job so much as tools built around " +
        "different strengths.</p>" +
        "<p>Claude Code is built to work directly inside a project " +
        "folder on your own computer: reading files, editing them, " +
        "running commands, and carrying out multi-step technical work " +
        "with your permission at every change (Module 2). It's the tool " +
        "you reach for when the task <em>is</em> the files and the " +
        "project itself.</p>" +
        "<p>Gemini -- especially through a Gemini Enterprise chatbot -- " +
        "is built to be a focused, conversational assistant for a " +
        "specific job, often shared with a whole team, answering " +
        "questions or working from material you hand it in the chat " +
        "rather than reaching into a project folder on your computer. " +
        "It's the tool you reach for when the task is a conversation or " +
        "a narrowly scoped, repeatable job -- not a project on disk.</p>",
      glossaryTerms: [
        {
          term: "Gemini",
          definition:
            "Google's AI assistant family. Distinct from Claude Code -- " +
            "typically a conversational assistant rather than a tool " +
            "that reads and edits files on your own computer.",
        },
        {
          term: "Gemini Enterprise",
          definition:
            "A version of Gemini built for standing up focused, " +
            "shareable chatbots for a specific job -- the kind of tool " +
            "you'll build your own version of in Module 12.",
        },
      ],
    },
    {
      heading: "A quick comparison",
      body:
        "<table class=\"content-table\">" +
        "<thead><tr><th scope=\"col\"></th><th scope=\"col\">Claude Code</th>" +
        "<th scope=\"col\">Gemini</th></tr></thead>" +
        "<tbody>" +
        "<tr><th scope=\"row\">Works inside a project folder on your " +
        "computer</th><td>Yes</td><td>No</td></tr>" +
        "<tr><th scope=\"row\">Reads/edits real files with your " +
        "permission</th><td>Yes</td><td>No</td></tr>" +
        "<tr><th scope=\"row\">Good for a focused, shareable chatbot for " +
        "one repeatable job</th><td>Not its design</td><td>Yes " +
        "(Gemini Enterprise)</td></tr>" +
        "<tr><th scope=\"row\">Good for multi-step technical tasks on " +
        "your own machine</th><td>Yes</td><td>Not its design</td></tr>" +
        "</tbody>" +
        "</table>" +
        "<p>Neither is \"better\" in general -- the question is always " +
        "which job you're doing. Building or maintaining something on " +
        "your own machine points to Claude Code. Wanting a focused " +
        "assistant other people can also use for a specific, repeatable " +
        "task points to Gemini.</p>",
    },
  ],
  labs: [
    {
      id: "module-9-match",
      type: "match",
      graded: false,
      config: [
        {
          id: "edit-project-files",
          prompt:
            "You need to rename a batch of files in a project folder and " +
            "update the code that references them.",
          options: TOOL_OPTIONS,
          correctOption: "Claude Code",
        },
        {
          id: "shared-team-chatbot",
          prompt:
            "Your team wants a shared chatbot that turns meeting notes " +
            "into formatted minutes, for anyone on the team to use.",
          options: TOOL_OPTIONS,
          correctOption: "Gemini",
        },
        {
          id: "multi-step-cleanup",
          prompt:
            "You want to clean up a messy spreadsheet on your computer: " +
            "standardize headers, fix formatting, and flag duplicates.",
          options: TOOL_OPTIONS,
          correctOption: "Claude Code",
        },
        {
          id: "narrow-repeatable-job",
          prompt:
            "You want one focused assistant, usable by non-technical " +
            "colleagues, that only ever does one repeatable job.",
          options: TOOL_OPTIONS,
          correctOption: "Gemini",
        },
        {
          id: "run-commands-with-permission",
          prompt:
            "You need something to run a command in your project and " +
            "check the result before deciding what to do next.",
          options: TOOL_OPTIONS,
          correctOption: "Claude Code",
        },
      ],
    },
  ],
};
