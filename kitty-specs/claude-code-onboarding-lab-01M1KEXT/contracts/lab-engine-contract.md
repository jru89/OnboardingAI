# Contract: lab engines (`js/views/labs/*.js`)

`module-view.js` mounts a lab purely from its static `config` (data-model.md)
and its `type`, without knowing the specifics of any one lab type. Every file
in `js/views/labs/` exports the same shape so `module-view.js` can treat them
interchangeably.

## Required export

```js
export function mount(container: HTMLElement, lab: Lab, moduleId: string): { unmount(): void }
```

- `container` — the DOM node to render into.
- `lab` — the static `Lab` record from `js/data/modules.js` (id, type, graded, config).
- `moduleId` — the parent module's id, needed by builder-type labs to key their draft (see `contracts/progress-store.md`, `setBuilderDraft`).
- Returns an object with `unmount()`, called by the router before rendering the next view — every lab engine must clean up its own event listeners here (this is what makes FR-024's "no dead-end screens" and clean navigation actually hold under repeated visits, not just on first render).
- **Optional `onComplete(callback)`**: added during WP03. `module-view.js` derives module-completion status from the persisted progress record itself (`getProgress()`), not from anything a lab claims — so this is a pure convenience, never a requirement. If a mounted lab's returned object also includes an `onComplete(callback)` subscribe function, `module-view.js` calls it once so it can re-check completion sooner than the next debounced progress write, rather than waiting on it. No engine is required to implement this; omitting it only means completion re-checks happen on the normal debounced write cadence instead of immediately.

## Behavioral requirements every engine must meet

- Read prior state via `getProgress()` on mount (e.g. a quiz already attempted shows its last score, not a blank form) — never assume first-visit.
- Write state via `progress.js`'s setters only (never touch localStorage directly).
- Provide a visible, always-present "back to module" / "exit" affordance inside `container` — FR-024 is a per-lab responsibility, not something the router can enforce from outside.
- Graded engines (`spot-mistake`, `quiz`) must allow unlimited retries with no penalty (spec Assumptions).
- Non-graded engines never render a score or pass/fail state — only a completion mark.

## The six concrete engines

| `type` | File | Used by (modules) |
|---|---|---|
| `checklist` | `checklist-lab.js` | 1 |
| `match` | `match-lab.js` | 2, 4, 5, 9 |
| `spot-mistake` | `spot-mistake-lab.js` | 3 |
| `quiz` | `quiz-lab.js` | 8 |
| `prompt-builder` | `prompt-builder-lab.js` | 6, 8, 10, 11 |
| `download` | `download-lab.js` | 7, 12 |
