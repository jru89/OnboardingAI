// Module 12: Graduation (FR-019, C-002, C-007).
//
// Deliberately lean by design -- see spec.md FR-019, C-002, C-007, and the
// WP08 task file's explicit warning against over-building this module.
// Fixed goal statement, exactly two downloads (both already in the repo
// under docs/reference/), and a handoff to the learner's own real Claude
// Code session. NO worksheet, NO checklist, NO scripted prompts -- C-007
// exists specifically to stop this module from re-hand-holding what the
// learner already has the skills to work out herself after Modules 6-11.
//
// Lab type "download" -- lab.config is a bare array of {label, path}.
// Exactly two entries, matching FR-019's paths verbatim. Do not add a
// third.

export default {
  id: "graduation",
  order: 12,
  title: "Graduation",
  summary:
    "The goal, two reference documents, and a handoff to your own real " +
    "Claude Code session -- everything else is up to you now.",
  content: [
    {
      heading: "Now build something real",
      body:
        "<p>You've practiced every piece you need: structuring a prompt, " +
        "front-loading context, giving explicit process commands, and " +
        "writing clear Markdown. Now put it to use for real: build a " +
        "working Gemini Enterprise bot for a task you actually want " +
        "automated -- a minutes-maker, under any name you choose.</p>" +
        "<p>Download the two documents below, then continue this build " +
        "in your own real Claude Code session from here. This app's job " +
        "ends at the download link; the rest is yours.</p>",
    },
  ],
  labs: [
    {
      id: "module-12-download",
      type: "download",
      graded: false,
      config: [
        {
          label: "Best practices: building a Gemini agent repo",
          path: "docs/reference/gemini-agent-repo-blueprint.md",
        },
        {
          label: "Worked example: Minutes Milo",
          path: "docs/reference/example-agent-minutes-milo.md",
        },
      ],
    },
  ],
};
