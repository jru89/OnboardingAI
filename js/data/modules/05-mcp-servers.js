// Module 5: MCP Servers (FR-008).
//
// What an MCP server is and what belongs in an MCP configuration, in plain
// non-technical language -- NFR-003 applies especially hard here, so every
// term is defined inline and via glossaryTerms on first use.
//
// Lab type "match" -- lab.config is a bare array of
// {prompt, options, correctOption, id?}. Used here as short scenario Q&A:
// "would this go in an MCP config?"

export default {
  id: "mcp-servers",
  order: 5,
  title: "MCP Servers",
  summary:
    "What an MCP server is, in plain language, and what actually belongs " +
    "in an MCP configuration.",
  content: [
    {
      heading: "What problem does MCP solve?",
      body:
        "<p>Claude Code, on its own, can read and edit files and run " +
        "commands in your project folder -- but a lot of useful " +
        "information lives somewhere else entirely: your calendar, a " +
        "company database, a search engine, a project-tracking tool. " +
        "<strong>MCP</strong> stands for <strong>Model Context " +
        "Protocol</strong> -- a shared, open way for an AI assistant to " +
        "connect to those outside tools and data sources, instead of " +
        "every company inventing its own private, incompatible way of " +
        "doing it.</p>" +
        "<p>Think of MCP the way you'd think of a universal plug adapter: " +
        "it doesn't matter what's on the other end -- a calendar, a " +
        "database, a search tool -- as long as it speaks MCP, Claude Code " +
        "can plug into it the same way every time.</p>",
      glossaryTerms: [
        {
          term: "MCP (Model Context Protocol)",
          definition:
            "A shared, open way for an AI assistant to connect to " +
            "outside tools and data sources -- like a calendar or " +
            "database -- so it isn't limited to only what's in your " +
            "project folder.",
        },
      ],
    },
    {
      heading: "What's an MCP server, then?",
      body:
        "<p>Each individual connection point -- the calendar connector, " +
        "the database connector, the search connector -- is called an " +
        "<strong>MCP server</strong>: a small program that exposes one " +
        "specific capability (\"check the calendar,\" \"search the web,\" " +
        "\"look up a record\") in the shared MCP language, so Claude Code " +
        "can call on it when it's useful. You don't build these yourself " +
        "as a beginner -- you connect to ones that already exist, the " +
        "same way you'd install an app rather than write one from " +
        "scratch.</p>",
      glossaryTerms: [
        {
          term: "MCP server",
          definition:
            "A small program that exposes one specific capability -- " +
            "like checking a calendar or searching the web -- using the " +
            "shared MCP language, so Claude Code can call on it.",
        },
      ],
    },
    {
      heading: "What goes in an MCP configuration",
      body:
        "<p>An <strong>MCP configuration</strong> is simply a small " +
        "settings file that tells Claude Code which MCP servers to " +
        "connect to, and how -- for example, the command needed to start " +
        "that server, and any access details it needs. It holds " +
        "connection settings, not the information itself: your actual " +
        "calendar events or database records live wherever they normally " +
        "live and are fetched fresh each time, not copied into the config " +
        "file.</p>" +
        "<p>A useful rule of thumb: if it's a plumbing detail about " +
        "<em>how to connect</em> to a tool, it likely belongs in an MCP " +
        "config. If it's something you're asking about <em>in the " +
        "moment</em> -- a question, a document, a one-off request -- that " +
        "belongs in your prompt (the chat), not the config.</p>",
      glossaryTerms: [
        {
          term: "MCP configuration",
          definition:
            "A settings file that tells Claude Code which MCP servers to " +
            "connect to and how -- connection details, not the " +
            "information itself.",
        },
      ],
    },
  ],
  labs: [
    {
      id: "module-5-match",
      type: "match",
      graded: false,
      config: [
        {
          id: "calendar-connection",
          prompt:
            "A setting that tells Claude Code to connect to your " +
            "calendar app so it can check your schedule.",
          options: [
            "Yes, this belongs in an MCP config",
            "No, this doesn't belong there",
          ],
          correctOption: "Yes, this belongs in an MCP config",
        },
        {
          id: "resume-text",
          prompt: "The text of your resume that you want summarized.",
          options: [
            "Yes, this belongs in an MCP config",
            "No, this doesn't belong there",
          ],
          correctOption: "No, this doesn't belong there",
        },
        {
          id: "weather-tool-command",
          prompt:
            "The command and address needed to start a weather-lookup " +
            "tool so Claude Code can use it.",
          options: [
            "Yes, this belongs in an MCP config",
            "No, this doesn't belong there",
          ],
          correctOption: "Yes, this belongs in an MCP config",
        },
        {
          id: "favorite-color",
          prompt: "Your favorite color, just for context in a conversation.",
          options: [
            "Yes, this belongs in an MCP config",
            "No, this doesn't belong there",
          ],
          correctOption: "No, this doesn't belong there",
        },
      ],
    },
  ],
};
