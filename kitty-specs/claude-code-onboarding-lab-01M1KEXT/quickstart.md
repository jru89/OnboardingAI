# Quickstart: Claude Code Onboarding Lab

## Running it locally

No build step needed — any static file server works, matching
`rijbewijs-study-app`:

```bash
python -m http.server 8532
```

Then open `http://localhost:8532`. Opening `index.html` directly via
`file://` will **not** work — ES modules and the service worker both
require a real HTTP origin.

(Port 8532 is arbitrary — chosen to avoid colliding with
`rijbewijs-study-app`'s 8531 if both are running locally at once.)

## Manual verification checklist (no automated test suite — see plan.md Technical Context)

1. Landing view lists all 12 modules, all "not started" on first load.
2. Complete Module 1's checklist; confirm it marks done and the landing
   view's overall progress indicator updates.
3. Fill the Module 6 prompt builder; confirm the assembled prompt updates
   live and the copy button copies it (check via pasting somewhere).
4. Submit Module 3's spot-the-mistake exercise; confirm score display and
   retry both work.
5. Reload the page (hard refresh); confirm all progress from steps 2-4
   persisted with no manual save step.
6. Use "reset my progress"; confirm the confirmation gate appears and, once
   confirmed, the app returns to first-visit state.
7. Reach Module 12; confirm exactly two downloads are offered (the
   blueprint and the Minutes Milo example) and no worksheet/checklist is
   present.
8. Go offline (DevTools > Network > Offline) and reload; confirm the app
   shell and all module content still load, and that only Module 1's
   external video link is visibly affected.
9. Resize to 360px width; confirm no layout breakage on the landing view,
   a content-heavy module, and the prompt builder.

## Deploying to GitHub Pages

Same process as `rijbewijs-study-app`'s README: push to a public repo's
`main` branch, enable Pages ("Deploy from a branch" / `main` / root), share
the resulting `https://<username>.github.io/<repo>/` URL.
