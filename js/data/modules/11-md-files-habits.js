// Module 11: .md Files & Habits (FR-018).
//
// What Markdown is and why AI tooling favors it (plain text, structure,
// diffability); ties back to Module 4's repo literacy (README already
// defined there -- not redefined here per NFR-003) and Module 8's memory
// note. This module is the synthesis point before graduation.
//
// Lab type "prompt-builder" -- purposeKey: "readme-exercise", seeded via
// placeholders with a concrete scenario (a small personal budgeting
// spreadsheet project) so the exercise isn't a blank page.

export default {
  id: "md-files-habits",
  order: 11,
  title: ".md Files & Habits",
  summary:
    "What a Markdown file actually is, why AI tools favor them, and a " +
    "guided README-writing exercise using the prompt builder.",
  content: [
    {
      heading: "What is Markdown?",
      body:
        "<p><strong>Markdown</strong> is a way of writing plain text so " +
        "that simple symbols -- a <code>#</code> for a heading, a " +
        "<code>-</code> for a bullet, double asterisks for " +
        "<strong>bold</strong> -- stand in for formatting, instead of " +
        "clicking buttons in a word processor. A file written this way " +
        "and saved with a <code>.md</code> ending is a " +
        "<strong>Markdown file</strong>. You've already seen several: " +
        "every file you downloaded in Module 7 was one.</p>" +
        "<p>Markdown reads perfectly well even completely unformatted -- " +
        "open a <code>.md</code> file in the plainest text editor " +
        "imaginable and it's still legible, just without the visual " +
        "polish. That's the whole point.</p>",
      glossaryTerms: [
        {
          term: "Markdown",
          definition:
            "A way of writing plain text where simple symbols (like # " +
            "for a heading or - for a bullet) represent formatting. " +
            "Files written this way are saved with a .md ending.",
        },
      ],
    },
    {
      heading: "Why AI tooling favors it",
      body:
        "<p>Three plain reasons come up constantly:</p>" +
        "<ul>" +
        "<li><strong>Plain text.</strong> Any tool, on any computer, can " +
        "open and read a Markdown file with zero special software -- " +
        "unlike a word-processor document, there's no format lock-in.</li>" +
        "<li><strong>Structure.</strong> Headings, lists, and emphasis " +
        "give both you and an AI assistant a predictable shape to work " +
        "with -- \"add a new section under Setup\" is a request Claude " +
        "Code can act on precisely because the structure is explicit in " +
        "the text itself.</li>" +
        "<li><strong>Diffability.</strong> Because it's plain text, a " +
        "tool can show exactly which lines changed between two versions " +
        "of a file -- called a <strong>diff</strong> -- line by line. A " +
        "diff for a Markdown file is as clear as a diff for code; a diff " +
        "of a formatted document usually isn't possible at all.</li>" +
        "</ul>" +
        "<p>Put together, that's why READMEs (Module 4), context notes, " +
        "and memory files (Module 8) are almost always written in " +
        "Markdown: they're easy for a person to read, easy for an AI " +
        "assistant to parse and edit precisely, and easy for either one " +
        "to show a clean history of what changed and why.</p>",
      glossaryTerms: [
        {
          term: "diff",
          definition:
            "A line-by-line view of exactly what changed between two " +
            "versions of a file. Plain text formats like Markdown make " +
            "clean diffs possible; word-processor documents usually " +
            "don't.",
        },
      ],
    },
    {
      heading: "The habit worth building",
      body:
        "<p>Module 4 covered what a README is and where it lives. The " +
        "habit worth carrying forward is writing one early, not as an " +
        "afterthought -- a short README that says what a project is and " +
        "how to use it saves you (and anyone else, including an AI " +
        "assistant helping you later) from having to reconstruct that " +
        "context from scratch every time. The same logic applies to any " +
        "small note capturing something worth remembering about a " +
        "project.</p>" +
        "<p>The lab below gives you a concrete scenario to practice on: " +
        "writing a README for a small project, using the same prompt " +
        "builder from Module 6.</p>",
    },
  ],
  labs: [
    {
      id: "module-11-prompt-builder",
      type: "prompt-builder",
      graded: false,
      config: {
        purposeKey: "readme-exercise",
        task:
          "Write a README for the budgeting spreadsheet project " +
          "described below, using the fields to build a complete prompt " +
          "for Claude Code to draft it.",
        placeholders: {
          role: "e.g. You're an assistant helping write a clear README.",
          context:
            "The project: a small personal budgeting spreadsheet that " +
            "tracks monthly income, expenses by category, and a savings " +
            "goal. Describe who'd open this README and what they'd need " +
            "to know first.",
          task:
            "Write a README.md for a small personal budgeting " +
            "spreadsheet project -- what it is, what's inside it, and " +
            "how to use it.",
          format:
            "Markdown with a title, a short description, and a few " +
            "headed sections.",
          constraints: "Keep it short enough to read in under a minute (optional).",
          tone: "Plain and friendly (optional).",
          example: "A sample heading or section, if you have one (optional).",
        },
      },
    },
  ],
};
