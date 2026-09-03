---
affected_files: []
cycle_number: 4
mission_slug: claude-code-onboarding-lab-01M1KEXT
reproduction_command:
reviewed_at: '2026-09-03T16:01:29Z'
reviewer_agent: unknown
verdict: rejected
wp_id: WP03
review_artifact_override_at: "2026-09-03T16:09:40Z"
review_artifact_override_actor: "operator"
review_artifact_override_wp_id: "WP03"
review_artifact_override_reason: "Review passed (cycle 2/5): re-verified independently. Confirmed onComplete convention now correctly documented in contracts/lab-engine-contract.md (Optional onComplete(callback) section, real content in primary checkout), module-view.js comment (lines 141-146) accurately reflects it with no false claims, code implementation matches. Supersedes review-cycle-4.md rejection which flagged exactly this issue -- fix commits 4fecece (contract) and 19207cf (comment) resolve it. Spot-check clean: static server, module route renders, no console errors, back-link works."
---

# WP03 Review — Cycle 3

## Verdict: Changes requested (one blocking issue; everything else passes)

## What was verified and is solid

- **Diff scope matches expectations**: `git diff 52363c8..a256c16` (the
  WP03 commit alone, isolated from the WP01/WP02 commits also present in
  this lane) touches exactly `js/app.js` (17 lines, one-line stub swap +
  comment), `js/views/landing-view.js` (+23/-0), and the new
  `js/views/module-view.js` (398 lines). No scope creep beyond what's
  justified.

- **The claimed landing-view.js bug is real and the fix is correctly
  scoped.** Verified by reading `js/app.js`: the router (`handleRouteChange`)
  reuses a single `mainEl` (`#app-main`) across every route — it never
  swaps in a fresh container. That means `landing-view.js`'s pre-existing
  guard `if (currentContainer === container)` inside its `onSaved`
  callback was always true after the very first landing render, for the
  rest of the app's lifetime, regardless of which route is actually
  active. Combined with `progress.js` writes being debounced (~400ms,
  `WRITE_DEBOUNCE_MS`), any progress write completing on *any* view (e.g.
  a lab being interacted with on a module page) would fire
  `notifySaved()` after the learner had already navigated away from `/`,
  and the still-live landing subscription would call
  `renderLanding(container)` and silently blow away whatever view was
  currently showing in that same `#app-main` node. This is a genuine,
  serious FR-024 violation ("no dead-end / no unexpected reversion")
  that predates WP03 and happened to surface once WP03 gave the app a
  second real, non-stub route.

  The fix (`detachOnLeavingLandsing` + a one-shot `hashchange` listener
  registered each time `render()` runs) unsubscribes and clears
  `currentContainer` synchronously as soon as the hash changes away from
  `/`. I confirmed this closes the race safely: `progress.js`'s writes
  only call `notifySaved()` from inside a `setTimeout` (never
  synchronously from `setModuleStatus`/`setLabState`/`setBuilderDraft`),
  so the debounced write can never land inside the same synchronous
  hashchange dispatch as the teardown — teardown always wins. I also
  ran this live (see Testing below): navigated `/` → `/module/get-oriented`
  and waited past the 400ms debounce window; the module view was
  undisturbed and the landing view later reflected the status change
  correctly on return.

  The diff itself is exactly what it should be: 23 added lines, nothing
  removed, comment-heavy, mirrors the same `hashchange`-based teardown
  pattern `module-view.js` uses for its own cleanup. Not a rewrite. This
  is a legitimate out-of-map fix to a WP02-owned file
  (`js/views/landing-view.js` is in WP02's `owned_files`), and I'm
  treating this note as the explicit shared-file coordination record for
  anti-pattern checklist item 7 — no further action needed there.

- **`module-view.js` correctly implements the lab-engine-contract as
  caller**: `mountLab()` dynamically imports `js/views/labs/<type>-lab.js`
  and calls `engineModule.mount(labContainer, lab, moduleId)` — matches
  `contracts/lab-engine-contract.md`'s
  `mount(container, lab, moduleId) -> { unmount() }` signature exactly.
  The returned handle is stored and `unmount()` is called both (a) via
  `teardownActiveMount()` at the top of every `render()` call (same-route
  re-render / different module id), and (b) via a `hashchange` listener
  for navigating away from the module route entirely — matching the
  router's lack of any built-in view-lifecycle hook (confirmed: `app.js`
  has no unmount/teardown call between routes; each view is on its own
  to self-manage via `hashchange`, which is what both `landing-view.js`
  and `module-view.js` now consistently do). In-flight dynamic imports
  that resolve after unmount are correctly guarded with a `cancelled`
  flag so a late `mount()` call never fires against a torn-down view.

- **T016 "mark done" rule** is a reasonable, well-documented judgment
  call given the genuine spec ambiguity: `labState[lab.id].completed`
  for graded/non-graded engines (attempted, not passed, for graded —
  correctly matches the "unlimited retries" assumption), "non-empty
  draft" for `prompt-builder` labs, and "zero labs = done on mount" for
  content-only modules. Documented inline exactly as the task asked.

- **Live verification** (static server on `127.0.0.1:8539`, hash-only
  navigation confirmed via network log to stay in-SPA, no full reloads):
  cycled `/` ↔ `/module/get-oriented` ↔ `/module/ai-vs-claude-code`
  repeatedly. Back-to-all-modules link works from every module route.
  Glossary `<details>/<summary>` disclosure expands correctly on click.
  Module status badges update correctly and persist across navigation
  (`get-oriented` → "In progress", `ai-vs-claude-code` → "Done" for its
  zero-lab case). Only console errors seen are the two expected 404s
  (`checklist-lab.js`, the diagram SVG) — both are handled gracefully in
  code (fallback text, not thrown), not bugs.

## Blocking issue

**The T016 `onComplete` convention was not reflected back into
`contracts/lab-engine-contract.md`, and `module-view.js` contains a
comment that falsely claims it was.**

The WP03 task prompt is explicit: *"the lab-engine-contract's `mount()`
return value may optionally include an `onComplete(callback)` the
harness can subscribe to — decide this now and reflect it back into
`contracts/lab-engine-contract.md` via a short note **if you add it**,
since WP05/WP06 will need to implement it."* WP03 did add it —
`module-view.js` lines 141–145 and `mountLab()` (line 273) implement and
rely on an optional `handle.onComplete(callback)`.

`git diff 52363c8..a256c16 -- kitty-specs/` is empty:
`contracts/lab-engine-contract.md` was not touched by this commit. I
re-read the current contract file in full — it documents only
`mount(container, lab, moduleId) -> { unmount(): void }`, with no
mention of `onComplete` anywhere.

Worse, the code comment in `js/views/module-view.js` (lines 144–145)
states: *"This optional convention has been noted back in
`contracts/lab-engine-contract.md` for WP05/WP06."* That statement is
false as of this commit — the contract file was never edited. This
matters concretely because `WP05` (already planned, blocked on WP03) and
`WP06` are both dependents; WP05's own task file
(`WP05-checklist-match-labs.md`, lines 106–108) already tells its future
implementer to "check [WP03's] Activity Log for what it settled on" —
but WP03's Activity Log (in `WP03-module-view-harness.md`) also contains
no note about this convention. Right now the *only* place this optional
contract extension is documented is a source comment inside
`module-view.js` itself that additionally misdescribes its own state.

**Fix required**: add a short note to
`kitty-specs/claude-code-onboarding-lab-01M1KEXT/contracts/lab-engine-contract.md`
documenting the optional `onComplete(callback)` return value (signature,
when it's called, that it's optional), and correct the
`module-view.js` comment so it no longer claims work that wasn't done.
This is small — a few lines in the contract file plus a one-line comment
edit — and directly unblocks WP05/WP06 from having to reverse-engineer
the convention from `module-view.js` source.

## Anti-pattern checklist

1. Dead code — PASS (`module-view.js`'s `render` is wired into `js/app.js`'s
   route table, real production caller).
2. Synthetic-fixture test — N/A (no automated tests in this repo/WP;
   verification was manual/live per the WP's own review guidance, which
   doesn't call for automated tests here).
3. Silent empty return — PASS. The one empty-catch (`mountLab`'s
   `.catch(() => { ... })` for a missing lab engine module) is documented
   inline as expected current-state behavior, not swallowed silently.
4. FR coverage — PASS (FR-002 module rendering + lab mounting verified
   live; FR-024 back-link + unmount-on-navigate verified live and by
   code reading).
5. Frozen surface — PASS. No file marked frozen/untouchable in
   spec/contracts/WP prompt was modified.
6. Locked decision — **See blocking issue above**: this isn't a
   contradicted `MUST NOT`, but it is a documented WP-prompt obligation
   ("reflect it back... since WP05/WP06 will need to implement it")
   left undone, with a false claim in its place. Treating this as the
   closest fit to a "silently diverging from source-of-truth contract"
   violation per the WP's own Risk Mitigation note.
7. Shared-file ownership — PASS, addressed above (this review note is the
   explicit coordination record for the `landing-view.js` edit).
8. Production fragility — PASS. No bare `raise`/throw in a
   request/worker/CLI path; the one `try/catch` around a lab's
   `unmount()` is defensive and logs via `console.error`, appropriately.

## Next steps

Please add the short contract note and fix the misleading comment, then
resubmit for review. Everything else — including the landing-view.js fix,
which was the main thing I was asked to scrutinize — checks out.
