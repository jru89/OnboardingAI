# DR-001: No `src/`/`tests/` directories (deliberate, per DIRECTIVE_003/010)

**Date**: 2026-09-03
**Status**: Accepted

## Context

`spec-kitty accept` fails its path-convention check because the
`software-dev` mission type declares generic default paths (`src/`,
`tests/`) that this project doesn't have. The tool's suggested fix is
`mkdir -p src/ tests/`.

## Decision

Do not create these directories. This project's actual structure —
`index.html`, `js/`, `css/`, `assets/`, `content/`, `docs/` at the repo
root, no `src/` wrapper, no `tests/` directory — was decided explicitly
in `plan.md`'s Technical Context and Project Structure sections (Phase
0 of planning), matches the sibling `rijbewijs-study-app` project by
design, and was implemented and reviewed against exactly that structure
across all 12 work packages. There is no test framework in this
project (also decided in `plan.md`, for the same reason: no build step
to run one through) — an empty `tests/` directory would be exactly the
"empty ceremony that reads as evidence when it is not" anti-pattern the
project's own reference material (`docs/reference/gemini-agent-repo-blueprint.md`)
explicitly warns against.

## Consequences

- `spec-kitty accept` is run with `--allow-fail` to get past this one
  known false-positive; every other acceptance check (acceptance
  matrix, git cleanliness, WP lane state) passes on its own merits.
- This is a mismatch between the generic `software-dev` mission-type
  template and a legitimately different project shape (a static site,
  not a conventional src/tests-layout application) — not a defect in
  the shipped app.
