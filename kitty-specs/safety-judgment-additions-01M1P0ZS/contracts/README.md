# Contracts

This mission has no backend and no network API -- same as the original
mission. The one interface boundary this mission touches is documented
here:

- [`quiz-lab-contract-amendment.md`](quiz-lab-contract-amendment.md) -- the
  backward-compatible addition to `js/views/labs/quiz-lab.js`'s existing
  config contract (see the original mission's
  `kitty-specs/claude-code-onboarding-lab-01M1KEXT/contracts/lab-engine-contract.md`
  for the full six-engine contract this amends one entry of).

Every other change in this mission is content authoring against the
existing `Module` / `Content Section` shape (original mission's
`data-model.md`) and does not touch any contract.
