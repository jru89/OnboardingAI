# Research: Safety & Judgment Curriculum Additions

## Decision 1: Reuse `quiz-lab.js` (extended) for all three new interactive labs

**Decision**: Add one optional per-question `explanation` field to `quiz-lab.js`'s
existing config shape (`{id, question, options: string[], correctIndex}` becomes
`{id, question, options: string[], correctIndex, explanation?}`), rendered after
submit alongside the existing correct/incorrect text. Reuse this one engine for
Module 1's "Would you allow this?", Module 8's "Can you spot what's wrong?", and
Module 11's "Something went wrong."

**Rationale**: Inspected all three graded/self-marked lab engines directly
(`js/views/labs/quiz-lab.js`, `spot-mistake-lab.js`, `match-lab.js`) rather than
assuming from their names:

- `quiz-lab.js` already renders whatever `options: string[]` the config supplies
  verbatim -- no hardcoded button text -- so it natively supports Module 1's
  three-way judgment (Allow / Don't allow / Not sure -- inspect first) without
  any collapsing or compromise. Its one gap: submit feedback is a generic
  "Correct." / "Incorrect. The correct answer is: X" with no per-question
  explanation -- exactly the piece that matters most for these three labs,
  where the *why* is the actual lesson.
- `spot-mistake-lab.js` already has a per-item `explanation` field and shows it
  in feedback -- but its heading ("Spot the Mistake") and its two choice labels
  ("Safe" / "Unsafe") are hardcoded directly in the JS, not driven by config.
  Reusing it as-is for Module 1 or Module 8 would show a learner literal
  "Safe"/"Unsafe" radio buttons while judging a permission request or a
  summary's factual accuracy -- wrong words, actively confusing.
- `match-lab.js` supports N options and a `visual` field, but its feedback is
  also generic ("Correct!" / "Not quite -- the answer is X"), and it is
  deliberately ungraded/unlimited-retry by design (`selections` persist
  directly, no submit/lock step) -- a different interaction shape than the
  submit-and-see-your-score pattern the spec calls for here.

Extending `quiz-lab.js` with one optional field is the smallest change that
gets real per-answer explanations onto all three new labs, is fully
backward-compatible (Module 8's existing quiz config has no `explanation`
field today, so its rendered output is unchanged), and avoids introducing a
fourth graded engine (ruled out by spec.md's C-002).

**Alternatives considered**:
- *Reuse `spot-mistake-lab.js` as-is, accepting "Safe"/"Unsafe" labels*:
  rejected -- actively wrong/confusing wording for two of the three exercises.
- *Make `spot-mistake-lab.js`'s heading and labels configurable instead*:
  viable, but `quiz-lab.js` already needed zero label changes (only the
  missing explanation), so extending it is the smaller, lower-risk change.
- *Use `match-lab.js` for Module 11's single-scenario "pick the best
  response"*: a reasonable content-shape fit, but rejected in favor of
  `quiz-lab.js` for consistency across all three new labs (one engine, one
  explanation mechanism, one mental model for future content authors) and
  because the graded submit/retry pattern (matching Module 8's existing
  quiz) fits "practice this judgment call" better than match-lab's
  always-open, ungraded pattern.

## Decision 2: Reframe Module 8's "spot what's wrong" as several judged claims, not one free-text answer

**Decision**: Instead of one long fabricated summary the learner critiques in
open text, the lab presents each planted inaccuracy (the changed date, the
invented task, the changed number) as its own short quiz question -- e.g. "The
summary says Sarah will send the invoice Monday. Is that accurate?" -- judged
Accurate/Inaccurate, with the source fact shown in the explanation.

**Rationale**: `quiz-lab.js` (per Decision 1) is a fixed-option, auto-graded
engine; it cannot grade open-ended free text, and building a free-text grader
is out of scope (no backend/AI call in this app -- spec.md's C-002 and the
original mission's C-001). Splitting the fabricated summary into its
individual claims preserves the exact pedagogical goal (catch a wrong date,
an invented responsibility, and a wrong number) while fitting an engine the
app already has and can grade deterministically.

**Alternatives considered**:
- *Free-text answer, self-marked*: rejected -- no existing engine supports
  free-text self-marking with structured feedback per claim; would need a
  new interaction pattern for a single lab.
- *One "select all that are wrong" checkbox-style question*: would need a
  new engine capability (multi-select scoring); rejected in favor of reusing
  the already-extended quiz engine as-is.

## Decision 3: No service-worker or precache changes required

**Decision**: This mission does not modify `service-worker.js`'s
`PRECACHE_URLS` list.

**Rationale**: Every change in this mission adds content to *existing*
already-precached files (`js/data/modules/*.js`, `js/views/labs/quiz-lab.js`);
no new files are introduced. The service worker's existing
stale-while-revalidate strategy (fixed earlier this project) already ensures
a returning learner sees these content updates within one reload, with no
version bump needed for routine content edits -- that was the entire point
of that earlier fix.

## Decision 4: Module 12's readiness addition renders as plain content, not a lab

**Decision**: The "Before you start" self-check is authored as an HTML list
inside a module `content` section's `body` (same mechanism already used for
every other bulleted list in the app), not as a `checklist` lab instance.

**Rationale**: `checklist-lab.js` persists checked/unchecked state and
factors into `evaluateModuleStatus`'s completion logic -- using it here would
make the self-check something the learner "completes," directly
reintroducing the scripted-worksheet feel that Module 12's original C-007
constraint (carried forward as this mission's C-004) exists to prevent.
Plain content requires no interaction, no persisted state, and cannot block
or gate the module's two existing downloads.

**Alternatives considered**:
- *A `checklist` lab, ungraded*: rejected per C-004 -- even an ungraded
  checklist still reads as "homework to complete" and adds a completion
  affordance this module has deliberately never had.
