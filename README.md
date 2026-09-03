# Claude Code Onboarding Lab

A hosted, static e-learning app that teaches AI fundamentals and Claude Code
prompting skills through 12 interactive modules, culminating in a real
capstone run in the learner's own Claude Code session.

Static site, no backend, no build step — designed to be hosted for free on
GitHub Pages and installed as a PWA, following the same pattern as the
sibling [`rijbewijs-study-app`](../rijbewijs-study-app) project.

See [kitty-specs/claude-code-onboarding-lab-01M1KEXT/spec.md](kitty-specs/claude-code-onboarding-lab-01M1KEXT/spec.md)
for the full requirements.

## Running it locally

No build step needed — any static file server works, for example:

```bash
python -m http.server 8532
```

Then open `http://localhost:8532`. Opening `index.html` directly via
`file://` will **not** work — ES modules and the service worker both
require a real HTTP origin.

(Port 8532 is arbitrary — chosen to avoid colliding with
`rijbewijs-study-app`'s 8531 if both are running locally at once.)

Nothing in this repo assumes a build step or a non-static host: there's no
`package.json`, bundler, or server-side code, just plain HTML/CSS/JS files
served as-is — the same static-site shape as `rijbewijs-study-app`.

### Manual verification checklist

There's no automated test suite for this app (see `plan.md`'s Technical
Context) — [`kitty-specs/claude-code-onboarding-lab-01M1KEXT/quickstart.md`](kitty-specs/claude-code-onboarding-lab-01M1KEXT/quickstart.md)
is the manual verification script instead: landing view module list,
completing a checklist lab, the prompt builder, a graded lab, reload
persistence, reset-progress, Module 12's downloads, offline behavior, and a
360px responsive check.

## Deploying to GitHub Pages

Same process as `rijbewijs-study-app`'s README:

1. Create a new **public** GitHub repository (Pages' free tier requires a
   public repo).
2. Push this project's contents to the repository's `main` branch:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```
3. In the repository's Settings → Pages, set "Source" to "Deploy from a
   branch," branch `main`, folder `/ (root)`.
4. After a minute or two, the app will be live at
   `https://<your-username>.github.io/<repo-name>/`.
5. Share that link with learners — it also installs as a PWA (offline app
   shell + module content) from any modern browser.

Any future changes: edit the files and `git push` again — Pages redeploys
automatically.

## Reference material

[`docs/reference/gemini-agent-repo-blueprint.md`](docs/reference/gemini-agent-repo-blueprint.md)
is the best-practices reference document the capstone module hands to the
learner.
