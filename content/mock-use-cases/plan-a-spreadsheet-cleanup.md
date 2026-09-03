# Mock Scenario: Plan a Spreadsheet Cleanup

**How to use this file:** Download it, then paste its contents (or upload the file itself) into your Claude Code session with a request like: *"Here's a description of a messy spreadsheet I have. Before touching anything, propose a short cleanup plan and wait for my ok."* That last part matters — this is a good exercise for practicing "propose a plan, don't just act" habits.

You don't need an actual spreadsheet for this exercise — the description below is the material. (If you want to try it on a real file later, the same approach applies.)

---

## Description: "Volunteer Contact List" spreadsheet (Acme Fictional Co. Community Program)

You maintain a spreadsheet tracking volunteers for a community outreach program. It has grown messy over about a year of different people editing it. Here's what's wrong with it:

- **Inconsistent column names across sheets/sections**: the main block of rows uses headers `First Name`, `Last Name`, `Email`, `Phone`, `Joined`. Partway down, someone pasted in a batch of newer volunteers using headers `Name`, `Contact Email`, `Cell`, `Start Date` instead — so effectively there are two different header rows fighting each other in the same sheet.
- **Blank rows scattered throughout**: roughly a dozen completely empty rows are scattered between entries, seemingly left over from deleted records. There's no pattern to where they are.
- **Mixed date formats in the "Joined"/"Start Date" column**: some entries read `03/14/2025`, others `2025-03-14`, others `March 14, 2025`, and at least a few just say `Spring 2025` with no exact date.
- **Duplicate-looking entries**: a handful of names appear twice — sometimes with identical info both times (an obvious accidental duplicate), sometimes with slightly different phone numbers or emails (unclear which one is current).
- **A stray "Notes" column** that's mostly empty but occasionally contains useful free-text like "prefers weekend shifts" or "allergic to peanuts — relevant for bake sale duty," mixed in with a few entries that just say "n/a" or "-".
- **Inconsistent phone number formatting**: some as `(555) 123-4567`, others as `555.123.4567`, others as ten digits with no punctuation at all.

## What "cleaned up" should look like

- One consistent set of column headers across all rows: `First Name`, `Last Name`, `Email`, `Phone`, `Date Joined`, `Notes`.
- No blank rows.
- Every date in the same format (e.g., `YYYY-MM-DD`), with a clear note on how to handle the vague "Spring 2025"-style entries (best guess with a flag, or leave blank with a flag — a decision to make, not assume).
- Duplicates identified and either merged or flagged for a human to review — not silently deleted.
- Phone numbers in one consistent format.

## Things to try in your Claude Code session

- Paste in the description above and ask Claude to propose a step-by-step cleanup plan *before* doing any actual work — practice the "propose a plan and wait for my ok" habit from the course.
- Ask it to flag decisions it can't make on its own (for example: which duplicate entry is the "current" one, or what to do with the vague "Spring 2025" dates) rather than guessing.
- If you want to go further, ask Claude what a script or formula for part of this cleanup (like standardizing phone number formatting) might look like, even without a real file attached.

*(Acme Fictional Co. and its "Volunteer Contact List" are invented for this exercise. No real names, emails, or phone numbers appear here.)*
