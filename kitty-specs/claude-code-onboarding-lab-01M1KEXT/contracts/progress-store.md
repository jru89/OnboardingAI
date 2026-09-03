# Contract: `js/lib/progress.js`

The single point of contact with localStorage. No other module reads or
writes `ccol:progress:v1` directly — this keeps the debounce, the "saved"
indicator, and the corrupt/missing-data fallback in one place (IC-02).

## Functions

- `getProgress(): ProgressRecord` — returns the current record, synchronously, from an in-memory cache seeded on load. Never throws; returns a fresh default record if localStorage is empty, missing, or fails to parse.
- `setModuleStatus(moduleId: string, status: "not_started" | "in_progress" | "done"): void` — updates one module's status and schedules a debounced write.
- `setLabState(labId: string, state: object): void` — merges `state` into `labState[labId]` and schedules a debounced write.
- `setBuilderDraft(purposeKey: string, draft: object): void` — replaces `builderDrafts[purposeKey]` and schedules a debounced write.
- `resetProgress(): void` — immediately (not debounced) clears the stored key and resets the in-memory cache to a fresh default record.
- `onSaved(callback: () => void): () => void` — subscribes to "a debounced write just completed" (drives the UI "saved" indicator, FR-020); returns an unsubscribe function.

## Guarantees

- Every write is debounced (~300-500ms after the last call) except `resetProgress`, which is immediate.
- `getProgress()` never returns `null`/`undefined` and never throws — callers do not need their own try/catch around it.
- Consumers (views, lab engines) never touch `window.localStorage` directly.
