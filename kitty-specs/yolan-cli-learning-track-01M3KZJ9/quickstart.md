# Quickstart: Verifying Yolan's CLI Learning Track

Manual verification walkthrough -- no automated test framework exists in
this project (see plan.md's Technical Context). Run this in the browser
preview after implementation. Maps directly to spec.md's Success Criteria.

## 1. Yolan's list is correct (SC-001)

1. Clear `localStorage` (or use a private window) so no profile is
   pre-selected.
2. Open the app, pass the passphrase gate, pick **Yolan** in the picker.
3. On the landing page, confirm exactly 15 modules are listed, numbered
   1-15 in this order: Terminal Basics, Make Your Terminal Yours, Claude
   Code from the Command Line, AI vs. Claude Code, Data Safety, Git
   Properly, GitHub & Hosting, MCP Servers Hands-On, Prompting 101,
   Prompting 201, Spec-Driven Development, Building Your Own Tools with
   Claude Code, A Taste of the Claude API, .md Files & Habits, Capstone:
   Ship a Real Tool.
4. Confirm none of Mock Use-Cases, Claude vs. Gemini, or Automate a Task
   appear anywhere in the list.

## 2. Other profiles are unaffected (SC-002)

1. Switch to Wim via the header profile switcher.
2. Confirm the landing page shows the original 12-module shared list,
   correctly numbered 1-12.
3. Open Data Safety and confirm the one new bullet (never commit
   secrets/API keys to git) is present and reads naturally in a non-CLI
   context too.
4. Repeat for Princess. If either profile had prior progress before this
   change, confirm it is still intact (module statuses/badges unchanged).

## 3. Terminal-styling instructions actually work (SC-003)

Walk "Make Your Terminal Yours" on hardware matching the documented specs
(Intel Mac, macOS Monterey 12.7.6) or, at minimum, read every command
against Homebrew's and iTerm2's own current install documentation to
confirm nothing in the module assumes Apple Silicon paths or a newer
macOS version than 12.7.6. Confirm the module does not prescribe Ghostty.

## 4. Every module renders and every lab is completable (SC-004)

1. Resize the browser to 360px width; visit every one of Yolan's 15
   modules; confirm no clipped/overflowing content in either the reading
   sections or any lab.
2. Repeat at a normal desktop width.
3. Complete (or self-mark, per each lab type's existing completion rule)
   every lab in every one of the 15 modules; confirm each module's status
   badge updates to "Done" and the header's overall progress count
   increments correctly.

## 5. Progress survives a profile switch (SC-005)

1. As Yolan, mark a few modules in-progress/done.
2. Switch to Wim via the header, then switch back to Yolan.
3. Confirm every module status from step 1 is exactly as it was.

## 6. No console errors

Throughout the above, keep devtools open and confirm no uncaught errors
appear -- in particular when navigating directly to a Yolan-only module id
via a bookmarked/typed URL while a non-Yolan profile is active (should
gracefully fall back per `getModule()`'s existing unknown-id handling, not
throw).
