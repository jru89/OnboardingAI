// Lab engine: "spot-mistake" (Module 3's graded data-safety exercise).
//
// See contracts/lab-engine-contract.md for the mount/unmount shape every
// engine under js/views/labs/ must satisfy, and data-model.md's Lab entry
// for `lab.config`'s shape: an array of
// `{id, snippet, isUnsafe, explanation}` items.
//
// Graded, but low-stakes and retriable (spec Assumptions): submitting
// shows per-item correct/incorrect plus a summary score, and a visible
// "Try again" control resets the form in place -- no reload, no lockout,
// no penalty for retrying any number of times.

import { getProgress, setLabState } from "../../lib/progress.js";

export function mount(container, lab, moduleId) {
  void moduleId; // unused by this engine -- only builder-type labs key on it

  const items = lab.config || [];

  // In-memory only: the learner's current, not-yet-submitted choices for
  // this mount. Persisted state (lastScore/attempts) lives in progress.js;
  // this engine never persists individual selections, only the outcome.
  let selections = {}; // itemId -> boolean (true = "unsafe" chosen)
  let submittedResults = null; // itemId -> { correct } once submitted this mount

  function persistedState() {
    return getProgress().labState[lab.id] || null;
  }

  function render() {
    container.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = "Spot the Mistake";
    container.appendChild(heading);

    const exitLink = document.createElement("a");
    exitLink.href = "#/";
    exitLink.className = "lab-exit-link";
    exitLink.textContent = "← Exit to all modules";
    container.appendChild(exitLink);

    // Restore-on-remount (contract: "read prior state via getProgress() on
    // mount ... never assume first-visit") -- show the last known score
    // even before any interaction in *this* mount.
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
    form.className = "spot-mistake-form";
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
      summary.className = "spot-mistake-summary";
      summary.textContent = `You got ${correct} of ${items.length} correct.`;
      container.appendChild(summary);

      const retryBtn = document.createElement("button");
      retryBtn.type = "button";
      retryBtn.className = "spot-mistake-retry";
      retryBtn.textContent = "Try again";
      retryBtn.addEventListener("click", handleRetry);
      container.appendChild(retryBtn);
    }
  }

  function renderItem(item) {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "spot-mistake-item";
    fieldset.dataset.itemId = item.id;

    const legend = document.createElement("legend");
    legend.textContent = item.snippet;
    fieldset.appendChild(legend);

    fieldset.appendChild(renderChoice(item, "Safe", false));
    fieldset.appendChild(renderChoice(item, "Unsafe", true));

    if (submittedResults) {
      const result = submittedResults[item.id];
      const feedback = document.createElement("p");
      feedback.className =
        "spot-mistake-feedback " +
        (result.correct ? "is-correct" : "is-incorrect");
      feedback.textContent =
        (result.correct ? "Correct — " : "Incorrect — ") +
        item.explanation;
      fieldset.appendChild(feedback);
    }

    return fieldset;
  }

  function renderChoice(item, text, boolValue) {
    const label = document.createElement("label");
    label.className = "spot-mistake-choice";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `spot-mistake-${item.id}`;
    radio.value = String(boolValue);
    radio.checked = selections[item.id] === boolValue;
    radio.addEventListener("change", () => {
      selections[item.id] = boolValue;
    });
    label.appendChild(radio);
    label.appendChild(document.createTextNode(` ${text}`));
    return label;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const computed = {};
    for (const item of items) {
      const chosenUnsafe = selections[item.id] === true;
      computed[item.id] = { correct: chosenUnsafe === Boolean(item.isUnsafe) };
    }
    submittedResults = computed;

    const correct = Object.values(computed).filter((r) => r.correct).length;
    const priorAttempts = (persistedState() || {}).attempts || 0;

    // data-model.md's runtime shape: { lastScore: {correct, total}, attempts }.
    // `completed: true` is also set here per module-view.js's documented
    // completion rule -- graded labs complete on first *attempt*, not on a
    // passing score (retries never lock or degrade the experience).
    setLabState(lab.id, {
      lastScore: { correct, total: items.length },
      attempts: priorAttempts + 1,
      completed: true,
    });

    render();
  }

  function handleRetry() {
    // Unlimited retries, no penalty: clears the in-progress selections and
    // per-item feedback only. The persisted lastScore/attempts banner keeps
    // showing the previous attempt until the next submit overwrites it.
    selections = {};
    submittedResults = null;
    render();
  }

  render();

  return {
    unmount() {
      // No timers or window-level listeners registered by this engine --
      // the form and its listeners are discarded with the container by the
      // caller (module-view.js).
    },
  };
}
