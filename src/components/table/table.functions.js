/**
 * Checks if the event target is a resize handle.
 * @param {Event} event
 * @returns {string}
 */
export function shouldResize(event) {
  return event.target.dataset.resize;
}
