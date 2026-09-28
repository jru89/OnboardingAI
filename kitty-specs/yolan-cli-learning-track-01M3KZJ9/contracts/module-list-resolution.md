# Contract: `getModulesForProfile(profileId)`

**Module**: `js/data/modules/index.js`
**Consumers**: `js/views/landing-view.js`, `js/views/module-view.js`

## Signature

```ts
function getModulesForProfile(profileId: string | null | undefined): Module[]
```

## Behavior

| Input `profileId` | Returns |
|---|---|
| `"yolan"` | `yolanTrack` -- the 15-module array defined in `data-model.md`, in that exact order |
| `"wim"` | the existing shared 12-module array (`export default modules`) -- unchanged |
| `"princess"` | the existing shared 12-module array -- unchanged |
| any other value, `null`, or `undefined` | the existing shared 12-module array -- unchanged (safe default; never throws) |

- **Pure function**: no side effects, no `localStorage` access of its own
  (callers pass in whatever `getSelectedProfileId()` from `js/lib/profile.js`
  already returned).
- **Never throws** for any input type, including `undefined` -- matches
  the existing app's general pattern of failing open rather than crashing
  a render.
- **Return value identity**: for the same `profileId`, always returns the
  same array reference (both `yolanTrack` and the default `modules` array
  are module-level constants, not rebuilt per call) -- callers may rely on
  this for cheap reference-equality checks if useful, though none currently
  do.

## Backward compatibility

- The existing `export default modules` from `index.js` is **unchanged** --
  any code that still does `import MODULES from "../data/modules/index.js"`
  continues to get exactly the shared 12-module array it always has. This
  contract is purely additive.

## Consumer obligations

- `landing-view.js` MUST call `getModulesForProfile(getSelectedProfileId())`
  once per render (not cache across profile switches -- switching profiles
  triggers a full page reload today, per `app.js`'s header profile-switch
  handler, so this is naturally correct, but the view must not itself
  memoize the resolved list across renders in a way that would survive a
  future non-reload-based switch).
- `landing-view.js` MUST derive each module card's displayed number from
  the module's position in the *resolved* list (`index + 1`), not from
  `module.order` -- see `data-model.md`'s "Display-numbering derivation"
  section for why.
- `module-view.js` MUST resolve the active list the same way and use it
  for both the `getModule(id)` lookup and the prev/next pager's adjacency
  logic (`findIndex` within the resolved list) -- both already operate on
  "whatever array is currently in scope," so this is a source-swap, not a
  logic change, in that file.
