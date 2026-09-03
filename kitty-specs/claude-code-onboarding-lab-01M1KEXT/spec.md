# Feature Specification: Claude Code Onboarding Lab

**Mission**: claude-code-onboarding-lab-01M1KEXT
**Mission Type**: software-dev
**Status**: Draft

## Purpose

A hosted, static e-learning app that teaches AI fundamentals and Claude Code
prompting skills through 11 interactive modules, culminating in a real
capstone run in her own Claude Code session.

Onboards a non-technical family member to safe, effective use of Claude Code
and AI-assisted work. Packages existing AI-adoption training material into a
self-paced, no-backend web app modeled on the sibling `rijbewijs-study-app`
project (static HTML/CSS/JS, PWA-installable, GitHub Pages hosting). Walks
through AI/Claude Code fundamentals, data-safety habits, repo and MCP
literacy, and prompting technique (101 and 201), each reinforced by a
hands-on lab with copyable prompt output and downloadable `.md` scenario
files. Culminates in a capstone that hands off to a real Claude Code
session: the learner acts as a well-prepared client, providing context
(including an existing best-practices reference document already in this
repo) and a clear ask, then iterates with Claude as the implementing expert —
exercising the prompting and context-handling skills taught earlier in the
course.

## User Scenarios & Testing

### Primary User Story

A non-technical, first-time Claude Code user opens the hosted app, browses
the 11 modules in whatever order she prefers, completes the interactive labs
(building prompts, downloading mock scenario files, taking light graded
checks), and finishes at the capstone module, where she downloads two
artifacts to take into her own real Claude Code session.

### Acceptance Scenarios

1. **Given** the learner has never opened the app before, **when** she
   visits the hosted URL, **then** she sees a landing page listing all 11
   modules, each marked "not started," with a short explanation of what the
   course covers.
2. **Given** she opens Module 5 (Prompting 101) and fills in the
   role/context/task/format fields in the prompt builder, **when** she
   clicks "copy," **then** the assembled prompt text is copied to her
   clipboard and a confirmation is shown.
3. **Given** she completes Module 2's safety-spotting exercise, **when** she
   submits her answers, **then** she immediately sees which items she got
   right or wrong, her score, and can retry.
4. **Given** she has completed several modules and closes the browser,
   **when** she reopens the app later on the same device, **then** her prior
   progress (completed modules, graded-check scores, any saved
   prompt-builder drafts) is still shown.
5. **Given** she reaches Module 11 (capstone), **when** she uses the two
   download controls, **then** she receives the best-practices blueprint
   `.md` and a capstone worksheet `.md` as files on her device, alongside
   on-screen instructions telling her to continue in her own Claude Code
   session.

### Edge Cases

- Learner clears her browser's site data: all progress is lost, but the app
  must still load and behave correctly, identically to a first visit — no
  errors on empty/missing localStorage.
- Learner uses a private/incognito window: progress will not persist across
  browser sessions; the app remains fully usable within a single session
  (see Assumptions).
- Clipboard API is unavailable or blocked by the browser: the copy button
  must fail gracefully and show a visible fallback (e.g., "select the text
  below to copy manually") rather than erroring silently.
- Very narrow viewport (older/small phone): layout must remain readable and
  usable down to the minimum supported width (see NFR-003).

## Requirements

### Functional Requirements

| ID | Requirement | Status |
|---|---|---|
| FR-001 | The app SHALL present a landing view listing all 11 modules with title, one-line description, and current completion status (not started / in progress / done). | Draft |
| FR-002 | The app SHALL allow free navigation to any module from the landing view or a persistent nav menu, regardless of the completion status of other modules. | Draft |
| FR-003 | Module 1 SHALL present content covering what an LLM is and what makes Claude Code different from a standard chat LLM (tool use, file access, multi-step execution), including at least one comparison table. | Draft |
| FR-004 | Module 2 SHALL present data-safety content (what must never be pasted into an AI chat: client/customer data, personal access tokens, SSH private keys, passwords/secrets) plus a "spot the mistake" interactive exercise presenting several example chat snippets, at least one of which contains an unsafe paste. | Draft |
| FR-005 | Module 2's exercise SHALL be graded: on submission the app SHALL show which items were correctly/incorrectly identified, a score, and allow retrying. | Draft |
| FR-006 | Module 3 SHALL present content on what a repository and a repo folder are and typical contents (README, source folders, config, docs), reinforced with an example folder-tree illustration. | Draft |
| FR-007 | Module 4 SHALL explain what an MCP server is, what it is used for, and what belongs in an MCP configuration, in plain non-technical language. | Draft |
| FR-008 | Module 5 SHALL present the role-context-task-format prompt structure and the golden rules (be specific, state what good looks like, state the format, set constraints, one goal at a time, give tone, show an example, iterate). | Draft |
| FR-009 | Module 5 SHALL include an interactive prompt-builder lab: form fields for role, context, task, format, constraints, tone, and an optional example, which live-assembles a formatted prompt as the learner types. | Draft |
| FR-010 | Every assembled or example prompt in the prompt-builder and elsewhere in the app SHALL have a one-click "copy to clipboard" control. | Draft |
| FR-011 | The prompt-builder component SHALL be reusable across modules 5, 7, and 9, preserving in-session draft state when the learner navigates between modules. | Draft |
| FR-012 | Module 6 SHALL provide at least 3 downloadable mock-scenario `.md` files (e.g., draft a client email, summarize a meeting, plan a spreadsheet cleanup), each with its own download control. | Draft |
| FR-013 | Module 7 SHALL present front-loading context, requesting an output format, treating a first reply as a draft to refine, giving explicit process commands (example: "do not change files yet, propose a short plan and wait for my ok"), and guidance on starting a fresh thread / updating memory when a thread gets long. | Draft |
| FR-014 | Module 7 SHALL include a short graded multiple-choice check (e.g., "which of these prompts front-loads context correctly?") with immediate feedback. | Draft |
| FR-015 | Module 8 SHALL present a comparison of when to reach for Claude Code versus Gemini, completable without requiring an account for either tool. | Draft |
| FR-016 | Module 9 SHALL walk through one worked example of directing an AI assistant to automate a repetitive task, and include a lab where the learner drafts her own automation prompt using the shared prompt-builder. | Draft |
| FR-017 | Module 10 SHALL explain what a Markdown file is and why AI tooling favors it (plain text, structure, diffability), and include a guided "write a README.md for X" exercise using the prompt-builder. | Draft |
| FR-018 | Module 11 (capstone) SHALL NOT simulate spec-kitty, Claude Code, or any AI agent workflow inside the app. It SHALL instead present: a summary of the capstone's goal, a download of `docs/reference/gemini-agent-repo-blueprint.md`, a downloadable capstone worksheet `.md` scaffolding the context-and-ask she prepares, and explicit instructions to continue in her own Claude Code session. | Draft |
| FR-019 | The app SHALL persist per-module and per-lab completion state in the browser's localStorage, surviving page reloads and browser restarts on the same device/browser. | Draft |
| FR-020 | The landing view SHALL display an overall course-completion indicator (e.g., "4 of 11 modules complete"). | Draft |
| FR-021 | The app SHALL provide a "reset my progress" control that clears all saved state, gated behind a confirmation step. | Draft |
| FR-022 | The app SHALL be fully navigable and completable using only a keyboard and mouse/touch input, with no tool installation beyond a web browser required to use the app itself. | Draft |
| FR-023 | The app SHALL be installable as a Progressive Web App (browser "install"/"Add to Home Screen"), matching the `rijbewijs-study-app` pattern. | Draft |
| FR-024 | The app SHALL function fully offline after first load via a service-worker-cached app shell and content, matching the `rijbewijs-study-app` pattern. | Draft |

### Non-Functional Requirements

| ID | Requirement | Status |
|---|---|---|
| NFR-001 | The app SHALL require no backend server, database, or external API calls (including no calls to any LLM/AI API) — all functionality runs client-side. | Draft |
| NFR-002 | The landing view SHALL be interactive within 2 seconds on a typical broadband connection on a mid-range laptop or tablet. | Draft |
| NFR-003 | The app SHALL remain usable (no broken layout, no clipped/unreadable content) at viewport widths from 360px up through desktop widths. | Draft |
| NFR-004 | Every technical term introduced in course content (e.g., "repo," "MCP," "clone," "commit") SHALL be defined inline or via an accessible glossary reference on first use, so a reader with no prior software-development vocabulary can follow along. | Draft |
| NFR-005 | The app SHALL require no user account, login, or collection of personal data. | Draft |
| NFR-006 | The app SHALL be deployable as a static site with no build step, to GitHub Pages or an equivalent free static host. | Draft |

### Constraints

| ID | Constraint | Status |
|---|---|---|
| C-001 | No backend, server-side code, or third-party/API calls — including no calls to any LLM API — are part of the v1 implementation; the prompt builder assembles text locally without generating or evaluating it via an AI model. | Draft |
| C-002 | The capstone module must not attempt to replicate, simulate, or execute spec-kitty, Claude Code, or any AI agent workflow inside the app itself; it hands off to the learner's own real environment. | Draft |
| C-003 | Course content is authored in English only for v1. | Draft |
| C-004 | Single-learner, single-device usage model — no multi-user accounts, sync, or sharing features in v1. | Draft |

## Key Entities

- **Module**: id, title, summary, order, content sections, associated lab(s).
- **Lab**: id, parent module id, type (`prompt-builder` | `graded-check` | `exercise` | `download-only`), completion status.
- **Progress record** (localStorage): per-module completion map, graded-check scores, prompt-builder draft state.
- **Downloadable asset**: mock-scenario `.md` files, capstone worksheet `.md`, the reference blueprint `.md` (sourced from `docs/reference/gemini-agent-repo-blueprint.md`).

## Success Criteria

| ID | Criterion |
|---|---|
| SC-001 | A first-time, non-technical learner can go from opening the app to completing all 11 modules in a single sitting of 90 minutes or less. |
| SC-002 | 100% of the app's interactive content (labs, graded checks, prompt builder) is usable with no software installed beyond a modern web browser. |
| SC-003 | After finishing Module 5, the learner can unaided assemble a role-context-task-format prompt in the builder and copy it out for use elsewhere. |
| SC-004 | After finishing Module 11, the learner holds two artifacts ready to bring into her own Claude Code session: the best-practices reference doc and a completed context/ask worksheet. |
| SC-005 | Reopening the app on the same device after closing the browser restores prior progress with no data loss. |

## Assumptions

- The learner will do the coursework on a personal device with a modern
  browser (Chrome/Edge/Safari), not a locked-down/managed work machine.
- Her own Claude Code environment/subscription is set up separately from
  this app; this app does not handle that installation or account setup.
- GitHub Pages (or an equivalent free static host) is acceptable for
  hosting; no custom domain is required for v1.
- The graded checks in Modules 2 and 7 are low-stakes and retriable
  (immediate feedback, not a gate blocking progress to other modules).
