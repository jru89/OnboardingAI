// Module 2: What Is AI / Claude Code vs. LLM (FR-004).
//
// Conceptual grounding: what an LLM is, and what makes Claude Code more than
// a chatbot (tool use, file access, multi-step execution). Includes a plain
// HTML comparison table in the content body (no SVG dependency).
//
// Lab type "match" -- see js/views/labs/match-lab.js: lab.config is a bare
// array of {prompt, options: string[], correctOption, id?}. Used here as a
// sort/bucket exercise: "true of any chatbot" vs. "specific to Claude Code."

export default {
  id: "ai-vs-claude-code",
  order: 2,
  title: "AI vs. Claude Code",
  summary:
    "What a large language model actually is, and exactly what makes " +
    "Claude Code more than a chatbot.",
  content: [
    {
      heading: "What is an LLM?",
      body:
        "<p>Most AI chat tools you may have used -- including the plain " +
        "chat window version of Claude, ChatGPT, or similar -- are built " +
        "on a <strong>large language model</strong>, or <strong>LLM</strong>. " +
        "An LLM is a program trained on enormous amounts of text so it can " +
        "predict, and generate, natural-sounding language in response to " +
        "whatever you type. When you type a question, it doesn't \"look " +
        "anything up\" the way a search engine does -- it generates a " +
        "response, one piece at a time, based on patterns learned during " +
        "training.</p>" +
        "<p>A plain LLM <strong>chatbot</strong> -- a chat window you type " +
        "into and get text back from -- is genuinely useful for writing, " +
        "brainstorming, and explaining things. But by itself, it can only " +
        "talk. It cannot open a file on your computer, run a program, or " +
        "take any action outside the chat window.</p>",
      glossaryTerms: [
        {
          term: "LLM (large language model)",
          definition:
            "A type of AI trained on huge amounts of text to predict and " +
            "generate natural-sounding language. It's the technology " +
            "underneath both plain chatbots and Claude Code.",
        },
        {
          term: "chatbot",
          definition:
            "A chat window you type into and get text responses from. On " +
            "its own, a chatbot can only talk -- it can't act on files or " +
            "programs outside the conversation.",
        },
      ],
    },
    {
      heading: "What makes Claude Code different",
      body:
        "<p>Claude Code is built on the same kind of underlying model, but " +
        "it isn't just a chat window -- it's given <strong>tool use</strong>: " +
        "the ability to actually call real tools, like \"read this file,\" " +
        "\"edit this line,\" or \"run this command,\" and see the result " +
        "before deciding what to do next. Combined with direct " +
        "<strong>file access</strong> to your project folder and the " +
        "ability to work through a task in several steps on its own -- " +
        "reading, then editing, then checking its own work -- without you " +
        "re-typing instructions at every step (<strong>multi-step " +
        "execution</strong>), it can actually get things done, not just " +
        "describe how you might do them.</p>" +
        "<p>Every one of those actions that changes something is still " +
        "gated behind the permission prompt you saw in Module 1 -- Claude " +
        "Code never edits a file or runs a command without asking first.</p>" +
        "<table class=\"content-table\">" +
        "<thead><tr><th scope=\"col\"></th><th scope=\"col\">Any chatbot</th>" +
        "<th scope=\"col\">Claude Code</th></tr></thead>" +
        "<tbody>" +
        "<tr><th scope=\"row\">Holds a conversation</th><td>Yes</td><td>Yes</td></tr>" +
        "<tr><th scope=\"row\">Reads/edits files on your computer</th>" +
        "<td>No</td><td>Yes (with permission)</td></tr>" +
        "<tr><th scope=\"row\">Runs commands or programs</th>" +
        "<td>No</td><td>Yes (with permission)</td></tr>" +
        "<tr><th scope=\"row\">Plans and carries out several steps unaided</th>" +
        "<td>No</td><td>Yes</td></tr>" +
        "</tbody>" +
        "</table>",
      glossaryTerms: [
        {
          term: "tool use",
          definition:
            "An AI assistant's ability to call a real, defined action -- " +
            "like \"read this file\" or \"run this command\" -- and see " +
            "the result, rather than just producing text.",
        },
        {
          term: "file access",
          definition:
            "The ability to open, read, and edit real files inside your " +
            "project folder.",
        },
        {
          term: "multi-step execution",
          definition:
            "Working through several steps of a task on its own -- for " +
            "example reading a file, editing it, then checking the " +
            "result -- without needing a fresh instruction at every step.",
        },
      ],
    },
  ],
  labs: [
    {
      id: "module-2-match",
      type: "match",
      graded: false,
      config: [
        {
          id: "responds-with-patterns",
          prompt:
            "It responds to your questions using patterns learned from " +
            "huge amounts of text.",
          options: ["Any chatbot", "Claude Code specifically"],
          correctOption: "Any chatbot",
        },
        {
          id: "reads-project-files",
          prompt: "It can open and read the actual files in your project folder.",
          options: ["Any chatbot", "Claude Code specifically"],
          correctOption: "Claude Code specifically",
        },
        {
          id: "remembers-conversation",
          prompt:
            "It carries on a conversation, remembering what you said " +
            "earlier in the chat.",
          options: ["Any chatbot", "Claude Code specifically"],
          correctOption: "Any chatbot",
        },
        {
          id: "multi-step-plan",
          prompt:
            "It can make a multi-step plan and carry it out -- for " +
            "example, edit three files and then run a test -- without " +
            "you re-typing each step.",
          options: ["Any chatbot", "Claude Code specifically"],
          correctOption: "Claude Code specifically",
        },
        {
          id: "asks-permission",
          prompt:
            "It asks for your permission before it runs a command or " +
            "changes a file on your computer.",
          options: ["Any chatbot", "Claude Code specifically"],
          correctOption: "Claude Code specifically",
        },
        {
          id: "text-only-window",
          prompt:
            "It can only respond with text in the chat window -- it has " +
            "no way to reach outside that conversation.",
          options: ["Any chatbot", "Claude Code specifically"],
          correctOption: "Any chatbot",
        },
      ],
    },
  ],
};
