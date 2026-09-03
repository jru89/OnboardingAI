// Module 7: Mock Use-Cases (FR-013).
//
// Practice pulling realistic content into her own session: four downloadable
// mock-scenario .md files, authored by WP09 under content/mock-use-cases/.
// This module is brief framing only -- the files themselves carry their own
// "how to use this file" instructions and a worked scenario.
//
// Lab type "download" -- see js/views/labs/download-lab.js: lab.config is a
// bare array of {label, path}. One entry per file WP09 actually created
// (confirmed by listing content/mock-use-cases/ directly, not guessed):
//   - draft-a-client-email.md
//   - summarize-a-meeting.md
//   - plan-a-spreadsheet-cleanup.md
//   - write-a-project-update.md

export default {
  id: "mock-use-cases",
  order: 7,
  title: "Mock Use-Cases",
  summary:
    "Four realistic practice files to download and try in your own " +
    "Claude Code session -- an email, a meeting recap, a spreadsheet " +
    "cleanup, and a status update.",
  content: [
    {
      heading: "What these files are",
      body:
        "<p>Every module so far has stayed inside this app. This one sends " +
        "you somewhere else on purpose: each file below is a short, " +
        "realistic scenario -- a fake company, a fake client, a messy " +
        "spreadsheet description -- written the way a real request would " +
        "land in your inbox. None of it is real; names and companies are " +
        "invented, and each file says so at the bottom.</p>" +
        "<p>Each one already includes its own \"how to use this file\" " +
        "instructions and a suggested first prompt, so you don't need to " +
        "guess what to ask for.</p>",
    },
    {
      heading: "How to use them",
      body:
        "<p>Download a file below, then open your own real Claude Code " +
        "session and either paste the file's contents into the chat or " +
        "point Claude Code at the downloaded file directly. Start with the " +
        "suggested prompt printed near the top of the file, then keep " +
        "going: ask for a shorter version, a different tone, or a second " +
        "draft that fixes something specific. Treating the first reply as " +
        "a draft rather than a final answer -- something you'll practice " +
        "more in Module 8 -- is exactly the habit these files are built " +
        "to exercise.</p>" +
        "<p>There's no submission or grading here. The four scenarios " +
        "cover different everyday writing tasks -- an email, a meeting " +
        "recap, a cleanup plan, and a status update -- so try more than " +
        "one if you have time.</p>",
    },
  ],
  labs: [
    {
      id: "module-7-download",
      type: "download",
      graded: false,
      config: [
        {
          label: "Draft a client update email",
          path: "content/mock-use-cases/draft-a-client-email.md",
        },
        {
          label: "Summarize a meeting",
          path: "content/mock-use-cases/summarize-a-meeting.md",
        },
        {
          label: "Plan a spreadsheet cleanup",
          path: "content/mock-use-cases/plan-a-spreadsheet-cleanup.md",
        },
        {
          label: "Write a project update",
          path: "content/mock-use-cases/write-a-project-update.md",
        },
      ],
    },
  ],
};
