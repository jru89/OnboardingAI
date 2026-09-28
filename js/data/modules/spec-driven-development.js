// Module: Spec-Driven Development (FR-013, C-005).
//
// Written generically for future reuse (C-005) -- Wim's own future mission
// is expected to wire this exact file into his track unmodified, so there
// is no Yolan-specific framing anywhere below. Teaches the spec -> plan ->
// tasks -> review methodology tool-agnostically first, then introduces Spec
// Kitty as one concrete real-world tool that enforces that loop -- Spec
// Kitty is the illustration, not the subject: no step-by-step install
// tutorial, just its command sequence at a high level.
//
// `order: 11` describes this module's position within Yolan's own 15-module
// track only (see data-model.md's Module/Module Track distinction) --
// wiring it into any track's ordered array is WP04's job, not this file's.
//
// Lab type "quiz" -- see js/views/labs/quiz-lab.js: lab.config is an array
// of {id, question, options: string[], correctIndex, explanation}.

export default {
  id: "spec-driven-development",
  order: 11,
  title: "Spec-Driven Development",
  summary:
    "Write down what you're building and why before writing any code -- " +
    "the spec -> plan -> tasks -> review loop, and one real tool that " +
    "enforces it.",
  content: [
    {
      heading: "Why spec first",
      body:
        "<p>Before writing any code, write down what you're building and " +
        "why. That written description is called a <strong>spec</strong> " +
        "(short for specification). It feels like it slows you down at " +
        "the start, but it does the opposite: catching a wrong assumption " +
        "or a fuzzy requirement while it's still just a sentence on a " +
        "page is far cheaper than catching it after you've already built " +
        "the wrong thing.</p>" +
        "<p>This isn't about heavyweight paperwork. Even a few plain " +
        "sentences -- what this needs to do, who it's for, what \"done\" " +
        "looks like -- force you to notice gaps in your own thinking " +
        "before they turn into wasted work.</p>",
      glossaryTerms: [
        {
          term: "spec",
          definition:
            "Short for specification -- a written description of what " +
            "you're building and why, written before any code, so " +
            "ambiguity gets caught on paper instead of after the fact.",
        },
      ],
    },
    {
      heading: "The loop",
      body:
        "<p>Spec-driven development is a simple loop with four steps, " +
        "repeated for each piece of work:</p>" +
        "<ol>" +
        "<li><strong>Spec</strong> -- what you're building, and why. The " +
        "goal and the reasoning, not the implementation.</li>" +
        "<li><strong>Plan</strong> -- how, technically. What approach, " +
        "what pieces, what order.</li>" +
        "<li><strong>Tasks</strong> -- the plan broken into concrete " +
        "steps, grouped into chunks small enough to build and review one " +
        "at a time.</li>" +
        "<li><strong>Build, then review</strong> -- do the work, then " +
        "check it against the spec before calling it done.</li>" +
        "</ol>" +
        "<p>Each step exists to catch a different kind of mistake early: " +
        "the spec catches \"wrong thing,\" the plan catches \"wrong " +
        "approach,\" tasks catch \"too big to review properly,\" and " +
        "review catches \"doesn't actually match what was asked for.\"</p>",
    },
    {
      heading: "Spec Kitty, as one concrete example",
      body:
        "<p>The loop above is a general idea -- you can follow it with " +
        "nothing more than a plain-text file. <strong>Spec Kitty</strong> " +
        "is a real, free tool that enforces exactly this loop for " +
        "software projects: it walks you through specifying, then " +
        "planning, then breaking work into tasks, then implementing and " +
        "reviewing, in that order, and keeps the resulting documents " +
        "alongside your code.</p>" +
        "<p>At a high level, its command sequence mirrors the loop " +
        "directly: a command to write the spec, a command to turn that " +
        "spec into a plan, a command to break the plan into tasks, and a " +
        "command to implement and review each piece of work. The goal " +
        "here is recognizing the pattern in a real tool -- not becoming a " +
        "Spec Kitty expert or memorizing its full command set.</p>",
      glossaryTerms: [
        {
          term: "Spec Kitty",
          definition:
            "A real, free tool that enforces the spec -> plan -> tasks -> " +
            "review loop for software projects, keeping each step's " +
            "output as a document alongside the code.",
        },
      ],
    },
    {
      heading: "Why this matters for him",
      body:
        "<p>This ties directly back to the goal of building your own " +
        "tools: a bigger personal project benefits from this same " +
        "discipline even without a formal tool enforcing it. A short " +
        "written spec before you start -- even just a few sentences on " +
        "what you're building and why -- is valuable on its own, whether " +
        "or not anything ever checks that you followed it.</p>",
    },
  ],
  labs: [
    {
      id: "module-spec-driven-development-quiz",
      type: "quiz",
      graded: true,
      config: [
        {
          id: "before-plan",
          question:
            "In the spec -> plan -> tasks -> review loop, what comes " +
            "before the plan?",
          options: ["Review", "The spec", "Tasks", "Nothing -- plan is first"],
          correctIndex: 1,
          explanation:
            "The spec (what and why) comes first -- the plan (how, " +
            "technically) is built on top of it.",
        },
        {
          id: "why-spec-before-code",
          question:
            "What's the main point of writing a spec before any code " +
            "exists?",
          options: [
            "It's required paperwork with no real benefit.",
            "It catches ambiguity and wrong assumptions while they're " +
              "still cheap to fix.",
            "It makes the code run faster.",
            "It replaces the need for testing later.",
          ],
          correctIndex: 1,
          explanation:
            "Catching a wrong assumption on paper is far cheaper than " +
            "catching it after building the wrong thing.",
        },
        {
          id: "what-tasks-break-into",
          question: "What does the \"tasks\" step break a plan into?",
          options: [
            "A single giant step to build all at once",
            "Concrete steps, grouped into chunks small enough to build " +
              "and review one at a time",
            "A marketing summary",
            "A list of bugs to fix later",
          ],
          correctIndex: 1,
          explanation:
            "Breaking a plan into small, reviewable chunks is what makes " +
            "each piece of work easy to check before moving on.",
        },
        {
          id: "spec-kitty-role",
          question:
            "What is Spec Kitty, in the context of this module?",
          options: [
            "A programming language",
            "A tool that enforces the spec -> plan -> tasks -> review " +
              "loop for software projects",
            "A replacement for writing any documentation",
            "A code editor",
          ],
          correctIndex: 1,
          explanation:
            "Spec Kitty is one concrete, real tool that enforces this " +
            "same general loop -- it's an example of the pattern, not the " +
            "whole idea.",
        },
      ],
    },
  ],
};
