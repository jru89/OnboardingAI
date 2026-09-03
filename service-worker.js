// Offline-first app shell caching for the Claude Code Onboarding Lab.
//
// Pattern adapted from rijbewijs-study-app/service-worker.js (same
// static-site, no-backend context). Unlike that sibling project, this
// service worker uses a cache-first strategy for ALL same-origin requests
// (per this mission's research.md "Offline strategy" decision), since this
// app has no build step and content only changes when this WP's precache
// list is intentionally updated and CACHE_NAME is bumped.

const CACHE_NAME = "claude-code-onboarding-lab-v1";

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",

  // js/app.js + libs
  "./js/app.js",
  "./js/lib/clipboard.js",
  "./js/lib/progress.js",
  "./js/lib/prompt-builder.js",

  // js/views
  "./js/views/landing-view.js",
  "./js/views/module-view.js",

  // js/views/labs
  "./js/views/labs/checklist-lab.js",
  "./js/views/labs/download-lab.js",
  "./js/views/labs/match-lab.js",
  "./js/views/labs/prompt-builder-lab.js",
  "./js/views/labs/quiz-lab.js",
  "./js/views/labs/spot-mistake-lab.js",

  // js/data/modules
  "./js/data/modules/index.js",
  "./js/data/modules/01-get-oriented.js",
  "./js/data/modules/02-ai-vs-claude-code.js",
  "./js/data/modules/03-data-safety.js",
  "./js/data/modules/04-repos.js",
  "./js/data/modules/05-mcp-servers.js",
  "./js/data/modules/06-prompting-101.js",
  "./js/data/modules/07-mock-use-cases.js",
  "./js/data/modules/08-prompting-201.js",
  "./js/data/modules/09-claude-vs-gemini.js",
  "./js/data/modules/10-automate-a-task.js",
  "./js/data/modules/11-md-files-habits.js",
  "./js/data/modules/12-graduation.js",

  // icons
  "./icons/icon-192.png",
  "./icons/icon-512.png",

  // diagram assets
  "./assets/svg/interface-map.svg",
  "./assets/svg/repo-folder-tree.svg",

  // downloadable mock-use-case files (Module 7)
  "./content/mock-use-cases/draft-a-client-email.md",
  "./content/mock-use-cases/plan-a-spreadsheet-cleanup.md",
  "./content/mock-use-cases/summarize-a-meeting.md",
  "./content/mock-use-cases/write-a-project-update.md",

  // downloadable reference docs (Module 12)
  "./docs/reference/example-agent-minutes-milo.md",
  "./docs/reference/gemini-agent-repo-blueprint.md",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Cross-origin requests (e.g. Module 1's external video link, if ever
  // fetched rather than navigated to) pass straight through to the network
  // -- this service worker only caches this app's own same-origin files.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Same-origin: cache-first. The precache list above is the source of
  // truth for the app shell and content; anything not found there is
  // fetched from the network and cached for next time.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
