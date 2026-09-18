import {debounce} from '@core/utils';

/**
 * Class for processing state of the client
 */
export default class StateProcessor {
  /**
   * @param {Object} client
   * @param {number} [delay]
   */
  constructor(client, delay = 300) {
    this.client = client;
    this.listen = debounce(this.listen.bind(this), delay);
  }

  /**
   * Saves the state of the client
   * @param {Object} state
   */
  listen(state) {
    this.client.save(state);
  }

  /**
   * Returns the current state of the client
   * @returns {Object}
   */
  get() {
    return this.client.get();
  }
}
