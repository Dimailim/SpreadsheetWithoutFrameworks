import DomListener from '@core/DomListener';

/**
 * This is an abstract class for components
 * @class CommonComponent
 */
export default class CommonComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  // Abstract methods
  /**
   * Returns component template.
   * @returns {string}
   */
  toHtml() {
    return '';
  }

  /**
   * Notifies listeners about the event.
   * @param {string}eventName
   * @param {...*}args
   */
  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }

  /**
   * Subscribes to an event 'eventName'.
   * @param {string} eventName
   * @param {function} fn
   */
  $on(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn);
    this.unsubscribers.push(unsub);
  }

  /**
   * Method can call some logic before initializing a component.
   */
  prepare() {

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
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
