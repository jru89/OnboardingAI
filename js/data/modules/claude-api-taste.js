// Module: A Taste of the Claude API (FR-015).
//
// Explicitly "a taste," not a full tutorial (research.md's "Claude API
// taste module -- scope boundary" decision): one minimal example, no
// streaming, no tool use, no multi-turn conversation. Not marked for reuse
// (unlike Spec-Driven Development / Building Your Own Tools), so this file
// may be -- and is -- Yolan-specific in tone where it helps, though the
// content itself stays general-purpose (nothing about his particular
// project ideas belongs here; that's the Capstone module's job).
//
// `order: 13` describes this module's position within Yolan's own
// 15-module track only (see data-model.md's Module/Module Track
// distinction) -- wiring it into any track's ordered array is WP04's job.
//
// "API key" is already defined as a glossaryTerm in 03-data-safety.js --
// this file references it in prose rather than redefining it, and only
// adds a new glossaryTerms entry for "API" itself.
//
// Lab type "checklist" -- see js/views/labs/checklist-lab.js: lab.config is
// a bare array of {id, label}, non-graded.

export default {
  id: "claude-api-taste",
  order: 13,
  title: "A Taste of the Claude API",
  summary:
    "Beyond Claude Code itself: a minimal example of calling Claude's API " +
    "directly from your own small program.",
  content: [
    {
      heading: "Claude Code vs. the API directly",
      body:
        "<p>Claude Code is a whole assistant with a user interface -- in " +
        "your case, a terminal -- built on top of Anthropic's " +
        "<strong>API</strong>. The API itself is the raw building block " +
        "underneath: a way for any program to send Claude a message and " +
        "get a reply back, with no chat interface involved at all.</p>" +
        "<p>That means you can write your own small program -- completely " +
        "separate from Claude Code -- that sends one message to Claude " +
        "and prints whatever comes back. That's the API, used directly.</p>",
      glossaryTerms: [
        {
          term: "API",
          definition:
            "Short for Application Programming Interface -- a way for one " +
            "program to talk to another. Anthropic's API lets any program " +
            "you write send Claude a message and get a reply, with no " +
            "chat interface required.",
        },
      ],
    },
    {
      heading: "One minimal example",
      body:
        "<p>Here's the smallest useful example: a short script that sends " +
        "one message to the Claude API and prints the reply. It's shown " +
        "here in Python, since Anthropic's official Python SDK is a " +
        "common starting point for exactly this kind of first script -- " +
        "the same idea works in other languages too, including " +
        "JavaScript.</p>" +
        "<p>Two things you'll need before running it: an API key -- get " +
        "one from " +
        "<a href=\"https://console.anthropic.com\" target=\"_blank\" " +
        "rel=\"noopener noreferrer\">console.anthropic.com &#8599;</a>, " +
        "under API Keys -- and the Python package that talks to it. Note " +
        "that this is a separate account/key from Claude Code itself: " +
        "Claude Code handles its own login, but a program you write " +
        "talking to the API directly needs its own key.</p>" +
        "<pre>pip install anthropic</pre>" +
        "<p>Treat that API key exactly like the passwords and tokens " +
        "covered in Data Safety -- never paste it into a chat or commit it " +
        "to a repo. The example below reads it from an environment " +
        "variable instead, which is the standard, safe way to keep it out " +
        "of your actual code.</p>" +
        "<pre>import anthropic\n\n" +
        "client = anthropic.Anthropic()  # reads your API key from the " +
        "environment\n\n" +
        "response = client.messages.create(\n" +
        '    model="claude-sonnet-5",\n' +
        "    max_tokens=1024,\n" +
        '    messages=[{"role": "user", "content": "Say hello in one sentence."}],\n' +
        ")\n\n" +
        "print(response.content[0].text)</pre>" +
        "<p>Run it, and instead of a chat window, you get one printed " +
        "reply -- the whole exchange is just: send one message, get one " +
        "answer back. This is intentionally the smallest possible example " +
        "-- it doesn't cover streaming replies, giving Claude tools to " +
        "call, or back-and-forth multi-turn conversations. Those are real " +
        "capabilities of the API, just outside the scope of this taste.</p>",
    },
    {
      heading: "Why this matters",
      body:
        "<p>Once you can call the API directly, you're no longer limited " +
        "to using Claude through Claude Code's own interface -- you can " +
        "build your own small tools and apps with Claude's abilities " +
        "baked directly into them. That's a meaningfully different skill " +
        "from prompting Claude Code well, and it's the door to building " +
        "genuinely custom things, not just using an existing assistant.</p>",
    },
    {
      heading: "Where to go deeper",
      body:
        "<p>This module is intentionally just a taste. For anything " +
        "beyond this minimal example -- authentication details, other " +
        "languages, streaming, tool use, and everything else the API can " +
        "do -- Anthropic's own API documentation is the place to go, " +
        "rather than this module trying to be that reference itself.</p>",
    },
  ],
  labs: [
    {
      id: "module-claude-api-taste-checklist",
      type: "checklist",
      graded: false,
      config: [
        { id: "got-api-key", label: "Got an API key" },
        { id: "ran-example-script", label: "Ran the example script" },
        { id: "saw-real-reply", label: "Saw a real reply printed" },
        {
          id: "changed-prompt-ran-again",
          label: "Changed the prompt and ran it again",
        },
      ],
    },
  ],
};
