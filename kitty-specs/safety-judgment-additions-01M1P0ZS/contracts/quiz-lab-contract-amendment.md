# Contract amendment: `quiz-lab.js` config item (`type: "quiz"`)

Amends the `quiz` row of the original mission's
`contracts/lab-engine-contract.md`. Everything in that document (the
`mount()`/`unmount()` export shape, reading prior state via `getProgress()`,
unlimited graded retries, the always-present exit affordance) still applies
unchanged. This amendment only adds one optional field to the config item
shape.

## Before (original mission)

```ts
type QuizItem = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};
```

## After (this mission)

```ts
type QuizItem = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string; // NEW -- optional
};
```

## Rendering contract

- When `explanation` is present on an item, `quiz-lab.js` SHALL append it to
  that item's post-submit feedback line, after the existing correct/
  incorrect text -- for both the correct and incorrect case (the "why," not
  just "whether," is the point of every lab this field is added for).
- When `explanation` is absent, feedback SHALL render exactly as it does
  today: `"Correct."` or `"Incorrect. The correct answer is: {option text}"`,
  with no trailing text.
- This field does not change `labState[lab.id]`'s persisted shape
  (`{lastScore, attempts, completed}`) -- it only changes what's rendered
  from already-static config, so no progress-store change is needed.

## Backward compatibility

Module 8's existing quiz lab (`module-8-quiz`, 4 items, none carrying an
`explanation` field) is the regression check: after this change, it must
render and behave identically to before. No existing config data is
modified by this amendment.

## Consumers added by this mission

| Module | Lab id | Item count |
|---|---|---|
| 1 | `module-1-permission-check` | 5 |
| 8 | `module-8-verification` | 3 |
| 11 | `module-11-recovery` | 1 |
