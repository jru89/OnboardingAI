# Feature Specification: Claude Code Onboarding Lab

**Mission**: claude-code-onboarding-lab-01M1KEXT
**Mission Type**: software-dev
**Status**: Draft

## Purpose

A hosted, static e-learning app that teaches AI fundamentals and Claude Code
prompting skills through 12 interactive modules, culminating in a real
graduation project — building a working Gemini Enterprise "minutes maker"
bot — run entirely in the learner's own Claude Code session.

Onboards a non-technical family member to safe, effective use of Claude Code
and AI-assisted work. Packages existing AI-adoption training material into a
self-paced, no-backend web app modeled on the sibling `rijbewijs-study-app`
project (static HTML/CSS/JS, PWA-installable, GitHub Pages hosting). Walks
through Claude Code orientation, AI/Claude Code fundamentals, data-safety
habits, repo and MCP literacy, and prompting technique (101 and 201), each
reinforced by a hands-on lab with copyable prompt output and downloadable
`.md` scenario files. Culminates in a graduation module that deliberately
stops hand-holding: it hands the learner the same best-practices reference
document and a worked example, states the goal, and sends her into her own
real Claude Code session to build and iterate unaided — exercising every
skill taught earlier in the course.

## User Scenarios & Testing

### Primary User Story

A non-technical, first-time Claude Code user opens the hosted app, browses
the 12 modules in whatever order she prefers, completes the interactive
labs (interface orientation, building prompts, downloading mock scenario
files, taking light graded checks), and finishes at the graduation module,
where she downloads two reference documents and continues the actual build
in her own real Claude Code session.

### Acceptance Scenarios

1. **Given** the learner has never opened the app before, **when** she
   visits the hosted URL, **then** she sees a landing page listing all 12
   modules, each marked "not started," with a short explanation of what the
   course covers.
2. **Given** she opens Module 1 (Get Oriented), **when** she views the
   labeled interface diagram and the linked official video, **then** she
   can identify where to type, where project/file context appears, and what
   a permission prompt looks like, and can check off the orientation
   checklist items.
3. **Given** she opens Module 6 (Prompting 101) and fills in the
   role/context/task/format fields in the prompt builder, **when** she
   clicks "copy," **then** the assembled prompt text is copied to her
   clipboard and a confirmation is shown.
4. **Given** she completes Module 3's safety-spotting exercise, **when** she
   submits her answers, **then** she immediately sees which items she got
   right or wrong, her score, and can retry.
5. **Given** she has completed several modules and closes the browser,
   **when** she reopens the app later on the same device, **then** her prior
   progress (completed modules, graded-check scores, any saved
   prompt-builder drafts) is restored automatically with no save action
   required from her.
6. **Given** she reaches Module 12 (graduation), **when** she downloads the
   two reference documents, **then** she sees the fixed graduation goal
   ("build a working Gemini Enterprise minutes-maker bot"), no worksheet or
   checklist, and clear instructions to continue in her own Claude Code
   session from there.

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
- Learner is offline when she reaches Module 1: the labeled interface
  diagram and checklist remain fully usable offline; only the linked
  external video requires connectivity, and that link is clearly marked as
  external.
- Very narrow viewport (older/small phone): layout must remain readable and
  usable down to the minimum supported width (see NFR-002).

## Requirements

### Functional Requirements

| ID | Requirement | Status |
|---|---|---|
| FR-001 | The app SHALL present a landing view listing all 12 modules with title, one-line description, and current completion status (not started / in progress / done). | Draft |
| FR-002 | The app SHALL allow free navigation to any module from the landing view or a persistent nav menu, regardless of the completion status of other modules. | Draft |
| FR-003 | Module 1 (Get Oriented) SHALL provide a labeled diagram of the Claude Code interface (input area, project/file context, permission prompts) plus a link to Anthropic's official introductory video or documentation, and a short non-graded checklist (e.g., "find the input box," "open a project"). | Draft |
| FR-004 | Module 2 SHALL present content covering what an LLM is and what makes Claude Code different from a standard chat LLM (tool use, file access, multi-step execution), including a comparison table and a self-marked sort/match exercise bucketing statements as "true of any chatbot" vs. "specific to Claude Code." | Draft |
| FR-005 | Module 3 SHALL present data-safety content (what must never be pasted into an AI chat: client/customer data, personal access tokens, SSH private keys, passwords/secrets) plus a "spot the mistake" interactive exercise presenting several example chat snippets, at least one of which contains an unsafe paste. | Draft |
| FR-006 | Module 3's exercise SHALL be graded: on submission the app SHALL show which items were correctly/incorrectly identified, a score, and allow retrying. | Draft |
| FR-007 | Module 4 SHALL present content on what a repository and a repo folder are, plus a self-marked labeled folder-tree exercise matching common file/folder names (e.g., `README.md`, `src/`, `docs/`, `.gitignore`) to short descriptions of what belongs there. | Draft |
| FR-008 | Module 5 SHALL explain what an MCP server is and what belongs in an MCP configuration, in plain non-technical language, plus a self-marked short scenario Q&A ("would this go in an MCP config?") with immediate feedback. | Draft |
| FR-009 | Module 6 SHALL present the role-context-task-format prompt structure and the golden rules (be specific, state what good looks like, state the format, set constraints, one goal at a time, give tone, show an example, iterate). | Draft |
| FR-010 | Module 6 SHALL include an interactive prompt-builder lab: form fields for role, context, task, format, constraints, tone, and an optional example, which live-assembles a formatted prompt as the learner types. | Draft |
| FR-011 | Every assembled or example prompt in the prompt-builder and elsewhere in the app SHALL have a one-click "copy to clipboard" control. | Draft |
| FR-012 | The prompt-builder component SHALL be reusable across Modules 6, 8, 10, and 11, preserving in-session draft state when the learner navigates between modules. | Draft |
| FR-013 | Module 7 SHALL provide at least 3 downloadable mock-scenario `.md` files (e.g., draft a client email, summarize a meeting, plan a spreadsheet cleanup), each with its own download control. | Draft |
| FR-014 | Module 8 SHALL present front-loading context, requesting an output format, treating a first reply as a draft to refine, giving explicit process commands (example: "do not change files yet, propose a short plan and wait for my ok"), and guidance on starting a fresh thread / updating memory when a thread gets long. | Draft |
| FR-015 | Module 8 SHALL include a short graded multiple-choice check ("which of these prompts front-loads context correctly?") with immediate feedback, plus a self-marked "rewrite this weak prompt" free-text exercise using the shared prompt builder. | Draft |
| FR-016 | Module 9 SHALL present a comparison of when to reach for Claude Code versus Gemini, plus a self-marked "which tool for this task?" matching mini-quiz, completable without requiring an account for either tool. | Draft |
| FR-017 | Module 10 SHALL walk through one worked example of directing an AI assistant to automate a repetitive task, and include a lab where the learner drafts her own automation prompt using the shared prompt builder. | Draft |
| FR-018 | Module 11 SHALL explain what a Markdown file is and why AI tooling favors it (plain text, structure, diffability), and include a guided "write a README.md for X" exercise using the prompt builder. | Draft |
| FR-019 | Module 12 (graduation) SHALL present a fixed goal — build a working Gemini Enterprise "minutes maker" agent, under any name the learner chooses — with a short framing narrative ("now that you know all this, build something real"), and SHALL provide exactly two downloads: `docs/reference/gemini-agent-repo-blueprint.md` and `docs/reference/example-agent-minutes-milo.md` (labeled as a reference example, not a template to copy). It SHALL instruct the learner to continue in her own real Claude Code session from that point. It SHALL NOT provide a worksheet, a review checklist, or ready-made prompt templates — the learner applies what she practiced in Modules 6–11 unaided. | Draft |
| FR-020 | The app SHALL automatically persist per-module and per-lab state (completion, graded-check scores, prompt-builder drafts) to the browser's localStorage as the learner interacts, with no manual save action required, and SHALL show a brief, unobtrusive "saved" indicator after each write. | Draft |
| FR-021 | The landing view SHALL display an overall course-completion indicator (e.g., "5 of 12 modules complete"). | Draft |
| FR-022 | The app SHALL provide a "reset my progress" control that clears all saved state, gated behind a confirmation step. | Draft |
| FR-023 | The app SHALL present a persistent header on every module/lab screen showing the course name, the current module's name, an overall progress indicator, and a control to return to the landing view. | Draft |
| FR-024 | Every lab screen SHALL provide a clear, always-visible control to exit the lab back to its parent module or the landing view — no dead-end screens. | Draft |
| FR-025 | Content pages longer than one viewport SHALL provide a scroll-to-top control. | Draft |
| FR-026 | The app SHALL be fully navigable and completable using only keyboard and mouse/touch input, with no tool installation beyond a web browser required to use the app itself. | Draft |
| FR-027 | The app SHALL be installable as a Progressive Web App (browser "install"/"Add to Home Screen"), matching the `rijbewijs-study-app` pattern. | Draft |
| FR-028 | The app SHALL function fully offline after first load via a service-worker-cached app shell and content, matching the `rijbewijs-study-app` pattern (external links, such as Module 1's video, excepted). | Draft |

### Non-Functional Requirements

| ID | Requirement | Status |
|---|---|---|
| NFR-001 | The landing view SHALL be interactive within 2 seconds on a typical broadband connection on a mid-range laptop or tablet. | Draft |
| NFR-002 | The app SHALL remain usable (no broken layout, no clipped/unreadable content) at viewport widths from 360px up through desktop widths. | Draft |
| NFR-003 | Every technical term introduced in course content (e.g., "repo," "MCP," "clone," "commit") SHALL be defined inline or via an accessible glossary reference on first use, so a reader with no prior software-development vocabulary can follow along. | Draft |
| NFR-004 | The app SHALL require no user account, login, or collection of personal data. | Draft |

### Constraints

| ID | Constraint | Status |
|---|---|---|
| C-001 | No backend, server-side code, database, or third-party/API calls — including no calls to any LLM API — are part of the v1 implementation; the prompt builder assembles text locally without generating or evaluating it via an AI model. | Draft |
| C-002 | Modules 1–11 must not attempt to replicate, simulate, or execute spec-kitty, Claude Code, or any AI agent workflow inside the app itself. Module 12 hands off to the learner's own real environment for the actual build. | Draft |
| C-003 | Course content is authored in English only for v1. | Draft |
| C-004 | Single-learner, single-device usage model — no multi-user accounts, sync, or sharing features in v1. | Draft |
| C-005 | The app SHALL be deployable as a static site with no build step, to GitHub Pages or an equivalent free static host. | Draft |
| C-006 | Visual assets are limited to author-drawn SVG diagrams/icons and one external link to Anthropic's official Claude Code intro video/documentation (Module 1). The app does not include AI-generated photorealistic images or a reproduced screenshot of the live product UI. | Draft |
| C-007 | Module 12 deliberately provides only the two named reference documents and the goal statement — no worksheet, checklist, or scripted prompts — so the learner structures her own ask using skills from earlier modules. | Draft |

## Key Entities

- **Module**: id, title, summary, order, content sections, associated lab(s).
- **Lab**: id, parent module id, type (`prompt-builder` | `graded-check` | `exercise` | `download-only` | `checklist`), completion status.
- **Progress record** (localStorage): per-module completion map, graded-check scores, prompt-builder draft state.
- **Downloadable asset**: mock-scenario `.md` files (Module 7), and the two Module 12 reference documents (`gemini-agent-repo-blueprint.md`, `example-agent-minutes-milo.md`).

## Success Criteria

| ID | Criterion |
|---|---|
| SC-001 | A first-time, non-technical learner can go from opening the app to completing all 12 modules in a single sitting of 120 minutes or less. |
| SC-002 | 100% of the app's interactive content (labs, graded checks, prompt builder) is usable with no software installed beyond a modern web browser. |
| SC-003 | After finishing Module 6, the learner can unaided assemble a role-context-task-format prompt in the builder and copy it out for use elsewhere. |
| SC-004 | After finishing Module 12, the learner holds the two reference documents and a clear, one-line graduation goal, ready to start her own Claude Code session — with no further guidance from this app. |
| SC-005 | Reopening the app on the same device after closing the browser restores prior progress automatically, with no data loss and no manual save step. |

**Out-of-app goal (not app-verifiable):** the true graduation outcome — a
working, reviewed Gemini Enterprise minutes-maker bot — is produced entirely
in the learner's own Claude Code session, outside this app. Consistent with
the reference blueprint's own discipline around falsifiable, repo-verifiable
criteria, this app does not claim to verify that outcome; its success
criteria stop at "she has what she needs to start unaided."

## Assumptions

- The learner will do the coursework on a personal device with a modern
  browser (Chrome/Edge/Safari), not a locked-down/managed work machine.
- Her own Claude Code environment/subscription is set up separately from
  this app; this app does not handle that installation or account setup.
- GitHub Pages (or an equivalent free static host) is acceptable for
  hosting; no custom domain is required for v1.
- The graded checks in Modules 3 and 8 are low-stakes and retriable
  (immediate feedback, not a gate blocking progress to other modules).
- Module 12's deliberate lack of scaffolding (C-007) is a pedagogical
  choice, not an oversight: the blueprint document itself already defines
  how to spec, build, and check an agent's work (its own review-submission
  and testing sections), so handing it over is sufficient — a separate
  worksheet or checklist would re-hand-hold what the learner already has
  the skills and material to work out herself.
