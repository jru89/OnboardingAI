// checklist-lab.js -- the `"checklist"` lab engine (contracts/lab-engine-contract.md).
//
// Used by Module 1's orientation checklist (FR-003). Non-graded, self-marked:
// there is no score or pass/fail state, only a set of checked items and a
// derived "all items checked" completion signal consumed by module-view.js's
// T016 "mark done" rule (see that file's evaluateModuleStatus()/isLabComplete()).
//
// lab.config accepts either shape so this engine works against both the
// literal wording in data-model.md ("array of {id, label}") and the actual
// stub module-view.js ships today (`config: { items: [...] }`):
//   - an array of `{id, label}` items directly, or
//   - an object of the form `{ items: [{id, label}, ...] }`.

import { navigateTo } from "../../app.js";
import { getProgress, setLabState } from "../../lib/progress.js";

function getItems(lab) {
  const config = lab && lab.config;
  if (Array.isArray(config)) return config;
  if (config && Array.isArray(config.items)) return config.items;
  return [];
}

function renderExitAffordance(container) {
  // Per contracts/lab-engine-contract.md: every lab engine must provide its
  // own visible back/exit affordance inside its container, not rely on
  // module-view.js's page-level "All modules" link.
  const exit = document.createElement("a");
  exit.href = "#/";
  exit.className = "lab-exit-link";
  exit.textContent = "← Exit to all modules";
  exit.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo("/");
  });
  container.appendChild(exit);
  return exit;
}

export function mount(container, lab, moduleId) {
  void moduleId; // checklist lab keys state by lab.id only, no draft to key.

  const items = getItems(lab);
  const { labState } = getProgress();
  const priorState = labState[lab.id];
  const checked = new Set(
    priorState && Array.isArray(priorState.checkedItems)
      ? priorState.checkedItems
      : [],
  );

  container.innerHTML = "";
  container.classList.add("checklist-lab");

  renderExitAffordance(container);

  const list = document.createElement("ul");
  list.className = "checklist-lab-list";
  container.appendChild(list);

  const completeNote = document.createElement("p");
  completeNote.className = "checklist-lab-complete-note";
  completeNote.textContent = "All items checked -- nice work!";
  container.appendChild(completeNote);

  const completeCallbacks = [];
  function notifyChanged() {
    for (const callback of completeCallbacks.slice()) {
      try {
        callback();
      } catch (err) {
        console.error(`checklist-lab "${lab.id}" onComplete callback threw:`, err);
      }
    }
  }

  function isAllChecked() {
    return items.length > 0 && items.every((item) => checked.has(item.id));
  }

  function refreshCompleteNote() {
    completeNote.hidden = !isAllChecked();
  }

  function persist() {
    setLabState(lab.id, {
      checkedItems: Array.from(checked),
      completed: isAllChecked(),
    });
    refreshCompleteNote();
    notifyChanged();
  }

  const cleanups = [];

  for (const item of items) {
    const li = document.createElement("li");
    li.className = "checklist-lab-item";

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked.has(item.id);
    checkbox.dataset.itemId = item.id;

    const onChange = () => {
      if (checkbox.checked) {
        checked.add(item.id);
      } else {
        checked.delete(item.id);
      }
      persist();
    };
    checkbox.addEventListener("change", onChange);
    cleanups.push(() => checkbox.removeEventListener("change", onChange));

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${item.label}`));
    li.appendChild(label);
    list.appendChild(li);
  }

  refreshCompleteNote();

  return {
    unmount() {
      for (const cleanup of cleanups) cleanup();
    },
    onComplete(callback) {
      if (typeof callback === "function") completeCallbacks.push(callback);
    },
  };
}
