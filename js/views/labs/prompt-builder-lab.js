// Lab engine: "prompt-builder" (contracts/lab-engine-contract.md).
//
// Used by Modules 6, 8, 10, and 11 (contracts/lab-engine-contract.md's
// engine table). All four usages mount this exact same file -- the only
// thing that tells their drafts apart is `lab.config.purposeKey` (see the
// "purposeKey design decision" note below). This file owns the DOM: it is
// the only place in the prompt-builder feature that touches
// document/window; js/lib/prompt-builder.js (assembly) and
// js/lib/clipboard.js (copy) stay pure/DOM-free per their contracts.
//
// ---------------------------------------------------------------------
// purposeKey design decision (T020, FR-012) -- READ THIS BEFORE WP07/WP08
// ---------------------------------------------------------------------
// `lab.config` for every `"prompt-builder"` lab MUST include a `purposeKey`
// string field, distinct per usage across the app. This engine uses
// `lab.config.purposeKey` -- NOT `lab.id` and NOT `moduleId` -- as the key
// passed to progress.js's `setBuilderDraft(purposeKey, fields)` and read
// back from `getProgress().builderDrafts[purposeKey]`.
//
// Why not `moduleId` or `lab.id`: `moduleId` is one-per-module, but this
// same engine is reused for a *different exercise* within the same module
// context in some cases (and reusing `lab.id` risks collision if content
// authors ever reuse ids). `purposeKey` is an explicit, human-readable
// string that content authors (WP07/WP08) choose per builder *instance*,
// so two builders in the same module, or the same builder reused across
// modules, can never silently share a draft.
//
// data-model.md already anticipates two concrete values (see its
// `builderDrafts` example) -- WP07/WP08 MUST use these exact strings for
// those two usages so drafts written by this WP's manual verification
// (and any future automated tests) line up with production content:
//   - "prompting-101"          -- Module 6's primary prompt-builder lab
//   - "prompting-201-rewrite"  -- Module 8's "rewrite this weak prompt"
//                                 exercise (FR-014/FR-015), which reuses
//                                 this same engine rather than a separate
//                                 one
// Modules 10 and 11 each need their own distinct purposeKey too when their
// lab.config is authored; suggested (not yet consumed anywhere else):
//   - "automate-a-task"        -- Module 10
//   - "readme-exercise"        -- Module 11
//
// If `lab.config.purposeKey` is missing, this engine falls back to
// `${moduleId}:${lab.id}` and logs a console error -- content authors
// should treat that as a bug to fix, not a supported path.

import { navigateTo } from "../../app.js";
import { getProgress, setBuilderDraft } from "../../lib/progress.js";
import { assemblePrompt, validateFields } from "../../lib/prompt-builder.js";
import { copyText } from "../../lib/clipboard.js";

const FIELD_DEFS = [
  { key: "role", label: "Role", required: true },
  { key: "context", label: "Context", required: true },
  { key: "task", label: "Task", required: true },
  { key: "format", label: "Format", required: true },
  { key: "constraints", label: "Constraints", required: false },
  { key: "tone", label: "Tone", required: false },
  { key: "example", label: "Example", required: false },
];

const COPY_STATUS_HIDE_MS = 3000;

let instanceCounter = 0;

function resolvePurposeKey(lab, moduleId) {
  const configured = lab && lab.config && lab.config.purposeKey;
  if (typeof configured === "string" && configured.trim() !== "") {
    return configured;
  }
  const fallback = `${moduleId || "unknown-module"}:${(lab && lab.id) || "prompt-builder"}`;
  console.error(
    `prompt-builder-lab: lab.config.purposeKey is missing (lab.id=${
      (lab && lab.id) || "?"
    }, moduleId=${moduleId || "?"}). Falling back to "${fallback}", but ` +
      "every prompt-builder lab.config MUST set an explicit purposeKey -- " +
      "see the design-decision comment at the top of this file.",
  );
  return fallback;
}

function labelWithBadge(def) {
  const wrapper = document.createElement("span");
  wrapper.className = "pb-field-label-text";
  wrapper.textContent = def.label;

  const badge = document.createElement("span");
  badge.className = `pb-field-badge pb-field-badge--${
    def.required ? "required" : "optional"
  }`;
  // Text, not color alone, distinguishes required vs. optional fields.
  badge.textContent = def.required ? " (required)" : " (optional)";

  const container = document.createElement("span");
  container.appendChild(wrapper);
  container.appendChild(badge);
  return container;
}

/**
 * Mounts the prompt-builder lab engine into `container`.
 * Satisfies contracts/lab-engine-contract.md's required export shape.
 */
export function mount(container, lab, moduleId) {
  instanceCounter += 1;
  const idPrefix = `pb-${instanceCounter}`;

  const purposeKey = resolvePurposeKey(lab, moduleId);
  const placeholders = (lab && lab.config && lab.config.placeholders) || {};

  const existingDraft = getProgress().builderDrafts[purposeKey] || {};
  const fields = {};
  for (const def of FIELD_DEFS) {
    const value = existingDraft[def.key];
    fields[def.key] = typeof value === "string" ? value : "";
  }

  const controller = new AbortController();
  const { signal } = controller;
  let copyStatusTimer = null;

  container.innerHTML = "";

  const root = document.createElement("section");
  root.className = "prompt-builder-lab";

  // Always-present "back to module" affordance -- required by
  // contracts/lab-engine-contract.md regardless of what module-view.js
  // (WP03) itself provides, so this engine never dead-ends on its own.
  const backLink = document.createElement("a");
  backLink.href = `#/module/${encodeURIComponent(moduleId || "")}`;
  backLink.className = "pb-back-link";
  backLink.textContent = "← Back to module";
  backLink.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      navigateTo(`/module/${moduleId || ""}`);
    },
    { signal },
  );
  root.appendChild(backLink);

  const heading = document.createElement("h2");
  heading.textContent = "Prompt Builder";
  root.appendChild(heading);

  const intro = document.createElement("p");
  intro.className = "pb-intro";
  intro.textContent =
    "Fill in each field below. The prompt on the right assembles live, in " +
    "role → context → task → format order — the same order " +
    "the golden rules teach.";
  root.appendChild(intro);

  // lab.config.task is this instance's actual mission (module-specific --
  // e.g. Module 8's "rewrite this exact weak prompt" vs. Module 6's "pick
  // your own real task"). Without it, the only place that mission lived
  // was inside the Context field's placeholder -- ghost text that
  // disappears the moment you start typing and doesn't read as an
  // instruction. Rendered as its own callout so it can't be missed.
  const taskText = lab && lab.config && lab.config.task;
  if (taskText) {
    const missionEl = document.createElement("p");
    missionEl.className = "pb-mission";
    const missionLabel = document.createElement("strong");
    missionLabel.textContent = "Your task: ";
    missionEl.appendChild(missionLabel);
    missionEl.appendChild(document.createTextNode(taskText));
    root.appendChild(missionEl);
  }

  const layout = document.createElement("div");
  layout.className = "pb-layout";
  root.appendChild(layout);

  const formEl = document.createElement("div");
  formEl.className = "pb-form";
  layout.appendChild(formEl);

  const textareas = {};

  for (const def of FIELD_DEFS) {
    const fieldGroup = document.createElement("div");
    fieldGroup.className = "pb-field-group";

    const fieldId = `${idPrefix}-field-${def.key}`;

    const label = document.createElement("label");
    label.setAttribute("for", fieldId);
    label.className = "pb-field-label";
    label.appendChild(labelWithBadge(def));
    fieldGroup.appendChild(label);

    const textarea = document.createElement("textarea");
    textarea.id = fieldId;
    textarea.className = "pb-field-input";
    textarea.rows = def.key === "context" || def.key === "task" ? 3 : 2;
    textarea.value = fields[def.key];
    if (placeholders[def.key]) {
      textarea.placeholder = placeholders[def.key];
    }
    textarea.addEventListener("input", handleFieldInput(def.key), { signal });
    fieldGroup.appendChild(textarea);

    textareas[def.key] = textarea;
    formEl.appendChild(fieldGroup);
  }

  const previewPane = document.createElement("div");
  previewPane.className = "pb-preview-pane";
  layout.appendChild(previewPane);

  const previewHeading = document.createElement("h3");
  previewHeading.textContent = "Live preview";
  previewPane.appendChild(previewHeading);

  const missingHint = document.createElement("p");
  missingHint.className = "pb-missing-hint";
  missingHint.setAttribute("aria-live", "polite");
  previewPane.appendChild(missingHint);

  const previewPre = document.createElement("pre");
  previewPre.className = "pb-preview";
  const previewCode = document.createElement("code");
  previewPre.appendChild(previewCode);
  previewPane.appendChild(previewPre);

  const copyRow = document.createElement("div");
  copyRow.className = "pb-copy-row";
  previewPane.appendChild(copyRow);

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "pb-copy-button";
  copyButton.textContent = "Copy prompt";
  copyRow.appendChild(copyButton);

  const copyStatus = document.createElement("p");
  copyStatus.className = "pb-copy-status";
  copyStatus.setAttribute("role", "status");
  copyStatus.setAttribute("aria-live", "polite");
  copyStatus.hidden = true;
  copyRow.appendChild(copyStatus);

  function capitalizedLabel(key) {
    const def = FIELD_DEFS.find((candidate) => candidate.key === key);
    return def ? def.label : key;
  }

  function renderPreviewAndHint() {
    const assembled = assemblePrompt(fields);
    previewCode.textContent = assembled;

    const { missing } = validateFields(fields);
    if (missing.length === 0) {
      missingHint.textContent = "All required fields are filled in.";
      missingHint.classList.remove("pb-missing-hint--incomplete");
    } else {
      missingHint.textContent = `Still needed: ${missing
        .map(capitalizedLabel)
        .join(", ")}.`;
      missingHint.classList.add("pb-missing-hint--incomplete");
    }
    return assembled;
  }

  function handleFieldInput(key) {
    return (event) => {
      fields[key] = event.target.value;
      // Synchronous, in-memory assembly -- no debounce needed here (only
      // progress.js's own localStorage write is debounced, per T021).
      renderPreviewAndHint();
      setBuilderDraft(purposeKey, { ...fields });
    };
  }

  function selectPreviewText() {
    try {
      const selection = window.getSelection();
      if (!selection) return;
      selection.removeAllRanges();
      const range = document.createRange();
      range.selectNodeContents(previewCode);
      selection.addRange(range);
    } catch (err) {
      // Selection isn't essential to the fallback message below -- if it
      // fails for any reason, the learner can still select manually.
    }
  }

  function showCopyStatus(message, isFallback) {
    if (copyStatusTimer !== null) {
      clearTimeout(copyStatusTimer);
      copyStatusTimer = null;
    }
    copyStatus.textContent = message;
    copyStatus.classList.toggle("pb-copy-status--fallback", Boolean(isFallback));
    copyStatus.hidden = false;
    // Fallback message stays up (the learner still needs to act on it);
    // the success message auto-hides so it doesn't linger as stale state.
    if (!isFallback) {
      copyStatusTimer = setTimeout(() => {
        copyStatus.hidden = true;
        copyStatusTimer = null;
      }, COPY_STATUS_HIDE_MS);
    }
  }

  copyButton.addEventListener(
    "click",
    () => {
      const assembled = assemblePrompt(fields);
      copyText(assembled).then((result) => {
        if (result.copied) {
          showCopyStatus("Copied to clipboard.", false);
        } else {
          selectPreviewText();
          showCopyStatus(
            "Clipboard unavailable — select the text above to copy manually.",
            true,
          );
        }
      });
    },
    { signal },
  );

  // "graded: false" on every prompt-builder lab means there is no
  // right/wrong check here -- this is free text, and there's no backend
  // or AI call in this app to grade it against. The only way to actually
  // know a prompt is good is to put it in front of the AI it's meant
  // for, so this callout says so explicitly rather than leaving her to
  // assume "fields are full" means "prompt is good."
  const reviewCallout = document.createElement("div");
  reviewCallout.className = "pb-review-callout";

  const reviewHeading = document.createElement("h3");
  reviewHeading.textContent = "How do you know it's good?";
  reviewCallout.appendChild(reviewHeading);

  const reviewSelfCheck = document.createElement("p");
  reviewSelfCheck.textContent =
    "Quick self-check first: is it specific, does it say what a good " +
    "result looks like, is it one clear goal, and does it state the " +
    "format?";
  reviewCallout.appendChild(reviewSelfCheck);

  const reviewAskAi = document.createElement("p");
  reviewAskAi.className = "pb-review-required";
  const reviewAskAiLabel = document.createElement("strong");
  reviewAskAiLabel.textContent = "Then ask your AI -- this step isn't optional: ";
  reviewAskAi.appendChild(reviewAskAiLabel);
  reviewAskAi.appendChild(
    document.createTextNode(
      "copy this prompt into your real Claude Code session and ask it " +
        "directly, “Review this prompt before I use it -- is anything " +
        "unclear or missing?” Your own read of a prompt and the " +
        "assistant's read of it are often different, and its answer is " +
        "usually what catches what you missed. Update the fields above " +
        "based on what it says.",
    ),
  );
  reviewCallout.appendChild(reviewAskAi);

  root.appendChild(reviewCallout);

  renderPreviewAndHint();
  container.appendChild(root);

  return {
    unmount() {
      controller.abort();
      if (copyStatusTimer !== null) {
        clearTimeout(copyStatusTimer);
        copyStatusTimer = null;
      }
    },
  };
}
