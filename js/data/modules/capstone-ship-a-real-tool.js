// Module: Capstone -- Ship a Real Tool (FR-017, NFR-005).
//
// The final module -- replaces "Graduation" in the Yolan profile's list
// only (FR-017). Deliberately lean, mirroring 12-graduation.js's spirit: a
// clear goal and a short set of steps, not a sprawling worksheet.
//
// Privacy (NFR-005): references to Yolan's own project ideas below stay at
// exactly the generality already documented in
// docs/planning/yolan-track-plan.md's "Examples flavor" and "Privacy note"
// sections -- a personal to-do app or a reflection/self-management tool as
// well-scoped capstone candidates, and a trajectory-planning app for an
// alternative school program as an explicit later stretch goal, not the
// capstone itself. No direct quotes and no identifying specifics beyond
// what that doc already states.
//
// `order: 15` describes this module's position within Yolan's own
// 15-module track only (see data-model.md's Module/Module Track
// distinction) -- wiring it into any track's ordered array is WP04's job.
// Not marked for reuse (unlike Spec-Driven Development / Building Your Own
// Tools), so this file may be, and is, Yolan-specific.
//
// Lab type "checklist" -- see js/views/labs/checklist-lab.js: lab.config is
// a bare array of {id, label}, non-graded.

export default {
  id: "capstone-ship-a-real-tool",
  order: 15,
  title: "Capstone: Ship a Real Tool",
  summary:
    "Pick one real small tool you actually want, build it, verify it " +
    "works, and publish it -- the handoff to building for yourself.",
  content: [
    {
      heading: "Now build something real",
      body:
        "<p>Everything up to this point has been practice. This module is " +
        "the handoff: pick one real small tool you actually want, and " +
        "build it, using everything covered so far -- the terminal, " +
        "Claude Code, Git and GitHub, MCP if it's relevant, and the " +
        "spec-driven habits from earlier in this track.</p>",
    },
    {
      heading: "Picking your tool",
      body:
        "<p>A good first candidate is small enough to actually finish, " +
        "and already something you want. Two strong starting candidates: " +
        "a personal to-do app, or a simple reflection/self-management " +
        "tool. Either is well-scoped enough to ship as a first real " +
        "project.</p>" +
        "<p>If you have a bigger, more ambitious idea in mind -- like a " +
        "planning tool for a larger project you're involved with -- save " +
        "it for <em>after</em> this first one ships. Finishing something " +
        "small first builds the skills and confidence a bigger idea needs " +
        "later.</p>",
    },
    {
      heading: "Build, verify, publish",
      body:
        "<p>Three plain steps, in order:</p>" +
        "<ol>" +
        "<li><strong>Build</strong> a first working version -- it doesn't " +
        "need to be polished, just functional.</li>" +
        "<li><strong>Verify</strong> that it actually does what you " +
        "wanted -- not just \"it runs,\" but try it for real, the way " +
        "you'd actually use it.</li>" +
        "<li><strong>Publish</strong> it -- push it to GitHub, at " +
        "minimum, per \"GitHub & Hosting\" earlier in this track.</li>" +
        "</ol>",
    },
    {
      heading: "Before you start, one reminder",
      body:
        "<p>As covered in Data Safety, never paste real or proprietary " +
        "data into an AI chat. That applies here too: if the tool you " +
        "build ever touches anything sensitive -- even your own personal " +
        "data, if it's the kind you wouldn't want exposed -- keep that in " +
        "mind as you build it and as you share it.</p>",
    },
  ],
  labs: [
    {
      id: "module-capstone-ship-a-real-tool-checklist",
      type: "checklist",
      graded: false,
      config: [
        { id: "picked-tool", label: "Picked one real tool to build" },
        {
          id: "built-first-version",
          label: "Built a first working version",
        },
        { id: "verified-it-works", label: "Verified it actually works" },
        {
          id: "published-it",
          label: "Published it (e.g. pushed to GitHub)",
        },
      ],
    },
  ],
};
