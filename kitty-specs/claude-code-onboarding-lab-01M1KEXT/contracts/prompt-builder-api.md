# Contract: `js/lib/prompt-builder.js`

Pure, framework-free functions — no DOM access, no I/O. `prompt-builder-lab.js`
is the only caller; keeping this pure makes it trivially testable by hand in
a console if ever needed, and keeps C-001 (no AI/LLM calls) obviously true by
construction: nothing in this module can reach a network.

## Types

```ts
type BuilderFields = {
  role: string;
  context: string;
  task: string;
  format: string;
  constraints?: string;
  tone?: string;
  example?: string;
};
```

## Functions

- `assemblePrompt(fields: BuilderFields): string` — deterministically renders `fields` into the role-context-task-format prompt text taught in Module 6 (FR-009). Empty optional fields are omitted from the output, not rendered as blank sections.
- `validateFields(fields: BuilderFields): { valid: boolean, missing: string[] }` — `role`, `context`, `task`, and `format` are required (the golden-rules core); `missing` lists which required fields are still empty, for the UI to hint at without blocking typing.

## Guarantees

- No network calls, no `fetch`, no dependency on any AI/LLM API — satisfies C-001 structurally, not just by convention.
- `assemblePrompt` is a pure function: same `fields` in, same string out, no side effects. `prompt-builder-lab.js` owns calling `progress.js`'s `setBuilderDraft` separately.
