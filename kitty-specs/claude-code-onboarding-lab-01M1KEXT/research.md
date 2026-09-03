# Phase 0 Research: Claude Code Onboarding Lab

No `[NEEDS CLARIFICATION]` markers remain in `spec.md` and one plan-phase
decision was raised and resolved (content-authoring format). This document
records that decision plus the best-practice choices behind the technical
approach in `plan.md`.

## Decision: Content-authoring format

- **Decision**: Module lesson content and lab configuration live as plain JS
  objects in `js/data/modules.js`, imported directly via ES modules. No
  markdown is parsed at runtime for lesson content.
- **Rationale**: Matches the sibling `rijbewijs-study-app` project exactly
  (its `js/data/lessons.js` / `questions.js` / `signs.js` use the same
  pattern). Avoids adding a runtime markdown-parsing dependency, which would
  either violate the no-build-step / no-dependency constraint (C-001,
  Technical Context) or require vendoring a parser library for no real
  benefit — interactive lab config (quiz answers, builder field defaults,
  match-pair data) needs a structured shape regardless, so authoring lesson
  prose as markdown-then-parsed would still leave the *interactive* half of
  every module as structured JS. Better to keep one format.
- **Alternatives considered**: Separate `.md` file per module, fetched and
  rendered client-side. Rejected: adds a fetch round-trip and a markdown
  renderer dependency for content that is edited far less often than the
  reusable lab engines that consume it, and doesn't actually simplify
  authoring the interactive parts.
- **Confirmed by**: stakeholder, plan-phase decision moment
  `01M1KS0RAJ9MAJBYZCYFANXTRD`.

## Decision: Downloadable assets are served as real static files, not generated blobs

- **Decision**: Every downloadable `.md` (mock use-cases in Module 7, the
  two reference docs in Module 12) is a real file on disk under
  `content/mock-use-cases/` or `docs/reference/`, linked with a plain
  `<a href="..." download>` element.
- **Rationale**: Simplest possible implementation under the no-backend
  constraint; the browser handles the download natively. No need to
  construct a `Blob` and `URL.createObjectURL` for content that is already a
  static file — that machinery only earns its place for *dynamically
  generated* content, which none of the downloads are (even the
  prompt-builder's output is copied, not downloaded, per FR-011).
- **Alternatives considered**: Fetch + Blob download. Rejected as
  unnecessary complexity for static files.

## Decision: Autosave persistence pattern

- **Decision**: A single localStorage key holds one versioned JSON record.
  Writes are debounced (short delay after the last change, e.g. ~300-500ms)
  rather than on every keystroke, with a small UI "saved" indicator that
  appears briefly after a successful write.
- **Rationale**: Directly satisfies FR-020 (autosave, no manual save
  action). Debouncing avoids thrashing localStorage on every keystroke in
  the prompt builder while still feeling instantaneous to the learner.
  Single-key-single-record (vs. one key per module) keeps reset-progress
  (FR-022) a one-line `localStorage.removeItem`, and keeps the "restore on
  reopen" behavior (SC-005) a single parse instead of reconciling many keys.
- **Alternatives considered**: Per-module localStorage keys. Rejected: no
  benefit at this scale (single user, small data volume) and it complicates
  both reset and restore.

## Decision: Clipboard copy with fallback

- **Decision**: Use the async Clipboard API (`navigator.clipboard.writeText`)
  as the primary path; on rejection/unavailability, fall back to visibly
  selecting the text in a read-only field so the learner can copy manually
  (Ctrl/Cmd+C), per the spec's Edge Cases section.
- **Rationale**: The Clipboard API can be blocked by browser permissions or
  unavailable in some contexts (e.g. non-HTTPS `file://` access, though the
  quickstart requires serving over HTTP anyway). A visible, actionable
  fallback is required by the spec rather than a silent failure.
- **Alternatives considered**: `document.execCommand('copy')` as the primary
  method. Rejected: deprecated API; kept only conceptually as "select text
  for manual copy," not as a scripted fallback, to avoid depending on
  deprecated behavior.

## Decision: Offline strategy

- **Decision**: A service worker precaches the app shell (`index.html`,
  `css/style.css`, all `js/**`, `manifest.json`, icons, and the `.md`
  reference/download assets) on install, using a cache-first strategy for
  same-origin requests. Module 1's external video link is explicitly
  excluded and clearly marked as requiring connectivity (spec Edge Cases).
- **Rationale**: Matches `rijbewijs-study-app`'s existing, working
  `service-worker.js` pattern; satisfies FR-027/FR-028 without inventing a
  new offline strategy.
- **Alternatives considered**: None seriously considered — reusing a proven
  pattern from the sibling project is the whole point of matching its
  architecture.
