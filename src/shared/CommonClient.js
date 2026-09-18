/**
 * Base abstract class for all clients for working with the state manager.
 */
export default class CommonClient {
  // Abstract methods
  /**
   * Saves the state of the client
   * @param {Object} state
   * @returns {Promise<void>}
   */
  save(state) {
    throw new Error('save method should be implemented');
  }

  /**
   * Returns the current state of the client
   * @returns {Promise<Object>}
   */
  get() {
    throw new Error('get method should be implemented');
  }
}
