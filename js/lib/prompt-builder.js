// Prompt assembly logic -- pure, framework-free functions.
//
// See kitty-specs/.../contracts/prompt-builder-api.md. This file must have
// ZERO DOM access and ZERO network access (no `fetch`, no `XMLHttpRequest`,
// no `window`/`document` references, no imports) -- that is what makes
// C-001 ("no AI/LLM calls anywhere in this app") true by construction for
// this module, not just by convention. `prompt-builder-lab.js` is the only
// caller; this file is independently testable by hand in a console, e.g.:
//
//   assemblePrompt({ role: "...", context: "...", task: "...", format: "..." })
//
// BuilderFields shape (see contract):
//   {
//     role: string, context: string, task: string, format: string,
//     constraints?: string, tone?: string, example?: string,
//   }

const REQUIRED_FIELDS = ["role", "context", "task", "format"];

// Order + labels match Module 6's golden-rules teaching order: role,
// context, task, format are the required core; constraints/tone/example
// are optional refinements appended only when the learner filled them in.
const SECTION_ORDER = [
  { key: "role", label: "Role" },
  { key: "context", label: "Context" },
  { key: "task", label: "Task" },
  { key: "format", label: "Format" },
  { key: "constraints", label: "Constraints" },
  { key: "tone", label: "Tone" },
  { key: "example", label: "Example" },
];

function isBlank(value) {
  return typeof value !== "string" || value.trim() === "";
}

/**
 * Deterministically renders `fields` into the role/context/task/format
 * (+ optional constraints/tone/example) labeled prompt text taught in
 * Module 6. Empty optional fields are omitted entirely from the output
 * (not rendered as blank sections). Required fields that are empty still
 * render their label with empty content -- this function never blocks on
 * validity, it only assembles; validation is `validateFields`'s job.
 *
 * Pure: same `fields` in, same string out, no side effects.
 */
export function assemblePrompt(fields) {
  const source = fields && typeof fields === "object" ? fields : {};
  const sections = [];

  for (const { key, label } of SECTION_ORDER) {
    const value = typeof source[key] === "string" ? source[key].trim() : "";
    const isOptional = !REQUIRED_FIELDS.includes(key);
    if (isOptional && value === "") continue;
    sections.push(`${label}: ${value}`);
  }

  return sections.join("\n\n");
}

/**
 * Returns { valid, missing } where `missing` lists which of the required
 * fields (role, context, task, format) are empty or whitespace-only.
 * Does not mutate `fields`.
 */
export function validateFields(fields) {
  const source = fields && typeof fields === "object" ? fields : {};
  const missing = REQUIRED_FIELDS.filter((key) => isBlank(source[key]));
  return { valid: missing.length === 0, missing };
}
