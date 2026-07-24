import DomListener from '@core/DomListener';

/**
 * This is an abstract class for components
 * @class CommonComponent
 */
export default class CommonComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
  }

  // Abstract method
  /**
   * Returns component template.
   * @returns {string}
   */
  toHtml() {
    return '';
  }

  /**
   * Initializes DOM listeners for a component.
   */
  init() {
    this.initDOMListeners();
  }

  /**
   * Removes DOM listeners from the component.
   */
  destroy() {
    this.removeDOMListeners();
  }
}
