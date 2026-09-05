// App shell: hash router + persistent header/nav chrome.
//
// This file owns:
//   - the route table and hash-based route resolution (T002)
//   - the persistent header/nav chrome (T003)
//   - a reusable scroll-to-top control wired into every render (T005)
//
// The route table below wires in the landing view (WP02) and the module
// view harness (WP03), each imported from js/views/*.js. The route-table
// shape (an array of { path, titleFor, render }) is intended to stay
// stable as later work packages add views.

import { render as renderLanding } from "./views/landing-view.js";
import { render as renderModule } from "./views/module-view.js";
import { onSaved, confirmAndResetProgress } from "./lib/progress.js";

const headerEl = document.getElementById("app-header");
const mainEl = document.getElementById("app-main");

/* ------------------------------------------------------------------ */
/* Navigation helper                                                   */
/* ------------------------------------------------------------------ */

/**
 * Navigate to an app-relative path (e.g. "/", "/module/get-oriented").
 * Other modules should use this instead of writing to location.hash
 * directly, so all navigation goes through one place.
 */
export function navigateTo(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const target = `#${normalized}`;
  if (window.location.hash === target) {
    // Hash isn't changing, so no "hashchange" event will fire -- render
    // manually so a same-route navigation call still does something.
    handleRouteChange();
  } else {
    window.location.hash = target;
  }
}

/* ------------------------------------------------------------------ */
/* Route table                                                         */
/* ------------------------------------------------------------------ */

const routes = [
  { path: "/", titleFor: () => "Home", render: renderLanding },
  {
    path: "/module/:id",
    titleFor: (params) => `Module: ${params.id}`,
    render: renderModule,
  },
];

/* ------------------------------------------------------------------ */
/* Route resolution -- exact-match segments plus one ":id" param       */
/* ------------------------------------------------------------------ */

function getCurrentPath() {
  const hash = window.location.hash || "#/";
  return hash.replace(/^#/, "") || "/";
}

function matchRoute(path) {
  const pathSegments = path.split("/").filter(Boolean);
  for (const route of routes) {
    const routeSegments = route.path.split("/").filter(Boolean);
    if (routeSegments.length !== pathSegments.length) continue;

    const params = {};
    let matched = true;
    for (let i = 0; i < routeSegments.length; i += 1) {
      const routeSegment = routeSegments[i];
      const pathSegment = pathSegments[i];
      if (routeSegment.startsWith(":")) {
        params[routeSegment.slice(1)] = decodeURIComponent(pathSegment);
      } else if (routeSegment !== pathSegment) {
        matched = false;
        break;
      }
    }
    if (matched) return { route, params };
  }
  // Unknown route: fall back to the landing route rather than a dead end.
  return { route: routes[0], params: {} };
}

/* ------------------------------------------------------------------ */
/* Persistent header/nav chrome (T003)                                 */
/* ------------------------------------------------------------------ */
//
// The header is built once. Subsequent route changes only update the text
// of the parts that actually change (current view label) rather than
// replacing the whole header's innerHTML -- this avoids re-render thrash
// and focus loss on every navigation.

let headerBuilt = false;
let currentViewLabelEl = null;
let savedIndicatorEl = null;
let savedIndicatorTimer = null;

function buildHeader() {
  headerEl.innerHTML = `
    <div class="header-inner">
      <span class="course-title">Claude Code Onboarding Lab</span>
      <nav class="header-nav" aria-label="Current location">
        <a href="#/" class="home-link" id="home-link">Home</a>
        <span class="crumb-sep" aria-hidden="true">/</span>
        <span id="current-view-label" aria-current="page">Home</span>
      </nav>
      <span id="overall-progress" class="overall-progress" aria-live="polite"></span>
      <span id="saved-indicator" class="saved-indicator" aria-live="polite" hidden>Saved</span>
      <button type="button" id="header-reset-btn" class="header-reset-btn">Reset progress</button>
    </div>
  `;
  currentViewLabelEl = headerEl.querySelector("#current-view-label");
  savedIndicatorEl = headerEl.querySelector("#saved-indicator");
  const homeLink = headerEl.querySelector("#home-link");
  // A real <a href="#/"> already works with click, Enter, and Space via the
  // browser's native anchor handling -- the listener below just routes the
  // navigation through navigateTo() like every other in-app link will.
  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo("/");
  });
  const resetBtn = headerEl.querySelector("#header-reset-btn");
  resetBtn.addEventListener("click", () => {
    // Reachable from any module/lab page, but a lab already mounted on
    // screen reads its checked/selected state once at mount time -- it
    // won't un-check itself just because storage was cleared underneath
    // it. Sending the learner back to "/" after a real reset avoids that
    // stale-looking mismatch and doubles as a clear "you're starting over"
    // confirmation.
    if (confirmAndResetProgress()) navigateTo("/");
  });
  headerBuilt = true;
}

function renderHeader(currentTitle) {
  if (!headerBuilt) buildHeader();
  currentViewLabelEl.textContent = currentTitle || "Home";
}

/**
 * FR-020: a brief, unobtrusive "Saved" indicator shown after each
 * autosaved write. Subscribed once, globally, here (rather than per-view)
 * so it fires for a write triggered from any lab or the prompt builder,
 * not just the landing view.
 */
onSaved(() => {
  if (!savedIndicatorEl) return;
  savedIndicatorEl.hidden = false;
  if (savedIndicatorTimer) clearTimeout(savedIndicatorTimer);
  savedIndicatorTimer = setTimeout(() => {
    savedIndicatorEl.hidden = true;
  }, 1500);
});

/* ------------------------------------------------------------------ */
/* Scroll-to-top utility (T005)                                        */
/* ------------------------------------------------------------------ */
//
// Wired into every route render (not per-view) so later views get this for
// free. Shown once the learner has scrolled past roughly one viewport.

let scrollToTopBtn = null;

function ensureScrollToTopButton() {
  if (scrollToTopBtn) return scrollToTopBtn;
  scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.type = "button";
  scrollToTopBtn.id = "scroll-to-top";
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.textContent = "↑ Top";
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
  scrollToTopBtn.hidden = true;
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(scrollToTopBtn);
  window.addEventListener("scroll", updateScrollToTopVisibility, {
    passive: true,
  });
  return scrollToTopBtn;
}

function updateScrollToTopVisibility() {
  if (!scrollToTopBtn) return;
  const threshold = window.innerHeight;
  scrollToTopBtn.hidden = window.scrollY <= threshold;
}

/**
 * Ensure the scroll-to-top control exists and reflects the current scroll
 * position. Called once per route render. `container` is accepted (rather
 * than always assuming `window`) so a future view with its own scrolling
 * region can be supported without changing this function's call sites.
 */
function initScrollToTop(container) {
  ensureScrollToTopButton();
  updateScrollToTopVisibility();
  void container; // reserved for a future container-scoped scroll region
}

/* ------------------------------------------------------------------ */
/* Router wiring                                                       */
/* ------------------------------------------------------------------ */

function handleRouteChange() {
  const path = getCurrentPath();
  const { route, params } = matchRoute(path);
  renderHeader(route.titleFor(params));
  route.render(mainEl, params);
  initScrollToTop(mainEl);
}

function bootApp() {
  window.addEventListener("hashchange", handleRouteChange);
  window.addEventListener("DOMContentLoaded", handleRouteChange);

  // Module scripts are deferred, so DOMContentLoaded may already have fired
  // by the time this executes -- render immediately in that case too.
  if (document.readyState !== "loading") {
    handleRouteChange();
  }

  /* ------------------------------------------------------------------ */
  /* Service worker registration (WP11, T054)                            */
  /* ------------------------------------------------------------------ */
  //
  // Out-of-map edit on this WP01-owned file: WP11 (PWA & Offline Support,
  // FR-027/FR-028) is authorized by its task file to make this small,
  // additive registration call here rather than duplicating app bootstrap
  // logic in a new file.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js");
    });
  }
}

/* ------------------------------------------------------------------ */
/* Access gate                                                         */
/* ------------------------------------------------------------------ */
//
// A soft deterrent only, not real authentication -- this is a static
// site with no backend, so GATE_PASSWORD is readable by anyone who views
// source or the public repo. It exists purely to stop a casually-shared
// link from being wandered into by people it wasn't meant for; no
// sensitive data lives behind it, and it isn't a security boundary.
const GATE_STORAGE_KEY = "ccol:gate-passed";
const GATE_PASSWORD = "onboarding";

function isGatePassed() {
  try {
    return window.localStorage.getItem(GATE_STORAGE_KEY) === "true";
  } catch (err) {
    return false; // localStorage unavailable -- fail open, don't hard-lock.
  }
}

function renderGate(onUnlock) {
  headerEl.innerHTML = "";
  mainEl.innerHTML = `
    <div class="gate">
      <h1 class="gate-title">Claude Code Onboarding Lab</h1>
      <p class="gate-intro">This link was shared with you directly -- enter the passphrase you were given to continue.</p>
      <form id="gate-form" class="gate-form" novalidate>
        <label for="gate-input" class="gate-label">Passphrase</label>
        <input id="gate-input" class="gate-input" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" />
        <button type="submit" class="gate-submit">Continue</button>
        <p id="gate-error" class="gate-error" role="alert" hidden>That's not it -- try again.</p>
      </form>
    </div>
  `;
  const form = document.getElementById("gate-form");
  const input = document.getElementById("gate-input");
  const errorEl = document.getElementById("gate-error");
  input.focus();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const entered = input.value.trim().toLowerCase();
    if (entered === GATE_PASSWORD) {
      try {
        window.localStorage.setItem(GATE_STORAGE_KEY, "true");
      } catch (err) {
        // Ignore -- worst case she's asked again on the next visit.
      }
      onUnlock();
    } else {
      errorEl.hidden = false;
      input.select();
    }
  });
}

if (isGatePassed()) {
  bootApp();
} else {
  renderGate(bootApp);
}
