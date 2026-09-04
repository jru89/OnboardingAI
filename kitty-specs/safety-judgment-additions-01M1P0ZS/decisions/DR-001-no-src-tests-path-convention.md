# DR-001: No `src/`/`tests/` directories (deliberate, carried forward from the original mission)

**Date**: 2026-09-04
**Status**: Accepted

## Context

`spec-kitty accept` fails its path-convention check because the
`software-dev` mission type declares generic default paths (`src/`,
`tests/`) that this project doesn't have. The tool's suggested fix is
`mkdir -p src/ tests/`.

## Decision

Do not create these directories, for the same reason the original mission
(`claude-code-onboarding-lab-01M1KEXT`, see its own
`decisions/DR-001-no-src-tests-path-convention.md`) already decided this:
the project's real structure (`index.html`, `js/`, `css/`, `assets/`,
`content/`, `docs/` at the repo root) has no `src/` wrapper and no
`tests/` directory, and this mission is a content/lab addition on top of
that same structure, not a reason to introduce a parallel one. There is
still no test framework in this project (no build step to run one
through) -- an empty `tests/` directory would be exactly the "empty
ceremony that reads as evidence when it is not" anti-pattern the
project's own reference material warns against.

## Consequences

- `spec-kitty accept` is run with `--allow-fail` to get past this one
  known false-positive; every other acceptance check (acceptance matrix,
  git cleanliness, WP lane state) passes on its own merits.
- This is a mismatch between the generic `software-dev` mission-type
  template and a legitimately different project shape -- not a defect in
  the shipped content.
