// match-lab.js -- the generic `"match"` lab engine (contracts/lab-engine-contract.md).
//
// One engine reused by four modules with genuinely different content
// (Module 2 sort-into-buckets, Module 4 folder-tree matching, Module 5 MCP
// scenario Q&A, Module 9 tool-choice quiz). See this WP's Activity Log
// (kitty-specs/.../tasks/WP05-checklist-match-labs.md, T024) for the
// four-shape verification this file's shape was checked against.
//
// lab.config item shape:
//   {
//     prompt: string,          // required -- statement / scenario / file name
//     options: string[],       // required -- 2+ choices, rendered as buttons
//     correctOption: string,   // required -- must equal one entry in options
//     visual?: string,         // optional -- short supplementary text (e.g.
//                               // an ASCII folder tree) shown above the
//                               // options in a <pre> block. Added after the
//                               // T024 pass: Module 4's folder-tree matching
//                               // benefits from a small illustration next to
//                               // the prompt and everything else simply
//                               // omits this field.
//     id?: string,              // optional -- stable key for stored
//                               // selections; falls back to the item's
//                               // array index when absent (config items in
//                               // data-model.md's base shape don't carry an
//                               // id, so this can't be required).
//   }
//
// As with checklist-lab.js, lab.config itself may be a bare array of the
// above items, or `{ items: [...] }` -- this engine accepts both so it
// works against data-model.md's literal wording (bare array) and
// module-view.js's existing `{ items: [...] }` stub convention.
//
// Non-graded, self-marked, unlimited changes: selecting an option shows
// immediate correct/incorrect feedback but never locks -- this is not
// quiz-lab.js's submit-once flow (that's WP06).

import { navigateTo } from "../../app.js";
import { getProgress, setLabState } from "../../lib/progress.js";

function getItems(lab) {
  const config = lab && lab.config;
  if (Array.isArray(config)) return config;
  if (config && Array.isArray(config.items)) return config.items;
  return [];
}

function itemKey(item, index) {
  return typeof item.id === "string" && item.id ? item.id : `idx-${index}`;
}

function renderExitAffordance(container) {
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
  void moduleId; // match lab keys state by lab.id only, no draft to key.

  const items = getItems(lab);
  const { labState } = getProgress();
  const priorState = labState[lab.id];
  const selections = { ...((priorState && priorState.selections) || {}) };

  container.innerHTML = "";
  container.classList.add("match-lab");

  renderExitAffordance(container);

  const list = document.createElement("ol");
  list.className = "match-lab-list";
  container.appendChild(list);

  const completeCallbacks = [];
  function notifyChanged() {
    for (const callback of completeCallbacks.slice()) {
      try {
        callback();
      } catch (err) {
        console.error(`match-lab "${lab.id}" onComplete callback threw:`, err);
      }
    }
  }

  function isAllAnswered() {
    return (
      items.length > 0 &&
      items.every((item, index) => {
        const key = itemKey(item, index);
        return Object.prototype.hasOwnProperty.call(selections, key);
      })
    );
  }

  function persist() {
    setLabState(lab.id, {
      selections: { ...selections },
      completed: isAllAnswered(),
    });
    notifyChanged();
  }

  const cleanups = [];

  items.forEach((item, index) => {
    const key = itemKey(item, index);

    const li = document.createElement("li");
    li.className = "match-lab-item";

    const promptEl = document.createElement("p");
    promptEl.className = "match-lab-prompt";
    promptEl.textContent = item.prompt;
    li.appendChild(promptEl);

    if (item.visual) {
      const visualEl = document.createElement("pre");
      visualEl.className = "match-lab-visual";
      visualEl.textContent = item.visual;
      li.appendChild(visualEl);
    }

    const optionsGroup = document.createElement("div");
    optionsGroup.className = "match-lab-options";
    optionsGroup.setAttribute("role", "group");

    const feedbackEl = document.createElement("p");
    feedbackEl.className = "match-lab-feedback";
    feedbackEl.hidden = true;

    function refreshOptionUI() {
      const selected = selections[key];
      const buttons = optionsGroup.querySelectorAll("button");
      buttons.forEach((btn) => {
        const isSelected = btn.dataset.option === selected;
        btn.classList.toggle("selected", isSelected);
        btn.setAttribute("aria-pressed", String(isSelected));
      });
      if (selected === undefined) {
        feedbackEl.hidden = true;
        feedbackEl.textContent = "";
        return;
      }
      feedbackEl.hidden = false;
      if (selected === item.correctOption) {
        feedbackEl.textContent = "Correct!";
        feedbackEl.className = "match-lab-feedback match-lab-feedback--correct";
      } else {
        feedbackEl.textContent =
          `Not quite -- the answer is "${item.correctOption}". ` +
          "Pick another option any time.";
        feedbackEl.className = "match-lab-feedback match-lab-feedback--incorrect";
      }
    }

    for (const option of item.options) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "match-lab-option";
      btn.dataset.option = option;
      btn.textContent = option;
      btn.setAttribute("aria-pressed", "false");

      const onClick = () => {
        selections[key] = option;
        refreshOptionUI();
        persist();
      };
      btn.addEventListener("click", onClick);
      cleanups.push(() => btn.removeEventListener("click", onClick));

      optionsGroup.appendChild(btn);
    }

    li.appendChild(optionsGroup);
    li.appendChild(feedbackEl);
    refreshOptionUI();

    list.appendChild(li);
  });

  return {
    unmount() {
      for (const cleanup of cleanups) cleanup();
    },
    onComplete(callback) {
      if (typeof callback === "function") completeCallbacks.push(callback);
    },
  };
}
