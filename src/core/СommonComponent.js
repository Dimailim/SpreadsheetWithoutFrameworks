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
    this.store = options.store;
    this.subscribes = options.subscribes || [];

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
   * Gets changes from the subscribed components and checks if the state needs to be updated
   * @param {Object} changes
   */
  storeChanged(changes) {

  }


  /**
   * Checks if the state object key contains in a subscribes of component
   * @param {string} key
   * @returns {boolean}
   */
  isWatching(key) {
    return this.subscribes.includes(key);
  }

  /**
   * Notifies listeners about the event.
   * @param {string} eventName
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
   * Notifies the store about the state changes.
   * @param {{type: (ACTION_TYPES|number), data: Object}}action
   */
  $dispatch(action) {
    this.store.dispatch(action);
  }

  /**
   * Removes DOM listeners from the component.
   */
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
