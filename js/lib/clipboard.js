// Clipboard helper -- copy with an honest result, never a silent failure
// and never a thrown exception.
//
// `prompt-builder-lab.js` owns the *visible* manual-select fallback UI when
// `copyText()` reports `{copied: false}`; this file only performs the copy
// attempt and reports whether it worked, so it stays reusable by any future
// caller without dragging DOM-fallback concerns along with it.

/**
 * Attempts to copy `text` to the clipboard via the async Clipboard API.
 * Resolves to `{copied: true}` on success. Resolves (never rejects) to
 * `{copied: false}` when the API is unavailable (no `navigator.clipboard`,
 * e.g. non-secure context or unsupported browser) or when the write is
 * rejected (e.g. permission denied) -- callers can rely on this promise
 * always resolving.
 */
export async function copyText(text) {
  if (
    typeof navigator === "undefined" ||
    !navigator.clipboard ||
    typeof navigator.clipboard.writeText !== "function"
  ) {
    return { copied: false };
  }

  try {
    await navigator.clipboard.writeText(text);
    return { copied: true };
  } catch (err) {
    return { copied: false };
  }
}
