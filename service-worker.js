// Offline-first app shell caching for the Claude Code Onboarding Lab.
//
// Pattern adapted from rijbewijs-study-app/service-worker.js (same
// static-site, no-backend context), with one deliberate change from the
// original cache-first design: fetch() below uses stale-while-revalidate,
// not pure cache-first.
//
// Why: pure cache-first meant a returning learner would NEVER see an
// updated file after their first visit -- the cache only ever refreshed
// if a human remembered to bump CACHE_NAME by hand on every single content
// or style change, which is exactly the bug a real user hit (a CSS fix
// "disappeared" on refresh because their browser was still serving the
// precache snapshot from their first visit, unaware anything had changed).
// Stale-while-revalidate still answers instantly from cache (so it's just
// as fast, and still fully usable offline), but every online load also
// kicks off a background fetch that updates the cache for *next* time --
// so a change is visible within one extra reload instead of never, with no
// manual version bump required for routine edits.
const CACHE_NAME = "claude-code-onboarding-lab-v3";

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
      .then((cache) =>
        // cache.addAll(urls) would let each fetch honor the browser's own
        // HTTP cache -- on a returning visit that can silently repopulate
        // a brand-new precache with the SAME stale response this whole
        // update mechanism exists to replace. { cache: "reload" } forces
        // each precache fetch to bypass HTTP cache and hit the network.
        Promise.all(
          PRECACHE_URLS.map((url) =>
            fetch(url, { cache: "reload" }).then((response) => {
              if (response.ok) return cache.put(url, response);
              return undefined;
            })
          )
        )
      )
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

  // Same-origin: stale-while-revalidate. Answer from cache immediately
  // when available (this is what keeps the app fast and fully usable
  // offline -- see the file-level comment above for why this isn't plain
  // cache-first). In parallel, always attempt a network fetch and, on
  // success, overwrite the cache entry so the *next* load reflects
  // whatever is currently on the server. Offline: the network fetch
  // simply rejects and is swallowed -- the cached response already
  // answered the request, so there is nothing further to do.
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cached) => {
        // { cache: "no-cache" } forces a real conditional request to the
        // server on every revalidation instead of potentially being
        // satisfied by the browser's own (heuristic, non-SW) HTTP cache --
        // otherwise "revalidate" could silently re-confirm the same stale
        // response this strategy exists to move past.
        const revalidateRequest = new Request(event.request, {
          cache: "no-cache",
        });
        const revalidate = fetch(revalidateRequest)
          .then((response) => {
            if (response && response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch(() => null);

        return cached || revalidate;
      })
    )
  );
});
