// Module 10: Automate a Task (FR-017).
//
// One complete worked example of directing an AI assistant to automate a
// repetitive task, then a lab where the learner drafts her own attempt
// using the shared prompt builder.
//
// Lab type "prompt-builder" -- purposeKey: "automate-a-task" (distinct from
// Module 6's "prompting-101" and Module 8's "prompting-201-rewrite").

export default {
  id: "automate-a-task",
  order: 10,
  title: "Automate a Task",
  summary:
    "One full worked example of turning a repetitive chore into a single " +
    "clear prompt -- then a lab to draft your own.",
  content: [
    {
      heading: "The kind of task worth automating",
      body:
        "<p>A lot of everyday busywork follows a repeatable pattern: the " +
        "same kind of thing, done over and over, with small variations " +
        "each time. That's exactly the kind of task an AI assistant " +
        "handles well -- not because it's \"smart,\" but because you only " +
        "have to explain the pattern once, clearly, and it applies that " +
        "pattern consistently every time.</p>" +
        "<p>Here's a worked example: turning a rough, inconsistent list " +
        "into a clean, formatted table.</p>",
    },
    {
      heading: "Worked example: messy list to formatted table",
      body:
        "<p>Say you're handed this rough list of volunteer sign-ups, " +
        "typed by different people at different times:</p>" +
        "<pre>Jane Doe - jane@example.invalid - Saturdays\n" +
        "sam okafor, sam.o@example.invalid, weekdays only\n" +
        "PRIYA SHAH / priya@example.invalid / weekends\n" +
        "tom - tom.d@example.invalid - no preference given</pre>" +
        "<p>Here's the actual prompt used to fix it:</p>" +
        "<pre>Role: You're an assistant helping clean up messy sign-up " +
        "data.\n\n" +
        "Context: This is a volunteer sign-up list. Different people " +
        "typed each line, so the formatting is inconsistent -- name " +
        "capitalization varies, and the separator between fields " +
        "changes (dash, comma, slash).\n\n" +
        "Task: Reformat the list below into a clean table with " +
        "consistent name capitalization (First Last), a valid email " +
        "column, and an availability column. If availability isn't " +
        "clearly stated, write \"Not specified\" rather than guessing.\n\n" +
        "Format: A markdown table with columns Name | Email | " +
        "Availability.\n\n" +
        "Constraints: Don't invent any information that isn't in the " +
        "original list.\n\n" +
        "[paste the four lines above]</pre>" +
        "<p>A good response looks like this -- consistent formatting, " +
        "nothing invented, and the one genuinely unclear entry called " +
        "out rather than guessed at:</p>" +
        "<pre>| Name       | Email                     | Availability   |\n" +
        "|------------|---------------------------|-----------------|\n" +
        "| Jane Doe   | jane@example.invalid       | Saturdays       |\n" +
        "| Sam Okafor | sam.o@example.invalid      | Weekdays only   |\n" +
        "| Priya Shah | priya@example.invalid      | Weekends        |\n" +
        "| Tom D.     | tom.d@example.invalid      | Not specified   |</pre>" +
        "<p>Notice what makes this work: the prompt names the exact " +
        "inconsistency (\"capitalization varies, separators change\"), " +
        "states the output format precisely (a markdown table, exact " +
        "column names), and sets a constraint that stops the assistant " +
        "from quietly inventing an availability for Tom. That's Module " +
        "6's structure and Module 8's front-loading, applied to a real " +
        "chore.</p>",
    },
  ],
  labs: [
    {
      id: "module-10-prompt-builder",
      type: "prompt-builder",
      graded: false,
      config: {
        purposeKey: "automate-a-task",
        task:
          "Pick one repetitive task you actually deal with (renaming " +
          "files, reformatting a list, converting notes into a table -- " +
          "anything with a repeatable pattern) and draft a prompt for it " +
          "below.",
        placeholders: {
          role: "e.g. You're an assistant helping automate a repeated chore.",
          context:
            "Describe the repetitive task and what's inconsistent about " +
            "it today -- e.g. renaming files, reformatting a list, " +
            "converting notes into a table.",
          task: "The one clear transformation you want done, every time.",
          format: "Exactly how the output should be shaped.",
          constraints:
            "What the assistant should never invent or guess at " +
            "(optional).",
          tone: "Formal, casual... (optional).",
          example: "A before/after sample, if you have one (optional).",
        },
      },
    },
  ],
};
