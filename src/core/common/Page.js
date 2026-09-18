/**
 * Base abstract class for all pages.
 * @class Page
 */
export default class Page {
  constructor(params) {
    this.params = params || Date.now().toString();
  }

  /**
   * Returns the root element of the page.
   * @returns {Promise<Dom>|Dom}
   */
  getRoot() {
    throw new Error('getRoot method should be implemented');
  }

  /**
   * Logic after rendering the page.
   */
  afterRender() {
  }

  /**
   * Destroys listeners and components of the page.
   */
  destroy() {
  }
}
