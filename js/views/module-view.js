// Module view (`#/module/:id` route): the generic per-module harness.
//
// Every one of the 12 modules and every lab engine mounts through this one
// file (see kitty-specs/.../tasks/WP03-module-view-harness.md, subtasks
// T012-T016, and contracts/lab-engine-contract.md for the mount/unmount
// contract this file calls into).
//
// This view is the *caller* of the lab-engine-contract, not an
// implementer of any specific engine -- lab engines live under
// js/views/labs/ (WP05/WP06) and real module content lives under
// js/data/modules/ (WP07/WP08, aggregated via index.js).

import { navigateTo } from "../app.js";
import { getProgress, setModuleStatus, onSaved } from "../lib/progress.js";
// WP08/T042: real module content now exists for all 12 modules -- import
// the aggregated, order-sorted list from js/data/modules/index.js instead
// of the WP03-era local placeholder stubs this file used to define here.
import MODULES from "../data/modules/index.js";

/* ------------------------------------------------------------------ */
/* Module lookup (T042)                                                */
/* ------------------------------------------------------------------ */
//
// Real content for every module id now exists (WP07: modules 1-6, WP08:
// modules 7-12), so the GENERIC_STUB_CONTENT fallback from the WP03-era
// harness is no longer reachable for any of the 12 real module ids -- it
// stays only as a defensive fallback for an unrecognized/stale id (e.g. an
// old bookmarked hash), so navigating there still renders something rather
// than throwing.

const GENERIC_STUB_CONTENT = [
  {
    body: "<p>This module could not be found.</p>",
  },
];

function getModule(id) {
  const known = MODULES.find((module) => module.id === id);
  if (known) return known;
  return { id, title: id, content: GENERIC_STUB_CONTENT, labs: [] };
}

/* ------------------------------------------------------------------ */
/* Lab engine loading (T012)                                           */
/* ------------------------------------------------------------------ */
//
// Every engine file lives at js/views/labs/<type>-lab.js and exports the
// mount(container, lab, moduleId) -> { unmount(), onComplete? } shape from
// contracts/lab-engine-contract.md. None of these files exist yet (WP05/
// WP06 build them) -- the map below is written for the paths those WPs
// are documented to use, so this dynamic-import call site is already
// correct once they land. A missing/failed import is handled gracefully
// (see mountLab below) rather than left as an unhandled rejection, since
// "engine not built yet" is the expected state for this WP, not an error.

const LAB_ENGINE_PATHS = {
  checklist: "./labs/checklist-lab.js",
  match: "./labs/match-lab.js",
  "spot-mistake": "./labs/spot-mistake-lab.js",
  quiz: "./labs/quiz-lab.js",
  "prompt-builder": "./labs/prompt-builder-lab.js",
  download: "./labs/download-lab.js",
};

/* ------------------------------------------------------------------ */
/* "Mark done" completion rule (T016)                                  */
/* ------------------------------------------------------------------ */
//
// Decision (documented here since spec.md / data-model.md do not pin
// down this exact edge case):
//
// - Canonical signal: `labState[lab.id].completed === true`, written by
//   the lab engine itself via progress.js's setLabState(). Non-graded
//   engines (checklist, match, download) set this once the learner has
//   self-marked/interacted with the lab; graded engines (spot-mistake,
//   quiz) set it on first *attempt* (submit), not on a passing score --
//   retries never lock or degrade (spec Assumptions: low-stakes,
//   retriable), so "attempted" is the bar, not "passed".
// - Exception: "prompt-builder" labs have no natural complete/incomplete
//   state (a prompt draft is never graded or submitted). Per the WP03
//   task guidance, we treat "has a non-empty saved draft" in
//   progress.js's builderDrafts as sufficient self-marked completion for
//   that type.
// - A module with zero configured labs (nothing exists yet in the
//   placeholder data above, and some real modules may end up content-only)
//   is treated as complete as soon as it is mounted -- there is no
//   lab-based signal to gate on, so waiting forever for labs that will
//   never exist would strand it below "done" permanently.
//
// This harness does not require a lab engine to implement anything beyond
// the required mount/unmount contract -- completion is derived from the
// persisted progress record (the actual source of truth), so it works
// even if a lab engine never signals us directly. As a *convenience*, an
// engine's mount() may optionally also return an `onComplete(callback)`
// subscribe function; if present, this harness calls it once and uses it
// only to re-check completion sooner rather than waiting on the next
// debounced progress write. This optional convention is documented in
// contracts/lab-engine-contract.md (see "Optional onComplete(callback)")
// for WP05/WP06 to reference.

function isLabComplete(lab, moduleId) {
  const { labState, builderDrafts } = getProgress();
  if (lab.type === "prompt-builder") {
    const purposeKey = (lab.config && lab.config.purposeKey) || moduleId;
    const draft = builderDrafts[purposeKey];
    if (!draft || typeof draft !== "object") return false;
    return Object.values(draft).some(
      (value) => typeof value === "string" && value.trim().length > 0,
    );
  }
  const state = labState[lab.id];
  return Boolean(state && state.completed === true);
}

function allLabsComplete(labs, moduleId) {
  return labs.every((lab) => isLabComplete(lab, moduleId));
}

/**
 * Re-derives module status from the current progress record and, if it
 * changed, persists the new status. Called once on mount and again every
 * time the progress record is saved (a lab's own state change) so status
 * catches up without requiring every lab engine to call back into this
 * harness directly.
 */
function evaluateModuleStatus(moduleId, labs) {
  const { moduleStatus } = getProgress();
  const currentStatus = moduleStatus[moduleId] || "not_started";
  if (currentStatus === "done") return; // already settled, nothing to do

  if (labs.length === 0 || allLabsComplete(labs, moduleId)) {
    setModuleStatus(moduleId, "done");
  } else if (currentStatus === "not_started") {
    setModuleStatus(moduleId, "in_progress");
  }
}

/* ------------------------------------------------------------------ */
/* Content section rendering (T012, T014, T015)                        */
/* ------------------------------------------------------------------ */

function renderGlossaryTerms(glossaryTerms) {
  const wrap = document.createElement("div");
  wrap.className = "glossary-terms";
  for (const { term, definition } of glossaryTerms) {
    // A native <details>/<summary> pair is keyboard-accessible and
    // requires no custom tooltip library (T014) -- kept deliberately
    // simple rather than scanning body text for the term's first
    // occurrence and injecting an inline disclosure there.
    const details = document.createElement("details");
    details.className = "glossary-term";
    const summary = document.createElement("summary");
    summary.textContent = term;
    details.appendChild(summary);
    const def = document.createElement("p");
    def.textContent = definition;
    details.appendChild(def);
    wrap.appendChild(details);
  }
  return wrap;
}

function renderDiagram(diagramPath, sectionHeading) {
  // A plain <img> is simpler than inlining the SVG and sufficient unless
  // a later WP finds a concrete reason the diagram needs to inherit page
  // CSS custom properties for theming (T015).
  const img = document.createElement("img");
  img.className = "content-diagram";
  img.src = diagramPath;
  img.alt = sectionHeading ? `Diagram: ${sectionHeading}` : "Diagram";
  img.loading = "lazy";
  return img;
}

function renderContentSection(section) {
  const sectionEl = document.createElement("section");
  sectionEl.className = "module-content-section";

  if (section.heading) {
    const heading = document.createElement("h2");
    heading.textContent = section.heading;
    sectionEl.appendChild(heading);
  }

  if (section.body) {
    const body = document.createElement("div");
    body.className = "module-content-body";
    // Content is authored directly (not user input) per data-model.md's
    // "no markdown parser" decision -- innerHTML is intentional here.
    body.innerHTML = section.body;
    sectionEl.appendChild(body);
  }

  if (section.diagram) {
    sectionEl.appendChild(renderDiagram(section.diagram, section.heading));
  }

  if (section.glossaryTerms && section.glossaryTerms.length > 0) {
    sectionEl.appendChild(renderGlossaryTerms(section.glossaryTerms));
  }

  return sectionEl;
}

/* ------------------------------------------------------------------ */
/* Lab mounting + cleanup (T012, T013)                                 */
/* ------------------------------------------------------------------ */

function mountLab(lab, moduleId, onCompleteHint) {
  const labContainer = document.createElement("div");
  labContainer.className = `lab-mount lab-mount--${lab.type}`;
  labContainer.dataset.labId = lab.id;

  const path = LAB_ENGINE_PATHS[lab.type];
  if (!path) {
    labContainer.textContent = `Unknown lab type: ${lab.type}`;
    return { element: labContainer, unmount: () => {} };
  }

  let handle = null;
  let cancelled = false;

  import(path)
    .then((engineModule) => {
      if (cancelled) return; // unmounted before the import settled
      handle = engineModule.mount(labContainer, lab, moduleId);
      if (handle && typeof handle.onComplete === "function") {
        handle.onComplete(onCompleteHint);
      }
    })
    .catch(() => {
      // Expected for now -- no lab engines exist yet (WP05/WP06). Not a
      // console.error: this is normal, current-state behavior, not a bug.
      if (!cancelled) {
        labContainer.textContent =
          "This activity isn't available yet -- check back soon.";
      }
    });

  return {
    element: labContainer,
    unmount() {
      cancelled = true;
      if (handle && typeof handle.unmount === "function") {
        try {
          handle.unmount();
        } catch (err) {
          console.error(`Lab "${lab.id}" threw while unmounting:`, err);
        }
      }
    },
  };
}

/* ------------------------------------------------------------------ */
/* Router entry point + cross-navigation cleanup (T013)                */
/* ------------------------------------------------------------------ */
//
// module-view.js doesn't just clean up when the router calls render()
// again for a *different* module -- it also has to clean up when the
// learner leaves the module route entirely (e.g. back to "/"), which the
// router handles by calling a different view's render() and never calls
// back into this file. A one-shot "hashchange" listener registered per
// mount covers that case; the explicit teardown() call at the top of
// every render() covers same-route re-renders (no hashchange event fires
// for those -- see app.js's navigateTo()).

let activeTeardown = null;

function teardownActiveMount() {
  if (activeTeardown) {
    const fn = activeTeardown;
    activeTeardown = null;
    fn();
  }
}

export function render(container, params) {
  teardownActiveMount();

  const moduleId = params.id;
  const module = getModule(moduleId);
  const labs = module.labs || [];

  container.innerHTML = "";

  // Back-to-all-modules link (T013) -- always rendered by module-view.js
  // itself, independent of whatever the mounted lab(s) do, so FR-024's
  // "no dead-end screens" holds even if a lab's own exit affordance is
  // broken or still loading.
  const backLink = document.createElement("a");
  backLink.href = "#/";
  backLink.className = "back-to-modules-link";
  backLink.textContent = "← All modules";
  backLink.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo("/");
  });
  container.appendChild(backLink);

  const heading = document.createElement("h1");
  heading.textContent = module.title;
  container.appendChild(heading);

  for (const section of module.content || []) {
    container.appendChild(renderContentSection(section));
  }

  const labHandles = [];
  const recheckCompletion = () => evaluateModuleStatus(moduleId, labs);

  if (labs.length > 0) {
    const labsSection = document.createElement("section");
    labsSection.className = "module-labs";
    container.appendChild(labsSection);
    for (const lab of labs) {
      const { element, unmount } = mountLab(lab, moduleId, recheckCompletion);
      labsSection.appendChild(element);
      labHandles.push({ unmount });
    }
  }

  // First mount from "not_started" -> "in_progress" (T012), or straight to
  // "done" for a zero-lab module -- see the T016 rule documented above.
  evaluateModuleStatus(moduleId, labs);

  // Re-check completion whenever any progress write settles (covers labs
  // that don't implement the optional onComplete hint).
  const unsubscribeSaved = onSaved(recheckCompletion);

  function unmountAll() {
    for (const { unmount } of labHandles) {
      unmount();
    }
  }

  function cleanup() {
    window.removeEventListener("hashchange", onHashChange);
    unsubscribeSaved();
    unmountAll();
  }

  function onHashChange() {
    window.removeEventListener("hashchange", onHashChange);
    if (activeTeardown === cleanup) activeTeardown = null;
    unsubscribeSaved();
    unmountAll();
  }

  window.addEventListener("hashchange", onHashChange);
  activeTeardown = cleanup;
}
