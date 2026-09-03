# Phase 1 Data Model: Claude Code Onboarding Lab

All data is client-side only (no backend, no database — C-001). This
document defines the shape of `js/data/modules.js` (static content) and the
localStorage progress record (runtime state), corresponding to the spec's
Key Entities section.

## Module (static, authored in `js/data/modules.js`)

| Field | Type | Notes |
|---|---|---|
| `id` | string | Stable slug, e.g. `"get-oriented"`, `"prompting-101"`. Used as the localStorage progress key and the router path. |
| `order` | integer | 1-12, display order on the landing view (FR-001). Free browse (FR-002) means order is display-only, not a gate. |
| `title` | string | Module title shown in nav and landing view. |
| `summary` | string | One-line description for the landing view card. |
| `content` | array of content sections | See **Content Section** below. |
| `labs` | array of `Lab` refs | 0-2 labs per module (Module 1 has 1 checklist lab; Module 6 has 1 builder lab; etc.) |

### Content Section

| Field | Type | Notes |
|---|---|---|
| `heading` | string, optional | Section heading within the module body. |
| `body` | string (HTML-safe markup or plain text with light inline formatting) | Rendered by `module-view.js`. No markdown parser — authored directly in the shape the view expects, per the Phase 0 content-format decision. |
| `diagram` | string, optional | Path to an SVG under `assets/svg/` (C-006). |
| `glossaryTerms` | array of `{term, definition}`, optional | Backs NFR-003 (technical terms defined on first use). |

## Lab (static config + runtime state)

Static portion lives in `js/data/modules.js` alongside its parent module;
runtime state lives in the progress record.

| Field | Type | Notes |
|---|---|---|
| `id` | string | Stable slug, unique across the whole app (e.g. `"module-3-spot-mistake"`). |
| `type` | enum | `"checklist"` \| `"match"` \| `"spot-mistake"` \| `"quiz"` \| `"prompt-builder"` \| `"download"` — maps 1:1 to the engines in `js/views/labs/`. |
| `graded` | boolean | `true` only for Module 3's spot-mistake lab and Module 8's quiz (per spec Assumptions: low-stakes, retriable). |
| `config` | type-specific object | E.g. for `"match"`: an array of `{prompt, options[], correctOption}`; for `"quiz"`: an array of `{question, options[], correctIndex}`; for `"download"`: an array of `{label, path}`; for `"prompt-builder"`: which fields are required/optional and any seed placeholder text. |

## Progress record (runtime, single localStorage key)

**Key**: `ccol:progress:v1` (the `v1` suffix allows a future schema
migration without guessing at existing users' stored shape).

```json
{
  "schemaVersion": 1,
  "moduleStatus": {
    "get-oriented": "done",
    "ai-vs-claude-code": "in_progress"
  },
  "labState": {
    "module-3-spot-mistake": {
      "completed": true,
      "lastScore": { "correct": 4, "total": 5 },
      "attempts": 2
    },
    "module-1-checklist": {
      "checkedItems": ["find-input-box", "open-a-project"]
    }
  },
  "builderDrafts": {
    "prompting-101": { "role": "...", "context": "...", "task": "...", "format": "...", "constraints": "", "tone": "", "example": "" },
    "prompting-201-rewrite": { "role": "...", "context": "...", "task": "...", "format": "...", "constraints": "", "tone": "", "example": "" }
  },
  "updatedAt": "2026-09-03T12:00:00.000Z"
}
```

Notes:

- `moduleStatus` values: `"not_started"` (default/absent) \| `"in_progress"`
  \| `"done"`. A module is marked `"done"` when the learner has interacted
  with all of its labs at least once (self-marked for non-graded labs,
  attempted-and-reviewed for graded ones) — this is a UI/completion-marking
  rule for `module-view.js`, not a separate stored field.
- `builderDrafts` is keyed by a **purpose key**, not by module id, so that
  Module 6's builder draft and Module 8's "rewrite this weak prompt" draft
  don't collide even though both mount `prompt-builder-lab.js` (addresses
  the IC-03 risk noted in `plan.md`).
- The whole record is written via a single debounced `localStorage.setItem`
  call (Phase 0 decision); there is no partial-write path.
- Reading a missing or corrupt key returns a fresh default record — no
  error is thrown (spec Edge Cases: cleared site data behaves like first
  visit).

## Downloadable asset (static, not stored in localStorage)

| Field | Type | Notes |
|---|---|---|
| `label` | string | Button/link text. |
| `path` | string | Relative path to the static file (e.g. `docs/reference/gemini-agent-repo-blueprint.md`). |

No database, no generated files — see Phase 0 research on why these are
plain `<a download>` links rather than constructed blobs.

## State transitions

- **Module status**: `not_started -> in_progress` (first lab interaction)
  `-> done` (all labs in the module marked complete). Free browse (FR-002)
  means this transition never blocks navigation to other modules.
- **Graded lab attempt**: `unattempted -> scored` (submit) `-> scored`
  (retry, overwrites `lastScore`, increments `attempts`) — retries never
  lock or degrade (spec Assumptions: low-stakes, retriable).
- **Progress reset** (FR-022): confirmation step -> `localStorage.removeItem("ccol:progress:v1")` -> app re-renders as first-visit state. No soft-delete, no undo (matches the "reset" framing — an undo would contradict the explicit confirmation gate's purpose).
