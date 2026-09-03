// Lab engine: "download" (Modules 7 and 12's static-file download lists).
//
// See contracts/lab-engine-contract.md for the mount/unmount shape every
// engine under js/views/labs/ must satisfy, and data-model.md's
// "Downloadable asset" entry for `lab.config`'s shape: an array of
// `{label, path}` items.
//
// Per research.md's "Downloadable assets are served as real static files"
// decision: every item is a real file on disk, linked with a plain
// `<a href="..." download>` element. No Blob/URL.createObjectURL -- that
// machinery only earns its place for dynamically generated content, and
// none of these downloads are.

import { setLabState } from "../../lib/progress.js";

export function mount(container, lab, moduleId) {
  void moduleId; // unused by this engine -- only builder-type labs key on it

  container.innerHTML = "";

  const heading = document.createElement("h3");
  heading.textContent = "Downloads";
  container.appendChild(heading);

  const exitLink = document.createElement("a");
  exitLink.href = "#/";
  exitLink.className = "lab-exit-link";
  exitLink.textContent = "← Exit to all modules";
  container.appendChild(exitLink);

  const list = document.createElement("ul");
  list.className = "download-list";

  const items = lab.config || [];
  for (const { label, path } of items) {
    const li = document.createElement("li");
    li.className = "download-list-item";

    const link = document.createElement("a");
    link.href = path;
    link.setAttribute("download", "");
    link.textContent = label;
    li.appendChild(link);

    list.appendChild(li);
  }

  container.appendChild(list);

  // This engine has no graded/completion concept (per the WP06 task
  // guidance) -- rendering the download links without error is sufficient
  // for module-view.js's "done" rule (isLabComplete checks
  // labState[lab.id].completed === true for every non-prompt-builder,
  // non-graded lab type). Mark it complete once the list above has been
  // built successfully, so a downloads-only module isn't stuck below
  // "done" forever waiting for a click signal the spec doesn't ask for.
  setLabState(lab.id, { completed: true });

  return {
    unmount() {},
  };
}
