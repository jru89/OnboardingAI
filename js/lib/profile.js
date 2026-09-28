// Learner profile selection.
//
// A static site with no accounts -- "profile" here just means "whose name
// was picked on this device", stored client-side so returning visits skip
// the picker. It exists purely to let progress.js namespace its storage
// key per person and to let module-view.js/landing-view.js show a
// personalized name; it is NOT an access boundary. Every profile's module
// list and content is equally visible to anyone who picks it -- there is
// no shielding between profiles by design.

const STORAGE_KEY = "ccol:profile";

// The "id" is also used to namespace progress.js's storage key, so keep
// these lowercase/stable once shared. "princess" intentionally maps back
// onto progress.js's original, un-namespaced storage key (see that file)
// so her progress recorded before this feature existed isn't orphaned.
export const PROFILES = [
  { id: "yolan", name: "Yolan" },
  { id: "wim", name: "Wim" },
  { id: "princess", name: "Princess" },
];

export function getSelectedProfileId() {
  try {
    const id = window.localStorage.getItem(STORAGE_KEY);
    return PROFILES.some((profile) => profile.id === id) ? id : null;
  } catch (err) {
    return null; // localStorage unavailable -- fail open to "not chosen yet".
  }
}

export function getSelectedProfile() {
  const id = getSelectedProfileId();
  return PROFILES.find((profile) => profile.id === id) || null;
}

export function setSelectedProfileId(id) {
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch (err) {
    // Ignore -- worst case the picker is shown again next visit.
  }
}

/**
 * Clears the stored choice so the picker is shown again. Used by the
 * header's "switch profile" control -- switching is always allowed, since
 * no profile's content or progress is meant to be shielded from another.
 */
export function clearSelectedProfile() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    // Ignore.
  }
}
