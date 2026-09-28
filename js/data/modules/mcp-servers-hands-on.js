// Module: MCP Servers, Hands-On (FR-010, C-005 -- order 8).
//
// Replaces "MCP Servers" in the Yolan profile's module list. Per
// /spec-kitty.analyze finding I2, the shared conceptual "MCP Servers"
// module is excluded from Yolan's 15-module list entirely, so this module
// opens with its own brief "what's MCP" grounding before going hands-on --
// intentionally shorter than the shared module's full treatment (which
// also covers config-file judgment calls this hands-on module doesn't
// need).
//
// C-005: written for future reuse by Wim's track unmodified -- generic
// "you" phrasing throughout, no reference to any specific learner's
// projects, hardware, or CLI-only context (MCP configuration works the
// same whether Claude Code is reached via CLI or IDE).
//
// research.md's "MCP server for the hands-on exercise" decision: use
// Anthropic's official reference filesystem MCP server
// (@modelcontextprotocol/server-filesystem) -- do not substitute another.
//
// Lab type "checklist" -- lab.config is a bare array of {id, label}.
// Non-graded, self-marked, complete once every item is checked.

export default {
  id: "mcp-servers-hands-on",
  order: 8,
  title: "MCP Servers, Hands-On",
  summary:
    "Actually connect and use one real MCP server -- the official " +
    "filesystem server -- instead of just reading about the concept.",
  content: [
    {
      heading: "What's MCP, briefly",
      body:
        "<p><strong>MCP</strong> (<strong>Model Context Protocol</strong>) " +
        "is a shared, open way for an AI assistant to connect to outside " +
        "tools and data -- like a calendar, a database, or in this case a " +
        "folder on your machine -- instead of being limited to only " +
        "what's already in front of it. An <strong>MCP server</strong> is " +
        "one such connection point. An <strong>MCP configuration</strong> " +
        "is the settings file that tells Claude Code which servers to " +
        "use.</p>",
      glossaryTerms: [
        {
          term: "MCP (Model Context Protocol)",
          definition:
            "A shared, open way for an AI assistant to connect to " +
            "outside tools and data, instead of being limited to only " +
            "what's already in front of it.",
        },
        {
          term: "MCP server",
          definition:
            "One connection point reachable over MCP -- a small program " +
            "that exposes a specific capability, like a folder, a " +
            "calendar, or a database, to an AI assistant.",
        },
        {
          term: "MCP configuration",
          definition:
            "The settings file that tells Claude Code which MCP servers " +
            "to connect to and how.",
        },
      ],
    },
    {
      heading: "The server you'll use",
      body:
        "<p>You'll connect to the official reference " +
        "<strong>filesystem MCP server</strong> " +
        "(<code>@modelcontextprotocol/server-filesystem</code>). It's a " +
        "good first server to try because there's nothing to sign up " +
        "for, no API key to obtain, and no external service involved -- " +
        "it simply exposes a folder on your own machine to Claude Code " +
        "over MCP.</p>",
    },
    {
      heading: "Connecting it",
      body:
        "<p>Connecting a server means adding it to Claude Code's MCP " +
        "configuration -- the settings file described above -- and " +
        "pointing it at a folder of your choosing. Once it's added and " +
        "Claude Code picks up the configuration, that folder becomes " +
        "reachable through the MCP connection, the same way any other MCP " +
        "server would be. This works the same way whether you're using " +
        "Claude Code from a terminal or from inside an IDE.</p>",
    },
    {
      heading: "Using it",
      body:
        "<p>Here's the distinction that matters: Claude Code already has " +
        "its own built-in access to the files in your current project. " +
        "What the filesystem MCP server adds is access to a folder " +
        "<em>outside</em> the current project -- exactly the kind of " +
        "reach MCP exists to provide.</p>" +
        "<p>Once it's connected, try asking Claude Code something like " +
        "\"list the files in the folder you're connected to\" or " +
        "\"describe what's in that folder.\" If you get a real answer " +
        "back describing files you know are actually there, the " +
        "connection is working -- and that answer is only possible " +
        "because of the MCP connection, not Claude Code's normal project " +
        "file access.</p>",
    },
    {
      heading: "Beyond this one server",
      body:
        "<p>The filesystem server is just one entry in a large and " +
        "growing ecosystem of MCP servers -- others connect to databases, " +
        "calendars, search engines, and many other tools and services. " +
        "Connecting any new one follows the same basic pattern you just " +
        "practiced here: add it to your MCP configuration, point it at " +
        "whatever it needs, and then ask for something that only that " +
        "connection makes possible.</p>",
    },
  ],
  labs: [
    {
      id: "mcp-servers-hands-on-checklist",
      type: "checklist",
      graded: false,
      config: [
        {
          id: "configured-filesystem-server",
          label: "Installed/configured the filesystem MCP server",
        },
        { id: "pointed-at-real-folder", label: "Pointed it at a real folder" },
        {
          id: "asked-and-saw-result",
          label: "Asked Claude Code to use it and saw a real result",
        },
        {
          id: "explain-the-difference",
          label:
            "Can explain the difference between this and Claude Code's " +
            "normal project file access",
        },
      ],
    },
  ],
};
