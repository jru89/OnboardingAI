# Contracts

This mission has no backend and no network API (C-001), so there are no
REST/GraphQL contracts to document. What plays the equivalent role — the
interface boundaries that let independently-authored pieces integrate
correctly — is documented here instead:

- [`progress-store.md`](progress-store.md) — the `js/lib/progress.js` API every view and lab engine reads/writes through
- [`lab-engine-contract.md`](lab-engine-contract.md) — the shared interface all six lab engines in `js/views/labs/` must implement
- [`prompt-builder-api.md`](prompt-builder-api.md) — the pure-function contract for `js/lib/prompt-builder.js`
