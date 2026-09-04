// Module 8: Prompting 201 (FR-014, FR-015).
//
// Five techniques beyond the role-context-task-format basics from Module 6:
// front-loading context, requesting an output format, treating a first
// reply as a draft, giving explicit process commands, and fresh-thread /
// memory hygiene once a conversation gets long.
//
// Two labs:
//   - "quiz" (graded) -- js/views/labs/quiz-lab.js: lab.config is a bare
//     array of {id, question, options: string[], correctIndex}.
//   - "prompt-builder" -- js/views/labs/prompt-builder-lab.js. Reuses the
//     Module 6 engine but MUST use a distinct purposeKey so drafts don't
//     collide (T020/T037): "prompting-201-rewrite", NOT "prompting-101".

export default {
  id: "prompting-201",
  order: 8,
  title: "Prompting 201",
  summary:
    "Five habits that turn good prompts into great ones: front-loading " +
    "context, asking for a format, treating replies as drafts, giving " +
    "explicit process commands, and keeping threads healthy.",
  content: [
    {
      heading: "Front-load your context",
      body:
        "<p>Give Claude Code the background <em>before</em> the ask, not " +
        "scattered across three follow-up messages. \"Here's the " +
        "situation: [background]. Given that, [task].\" almost always " +
        "beats starting with the task and patching in details as Claude " +
        "Code asks for them -- it gets the full picture on the first " +
        "reply instead of guessing at what you left out.</p>" +
        "<p>This is the same <strong>context</strong> field from Module " +
        "6's role-context-task-format structure -- this module is about " +
        "using it more deliberately, not a new idea.</p>",
    },
    {
      heading: "Ask for the output format you actually want",
      body:
        "<p>Don't leave the shape of the answer to chance. \"Give me this " +
        "as a table with three columns\" or \"reply in three short " +
        "paragraphs, no bullet points\" removes an entire round of " +
        "back-and-forth. If you're not sure what format you want until " +
        "you see it, say that too -- \"try a bulleted list first, I might " +
        "ask you to convert it to a table after.\"</p>",
    },
    {
      heading: "Treat the first reply as a draft",
      body:
        "<p>Claude Code's first answer is a starting point, not a final " +
        "answer to accept or reject wholesale. If something's close but " +
        "not quite right, say exactly what to change -- \"keep the " +
        "structure, just make the tone warmer\" -- rather than throwing " +
        "the reply away and starting over. Iterating on a draft is " +
        "usually faster than re-explaining the whole task from " +
        "scratch.</p>",
    },
    {
      heading: "Give explicit process commands",
      body:
        "<p>When a task involves changing real files, it's worth " +
        "separating \"figure out what to do\" from \"actually do it.\" A " +
        "process command tells Claude Code which phase you want:</p>" +
        "<pre>do not change files yet, propose a short plan and wait for " +
        "my ok</pre>" +
        "<p>That exact phrase is worth copying verbatim any time you want " +
        "to see the plan before anything happens. Once you've reviewed " +
        "the plan and it looks right, a simple \"go ahead\" lets Claude " +
        "Code carry it out.</p>",
    },
    {
      heading: "Keep threads healthy: fresh threads and memory",
      body:
        "<p>A single conversation (often called a <strong>thread</strong>) " +
        "can carry a lot of back-and-forth, but a very long thread " +
        "eventually gets harder for both of you to track -- old context " +
        "piles up, some of it now stale or contradicted by later " +
        "messages. When a thread has drifted a long way from where it " +
        "started, or covers a task that's now finished, starting a fresh " +
        "thread for the next task is often clearer than continuing to " +
        "pile onto the old one.</p>" +
        "<p>If there's something worth carrying forward into future " +
        "sessions -- a preference, a standing instruction, a fact about " +
        "your project -- that's what a <strong>memory</strong> or context " +
        "file is for: a short note Claude Code reads automatically so you " +
        "don't have to re-explain it every time. Module 11 covers writing " +
        "these files in more depth.</p>",
      glossaryTerms: [
        {
          term: "thread",
          definition:
            "One continuous conversation with an AI assistant. Starting a " +
            "fresh thread means beginning a brand-new conversation instead " +
            "of continuing an old, long one.",
        },
        {
          term: "memory (context file)",
          definition:
            "A short saved note an AI assistant reads automatically so " +
            "you don't have to repeat preferences or project facts every " +
            "session.",
        },
      ],
    },
  ],
  labs: [
    {
      id: "module-8-quiz",
      type: "quiz",
      graded: true,
      config: [
        {
          id: "front-loads-context",
          question: "Which prompt front-loads context correctly?",
          options: [
            "\"Write a cleanup plan.\"",
            "\"Here's the situation: this is a shared volunteer contact " +
              "spreadsheet with inconsistent headers, mixed date formats, " +
              "and possible duplicates. Given that, propose a short " +
              "cleanup plan and wait for my ok.\"",
            "\"Fix my spreadsheet. Also it has some duplicate rows I " +
              "think, and maybe check the dates too, oh and the headers " +
              "are different in some places.\"",
            "\"Can you help?\"",
          ],
          correctIndex: 1,
        },
        {
          id: "explicit-process-command",
          question:
            "You want to see a plan before any files are changed. Which " +
            "phrase says that most clearly?",
          options: [
            "\"Do whatever you think is best.\"",
            "\"Make the changes and let me know when you're done.\"",
            "\"Do not change files yet, propose a short plan and wait for " +
              "my ok.\"",
            "\"Just try something.\"",
          ],
          correctIndex: 2,
        },
        {
          id: "treating-drafts",
          question:
            "Claude Code's first reply is close, but the tone is too " +
            "formal. What's the better next move?",
          options: [
            "Start a brand-new prompt describing the whole task again " +
              "from scratch.",
            "Say \"keep the structure, just make the tone warmer and " +
              "less formal.\"",
            "Give up and write it yourself.",
            "Repeat the exact same prompt again and hope for a different " +
              "result.",
          ],
          correctIndex: 1,
        },
        {
          id: "fresh-thread-signal",
          question:
            "Which situation is the best signal to start a fresh thread " +
            "rather than continue the current one?",
          options: [
            "You just asked your very first question of the session.",
            "The current task isn't finished yet and you're mid-revision.",
            "The old task is done and this new question is unrelated to " +
              "everything discussed so far.",
            "Claude Code gave a short reply.",
          ],
          correctIndex: 2,
        },
      ],
    },
    {
      id: "module-8-prompt-builder",
      type: "prompt-builder",
      graded: false,
      config: {
        purposeKey: "prompting-201-rewrite",
        task:
          "Rewrite this weak prompt using front-loaded context: \"Fix my " +
          "spreadsheet, it's a mess.\" Fill in the fields below so " +
          "nothing is left to guesswork.",
        placeholders: {
          role: "e.g. You're an assistant helping tidy up a shared file.",
          context:
            "The weak prompt to improve: \"Fix my spreadsheet, it's a " +
            "mess.\" Rewrite it using front-loaded context below.",
          task:
            "State the one clear thing you want done, with the " +
            "background the weak prompt left out.",
          format: "How you want the answer shaped -- plan, list, table...",
          constraints: "Length limits, things to avoid (optional).",
          tone: "Formal, casual, reassuring... (optional).",
          example: "A sample of the output you want, if you have one (optional).",
        },
      },
    },
  ],
};
