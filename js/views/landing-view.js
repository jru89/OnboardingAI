// Landing view (`#/` route): module list + overall progress + reset
// control. See kitty-specs/.../tasks/WP02-progress-persistence.md T010/T011.

import { navigateTo } from "../app.js";
import { getProgress, confirmAndResetProgress, onSaved } from "../lib/progress.js";
// WP08/T042: real module content now exists -- import the aggregated,
// order-sorted module list from js/data/modules/index.js instead of the
// WP02-era placeholder stub list it used to define locally here.
import MODULE_STUBS from "../data/modules/index.js";

const STATUS_LABELS = {
  not_started: "Not started",
  in_progress: "In progress",
  done: "Done",
};

let unsubscribeSaved = null;
let currentContainer = null;

function statusFor(moduleStatus, moduleId) {
  return moduleStatus[moduleId] || "not_started";
}

function countDone(moduleStatus) {
  return Object.values(moduleStatus).filter((status) => status === "done")
    .length;
}

function renderOverallProgress() {
  const overallEl = document.getElementById("overall-progress");
  if (!overallEl) return;
  const { moduleStatus } = getProgress();
  const done = countDone(moduleStatus);
  overallEl.textContent = `${done} of ${MODULE_STUBS.length} modules complete`;
}

function buildModuleCard(module, status) {
  const card = document.createElement("a");
  card.className = "module-card";
  card.href = `#/module/${encodeURIComponent(module.id)}`;
  card.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo(`/module/${module.id}`);
  });

  const titleRow = document.createElement("div");
  titleRow.className = "module-card-title-row";

  const title = document.createElement("span");
  title.className = "module-card-title";
  title.textContent = `${module.order}. ${module.title}`;
  titleRow.appendChild(title);

  const badge = document.createElement("span");
  badge.className = `status-badge status-badge--${status}`;
  badge.textContent = STATUS_LABELS[status] || STATUS_LABELS.not_started;
  titleRow.appendChild(badge);

  card.appendChild(titleRow);

  const summary = document.createElement("p");
  summary.className = "module-card-summary";
  summary.textContent = module.summary || "";
  card.appendChild(summary);

  return card;
}

function handleResetClick() {
  // confirmAndResetProgress() notifies onSaved subscribers immediately when
  // it does reset, which includes the re-render subscription set up in
  // render() below -- no need to re-render again here.
  confirmAndResetProgress();
}

function renderLanding(container) {
  const { moduleStatus } = getProgress();

  container.innerHTML = "";

  const heading = document.createElement("h1");
  heading.textContent = "Modules";
  container.appendChild(heading);

  const intro = document.createElement("p");
  intro.textContent =
    "Browse in any order -- your progress is saved automatically on this device.";
  container.appendChild(intro);

  const list = document.createElement("div");
  list.className = "module-list";
  const sorted = [...MODULE_STUBS].sort((a, b) => a.order - b.order);
  for (const module of sorted) {
    list.appendChild(buildModuleCard(module, statusFor(moduleStatus, module.id)));
  }
  container.appendChild(list);

  const resetSection = document.createElement("div");
  resetSection.className = "reset-section";
  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.className = "reset-progress-btn";
  resetButton.textContent = "Reset my progress";
  resetButton.addEventListener("click", handleResetClick);
  resetSection.appendChild(resetButton);
  container.appendChild(resetSection);

  renderOverallProgress();
}

// The router (js/app.js) reuses the same #app-main element across every
// route rather than swapping in a fresh container per view, so
// `currentContainer === container` alone can't tell "am I still the
// active view" apart from "is this still the same DOM node the app has
// always used" -- those are the same object forever. Without an explicit
// handoff, this onSaved subscription would keep firing after the learner
// navigates to a module and silently overwrite that view's content the
// next time ANY progress write completes elsewhere (e.g. a lab being
// marked complete). A one-shot "hashchange" listener detaches the
// subscription as soon as the route changes away from "/", mirroring the
// same pattern module-view.js uses for its own cleanup.
function detachOnLeavingLanding() {
  window.removeEventListener("hashchange", detachOnLeavingLanding);
  if (unsubscribeSaved) {
    unsubscribeSaved();
    unsubscribeSaved = null;
  }
  currentContainer = null;
}

/**
 * Router entry point for the `#/` route (matches WP01's stub signature).
 */
export function render(container) {
  currentContainer = container;
  renderLanding(container);

  // Re-render whenever a debounced (or immediate) progress write
  // completes elsewhere, so the module list and header progress text stay
  // live even if progress changed on another view before navigating back.
  if (unsubscribeSaved) unsubscribeSaved();
  unsubscribeSaved = onSaved(() => {
    if (currentContainer === container) {
      renderLanding(container);
    }
  });

  window.removeEventListener("hashchange", detachOnLeavingLanding);
  window.addEventListener("hashchange", detachOnLeavingLanding);
}
