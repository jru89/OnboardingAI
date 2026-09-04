# Phase 1 Data Model: Safety & Judgment Curriculum Additions

This mission does not introduce a new schema -- it extends the existing
`Module`/`Lab`/Content-Section shapes documented in the original mission's
`data-model.md`. This document covers only the delta: one extended field on
the quiz lab's config item, and the concrete shape of the three new lab
instances and seven new content sections this mission adds.

## Extended: Quiz lab config item (`js/views/labs/quiz-lab.js`)

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unchanged. |
| `question` | string | Unchanged. |
| `options` | array of string | Unchanged. |
| `correctIndex` | integer | Unchanged. |
| `explanation` | string, **optional (new)** | Shown after submit, appended to the existing "Correct." / "Incorrect. The correct answer is: X" feedback line for that question. Absent -> feedback renders exactly as it does today (Module 8's existing quiz has no `explanation` field on any of its 4 items). |

No change to `labState[lab.id]`'s runtime shape (`{lastScore, attempts,
completed}`) -- the new field only affects what's rendered, not what's
persisted.

## New lab instances

### Module 1 — `module-1-permission-check` (quiz)

Five items, each a fictional permission request judged as one of three
options. Concrete authored content (final wording may be lightly adjusted
during implementation, but the shape and option set are fixed by this plan):

```json
[
  {
    "id": "read-readme",
    "question": "Claude Code asks: \"May I read README.md?\"",
    "options": ["Allow", "Don't allow", "Not sure -- inspect first"],
    "correctIndex": 0,
    "explanation": "Reading a file to understand the project is low-risk and exactly the kind of thing Claude Code needs permission to do routinely."
  },
  {
    "id": "edit-budget",
    "question": "Claude Code asks: \"May I edit budget.xlsx?\"",
    "options": ["Allow", "Don't allow", "Not sure -- inspect first"],
    "correctIndex": 2,
    "explanation": "Editing a real spreadsheet with numbers you care about is worth a quick look first -- ask what it plans to change before saying yes."
  },
  {
    "id": "delete-old-notes",
    "question": "Claude Code asks: \"May I delete old-notes.md?\"",
    "options": ["Allow", "Don't allow", "Not sure -- inspect first"],
    "correctIndex": 2,
    "explanation": "Deleting is hard to undo. Ask what's in the file and why it should go before agreeing, even if the name sounds safe to remove."
  },
  {
    "id": "run-command",
    "question": "Claude Code asks: \"May I run this command?\" (and shows you the exact command)",
    "options": ["Allow", "Don't allow", "Not sure -- inspect first"],
    "correctIndex": 2,
    "explanation": "You're shown the exact command -- read it before deciding. If you understand it and it matches what you asked for, allow it; if not, ask what it does first."
  },
  {
    "id": "outside-folder",
    "question": "Claude Code asks: \"May I access a folder outside this project?\"",
    "options": ["Allow", "Don't allow", "Not sure -- inspect first"],
    "correctIndex": 1,
    "explanation": "Reaching outside the project folder is unusual for the tasks this course covers -- don't allow it without understanding specifically why it's needed."
  }
]
```

### Module 8 — `module-8-verification` (quiz)

Source facts (shown in the module content immediately above the lab, per
FR-008): a short meeting-note-style list containing a date, an assignment,
and a budget number (mirrors the style of Module 10's existing worked
example). Each lab item judges one claim from Claude's fabricated summary of
those facts against Accurate/Inaccurate:

```json
[
  {
    "id": "wrong-date",
    "question": "The summary says: \"Sarah will send the invoice Monday.\" The notes say Friday.",
    "options": ["Accurate", "Inaccurate"],
    "correctIndex": 1,
    "explanation": "The source says Friday, not Monday -- a small-looking change that would send someone to the wrong day."
  },
  {
    "id": "invented-task",
    "question": "The summary says: \"John will approve the contract.\" The notes say John will check the contract.",
    "options": ["Accurate", "Inaccurate"],
    "correctIndex": 1,
    "explanation": "\"Check\" and \"approve\" are different responsibilities -- the summary invented a stronger commitment than the source actually gave."
  },
  {
    "id": "wrong-number",
    "question": "The summary says: \"The budget is €5,400.\" The notes say €4,500.",
    "options": ["Accurate", "Inaccurate"],
    "correctIndex": 1,
    "explanation": "The digits got transposed -- exactly the kind of change that's easy to miss if you don't check numbers against the source."
  }
]
```

### Module 11 — `module-11-recovery` (quiz)

Single item modeling the diagnose-before-fixing habit:

```json
[
  {
    "id": "removed-rows",
    "question": "You asked Claude Code to clean up a list. It removed several rows you didn't expect to lose. What do you say next?",
    "options": [
      "Try again.",
      "Fix everything.",
      "I expected the original rows to remain. Before making another change, explain why you removed them and propose a safe way to restore the missing information.",
      "Why are you so bad at this?"
    ],
    "correctIndex": 2,
    "explanation": "Vague retries (\"try again,\" \"fix everything\") don't tell it what went wrong, and they risk more unwanted changes stacking on top of the first mistake. Naming the specific problem and asking it to explain before changing anything else is what keeps a small mistake from becoming a bigger one."
  }
]
```

## New content sections (7 modules, no schema change)

Each entry below is a new item appended to the named module's existing
`content` array, using the unchanged Content Section shape (`heading`,
`body`, optional `glossaryTerms`). Full prose is authored during
implementation against this plan's structure and spec.md's FR wording; this
table records only heading, target module, and any new glossary terms so
implementation stays traceable to the spec.

| Module | New section heading | New glossary terms |
|---|---|---|
| 01-get-oriented | "Claude can do more than answer you" | none (no new jargon -- plain language per NFR-001) |
| 03-data-safety | (extends existing "Why this matters" category list) + new closing section "Sometimes the right answer is: don't use AI at all" | none |
| 04-repos | "How do I know what changed?" | "diff" is already defined in Module 11 -- this section deliberately avoids the term itself (FR-005 says "not a Git course"), describing before/after in plain language instead |
| 06-prompting-101 | "A good prompt doesn't guarantee a good answer" | none |
| 08-prompting-201 | "Verification checklist" | none |
| 11-md-files-habits | "What to do when Claude gets it wrong" | none |
| 12-graduation | "Before you start" | none |

## State transitions

No new states. The two new labs (Module 8, Module 11) follow the exact same
`unattempted -> scored -> scored (retry)` transition already documented for
Module 8's existing quiz lab; Module 1's new lab follows the same pattern.
`evaluateModuleStatus`'s existing "done when all labs in the module are
complete" rule applies unchanged -- Modules 8 and 11 will each require both
their existing lab and their new one to be attempted before showing "done."
