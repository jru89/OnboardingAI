# Phase 1 Data Model: Yolan's CLI Learning Track

All entities below are plain JavaScript data, held in memory and/or
`localStorage` -- there is no database or backend. This mirrors the
existing app's architecture exactly; this mission adds one new logical
concept (Module Track) and touches no existing entity's shape except one
additive content field.

## Module (existing entity -- shape unchanged)

```js
{
  id: string,            // stable, unique within the app; localStorage progress keys off this
  order: number,         // self-descriptive position within whichever track authored it; NOT used for cross-track display (see Module Track)
  title: string,
  summary: string,
  content: [
    {
      heading?: string,
      body?: string,           // HTML string, hand-authored (no markdown parser)
      diagram?: string,        // path to an SVG asset
      glossaryTerms?: [{ term: string, definition: string }],
    },
  ],
  labs: [
    {
      id: string,         // stable, unique within the module; localStorage labState keys off this
      type: "checklist" | "match" | "spot-mistake" | "quiz" | "prompt-builder" | "download",
      graded: boolean,
      config: object | array,  // shape depends on `type` -- unchanged per-type contracts (C-002: no new type introduced)
    },
  ],
}
```

**Validation rules** (from FR-001/FR-002/C-001/C-002):
- Every `id` referenced by any track must resolve to exactly one Module
  object -- no duplicate ids across the ~10 new files plus the 5 reused
  ones.
- The 5 reused modules' `id` values are byte-identical to their existing
  values in the shared track (`ai-vs-claude-code`, `data-safety`,
  `prompting-101`, `prompting-201`, `md-files-habits`) -- required so
  existing progress in `localStorage` (keyed by these ids, already
  namespaced per profile by the existing `progress.js`) continues to
  resolve correctly regardless of which track references the object.
- Every new module's `labs[].type` is one of the six existing values
  (C-002) -- no new value introduced.

**Invariant**: A Module object's `order` field describes its position
*within the track it was originally authored for* and is never treated as
a cross-track sort key. (See Module Track below for why this matters.)

## Module Track (new concept -- not a stored/serialized entity)

A **track** is simply an explicitly ordered array of Module object
references, resolved at render time by profile id. It is not persisted
anywhere -- it is source code, not data a user can mutate.

```js
// js/data/modules/index.js

const modules = [ /* the existing 12, unchanged, sorted by .order as today */ ];
export default modules; // UNCHANGED -- the shared/default track

const yolanTrack = [
  terminalBasics,               // new
  makeYourTerminalYours,        // new
  claudeCodeCliOrientation,     // new
  aiVsClaudeCode,                // reused reference, same object as in `modules` above
  dataSafety,                    // reused reference, same object (gains 1 bullet, visible everywhere)
  gitProperly,                   // new
  githubHosting,                 // new
  mcpServersHandsOn,             // new
  prompting101,                  // reused reference
  prompting201,                  // reused reference
  specDrivenDevelopment,         // new
  buildingYourOwnTools,          // new
  claudeApiTaste,                // new
  mdFilesHabits,                 // reused reference
  capstoneShipARealTool,         // new
]; // array order IS the display/navigation order -- no `.sort()` applied

export function getModulesForProfile(profileId) {
  if (profileId === "yolan") return yolanTrack;
  return modules; // Wim, Princess, and no-profile-selected all fall back to the shared track (FR-001)
}
```

**Relationships**: A track holds zero or more Module references; a Module
object may be referenced by more than one track simultaneously (the 5
reused modules are referenced by both the shared track and `yolanTrack` at
once -- same object identity, not a copy, so the one Data Safety content
change is authored exactly once and appears correctly in every track that
references it).

**Validation rules** (from FR-002/FR-018/FR-019):
- `yolanTrack` contains exactly the 15 modules listed in spec.md's Key
  Entities table, in that order.
- `yolanTrack` does not contain `mock-use-cases`, `claude-vs-gemini`, or
  `automate-a-task` (FR-018).
- The shared `modules` default export is unchanged in length, order, and
  membership from before this mission (FR-019) -- only one referenced
  object's (`data-safety`) own `content` gains a bullet.

**State transitions**: None -- a track's membership and order are fixed at
build/author time (source code), not runtime state. The only runtime state
involved is *which track is active*, which is derived each render from
`getSelectedProfileId()` (existing, unchanged, `js/lib/profile.js`) and is
not itself stored as part of this data model.

## Profile (existing entity -- unchanged, from `js/lib/profile.js`)

```js
{ id: "yolan" | "wim" | "princess", name: string }
```

No change. This mission is the first consumer of the active profile id for
something beyond `progress.js`'s storage-key namespacing.

## Lab (existing entity -- unchanged shape)

New lab instances live inside the new Module objects above; each reuses an
existing `type` and that type's existing `config` contract unchanged. No
new lab engine, no new `config` shape.

## Display-numbering derivation (view-layer concern, not stored data)

`landing-view.js`'s module card currently renders `${module.order}.
${module.title}`. This mission changes that to
`${position + 1}. ${module.title}`, where `position` is the module's
zero-based index in the array returned by `getModulesForProfile()` for the
active profile -- i.e., display numbering is derived from track position,
never from the Module object's own stored `order` field. This is
behavior-identical for the existing shared track today (12 modules,
sequential `order` 1-12, no gaps -- position and `.order` already coincide
after the existing sort) and is the only way to get correct numbering for
the 5 reused modules inside `yolanTrack`, whose stored `.order` values
(2, 3, 6, 8, 11) do not match their position within Yolan's differently
ordered 15-module list.
