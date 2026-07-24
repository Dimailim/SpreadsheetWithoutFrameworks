import {capitalize} from '@core/utils';

/**
 * This is an abstract class for DOM listeners
 * @class DomListener
 */
export default class DomListener {
  /**
   * @param {Dom} $root - root element of the component
   * @param {string[]} listeners - name of DOM events to listen for
   */
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  /**
   * Initializes DOM listeners in the component root element.
   */
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name} class`);
      }
      // Create function instance to save callback function which will be used in addEventListener
      this[method] = this[method].bind(this);
      // The same as addEventListener. .on is a wrapper for Dom class
      this.$root.on(listener, this[method]);
    });
  }

  /**
   * Removes DOM listeners from the component root element.
   */
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      // The same as removeEventListener. .off is a wrapper for Dom class
      this.$root.off(listener, this[method]);
    });
  }
}

/**
 * Converts and returns a callback name method to format eventName -> onEventName.
 * @param {string} eventName
 * @returns {string}
 */
function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
