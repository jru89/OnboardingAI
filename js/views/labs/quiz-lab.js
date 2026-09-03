// Lab engine: "quiz" (Module 8's graded multiple-choice check).
//
// See contracts/lab-engine-contract.md for the mount/unmount shape every
// engine under js/views/labs/ must satisfy, and data-model.md's Lab entry
// for `lab.config`'s shape: an array of
// `{id, question, options: string[], correctIndex}` items.
//
// Graded, but low-stakes and retriable (spec Assumptions) -- same
// submit/score/retry pattern and the same labState[lab.id] shape
// (`{lastScore, attempts}`) as spot-mistake-lab.js, reused deliberately so
// WP08's content authoring only has to learn one runtime-state shape for
// both graded engines.

import { getProgress, setLabState } from "../../lib/progress.js";

export function mount(container, lab, moduleId) {
  void moduleId; // unused by this engine -- only builder-type labs key on it

  const items = lab.config || [];

  let selections = {}; // itemId -> selected option index
  let submittedResults = null; // itemId -> { correct } once submitted this mount

  function persistedState() {
    return getProgress().labState[lab.id] || null;
  }

  function render() {
    container.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = "Quick Check";
    container.appendChild(heading);

    const exitLink = document.createElement("a");
    exitLink.href = "#/";
    exitLink.className = "lab-exit-link";
    exitLink.textContent = "← Exit to all modules";
    container.appendChild(exitLink);

    const persisted = persistedState();
    if (persisted && persisted.lastScore) {
      const banner = document.createElement("p");
      banner.className = "lab-score-banner";
      banner.textContent =
        `Last score: ${persisted.lastScore.correct} / ` +
        `${persisted.lastScore.total} (attempt ${persisted.attempts})`;
      container.appendChild(banner);
    }

    const form = document.createElement("form");
    form.className = "quiz-form";
    form.noValidate = true;

    for (const item of items) {
      form.appendChild(renderItem(item));
    }

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    form.appendChild(submitBtn);

    form.addEventListener("submit", handleSubmit);
    container.appendChild(form);

    if (submittedResults) {
      const correct = Object.values(submittedResults).filter(
        (r) => r.correct,
      ).length;
      const summary = document.createElement("p");
      summary.className = "quiz-summary";
      summary.textContent = `You got ${correct} of ${items.length} correct.`;
      container.appendChild(summary);

      const retryBtn = document.createElement("button");
      retryBtn.type = "button";
      retryBtn.className = "quiz-retry";
      retryBtn.textContent = "Try again";
      retryBtn.addEventListener("click", handleRetry);
      container.appendChild(retryBtn);
    }
  }

  function renderItem(item) {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "quiz-item";
    fieldset.dataset.itemId = item.id;

    const legend = document.createElement("legend");
    legend.textContent = item.question;
    fieldset.appendChild(legend);

    (item.options || []).forEach((optionText, index) => {
      const label = document.createElement("label");
      label.className = "quiz-option";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `quiz-${item.id}`;
      radio.value = String(index);
      radio.checked = selections[item.id] === index;
      radio.addEventListener("change", () => {
        selections[item.id] = index;
      });
      label.appendChild(radio);
      label.appendChild(document.createTextNode(` ${optionText}`));
      fieldset.appendChild(label);
    });

    if (submittedResults) {
      const result = submittedResults[item.id];
      const feedback = document.createElement("p");
      feedback.className =
        "quiz-feedback " + (result.correct ? "is-correct" : "is-incorrect");
      feedback.textContent = result.correct
        ? "Correct."
        : `Incorrect. The correct answer is: ${item.options[item.correctIndex]}`;
      fieldset.appendChild(feedback);
    }

    return fieldset;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const computed = {};
    for (const item of items) {
      computed[item.id] = {
        correct: selections[item.id] === item.correctIndex,
      };
    }
    submittedResults = computed;

    const correct = Object.values(computed).filter((r) => r.correct).length;
    const priorAttempts = (persistedState() || {}).attempts || 0;

    // Same runtime shape as spot-mistake-lab.js:
    // { lastScore: {correct, total}, attempts, completed }.
    setLabState(lab.id, {
      lastScore: { correct, total: items.length },
      attempts: priorAttempts + 1,
      completed: true,
    });

    render();
  }

  function handleRetry() {
    selections = {};
    submittedResults = null;
    render();
  }

  render();

  return {
    unmount() {},
  };
}
