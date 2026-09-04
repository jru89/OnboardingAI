# Quickstart: Safety & Judgment Curriculum Additions

## Running it locally

Same as the original mission -- no build step, any static file server:

```bash
python -m http.server 8560
```

Then open `http://localhost:8560`. `file://` will not work (ES modules +
service worker need a real HTTP origin).

## Manual verification checklist (no automated test suite -- see plan.md Technical Context)

Regression check first, then each new addition:

1. **Regression**: Open Module 8, complete the existing quiz lab
   (`module-8-quiz`); confirm it renders and scores exactly as before this
   mission (no `explanation` text appears, since none of its 4 existing
   items carry that field).
2. Open Module 1; confirm the new "Claude can do more than answer you"
   section reads before the existing content, and the new "Would you allow
   this?" lab shows 5 questions, each with 3 options (Allow / Don't allow /
   Not sure -- inspect first); submit and confirm an explanation appears
   under each answer, correct or not.
3. Open Module 3; confirm the two new categories, the "when in doubt, don't
   paste" rule, the safe-example contrast, and the closing "don't use AI at
   all" section all render in the existing visual style (cards/lists match
   the surrounding content, no unstyled elements).
4. Open Module 4; confirm the new before/after change-review section
   renders readably, including at 360px width.
5. Open Module 6; confirm the new "a good prompt doesn't guarantee a good
   answer" section renders and its cross-reference to Module 8 reads
   sensibly.
6. Open Module 8; confirm the new "Verification checklist" section renders
   above the new "Can you spot what's wrong?" lab, and that lab shows the
   source facts, then 3 Accurate/Inaccurate questions; submit and confirm
   each explanation correctly names the source fact.
7. Open Module 11; confirm the new "What to do when Claude gets it wrong"
   section and the new "Something went wrong" lab render; submit each of
   the 4 options in turn and confirm the explanation appears for both the
   correct and incorrect choices.
8. Open Module 12; confirm the new "Before you start" self-check renders as
   plain reading content (no checkboxes, no submit control, no completion
   state) above the existing two downloads, and that both downloads still
   work without interacting with the self-check.
9. Reload the page (hard refresh) after completing steps 2, 6, and 7;
   confirm all three new labs' scores persisted with no manual save step,
   same as every existing graded lab.
10. Confirm Modules 8 and 11 (each now with 2 labs) only show as "done" on
    the landing view once *both* of their labs have been attempted at least
    once -- not just the pre-existing one.
11. Resize to 360px width; spot-check Module 1's lab, Module 8's new lab,
    and Module 4's before/after example for layout breakage.
12. Go offline (DevTools > Network > Offline) and reload; confirm all 7
    touched modules and both new labs still load and function fully
    offline (no new files were added, so no service-worker changes were
    needed -- this step confirms that assumption held).

## Deploying

No change from the original mission's process (GitHub Pages, `main` branch,
"Deploy from a branch"). This mission does not touch deployment.
