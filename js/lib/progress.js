// Progress & persistence layer.
//
// This is the ONLY module that touches window.localStorage. Every other
// module (views, lab engines) reads/writes progress exclusively through
// the functions exported here -- see contracts/progress-store.md.
//
// Storage key: "ccol:progress:v1". Writes are debounced (~400ms); reads
// come from an in-memory cache seeded lazily on first access so repeated
// calls don't re-parse localStorage every time.

const STORAGE_KEY = "ccol:progress:v1";
const WRITE_DEBOUNCE_MS = 400;

function freshDefaultRecord() {
  return {
    schemaVersion: 1,
    moduleStatus: {},
    labState: {},
    builderDrafts: {},
    updatedAt: null,
  };
}

// In-memory cache. `null` until the first call to ensureLoaded(), which
// seeds it from localStorage (or a fresh default on any read failure).
let cache = null;
let writeTimer = null;
const savedSubscribers = [];

function isPlainRecordShape(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.moduleStatus === "object" &&
    typeof value.labState === "object" &&
    typeof value.builderDrafts === "object"
  );
}

function ensureLoaded() {
  if (cache !== null) return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      cache = freshDefaultRecord();
      return;
    }
    const parsed = JSON.parse(raw);
    cache = isPlainRecordShape(parsed) ? parsed : freshDefaultRecord();
  } catch (err) {
    // Missing key, parse error, or localStorage unavailable -- degrade to
    // a fresh default record. getProgress() must never throw.
    cache = freshDefaultRecord();
  }
}

function notifySaved() {
  for (const callback of savedSubscribers.slice()) {
    try {
      callback();
    } catch (err) {
      // A subscriber's own error must not break the save pipeline for
      // other subscribers or future writes.
      console.error("progress.js onSaved subscriber threw:", err);
    }
  }
}

function writeNow() {
  writeTimer = null;
  cache.updatedAt = new Date().toISOString();
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (err) {
    // Storage full / unavailable -- nothing more we can do for v1; avoid
    // throwing out of the debounce timer.
    console.error("progress.js failed to persist progress:", err);
  }
  notifySaved();
}

function scheduleWrite() {
  if (writeTimer !== null) {
    clearTimeout(writeTimer);
  }
  writeTimer = setTimeout(writeNow, WRITE_DEBOUNCE_MS);
}

/**
 * Returns the current progress record synchronously from the in-memory
 * cache. Never throws; returns a fresh default record if localStorage is
 * empty, missing, or fails to parse.
 */
export function getProgress() {
  ensureLoaded();
  return cache;
}

/**
 * Updates one module's status and schedules a debounced write.
 */
export function setModuleStatus(moduleId, status) {
  ensureLoaded();
  cache.moduleStatus[moduleId] = status;
  scheduleWrite();
}

/**
 * Merges `state` into labState[labId] (does not replace the whole entry)
 * and schedules a debounced write.
 */
export function setLabState(labId, state) {
  ensureLoaded();
  const existing = cache.labState[labId] || {};
  cache.labState[labId] = { ...existing, ...state };
  scheduleWrite();
}

/**
 * Replaces builderDrafts[purposeKey] and schedules a debounced write.
 */
export function setBuilderDraft(purposeKey, draft) {
  ensureLoaded();
  cache.builderDrafts[purposeKey] = draft;
  scheduleWrite();
}

/**
 * Immediately (not debounced) clears the stored key and resets the
 * in-memory cache to a fresh default record. Notifies subscribers right
 * away since this is an explicit, immediate user action.
 */
export function resetProgress() {
  if (writeTimer !== null) {
    clearTimeout(writeTimer);
    writeTimer = null;
  }
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("progress.js failed to clear progress:", err);
  }
  cache = freshDefaultRecord();
  notifySaved();
}

/**
 * Shared confirm-then-reset flow used by every "reset progress" control
 * in the app (the landing page's own button, and the header's) so the
 * confirmation copy stays in one place. Returns whether the reset
 * actually happened, in case a caller wants to react to it.
 */
export function confirmAndResetProgress() {
  const confirmed = window.confirm(
    "Reset all progress? This clears every module status, lab result, and " +
      "saved draft. This cannot be undone.",
  );
  if (!confirmed) return false;
  resetProgress();
  return true;
}

/**
 * Subscribes to "a write (debounced or immediate) just completed" --
 * drives the "saved" indicator. Returns an unsubscribe function.
 */
export function onSaved(callback) {
  savedSubscribers.push(callback);
  return function unsubscribe() {
    const index = savedSubscribers.indexOf(callback);
    if (index !== -1) savedSubscribers.splice(index, 1);
  };
}
