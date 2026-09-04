// Module 6: Prompting 101 (FR-009, FR-010).
//
// The most important lesson in the course: the role-context-task-format
// prompt structure and the golden rules, with a worked example, plus the
// interactive prompt-builder lab.
//
// Lab type "prompt-builder" -- see js/views/labs/prompt-builder-lab.js's
// "purposeKey design decision" comment (T020, FR-012): lab.config MUST
// include purposeKey: "prompting-101" exactly, matching data-model.md's
// builderDrafts example and WP04's Activity Log. `placeholders` (optional,
// keyed by field name) seeds each textarea's placeholder text.

export default {
  id: "prompting-101",
  order: 6,
  title: "Prompting 101",
  summary:
    "The single most useful skill in this course: how to structure a " +
    "prompt so Claude Code understands exactly what you want, the first " +
    "time.",
  content: [
    {
      heading: "The role-context-task-format structure",
      body:
        "<p>A strong prompt almost always answers four questions, in this " +
        "order:</p>" +
        "<ol>" +
        "<li><strong>Role</strong> -- who should the assistant \"be\" for " +
        "this task? (e.g. \"You're an editor helping tighten a cover " +
        "letter.\")</li>" +
        "<li><strong>Context</strong> -- what does it need to know to do " +
        "this well? (Background, the audience, any relevant files.)</li>" +
        "<li><strong>Task</strong> -- what, exactly, do you want done? " +
        "(One clear goal, not several bundled together.)</li>" +
        "<li><strong>Format</strong> -- what should the answer look like " +
        "when it's done? (e.g. \"a bulleted list,\" \"three short " +
        "paragraphs,\" \"a table.\")</li>" +
        "</ol>" +
        "<p>You don't need every part every time, but the more precisely " +
        "you fill them in, the less back-and-forth you'll need " +
        "afterward.</p>",
    },
    {
      heading: "The golden rules",
      body:
        "<ul>" +
        "<li><strong>Be specific.</strong> \"Make this better\" leaves " +
        "everything to guesswork; \"shorten this to under 150 words and " +
        "keep a friendly tone\" doesn't.</li>" +
        "<li><strong>State what good looks like.</strong> Describe the " +
        "result you'd be happy with, not just the task.</li>" +
        "<li><strong>State the format.</strong> Say exactly how you want " +
        "the answer shaped -- a list, a table, plain prose, code.</li>" +
        "<li><strong>Set constraints.</strong> Length limits, things to " +
        "avoid, tools not to use -- boundaries save rework.</li>" +
        "<li><strong>One goal at a time.</strong> Bundling three asks " +
        "into one prompt usually gets you a worse answer to all three " +
        "than one clear ask at a time.</li>" +
        "<li><strong>Give tone.</strong> \"Formal,\" \"casual,\" " +
        "\"reassuring\" -- tone words steer the output more than people " +
        "expect.</li>" +
        "<li><strong>Show an example.</strong> A single example of the " +
        "output you want is often worth a paragraph of description.</li>" +
        "<li><strong>Iterate.</strong> Treat the first reply as a draft, " +
        "not a final answer -- tell it what to change rather than " +
        "starting over.</li>" +
        "</ul>",
    },
    {
      heading: "A worked example",
      body:
        "<p>Compare these two prompts:</p>" +
        "<p><em>Weak:</em> \"Write something for my meeting notes.\"</p>" +
        "<p><em>Strong, using the structure above:</em></p>" +
        "<pre>Role: You're a helpful assistant summarizing internal " +
        "meetings for a small team.\n\n" +
        "Context: This is a 30-minute weekly planning meeting for three " +
        "people; the audience is teammates who couldn't attend.\n\n" +
        "Task: Summarize the attached meeting transcript into clear " +
        "notes.\n\n" +
        "Format: A short paragraph of context, followed by a bulleted " +
        "list of decisions, and a separate bulleted list of action items " +
        "with who owns each one.\n\n" +
        "Constraints: Keep it under 200 words total. Do not include " +
        "small talk or side conversations.\n\n" +
        "Tone: Plain and neutral -- no jokes, no filler phrases.\n\n" +
        "Example: \"Decisions: - Ship the v2 landing page Friday. Action " +
        "items: - Priya: finalize copy by Wednesday.\"</pre>" +
        "<p>Notice the strong version leaves almost nothing to " +
        "guesswork -- and if the first reply isn't quite right, the fix " +
        "is a follow-up like \"trim the action items to just names, no " +
        "descriptions,\" not starting over from scratch. That's " +
        "iteration in practice.</p>",
    },
  ],
  labs: [
    {
      id: "module-6-prompt-builder",
      type: "prompt-builder",
      graded: false,
      config: {
        purposeKey: "prompting-101",
        task:
          "Pick one small, real task you'd actually want help with (an " +
          "email, a summary, tidying a list -- anything). Fill in the " +
          "fields below to build a complete prompt for it, using the " +
          "role → context → task → format structure from above.",
        placeholders: {
          role:
            "e.g. You're an editor helping tighten a cover letter.",
          context:
            "Background the assistant needs -- audience, relevant files, " +
            "situation.",
          task: "The one clear thing you want done.",
          format:
            "How the answer should be shaped -- list, table, short " +
            "paragraphs...",
          constraints:
            "Length limits, things to avoid, boundaries (optional).",
          tone: "Formal, casual, reassuring... (optional).",
          example:
            "A sample of the output you want, if you have one (optional).",
        },
      },
    },
  ],
};
